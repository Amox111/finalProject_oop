export enum eventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum eventCategory {
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  CONCERT = 'CONCERT',
  SPORT = 'SPORT',
  OTHER = 'OTHER',
}

export interface eventLocation {
  venue: string;
  address: string;
  city: string;
  country: string;
  isOnline: boolean;
  onlineUrl?: string;
}

export interface event {
  id: string;
  title: string;
  description: string;
  category: eventCategory;
  status: eventStatus;
  location: eventLocation;
  organizerId: string;
  organizerName: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  registrationDeadline: string;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}