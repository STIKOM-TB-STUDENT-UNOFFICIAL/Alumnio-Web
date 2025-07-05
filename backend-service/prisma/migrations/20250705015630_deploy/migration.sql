-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "user_informations" (
    "id_user_information" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "class_of" TEXT NOT NULL,
    "major_id" INTEGER NOT NULL,
    "linkedin_url" TEXT,
    "curriculum_vitae" TEXT DEFAULT '',

    CONSTRAINT "user_informations_pkey" PRIMARY KEY ("id_user_information")
);

-- CreateTable
CREATE TABLE "majors" (
    "id_major" SERIAL NOT NULL,
    "major_name" TEXT NOT NULL,

    CONSTRAINT "majors_pkey" PRIMARY KEY ("id_major")
);

-- CreateTable
CREATE TABLE "work_histories" (
    "id_work_history" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "work_histories_pkey" PRIMARY KEY ("id_work_history")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id_portfolio" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "demo_url" TEXT,
    "source_code" TEXT,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id_portfolio")
);

-- CreateTable
CREATE TABLE "portfolio_attachments" (
    "id_portfolio_attachment" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "portfolio_attachments_pkey" PRIMARY KEY ("id_portfolio_attachment")
);

-- CreateTable
CREATE TABLE "portfolio_stacks" (
    "id_portfolio_stack" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "portfolio_id" INTEGER NOT NULL,

    CONSTRAINT "portfolio_stacks_pkey" PRIMARY KEY ("id_portfolio_stack")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_informations_userId_key" ON "user_informations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_informations_major_id_key" ON "user_informations"("major_id");

-- AddForeignKey
ALTER TABLE "user_informations" ADD CONSTRAINT "user_informations_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id_major") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_informations" ADD CONSTRAINT "user_informations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_histories" ADD CONSTRAINT "work_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_attachments" ADD CONSTRAINT "portfolio_attachments_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id_portfolio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_stacks" ADD CONSTRAINT "portfolio_stacks_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id_portfolio") ON DELETE RESTRICT ON UPDATE CASCADE;
