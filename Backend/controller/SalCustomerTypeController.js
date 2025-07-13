const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createCustomerType= async (req, res) => {
    try {
      const { 
        CustomerTypeDescLan1,     
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const CustomerType= await prisma.salCustomerType.create({
        data: {
          CustomerTypeDescLan1,
          CustomerTypeCreationDate : new Date(), 
          LastUpdateDate: new Date(), 
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Customer Type created successfully!',
        CustomerType,
      });
    } catch (error) {
      console.error('Error creating Customer Type:', error);
      res.status(500).json({
        message: 'Error creating Customer Type',
        error: error.message,
      });
    }
  };
  
  const getCustomerTypes = async (req, res) => {
    try {
      const CustomerTypes = await prisma.salCustomerType.findMany();
      res.status(200).json(CustomerTypes);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCustomerTypeById = async (req, res) => {
    try {
      const InvItem = await prisma.salCustomerType.findUnique({
        where: { CustomerTypeID: parseInt(req.params.id) },
      });
      if (CustomerType) {
        res.status(200).json(CustomerType);
      } else {
        res.status(404).json({ error: 'Customer Type not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCustomerType= async (req, res) => {
    try {
      const { 
        CustomerTypeDescLan1,
        LastUpdateByUserID 
      } = req.body;
  
      const CustomerType = await prisma.salCustomerType.update({
        where: { CustomerTypeID: parseInt(req.params.id) },
        data: {
          CustomerTypeDescLan1,
          LastUpdateDate: new Date(), 
          LastUpdateByUserID 
        },
      });
  
      res.status(200).json({
        message: 'Customer Type updated successfully!',
        CustomerType,
      });
    } catch (error) {
      console.error('Error updating Customer Type:', error);
      res.status(500).json({
        message: 'Error updating Customer Type',
        error: error.message,
      });
    }
  };
  
  
  const deleteCustomerType= async (req, res) => { 
    try {
      await prisma.salCustomerType.delete({
        where: { CustomerTypeID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createCustomerType=createCustomerType;
  module.exports.getCustomerTypes=getCustomerTypes;
  module.exports.getCustomerTypeById=getCustomerTypeById;
  module.exports.updateCustomerType=updateCustomerType;
  module.exports.deleteCustomerType=deleteCustomerType;