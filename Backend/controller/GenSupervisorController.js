const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSupervisor = async (req, res) => {
  try {
    const { 
      CompanyID , BranchID , UserID , AMID,       
      SupervisorNameLan1,SupervisorNameLan2  ,SupervisorMobile , SupervisorEmail, SupervisorAddress ,  
      CanViewAllInfo   , SupervisorIsActive ,
      CreatedByUserID 
    } = req.body;

    const Supervisor = await prisma.genSupervisor.create({
      data: {
        CompanyID , BranchID , UserID , AMID,       
        SupervisorNameLan1,SupervisorNameLan2  ,SupervisorMobile , SupervisorEmail, SupervisorAddress ,  
        CanViewAllInfo   , SupervisorIsActive ,
        LastUpdateDate: new Date(),
        LastUpdateByUserID: CreatedByUserID,
        SupervisorCreationDate: new Date(),
        CreatedByUserID,
      },
    });

    res.status(201).json({
      message: 'Supervisor created successfully!',
      Supervisor,
    });
  } catch (error) {
    console.error('Error creating Supervisor:', error);
    res.status(500).json({
      message: 'Error creating Supervisor',
      error: error.message,
    });
  }
};
const getSupervisors = async (req, res) => {
  try {
    const Supervisors = await prisma.genSupervisor.findMany();
    res.status(200).json(Supervisors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupervisorById = async (req, res) => {
  try {
    const Supervisor = await prisma.genSupervisor.findUnique({
      where: { SupervisorID: parseInt(req.params.id) },
    });
    if (Supervisor) {
      res.status(200).json(Supervisor);
    } else {
      res.status(404).json({ error: 'Supervisor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSupervisor = async (req, res) => {
  try {
    const {
      CompanyID , BranchID , UserID , AMID,       
  SupervisorNameLan1,SupervisorNameLan2  ,SupervisorMobile , SupervisorEmail, SupervisorAddress ,  
  CanViewAllInfo   , SupervisorIsActive ,
  LastUpdateByUserID
    } = req.body;

    const Supervisor = await prisma.genSupervisor.update({
      where: { SupervisorID: parseInt(req.params.id) },
      data: {
        CompanyID , BranchID , UserID , AMID,       
  SupervisorNameLan1,SupervisorNameLan2  ,SupervisorMobile , SupervisorEmail, SupervisorAddress ,  
  CanViewAllInfo   , SupervisorIsActive ,
  LastUpdateByUserID,
  LastUpdateDate: new Date()
      },
    });

    res.status(200).json({
      message: 'Supervisor updated successfully!',
      Supervisor,
    });
  } catch (error) {
    console.error('Error updating Supervisor:', error);
    res.status(500).json({
      message: 'Error updating Supervisor',
      error: error.message,
    });
  }
};


const deleteSupervisor = async (req, res) => { 
  try {
    await prisma.genSupervisor.delete({
      where: { SupervisorID: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports.createSupervisor=createSupervisor;
module.exports.getSupervisors=getSupervisors;
module.exports.getSupervisorById=getSupervisorById;
module.exports.updateSupervisor=updateSupervisor;
module.exports.deleteSupervisor=deleteSupervisor;