const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
  
  const createCustomerHCategory= async (req, res) => {
    try {
      const { 
        HCategoryDescLan1 ,   
        HCategoryDescLan2 , 
        CreatedByUserID  
      } = req.body;
  console.log('here',req.body)
      const SalCustomerHCategory= await prisma.salCustomerHCategory.create({
        data: {  
        HCategoryDescLan1 ,   
        HCategoryDescLan2 , 
        HCategoryCreationDate  : new Date(),
        LastUpdateDate : new Date(),
        LastUpdateByUserID :CreatedByUserID,
        CreatedByUserID  
        },
      });
  
      res.status(201).json({
        message: 'Customer HCategory created successfully!',
        CustomerHCategory,
      });
    } catch (error) {
      console.error('Error creating Customer HCategory:', error);
      res.status(500).json({
        message: 'Error creating Customer HCategory',
        error: error.message,
      });
    }
  };
  
  const getCustomerHCategories = async (req, res) => {
    try {
      const CustomerHCategories = await prisma.salCustomerHCategory.findMany();
      res.status(200).json(CustomerHCategories);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCustomerHCategoryById = async (req, res) => {
    try {
      const CustomerHCategory = await prisma.salCustomerHCategory.findUnique({
        where: { HCategoryID: parseInt(req.params.id) },
      });
      if (CustomerHCategory) {
        res.status(200).json(CustomerHCategory);
      } else {
        res.status(404).json({ error: 'Customer HCategory not  found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCustomerHCategory= async (req, res) => {
    try {
      const { 
        HCategoryDescLan1 ,   
        HCategoryDescLan2 , 
        LastUpdateByUserID
      } = req.body;
  
      const CustomerHCategory = await prisma.salCustomerHCategory.update({
        where: { HCategoryID: parseInt(req.params.id) },
        data: { 
          HCategoryDescLan1 ,   
          HCategoryDescLan2 , 
          LastUpdateByUserID ,
          LastUpdateDate : new Date(),
        },
      });
  
      res.status(200).json({
        message: 'Customer HCategory updated successfully!',
        CustomerHCategory,
      });
    } catch (error) {
      console.error('Error updating Customer HCategory:', error);
      res.status(500).json({
        message: 'Error updating Customer HCategory',
        error: error.message,
      });
    }
  };
  
  
  const deleteCustomerHCategory= async (req, res) => { 
    try {
      await prisma.salCustomerHCategory.delete({
        where: { HCategoryID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createCustomerHCategory=createCustomerHCategory;
  module.exports.getCustomerHCategories=getCustomerHCategories;
  module.exports.getCustomerHCategoryById=getCustomerHCategoryById;
  module.exports.updateCustomerHCategory=updateCustomerHCategory;
  module.exports.deleteCustomerHCategory=deleteCustomerHCategory;