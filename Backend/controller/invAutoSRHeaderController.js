const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
const createAutoSRHeader = async (req, res) => {
  try {
    const {
      CompanyID,
      SupervisorID,
      OwnerID,
      WHID,
      SRNumber,
      SRTypeID,
      AutoSRLoadDate,
      AutoSRDate,
      AutoSRStatus,
    } = req.body;

    const newHeader = await prisma.invAutoSRHeader.create({
      data: {
        CompanyID,
        SupervisorID,
        OwnerID,
        WHID,
        SRNumber,
        SRTypeID,
        AutoSRLoadDate: new Date(AutoSRLoadDate),
        AutoSRDate: new Date(AutoSRDate),
        AutoSRStatus,
      },
    });

    res.status(201).json({
      message: 'AutoSR Header created successfully!',
      newHeader,
    });
  } catch (error) {
    console.error('Create AutoSRHeader Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Read all
const getAutoSRHeaders = async (req, res) => {
  try {
    const headers = await prisma.invAutoSRHeader.findMany();
    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAutoLoadsRequests = async (req, res) => {
  try {
    const headers = await prisma.invAutoSRHeader.findMany({
      where: {
        AutoSRStatus: "R",
      },
    });

    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read by ID
const getAutoSRHeaderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const header = await prisma.invAutoSRHeader.findUnique({
      where: { AutoSRID: id },
    });

    if (!header) {
      return res.status(404).json({ error: 'AutoSR Header not found' });
    }

    res.status(200).json(header);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateAutoSRHeader = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      CompanyID,
      SupervisorID,
      OwnerID,
      WHID,
      SRNumber,
      SRTypeID,
      AutoSRLoadDate,
      AutoSRDate,
      AutoSRStatus,
    } = req.body;

    const updatedHeader = await prisma.invAutoSRHeader.update({
      where: { AutoSRID: id },
      data: {
        CompanyID,
        SupervisorID,
        OwnerID,
        WHID,
        SRNumber,
        SRTypeID,
        AutoSRLoadDate: new Date(AutoSRLoadDate),
        AutoSRDate: new Date(AutoSRDate),
        AutoSRStatus,
      },
    });

    res.status(200).json({
      message: 'AutoSR Header updated successfully!',
      updatedHeader,
    });
  } catch (error) {
    console.error('Update AutoSRHeader Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete
const deleteAutoSRHeader = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.invAutoSRHeader.delete({
      where: { AutoSRID: id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createAutoSRHeader = createAutoSRHeader;
module.exports.getAutoSRHeaders = getAutoSRHeaders;
module.exports.getAutoLoadsRequests = getAutoLoadsRequests;
module.exports.getAutoSRHeaderById = getAutoSRHeaderById;
module.exports.updateAutoSRHeader = updateAutoSRHeader;
module.exports.deleteAutoSRHeader = deleteAutoSRHeader;