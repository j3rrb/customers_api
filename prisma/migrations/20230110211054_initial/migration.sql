-- CreateEnum
CREATE TYPE "ERoles" AS ENUM ('CUSTOMER', 'ARCHITECT');

-- CreateEnum
CREATE TYPE "EGenders" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "auth" (
    "id" SERIAL NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(45) NOT NULL,
    "lastName" VARCHAR(45) NOT NULL,
    "email" TEXT,
    "primaryPhoneNumber" TEXT NOT NULL,
    "secondaryPhoneNumber" TEXT,
    "gender" "EGenders" NOT NULL,
    "role" "ERoles" NOT NULL,
    "birthDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "auth_id_idx" ON "auth"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_primaryPhoneNumber_key" ON "user"("primaryPhoneNumber");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
