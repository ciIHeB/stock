const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
                      
  const createItemStatus = async (req, res) => {
    try {
      const { 
        CompanyID,               
        ItemStatusDescLan1, 
        ItemStatusDescLan2,   
        ItemStatusIsActive,  
        ItemStatusMustUseAC,
        CreatedByUserID
      } = req.body;

      const ItemStatus = await prisma.invItemStatus.create({
        data: {
          CompanyID,               
        ItemStatusDescLan1, 
        ItemStatusDescLan2,   
        ItemStatusIsActive,
        ItemStatusCreationDate : new Date(),   
        ItemStatusMustUseAC,
        LastUpdateDate : new Date(), 
        LastUpdateByUserID:CreatedByUserID,
        CreatedByUserID
        },
      });
  
      res.status(201).json({
        message: 'Item Status created successfully!',
        ItemStatus,
      });
    } catch (error) {
      console.error('Error creating Item Status:', error);
      res.status(500).json({
        message: 'Error creating Item Status',
        error: error.message,
      });
    }
  };
  

  const getItemStatus = async (req, res) => {
    try {
      const ItemStatus = await prisma.invItemStatus.findMany();
      res.status(200).json(ItemStatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemStatusById = async (req, res) => {
    try {
      const ItemStatus = await prisma.invItemStatus.findUnique({
        where: { ItemStatusID: parseInt(req.params.id) },
      });
      if (ItemStatus) {
        res.status(200).json(ItemStatus);
      } else {
        res.status(404).json({ error: 'Item Status not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateItemStatus = async (req, res) => {
    try {
      const { 
        CompanyID,               
        ItemStatusDescLan1, 
        ItemStatusDescLan2,   
        ItemStatusIsActive,
        ItemStatusMustUseAC,
        LastUpdateByUserID,
      } = req.body;
  
      const ItemStatus = await prisma.invItemStatus.update({
        where: { ItemStatusID: parseInt(req.params.id) },
        data: {
            CompanyID,               
            ItemStatusDescLan1, 
            ItemStatusDescLan2,   
            ItemStatusIsActive,
            ItemStatusMustUseAC,
            LastUpdateDate : new Date(), 
            LastUpdateByUserID,
        },
      });
  
      res.status(200).json({
        message: 'Item Status updated successfully!',
        ItemStatus,
      });
    } catch (error) {
      console.error('Error updating Item Status:', error);
      res.status(500).json({
        message: 'Error updating Item Status',
        error: error.message,
      });
    }
  };
  
  
  const deleteItemStatus = async (req, res) => { 
    try {
      await prisma.invItemStatus.delete({
        where: { ItemStatusID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createItemStatus=createItemStatus;
  module.exports.getItemStatus=getItemStatus;
  module.exports.getItemStatusById=getItemStatusById;
  module.exports.updateItemStatus=updateItemStatus;
  module.exports.deleteItemStatus=deleteItemStatus;