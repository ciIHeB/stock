const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createItemUnit = async (req, res) => {
    try {
      const { 
        CompanyID,     
        ItemUnitDescLan1,               
        ItemUnitDescLan2, 
        IsActive,
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const ItemUnit = await prisma.invItemUnit.create({
        data: {
          CompanyID,     
          ItemUnitDescLan1,               
          ItemUnitDescLan2,   
          ItemUnitCreationDate : new Date(), 
          IsActive,
          LastUpdateDate: new Date(), 
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Item Unit created successfully!',
        ItemUnit,
      });
    } catch (error) {
      console.error('Error creating Item Unit:', error);
      res.status(500).json({
        message: 'Error creating Item Unit',
        error: error.message,
      });
    }
  };
  
  const getItemUnists = async (req, res) => {
    try {
      const ItemsUnits = await prisma.invItemUnit.findMany();
      res.status(200).json(ItemsUnits);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemUnitById = async (req, res) => {
    try {
      const ItemUnit = await prisma.invItemUnit.findUnique({
        where: { ItemUnitID: parseInt(req.params.id) },
      });
      if (ItemUnit) {
        res.status(200).json(ItemUnit);
      } else {
        res.status(404).json({ error: 'Item Unit not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateItemUnit = async (req, res) => {
    try {
      const { 
        CompanyID,     
          ItemUnitDescLan1,               
          ItemUnitDescLan2,   
          IsActive,
          LastUpdateByUserID
      } = req.body;
  
      const ItemUnit = await prisma.invItemUnit.update({
        where: { ItemUnitID: parseInt(req.params.id) },
        data: {
          CompanyID,     
          ItemUnitDescLan1,               
          ItemUnitDescLan2,   
          IsActive,
          LastUpdateDate: new Date(), 
          LastUpdateByUserID ,
           
        },
      });
  
      res.status(200).json({
        message: 'Item Unit updated successfully!',
        ItemUnit,
      });
    } catch (error) {
      console.error('Error updating Item Unit:', error);
      res.status(500).json({
        message: 'Error updating Item Unit',
        error: error.message,
      });
    }
  };
  
  
  const deleteItemUnit = async (req, res) => { 
    try {
      await prisma.invItemUnit.delete({
        where: { ItemUnitID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createItemUnit=createItemUnit;
  module.exports.getItemUnists=getItemUnists;
  module.exports.getItemUnitById=getItemUnitById;
  module.exports.updateItemUnit=updateItemUnit;
  module.exports.deleteItemUnit=deleteItemUnit;