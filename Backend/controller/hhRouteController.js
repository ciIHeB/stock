const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const bcrypt = require("bcrypt"); // Not used in this controller

const createRoute = async (req, res) => {
  const {
    CompanyID, BranchID, OwnerID, SupervisorID,
    RouteDescLan1,
    IsActive,
    RouteCreatedByUserID,
    customerIds // Array of customer IDs: [1, 2, 3]
  } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newRoute = await tx.hhRoute.create({
        data: {
          CompanyID, BranchID, OwnerID, SupervisorID,
          RouteDescLan1, RouteDescLan2:RouteDescLan1,
          IsActive,
          RouteCreationDate: new Date(),
          RouteLastUpdateTime: new Date(),
          RouteLastUpdateByUserID: RouteCreatedByUserID,
          RouteCreatedByUserID,
        },
      });

      if (customerIds && customerIds.length > 0) {
        const routeCustomerData = customerIds.map(customerId => ({
          RouteID: newRoute.RouteID,
          CustomerID: parseInt(customerId), // Ensure customerId is an integer
          // CustomerSequence can be added here if needed, defaulting to 1 as per schema
        }));
        await tx.hhRouteCustomer.createMany({
          data: routeCustomerData,
        });
      }
      return newRoute;
    });

    res.status(201).json({
      message: 'Route created successfully!',
      Route: result,
    });
  } catch (error) {
    console.error('Error creating Route:', error);
    res.status(500).json({
      message: 'Error creating Route',
      error: error.message,
    });
  }
};

const getRoutes = async (req, res) => {
  try {
    const routes = await prisma.hhRoute.findMany();
  
    res.status(200).json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRouteById = async (req, res) => {
  try {
    const routeId = parseInt(req.params.id);
    const route = await prisma.hhRoute.findUnique({
      where: { RouteID: routeId },
      include: {
        hhOwner: {
          select: {
            OwnerID: true,
            OwnerDescLan1: true
          }
        },
        hhRouteCustomer: {
          include: {
            salCustomer: {
              select: {
                CustomerID: true,
                CustomerDescLan1: true
              }
            }
          }
        }
      }
    });

    if (route) {
      res.status(200).json(route);
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    console.error('Error fetching route by ID:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateRoute = async (req, res) => {
  const routeId = parseInt(req.params.id);
  const {
    CompanyID, BranchID, OwnerID, SupervisorID,
    RouteDescLan1, RouteDescLan2,
    IsActive,
    RouteLastUpdateByUserID,
    customerIds // Array of customer IDs: [1, 2, 3]
  } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const updatedRoute = await tx.hhRoute.update({
        where: { RouteID: routeId },
        data: {
          CompanyID, BranchID, OwnerID, SupervisorID,
          RouteDescLan1, RouteDescLan2,
          IsActive,
          RouteLastUpdateByUserID,
          RouteLastUpdateTime: new Date(),
        },
      });

      // Delete existing customer associations for this route
      await tx.hhRouteCustomer.deleteMany({
        where: { RouteID: routeId },
      });

      // Create new customer associations if customerIds are provided
      if (customerIds && customerIds.length > 0) {
        const routeCustomerData = customerIds.map(customerId => ({
          RouteID: updatedRoute.RouteID, // or routeId
          CustomerID: parseInt(customerId),
        }));
        await tx.hhRouteCustomer.createMany({
          data: routeCustomerData,
        });
      }
      return updatedRoute;
    });

    res.status(200).json({
      message: 'Route updated successfully!',
      Route: result,
    });
  } catch (error) {
    console.error('Error updating Route:', error);
    if (error.code === 'P2025') { // Prisma error code for record not found
        return res.status(404).json({ message: 'Route not found to update.' });
    }
    res.status(500).json({
      message: 'Error updating Route',
      error: error.message,
    });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const routeId = parseInt(req.params.id);
    // Due to `onDelete: Cascade` in HhRouteCustomer for hhRoute relation,
    // related HhRouteCustomer entries will be deleted automatically by the database.
    await prisma.hhRoute.delete({
      where: { RouteID: routeId }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting route:', error);
    if (error.code === 'P2025') { // Prisma error code for record not found
        return res.status(404).json({ message: 'Route not found to delete.' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createRoute,
    getRoutes,
    getRouteById,
    updateRoute,
    deleteRoute
};