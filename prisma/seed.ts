import { PrismaClient, Role, Severity, ApptStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.taskLog.deleteMany({});
  await prisma.routine.deleteMany({});
  await prisma.medication.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.participantAlert.deleteMany({});
  await prisma.participant.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.house.deleteMany({});
  await prisma.organization.deleteMany({});

  // 1. Create Organization
  const org = await prisma.organization.create({
    data: { name: "SafeCare SIL Services" },
  });

  // 2. Create House
  const house = await prisma.house.create({
    data: {
      name: "Maple House",
      organizationId: org.id,
    },
  });

  // 3. Create Staff Users
  const staff = await prisma.user.create({
    data: {
      name: "John Staff",
      email: "john@safecare.com",
      role: Role.SUPPORT_WORKER,
      organizationId: org.id,
      houses: { connect: { id: house.id } },
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@safecare.com",
      role: Role.ADMIN,
      organizationId: org.id,
    },
  });

  // 4. Create Participants
  const participant1 = await prisma.participant.create({
    data: {
      fullName: "Liam Chen",
      preferredName: "Liam",
      dob: new Date("1992-05-12"),
      houseId: house.id,
      medicalAlerts: "Severe Nut Allergy, Uses Picture Board",
    },
  });

  const participant2 = await prisma.participant.create({
    data: {
      fullName: "Sarah Jenkins",
      preferredName: "Sarah",
      dob: new Date("1985-08-20"),
      houseId: house.id,
      medicalAlerts: "Mobility Assistance Required",
    },
  });

  // 5. Create Alerts
  await prisma.participantAlert.createMany({
    data: [
      {
        participantId: participant1.id,
        message: "Fasting Required for blood tests at 2:00 PM.",
        severity: Severity.CRITICAL,
      },
      {
        participantId: participant2.id,
        message: "Wheelchair ramp issue - use front entrance.",
        severity: Severity.MEDIUM,
      },
    ],
  });

  // 6. Create Medications
  await prisma.medication.createMany({
    data: [
      {
        participantId: participant1.id,
        name: "Paracetamol",
        dosage: "500mg",
        instructions: "Take with water after food",
        timeDue: "08:00",
        isCritical: true,
      },
      {
        participantId: participant2.id,
        name: "Metformin",
        dosage: "850mg",
        instructions: "Twice daily with meals",
        timeDue: "09:30",
        isCritical: false,
      },
    ],
  });

  // 7. Create Routines
  await prisma.routine.create({
    data: {
      participantId: participant2.id,
      title: "Bowel Chart Entry",
      description: "Complete daily bowel chart record",
      frequency: "DAILY",
      timeDue: "09:15",
    },
  });

  // 8. Create Appointments
  await prisma.appointment.create({
    data: {
      participantId: participant1.id,
      title: "Dialysis Visit",
      type: "Medical",
      providerName: "Mercy Health Hospital",
      location: "Mercy Health Hospital",
      dateTime: new Date(new Date().setHours(14, 0, 0, 0)),
      leaveTime: new Date(new Date().setHours(13, 15, 0, 0)),
      transportReq: true,
      transportNotes: "Wheelchair Accessible Van",
      escortReq: true,
      prepNotes: "Ensure folder is packed & med list is current",
      status: ApptStatus.UPCOMING,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
