import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto, UpdateParticipantDto, PatchParticipantDto } from './participant.dto';
import { successResponse } from '../common/utils/response.util';
import { ApiResponse as ApiRes } from '../common/interfaces/api-response.interface';
import { Participant } from './participant.interface';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, description: 'List of all participants' })
  findAll(): ApiRes<Participant[]> {
    return successResponse('Participants retrieved successfully', this.participantsService.findAll());
  }
  @Get('by-event/:eventId')
  @ApiOperation({ summary: 'Get participants by event ID' })
  @ApiResponse({ status: 200, description: 'Participants for the event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findByEvent(@Param('eventId') eventId: string): ApiRes<Participant[]> {
    return successResponse('Participants retrieved successfully', this.participantsService.findByEventId(eventId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get participant by ID' })
  @ApiResponse({ status: 200, description: 'Participant found' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  findOne(@Param('id') id: string): ApiRes<Participant> {
    return successResponse('Participant retrieved successfully', this.participantsService.findById(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a participant to an event' })
  @ApiResponse({ status: 201, description: 'Participant registered' })
  @ApiResponse({ status: 400, description: 'Validation error or event full' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  create(@Body() dto: CreateParticipantDto): ApiRes<Participant> {
    return successResponse('Participant registered successfully', this.participantsService.create(dto));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update participant (full update)' })
  @ApiResponse({ status: 200, description: 'Participant updated' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  update(@Param('id') id: string, @Body() dto: UpdateParticipantDto): ApiRes<Participant> {
    return successResponse('Participant updated successfully', this.participantsService.update(id, dto));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update participant' })
  @ApiResponse({ status: 200, description: 'Participant patched' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  patch(@Param('id') id: string, @Body() dto: PatchParticipantDto): ApiRes<Participant> {
    return successResponse('Participant patched successfully', this.participantsService.patch(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove participant by ID' })
  @ApiResponse({ status: 200, description: 'Participant removed' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  remove(@Param('id') id: string): ApiRes<null> {
    this.participantsService.remove(id);
    return successResponse('Participant removed successfully', null);
  }
}