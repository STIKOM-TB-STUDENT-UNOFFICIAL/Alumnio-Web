/*
  Warnings:

  - You are about to drop the `question_answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "question_answers" DROP CONSTRAINT "question_answers_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "user_answers" DROP CONSTRAINT "user_answers_answerId_fkey";

-- DropTable
DROP TABLE "question_answers";

-- CreateTable
CREATE TABLE "answers" (
    "id_question_answer" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "surveyId" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id_question_answer")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id_survey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id_question_answer") ON DELETE RESTRICT ON UPDATE CASCADE;
