const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


  const createStoreType = async (req, res) => {
    try {
      const { 
        StoreTypeDescLan1,               
        StoreTypeDescLan2, 
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const StoreType = await prisma.invStoreType.create({
        data: {
          StoreTypeDescLan1,               
          StoreTypeDescLan2, 
          StoreTypeCreationDate : new Date(), 
          LastUpdateDate: new Date(), 
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Store Type created successfully!',
        StoreType,
      });
    } catch (error) {
      console.error('Error creating Store Type:', error);
      res.status(500).json({
        message: 'Error creating InvStoreType',
        error: error.message,
      });
    }
  };
  
  const getStoreTypes = async (req, res) => {
    try {
      const StoreTypes = await prisma.invStoreType.findMany();
      res.status(200).json(StoreTypes);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getStoreTypeById = async (req, res) => {
    try {
      const StoreType = await prisma.invStoreType.findUnique({
        where: { StoreTypeID: parseInt(req.params.id) },
      });
      if (StoreType) {
        res.status(200).json(StoreType);
      } else {
        res.status(404).json({ error: 'InvStoreType not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateStoreType = async (req, res) => {
    try {
      const { 
        StoreTypeDescLan1,               
        StoreTypeDescLan2,
        LastUpdateByUserID 
      } = req.body;
  
      const StoreType = await prisma.invStoreType.update({
        where: { StoreTypeID: parseInt(req.params.id) },
        data: {
          StoreTypeDescLan1,               
          StoreTypeDescLan2,
          LastUpdateDate: new Date(), 
          LastUpdateByUserID 
        },
      });
  
      res.status(200).json({
        message: 'Store Type updated successfully!',
        StoreType,
      });
    } catch (error) {
      console.error('Error updating Store Type:', error);
      res.status(500).json({
        message: 'Error updating Store Type',
        error: error.message,
      });
    }
  };
  
  
  const deleteStoreType = async (req, res) => { 
    try {
      await prisma.invStoreType.delete({
        where: { StoreTypeID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createStoreType=createStoreType;
  module.exports.getStoreTypes=getStoreTypes;
  module.exports.getStoreTypeById=getStoreTypeById;
  module.exports.updateStoreType=updateStoreType;
  module.exports.deleteStoreType=deleteStoreType;