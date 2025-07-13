/*
  Warnings:

  - You are about to alter the column `ItemCost` on the `salPriceList` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `PListSellPrice1` on the `salPriceList` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `PListSellPrice2` on the `salPriceList` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `PListReturnPrice1` on the `salPriceList` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `PListReturnPrice2` on the `salPriceList` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Made the column `PListCreatedByUserID` on table `salPriceList` required. This step will fail if there are existing NULL values in that column.
  - Made the column `PListLastUpdateByUserID` on table `salPriceList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "salPriceList" ALTER COLUMN "ItemCost" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PListSellPrice1" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PListSellPrice2" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PListReturnPrice1" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PListReturnPrice2" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PListCreatedByUserID" SET NOT NULL,
ALTER COLUMN "PListLastUpdateByUserID" SET NOT NULL;
