export enum ParticipantStatus {
  REGISTERED = 'registered',
  CONFIRMED = 'confirmed',
  ATTENDED = 'attended',
  CANCELLED = 'cancelled',
  WAITLISTED = 'waitlisted',
}

export enum ParticipantRole {
  ATTENDEE = 'attendee',
  SPEAKER = 'speaker',
  VOLUNTEER = 'volunteer',
  VIP = 'vip',
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Participant {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  emergencyContact: EmergencyContact;
  dietaryRequirements: string;
  specialNeeds: string;
  registeredAt: string;
  confirmedAt: string | null;   
  checkedInAt: string | null; 
  notes: string;
  createdAt: string;
  updatedAt: string;
}