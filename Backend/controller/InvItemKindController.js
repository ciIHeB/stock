const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
  
  const createItemKind = async (req, res) => {
    try {
      const {      
        ItemKindLan1,   
        ItemKindLan2,     
        IsActive,
        CreatedByUserID
      } = req.body;
  console.log('here',req.body)
      const ItemKind = await prisma.invItemKind.create({
        data: {
          ItemKindLan1,   
          ItemKindLan2,     
          IsActive,
          ItemKindCreationDate: new Date(), 
          LastUpdateDate: new Date(),      
          LastUpdateByUserID: CreatedByUserID,
          CreatedByUserID
        },
      });
  
      res.status(201).json({
        message: 'Item Kind created successfully!',
        ItemKind,
      });
    } catch (error) {
      console.error('Error creating Item Kind:', error);
      res.status(500).json({
        message: 'Error creating Item Kind',
        error: error.message,
      });
    }
  };
  
  const getItemKinds = async (req, res) => {
    try {
      const ItemKind = await prisma.invItemKind.findMany();
      res.status(200).json(ItemKind);
    } catch (error) {
      console.error(error); // Add for debugging
      res.status(500).json({ error: error.message });
    }
  };
  
  const getItemKindById = async (req, res) => {
    try {
      const ItemKind = await prisma.invItemKind.findUnique({
        where: { ItemKindID: parseInt(req.params.id) },
      });
      if (ItemKind) {
        res.status(200).json(ItemKind);
      } else {
        res.status(404).json({ error: 'Item Kind not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateItemKind = async (req, res) => {
    try {
      const { 
        ItemKindLan1,   
        ItemKindLan2,     
        IsActive,
        LastUpdateByUserID 
      } = req.body;
  
      const ItemKind = await prisma.invItemKind.update({
        where: { ItemKindID: parseInt(req.params.id) },
        data: {
            ItemKindLan1,   
            ItemKindLan2,     
            IsActive,
            LastUpdateDate    :new Date(),      
            LastUpdateByUserID  
        },
      });
  
      res.status(200).json({
        message: 'ItemKind updated successfully!',
        ItemKind,
      });
    } catch (error) {
      console.error('Error updating ItemKind:', error);
      res.status(500).json({
        message: 'Error updating ItemKind',
        error: error.message,
      });
    }
  };
  
  
  const deleteItemKind = async (req, res) => { 
    try {
      await prisma.invItemKind.delete({
        where: { ItemKindID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createItemKind=createItemKind;
  module.exports.getItemKinds=getItemKinds;
  module.exports.getItemKindById=getItemKindById;
  module.exports.updateItemKind=updateItemKind;
  module.exports.deleteItemKind=deleteItemKind;