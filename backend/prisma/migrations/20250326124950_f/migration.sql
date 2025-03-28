/*
  Warnings:

  - Added the required column `letter` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Class` ADD COLUMN `letter` VARCHAR(191) NOT NULL;
