/*
  Warnings:

  - You are about to drop the column `time` on the `Stats` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transmitted" INTEGER NOT NULL,
    "received" INTEGER NOT NULL,
    "pingId" TEXT NOT NULL,
    CONSTRAINT "Stats_pingId_fkey" FOREIGN KEY ("pingId") REFERENCES "Ping" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stats" ("id", "pingId", "received", "transmitted") SELECT "id", "pingId", "received", "transmitted" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
CREATE UNIQUE INDEX "Stats_pingId_key" ON "Stats"("pingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
