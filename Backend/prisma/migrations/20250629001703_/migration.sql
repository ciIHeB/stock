/*
  Warnings:

  - You are about to alter the column `TotalReceivedQuantityCost` on the `invBOStoreLoad` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
CREATE SEQUENCE invbostoreload_loadid_seq;
ALTER TABLE "invBOStoreLoad" ALTER COLUMN "LoadID" SET DEFAULT nextval('invbostoreload_loadid_seq'),
ALTER COLUMN "TotalReceivedQuantityCost" SET DATA TYPE DOUBLE PRECISION;
ALTER SEQUENCE invbostoreload_loadid_seq OWNED BY "invBOStoreLoad"."LoadID";
