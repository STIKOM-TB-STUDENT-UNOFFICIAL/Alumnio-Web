/*
  Warnings:

  - Added the required column `survey_type` to the `surveys` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SurveyType" AS ENUM ('ALUMNI', 'GRADUATE_USER');

-- AlterTable
ALTER TABLE "surveys" ADD COLUMN     "survey_type" "SurveyType" NOT NULL;
