const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

  const createOwnerItem= async (req, res) => {
    try {
      
      const { 
        CompanyID,BranchID, OwnerID,ItemID,
        MinQty, MaxQty, RecommendedQty,
        ViewInSales,ViewInReturn,ViewInPricing,ViewInOrderTaking,ViewInOrderDelivery,
        ViewInStockRequest,ViewInStocktaking,ViewInTarget ,
        CreatedByUserID 
      } = req.body;

      const OwnerItem= await prisma.hhOwnerItem.create({
        data: {
          CompanyID,BranchID, OwnerID,ItemID,
          MinQty, MaxQty, RecommendedQty,
          ViewInSales,ViewInReturn,ViewInPricing,ViewInOrderTaking,ViewInOrderDelivery,
          ViewInStockRequest,ViewInStocktaking,ViewInTarget ,
          CreationDate: new Date(),
          LastUpdateTime: new Date(), 
          LastUpdatedByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Owner Item created successfully!',
        OwnerItem,
      });
    } catch (error) {
      console.error('Error creating Owner Item:', error);
      res.status(500).json({
        message: 'Error creating Owner Item',
        error: error.message,
      });
    }
  };
  
  const getOwnerItems = async (req, res) => {
    try {
      const OwnerItems = await prisma.hhOwnerItem.findMany();
      res.status(200).json(OwnerItems);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getOwnerItemById = async (req, res) => {
    try {
      const OwnerItem = await prisma.hhOwnerItem.findUnique({
        where: { DefaultUnitID: parseInt(req.params.id) },
      });
      if (OwnerItem) {
        res.status(200).json(OwnerItem);
      } else {
        res.status(404).json({ error: 'Owner Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateOwnerItem= async (req, res) => {
    try {
      const { 
        CompanyID,BranchID, OwnerID,ItemID,
        MinQty, MaxQty, RecommendedQty,
        ViewInSales,ViewInReturn,ViewInPricing,ViewInOrderTaking,ViewInOrderDelivery,
        ViewInStockRequest,ViewInStocktaking,ViewInTarget ,
        LastUpdatedByUserID 
      } = req.body;

      const OwnerItem = await prisma.hhOwnerItem.update({
        where: { DefaultUnitID: parseInt(req.params.id) },
        data: { 
          CompanyID,BranchID, OwnerID,ItemID,
          MinQty, MaxQty, RecommendedQty,
          ViewInSales,ViewInReturn,ViewInPricing,ViewInOrderTaking,ViewInOrderDelivery,
          ViewInStockRequest,ViewInStocktaking,ViewInTarget ,
          LastUpdatedByUserID ,
          LastUpdateTime: new Date()
        },
      });
  
      res.status(200).json({
        message: 'Owner Item updated successfully!',
        OwnerItem,
      });
    } catch (error) {
      console.error('Error updating Owner Item:', error);
      res.status(500).json({
        message: 'Error updating Owner Item',
        error: error.message,
      });
    }
  };
  
  
  const deleteOwnerItem= async (req, res) => { 
    try {
      await prisma.hhOwnerItem.delete({
        where: { DefaultUnitID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createOwnerItem=createOwnerItem;
  module.exports.getOwnerItems=getOwnerItems;
  module.exports.getOwnerItemById=getOwnerItemById;
  module.exports.updateOwnerItem=updateOwnerItem;
  module.exports.deleteOwnerItem=deleteOwnerItem;  