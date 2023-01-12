/*
  Warnings:

  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EOrderStatus" AS ENUM ('ACCEPTED', 'REFUSED', 'OPENED', 'DELETED');

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "detailsText" BYTEA NOT NULL,
    "deadlineInDays" INTEGER NOT NULL,
    "status" "EOrderStatus" NOT NULL DEFAULT 'OPENED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "architectId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_id_idx" ON "order"("id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_architectId_fkey" FOREIGN KEY ("architectId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
