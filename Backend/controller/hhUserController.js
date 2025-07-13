const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


  // const createUser= async (req, res) => {
  //   try {
      
  //     const { 
  //       CompanyID ,BranchID ,  
  //       HHUserDescLan1 ,HHUserDescLan2 ,HHUserName  ,HHUserPassword,
  //       HHUserMobile  ,HHUserAddress  ,
  //       HHUserIsActive ,
  //       CreatedByUserID 
  //     } = req.body;
  //     const salt = await bcrypt.genSalt();
  //       const hashedPassword = await bcrypt.hash(HHUserPassword, salt);
  // console.log('here',req.body)
  //     const User= await prisma.hhUser.create({
  //       data: {
  //         CompanyID ,BranchID ,  
  //         HHUserDescLan1 ,HHUserDescLan2 ,HHUserName,HHUserPassword: hashedPassword  ,
  //         HHUserMobile  ,HHUserAddress  ,
  //         HHUserIsActive ,
  //         HHUserImage : null ,
  //         HHUserCreationDate: new Date(),
  //         HHUserLastUpdateTime: new Date(), 
  //         LastUpdatedByUserID :CreatedByUserID,
  //         CreatedByUserID 
  //       },
  //     });
  
  //     res.status(201).json({
  //       message: 'User created successfully!',
  //       User,
  //     });
  //   } catch (error) {
  //     console.error('Error creating User:', error);
  //     res.status(500).json({
  //       message: 'Error creating User',
  //       error: error.message,
  //     });
  //   }
  // };
  
  const getUsers = async (req, res) => {
    try {
      const Users = await prisma.hhUser.findMany();
      res.status(200).json(Users);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getUserById = async (req, res) => {
    try {
      const User = await prisma.hhUser.findUnique({
        where: { HHUserID: parseInt(req.params.id) },
      });
      if (User) {
        res.status(200).json(User);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateUser= async (req, res) => {
    try {
      const { 
        HHUserDescLan1 ,HHUserDescLan2 ,HHUserName,HHUserPassword  ,
        HHUserMobile  ,HHUserAddress  ,
        HHUserIsActive ,
        LastUpdatedByUserID 
      } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(HHUserPassword, salt);
      const User = await prisma.hhUser.update({
        where: { HHUserID: parseInt(req.params.id) },
        data: { 
          HHUserDescLan1 ,HHUserDescLan2 ,HHUserName,HHUserPassword:hashedPassword  ,
          HHUserMobile  ,HHUserAddress  ,
          HHUserIsActive ,
          LastUpdatedByUserID ,
          HHUserLastUpdateTime: new Date()
        },
      });
  
      res.status(200).json({
        message: ' User updated successfully!',
        User,
      });
    } catch (error) {
      console.error('Error updating User:', error);
      res.status(500).json({
        message: 'Error updating User',
        error: error.message,
      });
    }
  };
  
  
  const deleteUser= async (req, res) => { 
    try {
      await prisma.hhUser.delete({
        where: { HHUserID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // module.exports.createUser=createUser;
  module.exports.getUsers=getUsers;
  module.exports.getUserById=getUserById;
  module.exports.updateUser=updateUser;
  module.exports.deleteUser=deleteUser;