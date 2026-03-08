# Data Model Documentation - Event Management System

## Overview
ระบบจัดกิจกรรมและผู้เข้าร่วม ประกอบด้วย 2 Core Models:
- **Event** - กิจกรรม
- **Participant** - ผู้เข้าร่วมกิจกรรม

---

## Model: Event

| Attribute | Type | Category | Description |
|-----------|------|----------|-------------|
| id | string | Identity | รหัสกิจกรรม (auto-generated) |
| title | string | Core Domain | ชื่อกิจกรรม |
| description | string | Core Domain | รายละเอียดกิจกรรม |
| category | EventCategory | Core Domain | ประเภทกิจกรรม |
| status | EventStatus | Status/State | สถานะปัจจุบัน (system กำหนด) |
| location | EventLocation | Core Domain | สถานที่จัดกิจกรรม |
| organizerId | string | Relation | รหัสผู้จัดงาน |
| organizerName | string | Core Domain | ชื่อผู้จัดงาน |
| startDate | string (ISO 8601) | Core Domain | วันเวลาเริ่มต้น |
| endDate | string (ISO 8601) | Core Domain | วันเวลาสิ้นสุด |
| maxParticipants | number | Configuration | จำนวนผู้เข้าร่วมสูงสุด |
| currentParticipants | number | Core Domain | จำนวนผู้ลงทะเบียนปัจจุบัน (system นับเอง) |
| registrationDeadline | string (ISO 8601) | Configuration | วันสุดท้ายลงทะเบียน |
| isPublic | boolean | Configuration | เปิดสาธารณะหรือไม่ |
| tags | string[] | Core Domain | แท็กสำหรับค้นหา |
| createdAt | string (ISO 8601) | Timestamp | วันเวลาที่สร้าง (system กำหนด) |
| updatedAt | string (ISO 8601) | Timestamp | วันเวลาที่แก้ไขล่าสุด (system กำหนด) |

### Sub-interface: EventLocation

| Attribute | Type | Description |
|-----------|------|-------------|
| venue | string | ชื่อสถานที่ |
| address | string | ที่อยู่ |
| city | string | เมือง |
| country | string | ประเทศ |
| isOnline | boolean | จัดออนไลน์หรือไม่ |
| onlineUrl | string? | ลิงก์ออนไลน์ (optional) |

### Enum: EventStatus

| Value | ความหมาย |
|-------|---------|
| draft | สร้างแล้วแต่ยังไม่เปิด |
| published | เปิดให้ลงทะเบียน |
| ongoing | กำลังจัดงาน |
| completed | จบแล้ว |
| cancelled | ยกเลิก |

### Enum: EventCategory

| Value |
|-------|
| conference |
| workshop |
| seminar |
| concert |
| sport |
| other |

---

## Model: Participant

| Attribute | Type | Category | Description |
|-----------|------|----------|-------------|
| id | string | Identity | รหัสผู้เข้าร่วม (auto-generated) |
| eventId | string | Relation | รหัสกิจกรรมที่เข้าร่วม |
| firstName | string | Core Domain | ชื่อ |
| lastName | string | Core Domain | นามสกุล |
| email | string | Core Domain | อีเมล (unique ต่อ event) |
| phone | string | Core Domain | เบอร์โทรศัพท์ |
| role | ParticipantRole | Core Domain | บทบาทในกิจกรรม |
| status | ParticipantStatus | Status/State | สถานะการเข้าร่วม (system กำหนด) |
| emergencyContact | EmergencyContact | Configuration | ผู้ติดต่อฉุกเฉิน |
| dietaryRequirements | string | Configuration | ข้อกำหนดด้านอาหาร |
| specialNeeds | string | Configuration | ความต้องการพิเศษ |
| registeredAt | string (ISO 8601) | Timestamp | วันเวลาที่ลงทะเบียน (system กำหนด) |
| confirmedAt | string \| null | Timestamp | วันเวลาที่ยืนยัน (auto-set ตอน status → confirmed) |
| checkedInAt | string \| null | Timestamp | วันเวลาที่เช็คอิน (auto-set ตอน status → attended) |
| notes | string | Core Domain | หมายเหตุเพิ่มเติม |
| createdAt | string (ISO 8601) | Timestamp | วันเวลาที่สร้าง (system กำหนด) |
| updatedAt | string (ISO 8601) | Timestamp | วันเวลาที่แก้ไขล่าสุด (system กำหนด) |

### Sub-interface: EmergencyContact

| Attribute | Type | Description |
|-----------|------|-------------|
| name | string | ชื่อผู้ติดต่อ |
| phone | string | เบอร์โทร |
| relationship | string | ความสัมพันธ์ |

### Enum: ParticipantStatus

| Value | ความหมาย |
|-------|---------|
| registered | เพิ่งลงทะเบียน |
| confirmed | ยืนยันแล้ว |
| attended | เข้างานแล้ว |
| cancelled | ยกเลิก |
| waitlisted | รอคิว |

### Enum: ParticipantRole

| Value |
|-------|
| attendee |
| speaker |
| volunteer |
| vip |

---

## Relationships
- **Event** มี **Participant** ได้หลายคน (1 to many)
- **Participant** อ้างอิงถึง **Event** ผ่าน `eventId`

## Business Rules
1. `endDate` ต้องอยู่หลัง `startDate`
2. `registrationDeadline` ต้องอยู่ก่อน `startDate`
3. `currentParticipants` ต้องไม่เกิน `maxParticipants`
4. email ของ Participant ต้องไม่ซ้ำกันใน event เดียวกัน (ยกเว้น cancelled)
5. status เริ่มต้นของ Event คือ `draft` เสมอ
6. status เริ่มต้นของ Participant คือ `registered` เสมอ
7. เมื่อ status → `confirmed` ระบบบันทึก `confirmedAt` อัตโนมัติ
8. เมื่อ status → `attended` ระบบบันทึก `checkedInAt` อัตโนมัติ
9. ลบ Participant → `currentParticipants` ลดลง 1 อัตโนมัติ
