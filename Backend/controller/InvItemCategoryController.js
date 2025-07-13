const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createItemCategory = async (req, res) => {
    try {
      const { 
        CompanyID,     
        CategoryDescLan1, 
        CategoryDescLan2,   
        IsActive,   
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const ItemCategory = await prisma.invItemCategory.create({
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
        message: 'ItemCategory created successfully!',
        ItemCategory,
      });
    } catch (error) {
      console.error('Error creating ItemCategory:', error);
      res.status(500).json({
        message: 'Error creating ItemCategory',
        error: error.message,
      });
    }
  };
  
  const getItemCategories = async (req, res) => {
    try {
      const ItemCategories = await prisma.invItemCategory.findMany();
      res.status(200).json(ItemCategories);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemCategoryById = async (req, res) => {
    try {
      const ItemCategory = await prisma.invItemCategory.findUnique({
        where: { ItemCategoryID: parseInt(req.params.id) },
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
  
  const updateItemCategory = async (req, res) => {
    try {
      const { 
        CompanyID,     
        CategoryDescLan1, 
        CategoryDescLan2,   
        IsActive,   
        LastUpdateByUserID
      } = req.body;
  
      const ItemCategory = await prisma.invItemCategory.update({
        where: { ItemCategoryID: parseInt(req.params.id) },
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
  
  
  const deleteItemCategory = async (req, res) => { 
    try {
      await prisma.invItemCategory.delete({
        where: { ItemCategoryID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createItemCategory=createItemCategory;
  module.exports.getItemCategories=getItemCategories;
  module.exports.getItemCategoryById=getItemCategoryById;
  module.exports.updateItemCategory=updateItemCategory;
  module.exports.deleteItemCategory=deleteItemCategory;