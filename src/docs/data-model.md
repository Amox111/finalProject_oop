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
| category | EventCategory (enum) | Core Domain | ประเภทกิจกรรม |
| status | EventStatus (enum) | Status/State | สถานะปัจจุบันของกิจกรรม |
| location | EventLocation (interface) | Core Domain | สถานที่จัดกิจกรรม |
| organizerId | string | Relation | รหัสผู้จัดงาน |
| organizerName | string | Core Domain | ชื่อผู้จัดงาน |
| startDate | string (ISO 8601) | Core Domain | วันเวลาเริ่มต้นกิจกรรม |
| endDate | string (ISO 8601) | Core Domain | วันเวลาสิ้นสุดกิจกรรม |
| maxParticipants | number | Configuration | จำนวนผู้เข้าร่วมสูงสุด |
| currentParticipants | number | Core Domain | จำนวนผู้ลงทะเบียนปัจจุบัน |
| registrationDeadline | string (ISO 8601) | Configuration | วันสุดท้ายของการลงทะเบียน |
| isPublic | boolean | Configuration | กิจกรรมเปิดสาธารณะหรือไม่ |
| tags | string[] | Core Domain | แท็กสำหรับค้นหา |
| createdAt | string (ISO 8601) | Timestamp | วันเวลาที่สร้าง |
| updatedAt | string (ISO 8601) | Timestamp | วันเวลาที่แก้ไขล่าสุด |

### Sub-interface: EventLocation

| Attribute | Type | Description |
|-----------|------|-------------|
| venue | string | ชื่อสถานที่ |
| address | string | ที่อยู่ |
| city | string | เมือง |
| country | string | ประเทศ |
| isOnline | boolean | จัดออนไลน์หรือไม่ |
| onlineUrl | string? | ลิงก์ออนไลน์ (ถ้ามี) |

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
| role | ParticipantRole (enum) | Core Domain | บทบาทในกิจกรรม |
| status | ParticipantStatus (enum) | Status/State | สถานะการเข้าร่วม |
| emergencyContact | EmergencyContact (interface) | Configuration | ผู้ติดต่อฉุกเฉิน |
| dietaryRequirements | string | Configuration | ข้อกำหนดด้านอาหาร |
| specialNeeds | string | Configuration | ความต้องการพิเศษ |
| registeredAt | string (ISO 8601) | Timestamp | วันเวลาที่ลงทะเบียน |
| confirmedAt | string \| null | Timestamp | วันเวลาที่ยืนยัน |
| checkedInAt | string \| null | Timestamp | วันเวลาที่เช็คอิน |
| notes | string | Core Domain | หมายเหตุเพิ่มเติม |
| createdAt | string (ISO 8601) | Timestamp | วันเวลาที่สร้าง |
| updatedAt | string (ISO 8601) | Timestamp | วันเวลาที่แก้ไขล่าสุด |

### Sub-interface: EmergencyContact

| Attribute | Type | Description |
|-----------|------|-------------|
| name | string | ชื่อผู้ติดต่อ |
| phone | string | เบอร์โทร |
| relationship | string | ความสัมพันธ์ |

---

## Relationships
- **Event** มี **Participant** ได้หลายคน (1 to many)
- **Participant** อ้างอิงถึง **Event** ผ่าน `eventId`
- เมื่อสร้าง Participant ระบบจะตรวจสอบและอัปเดต `currentParticipants` ใน Event อัตโนมัติ
- เมื่อลบ Participant ระบบจะลด `currentParticipants` ใน Event อัตโนมัติ

## Business Rules
1. `endDate` ต้องอยู่หลัง `startDate`
2. `registrationDeadline` ต้องอยู่ก่อน `startDate`
3. `currentParticipants` ต้องไม่เกิน `maxParticipants`
4. email ของ Participant ต้องไม่ซ้ำกันภายใน event เดียวกัน (ยกเว้น cancelled)
5. เมื่อ status เปลี่ยนเป็น confirmed ระบบบันทึก `confirmedAt` อัตโนมัติ
6. เมื่อ status เปลี่ยนเป็น attended ระบบบันทึก `checkedInAt` อัตโนมัติ
