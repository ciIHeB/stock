const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createItemUnitList = async (req, res) => {
    try {
      const { 
        CompanyID,     
        ItemUnitListDescLan1,               
        ItemUnitListDescLan2, 
        ItemUnitID,   
        ItemPackSize,  
        IsActive,
        LastUpdateByUserID,
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const ItemUnitList = await prisma.invItemUnitList.create({
        data: {
          CompanyID,     
          ItemUnitListDescLan1,               
          ItemUnitListDescLan2, 
          ItemUnitID,   
          ItemPackSize,   
          ItemUnitListCreationDate : new Date(), 
          IsActive,
          LastUpdateDate: new Date(), 
          LastUpdateByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Item Unit List created successfully!',
        ItemUnitList,
      });
    } catch (error) {
      console.error('Error creating Item Unit List:', error);
      res.status(500).json({
        message: 'Error creating Item Unit List',
        error: error.message,
      });
    }
  };
  
  const getItemUnistLists = async (req, res) => {
    try {
      const ItemUnitLists = await prisma.invItemUnitList.findMany();
      res.status(200).json(ItemUnitLists);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemUnitListById = async (req, res) => {
    try {
      const ItemUnitList = await prisma.invItemUnitList.findUnique({
        where: { ItemUnitListID: parseInt(req.params.id) },
      });
      if (ItemUnitList) {
        res.status(200).json(ItemUnitList);
      } else {
        res.status(404).json({ error: 'Item Unit List not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateItemUnitList = async (req, res) => {
    try {
      const { 
        CompanyID,     
        ItemUnitListDescLan1,               
        ItemUnitListDescLan2, 
        ItemUnitID,   
        ItemPackSize,   
        IsActive,
        LastUpdateByUserID 
      } = req.body;
  
      const ItemUnitList = await prisma.invItemUnitList.update({
        where: { ItemUnitListID: parseInt(req.params.id) },
        data: {
          CompanyID,     
          ItemUnitListDescLan1,               
          ItemUnitListDescLan2, 
          ItemUnitID,   
          ItemPackSize,   
          IsActive,
          LastUpdateDate: new Date(), 
          LastUpdateByUserID,
        },
      });
  
      res.status(200).json({
        message: 'Item Unit List updated successfully!',
        ItemUnitList,
      });
    } catch (error) {
      console.error('Error updating Item Unit List:', error);
      res.status(500).json({
        message: 'Error updating Item Unit List',
        error: error.message,
      });
    }
  };
  
  
  const deleteItemUnitList = async (req, res) => { 
    try {
      await prisma.invItemUnitList.delete({
        where: { ItemUnitListID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createItemUnitList=createItemUnitList;
  module.exports.getItemUnistLists=getItemUnistLists;
  module.exports.getItemUnitListById=getItemUnitListById;
  module.exports.updateItemUnitList=updateItemUnitList;
  module.exports.deleteItemUnitList=deleteItemUnitList;