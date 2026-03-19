-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPPORT_WORKER', 'TEAM_LEADER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ApptStatus" AS ENUM ('UPCOMING', 'ATTENDED', 'CANCELLED', 'RESCHEDULED');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SUPPORT_WORKER',
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "preferredName" TEXT,
    "photoUrl" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "houseId" TEXT NOT NULL,
    "medicalAlerts" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantAlert" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "severity" "Severity" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "providerName" TEXT,
    "location" TEXT,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "leaveTime" TIMESTAMP(3),
    "transportReq" BOOLEAN NOT NULL DEFAULT false,
    "transportNotes" TEXT,
    "escortReq" BOOLEAN NOT NULL DEFAULT false,
    "prepNotes" TEXT,
    "status" "ApptStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "instructions" TEXT,
    "timeDue" TEXT NOT NULL,
    "isCritical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "frequency" TEXT NOT NULL,
    "timeDue" TEXT,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "medicationId" TEXT,
    "routineId" TEXT,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HouseToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_HouseToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_HouseToUser_B_index" ON "_HouseToUser"("B");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantAlert" ADD CONSTRAINT "ParticipantAlert_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLog" ADD CONSTRAINT "TaskLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLog" ADD CONSTRAINT "TaskLog_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLog" ADD CONSTRAINT "TaskLog_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToUser" ADD CONSTRAINT "_HouseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToUser" ADD CONSTRAINT "_HouseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
