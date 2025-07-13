const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createStore = async (req, res) => {
    try {
      const { 
        CompanyID, BranchID, StoreTypeID,
        StoreDescLan1,               
        StoreDescLan2, 
        CreatedByUserID,
        LastUpdateByUserID
      } = req.body;
  console.log('here',req.body)
      const Store = await prisma.invStore.create({
        data: {
          CompanyID, BranchID, StoreTypeID,
          StoreDescLan1,               
          StoreDescLan2, 
          StoreCreationDate : new Date(), 
          LastUpdateDate: new Date(), 
          CreatedByUserID :CreatedByUserID,
          LastUpdateByUserID:LastUpdateByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Store created successfully!',
        Store,
      });
    } catch (error) {
      console.error('Error creating Store:', error);
      res.status(500).json({
        message: 'Error creating Store',
        error: error.message,
      });
    }
  };
  
  const getStores = async (req, res) => {
    try {
      const Stores = await prisma.invStore.findMany();
      res.status(200).json(Stores);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getStoreById = async (req, res) => {
    try {
      const Store = await prisma.invStore.findUnique({
        where: { StoreID: parseInt(req.params.id) },
      });
      if (Store) {
        res.status(200).json(Store);
      } else {
        res.status(404).json({ error: 'Store not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateStore = async (req, res) => {
    try {
      const { 
        CompanyID, BranchID, StoreTypeID,
        StoreDescLan1,               
        StoreDescLan2, 
        LastUpdateByUserID 
      } = req.body;
  
      const Store = await prisma.invStore.update({
        where: { StoreID: parseInt(req.params.id) },
        data: {
          CompanyID, BranchID, StoreTypeID,
          StoreDescLan1,               
          StoreDescLan2, 
          LastUpdateDate: new Date(), 
          LastUpdateByUserID 
        },
      });
  
      res.status(200).json({
        message: 'Store updated successfully!',
        Store,
      });
    } catch (error) {
      console.error('Error updating Store:', error);
      res.status(500).json({
        message: 'Error updating Store',
        error: error.message,
      });
    }
  };
  
  
  const deleteStore = async (req, res) => { 
    try {
      await prisma.invStore.delete({
        where: { StoreID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createStore=createStore;
  module.exports.getStores=getStores;
  module.exports.getStoreById=getStoreById;
  module.exports.updateStore=updateStore;
  module.exports.deleteStore=deleteStore;

const getAvailableQuantity = async (req, res) => {
  try {
    const { storeId, itemId } = req.query;

    if (!storeId || !itemId) {
      return res.status(400).json({ message: 'StoreID and ItemID are required query parameters.' });
    }

    const storeIDInt = parseInt(storeId);
    const itemIDInt = parseInt(itemId);

    if (isNaN(storeIDInt) || isNaN(itemIDInt)) {
      return res.status(400).json({ message: 'StoreID and ItemID must be valid integers.' });
    }

    // Check if the store exists
    const store = await prisma.invStore.findUnique({
      where: { StoreID: storeIDInt },
    });
    if (!store) {
      return res.status(404).json({ message: `Store with ID ${storeIDInt} not found.` });
    }

    // Check if the item exists
    const item = await prisma.invItem.findUnique({
      where: { ItemID: itemIDInt },
    });
    if (!item) {
      return res.status(404).json({ message: `Item with ID ${itemIDInt} not found.` });
    }

    const transactions = await prisma.invStoreTransaction.findMany({
      where: {
        StoreID: storeIDInt,
        ItemID: itemIDInt,
      },
      select: {
        ItemQty: true,
        // DocumentTypeID: true, // Could be used in the future to treat quantities differently
      },
    });

    let availableQuantity = 0;
    for (const transaction of transactions) {
      availableQuantity += transaction.ItemQty; // Assumes ItemQty is positive for additions, negative for subtractions
    }

    res.status(200).json({
      StoreID: storeIDInt,
      ItemID: itemIDInt,
      ItemName: item.ItemNameLan1, // Send item name for better context
      StoreName: store.StoreDescLan1, // Send store name for better context
      AvailableQuantity: availableQuantity,
    });

  } catch (error) {
    console.error('Error fetching available quantity:', error);
    res.status(500).json({
      message: 'Error fetching available quantity',
      error: error.message,
    });
  }
};

module.exports.getAvailableQuantity = getAvailableQuantity;