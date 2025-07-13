const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createCustomerClass= async (req, res) => {
    try {
      const { 
        CompanyID ,  
        ClassDescLan1 ,   
        ClassDescLan2 , 
        IsActive,
        CreatedByUserID  
      } = req.body;
  console.log('here',req.body)
      const CustomerClass= await prisma.salCustomerClass.create({
        data: {
        CompanyID ,  
        ClassDescLan1 ,   
        ClassDescLan2 , 
        IsActive,
        ClassCreationDate  : new Date(),
        LastUpdateDate : new Date(),
        LastUpdateByUserID :CreatedByUserID,
        CreatedByUserID  
        },
      });
  
      res.status(201).json({
        message: 'Customer Class created successfully!',
        CustomerClass,
      });
    } catch (error) {
      console.error('Error creating Customer Class:', error);
      res.status(500).json({
        message: 'Error creating Customer Class',
        error: error.message,
      });
    }
  };
  
  const getCustomerClasss = async (req, res) => {
    try {
      const CustomerClasss = await prisma.salCustomerClass.findMany();
      res.status(200).json(CustomerClasss);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCustomerClassById = async (req, res) => {
    try {
      const CustomerClass = await prisma.salCustomerClass.findUnique({
        where: { ClassID: parseInt(req.params.id) },
      });
      if (CustomerClass) {
        res.status(200).json(CustomerClass);
      } else {
        res.status(404).json({ error: 'Customer Class not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCustomerClass= async (req, res) => {
    try {
      const { 
        CompanyID ,  
        ClassDescLan1 ,   
        ClassDescLan2 , 
        IsActive,
        LastUpdateByUserID
      } = req.body;
  
      const CustomerClass = await prisma.salCustomerClass.update({
        where: { ClassID: parseInt(req.params.id) },
        data: {
          CompanyID ,  
          ClassDescLan1 ,   
          ClassDescLan2 , 
          IsActive,
          LastUpdateByUserID ,
          LastUpdateDate : new Date(),
        },
      });
  
      res.status(200).json({
        message: 'Customer Class updated successfully!',
        CustomerClass,
      });
    } catch (error) {
      console.error('Error updating Customer Class:', error);
      res.status(500).json({
        message: 'Error updating Customer Class',
        error: error.message,
      });
    }
  };
  
  const deleteCustomerClass= async (req, res) => { 
    try {
      await prisma.salCustomerClass.delete({
        where: { ClassID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createCustomerClass=createCustomerClass;
  module.exports.getCustomerClasss=getCustomerClasss;
  module.exports.getCustomerClassById=getCustomerClassById;
  module.exports.updateCustomerClass=updateCustomerClass;
  module.exports.deleteCustomerClass=deleteCustomerClass;