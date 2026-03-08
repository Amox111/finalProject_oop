import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Participant, ParticipantStatus, EmergencyContact } from './participant.interface';
import { CreateParticipantDto, UpdateParticipantDto, PatchParticipantDto, EmergencyContactDto } from './participant.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class ParticipantsService {
    private participants: Participant[] = [];
    private idCounter = 1;

    constructor(private readonly eventsService: EventsService) {}

    private generateId(): string {
        return `participant-${String(this.idCounter++).padStart(3, '0')}`;
    }

    private now(): string {
        return new Date().toISOString();
    }

    private mapEmergencyContact(dto: EmergencyContactDto): EmergencyContact {
        return { name: dto.name, phone: dto.phone, relationship: dto.relationship };
    }

    findAll(): Participant[] {
        return this.participants;
    }

    findByEventId(eventId: string): Participant[] {
        this.eventsService.findById(eventId); 
        return this.participants.filter((p) => p.eventId === eventId);
    }

    findById(id: string): Participant {
        const participant = this.participants.find((p) => p.id === id);
        if (!participant) {
            throw new NotFoundException(`Participant with id "${id}" not found`);
        }
        return participant;
    }

    create(dto: CreateParticipantDto): Participant {
    this.eventsService.incrementParticipants(dto.eventId);

    const isDuplicate = this.participants.some(
    (p) =>
        p.eventId === dto.eventId &&
        p.email === dto.email.toLowerCase() &&
        p.status !== ParticipantStatus.CANCELLED,
    );
    if (isDuplicate) {
        this.eventsService.decrementParticipants(dto.eventId); 
        throw new BadRequestException('A participant with this email is already registered for this event');
    }

    const newParticipant: Participant = {
        id: this.generateId(),
        eventId: dto.eventId.trim(),
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        email: dto.email.trim().toLowerCase(),
        phone: dto.phone.trim(),
        role: dto.role,
        status: ParticipantStatus.REGISTERED,
        emergencyContact: this.mapEmergencyContact(dto.emergencyContact),
        dietaryRequirements: dto.dietaryRequirements,
        specialNeeds: dto.specialNeeds,
        registeredAt: this.now(),
        confirmedAt: null,
        checkedInAt: null,
        notes: dto.notes,
        createdAt: this.now(),
        updatedAt: this.now(),
    };

    this.participants.push(newParticipant);
    return newParticipant;
    }

    update(id: string, dto: UpdateParticipantDto): Participant {
        const index = this.participants.findIndex((p) => p.id === id);
        if (index === -1) throw new NotFoundException(`Participant with id "${id}" not found`);

        const existing = this.participants[index];

        const confirmedAt =
        dto.status === ParticipantStatus.CONFIRMED && !existing.confirmedAt
            ? this.now() : existing.confirmedAt;

        const checkedInAt =
        dto.status === ParticipantStatus.ATTENDED && !existing.checkedInAt
            ? this.now() : existing.checkedInAt;

        const updated: Participant = {
            ...existing,
            firstName: dto.firstName.trim(),
            lastName: dto.lastName.trim(),
            email: dto.email.trim().toLowerCase(),
            phone: dto.phone.trim(),
            role: dto.role,
            status: dto.status,
            emergencyContact: this.mapEmergencyContact(dto.emergencyContact),
            dietaryRequirements: dto.dietaryRequirements,
            specialNeeds: dto.specialNeeds,
            notes: dto.notes,
            confirmedAt,
            checkedInAt,
            updatedAt: this.now(),
        };

    this.participants[index] = updated;
    return updated;
    }

    patch(id: string, dto: PatchParticipantDto): Participant {
        const index = this.participants.findIndex((p) => p.id === id);
        if (index === -1) throw new NotFoundException(`Participant with id "${id}" not found`);

        const existing = this.participants[index];

        const confirmedAt =
        dto.status === ParticipantStatus.CONFIRMED && !existing.confirmedAt
            ? this.now() : existing.confirmedAt;

        const checkedInAt =
        dto.status === ParticipantStatus.ATTENDED && !existing.checkedInAt
            ? this.now() : existing.checkedInAt;

        const patchedEmergency = dto.emergencyContact
            ? { ...existing.emergencyContact, ...dto.emergencyContact }
            : existing.emergencyContact;

        const updated: Participant = {
            ...existing,
            ...(dto.firstName !== undefined && { firstName: dto.firstName.trim() }),
            ...(dto.lastName !== undefined && { lastName: dto.lastName.trim() }),
            ...(dto.email !== undefined && { email: dto.email.trim().toLowerCase() }),
            ...(dto.phone !== undefined && { phone: dto.phone }),
            ...(dto.role !== undefined && { role: dto.role }),
            ...(dto.status !== undefined && { status: dto.status }),
            emergencyContact: patchedEmergency,
            ...(dto.dietaryRequirements !== undefined && { dietaryRequirements: dto.dietaryRequirements }),
            ...(dto.specialNeeds !== undefined && { specialNeeds: dto.specialNeeds }),
            ...(dto.notes !== undefined && { notes: dto.notes }),
            confirmedAt,
            checkedInAt,
            updatedAt: this.now(),
        };

    this.participants[index] = updated;
    return updated;
    }

    remove(id: string): void {
        const index = this.participants.findIndex((p) => p.id === id);
        if (index === -1) throw new NotFoundException(`Participant with id "${id}" not found`);
        const participant = this.participants[index];
        this.eventsService.decrementParticipants(participant.eventId);
        this.participants.splice(index, 1);
    }
}