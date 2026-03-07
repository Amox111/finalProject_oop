export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ONGOING = 'ongoing',
  COMPLETED = 'compleated',
  CANCELLED = 'cancelled',
}

export enum EventCategory {
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop',
  SEMINAR = 'seminar',
  CONCERT = 'concert',
  SPORT = 'sport',
  OTHER = 'other',
}

export interface EventLocation {
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
  category: EventCategory;
  status: EventStatus;
  location: EventLocation;
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