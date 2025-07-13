const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createItemCategory3 = async (req, res) => {
    try {
      const { 
        CompanyID,     
        CategoryDescLan1, 
        CategoryDescLan2,   
        IsActive,   
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const ItemCategory = await prisma.invItemCategory3.create({
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
        message: 'Item Category 3 created successfully!',
        ItemCategory,
      });
    } catch (error) {
      console.error('Error creating Item Category 3:', error);
      res.status(500).json({
        message: 'Error creating Item Category 3',
        error: error.message,
      });
    }
  };
  
  const getItemCategories3 = async (req, res) => {
    try {
      const ItemCategories = await prisma.invItemCategory3.findMany();
      res.status(200).json(ItemCategories);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemCategory3ById = async (req, res) => {
    try {
      const ItemCategory = await prisma.invItemCategory3.findUnique({
        where: { ItemCategory3ID: parseInt(req.params.id) },
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
  
  const updateItemCategory3 = async (req, res) => {
    try {
      const { 
        CompanyID,     
        CategoryDescLan1, 
        CategoryDescLan2,   
        IsActive,   
        LastUpdateByUserID
      } = req.body;
  
      const ItemCategory = await prisma.invItemCategory3.update({
        where: { ItemCategory3ID: parseInt(req.params.id) },
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
        message: 'Item Category updated successfully!',
        ItemCategory,
      });
    } catch (error) {
      console.error('Error updating Item Category:', error);
      res.status(500).json({
        message: 'Error updating Item Category',
        error: error.message,
      });
    }
  };
  
  
  const deleteItemCategory3 = async (req, res) => { 
    try {
      await prisma.invItemCategory3.delete({
        where: { ItemCategoryID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createItemCategory3=createItemCategory3;
  module.exports.getItemCategories3=getItemCategories3;
  module.exports.getItemCategory3ById=getItemCategory3ById;
  module.exports.updateItemCategory3=updateItemCategory3;
  module.exports.deleteItemCategory3=deleteItemCategory3;