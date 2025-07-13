-- CreateTable
CREATE TABLE "genCompany" (
    "CompanyID" SERIAL NOT NULL,
    "CompanyDescLan1" TEXT NOT NULL,
    "CompanyDescLan2" TEXT,
    "CompanyLogo" TEXT,
    "CompanyAddress" TEXT,
    "CompanyTel" TEXT,
    "CompanyFax" TEXT,
    "CompanyVatNumber" TEXT,
    "CompanyCreationDate" TIMESTAMP(3) NOT NULL,
    "TaxApplicable" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genCompany_pkey" PRIMARY KEY ("CompanyID")
);

-- CreateTable
CREATE TABLE "genBank" (
    "BankID" SERIAL NOT NULL,
    "BankLan1" TEXT NOT NULL,
    "BankLan2" TEXT,
    "BankIsActive" BOOLEAN NOT NULL DEFAULT true,
    "BankCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genBank_pkey" PRIMARY KEY ("BankID")
);

-- CreateTable
CREATE TABLE "invStoreType" (
    "StoreTypeID" SERIAL NOT NULL,
    "StoreTypeDescLan1" TEXT NOT NULL,
    "StoreTypeDescLan2" TEXT,
    "StoreTypeCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invStoreType_pkey" PRIMARY KEY ("StoreTypeID")
);

-- CreateTable
CREATE TABLE "invStore" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "StoreTypeID" INTEGER NOT NULL,
    "StoreID" SERIAL NOT NULL,
    "StoreDescLan1" TEXT NOT NULL,
    "StoreDescLan2" TEXT,
    "StoreCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invStore_pkey" PRIMARY KEY ("StoreID")
);

-- CreateTable
CREATE TABLE "genSalesManager" (
    "CompanyID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "SMID" SERIAL NOT NULL,
    "SMNameLan1" TEXT NOT NULL,
    "SMNameLan2" TEXT,
    "SMMobile" TEXT,
    "SMEmail" TEXT,
    "CanViewAllInfo" BOOLEAN NOT NULL DEFAULT false,
    "SMIsActive" BOOLEAN NOT NULL DEFAULT true,
    "SMCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genSalesManager_pkey" PRIMARY KEY ("SMID")
);

-- CreateTable
CREATE TABLE "genRegionalManager" (
    "CompanyID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "RMID" SERIAL NOT NULL,
    "RMNameLan1" TEXT NOT NULL,
    "RMNameLan2" TEXT,
    "RMMobile" TEXT,
    "RMEmail" TEXT,
    "SMID" INTEGER NOT NULL,
    "CanViewAllInfo" BOOLEAN NOT NULL DEFAULT false,
    "RMIsActive" BOOLEAN NOT NULL DEFAULT true,
    "RMCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genRegionalManager_pkey" PRIMARY KEY ("RMID")
);

-- CreateTable
CREATE TABLE "genAreaManager" (
    "CompanyID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "RMID" INTEGER NOT NULL,
    "AMID" SERIAL NOT NULL,
    "AMNameLan1" TEXT NOT NULL,
    "AMNameLan2" TEXT,
    "AMMobile" TEXT,
    "AMEmail" TEXT,
    "CanViewAllInfo" BOOLEAN NOT NULL DEFAULT false,
    "AMIsActive" BOOLEAN NOT NULL DEFAULT true,
    "AMCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genAreaManager_pkey" PRIMARY KEY ("AMID")
);

-- CreateTable
CREATE TABLE "genSupervisor" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "AMID" INTEGER NOT NULL,
    "SupervisorID" SERIAL NOT NULL,
    "SupervisorNameLan1" TEXT NOT NULL,
    "SupervisorNameLan2" TEXT,
    "SupervisorMobile" TEXT,
    "SupervisorEmail" TEXT,
    "CanViewAllInfo" BOOLEAN NOT NULL DEFAULT false,
    "SupervisorIsActive" BOOLEAN NOT NULL DEFAULT true,
    "SupervisorCreationDate" TIMESTAMP(3),
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genSupervisor_pkey" PRIMARY KEY ("SupervisorID")
);

-- CreateTable
CREATE TABLE "genBranch" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" SERIAL NOT NULL,
    "BranchDescLan1" TEXT NOT NULL,
    "BranchDescLan2" TEXT,
    "BranchAddress" TEXT,
    "BranchTel" TEXT,
    "BranchFax" TEXT,
    "BranchVatNo" TEXT,
    "BranchCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "BranchLongitude" DOUBLE PRECISION,
    "BranchLatitude" DOUBLE PRECISION,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genBranch_pkey" PRIMARY KEY ("BranchID")
);

-- CreateTable
CREATE TABLE "genPaymentMethod" (
    "PaymentMethodID" SERIAL NOT NULL,
    "PaymentMethodLan1" TEXT NOT NULL,
    "PaymentMethodLan2" TEXT,
    "PaymentMethodCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genPaymentMethod_pkey" PRIMARY KEY ("PaymentMethodID")
);

-- CreateTable
CREATE TABLE "genPaymentTerm" (
    "CompanyID" INTEGER NOT NULL,
    "PaymentTermID" SERIAL NOT NULL,
    "PaymentTermLan1" TEXT NOT NULL,
    "PaymentTermLan2" TEXT,
    "PaymentTermDueDays" INTEGER NOT NULL DEFAULT 0,
    "PaymentTermHasAllowance" BOOLEAN NOT NULL DEFAULT false,
    "ApplyCheckAllowancePolicy" BOOLEAN NOT NULL DEFAULT true,
    "PaymentTermCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genPaymentTerm_pkey" PRIMARY KEY ("PaymentTermID")
);

-- CreateTable
CREATE TABLE "salCustomerClass" (
    "CompanyID" INTEGER NOT NULL,
    "ClassID" SERIAL NOT NULL,
    "ClassDescLan1" TEXT NOT NULL,
    "ClassDescLan2" TEXT,
    "ClassCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3),
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "salCustomerClass_pkey" PRIMARY KEY ("ClassID")
);

-- CreateTable
CREATE TABLE "salCustomerType" (
    "CustomerTypeID" SERIAL NOT NULL,
    "CustomerTypeDescLan1" TEXT NOT NULL,
    "CustomerTypeCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "salCustomerType_pkey" PRIMARY KEY ("CustomerTypeID")
);

-- CreateTable
CREATE TABLE "salCustomerHCategory" (
    "HCategoryID" SERIAL NOT NULL,
    "HCategoryDescLan1" TEXT NOT NULL,
    "HCategoryDescLan2" TEXT,
    "HCategoryCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "salCustomerHCategory_pkey" PRIMARY KEY ("HCategoryID")
);

-- CreateTable
CREATE TABLE "salCustomerCluster" (
    "CompanyID" INTEGER NOT NULL,
    "ClusterID" SERIAL NOT NULL,
    "ClusterDescLan1" TEXT NOT NULL,
    "ClusterDescLan2" TEXT,
    "ClusterCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "salCustomerCluster_pkey" PRIMARY KEY ("ClusterID")
);

-- CreateTable
CREATE TABLE "secUser" (
    "UserGroupID" INTEGER NOT NULL,
    "UserID" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "UserLoginPassword" TEXT NOT NULL,
    "UserForceToChangePassword" BOOLEAN NOT NULL,
    "UserIsActive" BOOLEAN NOT NULL,
    "UserCreationDate" TIMESTAMP(3) NOT NULL,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "secUser_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "secUserGroup" (
    "UserGroupID" SERIAL NOT NULL,
    "UserGroupNameLan1" TEXT NOT NULL,
    "UserGroupNameLan2" TEXT NOT NULL,
    "UserGroupDescription" TEXT NOT NULL,
    "UserGroupIsActive" BOOLEAN NOT NULL,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "secUserGroup_pkey" PRIMARY KEY ("UserGroupID")
);

-- CreateTable
CREATE TABLE "salGeoLevel" (
    "CompanyID" INTEGER NOT NULL,
    "GeoLevelID" SERIAL NOT NULL,
    "GeoLevelDescLan1" TEXT NOT NULL,
    "GeoLevelDescLan2" TEXT,
    "GeoLevelCreationDate" TIMESTAMP(3) NOT NULL,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "salGeoLevel_pkey" PRIMARY KEY ("GeoLevelID")
);

-- CreateTable
CREATE TABLE "salGeo" (
    "CompanyID" INTEGER NOT NULL,
    "GeoLevelID" INTEGER NOT NULL,
    "GeoID" SERIAL NOT NULL,
    "GeoDescLan1" TEXT NOT NULL,
    "GeoDescLan2" TEXT,
    "GeoCreationDate" TIMESTAMP(3) NOT NULL,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "salGeo_pkey" PRIMARY KEY ("GeoID")
);

-- CreateTable
CREATE TABLE "salCustomer" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "CustomerTypeID" INTEGER NOT NULL DEFAULT 1,
    "CustomerID" SERIAL NOT NULL,
    "CustomerDescLan1" TEXT NOT NULL,
    "CustomerDescLan2" TEXT,
    "CustomerBarcode" TEXT NOT NULL,
    "ClassID" INTEGER NOT NULL,
    "GeoID" INTEGER NOT NULL,
    "HCategoryID" INTEGER NOT NULL,
    "ClusterID" INTEGER NOT NULL,
    "CustomerContactPerson" TEXT,
    "CustomerMobile" TEXT,
    "TaxApplicable" BOOLEAN NOT NULL DEFAULT false,
    "CurrencyID" INTEGER NOT NULL DEFAULT 1,
    "PaymentMethodID" INTEGER NOT NULL DEFAULT 1,
    "CustomerCreditLimit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "PaymentTermID" INTEGER NOT NULL DEFAULT 0,
    "CustomerMinCheck" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "CustomerMaxCheck" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "AllowOverCreditLimit" BOOLEAN NOT NULL DEFAULT true,
    "AllowOverCreditDue" BOOLEAN NOT NULL DEFAULT true,
    "AllowOverCheckLimit" BOOLEAN NOT NULL DEFAULT true,
    "CustomerIsActive" BOOLEAN NOT NULL DEFAULT true,
    "Longitude" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "Latitude" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "CustomerCreationDate" TIMESTAMP(3) NOT NULL,
    "AllowTakingPhotos" BOOLEAN NOT NULL DEFAULT true,
    "CustomerLastUpdateTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "OwnerID" INTEGER,
    "CustomerEngagementLimit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "CustomerInformation" TEXT,
    "CustomerImage" TEXT,
    "CustomerAddress" TEXT,
    "CommercialRegistrationNumber" TEXT,
    "CreatedByUserID" INTEGER,
    "UpdatedByUserID" INTEGER,

    CONSTRAINT "salCustomer_pkey" PRIMARY KEY ("CustomerID")
);

-- CreateTable
CREATE TABLE "genCurrency" (
    "CurrencyID" SERIAL NOT NULL,
    "CurrencyNameLan1" TEXT NOT NULL,
    "CurrencyNameLan2" TEXT,
    "CurrencySymbol" TEXT NOT NULL,
    "CurrencyLastConvRate" DOUBLE PRECISION NOT NULL,
    "CurrencyLastConvRateDate" TIMESTAMP(3),
    "CurrencyCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "genCurrency_pkey" PRIMARY KEY ("CurrencyID")
);

-- CreateTable
CREATE TABLE "invItemKind" (
    "ItemKindID" SERIAL NOT NULL,
    "ItemKindLan1" TEXT NOT NULL,
    "ItemKindLan2" TEXT,
    "ItemKindCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemKind_pkey" PRIMARY KEY ("ItemKindID")
);

-- CreateTable
CREATE TABLE "invItemUnit" (
    "CompanyID" INTEGER NOT NULL,
    "ItemUnitID" SERIAL NOT NULL,
    "ItemUnitDescLan1" TEXT NOT NULL,
    "ItemUnitDescLan2" TEXT,
    "ItemUnitCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemUnit_pkey" PRIMARY KEY ("ItemUnitID")
);

-- CreateTable
CREATE TABLE "invItemUnitList" (
    "CompanyID" INTEGER NOT NULL,
    "ItemUnitListID" SERIAL NOT NULL,
    "ItemUnitListDescLan1" TEXT NOT NULL,
    "ItemUnitListDescLan2" TEXT,
    "ItemUnitID" INTEGER NOT NULL,
    "ItemPackSize" INTEGER NOT NULL DEFAULT 1,
    "ItemUnitListCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemUnitList_pkey" PRIMARY KEY ("ItemUnitListID")
);

-- CreateTable
CREATE TABLE "invItemCategory" (
    "CompanyID" INTEGER NOT NULL,
    "ItemCategoryID" SERIAL NOT NULL,
    "CategoryDescLan1" TEXT NOT NULL,
    "CategoryDescLan2" TEXT,
    "CategoryCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemCategory_pkey" PRIMARY KEY ("ItemCategoryID")
);

-- CreateTable
CREATE TABLE "invItemCategory2" (
    "CompanyID" INTEGER NOT NULL,
    "ItemCategory2ID" SERIAL NOT NULL,
    "CategoryDescLan1" TEXT NOT NULL,
    "CategoryDescLan2" TEXT,
    "CategoryCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemCategory2_pkey" PRIMARY KEY ("ItemCategory2ID")
);

-- CreateTable
CREATE TABLE "invItemCategory3" (
    "CompanyID" INTEGER NOT NULL,
    "ItemCategory3ID" SERIAL NOT NULL,
    "CategoryDescLan1" TEXT NOT NULL,
    "CategoryDescLan2" TEXT,
    "CategoryCreationDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemCategory3_pkey" PRIMARY KEY ("ItemCategory3ID")
);

-- CreateTable
CREATE TABLE "invItemStatus" (
    "CompanyID" INTEGER NOT NULL,
    "ItemStatusID" SERIAL NOT NULL,
    "ItemStatusDescLan1" TEXT NOT NULL,
    "ItemStatusDescLan2" TEXT,
    "ItemStatusIsActive" BOOLEAN NOT NULL DEFAULT true,
    "ItemStatusCreationDate" TIMESTAMP(3) NOT NULL,
    "ItemStatusMustUseAC" BOOLEAN NOT NULL DEFAULT false,
    "LastUpdateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItemStatus_pkey" PRIMARY KEY ("ItemStatusID")
);

-- CreateTable
CREATE TABLE "invItem" (
    "CompanyID" INTEGER NOT NULL,
    "ItemKindID" INTEGER NOT NULL,
    "ItemCategoryID" INTEGER NOT NULL,
    "ItemCategory2ID" INTEGER NOT NULL,
    "ItemCategory3ID" INTEGER NOT NULL,
    "ItemID" SERIAL NOT NULL,
    "ItemNameLan1" TEXT NOT NULL,
    "ItemNameLan2" TEXT,
    "ItemUnitListID" INTEGER NOT NULL,
    "ItemBarcode" TEXT,
    "ItemImage" BYTEA,
    "ItemCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ItemIsActive" BOOLEAN NOT NULL DEFAULT true,
    "ItemNearExpiryPeriod" INTEGER,
    "IsProductionItem" BOOLEAN NOT NULL DEFAULT true,
    "LastUpdateDate" TIMESTAMP(3),
    "LastUpdateByUserID" INTEGER,
    "CreatedByUserID" INTEGER,

    CONSTRAINT "invItem_pkey" PRIMARY KEY ("ItemID")
);

-- CreateTable
CREATE TABLE "salPriceList" (
    "CompanyID" INTEGER NOT NULL,
    "ClassID" INTEGER NOT NULL,
    "ItemID" INTEGER NOT NULL,
    "ItemCost" DECIMAL(65,30) NOT NULL DEFAULT -1,
    "PListSellPrice1" DECIMAL(65,30) NOT NULL DEFAULT -1,
    "PListSellPrice2" DECIMAL(65,30) NOT NULL DEFAULT -1,
    "PListReturnPrice1" DECIMAL(65,30) NOT NULL DEFAULT -1,
    "PListReturnPrice2" DECIMAL(65,30) NOT NULL DEFAULT -1,
    "PListSellingDefaultUnit" INTEGER NOT NULL DEFAULT 1,
    "PListCreationDate" TIMESTAMP(3) NOT NULL,
    "PListLastUpdateDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "PListCreatedByUserID" INTEGER,
    "PListLastUpdateByUserID" INTEGER,

    CONSTRAINT "salPriceList_pkey" PRIMARY KEY ("ItemID")
);

-- CreateTable
CREATE TABLE "hhRoute" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "RouteID" SERIAL NOT NULL,
    "RouteDescLan1" TEXT NOT NULL,
    "RouteDescLan2" TEXT,
    "RouteCreationDate" TIMESTAMP(3) NOT NULL,
    "OwnerID" INTEGER NOT NULL,
    "SupervisorID" INTEGER NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "RouteLastUpdateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "RouteLastUpdateByUserID" INTEGER,
    "RouteCreatedByUserID" INTEGER,

    CONSTRAINT "hhRoute_pkey" PRIMARY KEY ("RouteID")
);

-- CreateTable
CREATE TABLE "hhRouteCustomer" (
    "RouteID" INTEGER NOT NULL,
    "CustomerID" INTEGER NOT NULL,
    "CustomerSequence" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "hhRouteCustomer_pkey" PRIMARY KEY ("RouteID","CustomerID")
);

-- CreateTable
CREATE TABLE "hhOwner" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "SupervisorID" INTEGER NOT NULL,
    "OwnerID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "OwnerDescLan1" TEXT NOT NULL,
    "OwnerDescLan2" TEXT,
    "StoreID" INTEGER NOT NULL DEFAULT 1,
    "DefaultPrinterID" INTEGER,
    "OwnerAutoSynchMode" BOOLEAN NOT NULL DEFAULT false,
    "OwnerMaxStockVal" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "OwnerIsActive" BOOLEAN NOT NULL DEFAULT true,
    "OwnerCreationDate" TIMESTAMP(3) NOT NULL,
    "OwnerDefaultWHID" INTEGER NOT NULL,
    "OwnerCreditLimitValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "OwnerACKey" INTEGER,
    "OwnerImage" TEXT,
    "OwnerLastUpdateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedByUserID" INTEGER,
    "LastUpdatedByUserID" INTEGER,

    CONSTRAINT "hhOwner_pkey" PRIMARY KEY ("OwnerID")
);

-- CreateTable
CREATE TABLE "hhOwnerItem" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "OwnerID" INTEGER NOT NULL,
    "ItemID" INTEGER NOT NULL,
    "MinQty" INTEGER NOT NULL DEFAULT 0,
    "MaxQty" INTEGER NOT NULL DEFAULT -1,
    "RecommendedQty" INTEGER NOT NULL DEFAULT -1,
    "ViewInSales" BOOLEAN NOT NULL DEFAULT true,
    "ViewInReturn" BOOLEAN NOT NULL DEFAULT true,
    "ViewInPricing" BOOLEAN NOT NULL DEFAULT true,
    "ViewInOrderTaking" BOOLEAN NOT NULL DEFAULT true,
    "ViewInOrderDelivery" BOOLEAN NOT NULL DEFAULT true,
    "DefaultUnitID" INTEGER NOT NULL,
    "ViewInStockRequest" BOOLEAN NOT NULL DEFAULT true,
    "ViewInStocktaking" BOOLEAN NOT NULL DEFAULT true,
    "ViewInTarget" BOOLEAN NOT NULL DEFAULT true,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedByUserID" INTEGER,
    "LastUpdatedByUserID" INTEGER,

    CONSTRAINT "hhOwnerItem_pkey" PRIMARY KEY ("OwnerID","ItemID")
);

-- CreateTable
CREATE TABLE "hhUser" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "HHUserID" SERIAL NOT NULL,
    "HHUserDescLan1" TEXT NOT NULL,
    "HHUserDescLan2" TEXT,
    "HHUserName" TEXT NOT NULL,
    "HHUserPassword" TEXT NOT NULL,
    "HHUserIsActive" BOOLEAN NOT NULL DEFAULT true,
    "HHUserCreationDate" TIMESTAMP(3) NOT NULL,
    "HHUserLastUpdateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedByUserID" INTEGER,
    "LastUpdatedByUserID" INTEGER,

    CONSTRAINT "hhUser_pkey" PRIMARY KEY ("HHUserID")
);

-- CreateTable
CREATE TABLE "invStoreTransaction" (
    "CompanyID" INTEGER NOT NULL,
    "BranchID" INTEGER NOT NULL,
    "StoreTransactionID" BIGSERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "DocumentTypeID" INTEGER NOT NULL,
    "DocumentID" INTEGER NOT NULL,
    "StoreID" INTEGER NOT NULL,
    "ItemID" INTEGER NOT NULL,
    "ItemStatusID" INTEGER NOT NULL,
    "ItemQty" INTEGER NOT NULL,
    "DocumentRefNumber" TEXT,
    "TransactionDateInt" INTEGER NOT NULL,
    "TransactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invStoreTransaction_pkey" PRIMARY KEY ("StoreTransactionID")
);

-- CreateTable
CREATE TABLE "invAutoSRHeader" (
    "CompanyID" INTEGER NOT NULL,
    "SupervisorID" INTEGER NOT NULL,
    "OwnerID" INTEGER NOT NULL,
    "WHID" INTEGER NOT NULL,
    "SRNumber" TEXT NOT NULL,
    "SRTypeID" INTEGER NOT NULL,
    "AutoSRLoadDate" TIMESTAMP(3) NOT NULL,
    "AutoSRDate" TIMESTAMP(3) NOT NULL,
    "AutoSRStatus" TEXT NOT NULL,
    "AutoSRID" SERIAL NOT NULL,

    CONSTRAINT "invAutoSRHeader_pkey" PRIMARY KEY ("AutoSRID")
);

-- CreateTable
CREATE TABLE "invAutoSRDetail" (
    "CompanyID" INTEGER NOT NULL,
    "SupervisorID" INTEGER NOT NULL,
    "OwnerID" INTEGER NOT NULL,
    "SRNumber" TEXT NOT NULL,
    "ItemID" INTEGER NOT NULL,
    "ItemStatusID" INTEGER NOT NULL DEFAULT 0,
    "SRTypeID" INTEGER NOT NULL,
    "ItemUnitID" INTEGER NOT NULL,
    "AutoSRQty" INTEGER NOT NULL,
    "AutoSRSupervisorQty" INTEGER,
    "AutoSRLoadDate" TIMESTAMP(3) NOT NULL,
    "AutoSRDate" TIMESTAMP(3) NOT NULL,
    "AutoSRStatus" TEXT NOT NULL,

    CONSTRAINT "invAutoSRDetail_pkey" PRIMARY KEY ("CompanyID","OwnerID","SRNumber","ItemID","ItemStatusID")
);

-- AddForeignKey
ALTER TABLE "invStore" ADD CONSTRAINT "invStore_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStore" ADD CONSTRAINT "invStore_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStore" ADD CONSTRAINT "invStore_StoreTypeID_fkey" FOREIGN KEY ("StoreTypeID") REFERENCES "invStoreType"("StoreTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genSalesManager" ADD CONSTRAINT "genSalesManager_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genSalesManager" ADD CONSTRAINT "genSalesManager_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "hhUser"("HHUserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genRegionalManager" ADD CONSTRAINT "genRegionalManager_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genRegionalManager" ADD CONSTRAINT "genRegionalManager_SMID_fkey" FOREIGN KEY ("SMID") REFERENCES "genSalesManager"("SMID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genRegionalManager" ADD CONSTRAINT "genRegionalManager_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "hhUser"("HHUserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genAreaManager" ADD CONSTRAINT "genAreaManager_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genAreaManager" ADD CONSTRAINT "genAreaManager_RMID_fkey" FOREIGN KEY ("RMID") REFERENCES "genRegionalManager"("RMID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genAreaManager" ADD CONSTRAINT "genAreaManager_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "hhUser"("HHUserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genSupervisor" ADD CONSTRAINT "genSupervisor_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genSupervisor" ADD CONSTRAINT "genSupervisor_AMID_fkey" FOREIGN KEY ("AMID") REFERENCES "genAreaManager"("AMID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genSupervisor" ADD CONSTRAINT "genSupervisor_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genSupervisor" ADD CONSTRAINT "genSupervisor_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "hhUser"("HHUserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genBranch" ADD CONSTRAINT "genBranch_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genPaymentTerm" ADD CONSTRAINT "genPaymentTerm_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomerClass" ADD CONSTRAINT "salCustomerClass_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomerCluster" ADD CONSTRAINT "salCustomerCluster_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secUser" ADD CONSTRAINT "secUser_UserGroupID_fkey" FOREIGN KEY ("UserGroupID") REFERENCES "secUserGroup"("UserGroupID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salGeoLevel" ADD CONSTRAINT "salGeoLevel_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salGeo" ADD CONSTRAINT "salGeo_GeoLevelID_fkey" FOREIGN KEY ("GeoLevelID") REFERENCES "salGeoLevel"("GeoLevelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salGeo" ADD CONSTRAINT "salGeo_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_ClassID_fkey" FOREIGN KEY ("ClassID") REFERENCES "salCustomerClass"("ClassID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_CustomerTypeID_fkey" FOREIGN KEY ("CustomerTypeID") REFERENCES "salCustomerType"("CustomerTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_ClusterID_fkey" FOREIGN KEY ("ClusterID") REFERENCES "salCustomerCluster"("ClusterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_HCategoryID_fkey" FOREIGN KEY ("HCategoryID") REFERENCES "salCustomerHCategory"("HCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_PaymentTermID_fkey" FOREIGN KEY ("PaymentTermID") REFERENCES "genPaymentTerm"("PaymentTermID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_PaymentMethodID_fkey" FOREIGN KEY ("PaymentMethodID") REFERENCES "genPaymentMethod"("PaymentMethodID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_GeoID_fkey" FOREIGN KEY ("GeoID") REFERENCES "salGeo"("GeoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salCustomer" ADD CONSTRAINT "salCustomer_CurrencyID_fkey" FOREIGN KEY ("CurrencyID") REFERENCES "genCurrency"("CurrencyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemUnit" ADD CONSTRAINT "invItemUnit_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemUnitList" ADD CONSTRAINT "invItemUnitList_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemUnitList" ADD CONSTRAINT "invItemUnitList_ItemUnitID_fkey" FOREIGN KEY ("ItemUnitID") REFERENCES "invItemUnit"("ItemUnitID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemCategory" ADD CONSTRAINT "invItemCategory_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemCategory2" ADD CONSTRAINT "invItemCategory2_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemCategory3" ADD CONSTRAINT "invItemCategory3_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItemStatus" ADD CONSTRAINT "invItemStatus_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItem" ADD CONSTRAINT "invItem_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItem" ADD CONSTRAINT "invItem_ItemCategoryID_fkey" FOREIGN KEY ("ItemCategoryID") REFERENCES "invItemCategory"("ItemCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItem" ADD CONSTRAINT "invItem_ItemCategory2ID_fkey" FOREIGN KEY ("ItemCategory2ID") REFERENCES "invItemCategory2"("ItemCategory2ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItem" ADD CONSTRAINT "invItem_ItemCategory3ID_fkey" FOREIGN KEY ("ItemCategory3ID") REFERENCES "invItemCategory3"("ItemCategory3ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItem" ADD CONSTRAINT "invItem_ItemKindID_fkey" FOREIGN KEY ("ItemKindID") REFERENCES "invItemKind"("ItemKindID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invItem" ADD CONSTRAINT "invItem_ItemUnitListID_fkey" FOREIGN KEY ("ItemUnitListID") REFERENCES "invItemUnitList"("ItemUnitListID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salPriceList" ADD CONSTRAINT "salPriceList_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salPriceList" ADD CONSTRAINT "salPriceList_ItemID_fkey" FOREIGN KEY ("ItemID") REFERENCES "invItem"("ItemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salPriceList" ADD CONSTRAINT "salPriceList_ClassID_fkey" FOREIGN KEY ("ClassID") REFERENCES "salCustomerClass"("ClassID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salPriceList" ADD CONSTRAINT "salPriceList_PListSellingDefaultUnit_fkey" FOREIGN KEY ("PListSellingDefaultUnit") REFERENCES "invItemUnitList"("ItemUnitListID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhRoute" ADD CONSTRAINT "hhRoute_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhRoute" ADD CONSTRAINT "hhRoute_SupervisorID_fkey" FOREIGN KEY ("SupervisorID") REFERENCES "genSupervisor"("SupervisorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhRoute" ADD CONSTRAINT "hhRoute_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhRouteCustomer" ADD CONSTRAINT "hhRouteCustomer_RouteID_fkey" FOREIGN KEY ("RouteID") REFERENCES "hhRoute"("RouteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhRouteCustomer" ADD CONSTRAINT "hhRouteCustomer_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "salCustomer"("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwner" ADD CONSTRAINT "hhOwner_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwner" ADD CONSTRAINT "hhOwner_SupervisorID_fkey" FOREIGN KEY ("SupervisorID") REFERENCES "genSupervisor"("SupervisorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwner" ADD CONSTRAINT "hhOwner_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwner" ADD CONSTRAINT "hhOwner_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "hhUser"("HHUserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwner" ADD CONSTRAINT "hhOwner_StoreID_fkey" FOREIGN KEY ("StoreID") REFERENCES "invStore"("StoreID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwner" ADD CONSTRAINT "hhOwner_OwnerDefaultWHID_fkey" FOREIGN KEY ("OwnerDefaultWHID") REFERENCES "invStore"("StoreID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwnerItem" ADD CONSTRAINT "hhOwnerItem_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwnerItem" ADD CONSTRAINT "hhOwnerItem_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwnerItem" ADD CONSTRAINT "hhOwnerItem_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "hhOwner"("OwnerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwnerItem" ADD CONSTRAINT "hhOwnerItem_ItemID_fkey" FOREIGN KEY ("ItemID") REFERENCES "invItem"("ItemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhOwnerItem" ADD CONSTRAINT "hhOwnerItem_DefaultUnitID_fkey" FOREIGN KEY ("DefaultUnitID") REFERENCES "invItemUnit"("ItemUnitID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhUser" ADD CONSTRAINT "hhUser_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhUser" ADD CONSTRAINT "hhUser_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStoreTransaction" ADD CONSTRAINT "invStoreTransaction_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStoreTransaction" ADD CONSTRAINT "invStoreTransaction_BranchID_fkey" FOREIGN KEY ("BranchID") REFERENCES "genBranch"("BranchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStoreTransaction" ADD CONSTRAINT "invStoreTransaction_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "hhUser"("HHUserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStoreTransaction" ADD CONSTRAINT "invStoreTransaction_StoreID_fkey" FOREIGN KEY ("StoreID") REFERENCES "invStore"("StoreID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invStoreTransaction" ADD CONSTRAINT "invStoreTransaction_ItemID_fkey" FOREIGN KEY ("ItemID") REFERENCES "invItem"("ItemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRHeader" ADD CONSTRAINT "invAutoSRHeader_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRHeader" ADD CONSTRAINT "invAutoSRHeader_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "hhOwner"("OwnerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRHeader" ADD CONSTRAINT "invAutoSRHeader_SupervisorID_fkey" FOREIGN KEY ("SupervisorID") REFERENCES "genSupervisor"("SupervisorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRHeader" ADD CONSTRAINT "invAutoSRHeader_WHID_fkey" FOREIGN KEY ("WHID") REFERENCES "invStore"("StoreID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRDetail" ADD CONSTRAINT "invAutoSRDetail_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "genCompany"("CompanyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRDetail" ADD CONSTRAINT "invAutoSRDetail_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "hhOwner"("OwnerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRDetail" ADD CONSTRAINT "invAutoSRDetail_ItemID_fkey" FOREIGN KEY ("ItemID") REFERENCES "invItem"("ItemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invAutoSRDetail" ADD CONSTRAINT "invAutoSRDetail_SupervisorID_fkey" FOREIGN KEY ("SupervisorID") REFERENCES "genSupervisor"("SupervisorID") ON DELETE RESTRICT ON UPDATE CASCADE;
