import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Event, EventStatus, EventLocation } from './event.interface';
import { CreateEventDto, UpdateEventDto, PatchEventDto, EventLocationDto } from './event.dto';

@Injectable()
export class EventsService {
    private events: Event[] = [];
    private idCounter = 1;

    private generateId(): string {
        return `event - ${String(this.idCounter++).padStart(3,'0')}`;
    }

    private now(): string {
        return new Date().toISOString();
    }
  
    private mapLocation(dto: EventLocationDto): EventLocation {
        return {
            venue: dto.venue,
            address: dto.address,
            city: dto.city,
            country: dto.country,
            isOnline: dto.isOnline,
            onlineUrl: dto.onlineUrl,
        };
    }

    private validateDateLogic(startDate: string, endDate: string, registrationDeadline: string): void {
        if (new Date(endDate) <= new Date(startDate)) {
            throw new BadRequestException('endDate must be after startDate');
        }
        if (new Date(registrationDeadline) >= new Date(startDate)) {
            throw new BadRequestException('registrationDeadline must be before startDate');
        }
    }
//
    findAll(): Event[] {
        return this.events;
    }

    findById(id: string): Event {
        const event = this.events.find((e) => e.id === id);
        
        if (!event) {
            throw new NotFoundException(`Event with id "${id}" not found`);
        }
        return event;
    }
//
    create(dto: CreateEventDto): Event {
    this.validateDateLogic(dto.startDate, dto.endDate, dto.registrationDeadline);

    const newEvent: Event = {
        id: this.generateId(),
        title: dto.title.trim(),
        description: dto.description.trim(),
        category: dto.category,
        status: EventStatus.DRAFT,
        location: this.mapLocation(dto.location),
        organizerId: dto.organizerId.trim(),
        organizerName: dto.organizerName.trim(),
        startDate: dto.startDate,
        endDate: dto.endDate,
        maxParticipants: dto.maxParticipants,
        currentParticipants: 0,
        registrationDeadline: dto.registrationDeadline,
        isPublic: dto.isPublic,
        tags: dto.tags,
        createdAt: this.now(),
        updatedAt: this.now(),
    };

    this.events.push(newEvent);
    return newEvent;
    }
//
    update(id: string, dto: UpdateEventDto): Event {
        const index = this.events.findIndex((e) => e.id === id);
        if (index === -1) {
            throw new NotFoundException(`Event with id "${id}" not found`);
        }
        this.validateDateLogic(dto.startDate, dto.endDate, dto.registrationDeadline);

        const updated: Event = {
            ...this.events[index], // เอาค่าเดิมมา
            title: dto.title.trim(),
            description: dto.description.trim(),
            category: dto.category,
            status: dto.status,
            location: this.mapLocation(dto.location),
            organizerId: dto.organizerId.trim(),
            organizerName: dto.organizerName.trim(),
            startDate: dto.startDate,
            endDate: dto.endDate,
            maxParticipants: dto.maxParticipants,
            registrationDeadline: dto.registrationDeadline,
            isPublic: dto.isPublic,
            tags: dto.tags,
            updatedAt: this.now(),
        };

        this.events[index] = updated;
        return updated;
    }
//
    patch(id: string, dto: PatchEventDto): Event {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
        throw new NotFoundException(`Event with id "${id}" not found`);
    }

    const existing = this.events[index];

    const startDate = dto.startDate ?? existing.startDate; //ถ้าไม่มีใหม่ก็ใช้ค่าเดิม
    const endDate = dto.endDate ?? existing.endDate;
    const registrationDeadline = dto.registrationDeadline ?? existing.registrationDeadline;
    this.validateDateLogic(startDate, endDate, registrationDeadline);

    const patchedLocation = dto.location
        ? this.mapLocation({ ...existing.location, ...dto.location })
        : existing.location;

    const updated: Event = {
        ...existing,
        ...(dto.title !== undefined && { title: dto.title.trim() }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.status !== undefined && { status: dto.status }),
        location: patchedLocation,
        ...(dto.organizerId !== undefined && { organizerId: dto.organizerId }),
        ...(dto.organizerName !== undefined && { organizerName: dto.organizerName }),
        ...(dto.startDate !== undefined && { startDate: dto.startDate }),
        ...(dto.endDate !== undefined && { endDate: dto.endDate }),
        ...(dto.maxParticipants !== undefined && { maxParticipants: dto.maxParticipants }),
        ...(dto.registrationDeadline !== undefined && { registrationDeadline: dto.registrationDeadline }),
        ...(dto.isPublic !== undefined && { isPublic: dto.isPublic }),
        ...(dto.tags !== undefined && { tags: dto.tags }),
        updatedAt: this.now(),
    };

    this.events[index] = updated;
    return updated;
    }
//
    remove(id: string): void {
        const index = this.events.findIndex((e) => e.id === id);
        if (index === -1) {
            throw new NotFoundException(`Event with id "${id}" not found`);
        }
        this.events.splice(index, 1);
    }
//
    incrementParticipants(eventId: string): void {
        const event = this.findById(eventId);
        if (event.currentParticipants >= event.maxParticipants) {
            throw new BadRequestException('Event has reached maximum participants');
        }
        event.currentParticipants += 1;
        event.updatedAt = this.now();
    }

    decrementParticipants(eventId: string): void {
        const event = this.findById(eventId);
        if (event.currentParticipants > 0) {
            event.currentParticipants -= 1;
            event.updatedAt = this.now();
        }
    }
}
