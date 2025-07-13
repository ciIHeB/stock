const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


  const createGeoLevel= async (req, res) => {
    try {
      const { 
        CompanyID, 
        GeoLevelDescLan1,
        GeoLevelDescLan2,
        CreatedByUserID 
      } = req.body;
  console.log('here',req.body)
      const GeoLevel= await prisma.salGeoLevel.create({
        data: {
          CompanyID, 
          GeoLevelDescLan1,
          GeoLevelDescLan2,
          GeoLevelCreationDate: new Date(),
          LastUpdateDate: new Date(), 
          LastUpdateByUserID :CreatedByUserID,
          CreatedByUserID 
        },
      });
  
      res.status(201).json({
        message: 'Geo Level created successfully!',
        GeoLevel,
      });
    } catch (error) {
      console.error('Error creating Geo Level:', error);
      res.status(500).json({
        message: 'Error creating Geo Level',
        error: error.message,
      });
    }
  };
  
  const getGeoLevels = async (req, res) => {
    try {
      const Geolevels = await prisma.salGeoLevel.findMany();
      res.status(200).json(Geolevels);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  const getGeoLevelById = async (req, res) => {
    try {
      const GeoLevel = await prisma.salGeoLevel.findUnique({
        where: { GeoLevelID: parseInt(req.params.id) },
      });
      if (GeoLevel) {
        res.status(200).json(GeoLevel);
      } else {
        res.status(404).json({ error: 'Geo Level not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateGeoLevel= async (req, res) => {
    try {
      const { 
        CompanyID, 
        GeoLevelDescLan1,
        GeoLevelDescLan2,
        LastUpdateByUserID 
      } = req.body;
  
      const GeoLevel = await prisma.salGeoLevel.update({
        where: { GeoLevelID: parseInt(req.params.id) },
        data: {
          CompanyID, 
          GeoLevelDescLan1,
          GeoLevelDescLan2,
          LastUpdateByUserID ,
          LastUpdateDate: new Date()
        },
      });
  
      res.status(200).json({
        message: 'Geo Level updated successfully!',
        GeoLevel,
      });
    } catch (error) {
      console.error('Error updating Geo Level:', error);
      res.status(500).json({
        message: 'Error updating Geo Level',
        error: error.message,
      });
    }
  };
  
  
  const deleteGeoLevel= async (req, res) => { 
    try {
      await prisma.salGeoLevel.delete({
        where: { GeoLevelID: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports.createGeoLevel=createGeoLevel;
  module.exports.getGeoLevels=getGeoLevels;
  module.exports.getGeoLevelById=getGeoLevelById;
  module.exports.updateGeoLevel=updateGeoLevel;
  module.exports.deleteGeoLevel=deleteGeoLevel;