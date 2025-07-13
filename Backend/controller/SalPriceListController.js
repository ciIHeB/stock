const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPriceList = async (req, res) => {
  try {
    const {
      CompanyID,
      ClassID, 
      ItemID, 
      ItemCost,
      PListSellPrice1, 
      PListSellPrice2, 
      PListReturnPrice1, 
      PListReturnPrice2,
      PListSellingDefaultUnit, 
      PListCreationDate, 
      PListCreatedByUserID
    } = req.body;

    const PriceList = await prisma.salPriceList.create({
      data: {
        CompanyID, 
        ClassID, 
        ItemID, 
        ItemCost,
        PListSellPrice1, 
        PListSellPrice2, 
        PListReturnPrice1, 
        PListReturnPrice2,
        PListSellingDefaultUnit, 
        PListCreationDate: new Date(PListCreationDate),
        PListLastUpdateDate: new Date(),
        PListCreatedByUserID, 
        PListLastUpdateByUserID: PListCreatedByUserID,
      },
    });

    res.status(201).json({
      message: 'Price created successfully!',
      PriceList,
    });
  } catch (error) {
    console.error('Error creating Price:', error);
    res.status(500).json({
      message: 'Error creating Price',
      error: error.message,
    });
  }
};

const getPriceLists = async (req, res) => {
  try {
    const PriceLists = await prisma.salPriceList.findMany();
    res.status(200).json(PriceLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPriceListById = async (req, res) => {
  try {
const PriceList = await prisma.salPriceList.findUnique({
  where: { ItemID: parseInt(req.params.ItemID) },
});
if (PriceList) {
  res.status(200).json(PriceList);
} else {
  res.status(404).json({ error: 'Price not found' });
}
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const updatePriceList = async (req, res) => {
  const { ClassID, ItemID } = req.params;
  try {
    const {
      CompanyID, 
      ItemCost, 
      PListSellPrice1, 
      PListSellPrice2,
      PListReturnPrice1, 
      PListReturnPrice2, 
      PListSellingDefaultUnit,
      PListLastUpdateByUserID
    } = req.body;

    const PriceList = await prisma.salPriceList.update({
      where: {
        ClassID_ItemID: {
          ClassID: parseInt(ClassID),
          ItemID: parseInt(ItemID)
        }
      },
      data: {
        CompanyID, 
        ItemCost, 
        PListSellPrice1, 
        PListSellPrice2,
        PListReturnPrice1, 
        PListReturnPrice2, 
        PListSellingDefaultUnit,
        PListLastUpdateDate: new Date(), 
        PListLastUpdateByUserID
      },
    });

    res.status(200).json({
      message: 'Price updated successfully!',
      PriceList,
    });
  } catch (error) {
    console.error('Error updating Price:', error);
    res.status(500).json({
      message: 'Error updating Price',
      error: error.message,
    });
  }
};

const deletePriceList = async (req, res) => {
    try {
      await prisma.salPriceList.delete({
        where: { ItemID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createPriceList=createPriceList;
module.exports.getPriceListById=getPriceListById;
module.exports.getPriceLists=getPriceLists;
module.exports.updatePriceList=updatePriceList;
module.exports.deletePriceList=deletePriceList;