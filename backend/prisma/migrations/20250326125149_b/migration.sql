/*
  Warnings:

  - Added the required column `room_number` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Class` ADD COLUMN `room_number` INTEGER NOT NULL;
