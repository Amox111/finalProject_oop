import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsInt, IsPositive, IsISO8601, IsArray, IsOptional, IsUrl, ValidateNested, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { EventCategory, EventStatus } from './event.interface';

export class EventLocationDto {
    @ApiProperty({ example: 'Siam Paragon' })
    @IsString()
    @IsNotEmpty({ message: 'venue must not be empty' })
    venue!: string;

    @ApiProperty({ example: '991/1 Rama 1 Rd' })
    @IsString()
    @IsNotEmpty({ message: 'address must not be empty' })
    address!: string;

    @ApiProperty({ example: 'Bangkok' })
    @IsString()
    @IsNotEmpty({ message: 'city must not be empty' })
    city!: string;

    @ApiProperty({ example: 'Thailand' })
    @IsString()
    @IsNotEmpty({ message: 'country must not be empty' })
    country!: string;

    @ApiProperty({ example: false })
    @IsBoolean({ message: 'isOnline must be a boolean' })
    isOnline!: boolean;

    @ApiPropertyOptional({ example: 'https://zoom.us/xxxxx' })
    @ValidateIf((o: EventLocationDto) => o.isOnline === true)
    @IsUrl({}, { message: 'onlineUrl must be valid URL' })
    @IsOptional()
    onlineUrl?: string;
}

export class CreateEventDto {
    @ApiProperty({ example: 'Animonium 2026' })
    @IsString()
    @IsNotEmpty({ message: 'title must not be empty' })
    title!: string;

    @ApiProperty({ example: 'Anime content and copyright exhibition' })
    @IsString()
    @IsNotEmpty({ message: 'description must not be empty' })
    description!: string;

    @ApiProperty({ enum: EventCategory, example: EventCategory.OTHER })
    @IsEnum(EventCategory, { message: `category must be one of: ${Object.values(EventCategory).join(', ')}` })
    category!: EventCategory;

    @ApiProperty({ type: EventLocationDto })
    @ValidateNested()
    @Type(() => EventLocationDto)
    location!: EventLocationDto;

    @ApiProperty({ example: 'DEX-001' })
    @IsString()
    @IsNotEmpty({ message: 'organizerId must not be empty' })
    organizerId!: string;

    @ApiProperty({ example: 'DEX' })
    @IsString()
    @IsNotEmpty({ message: 'organizerName must not be empty' })
    organizerName!: string;

    @ApiProperty({ example: '2026-06-01' })
    @IsISO8601({}, { message: 'startDate must be a valid date string' })
    startDate!: string;

    @ApiProperty({ example: '2026-06-01' })
    @IsISO8601({}, { message: 'endDate must be a valid date string' })
    endDate!: string;

    @ApiProperty({ example: 500 })
    @IsInt({ message: 'maxParticipants must be an integer' })
    @IsPositive({ message: 'maxParticipants must be a positive number' })
    maxParticipants!: number;

    @ApiProperty({ example: '2026-05-25' })
    @IsISO8601({}, { message: 'registrationDeadline must be a valid ISO 8601 date string' })
    registrationDeadline!: string;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'isPublic must be a boolean' })
    isPublic!: boolean;

    @ApiProperty({ example: ['Anime', 'J-pop'] })
    @IsArray({ message: 'tags must be an array' })
    @IsString({ each: true, message: 'each tag must be a string' })
    tags!: string[];
}

export class UpdateEventDto {
    @ApiProperty({ example: 'Animonium 2026 update' })
    @IsString()
    @IsNotEmpty({ message: 'title must not be empty' })
    title!: string;

    @ApiProperty({ example: 'Updated description' })
    @IsString()
    @IsNotEmpty({ message: 'description must not be empty' })
    description!: string;

    @ApiProperty({ enum: EventCategory })
    @IsEnum(EventCategory, { message: `category must be one of: ${Object.values(EventCategory).join(', ')}` })
    category!: EventCategory;

    @ApiProperty({ enum: EventStatus })
    @IsEnum(EventStatus, { message: `status must be one of: ${Object.values(EventStatus).join(', ')}` })
    status!: EventStatus;

    @ApiProperty({ type: EventLocationDto })
    @ValidateNested()
    @Type(() => EventLocationDto)
    location!: EventLocationDto;

    @ApiProperty({ example: 'DEX-001' })
    @IsString()
    @IsNotEmpty({ message: 'organizerId must not be empty' })
    organizerId!: string;

    @ApiProperty({ example: 'DEX' })
    @IsString()
    @IsNotEmpty({ message: 'organizerName must not be empty' })
    organizerName!: string;

    @ApiProperty({ example: '2026-06-01T09:00:00.000Z' })
    @IsISO8601({}, { message: 'startDate must be a valid ISO 8601 date string' })
    startDate!: string;

    @ApiProperty({ example: '2026-06-01T17:00:00.000Z' })
    @IsISO8601({}, { message: 'endDate must be a valid ISO 8601 date string' })
    endDate!: string;

    @ApiProperty({ example: 500 })
    @IsInt({ message: 'maxParticipants must be an integer' })
    @IsPositive({ message: 'maxParticipants must be a positive number' })
    maxParticipants!: number;

    @ApiProperty({ example: '2026-05-25T23:59:59.000Z' })
    @IsISO8601({}, { message: 'registrationDeadline must be a valid ISO 8601 date string' })
    registrationDeadline!: string;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'isPublic must be a boolean' })
    isPublic!: boolean;

    @ApiProperty({ example: ['Concert', 'Japan'] })
    @IsArray({ message: 'tags must be an array' })
    @IsString({ each: true, message: 'each tag must be a string' })
    tags!: string[];
    }

export class PatchEventDto {
    @ApiPropertyOptional({ example: 'Animonium 2026 Patched' })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'title must not be empty if provided' })
    title?: string;

    @ApiPropertyOptional({ example: 'Patched description' })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'description must not be empty if provided' })
    description?: string;

    @ApiPropertyOptional({ enum: EventCategory })
    @IsOptional()
    @IsEnum(EventCategory, { message: `category must be one of: ${Object.values(EventCategory).join(', ')}` })
    category?: EventCategory;

    @ApiPropertyOptional({ enum: EventStatus })
    @IsOptional()
    @IsEnum(EventStatus, { message: `status must be one of: ${Object.values(EventStatus).join(', ')}` })
    status?: EventStatus;

    @ApiPropertyOptional({ type: EventLocationDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => EventLocationDto)
    location?: EventLocationDto;

    @ApiPropertyOptional({ example: 'DEX-001' })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'organizerId must not be empty if provided' })
    organizerId?: string;

    @ApiPropertyOptional({ example: 'DEX' })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'organizerName must not be empty if provided' })
    organizerName?: string;

    @ApiPropertyOptional({ example: '2026-06-01T09:00:00.000Z' })
    @IsOptional()
    @IsISO8601({}, { message: 'startDate must be a valid ISO 8601 date string' })
    startDate?: string;

    @ApiPropertyOptional({ example: '2026-06-01T17:00:00.000Z' })
    @IsOptional()
    @IsISO8601({}, { message: 'endDate must be a valid ISO 8601 date string' })
    endDate?: string;

    @ApiPropertyOptional({ example: 700 })
    @IsOptional()
    @IsInt({ message: 'maxParticipants must be an integer' })
    @IsPositive({ message: 'maxParticipants must be a positive number' })
    maxParticipants?: number;

    @ApiPropertyOptional({ example: '2026-05-25T23:59:59.000Z' })
    @IsOptional()
    @IsISO8601({}, { message: 'registrationDeadline must be a valid ISO 8601 date string' })
    registrationDeadline?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean({ message: 'isPublic must be a boolean' })
    isPublic?: boolean;

    @ApiPropertyOptional({ example: ['Anime'] })
    @IsOptional()
    @IsArray({ message: 'tags must be an array' })
    @IsString({ each: true, message: 'each tag must be a string' })
    tags?: string[];
}