-- CreateTable
CREATE TABLE "invBOStoreLoad" (
    "StoreID" INTEGER NOT NULL,
    "LoadType" INTEGER NOT NULL,
    "LoadID" INTEGER NOT NULL,
    "LoadDocumentNumber" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,
    "LoadStatusID" CHAR(1) NOT NULL,
    "LoadCreationDate" TIMESTAMP(3) NOT NULL,
    "TotalReceivedQuantityCost" DECIMAL(65,30) NOT NULL,
    "ItemID" INTEGER NOT NULL,
    "ItemStatus" INTEGER NOT NULL,
    "ReceivedQuantity" INTEGER NOT NULL,

    CONSTRAINT "invBOStoreLoad_pkey" PRIMARY KEY ("LoadID","LoadType","ItemID")
);
