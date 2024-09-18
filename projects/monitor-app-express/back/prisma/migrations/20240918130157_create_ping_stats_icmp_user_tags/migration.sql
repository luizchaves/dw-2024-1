-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TagsOnHosts" (
    "tagId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "hostId"),
    CONSTRAINT "TagsOnHosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagsOnHosts_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ping" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostId" TEXT NOT NULL,
    CONSTRAINT "Ping_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transmitted" INTEGER NOT NULL,
    "received" INTEGER NOT NULL,
    "time" REAL NOT NULL,
    "pingId" TEXT NOT NULL,
    CONSTRAINT "Stats_pingId_fkey" FOREIGN KEY ("pingId") REFERENCES "Ping" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Icmp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seq" INTEGER NOT NULL,
    "ttl" INTEGER NOT NULL,
    "time" REAL NOT NULL,
    "pingId" TEXT NOT NULL,
    CONSTRAINT "Icmp_pingId_fkey" FOREIGN KEY ("pingId") REFERENCES "Ping" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_pingId_key" ON "Stats"("pingId");
