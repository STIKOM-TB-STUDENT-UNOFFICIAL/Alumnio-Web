-- CreateTable
CREATE TABLE "job_opportunities" (
    "id_job_oportunities" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "company_logos" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "posted_date" TIMESTAMP(3) NOT NULL,
    "mail_contact" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "phone_contact" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "job_opportunities_pkey" PRIMARY KEY ("id_job_oportunities")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id_survey" SERIAL NOT NULL,
    "questions" TEXT NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id_survey")
);

-- CreateTable
CREATE TABLE "question_answers" (
    "id_question_answer" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "surveyId" INTEGER NOT NULL,

    CONSTRAINT "question_answers_pkey" PRIMARY KEY ("id_question_answer")
);

-- CreateTable
CREATE TABLE "user_answers" (
    "id_user_answer" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "questionid" INTEGER NOT NULL,

    CONSTRAINT "user_answers_pkey" PRIMARY KEY ("id_user_answer")
);

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id_survey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id_survey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "question_answers"("id_question_answer") ON DELETE RESTRICT ON UPDATE CASCADE;
