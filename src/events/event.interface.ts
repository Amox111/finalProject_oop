export enum eventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ONGOING = 'ongoing',
  COMPLETED = 'compleated',
  CANCELLED = 'cancelled',
}

export enum eventCategory {
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop',
  SEMINAR = 'seminar',
  CONCERT = 'concert',
  SPORT = 'sport',
  OTHER = 'other',
}

export interface eventLocation {
  venue: string;
  address: string;
  city: string;
  country: string;
  isOnline: boolean;
  onlineUrl?: string;
}

export interface Event {
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