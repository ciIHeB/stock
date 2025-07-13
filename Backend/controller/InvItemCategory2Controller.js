const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createItemCategory2 = async (req, res) => {
    try {
      const { 
        CompanyID,                    
        CategoryDescLan1, 
        CategoryDescLan2,   
        IsActive,   
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const ItemCategory = await prisma.InvItemCategory2.create({
        data: {
          CompanyID,     
          CategoryDescLan1, 
          CategoryDescLan2,   
          CategoryCreationDate : new Date(), 
          IsActive,   
          LastUpdateDate  : new Date(), 
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Item Category 2 created successfully!',
        ItemCategory,
      });
    } catch (error) {
      console.error('Error creating Item Category 2:', error);
      res.status(500).json({
        message: 'Error creating Item Category 2',
        error: error.message,
      });
    }
  };
  
  const getItemCategories2 = async (req, res) => {
    try {
      const ItemCategories = await prisma.InvItemCategory2.findMany();
      res.status(200).json(ItemCategories);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemCategory2ById = async (req, res) => {
    try {
      const ItemCategory = await prisma.InvItemCategory2.findUnique({
        where: { ItemCategory2ID: parseInt(req.params.id) },
      });
      if (ItemCategory) {
        res.status(200).json(ItemCategory);
      } else {
        res.status(404).json({ error: 'ItemCategory not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateItemCategory2 = async (req, res) => {
    try {
      const { 
        CompanyID,     
        CategoryDescLan1, 
        CategoryDescLan2,   
        IsActive,   
        LastUpdateByUserID
      } = req.body;
  
      const ItemCategory = await prisma.InvItemCategory2.update({
        where: { ItemCategory2ID: parseInt(req.params.id) },
        data: {
          CompanyID,     
          CategoryDescLan1, 
          CategoryDescLan2,   
          IsActive,   
          LastUpdateDate  : new Date(),
          LastUpdateByUserID
        },
      });
  
      res.status(200).json({
        message: 'ItemCategory updated successfully!',
        ItemCategory,
      });
    } catch (error) {
      console.error('Error updating ItemCategory:', error);
      res.status(500).json({
        message: 'Error updating ItemCategory',
        error: error.message,
      });
    }
  };
  
  
  const deleteItemCategory2 = async (req, res) => { 
    try {
      await prisma.InvItemCategory2.delete({
        where: { ItemCategory2ID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createItemCategory2=createItemCategory2;
  module.exports.getItemCategories2=getItemCategories2;
  module.exports.getItemCategory2ById=getItemCategory2ById;
  module.exports.updateItemCategory2=updateItemCategory2;
  module.exports.deleteItemCategory2=deleteItemCategory2;