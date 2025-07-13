const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createAreaManager= async (req, res) => {
  try {
    const { 
      CompanyID , RMID, UserID  , AMID,
      AMNameLan1 ,  AMNameLan2 ,  AMMobile ,    AMEmail  ,    AMAddress ,  
      CanViewAllInfo ,  AMIsActive ,
      CreatedByUserID 
    } = req.body;

    const AreaManager = await prisma.genAreaManager.create({
      data: {
        CompanyID , RMID, UserID  ,AMID ,
        AMNameLan1 ,  AMNameLan2 ,  AMMobile ,    AMEmail  ,    AMAddress ,  
        CanViewAllInfo ,  AMIsActive ,
        LastUpdateDate: new Date(),
        LastUpdateByUserID: CreatedByUserID,
        AMCreationDate: new Date(),
        CreatedByUserID,
      },
    });

    res.status(201).json({
      message: ' Area Manager created successfully!',
      AreaManager,
    });
  } catch (error) {
    console.error('Error creating  Area Manager:', error);
    res.status(500).json({
      message: 'Error creating  Area Manager',
      error: error.message,
    });
  }
};
const getAreaManagers = async (req, res) => {
  try {
    const AreaManager = await prisma.genAreaManager.findMany();
    res.status(200).json(AreaManager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAreaManagerById = async (req, res) => {
  try {
    const AreaManager = await prisma.genAreaManager.findUnique({
      where: { AMID: parseInt(req.params.id) },
    });
    if (AreaManager) {
      res.status(200).json(AreaManager);
    } else {
      res.status(404).json({ error: ' Area Manager not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAreaManager = async (req, res) => {
  try {
    const {
      CompanyID , RMID, UserID  ,
      AMNameLan1 ,  AMNameLan2 ,  AMMobile ,    AMEmail  ,    AMAddress ,  
      CanViewAllInfo ,  AMIsActive ,
  LastUpdateByUserID
    } = req.body;

    const AreaManager = await prisma.genAreaManager.update({
      where: { AMID: parseInt(req.params.id) },
      data: {
        CompanyID,  RMID, UserID  ,
        AMNameLan1 ,  AMNameLan2 ,  AMMobile ,    AMEmail  ,    AMAddress ,  
        CanViewAllInfo ,  AMIsActive ,
  LastUpdateByUserID,
  LastUpdateDate: new Date()
      },
    });

    res.status(200).json({
      message: 'Area Manager updated successfully!',
      AreaManager,
    });
  } catch (error) {
    console.error('Error updating Area Manager:', error);
    res.status(500).json({
      message: 'Error updating Area Manager',
      error: error.message,
    });
  }
};


const deleteAreaManager = async (req, res) => { 
  try {
    await prisma.genAreaManager.delete({
      where: { AMID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.createAreaManager=createAreaManager;
module.exports.getAreaManagers=getAreaManagers;
module.exports.getAreaManagerById=getAreaManagerById;
module.exports.updateAreaManager=updateAreaManager;
module.exports.deleteAreaManager=deleteAreaManager;