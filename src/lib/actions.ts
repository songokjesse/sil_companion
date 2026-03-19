"use server";

import { prisma } from "./db";

export async function getDashboardData(houseName: string = "Maple House") {
  const house = await prisma.house.findFirst({
    where: { name: houseName },
    include: {
      participants: {
        include: {
          medications: true,
          routines: true,
          appointments: {
            where: {
               dateTime: {
                  gte: new Date(new Date().setHours(0, 0, 0, 0)),
                  lte: new Date(new Date().setHours(23, 59, 59, 999))
               }
            }
          },
          alerts: true,
        }
      }
    }
  });

  if (!house) return null;

  // Flatten tasks for timeline
  const timelineTasks = house.participants.flatMap(p => [
    ...p.medications.map(m => ({
      id: m.id,
      participant: p.fullName,
      type: "Medication",
      task: m.name + " " + m.dosage,
      due: m.timeDue,
      status: "Due Now", // Logical check would go here
      critical: m.isCritical
    })),
    ...p.routines.map(r => ({
      id: r.id,
      participant: p.fullName,
      type: "Routine",
      task: r.title,
      due: r.timeDue || "TBD",
      status: "Upcoming",
      critical: false
    }))
  ]).sort((a,b) => (a.due || "").localeCompare(b.due || ""));

  // Alerts
  const alerts = house.participants.flatMap(p => p.alerts.map(a => ({
    id: a.id,
    participant: p.fullName,
    message: a.message,
    severity: a.severity
  })));

  // Appointments
  const appointments = house.participants.flatMap(p => p.appointments.map(appt => ({
     id: appt.id,
     participant: p.fullName,
     title: appt.title,
     time: appt.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
     leave: appt.leaveTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "N/A",
     location: appt.location || "TBD",
     prep: appt.prepNotes || "None",
     type: appt.type || "Other"
  })));

  return {
    houseName: house.name,
    timelineTasks,
    alerts,
    appointments,
    metrics: {
      dueNow: timelineTasks.filter(t => t.status === "Due Now").length.toString(),
      upcomingAppts: appointments.length.toString(),
      overdue: "0",
      completed: "0" // Would fetch from TaskLog
    }
  };
}

export async function getParticipantData(id: string) {
  const participant = await prisma.participant.findUnique({
    where: { id },
    include: {
      medications: true,
      routines: true,
      appointments: true,
      alerts: true,
      house: true
    }
  });

  if (!participant) return null;

  const timelineTasks = [
    ...participant.medications.map(m => ({
      id: m.id,
      participant: participant.fullName,
      type: "Medication",
      task: m.name + " " + m.dosage,
      due: m.timeDue,
      status: "Due Now",
      critical: m.isCritical
    })),
    ...participant.routines.map(r => ({
      id: r.id,
      participant: participant.fullName,
      type: "Routine",
      task: r.title,
      due: r.timeDue || "TBD",
      status: "Upcoming",
      critical: false
    }))
  ].sort((a,b) => (a.due || "").localeCompare(b.due || ""));

  return {
    participant,
    timelineTasks,
    appointments: participant.appointments.map(appt => ({
       id: appt.id,
       participant: participant.fullName,
       title: appt.title,
       time: appt.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
       leave: appt.leaveTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "N/A",
       location: appt.location || "TBD",
       prep: appt.prepNotes || "None",
       type: appt.type || "Other"
    }))
  };
}

export async function getParticipantsList(houseName: string = "Maple House") {
  const house = await prisma.house.findFirst({
    where: { name: houseName },
    include: {
      participants: {
        select: {
          id: true,
          fullName: true,
          preferredName: true,
          photoUrl: true,
          houseId: true,
          // Explicitly NOT selecting dob, medicalAlerts, etc. for list-level privacy
        }
      }
    }
  });

  if (!house) return [];
  return house.participants;
}

export async function getHouses() {
  const houses = await prisma.house.findMany({
    select: {
      id: true,
      name: true
    }
  });
  return houses;
}

export async function createParticipant(data: {
  fullName: string;
  preferredName?: string;
  dob: Date;
  houseId: string;
}) {
  // In a Minimal Data model, we only capture the essentials
  // required for the localized companion app to function.
  const newParticipant = await prisma.participant.create({
    data: {
      fullName: data.fullName,
      preferredName: data.preferredName,
      dob: data.dob,
      houseId: data.houseId,
      // Leaving medicalAlerts blank intentionally to enforce EHR sync policy
    }
  });
  
  return newParticipant;
}

export async function createHouse(name: string) {
  const org = await prisma.organization.findFirst();
  if (!org) throw new Error("No organization found to attach house");

  const newHouse = await prisma.house.create({
    data: {
      name,
      organizationId: org.id
    }
  });

  return newHouse;
}
