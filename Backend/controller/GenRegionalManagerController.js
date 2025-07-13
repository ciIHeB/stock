const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createRegionalManager= async (req, res) => {
  try {
    const { 
      CompanyID , UserID  ,SMID,
      RMNameLan1 ,  RMNameLan2 ,  RMMobile ,    RMEmail  ,    RMAddress ,  
      CanViewAllInfo ,  RMIsActive ,
      CreatedByUserID 
    } = req.body;

    const RegionalManager = await prisma.genRegionalManager.create({
      data: {
        CompanyID, UserID  ,SMID,
        RMNameLan1 ,  RMNameLan2 ,  RMMobile ,    RMEmail  ,    RMAddress ,  
        CanViewAllInfo ,  RMIsActive ,
        LastUpdateDate: new Date(),
        LastUpdateByUserID: CreatedByUserID,
        RMCreationDate: new Date(),
        CreatedByUserID
      },
    });

    res.status(201).json({
      message: 'Regional Manager created successfully!',
      RegionalManager,
    });
  } catch (error) {
    console.error('Error creating Regional Manager:', error);
    res.status(500).json({
      message: 'Error creating  Regional Manager',
      error: error.message,
    });
  }
};
const getRegionalManagers = async (req, res) => {
  try {
    const RegionalManagers = await prisma.genRegionalManager.findMany();
    res.status(200).json(RegionalManagers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRegionalManagerById = async (req, res) => {
  try {
    const RegionalManager = await prisma.genRegionalManager.findUnique({
      where: { RMID: parseInt(req.params.id) },
    });
    if (RegionalManager) {
      res.status(200).json(RegionalManager);
    } else {
      res.status(404).json({ error: 'Regional Manager not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRegionalManager = async (req, res) => {
  try {
    const {
      CompanyID , UserID  ,
      RMNameLan1 ,  RMNameLan2 ,  RMMobile ,    RMEmail  ,    RMAddress ,  
      CanViewAllInfo ,  RMIsActive ,
  LastUpdateByUserID
    } = req.body;

    const RegionalManager = await prisma.genRegionalManager.update({
      where: { RMID: parseInt(req.params.id) },
      data: {
        CompanyID , UserID  ,
      RMNameLan1 ,  RMNameLan2 ,  RMMobile ,    RMEmail  ,    RMAddress ,  
      CanViewAllInfo ,  RMIsActive ,
  LastUpdateByUserID,
  LastUpdateDate: new Date()
      },
    });

    res.status(200).json({
      message: 'Regional Manager updated successfully!',
      RegionalManager,
    });
  } catch (error) {
    console.error('Error updating Regional Manager:', error);
    res.status(500).json({
      message: 'Error updating Regional Manager',
      error: error.message,
    });
  }
};


const deleteRegionalManager = async (req, res) => { 
  try {
    await prisma.genRegionalManager.delete({
      where: { RMID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createRegionalManager=createRegionalManager;
module.exports.getRegionalManagers=getRegionalManagers;
module.exports.getRegionalManagerById=getRegionalManagerById;
module.exports.updateRegionalManager=updateRegionalManager;
module.exports.deleteRegionalManager=deleteRegionalManager;