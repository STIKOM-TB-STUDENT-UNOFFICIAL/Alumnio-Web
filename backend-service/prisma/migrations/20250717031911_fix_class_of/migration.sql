/*
  Warnings:

  - You are about to drop the column `class_of` on the `user_informations` table. All the data in the column will be lost.
  - You are about to drop the `class_of` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `graduate_of` to the `user_informations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_informations" DROP CONSTRAINT "user_informations_class_of_fkey";

-- AlterTable
ALTER TABLE "user_informations" DROP COLUMN "class_of",
ADD COLUMN     "graduate_of" TEXT NOT NULL;

-- DropTable
DROP TABLE "class_of";
