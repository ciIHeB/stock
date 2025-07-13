const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new UserGroup
const createUserGroup = async (req, res) => {
  try {
    const {
      UserGroupNameLan1,
      UserGroupNameLan2,
      UserGroupDescription,
      UserGroupIsActive,
      CreatedByUserID,
    } = req.body;

    const userGroup = await prisma.SecUserGroup.create({
      data: {
        UserGroupNameLan1,
        UserGroupNameLan2,
        UserGroupDescription,
        UserGroupIsActive,
        LastUpdateDate: new Date(),
        LastUpdateByUserID: CreatedByUserID,
        CreatedByUserID,
      },
    });

    res.status(201).json({
      message: 'UserGroup created successfully!',
      userGroup,
    });
  } catch (error) {
    console.error('Error creating UserGroup:', error);
    res.status(500).json({
      message: 'Error creating UserGroup',
      error: error.message,
    });
  }
};

// Get all UserGroups
const getUserGroups = async (req, res) => {
  try {
    const userGroups = await prisma.SecUserGroup.findMany();
    res.status(200).json(userGroups);
  } catch (error) {
    console.error('Error fetching UserGroups:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a UserGroup by ID
const getUserGroupById = async (req, res) => {
  try {
    const userGroup = await prisma.SecUserGroup.findUnique({
      where: { UserGroupID: parseInt(req.params.id) },
    });

    if (userGroup) {
      res.status(200).json(userGroup);
    } else {
      res.status(404).json({ error: 'UserGroup not found' });
    }
  } catch (error) {
    console.error('Error fetching UserGroup:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a UserGroup
const updateUserGroup = async (req, res) => {
  try {
    const {
      UserGroupNameLan1,
      UserGroupNameLan2,
      UserGroupDescription,
      UserGroupIsActive,
      LastUpdateByUserID,
    } = req.body;

    const userGroup = await prisma.SecUserGroup.update({
      where: { UserGroupID: parseInt(req.params.id) },
      data: {
        UserGroupNameLan1,
        UserGroupNameLan2,
        UserGroupDescription,
        UserGroupIsActive,
        LastUpdateDate: new Date(),
        LastUpdateByUserID,
      },
    });

    res.status(200).json({
      message: 'UserGroup updated successfully!',
      userGroup,
    });
  } catch (error) {
    console.error('Error updating UserGroup:', error);
    res.status(500).json({
      message: 'Error updating UserGroup',
      error: error.message,
    });
  }
};

// Delete a UserGroup
const deleteUserGroup = async (req, res) => {
  try {
    await prisma.SecUserGroup.delete({
      where: { UserGroupID: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting UserGroup:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports.createUserGroup=createUserGroup;
module.exports.getUserGroups=getUserGroups;
module.exports.getUserGroupById=getUserGroupById;
module.exports.updateUserGroup=updateUserGroup;
module.exports.deleteUserGroup=deleteUserGroup;