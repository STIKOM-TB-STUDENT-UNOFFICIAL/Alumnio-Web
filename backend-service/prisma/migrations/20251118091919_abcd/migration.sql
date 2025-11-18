-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_informations` (
    `id_user_information` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `gender` ENUM('Male', 'Female') NOT NULL DEFAULT 'Male',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `address` TEXT NOT NULL,
    `bio` VARCHAR(191) NOT NULL DEFAULT '',
    `graduate_of` VARCHAR(191) NOT NULL,
    `major_id` INTEGER NOT NULL,
    `linkedin_url` VARCHAR(191) NULL,
    `curriculum_vitae` VARCHAR(191) NULL DEFAULT '',
    `profilePict` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `user_informations_userId_key`(`userId`),
    PRIMARY KEY (`id_user_information`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `majors` (
    `id_major` INTEGER NOT NULL AUTO_INCREMENT,
    `major_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_major`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_histories` (
    `id_work_history` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,

    PRIMARY KEY (`id_work_history`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolios` (
    `id_portfolio` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `demo_url` VARCHAR(191) NULL,
    `source_code` VARCHAR(191) NULL,

    PRIMARY KEY (`id_portfolio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolio_attachments` (
    `id_portfolio_attachment` INTEGER NOT NULL AUTO_INCREMENT,
    `portfolio_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_portfolio_attachment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolio_stacks` (
    `id_portfolio_stack` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `portfolio_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_portfolio_stack`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id_otp` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expired_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_otp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_opportunities` (
    `id_job_oportunities` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `company_logos` VARCHAR(191) NOT NULL DEFAULT '',
    `location` VARCHAR(191) NOT NULL,
    `posted_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `due_date` DATETIME(3) NOT NULL,
    `mail_contact` VARCHAR(191) NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `phone_contact` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id_job_oportunities`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surveys` (
    `id_survey` INTEGER NOT NULL AUTO_INCREMENT,
    `questions` VARCHAR(191) NOT NULL,
    `survey_type` ENUM('ALUMNI', 'GRADUATE_USER') NOT NULL,

    PRIMARY KEY (`id_survey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answers` (
    `id_question_answer` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` VARCHAR(191) NOT NULL,
    `surveyId` INTEGER NOT NULL,

    PRIMARY KEY (`id_question_answer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_answers` (
    `id_user_answer` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `survey_id` INTEGER NOT NULL,
    `answerId` INTEGER NOT NULL,

    PRIMARY KEY (`id_user_answer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_informations` ADD CONSTRAINT `user_informations_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id_major`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_informations` ADD CONSTRAINT `user_informations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_histories` ADD CONSTRAINT `work_histories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolios` ADD CONSTRAINT `portfolios_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolio_attachments` ADD CONSTRAINT `portfolio_attachments_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id_portfolio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolio_stacks` ADD CONSTRAINT `portfolio_stacks_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id_portfolio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `surveys`(`id_survey`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_survey_id_fkey` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`id_survey`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `answers`(`id_question_answer`) ON DELETE RESTRICT ON UPDATE CASCADE;
