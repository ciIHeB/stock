const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// function to generate LoadDocumentNumber
const generateLoadDocumentNumber = () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `FC${randomNumber}`;
};

// Create a new load entry
const createLoad = async (req, res) => {
  try {
    const {
      StoreID,
      UserID,
      items, // Expecting an array of items: [{ ItemID, ReceivedQuantity, ItemStatus (optional) }]
      LoadStatusID, // Assuming this is passed in the body, e.g., "L" for Loaded, "P" for Pending
      LoadDocumentNumber, // Optional, will be generated if not provided
    } = req.body;

    // Validate required fields
    if (StoreID == null || UserID == null || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid parameters: StoreID, UserID, and a non-empty items array are required.' });
    }

    for (const item of items) {
        if (item.ItemID == null || item.ReceivedQuantity == null || typeof item.ReceivedQuantity !== 'number' || item.ReceivedQuantity <= 0) {
            return res.status(400).json({ message: 'Each item must have a valid ItemID and a positive ReceivedQuantity.' });
        }
    }

    const finalDocumentNumber = LoadDocumentNumber?.trim()
      ? LoadDocumentNumber
      : generateLoadDocumentNumber();

    // Fetch store details to get CompanyID and BranchID
    const store = await prisma.invStore.findUnique({
      where: { StoreID: parseInt(StoreID) },
      select: { CompanyID: true, BranchID: true },
    });

    if (!store) {
      return res.status(404).json({ message: `StoreID ${StoreID} not found` });
    }
    const { CompanyID, BranchID } = store;

    // Calculate total cost for the entire load
    let  totalLoadCost = 0;
    for (const item of items) {
  const itemData = await prisma.invItem.findUnique({
    where: { ItemID: item.ItemID },
    select: {
      salPriceList: {
        select: { ItemCost: true }
      }
    }
  });
  console.log('Full itemData:', itemData);
   console.log('Full itemData:', item.ReceivedQuantity);

 if (!itemData || !itemData.salPriceList) {
    return res.status(404).json({ message: `ItemID ${item.ItemID} not found or missing cost data.` });
  }


  totalLoadCost += itemData.salPriceList[0].ItemCost * item.ReceivedQuantity;
}



    const loadCreationDate = new Date();
    const currentStatusID = 'A'; // Default LoadStatusID to 'L' (Loaded) if not provided

    // Use a Prisma transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      const createdLoadEntriesForResponse = [];

      for (const item of items) {
        // Create invBOStoreLoad entry
        const loadEntry = await tx.invBOStoreLoad.create({
          data: {
            StoreID: parseInt(StoreID),
            LoadType: 1, // 1 is for Load
            LoadDocumentNumber: finalDocumentNumber,
            UserID: parseInt(UserID),
            LoadStatusID: currentStatusID,
            LoadCreationDate: loadCreationDate,
            TotalReceivedQuantityCost:parseFloat(totalLoadCost.toFixed(2)), // Assigning the total cost of the entire load
            ItemID: item.ItemID,
            ItemStatus: item.ItemStatus || 0, // Defaulting ItemStatus to 0 if not provided
            ReceivedQuantity: item.ReceivedQuantity,
          },
        });
        createdLoadEntriesForResponse.push(loadEntry);

        // Create corresponding InvStoreTransaction entry
        await tx.invStoreTransaction.create({
          data: {
            CompanyID: CompanyID,
            BranchID: BranchID,
            UserID: parseInt(UserID),
            DocumentTypeID: 2, // Assumed: 2 for "Stock Load" / "Goods Received"
            DocumentID: loadEntry.LoadID, // Link to the created invBOStoreLoad entry's ID
            StoreID: parseInt(StoreID),
            ItemID: item.ItemID,
            ItemStatusID: item.ItemStatus || 0, // Consistent with invBOStoreLoad.ItemStatus
            ItemQty: item.ReceivedQuantity,    // Positive quantity for received stock
            DocumentRefNumber: finalDocumentNumber,
            TransactionDate: loadCreationDate,
            TransactionDateInt: parseInt(loadCreationDate.toISOString().slice(0,10).replace(/-/g,"")), // YYYYMMDD format
          },
        });
      }
      return createdLoadEntriesForResponse; // Return all created load entries
    });

    res.status(201).json({
      message: 'Load entries and stock transactions created successfully!',
      LoadDocumentNumber: finalDocumentNumber,
      TotalReceivedQuantityCost: totalLoadCost,
      count: result.length,
      loadEntries: result, // Send back the created load entries
    });

  } catch (error) {
    console.error('Error creating load batch:', error);

    // Specific error handling, e.g., for Prisma unique constraint violations
    if (error.code === 'P2002') { // Example: Prisma unique constraint error
        return res.status(409).json({ message: 'Conflict: A load with similar unique details might already exist.', error: error.message });
    }
    res.status(500).json({
      message: 'Error creating load batch',
      error: error.message,
    });
  }
};

module.exports.createLoad = createLoad;
