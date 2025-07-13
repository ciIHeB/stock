const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createPaymentMethod= async (req, res) => {
    try {
      const { 
        PaymentMethodLan1,
        PaymentMethodLan2 ,  
        CreatedByUserID  
      } = req.body;
  console.log('here',req.body)
      const GenPaymentMethod= await prisma.genPaymentMethod.create({
        data: {
        PaymentMethodLan1,
        PaymentMethodLan2 ,  
        PaymentMethodCreationDate  : new Date(),
        LastUpdateDate : new Date(),
        LastUpdateByUserID :CreatedByUserID,
        CreatedByUserID  
        },
      });
  
      res.status(201).json({
        message: 'GenPaymentMethodcreated successfully!',
        GenPaymentMethod,
      });
    } catch (error) {
      console.error('Error creating InvStore:', error);
      res.status(500).json({
        message: 'Error creating InvStore',
        error: error.message,
      });
    }
  };
  
  const getPaymentMethods = async (req, res) => {
    try {
      const invItems = await prisma.genPaymentMethod.findMany();
      res.status(200).json(invItems);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getPaymentMethodById = async (req, res) => {
    try {
      const InvItem = await prisma.genPaymentMethod.findUnique({
        where: { PaymentMethodID: parseInt(req.params.id) },
      });
      if (InvItem) {
        res.status(200).json(InvItem);
      } else {
        res.status(404).json({ error: 'GenPaymentMethodnot found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updatePaymentMethod= async (req, res) => {
    try {
      const { 
        PaymentMethodLan1,
        PaymentMethodLan2 , 
        LastUpdateByUserID
      } = req.body;
  
      const InvItem = await prisma.genPaymentMethod.update({
        where: { PaymentMethodID: parseInt(req.params.id) },
        data: {
          PaymentMethodLan1,
          PaymentMethodLan2 ,  
          LastUpdateByUserID ,
          LastUpdateDate : new Date(),
        },
      });
  
      res.status(200).json({
        message: 'GenPaymentMethodupdated successfully!',
        InvItem,
      });
    } catch (error) {
      console.error('Error updating InvStore:', error);
      res.status(500).json({
        message: 'Error updating InvStore',
        error: error.message,
      });
    }
  };
  
  
  const deletePaymentMethod= async (req, res) => { 
    try {
      await prisma.genPaymentMethod.delete({
        where: { PaymentMethodID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports.createPaymentMethod=createPaymentMethod;
module.exports.getPaymentMethods=getPaymentMethods;
module.exports.getPaymentMethodById=getPaymentMethodById;
module.exports.updatePaymentMethod=updatePaymentMethod;
module.exports.deletePaymentMethod=deletePaymentMethod;