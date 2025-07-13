/*
  Warnings:

  - The primary key for the `invAutoSRDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CompanyID` on the `invAutoSRDetail` table. All the data in the column will be lost.
  - You are about to drop the column `OwnerID` on the `invAutoSRDetail` table. All the data in the column will be lost.
  - You are about to drop the column `SupervisorID` on the `invAutoSRDetail` table. All the data in the column will be lost.
  - Added the required column `AutoSRLoadQty` to the `invAutoSRDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hhRouteCustomer" DROP CONSTRAINT "hhRouteCustomer_RouteID_fkey";

-- DropForeignKey
ALTER TABLE "invAutoSRDetail" DROP CONSTRAINT "invAutoSRDetail_CompanyID_fkey";

-- DropForeignKey
ALTER TABLE "invAutoSRDetail" DROP CONSTRAINT "invAutoSRDetail_OwnerID_fkey";

-- DropForeignKey
ALTER TABLE "invAutoSRDetail" DROP CONSTRAINT "invAutoSRDetail_SupervisorID_fkey";

-- AlterTable
ALTER TABLE "invAutoSRDetail" DROP CONSTRAINT "invAutoSRDetail_pkey",
DROP COLUMN "CompanyID",
DROP COLUMN "OwnerID",
DROP COLUMN "SupervisorID",
ADD COLUMN     "AutoSRLoadQty" INTEGER NOT NULL,
ADD CONSTRAINT "invAutoSRDetail_pkey" PRIMARY KEY ("SRNumber", "ItemID", "ItemStatusID");

-- AddForeignKey
ALTER TABLE "hhRoute" ADD CONSTRAINT "hhRoute_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "hhOwner"("OwnerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hhRouteCustomer" ADD CONSTRAINT "hhRouteCustomer_RouteID_fkey" FOREIGN KEY ("RouteID") REFERENCES "hhRoute"("RouteID") ON DELETE CASCADE ON UPDATE CASCADE;
