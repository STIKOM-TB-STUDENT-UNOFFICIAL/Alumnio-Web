-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('L', 'P');

-- AlterTable
ALTER TABLE "user_informations" ADD COLUMN     "jenis_kelamin" "JenisKelamin" NOT NULL DEFAULT 'L';
