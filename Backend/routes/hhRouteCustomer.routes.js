const express = require('express');
const RouteCustomerr = express.Router();
const {createRouteCustomer,
    updateRouteCustomer,
    getRouteCustomers,getRouteCustomerById,
    deleteRouteCustomer} = require('../controller/hhRouteCustomerController');
const verifyToken = require("../middlewares/verifyToken");


RouteCustomerr.post('/',verifyToken,createRouteCustomer);
RouteCustomerr.get('/',getRouteCustomers);
RouteCustomerr.get('/:RouteID/:CustomerID', getRouteCustomerById);
RouteCustomerr.put('/:RouteID/:CustomerID', verifyToken,updateRouteCustomer);
RouteCustomerr.delete('/:RouteID/:CustomerID',verifyToken, deleteRouteCustomer);

module.exports = RouteCustomerr;

