const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createCompany = async (req, res) => {
  try {
    const { 
      CompanyDescLan1, 
      CompanyDescLan2, 
      CompanyAddress, 
      CompanyTel, 
      CompanyVatNumber, 
      TaxApplicable, 
      LastUpdateDate, 
      LastUpdateByUserID, 
      CompanyCreationDate, 
      CreatedByUserID 
    } = req.body;

    // Ensure the file is being processed correctly
    const CompanyLogo = req.file ? `/public/uploads/company_logos/${req.file.filename}` : null;

    const company = await prisma.genCompany.create({
      data: {
        CompanyDescLan1,
        CompanyDescLan2,
        CompanyAddress,
        CompanyTel,
        CompanyVatNumber,
        TaxApplicable: TaxApplicable === 'true',
        CompanyLogo,
        LastUpdateDate: new Date(LastUpdateDate),
        LastUpdateByUserID: parseInt(LastUpdateByUserID),
        CompanyCreationDate: new Date(CompanyCreationDate),
        CreatedByUserID: parseInt(CreatedByUserID),
      },
    });

    res.status(201).json({
      message: 'Company created successfully!',
      company,
    });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({
      message: 'Error creating company',
      error: error.message,
    });
  }
};
const getCompanies = async (req, res) => {
  try {
    const companies = await prisma.genCompany.findMany();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await prisma.genCompany.findUnique({
      where: { CompanyID: parseInt(req.params.id) },
    });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { CompanyDescLan1, CompanyDescLan2, CompanyAddress, CompanyTel, CompanyVatNumber, TaxApplicable ,LastUpdateDate,LastUpdateByUserID} = req.body;

    const company = await prisma.genCompany.update({
      where: { CompanyID: parseInt(req.params.id) },
      data: {
        CompanyDescLan1,
        CompanyDescLan2,
        CompanyAddress,
        CompanyTel,
        CompanyVatNumber,
        TaxApplicable: TaxApplicable == true,
        LastUpdateDate: new Date(LastUpdateDate),
        LastUpdateByUserID: parseInt(LastUpdateByUserID)
      },
    });

    res.status(200).json({
      message: 'Company updated successfully!',
      company,
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({
      message: 'Error updating company',
      error: error.message,
    });
  }
};


const deleteCompany = async (req, res) => { 
  try {
    await prisma.genCompany.delete({
      where: { CompanyID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createCompany=createCompany;
module.exports.getCompanies=getCompanies;
module.exports.getCompanyById=getCompanyById;
module.exports.updateCompany=updateCompany;
module.exports.deleteCompany=deleteCompany;