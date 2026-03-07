import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { eventsService } from './events.service';
import { createEventDto, updateEventDto, patchEventDto } from './event.dto';
import { successResponse } from '../common/utils/response.util';
import { ApiResponse as ApiRes } from '../common/interfaces/api-response.interface';
import { Event } from './event.interface';

@ApiTags('Events')
@Controller('events')
export class eventsController {
    constructor(private readonly eventsService: eventsService) {}

// get
    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of all events' })
    findAll(): ApiRes<Event[]> {
        const events = this.eventsService.findAll();
        return successResponse('Events retrieved successfully', events);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get event by ID' })
    @ApiResponse({ status: 200, description: 'Event found' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    findOne(@Param('id') id: string): ApiRes<Event> {
        const event = this.eventsService.findById(id);
        return successResponse('Event retrieved successfully', event);
    }

// post
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'Event created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    create(@Body() dto: createEventDto): ApiRes<Event> {
        const event = this.eventsService.create(dto);
        return successResponse('Event created successfully', event);
    }

// put
    @Put(':id')
    @ApiOperation({ summary: 'Update event (full update)' })
    @ApiResponse({ status: 200, description: 'Event updated' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    update(@Param('id') id: string, @Body() dto: updateEventDto): ApiRes<Event> {
        const event = this.eventsService.update(id, dto);
        return successResponse('Event updated successfully', event);
    }

// patch
    @Patch(':id')
    @ApiOperation({ summary: 'Partially update event' })
    @ApiResponse({ status: 200, description: 'Event patched' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    patch(@Param('id') id: string, @Body() dto: patchEventDto): ApiRes<Event> {
        const event = this.eventsService.patch(id, dto);
        return successResponse('Event patched successfully', event);
    }

// delete
    @Delete(':id')
    @ApiOperation({ summary: 'Delete event by ID' })
    @ApiResponse({ status: 200, description: 'Event deleted' })
    @ApiResponse({ status: 404, description: 'Event not found' })
    remove(@Param('id') id: string): ApiRes<null> {
        this.eventsService.remove(id);
        return successResponse('Event deleted successfully', null);
    }
}
