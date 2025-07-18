/*
  Warnings:

  - You are about to drop the column `jenis_kelamin` on the `user_informations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_informations" DROP COLUMN "jenis_kelamin",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'Male';
