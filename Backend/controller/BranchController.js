const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBranch = async (req, res) => {
  try {
    const {
      BranchDescLan1,
      BranchDescLan2,
      BranchAddress,
      BranchTel,
      BranchFax,
      BranchVatNo,
      BranchLongitude,
      BranchLatitude,
      CreatedByUserID,
      LastUpdateByUserID,
      LastUpdateDate,
      CompanyID 
    } = req.body;

    const branch = await prisma.genBranch.create({
      data: {
        BranchDescLan1,
        BranchDescLan2,
        BranchAddress,
        BranchTel,
        BranchFax,
        BranchVatNo,
        BranchLongitude: parseFloat(BranchLongitude), // Ensure to parse to float if needed
        BranchLatitude: parseFloat(BranchLatitude), // Ensure to parse to float if needed
        CreatedByUserID: parseInt(CreatedByUserID), // Ensure to parse to int if needed
        LastUpdateByUserID: parseInt(LastUpdateByUserID), // Ensure to parse to int if needed
        LastUpdateDate: new Date(LastUpdateDate), // Ensure this is a valid Date object
        genCompany: { connect: { CompanyID: parseInt(CompanyID) } } // Connect to existing company
      }
    });

    res.status(201).json({
      message: 'Branch created successfully!',
      branch,
    });
  } catch (error) {
    console.error('Error creating branch:', error);
    res.status(500).json({
      message: 'Error creating branch',
      error: error.message,
    });
  }
};


const getBranches = async (req, res) => {
  try {
    const branches = await prisma.genBranch.findMany();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await prisma.genBranch.findUnique({
      where: { BranchID: parseInt(req.params.id) },
    });
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBranch = async (req, res) => {
  try {
    const branch = await prisma.genBranch.update({
      where: { BranchID: parseInt(req.params.id) },
      data: {
        BranchDescLan1: req.body.BranchDescLan1,
        BranchDescLan2: req.body.BranchDescLan2,
        BranchAddress: req.body.BranchAddress,
        BranchTel: req.body.BranchTel,
        BranchFax: req.body.BranchFax,
        BranchVatNo: req.body.BranchVatNo,
        BranchLongitude: req.body.BranchLongitude,
        BranchLatitude: req.body.BranchLatitude,
        CreatedByUserID: req.body.CreatedByUserID,
        LastUpdateByUserID: req.body.LastUpdateByUserID,
        LastUpdateDate: new Date(req.body.LastUpdateDate).toISOString(), 
        CompanyID: req.body.CompanyID,
      },
    });
    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBranch = async (req, res) => {
  try {
    await prisma.genBranch.delete({
      where: { BranchID: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.createBranch=createBranch;
module.exports.getBranches=getBranches;
module.exports.getBranchById=getBranchById;
module.exports.updateBranch=updateBranch;
module.exports.deleteBranch=deleteBranch;