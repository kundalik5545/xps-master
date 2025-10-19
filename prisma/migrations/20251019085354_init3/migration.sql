/*
  Warnings:

  - You are about to drop the column `menuName` on the `XpsTestCases` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_XpsTestCases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "testCaseNo" TEXT,
    "testCaseName" TEXT NOT NULL,
    "schemeType" TEXT,
    "schemeLevel" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "automationStatus" TEXT NOT NULL,
    "expectedResult" TEXT,
    "actualResult" TEXT,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsTestCases_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_XpsTestCases" ("actualResult", "automationStatus", "comments", "createdAt", "expectedResult", "id", "module", "schemeLevel", "schemeType", "testCaseName", "testCaseNo", "updatedAt", "xpsMenuId") SELECT "actualResult", "automationStatus", "comments", "createdAt", "expectedResult", "id", "module", "schemeLevel", "schemeType", "testCaseName", "testCaseNo", "updatedAt", "xpsMenuId" FROM "XpsTestCases";
DROP TABLE "XpsTestCases";
ALTER TABLE "new_XpsTestCases" RENAME TO "XpsTestCases";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
