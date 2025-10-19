-- CreateTable
CREATE TABLE "Em_TestCases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "testCaseNo" TEXT,
    "testCaseName" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "automationStatus" TEXT NOT NULL,
    "expectedResult" TEXT,
    "actualResult" TEXT,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "Em_TestCases_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EM_Bugs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emBugId" INTEGER NOT NULL,
    "emBugTitle" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "qaBugState" TEXT NOT NULL,
    "env" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "emBugUrl" TEXT NOT NULL,
    "comments" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "EM_Bugs_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EM_Bugs" ("assignedTo", "comments", "createdAt", "emBugId", "emBugTitle", "emBugUrl", "env", "id", "portalName", "qaBugState", "updatedAt") SELECT "assignedTo", "comments", "createdAt", "emBugId", "emBugTitle", "emBugUrl", "env", "id", "portalName", "qaBugState", "updatedAt" FROM "EM_Bugs";
DROP TABLE "EM_Bugs";
ALTER TABLE "new_EM_Bugs" RENAME TO "EM_Bugs";
CREATE UNIQUE INDEX "EM_Bugs_emBugId_key" ON "EM_Bugs"("emBugId");
CREATE TABLE "new_EM_ReleasedTasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emTaskId" INTEGER NOT NULL,
    "emTaskTitle" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "taskState" TEXT NOT NULL,
    "env" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "emTaskUrl" TEXT NOT NULL,
    "emComments" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "EM_ReleasedTasks_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EM_ReleasedTasks" ("assignedBy", "createdAt", "emComments", "emTaskId", "emTaskTitle", "emTaskUrl", "env", "id", "portalName", "taskState", "updatedAt") SELECT "assignedBy", "createdAt", "emComments", "emTaskId", "emTaskTitle", "emTaskUrl", "env", "id", "portalName", "taskState", "updatedAt" FROM "EM_ReleasedTasks";
DROP TABLE "EM_ReleasedTasks";
ALTER TABLE "new_EM_ReleasedTasks" RENAME TO "EM_ReleasedTasks";
CREATE UNIQUE INDEX "EM_ReleasedTasks_emTaskId_key" ON "EM_ReleasedTasks"("emTaskId");
CREATE TABLE "new_EM_Scripts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emScriptTitle" TEXT NOT NULL,
    "emSqlScript" TEXT NOT NULL,
    "emScriptInfo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "EM_Scripts_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EM_Scripts" ("createdAt", "emScriptInfo", "emScriptTitle", "emSqlScript", "id", "updatedAt") SELECT "createdAt", "emScriptInfo", "emScriptTitle", "emSqlScript", "id", "updatedAt" FROM "EM_Scripts";
DROP TABLE "EM_Scripts";
ALTER TABLE "new_EM_Scripts" RENAME TO "EM_Scripts";
CREATE TABLE "new_Em_Tables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emTableName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "Em_Tables_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Em_Tables" ("createdAt", "emTableName", "id", "updatedAt") SELECT "createdAt", "emTableName", "id", "updatedAt" FROM "Em_Tables";
DROP TABLE "Em_Tables";
ALTER TABLE "new_Em_Tables" RENAME TO "Em_Tables";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
