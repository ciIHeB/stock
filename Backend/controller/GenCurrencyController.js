const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 
const createCurrency = async (req, res) => {
  try {
    const { 
      CurrencyID,
      CurrencyNameLan1, CurrencyNameLan2 ,  CurrencySymbol ,  
      CurrencyLastConvRate ,
      IsActive   ,
      CreatedByUserID 
    } = req.body;

    const Currency = await prisma.genCurrency.create({
      data: {
        CurrencyID,
        CurrencyNameLan1, CurrencyNameLan2 ,  CurrencySymbol ,  
        CurrencyLastConvRate ,
        CurrencyLastConvRateDate : new Date(),
        IsActive   ,
        CurrencyCreationDate   : new Date(),
        LastUpdateDate: new Date(),
        LastUpdateByUserID: CreatedByUserID,
        CurrencyCreationDate: new Date(),
        CreatedByUserID,
      },
    });

    res.status(201).json({
      message: ' Currency created successfully!',
      Currency,
    });
  } catch (error) {
    console.error('Error creating  Currency:', error);
    res.status(500).json({
      message: 'Error creating  Currency',
      error: error.message,
    });
  }
};
const getCurrencys = async (req, res) => {
  try {
    const Currencys = await prisma.genCurrency.findMany();
    res.status(200).json(Currencys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrencyById = async (req, res) => {
  try {
    const Currency = await prisma.genCurrency.findUnique({
      where: { CurrencyID: parseInt(req.params.id) },
    });
    if (Currency) {
      res.status(200).json( Currency);
    } else {
      res.status(404).json({ error: ' Currency not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCurrency = async (req, res) => {
  try {
    const {
      CurrencyNameLan1, CurrencyNameLan2 ,  CurrencySymbol ,  
      CurrencyLastConvRate ,
      IsActive   ,
  LastUpdateByUserID
    } = req.body;

    const  Currency = await prisma.genCurrency.update({
      where: { CurrencyID: parseInt(req.params.id) },
      data: {
        CurrencyNameLan1, CurrencyNameLan2 ,  CurrencySymbol ,  
        CurrencyLastConvRate ,
      CurrencyLastConvRateDate : new Date(),
      IsActive   ,
  LastUpdateByUserID,
  LastUpdateDate: new Date()
      },
    });

    res.status(200).json({
      message: ' Currency updated successfully!',
       Currency,
    });
  } catch (error) {
    console.error('Error updating  Currency:', error);
    res.status(500).json({
      message: 'Error updating  Currency',
      error: error.message,
    });
  }
};


const deleteCurrency = async (req, res) => { 
  try {
    await prisma.genCurrency.delete({
      where: { CurrencyID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createCurrency=createCurrency;
module.exports.getCurrencys=getCurrencys;
module.exports.getCurrencyById=getCurrencyById;
module.exports.updateCurrency=updateCurrency;
module.exports.deleteCurrency=deleteCurrency;