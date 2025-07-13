const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


  const createRouteCustomer= async (req, res) => {
    try {
      
      const { 
        RouteID    ,    
        CustomerID ,    
        CustomerSequence  
      } = req.body;
      
      const RouteCustomer= await prisma.hhRouteCustomer.create({
        data: {
          RouteID    ,    
          CustomerID ,    
          CustomerSequence 
        },
      });
  
      res.status(201).json({
        message: 'Route Customer created successfully!',
        RouteCustomer,
      });
    } catch (error) {
      console.error('Error creating Route Customer:', error);
      res.status(500).json({
        message: 'Error creating Route Customer',
        error: error.message,
      });
    }
  };
  
  const getRouteCustomers = async (req, res) => {
    try {
      const RouteCustomers = await prisma.hhRouteCustomer.findMany();
      res.status(200).json(RouteCustomers);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getRouteCustomerById = async (req, res) => {
    try {
      const RouteCustomer = await prisma.hhRouteCustomer.findMany({
        where: { RouteID  : parseInt(req.params.RouteID),  
          CustomerID : parseInt(req.params.CustomerID) 
         },
      });
      if (RouteCustomer) {
        res.status(200).json(RouteCustomer);
      } else {
        res.status(404).json({ error: 'Route Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateRouteCustomer= async (req, res) => {
    try {
      const {  
        CustomerSequence 
      } = req.body;

      const RouteCustomer = await prisma.hhRouteCustomer.update({
        where: { RouteID  : parseInt(req.params.RouteID),  
          CustomerID : parseInt(req.params.CustomerID) },
        data: {  
        CustomerSequence 
        },
      });
  
      res.status(200).json({
        message: 'RouteCustomer updated successfully!',
        RouteCustomer,
      });
    } catch (error) {
      console.error('Error updating RouteCustomer:', error);
      res.status(500).json({
        message: 'Error updating RouteCustomer',
        error: error.message,
      });
    }
  };
  
  
  const deleteRouteCustomer= async (req, res) => { 
    try {
      await prisma.hhRouteCustomer
      .delete({
        where: { RouteID  : parseInt(req.params.RouteID),  
          CustomerID : parseInt(req.params.CustomerID) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createRouteCustomer=createRouteCustomer;
  module.exports.getRouteCustomers=getRouteCustomers;
  module.exports.getRouteCustomerById=getRouteCustomerById;
  module.exports.updateRouteCustomer=updateRouteCustomer;
  module.exports.deleteRouteCustomer=deleteRouteCustomer;