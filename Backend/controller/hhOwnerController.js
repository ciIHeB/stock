const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const createOwner = async (req, res) => {
  try {
    const {
      // user data  
      HHUserName  ,HHUserPassword ,
      // owner  data
      CompanyID ,BranchID ,  SupervisorID,StoreID,DefaultPrinterID, OwnerACKey,
        OwnerDescLan1  ,
        OwnerMaxStockVal  ,OwnerDefaultWHID  ,OwnerCreditLimitValue,
        OwnerAutoSynchMode ,OwnerIsActive,
        CreatedByUserID ,LastUpdatedByUserID
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(HHUserPassword, salt);

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.hhUser.create({
        data: {
          CompanyID ,BranchID ,  
          HHUserDescLan1:HHUserName ,HHUserDescLan2:HHUserName ,HHUserName,HHUserPassword:hashedPassword,
          HHUserIsActive:Boolean(parseInt(OwnerIsActive, 10)),
          HHUserCreationDate: new Date(),
          HHUserLastUpdateTime: new Date(), 
          LastUpdatedByUserID ,
          CreatedByUserID 
        },
      });

      const owner = await prisma.hhOwner.create({
        data: {
          CompanyID ,BranchID ,  SupervisorID,UserID:user.HHUserID,StoreID,DefaultPrinterID:null, OwnerACKey:null,
          OwnerDescLan1 ,OwnerDescLan2:OwnerDescLan1 ,
          OwnerMaxStockVal  ,OwnerDefaultWHID  ,OwnerCreditLimitValue,
          OwnerAutoSynchMode:Boolean(parseInt(OwnerAutoSynchMode, 10)) ,
          OwnerIsActive:Boolean(parseInt(OwnerIsActive, 10)),
          OwnerImage : null ,
          OwnerCreationDate: new Date(),
          OwnerLastUpdateTime: new Date(), 
          LastUpdatedByUserID ,
          CreatedByUserID 
        },
      });

      return { user, owner };
    });

    res.status(201).json({
      message: 'Owner  successfully!',
      result,
    });
  } catch (error) {
    console.error('Error creating Owner:', error);
    res.status(500).json({
      message: 'Error creating Owner',
      error: error.message,
    });
  }
};

  
  const getOwners = async (req, res) => {
    try {
      const Owners = await prisma.hhOwner.findMany();
      res.status(200).json(Owners);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
 const getOwnerById = async (req, res) => {
    try {
      const Owner = await prisma.hhOwner.findUnique({
        where: { OwnerID: parseInt(req.params.id) },
      });
      if (Owner) {
        res.status(200).json(Owner);
      } else {
        res.status(404).json({ error: 'Owner not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateOwner = async (req, res) => {
    try {
      const {
        // User data
        HHUserName, HHUserPassword,
        // Owner data
        CompanyID, BranchID, SupervisorID, UserID, StoreID, DefaultPrinterID, OwnerACKey,
        OwnerDescLan1,
        OwnerMaxStockVal, OwnerDefaultWHID, OwnerCreditLimitValue,
        OwnerAutoSynchMode ,OwnerIsActive,OwnerLastUpdateTime,
        LastUpdatedByUserID,
      } = req.body;
  
      const result = await prisma.$transaction(async (prisma) => {
        // Update user details
        const user = await prisma.hhUser.update({
          where: { HHUserID: UserID },
          data: {
            HHUserDescLan1: HHUserName,
            HHUserDescLan2: HHUserName,
            HHUserName,
            ...(HHUserPassword && {
              HHUserPassword: await bcrypt.hash(HHUserPassword, await bcrypt.genSalt()),
            }),
            HHUserIsActive: Boolean(parseInt(OwnerIsActive, 10)),
            HHUserLastUpdateTime:OwnerLastUpdateTime,
            LastUpdatedByUserID,
          },
        });
  
        // Update owner details
        const owner = await prisma.hhOwner.update({
          where: { OwnerID: parseInt(req.params.id) },
          data: {
            CompanyID ,BranchID ,  SupervisorID,StoreID,DefaultPrinterID, OwnerACKey,
            OwnerDescLan1 ,OwnerDescLan2:OwnerDescLan1 ,
            OwnerMaxStockVal  ,OwnerDefaultWHID  ,OwnerCreditLimitValue,
            OwnerAutoSynchMode ,
            OwnerIsActive,
            OwnerLastUpdateTime, 
            LastUpdatedByUserID , 
          },
        });
  
        return { user, owner };
      });
  
      res.status(200).json({
        message: 'Owner and User updated successfully!',
        result,
      });
    } catch (error) {
      console.error('Error updating Owner and User:', error);
      res.status(500).json({
        message: 'Error updating Owner and User',
        error: error.message,
      });
    }
  };
  
  
  
  const deleteOwner= async (req, res) => { 
    try {
      await prisma.hhOwner.delete({
        where: { OwnerID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports.createOwner=createOwner;
module.exports.getOwners=getOwners;
module.exports.getOwnerById=getOwnerById;
module.exports.updateOwner=updateOwner;
module.exports.deleteOwner=deleteOwner;