-- CreateTable
CREATE TABLE "Motor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manufacturer" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "impulseClass" TEXT NOT NULL,
    "totalImpulseNs" REAL NOT NULL,
    "avgThrustN" REAL NOT NULL,
    "maxThrustN" REAL NOT NULL,
    "burnTimeS" REAL NOT NULL,
    "propellantMassG" REAL NOT NULL,
    "totalMassG" REAL NOT NULL,
    "diameter" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Motor_impulseClass_idx" ON "Motor"("impulseClass");

-- CreateIndex
CREATE UNIQUE INDEX "Motor_manufacturer_designation_key" ON "Motor"("manufacturer", "designation");
