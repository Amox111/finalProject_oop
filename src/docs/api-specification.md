# API Specification — Event Management System

Base URL: `http://localhost:3000`

All responses follow the standard format:
```json
{
  "success": true | false,
  "message": "string",
  "data": <T> | null
}
```

---

## Events API

### GET /events
Get all events.
- **Response 200**: List of Event objects

### GET /events/:id
Get event by ID.
- **Params**: `id` — Event ID
- **Response 200**: Event object
- **Response 404**: Event not found

### POST /events
Create a new event.
- **Body**: `CreateEventDto`
- **Response 201**: Created Event object
- **Response 400**: Validation error

**Body example:**
```json
{
  "title": "Animonium 2026",
  "description": "Anime content and copyright exhibition",
  "category": "other",
  "location": {
    "venue": "Siam Paragon",
    "address": "991/1 Rama 1 Rd",
    "city": "Bangkok",
    "country": "Thailand",
    "isOnline": false,
    "onlineUrl": "https://zoom/xxxxx"
  },
  "organizerId": "DEX-001",
  "organizerName": "DEX",
  "startDate": "2026-06-01T09:00:00.000Z",
  "endDate": "2026-06-01T17:00:00.000Z",
  "maxParticipants": 500,
  "registrationDeadline": "2026-05-25T23:59:59.000Z",
  "isPublic": true,
  "tags": [
    "Anime",
    "J-pop"
  ]
}
```

### PUT /events/:id
Full update of an event (all fields required).
- **Params**: `id` — Event ID
- **Body**: `UpdateEventDto` (includes `status` field)
- **Response 200**: Updated Event object
- **Response 400**: Validation error
- **Response 404**: Event not found

### PATCH /events/:id
Partial update of an event.
- **Params**: `id` — Event ID
- **Body**: `PatchEventDto` (all fields optional)
- **Response 200**: Updated Event object
- **Response 400**: Validation error
- **Response 404**: Event not found

### DELETE /events/:id
Delete an event.
- **Params**: `id` — Event ID
- **Response 200**: Success message
- **Response 404**: Event not found

---

## Participants API

### GET /participants
Get all participants.
- **Response 200**: List of Participant objects

### GET /participants/by-event/:eventId
Get all participants of a specific event.
- **Params**: `eventId` — Event ID
- **Response 200**: List of Participant objects
- **Response 404**: Event not found

### GET /participants/:id
Get participant by ID.
- **Params**: `id` — Participant ID
- **Response 200**: Participant object
- **Response 404**: Participant not found

### POST /participants
Register a participant to an event.
- **Body**: `CreateParticipantDto`
- **Response 201**: Created Participant object
- **Response 400**: Validation error, event full, or duplicate email
- **Response 404**: Event not found

**Body example:**
```json
{
  "eventId": "event-001",
  "firstName": "Somchai",
  "lastName": "Meengen",
  "email": "somchai@email.com",
  "phone": "+66884455669",
  "role": "attendee",
  "emergencyContact": {
    "name": "John Doe",
    "phone": "+66884455669",
    "relationship": "Spouse"
  },
  "dietaryRequirements": "Vegetarian",
  "specialNeeds": "Wheelchair access needed",
  "notes": "Looking forward to the keynote"
}
```

### PUT /participants/:id
Full update of a participant.
- **Params**: `id` — Participant ID
- **Body**: `UpdateParticipantDto` (includes `status` field)
- **Response 200**: Updated Participant object
- **Response 400**: Validation error
- **Response 404**: Participant not found

### PATCH /participants/:id
Partial update of a participant.
- **Params**: `id` — Participant ID
- **Body**: `PatchParticipantDto` (all fields optional)
- **Response 200**: Updated Participant object
- **Response 400**: Validation error
- **Response 404**: Participant not found

### DELETE /participants/:id
Remove a participant.
- **Params**: `id` — Participant ID
- **Response 200**: Success message
- **Response 404**: Participant not found

---

## Enums Reference

### EventStatus
| Value | Description |
|-------|-------------|
| draft | Event created but not yet published |
| published | Event open for registration |
| ongoing | Event is currently happening |
| compleated | Event has ended |
| cancelled | Event was cancelled |

### EventCategory
| Value |
|-------|
| conference |
| workshop |
| seminar |
| concert |
| sport |
| other |

### ParticipantStatus
| Value | Description |
|-------|-------------|
| registered | Participant has registered |
| confirmed | Registration confirmed |
| attended | Participant checked in |
| cancelled | Registration cancelled |
| waitlisted | On waiting list |

### ParticipantRole
| Value |
|-------|
| attendee |
| speaker |
| volunteer |
| vip |
