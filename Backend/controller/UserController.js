const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

/*
const userNameExists = async (UserName) => {
    const nameExist = await prisma.secUSer.findUnique({
        where: { UserName },
    });

    if (nameExist) {
        console.log("name Exist");
        return true;
    } else {
        console.log("nameDontExist");
        return false;
    }
};
*/


const createUser = async (req, res) => {

  const  {  UserName, UserLoginPassword,UserGroupID,UserForceToChangePassword,UserIsActive,
    UserCreationDate,LastUpdateDate,LastUpdateByUserID,CreatedByUserID } = req.body;
    try {
        // Create the User
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(UserLoginPassword, salt);
        const user = await prisma.secUser.create({
            data: {
                UserName,
                UserLoginPassword: hashedPassword,
                UserGroupID: UserGroupID,
                UserForceToChangePassword: UserForceToChangePassword,
                UserIsActive:UserIsActive,
                UserCreationDate: UserCreationDate,
                LastUpdateDate: LastUpdateDate,
                LastUpdateByUserID: LastUpdateByUserID,
                CreatedByUserID:CreatedByUserID,
            },
        });
        res.status(201).json({
            message: 'user created successfully!',
            user,
          });
        return user;
    } catch (error) {
        console.error(error);
        return false;
    }
};
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.secUser.findUnique({
            where: { UserID: parseInt(id) }, // Parse id to integer
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const { UserName, UserLoginPassword,UserGroupID,UserForceToChangePassword,UserIsActive,
        LastUpdateDate,LastUpdateByUserID } = req.body;
    try {
        const user = await prisma.secUser.findUnique({ where: { UserID: parseInt(req.params.id) } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedData = {
                UserName: UserName,
                UserGroupID: UserGroupID,
                UserForceToChangePassword: UserForceToChangePassword,
                UserIsActive:UserIsActive,
                LastUpdateDate: LastUpdateDate,
                LastUpdateByUserID: LastUpdateByUserID, // Adjust according to your logic
        };

        if (UserLoginPassword) {
            const salt = await bcrypt.genSalt();
            updatedData.UserLoginPassword = await bcrypt.hash(UserLoginPassword, salt);
        }

        const updatedUser = await prisma.secUser.update({ where: { UserID: parseInt(req.params.id) },
            data: updatedData,
        });

        res.status(200).json({
            message: 'User updated successfully!',
            updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await prisma.secUser.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.secUser.findUnique({ where: { UserID: parseInt(id) } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await prisma.secUser.delete({
            where: { UserID: parseInt(id) },
        });

        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.createUser=createUser;
module.exports.getUsers=getUsers;
module.exports.updateUser=updateUser;
module.exports.deleteUser=deleteUser;
module.exports.getUserById=getUserById;


