const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createBank = async (req, res) => {
  try {
    const { 
      BankLan1 , 
      BankLan2,  
      CreatedByUserID,
    } = req.body;

    const bank = await prisma.genBank.create({
      data: {
        BankLan1 , 
        BankLan2, 
        BankIsActive : true, 
        BankCreationDate :new Date(), 
        LastUpdateDate:new Date(),
        LastUpdateByUserID:CreatedByUserID, 
        CreatedByUserID,
      },
    });

    res.status(201).json({
      message: 'bank created successfully!',
      bank,
    });
  } catch (error) {
    console.error('Error creating bank:', error);
    res.status(500).json({
      message: 'Error creating bank',
      error: error.message,
    });
  }
};
const getBanks = async (req, res) => {
  try {
    const banks = await prisma.genBank.findMany();
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankById = async (req, res) => {
  try {
    const bank = await prisma.genBank.findUnique({
      where: { BankID: parseInt(req.params.id) },
    });
    if (bank) {
      res.status(200).json(bank);
    } else {
      res.status(404).json({ error: 'bank not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBank = async (req, res) => {
  try {
    const { 
      BankLan1 , 
      BankLan2, 
      BankIsActive, 
      LastUpdateByUserID, 
    } = req.body;

    const bank = await prisma.genBank.update({
      where: { BankID: parseInt(req.params.id) },
      data: {
        BankLan1 , 
        BankLan2, 
        BankIsActive, 
        LastUpdateDate:new Date(),
        LastUpdateByUserID, 
      },
    });

    res.status(200).json({
      message: 'bank updated successfully!',
      bank,
    });
  } catch (error) {
    console.error('Error updating bank:', error);
    res.status(500).json({
      message: 'Error updating bank',
      error: error.message,
    });
  }
};


const deleteBank = async (req, res) => {
  try {
    await prisma.genBank.delete({
      where: { BankID: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getBanks=getBanks;
module.exports.createBank=createBank;
module.exports.getBankById=getBankById;
module.exports.updateBank=updateBank;
module.exports.deleteBank=deleteBank;