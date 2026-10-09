/*
  Warnings:

  - Added the required column `gameId` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Feedback_gameId_idx" ON "Feedback"("gameId");
