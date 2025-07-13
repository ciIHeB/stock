const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createSalesManager= async (req, res) => {
  try {
    const { 
      CompanyID, UserID,
      SMNameLan1 ,SMNameLan2 , SMMobile,SMEmail,SMAddress,   
      CanViewAllInfo ,SMIsActive ,
      CreatedByUserID 
    } = req.body;

    const SalesManager = await prisma.genSalesManager.create({
      data: {
        CompanyID, UserID,
        SMNameLan1 ,SMNameLan2 , SMMobile,SMEmail,SMAddress,   
        CanViewAllInfo ,SMIsActive ,
        LastUpdateDate: new Date(),
        LastUpdateByUserID: CreatedByUserID,
        SMCreationDate: new Date(),
        CreatedByUserID
      },
    });

    res.status(201).json({
      message: 'Sales Manager created successfully!',
      SalesManager,
    });
  } catch (error) {
    console.error('Error creating Sales Manager:', error);
    res.status(500).json({
      message: 'Error creating Sales Manager',
      error: error.message,
    });
  }
};
const getSalesManagers = async (req, res) => {
  try {
    const SalesManagers = await prisma.genSalesManager.findMany();
    res.status(200).json(SalesManagers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalesManagerById = async (req, res) => {
  try {
    const SalesManager = await prisma.genSalesManager.findUnique({
      where: { SMID: parseInt(req.params.id) },
    });
    if (SalesManager) {
      res.status(200).json(SalesManager);
    } else {
      res.status(404).json({ error: 'Sales Manager not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSalesManager = async (req, res) => {
  try {
    const {
      CompanyID, UserID,
      SMNameLan1 ,SMNameLan2 , SMMobile,SMEmail,SMAddress,   
      CanViewAllInfo ,SMIsActive ,
      LastUpdateByUserID
    } = req.body;

    const SalesManager = await prisma.genSalesManager.update({
      where: { SMID: parseInt(req.params.id) },
      data: {
        CompanyID, UserID,
      SMNameLan1 ,SMNameLan2 , SMMobile,SMEmail,SMAddress,   
      CanViewAllInfo ,SMIsActive ,
      LastUpdateByUserID,
      LastUpdateDate: new Date()
      },
    });

    res.status(200).json({
      message: 'Sales Manager updated successfully!',
      SalesManager,
    });
  } catch (error) {
    console.error('Error updating Sales Manager:', error);
    res.status(500).json({
      message: 'Error updating Sales Manager',
      error: error.message,
    });
  }
};


const deleteSalesManager = async (req, res) => { 
  try {
    await prisma.genSalesManager.delete({
      where: { SMID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createSalesManager=createSalesManager;
module.exports.getSalesManagers=getSalesManagers;
module.exports.getSalesManagerById=getSalesManagerById;
module.exports.updateSalesManager=updateSalesManager;
module.exports.deleteSalesManager=deleteSalesManager;