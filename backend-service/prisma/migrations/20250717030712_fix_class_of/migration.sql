/*
  Warnings:

  - Changed the type of `class_of` on the `user_informations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_informations" DROP COLUMN "class_of",
ADD COLUMN     "class_of" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ClassOf" (
    "id" SERIAL NOT NULL,
    "class_of" TEXT NOT NULL,

    CONSTRAINT "ClassOf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_informations" ADD CONSTRAINT "user_informations_class_of_fkey" FOREIGN KEY ("class_of") REFERENCES "ClassOf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
