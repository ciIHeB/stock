const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createCustomer= async (req, res) => {
    try {
      const { 
        CompanyID, BranchID, CustomerTypeID,ClassID,GeoID,HCategoryID,ClusterID,CurrencyID,PaymentMethodID,PaymentTermID,OwnerID,
        CustomerDescLan1,CustomerDescLan2,CustomerBarcode,GeocodeAddress,CustomerInformation,CustomerAddress,CommercialRegistrationNumber,
        CustomerContactPerson,CustomerMobile,
        TaxApplicable,AllowOverCreditLimit,AllowOverCreditDue,AllowOverCheckLimit,CustomerIsActive,AllowTakingPhotos,
        CustomerCreditLimit,CustomerMinCheck,CustomerMaxCheck,Longitude,Latitude,CustomerEngagementLimit,
        CreatedByUserID 
      } = req.body;
  console.log('here',req.body)
      const Customer= await prisma.salCustomer.create({
        data: {
          CompanyID, BranchID, CustomerTypeID,ClassID,GeoID,HCategoryID,ClusterID,CurrencyID,PaymentMethodID,PaymentTermID,OwnerID,
          CustomerDescLan1,CustomerDescLan2,CustomerBarcode,GeocodeAddress,CustomerInformation,CustomerAddress,CommercialRegistrationNumber,
          CustomerContactPerson,CustomerMobile,
          TaxApplicable,AllowOverCreditLimit,AllowOverCreditDue,AllowOverCheckLimit,CustomerIsActive,AllowTakingPhotos,
          CustomerCreditLimit,CustomerMinCheck,CustomerMaxCheck,Longitude,Latitude,CustomerEngagementLimit,
          CustomerImage : null,
          CustomerCreationDate: new Date(),
          CustomerLastUpdateTime: new Date(), 
          UpdatedByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Customer created successfully!',
        Customer,
      });
    } catch (error) {
      console.error('Error creating Customer:', error);
      res.status(500).json({
        message: 'Error creating Customer',
        error: error.message,
      });
    }
  };
  
  const getCustomers = async (req, res) => {
    try {
      const Customers = await prisma.salCustomer.findMany();
      res.status(200).json(Customers);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCustomerById = async (req, res) => {
    try {
      const Customer = await prisma.salCustomer.findUnique({
        where: { CustomerID: parseInt(req.params.id) },
      });
      if (Customer) {
        res.status(200).json(Customer);
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCustomer= async (req, res) => {
    try {
      const { 
        CompanyID, BranchID, CustomerTypeID,ClassID,GeoID,HCategoryID,ClusterID,PaymentMethodID,PaymentTermID,OwnerID,
        CustomerDescLan1,CustomerDescLan2,CustomerBarcode,CustomerInformation,CustomerAddress,CommercialRegistrationNumber,
        CustomerContactPerson,CustomerMobile,
        TaxApplicable,AllowOverCreditLimit,AllowOverCreditDue,AllowOverCheckLimit,CustomerIsActive,AllowTakingPhotos,
        CustomerCreditLimit,CustomerMinCheck,CustomerMaxCheck,Longitude,Latitude,CustomerEngagementLimit,
        UpdatedByUserID,CustomerLastUpdateTime
      } = req.body;
  
      const Customer = await prisma.salCustomer.update({
        where: { CustomerID: parseInt(req.params.id) },
        data: {
          CompanyID, BranchID, CustomerTypeID,ClassID,GeoID,HCategoryID,ClusterID,PaymentMethodID,PaymentTermID,OwnerID,
        CustomerDescLan1,CustomerDescLan2,CustomerBarcode,CustomerInformation,CustomerAddress,CommercialRegistrationNumber,
        CustomerContactPerson,CustomerMobile,
        TaxApplicable,AllowOverCreditLimit,AllowOverCreditDue,AllowOverCheckLimit,CustomerIsActive,AllowTakingPhotos,
        CustomerCreditLimit,CustomerMinCheck,CustomerMaxCheck,Longitude,Latitude,CustomerEngagementLimit,
        UpdatedByUserID ,
        CustomerLastUpdateTime,
        },
      });
  
      res.status(200).json({
        message: 'Customer updated successfully!',
        Customer,
      });
    } catch (error) {
      console.error('Error updating Customer:', error);
      res.status(500).json({
        message: 'Error updating Customer',
        error: error.message,
      });
    }
  };
  
  
  const deleteCustomer= async (req, res) => { 
    try {
      await prisma.salCustomer.delete({
        where: { CustomerID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports.createCustomer=createCustomer;
  module.exports.getCustomers=getCustomers;
  module.exports.getCustomerById=getCustomerById;
  module.exports.updateCustomer=updateCustomer;
  module.exports.deleteCustomer=deleteCustomer;