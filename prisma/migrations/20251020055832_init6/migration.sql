/*
  Warnings:

  - You are about to drop the `RegComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RegComments";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DailyWork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER,
    "taskTitle" TEXT,
    "taskState" TEXT,
    "portalName" TEXT DEFAULT 'XPS',
    "env" TEXT,
    "assignedBy" TEXT,
    "taskURL" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DailyWorkComments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comments" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dailyWorkId" INTEGER NOT NULL,
    CONSTRAINT "DailyWorkComments_dailyWorkId_fkey" FOREIGN KEY ("dailyWorkId") REFERENCES "DailyWork" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
