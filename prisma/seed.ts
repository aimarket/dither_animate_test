import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.telemetryFrame.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.rocket.deleteMany();
  await prisma.motor.deleteMany();
  await prisma.user.deleteMany();

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'testuser',
      password: hashedPassword,
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create motors database
  const motorsData = [
    { manufacturer: 'Cesaroni', designation: 'L850', impulseClass: 'L', totalImpulseNs: 1897, avgThrustN: 850, maxThrustN: 1050, burnTimeS: 2.23, propellantMassG: 980, totalMassG: 1456, diameter: 75, length: 469, type: 'reloadable' },
    { manufacturer: 'Cesaroni', designation: 'M1419', impulseClass: 'M', totalImpulseNs: 4242, avgThrustN: 1419, maxThrustN: 1650, burnTimeS: 2.99, propellantMassG: 2145, totalMassG: 3156, diameter: 98, length: 642, type: 'reloadable' },
    { manufacturer: 'Cesaroni', designation: 'N2501', impulseClass: 'N', totalImpulseNs: 8456, avgThrustN: 2501, maxThrustN: 2850, burnTimeS: 3.38, propellantMassG: 4234, totalMassG: 5987, diameter: 98, length: 1024, type: 'reloadable' },
    { manufacturer: 'AeroTech', designation: 'L1520', impulseClass: 'L', totalImpulseNs: 2048, avgThrustN: 1520, maxThrustN: 1750, burnTimeS: 1.35, propellantMassG: 1120, totalMassG: 1680, diameter: 75, length: 512, type: 'single-use' },
    { manufacturer: 'AeroTech', designation: 'M1297', impulseClass: 'M', totalImpulseNs: 3896, avgThrustN: 1297, maxThrustN: 1450, burnTimeS: 3.0, propellantMassG: 1980, totalMassG: 2856, diameter: 75, length: 756, type: 'single-use' },
    { manufacturer: 'CTI', designation: 'L935', impulseClass: 'L', totalImpulseNs: 2155, avgThrustN: 935, maxThrustN: 1100, burnTimeS: 2.3, propellantMassG: 1045, totalMassG: 1580, diameter: 75, length: 485, type: 'reloadable' },
    { manufacturer: 'CTI', designation: 'M1670', impulseClass: 'M', totalImpulseNs: 4998, avgThrustN: 1670, maxThrustN: 1900, burnTimeS: 2.99, propellantMassG: 2456, totalMassG: 3654, diameter: 98, length: 680, type: 'reloadable' },
    { manufacturer: 'Loki', designation: 'L1115', impulseClass: 'L', totalImpulseNs: 2010, avgThrustN: 1115, maxThrustN: 1300, burnTimeS: 1.8, propellantMassG: 980, totalMassG: 1425, diameter: 75, length: 450, type: 'single-use' },
  ];

  const motors = [];
  for (const motorData of motorsData) {
    const motor = await prisma.motor.create({ data: motorData });
    motors.push(motor);
  }

  console.log(`✅ Created ${motors.length} motors`);

  // Create rockets
  const rocketsData = [
    { name: 'Alpha Strike', diameterMm: 98, lengthMm: 1524, dryMassG: 2400, description: 'High-power rocket with dual deployment system' },
    { name: 'Beta Racer', diameterMm: 75, lengthMm: 1320, dryMassG: 1850, description: 'Speed-optimized rocket for altitude records' },
    { name: 'Gamma Explorer', diameterMm: 98, lengthMm: 1680, dryMassG: 2850, description: 'Research platform with payload bay' },
    { name: 'Delta Prototype', diameterMm: 75, lengthMm: 1200, dryMassG: 1650, description: 'Experimental composite airframe design' },
    { name: 'Epsilon Heavy', diameterMm: 152, lengthMm: 2100, dryMassG: 5400, description: 'Large-scale dual deploy rocket' },
  ];

  const rockets = [];
  for (const rocketData of rocketsData) {
    const rocket = await prisma.rocket.create({
      data: { ...rocketData, userId: user.id },
    });
    rockets.push(rocket);
  }

  console.log(`✅ Created ${rockets.length} rockets`);

  // Create flights with varied data
  const flightsData = [
    {
      rocketId: rockets[0].id,
      flightName: 'Alpha Strike - L850 Test',
      flightDate: new Date('2025-09-15'),
      location: 'Lucerne Valley, CA',
      motorDesignation: 'L850',
      motorManufacturer: 'Cesaroni',
      recoveryType: 'Dual Deploy',
      notes: 'Perfect flight, successful dual deployment at 500ft',
      maxAltitudeM: 2845.3,
      maxVelocityMs: 245.7,
      maxAccelerationG: 18.4,
      apogeeTimeS: 18.2,
      flightDurationS: 142.5,
    },
    {
      rocketId: rockets[0].id,
      flightName: 'Alpha Strike - M1419 High Alt',
      flightDate: new Date('2025-09-20'),
      location: 'Black Rock Desert, NV',
      motorDesignation: 'M1419',
      motorManufacturer: 'Cesaroni',
      recoveryType: 'Dual Deploy',
      notes: 'High altitude attempt - successful, perfect recovery',
      maxAltitudeM: 4127.8,
      maxVelocityMs: 312.4,
      maxAccelerationG: 24.1,
      apogeeTimeS: 22.7,
      flightDurationS: 185.3,
    },
    {
      rocketId: rockets[1].id,
      flightName: 'Beta Racer - L1520 Speed Run',
      flightDate: new Date('2025-09-25'),
      location: 'Mojave Desert, CA',
      motorDesignation: 'L1520',
      motorManufacturer: 'AeroTech',
      recoveryType: 'Single Deploy',
      notes: 'Speed record attempt, slight weathercocking',
      maxAltitudeM: 1980.5,
      maxVelocityMs: 385.2,
      maxAccelerationG: 28.7,
      apogeeTimeS: 12.4,
      flightDurationS: 98.6,
    },
    {
      rocketId: rockets[2].id,
      flightName: 'Gamma Explorer - Payload Test',
      flightDate: new Date('2025-10-01'),
      location: 'Lucerne Valley, CA',
      motorDesignation: 'M1297',
      motorManufacturer: 'AeroTech',
      recoveryType: 'Dual Deploy',
      notes: 'Carried 2kg scientific payload, all systems nominal',
      maxAltitudeM: 3245.6,
      maxVelocityMs: 198.3,
      maxAccelerationG: 15.2,
      apogeeTimeS: 24.8,
      flightDurationS: 165.4,
    },
    {
      rocketId: rockets[3].id,
      flightName: 'Delta Proto - Maiden Flight',
      flightDate: new Date('2025-10-05'),
      location: 'Lucerne Valley, CA',
      motorDesignation: 'L935',
      motorManufacturer: 'CTI',
      recoveryType: 'Dual Deploy',
      notes: 'First flight of new design, minor fin flutter observed',
      maxAltitudeM: 2567.3,
      maxVelocityMs: 215.8,
      maxAccelerationG: 19.3,
      apogeeTimeS: 16.9,
      flightDurationS: 128.7,
    },
    {
      rocketId: rockets[4].id,
      flightName: 'Epsilon Heavy - Certification',
      flightDate: new Date('2025-10-10'),
      location: 'Black Rock Desert, NV',
      motorDesignation: 'N2501',
      motorManufacturer: 'Cesaroni',
      recoveryType: 'Dual Deploy',
      notes: 'L3 certification flight, textbook perfect',
      maxAltitudeM: 5234.9,
      maxVelocityMs: 285.6,
      maxAccelerationG: 22.4,
      apogeeTimeS: 28.3,
      flightDurationS: 215.6,
    },
  ];

  const flights = [];
  for (const flightData of flightsData) {
    const flight = await prisma.flight.create({
      data: { ...flightData, userId: user.id },
    });
    flights.push(flight);
    console.log(`✅ Created flight: ${flight.flightName}`);
  }

  // Create telemetry data for the first 3 flights
  for (let flightIdx = 0; flightIdx < 3; flightIdx++) {
    const flight = flights[flightIdx];
    const startTime = new Date(flight.flightDate);
    const telemetryFrames = [];

    for (let i = 0; i < 200; i++) {
      const relativeTimeMs = i * 100; // 100ms intervals (10Hz for demo)
      const t = relativeTimeMs / 1000; // time in seconds

      let altitude = 0;
      let velocity = 0;
      let accelZ = 0;
      let flightState = 'IDLE';

      if (t < 2) {
        flightState = 'IDLE';
        altitude = 0;
        velocity = 0;
        accelZ = 1;
      } else if (t < 4) {
        flightState = 'BOOST';
        const boostTime = t - 2;
        accelZ = 20 + (Math.random() - 0.5) * 3;
        velocity = boostTime * 80;
        altitude = Math.pow(boostTime, 2) * 40;
      } else if (t < (flight.apogeeTimeS || 18)) {
        flightState = 'COAST';
        const coastTime = t - 4;
        accelZ = -1 + (Math.random() - 0.5) * 0.5;
        velocity = Math.max(0, 160 - coastTime * 12);
        altitude = 320 + 160 * coastTime - 0.5 * 9.81 * Math.pow(coastTime, 2) * 5;
      } else {
        flightState = 'DESCENT';
        accelZ = -0.5;
        velocity = -15;
        altitude = Math.max(0, (flight.maxAltitudeM || 2000) - (t - (flight.apogeeTimeS || 18)) * 15);
      }

      telemetryFrames.push({
        flightId: flight.id,
        timestamp: new Date(startTime.getTime() + relativeTimeMs),
        relativeTimeMs,
        accelXG: (Math.random() - 0.5) * 0.3,
        accelYG: (Math.random() - 0.5) * 0.3,
        accelZG: accelZ,
        gyroXDps: (Math.random() - 0.5) * 15,
        gyroYDps: (Math.random() - 0.5) * 15,
        gyroZDps: (Math.random() - 0.5) * 8,
        pressurePa: 101325 - altitude * 12,
        temperatureC: 20 - altitude * 0.0065,
        gpsLatitude: 34.8 + (Math.random() - 0.5) * 0.001,
        gpsLongitude: -116.4 + (Math.random() - 0.5) * 0.001,
        gpsAltitudeM: altitude + (Math.random() - 0.5) * 5,
        gpsSatellites: Math.floor(8 + Math.random() * 4),
        altitudeAglM: altitude,
        verticalVelocityMs: velocity,
        batteryVoltageV: 11.1 - (t * 0.001),
        flightState,
      });
    }

    await prisma.telemetryFrame.createMany({ data: telemetryFrames });
    console.log(`✅ Created ${telemetryFrames.length} telemetry frames for ${flight.flightName}`);
  }

  console.log('🎉 Seeding complete!');
  console.log(`
📊 Summary:
- 1 user created (test@example.com / password123)
- ${motors.length} motors in database
- ${rockets.length} rockets created
- ${flights.length} flights created
- Telemetry data for 3 flights
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
