/*
  Warnings:

  - You are about to drop the column `location` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the `_CompanyToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_B_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "location",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CompanyToUser";

-- DropTable
DROP TABLE "users";

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");
