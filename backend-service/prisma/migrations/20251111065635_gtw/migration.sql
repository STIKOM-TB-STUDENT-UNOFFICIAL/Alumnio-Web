/*
  Warnings:

  - Added the required column `due_date` to the `job_opportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_opportunities" ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL;
