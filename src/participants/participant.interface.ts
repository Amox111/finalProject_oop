export enum participantStatus {
  REGISTERED = 'REGISTERED',
  CONFIRMED = 'CONFIRMED',
  ATTENDED = 'ATTENDED',
  CANCELLED = 'CANCELLED',
  WAITLISTED = 'WAITLISTED',
}

export enum participantRole {
  ATTENDEE = 'ATTENDEE',
  SPEAKER = 'SPEAKER',
  VOLUNTEER = 'VOLUNTEER',
  VIP = 'VIP',
}

export interface participant {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: participantRole;
  status: participantStatus;
  dietaryRequirements: string;
  specialNeeds: string;
  registeredAt: string;
  confirmedAt: string | null;
  checkedInAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}