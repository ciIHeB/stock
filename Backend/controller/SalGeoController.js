const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const createGeo= async (req, res) => {
    try {
      const { 
        CompanyID, 
        GeoLevelID,
        GeoDescLan1,
        GeoDescLan2,
        CreatedByUserID 
      } = req.body;
  console.log('here',req.body)
      const Geo= await prisma.salGeo.create({
        data: {
          CompanyID, 
          GeoLevelID,
          GeoDescLan1,
          GeoDescLan2,
          CreatedByUserID ,
          GeoCreationDate: new Date(),
          LastUpdateDate: new Date(), 
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Geo created successfully!',
        Geo,
      });
    } catch (error) {
      console.error('Error creating Geo:', error);
      res.status(500).json({
        message: 'Error creating Geo',
        error: error.message,
      });
    }
  };
  
  const getGeos = async (req, res) => {
    try {
      const Geos = await prisma.salGeo.findMany();
      res.status(200).json(Geos);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getGeoById = async (req, res) => {
    try {
      const Geo = await prisma.salGeo.findUnique({
        where: { GeoID: parseInt(req.params.id) },
      });
      if (Geo) {
        res.status(200).json(Geo);
      } else {
        res.status(404).json({ error: 'Geo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateGeo= async (req, res) => {
    try {
      const { 
        CompanyID, 
        GeoLevelID,
        GeoDescLan1,
        GeoDescLan2,
        LastUpdateByUserID 
      } = req.body;
  
      const Geo = await prisma.salGeo.update({
        where: { GeoID: parseInt(req.params.id) },
        data: {
          CompanyID, 
          GeoLevelID,
          GeoDescLan1,
          GeoDescLan2,
          LastUpdateByUserID ,
          LastUpdateDate: new Date()
        },
      });
  
      res.status(200).json({
        message: 'Geo updated successfully!',
        Geo,
      });
    } catch (error) {
      console.error('Error updating Geo:', error);
      res.status(500).json({
        message: 'Error updating Geo',
        error: error.message,
      });
    }
  };
  
  
  const deleteGeo= async (req, res) => { 
    try {
      await prisma.salGeo.delete({
        where: { GeoID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createGeo=createGeo;
  module.exports.getGeos=getGeos;
  module.exports.getGeoById=getGeoById;
  module.exports.updateGeo=updateGeo;
  module.exports.deleteGeo=deleteGeo;