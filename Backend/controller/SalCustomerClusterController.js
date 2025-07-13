const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createCustomerCluster= async (req, res) => {
    try {
      const { 
        CompanyID ,  
        ClusterDescLan1 ,   
        ClusterDescLan2 , 
        CreatedByUserID  
      } = req.body;
  console.log('here',req.body)
      const CustomerCluster= await prisma.salCustomerCluster.create({
        data: {
          CompanyID ,  
        ClusterDescLan1 ,   
        ClusterDescLan2 , 
        ClusterCreationDate  : new Date(),
        LastUpdateDate : new Date(),
        LastUpdateByUserID :CreatedByUserID,
        CreatedByUserID  
        },
      });
  
      res.status(201).json({
        message: 'Customer Cluster created successfully!',
        CustomerCluster,
      });
    } catch (error) {
      console.error('Error creating Customer Cluster:', error);
      res.status(500).json({
        message: 'Error creating Customer Cluster',
        error: error.message,
      });
    }
  };
  
  const getCustomerClusters = async (req, res) => {
    try {
      const CustomerClusters = await prisma.salCustomerCluster.findMany();
      res.status(200).json(CustomerClusters);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCustomerClusterById = async (req, res) => {
    try {
      const InvItem = await prisma.salCustomerCluster.findUnique({
        where: { ClusterID: parseInt(req.params.id) },
      });
      if (InvItem) {
        res.status(200).json(InvItem);
      } else {
        res.status(404).json({ error: 'Customer Cluster not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCustomerCluster= async (req, res) => {
    try {
      const { 
        CompanyID ,  
        ClusterDescLan1 ,   
        ClusterDescLan2 , 
        LastUpdateByUserID
      } = req.body;
  
      const CustomerCluster = await prisma.salCustomerCluster.update({
        where: { ClusterID: parseInt(req.params.id) },
        data: {
          CompanyID ,  
          ClusterDescLan1 ,   
          ClusterDescLan2 , 
          LastUpdateByUserID ,
          LastUpdateDate : new Date(),
        },
      });
  
      res.status(200).json({
        message: 'Customer Cluster updated successfully!',
        CustomerCluster,
      });
    } catch (error) {
      console.error('Error updating Customer Cluster:', error);
      res.status(500).json({
        message: 'Error updating Customer Cluster',
        error: error.message,
      });
    }
  };
  
  
  const deleteCustomerCluster= async (req, res) => { 
    try {
      await prisma.salCustomerCluster.delete({
        where: { ClusterID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createCustomerCluster=createCustomerCluster;
  module.exports.getCustomerClusters=getCustomerClusters;
  module.exports.getCustomerClusterById=getCustomerClusterById;
  module.exports.updateCustomerCluster=updateCustomerCluster;
  module.exports.deleteCustomerCluster=deleteCustomerCluster;