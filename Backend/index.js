require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const path = require('path'); // Keep path import
const companyRoutes = require('./routes/Company.routes'); 
const branchRoutes = require('./routes/branch.routes'); 
const login = require('./routes/auth.routes');
const user= require('./routes/User.routes');
const bank= require('./routes/Bank.routes');
const invItem = require('./routes/InvItem.routes')
const invItemKind = require('./routes/InvItemKind.routes')
const invItemStatus = require('./routes/InvItemStatus.routes');
const invItemCategoty = require('./routes/InvItemCategory.routes');
const invItemCategoty2 = require('./routes/InvItemCategory2.routes');
const invItemCategoty3 = require('./routes/InvItemCategory3.routes');
const invItemUnitList = require('./routes/InvItemUnitList.routes');
const invItemUnit = require('./routes/InvItemUnit.routes');
const invStore = require('./routes/InvStore.routes');
const invStoreType = require('./routes/InvStoreType.routes');
const salCustomerType = require('./routes/SalCustomerType.routes');
const salCustomer = require('./routes/SalCustomer.routes');
const salCustomerCluster = require('./routes/SalCustomerCluster.routes');
const salCustomerHCategory = require('./routes/SalCustomerHCategory.routes');
const salCustomerClass = require('./routes/SalCustomerClass.routes');
const GenPaymentMethod = require('./routes/GenPaymentMethod.routes');
const GenPaymentTerm = require('./routes/GenPaymentTerm.routes');
const salGeo= require('./routes/SalGeo.routes');
const salGeoLevel= require('./routes/SalGeoLevel.routes');
const GenSupervisor= require('./routes/GenSupervisor.routes');
const GenAreaManager= require('./routes/GenAreaManager.routes');
const GenRegionalManager= require('./routes/GenRegionalManager.routes');
const GenSalesManager= require('./routes/GenSalesManager.routes');
const GenCurrency= require('./routes/GenCurrency.routes');
const hhUser= require('./routes/hhUser.routes');
const Mlogin = require('./routes/authMobile.routes');
const hhRoute = require('./routes/hhRoute.routes');
const hhRouteCustomer = require('./routes/hhRouteCustomer.routes');
const salPriceList= require('./routes/SalPriceList.routes');
const hhOwner= require('./routes/hhOwner.routes');
const hhOwnerItem= require('./routes/hhOwnerItem.routes');
const SecUserGroup = require('./routes/SecUserGroup.routes');
const createLoad = require('./routes/InvBOStoreLoad.routes');
const createUnload = require('./routes/InvBOStoreUnload.routes'); // Added for Unload
const invAutoSRHeader = require('./routes/invAutoSRHeader.routes'); 
const invStoreTransaction = require('./routes/invStoreTransaction.routes');
const testRoutes = require('./routes/test.routes');


const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from Backend/public/uploads
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/company',companyRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/auth', login);
app.use('/api/user',user);
app.use('/api/bank',bank);
app.use('/api/item',invItem);
app.use('/api/ItemKind',invItemKind);
app.use('/api/ItemStatus',invItemStatus);
app.use('/api/ItemCategoty',invItemCategoty);
app.use('/api/ItemCategoty2',invItemCategoty2);
app.use('/api/ItemCategoty3',invItemCategoty3);
app.use('/api/ItemUnitList',invItemUnitList);
app.use('/api/ItemUnit',invItemUnit);
app.use('/api/Store',invStore);
app.use('/api/StoreType',invStoreType);
app.use('/api/CustomerType',salCustomerType);
app.use('/api/Customer',salCustomer);
app.use('/api/CustomerCluster',salCustomerCluster);
app.use('/api/CustomerCategory',salCustomerHCategory);
app.use('/api/CustomerClass',salCustomerClass);
app.use('/api/PaymentMethod',GenPaymentMethod);
app.use('/api/PaymentTerm',GenPaymentTerm);
app.use('/api/Geo',salGeo);
app.use('/api/GeoLevel',salGeoLevel);
app.use('/api/Supervisor',GenSupervisor);
app.use('/api/AreaManager',GenAreaManager);
app.use('/api/RegionalManager',GenRegionalManager);
app.use('/api/SalesManager',GenSalesManager);
app.use('/api/Currency',GenCurrency);
app.use('/api/UserMob',hhUser);
app.use('/api/mobileauth', Mlogin);
app.use('/api/Route', hhRoute);
app.use('/api/RouteCustomer', hhRouteCustomer);
app.use('/api/price',salPriceList);
app.use('/api/Owner', hhOwner);
app.use('/api/OwnerItem', hhOwnerItem);
app.use('/api/usergroup', SecUserGroup);
app.use('/api/BoStoreLoad', createLoad);
app.use('/api/BoStoreUnload', createUnload);
app.use('/api/AutoLoad', invAutoSRHeader);
app.use('/api/stock', invStoreTransaction);
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
