export enum participantStatus {
  REGISTERED = 'registered',
  CONFIRMED = 'confirmed',
  ATTENDED = 'attended',
  CANCELLED = 'cancelled',
  WAITLISTED = 'waitlisted',
}

export enum participantRole {
  ATTENDEE = 'attendee',
  SPEAKER = 'speaker',
  VOLUNTEER = 'volunteer',
  VIP = 'vip',
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