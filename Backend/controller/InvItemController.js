const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;
const path = require('path');

const createItem = async (req, res) => {
  const {
    itemID, 
    CompanyID, ItemKindID, ItemCategoryID, ItemCategory2ID,
    ItemCategory3ID, ItemNameLan1, ItemNameLan2, ItemUnitListID,
    ItemBarcode, ItemIsActive, ItemNearExpiryPeriod, IsProductionItem,
    CreatedByUserID, LastUpdateByUserID,
    ClassID, ItemCost, PListSellPrice1, PListSellPrice2,
    PListReturnPrice1, PListReturnPrice2, PListSellingDefaultUnit,
    PListCreationDate
  } = req.body;

  let itemImagePathForDb = null;
  let itemFileSystemPath = null;

  if (req.file) {
    const originalExt = path.extname(req.file.originalname);
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${originalExt}`;
    itemImagePathForDb = `/public/uploads/item_images/${uniqueFilename}`;
    itemFileSystemPath = path.join(__dirname, '..', 'public', 'uploads', 'item_images', uniqueFilename);
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const item = await prisma.invItem.create({
        data: {
          
          CompanyID: parseInt(CompanyID),
          ItemKindID: parseInt(ItemKindID),
          ItemCategoryID: parseInt(ItemCategoryID),
          ItemCategory2ID: parseInt(ItemCategory2ID),
          ItemCategory3ID: parseInt(ItemCategory3ID),
          ItemNameLan1, 
          ItemNameLan2, 
          ItemUnitListID: parseInt(ItemUnitListID),
          ItemBarcode,
          ItemImage: itemImagePathForDb,
          ItemCreationDate: new Date(),
          ItemIsActive: ItemIsActive === 'true',
          ItemNearExpiryPeriod: parseInt(ItemNearExpiryPeriod),
          IsProductionItem: IsProductionItem === 'true',
          CreatedByUserID: parseInt(CreatedByUserID),
          LastUpdateByUserID: parseInt(LastUpdateByUserID),
          LastUpdateDate: new Date()
        },
      });

      const priceList = await prisma.salPriceList.create({
        data: {
          CompanyID:parseInt(CompanyID),
          ClassID: parseInt(ClassID), 
          ItemID: item.ItemID, 
          ItemCost: parseFloat(ItemCost),
          PListSellPrice1: parseFloat(PListSellPrice1),
          PListSellPrice2: parseFloat(PListSellPrice2),
          PListReturnPrice1: parseFloat(PListReturnPrice1),
          PListReturnPrice2: parseFloat(PListReturnPrice2), 
          PListSellingDefaultUnit: parseInt(PListSellingDefaultUnit),
          PListCreationDate: new Date(PListCreationDate),
          PListLastUpdateDate: new Date(),
          PListCreatedByUserID:parseInt(CreatedByUserID),
          PListLastUpdateByUserID:parseInt (CreatedByUserID),
        },
      });

      if (req.file && itemFileSystemPath) {
        await fs.mkdir(path.dirname(itemFileSystemPath), { recursive: true });
        await fs.writeFile(itemFileSystemPath, req.file.buffer);
      }

      return { item, priceList };
    });

    res.status(201).json({
      message: 'Item and Price List created successfully!',
      result,
    });

  } catch (error) {
    console.error('Error creating Item and Price List:', error);
    res.status(500).json({
      message: 'Error creating Item and Price List',
      error: error.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const Items = await prisma.invItem.findMany();
    res.status(200).json(Items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const Item = await prisma.invItem.findUnique({
      where: { ItemID: parseInt(req.params.id) },
    });
    if (Item) {
      res.status(200).json(Item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getLastItemId = async () => {
//   const result = await prisma.$queryRaw`
//     SELECT ItemID 
//     FROM invItem 
//     ORDER BY ItemID DESC ;
//   `;
//   return result[0]?.ItemID ?? 0;
// };

const updateItem = async (req, res) => {
  const itemID = parseInt(req.params.id);
  const {
    CompanyID, ItemKindID, ItemCategoryID, ItemCategory2ID, ItemCategory3ID,
    ItemNameLan1, ItemNameLan2, ItemUnitListID, ItemBarcode, ItemIsActive,
    ItemNearExpiryPeriod, IsProductionItem, LastUpdateByUserID,
    ItemImage,
    ClassID, ItemCost, PListSellPrice1, PListSellPrice2, PListReturnPrice1,
    PListReturnPrice2, PListSellingDefaultUnit, PListCreationDate,
  } = req.body;

  let newImagePathForDb = ItemImage;
  let newFileSystemPath = null;
  let oldFileSystemPath = null;

  try {
    const currentItem = await prisma.invItem.findUnique({
      where: { ItemID: itemID },
    });

    if (!currentItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (currentItem.ItemImage) {
      oldFileSystemPath = path.join(__dirname, '..', currentItem.ItemImage.replace('/public/uploads/', 'public/uploads/'));
    }

    if (req.file) {
      const originalExt = path.extname(req.file.originalname);
      const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${originalExt}`;
      newImagePathForDb = `/public/uploads/item_images/${uniqueFilename}`;
      newFileSystemPath = path.join(__dirname, '..', 'public', 'uploads', 'item_images', uniqueFilename);
    } else if (ItemImage === null || ItemImage === '') {
      newImagePathForDb = null;
    }

    const itemDataToUpdate = {
      CompanyID, ItemKindID, ItemCategoryID, ItemCategory2ID, ItemCategory3ID,
      ItemNameLan1, ItemNameLan2, ItemUnitListID, ItemBarcode, ItemIsActive,
      ItemNearExpiryPeriod, IsProductionItem, LastUpdateDate: new Date(), LastUpdateByUserID,
      ItemImage: newImagePathForDb,
    };

    const result = await prisma.$transaction(async (prisma) => {
      const updatedItem = await prisma.invItem.update({
        where: { ItemID: itemID },
        data: itemDataToUpdate,
      });

      const updatedPriceList = await prisma.salPriceList.updateMany({
        where: { ItemID: itemID },
        data: {
          CompanyID,
          ClassID,
          ItemCost,
          PListSellPrice1,
          PListSellPrice2,
          PListReturnPrice1,
          PListReturnPrice2,
          PListSellingDefaultUnit,
          PListCreationDate: new Date(PListCreationDate),
          PListLastUpdateDate: new Date(),
          PListLastUpdateByUserID: LastUpdateByUserID,
        },
      });

      if (newFileSystemPath && req.file) {
        await fs.mkdir(path.dirname(newFileSystemPath), { recursive: true });
        await fs.writeFile(newFileSystemPath, req.file.buffer);
        if (oldFileSystemPath && oldFileSystemPath !== newFileSystemPath) {
          try {
            await fs.unlink(oldFileSystemPath);
          } catch (unlinkError) {
            console.error('Error deleting old image file:', unlinkError);
          }
        }
      } else if (newImagePathForDb === null && oldFileSystemPath) {
        try {
          await fs.unlink(oldFileSystemPath);
        } catch (unlinkError) {
          console.error('Error deleting old image file during removal:', unlinkError);
        }
      }

      return { updatedItem, updatedPriceList };
    });

    res.status(200).json({
      message: 'Item and Price List updated successfully!',
      result,
    });

  } catch (error) {
    console.error('Error updating Item and Price List:', error);
    res.status(500).json({
      message: 'Error updating Item and Price List',
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemID = parseInt(req.params.id);

    await prisma.$transaction(async (prisma) => {
      await prisma.salPriceList.delete({
        where: { ItemID: itemID },
      });

      await prisma.invItem.delete({
        where: { ItemID: itemID },
      });
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting Item and Price List:', error);
    res.status(500).json({
      message: 'Error deleting Item and Price List',
      error: error.message,
    });
  }
};

module.exports.createItem = createItem;
module.exports.updateItem = updateItem;
module.exports.getItems = getItems;
module.exports.getItemById = getItemById;
// module.exports.getLastItemId = getLastItemId;
module.exports.deleteItem = deleteItem;
