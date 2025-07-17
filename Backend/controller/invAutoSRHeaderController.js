const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
const createAutoSRHeader = async (req, res) => {
  try {
    const {
      CompanyID,
      SupervisorID,
      OwnerID,
      WHID,
      SRNumber,
      SRTypeID,
      AutoSRLoadDate,
      AutoSRDate,
      AutoSRStatus,
    } = req.body;

    const newHeader = await prisma.invAutoSRHeader.create({
      data: {
        CompanyID,
        SupervisorID,
        OwnerID,
        WHID,
        SRNumber,
        SRTypeID,
        AutoSRLoadDate: new Date(AutoSRLoadDate),
        AutoSRDate: new Date(AutoSRDate),
        AutoSRStatus,
      },
    });

    res.status(201).json({
      message: 'AutoSR Header created successfully!',
      newHeader,
    });
  } catch (error) {
    console.error('Create AutoSRHeader Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Read all
const getAutoSRHeaders = async (req, res) => {
  try {
    const headers = await prisma.invAutoSRHeader.findMany();
    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAutoLoadsRequests = async (req, res) => {
  try {
    const headers = await prisma.invAutoSRHeader.findMany({
      where: {
        AutoSRStatus: "R",
      },
    });

    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Read by ID
const getAutoSRHeaderById = async (req, res) => {
  try {
    const id = req.params.id;
    const header = await prisma.invAutoSRHeader.findUnique({
      where: { SRNumber: id },
      
    });

    if (!header) {
      return res.status(404).json({ error: 'AutoSR Header not found' });
    }

    res.status(200).json(header);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get AutoSR Details
const getAutoSRDetails = async (req, res) => {
  try {
    const Details = await prisma.invAutoSRDetail.findMany({
      where: { SRNumber:String (req.params.SRNumber) }
      
    });
    if (!Details) {
      return res.status(404).json({ error: 'AutoSR Details not found' });
    }
    res.status(200).json(Details);
    //console.log("Details", Details)
    //console.log("SRNumber", req.params.SRNumber)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAutoload = async (req, res) => {
  const { SRNumber } = req.params;
  const { items, ...headerData } = req.body;

  try {
    // Step 1: Get Owner's branch ID
    const ownerData = await prisma.invAutoSRHeader.findUnique({
      where: { SRNumber: SRNumber }, 
      select: { OwnerID: true },
    });

    const owner = await prisma.hhOwner.findUnique({
      where: { OwnerID: ownerData.OwnerID },
      select: { BranchID: true,OwnerDefaultWHID: true },
    });

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found.' });
    }

    const BranchID = owner.BranchID;

    // Step 2: Check stock availability for all items
    const WHID = owner.OwnerDefaultWHID;

    for (const item of items) {
      const storeStock = await prisma.invStoreTransaction.aggregate({
        where: {
          ItemID: item.ItemID,
          StoreID: WHID,
        },
        _sum: {
          ItemQty: true,
        },
      });

      const availableQty = storeStock._sum.ItemQty || 0;

      if (availableQty < item.AutoSRLoadQty) {
        return res.status(400).json({
          error: `Insufficient stock for ItemID ${item.ItemID}. Available: ${availableQty}, Requested: ${item.AutoSRLoadQty}`,
        });
      }
    }

    // Step 3: Proceed with update
    const updatedHeader = await prisma.$transaction(async (prisma) => {
      const header = await prisma.invAutoSRHeader.update({
        where: { SRNumber: SRNumber },
        data: {
          ...headerData,
          AutoSRStatus: 'A',
          AutoSRLoadDate: new Date(),
        },
      });

      for (const item of items) {
        await prisma.invAutoSRDetail.updateMany({
          where: {
            SRNumber: header.SRNumber,
            ItemID: item.ItemID,
          },
          data: {
            AutoSRLoadQty: item.AutoSRLoadQty,
            AutoSRStatus: 'A',
            AutoSRLoadDate: new Date(),
          },
        });
      }

      const storeTransactions = items.map(item => ({
        CompanyID: header.CompanyID,
        BranchID: BranchID,
        UserID: header.OwnerID,
        DocumentTypeID: 1,
        DocumentID: header.AutoSRID,
        StoreID: header.WHID,
        ItemID: item.ItemID,
        ItemStatusID: 0,
        ItemQty: item.AutoSRLoadQty,
        DocumentRefNumber: header.SRNumber,
        TransactionDateInt: Math.floor(Date.now() / 1000),
        TransactionDate: new Date(),
      }));
      const storeTransactionsWH = items.map(item => ({
        CompanyID: header.CompanyID,
        BranchID: BranchID,
        UserID: header.OwnerID,
        DocumentTypeID: 1,
        DocumentID: header.AutoSRID,
        StoreID: WHID,
        ItemID: item.ItemID,
        ItemStatusID: 0,
        ItemQty: -item.AutoSRLoadQty,
        DocumentRefNumber: header.SRNumber,
        TransactionDateInt: Math.floor(Date.now() / 1000),
        TransactionDate: new Date(),
      }));

      await prisma.invStoreTransaction.createMany({
        data:[...storeTransactions, ...storeTransactionsWH],
      });

      return header;
    });

    res.json(updatedHeader);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update auto SR header.' });
  }
};




// Delete
const deleteAutoSRHeader = async (req, res) => {
  try {
    const SRNumber = req.params.id;
    //console.log("SRNumber", SRNumber);
    await prisma.$transaction(async (prisma) => {
      // Update header status to 'C'
      await prisma.invAutoSRHeader.update({
        where: { SRNumber:SRNumber },
        data: { AutoSRStatus: 'C' },
      });

      // Update all detail records with same SRNumber
      await prisma.invAutoSRDetail.updateMany({
        where: { SRNumber:SRNumber },
        data: { AutoSRStatus: 'C' },
      });
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createAutoSRHeader = createAutoSRHeader;
module.exports.getAutoSRHeaders = getAutoSRHeaders;
module.exports.getAutoLoadsRequests = getAutoLoadsRequests;
module.exports.getAutoSRHeaderById = getAutoSRHeaderById;
module.exports.updateAutoload = updateAutoload;
module.exports.deleteAutoSRHeader = deleteAutoSRHeader;
module.exports.getAutoSRDetails = getAutoSRDetails;