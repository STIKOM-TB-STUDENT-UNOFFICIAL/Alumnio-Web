/*
  Warnings:

  - The `jenis_kelamin` column on the `user_informations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "user_informations" DROP COLUMN "jenis_kelamin",
ADD COLUMN     "jenis_kelamin" "Gender" NOT NULL DEFAULT 'Male';

-- DropEnum
DROP TYPE "JenisKelamin";
