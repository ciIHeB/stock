const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createPaymentTerm= async (req, res) => {
    try {
      const { 
        CompanyID,
        PaymentTermLan1,
        PaymentTermLan2 , 
        PaymentTermDueDays, 
        PaymentTermHasAllowance,
        ApplyCheckAllowancePolicy,
        CreatedByUserID  
      } = req.body;
  console.log('here',req.body)
      const PaymentTerm= await prisma.genPaymentTerm.create({
        data: {
          CompanyID,
          PaymentTermLan1,
          PaymentTermLan2 , 
          PaymentTermDueDays, 
          PaymentTermHasAllowance,
          ApplyCheckAllowancePolicy, 
          PaymentTermCreationDate  : new Date(),
          LastUpdateDate : new Date(),
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID  
        },
      });
  
      res.status(201).json({
        message: 'Payment Term created successfully!',
        PaymentTerm,
      });
    } catch (error) {
      console.error('Error creating Payment Term:', error);
      res.status(500).json({
        message: 'Error creating Payment Term',
        error: error.message,
      });
    }
  };
  
  const getPaymentTerms = async (req, res) => {
    try {
      const PaymentTerms = await prisma.genPaymentTerm.findMany();
      res.status(200).json(PaymentTerms);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getPaymentTermById = async (req, res) => {
    try {
      const PaymentTerm = await prisma.genPaymentTerm.findUnique({
        where: { PaymentTermID: parseInt(req.params.id) },
      });
      if (PaymentTerm) {
        res.status(200).json(PaymentTerm);
      } else {
        res.status(404).json({ error: 'Payment Term not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updatePaymentTerm= async (req, res) => {
    try {
      const { 
        CompanyID,
        PaymentTermLan1,
        PaymentTermLan2 , 
        PaymentTermDueDays, 
        PaymentTermHasAllowance,
        ApplyCheckAllowancePolicy,
        LastUpdateByUserID
      } = req.body;
  
      const PaymentTerm = await prisma.genPaymentTerm.update({
        where: { PaymentTermID: parseInt(req.params.id) },
        data: {
          CompanyID,
          PaymentTermLan1,
          PaymentTermLan2 , 
          PaymentTermDueDays, 
          PaymentTermHasAllowance,
          ApplyCheckAllowancePolicy, 
          LastUpdateByUserID ,
          LastUpdateDate : new Date(),
        },
      });
  
      res.status(200).json({
        message: 'Payment Term updated successfully!',
        PaymentTerm,
      });
    } catch (error) {
      console.error('Error updating Payment Term:', error);
      res.status(500).json({
        message: 'Error updating Payment Term',
        error: error.message,
      });
    }
  };
  
  
  const deletePaymentTerm= async (req, res) => { 
    try {
      await prisma.genPaymentTerm.delete({
        where: { PaymentTermID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports.createPaymentTerm=createPaymentTerm;
module.exports.getPaymentTerms=getPaymentTerms;
module.exports.getPaymentTermById=getPaymentTermById;
module.exports.updatePaymentTerm=updatePaymentTerm;
module.exports.deletePaymentTerm=deletePaymentTerm;