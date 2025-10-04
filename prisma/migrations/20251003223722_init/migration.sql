-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Rocket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diameterMm" REAL NOT NULL,
    "lengthMm" REAL NOT NULL,
    "dryMassG" REAL NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Rocket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "rocketId" TEXT,
    "flightName" TEXT NOT NULL,
    "flightDate" DATETIME NOT NULL,
    "location" TEXT,
    "motorDesignation" TEXT,
    "motorManufacturer" TEXT,
    "recoveryType" TEXT,
    "notes" TEXT,
    "maxAltitudeM" REAL,
    "maxVelocityMs" REAL,
    "maxAccelerationG" REAL,
    "apogeeTimeS" REAL,
    "flightDurationS" REAL,
    "railDepartureVelMs" REAL,
    "rawFileSizeBytes" INTEGER,
    "sampleRateHz" INTEGER,
    "telemetryStartTime" DATETIME,
    "telemetryEndTime" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" DATETIME,
    CONSTRAINT "Flight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Flight_rocketId_fkey" FOREIGN KEY ("rocketId") REFERENCES "Rocket" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TelemetryFrame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "relativeTimeMs" INTEGER NOT NULL,
    "accelXG" REAL,
    "accelYG" REAL,
    "accelZG" REAL,
    "gyroXDps" REAL,
    "gyroYDps" REAL,
    "gyroZDps" REAL,
    "magXUt" REAL,
    "magYUt" REAL,
    "magZUt" REAL,
    "pressurePa" REAL,
    "temperatureC" REAL,
    "gpsLatitude" REAL,
    "gpsLongitude" REAL,
    "gpsAltitudeM" REAL,
    "gpsSpeedMs" REAL,
    "gpsSatellites" INTEGER,
    "altitudeAglM" REAL,
    "verticalVelocityMs" REAL,
    "orientationW" REAL,
    "orientationX" REAL,
    "orientationY" REAL,
    "orientationZ" REAL,
    "pyroContinuity1" BOOLEAN,
    "pyroContinuity2" BOOLEAN,
    "batteryVoltageV" REAL,
    "flightState" TEXT,
    CONSTRAINT "TelemetryFrame_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Rocket_userId_idx" ON "Rocket"("userId");

-- CreateIndex
CREATE INDEX "Flight_userId_flightDate_idx" ON "Flight"("userId", "flightDate");

-- CreateIndex
CREATE INDEX "Flight_rocketId_idx" ON "Flight"("rocketId");

-- CreateIndex
CREATE INDEX "TelemetryFrame_flightId_relativeTimeMs_idx" ON "TelemetryFrame"("flightId", "relativeTimeMs");
