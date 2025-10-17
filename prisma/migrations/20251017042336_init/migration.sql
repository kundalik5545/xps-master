-- CreateTable
CREATE TABLE "Portals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "portalName" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "userName" TEXT,
    "password" TEXT,
    "memorableWord" TEXT,
    "appURL" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eMemberId" INTEGER,
    "xpsId" INTEGER,
    "userHashId" TEXT,
    "username" TEXT,
    "password" TEXT,
    "memorableWord" TEXT,
    "userStatusId" INTEGER,
    "userEmail" TEXT,
    "DOB" DATETIME,
    "niNumber" TEXT,
    "addressId" INTEGER,
    "postcode" TEXT,
    "xpsSchemeId" INTEGER,
    "eMemberSchemeId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "XpsMenus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuName" TEXT NOT NULL,
    "schemeLevel" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "automationStatus" TEXT NOT NULL,
    "userGuideId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "XpsMenuDescriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsMenuDescriptions_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsUserGuides" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapterNo" INTEGER,
    "chapterName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsUserGuides_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsTestCases" (
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
    "menuName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsTestCases_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsTables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsTables_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsColumns" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "columnName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsTableId" INTEGER,
    CONSTRAINT "XpsColumns_xpsTableId_fkey" FOREIGN KEY ("xpsTableId") REFERENCES "XpsTables" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsScripts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scriptTitle" TEXT NOT NULL,
    "sqlScript" TEXT NOT NULL,
    "scriptInfo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsScripts_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsBugs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bugId" INTEGER NOT NULL,
    "bugTitle" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "qaBugState" TEXT NOT NULL,
    "env" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "bugUrl" TEXT NOT NULL,
    "comments" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsBugs_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsReleasedTasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "taskState" TEXT NOT NULL,
    "env" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "comments" TEXT,
    "taskURL" TEXT NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    "xpsMenuId" INTEGER,
    CONSTRAINT "XpsReleasedTasks_xpsMenuId_fkey" FOREIGN KEY ("xpsMenuId") REFERENCES "XpsMenus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Em_Menus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emMenuName" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "automationStatus" TEXT NOT NULL,
    "emUserGuideId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Em_MenuDescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emComment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "Em_MenuDescription_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Em_UserGuide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emChapterNo" INTEGER,
    "emChapterName" TEXT,
    "emResourceURL" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emMenuId" INTEGER,
    CONSTRAINT "Em_UserGuide_emMenuId_fkey" FOREIGN KEY ("emMenuId") REFERENCES "Em_Menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Em_Tables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emTableName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Em_Columns" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emColumnName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emTableId" INTEGER,
    CONSTRAINT "Em_Columns_emTableId_fkey" FOREIGN KEY ("emTableId") REFERENCES "Em_Tables" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EM_Scripts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emScriptTitle" TEXT NOT NULL,
    "emSqlScript" TEXT NOT NULL,
    "emScriptInfo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EM_Bugs" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EM_ReleasedTasks" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RegComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numId" INTEGER NOT NULL,
    "taskId" INTEGER,
    "taskTitle" TEXT,
    "comments" TEXT,
    "portalName" TEXT DEFAULT 'XPS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProposedTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numId" INTEGER NOT NULL,
    "qaTaskId" INTEGER NOT NULL,
    "qaTaskTitle" TEXT NOT NULL,
    "qaTaskState" TEXT,
    "timeAllocated" TEXT,
    "timeRemained" TEXT,
    "qaComments" TEXT,
    "qaTaskUrl" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_eMemberId_key" ON "Users"("eMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_xpsId_key" ON "Users"("xpsId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userHashId_key" ON "Users"("userHashId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_niNumber_key" ON "Users"("niNumber");

-- CreateIndex
CREATE UNIQUE INDEX "XpsTables_tableName_key" ON "XpsTables"("tableName");

-- CreateIndex
CREATE UNIQUE INDEX "XpsBugs_bugId_key" ON "XpsBugs"("bugId");

-- CreateIndex
CREATE UNIQUE INDEX "XpsReleasedTasks_taskId_key" ON "XpsReleasedTasks"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "EM_Bugs_emBugId_key" ON "EM_Bugs"("emBugId");

-- CreateIndex
CREATE UNIQUE INDEX "EM_ReleasedTasks_emTaskId_key" ON "EM_ReleasedTasks"("emTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "RegComments_numId_key" ON "RegComments"("numId");

-- CreateIndex
CREATE UNIQUE INDEX "ProposedTask_numId_key" ON "ProposedTask"("numId");

-- CreateIndex
CREATE UNIQUE INDEX "ProposedTask_qaTaskId_key" ON "ProposedTask"("qaTaskId");
