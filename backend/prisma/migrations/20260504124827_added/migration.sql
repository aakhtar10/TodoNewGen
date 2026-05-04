/*
  Warnings:

  - Added the required column `description` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCompleted` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
