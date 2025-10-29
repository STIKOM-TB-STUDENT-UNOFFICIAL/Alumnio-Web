/*
  Warnings:

  - You are about to drop the column `questionid` on the `user_answers` table. All the data in the column will be lost.
  - You are about to drop the column `surveyId` on the `user_answers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_answers` table. All the data in the column will be lost.
  - Added the required column `answerId` to the `user_answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `survey_id` to the `user_answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_answers" DROP CONSTRAINT "user_answers_questionid_fkey";

-- DropForeignKey
ALTER TABLE "user_answers" DROP CONSTRAINT "user_answers_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "user_answers" DROP CONSTRAINT "user_answers_userId_fkey";

-- AlterTable
ALTER TABLE "user_answers" DROP COLUMN "questionid",
DROP COLUMN "surveyId",
DROP COLUMN "userId",
ADD COLUMN     "answerId" INTEGER NOT NULL,
ADD COLUMN     "survey_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id_survey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "question_answers"("id_question_answer") ON DELETE RESTRICT ON UPDATE CASCADE;
