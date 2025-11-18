/*
  Warnings:

  - You are about to drop the `ClassOf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_informations" DROP CONSTRAINT "user_informations_class_of_fkey";

-- DropTable
DROP TABLE "ClassOf";

-- CreateTable
CREATE TABLE "class_of" (
    "id" SERIAL NOT NULL,
    "class_of" TEXT NOT NULL,

    CONSTRAINT "class_of_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_informations" ADD CONSTRAINT "user_informations_class_of_fkey" FOREIGN KEY ("class_of") REFERENCES "class_of"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
