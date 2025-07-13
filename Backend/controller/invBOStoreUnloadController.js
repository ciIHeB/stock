const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// function to generate UnloadDocumentNumber (can be the same generator, LoadType will differentiate)
const generateUnloadDocumentNumber = () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `UC${randomNumber}`; // Changed prefix to UC for Unload
};

// Create a new unload entry
const createUnload = async (req, res) => {
  try {
    const {
      StoreID,
      UserID,
      items, // Expecting an array of items: [{ ItemID, UnloadedQuantity, ItemStatus (optional) }]
      UnloadStatusID, // Assuming this is passed in the body, e.g., "U" for Unloaded
      UnloadDocumentNumber, // Optional, will be generated if not provided
    } = req.body;

    // Validate required fields
    if (StoreID == null || UserID == null || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid parameters: StoreID, UserID, and a non-empty items array are required.' });
    }

    for (const item of items) {
        // Renamed ReceivedQuantity to UnloadedQuantity for clarity in unload context
        if (item.ItemID == null || item.UnloadedQuantity == null || typeof item.UnloadedQuantity !== 'number' || item.UnloadedQuantity <= 0) {
            return res.status(400).json({ message: 'Each item must have a valid ItemID and a positive UnloadedQuantity.' });
        }
    }

    const finalDocumentNumber = UnloadDocumentNumber?.trim()
      ? UnloadDocumentNumber
      : generateUnloadDocumentNumber();

    // Fetch store details to get CompanyID and BranchID
    const store = await prisma.invStore.findUnique({
      where: { StoreID: parseInt(StoreID) },
      select: { CompanyID: true, BranchID: true },
    });

    if (!store) {
      return res.status(404).json({ message: `StoreID ${StoreID} not found` });
    }
    const { CompanyID, BranchID } = store;

    // Calculate total cost for the entire unload
    // The cost calculation logic might need review based on business rules for unloads (e.g., is it a cost recovery?)
    // For now, it mirrors the load logic.
    let  totalUnloadCost = 0;
    for (const item of items) {
      const itemData = await prisma.invItem.findUnique({
        where: { ItemID: item.ItemID },
        select: {
          salPriceList: {
            select: { ItemCost: true }
          }
        }
      });
      // console.log('Full itemData for unload:', itemData);
      // console.log('UnloadedQuantity:', item.UnloadedQuantity);

      if (!itemData || !itemData.salPriceList || itemData.salPriceList.length === 0) {
        return res.status(404).json({ message: `ItemID ${item.ItemID} not found or missing cost data.` });
      }
      totalUnloadCost += itemData.salPriceList[0].ItemCost * item.UnloadedQuantity;
    }

    const unloadCreationDate = new Date();
    // Consider a different status ID for unload if necessary, e.g., 'U' for Unloaded or use existing 'A'
    const currentStatusID = UnloadStatusID || 'A';

    // Use a Prisma transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      const createdUnloadEntriesForResponse = [];

      for (const item of items) {
        // Create invBOStoreLoad entry (this table name might be generic for both load/unload, differentiated by LoadType)
        const unloadEntry = await tx.invBOStoreLoad.create({
          data: {
            StoreID: parseInt(StoreID),
            LoadType: 2, // 2 is for Unload (assuming 1 was for Load)
            LoadDocumentNumber: finalDocumentNumber, // Field name is generic in DB
            UserID: parseInt(UserID),
            LoadStatusID: currentStatusID, // Field name is generic
            LoadCreationDate: unloadCreationDate, // Field name is generic
            TotalReceivedQuantityCost: parseFloat(totalUnloadCost.toFixed(2)), // Field name is generic, stores total cost of items in this document
            ItemID: item.ItemID,
            ItemStatus: item.ItemStatus || 0, // Defaulting ItemStatus to 0 if not provided
            ReceivedQuantity: -item.UnloadedQuantity, // Storing as negative for unload
          },
        });
        createdUnloadEntriesForResponse.push(unloadEntry);

        // Create corresponding InvStoreTransaction entry
        await tx.invStoreTransaction.create({
          data: {
            CompanyID: CompanyID,
            BranchID: BranchID,
            UserID: parseInt(UserID),
            DocumentTypeID: 3, // Assumed: 3 for "Stock Unload" (needs confirmation/definition)
            DocumentID: unloadEntry.LoadID, // Link to the created invBOStoreLoad entry's ID (LoadID is generic primary key)
            StoreID: parseInt(StoreID),
            ItemID: item.ItemID,
            ItemStatusID: item.ItemStatus || 0, // Consistent with invBOStoreLoad.ItemStatus
            ItemQty: -item.UnloadedQuantity,    // Negative quantity for unloaded stock
            DocumentRefNumber: finalDocumentNumber,
            TransactionDate: unloadCreationDate,
            TransactionDateInt: parseInt(unloadCreationDate.toISOString().slice(0,10).replace(/-/g,"")), // YYYYMMDD format
          },
        });
      }
      return createdUnloadEntriesForResponse; // Return all created unload entries
    });

    res.status(201).json({
      message: 'Unload entries and stock transactions created successfully!',
      UnloadDocumentNumber: finalDocumentNumber,
      TotalUnloadedQuantityCost: totalUnloadCost, // Name changed for clarity
      count: result.length,
      unloadEntries: result, // Send back the created unload entries
    });

  } catch (error) {
    console.error('Error creating unload batch:', error);

    if (error.code === 'P2002') {
        return res.status(409).json({ message: 'Conflict: An unload with similar unique details might already exist.', error: error.message });
    }
    res.status(500).json({
      message: 'Error creating unload batch',
      error: error.message,
    });
  }
};

const getAvailableItemQuantity = async (req, res) => {
  try {
    const { storeId, itemId } = req.params;

    if (!storeId || !itemId) {
      return res.status(400).json({ message: 'StoreID and ItemID are required parameters.' });
    }

    const aggregateResult = await prisma.invBOStoreLoad.aggregate({
      _sum: {
        ReceivedQuantity: true,
      },
      where: {
        StoreID: parseInt(storeId),
        ItemID: parseInt(itemId),
      },
    });

    const availableQuantity = aggregateResult._sum.ReceivedQuantity || 0;

    res.status(200).json({ availableQuantity });

  } catch (error) {
    console.error('Error fetching available item quantity:', error);
    res.status(500).json({
      message: 'Error fetching available item quantity',
      error: error.message,
    });
  }
};

module.exports.createUnload = createUnload;
module.exports.getAvailableItemQuantity = getAvailableItemQuantity;
