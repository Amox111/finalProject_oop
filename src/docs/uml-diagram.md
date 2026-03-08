# UML Diagram - Event Management System

```mermaid
classDiagram

  class Event {
    +string id
    +string title
    +string description
    +EventCategory category
    +EventStatus status
    +EventLocation location
    +string organizerId
    +string organizerName
    +string startDate
    +string endDate
    +number maxParticipants
    +number currentParticipants
    +string registrationDeadline
    +boolean isPublic
    +string[] tags
    +string createdAt
    +string updatedAt
  }

  class EventLocation {
    +string venue
    +string address
    +string city
    +string country
    +boolean isOnline
    +string? onlineUrl
  }

  class EventStatus {
    <<enumeration>>
    draft
    published
    ongoing
    completed
    cancelled
  }

  class EventCategory {
    <<enumeration>>
    conference
    workshop
    seminar
    concert
    sport
    other
  }

  class Participant {
    +string id
    +string eventId
    +string firstName
    +string lastName
    +string email
    +string phone
    +ParticipantRole role
    +ParticipantStatus status
    +EmergencyContact emergencyContact
    +string dietaryRequirements
    +string specialNeeds
    +string registeredAt
    +string|null confirmedAt
    +string|null checkedInAt
    +string notes
    +string createdAt
    +string updatedAt
  }

  class EmergencyContact {
    +string name
    +string phone
    +string relationship
  }

  class ParticipantStatus {
    <<enumeration>>
    registered
    confirmed
    attended
    cancelled
    waitlisted
  }

  class ParticipantRole {
    <<enumeration>>
    attendee
    speaker
    volunteer
    vip
  }

  Event "1" *-- "1" EventLocation : location
  Event --> EventStatus : status
  Event --> EventCategory : category
  Participant "many" --> "1" Event : registers for
  Participant --> ParticipantStatus : status
  Participant --> ParticipantRole : role
  Participant "1" *-- "1" EmergencyContact : emergencyContact
```

## ความสัมพันธ์

| ความสัมพันธ์ | ประเภท | คำอธิบาย |
|-------------|--------|---------|
| Event → EventLocation | Composition (★) | Event มี Location 1 อัน ถ้าลบ Event ข้อมูล Location หายด้วย |
| Event → EventStatus | Dependency | Event ใช้ค่าจาก enum EventStatus |
| Event → EventCategory | Dependency | Event ใช้ค่าจาก enum EventCategory |
| Participant → Event | Association | Participant หลายคนลงทะเบียนใน Event 1 งาน |
| Participant → EmergencyContact | Composition (★) | Participant มี EmergencyContact 1 อัน |
| Participant → ParticipantStatus | Dependency | Participant ใช้ค่าจาก enum ParticipantStatus |
| Participant → ParticipantRole | Dependency | Participant ใช้ค่าจาก enum ParticipantRole |