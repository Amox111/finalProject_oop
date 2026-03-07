import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString, IsNotEmpty, IsEnum, IsBoolean, IsInt,
    IsPositive, Matches, IsArray, IsOptional,
    IsUrl, ValidateNested, ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { eventCategory, eventStatus } from './event.interface';

export class eventLocationDto {
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
    @ValidateIf((o: eventLocationDto) => o.isOnline === true)
    @IsUrl({}, { message: 'onlineUrl must be valid URL' })
    @IsOptional()
    onlineUrl?: string;
}

export class createEventDto {
    @ApiProperty({ example: 'Animonium 2026' })
    @IsString()
    @IsNotEmpty({ message: 'title must not be empty' })
    title!: string;

    @ApiProperty({ example: 'Anime content and copyright exhibition' })
    @IsString()
    @IsNotEmpty({ message: 'description must not be empty' })
    description!: string;

    @ApiProperty({ enum: eventCategory, example: eventCategory.OTHER })
    @IsEnum(eventCategory, { message: `category must be one of: ${Object.values(eventCategory).join(', ')}` })
    category!: eventCategory;

    @ApiProperty({ type: eventLocationDto })
    @ValidateNested()
    @Type(() => eventLocationDto)
    location!: eventLocationDto;

    @ApiProperty({ example: 'DEX-001' })
    @IsString()
    @IsNotEmpty({ message: 'organizerId must not be empty' })
    organizerId!: string;

    @ApiProperty({ example: 'DEX' })
    @IsString()
    @IsNotEmpty({ message: 'organizerName must not be empty' })
    organizerName!: string;

    @ApiProperty({ example: '2026-06-01' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'startDate must be in format YYYY-MM-DD' })
    startDate!: string;

    @ApiProperty({ example: '2026-06-01' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'endDate must be in format YYYY-MM-DD' })
    endDate!: string;
        

    @ApiProperty({ example: 500 })
    @IsInt({ message: 'maxParticipants must be an integer' })
    @IsPositive({ message: 'maxParticipants must be a positive number' })
    maxParticipants!: number;

    @ApiProperty({ example: '2026-05-25' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'registrationDeadline must be in format YYYY-MM-DD' })
    registrationDeadline!: string;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'isPublic must be a boolean' })
    isPublic!: boolean;

    @ApiProperty({ example: ['Anime', 'J-pop'] })
    @IsArray({ message: 'tags must be an array' })
    @IsString({ each: true, message: 'each tag must be a string' })
    tags!: string[];
}

export class updateEventDto {
    @ApiProperty({ example: 'Animonium 2026 update' })
    @IsString()
    @IsNotEmpty({ message: 'title must not be empty' })
    title!: string;

    @ApiProperty({ example: 'Updated description' })
    @IsString()
    @IsNotEmpty({ message: 'description must not be empty' })
    description!: string;

    @ApiProperty({ enum: eventCategory })
    @IsEnum(eventCategory, { message: `category must be one of: ${Object.values(eventCategory).join(', ')}` })
    category!: eventCategory;

    @ApiProperty({ enum: eventStatus })
    @IsEnum(eventStatus, { message: `status must be one of: ${Object.values(eventStatus).join(', ')}` })
    status!: eventStatus;

    @ApiProperty({ type: eventLocationDto })
    @ValidateNested()
    @Type(() => eventLocationDto)
    location!: eventLocationDto;

    @ApiProperty({ example: 'DEX-001' })
    @IsString()
    @IsNotEmpty({ message: 'organizerId must not be empty' })
    organizerId!: string;

    @ApiProperty({ example: 'DEX' })
    @IsString()
    @IsNotEmpty({ message: 'organizerName must not be empty' })
    organizerName!: string;

    @ApiProperty({ example: '2026-06-01' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'startDate must be in format YYYY-MM-DD' })
    startDate!: string;

    @ApiProperty({ example: '2026-06-01' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'endDate must be in format YYYY-MM-DD' })
    endDate!: string;

    @ApiProperty({ example: 600 })
    @IsInt({ message: 'maxParticipants must be an integer' })
    @IsPositive({ message: 'maxParticipants must be a positive number' })
    maxParticipants!: number;

    @ApiProperty({ example: '2026-05-25' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'registrationDeadline must be in format YYYY-MM-DD' })
    registrationDeadline!: string;

    @ApiProperty({ example: true })
    @IsBoolean({ message: 'isPublic must be a boolean' })
    isPublic!: boolean;

    @ApiProperty({ example: ['Concert', 'Japan'] })
    @IsArray({ message: 'tags must be an array' })
    @IsString({ each: true, message: 'each tag must be a string' })
    tags!: string[];
    }

export class patchEventDto {
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

    @ApiPropertyOptional({ enum: eventCategory })
    @IsOptional()
    @IsEnum(eventCategory, { message: `category must be one of: ${Object.values(eventCategory).join(', ')}` })
    category?: eventCategory;

    @ApiPropertyOptional({ enum: eventStatus })
    @IsOptional()
    @IsEnum(eventStatus, { message: `status must be one of: ${Object.values(eventStatus).join(', ')}` })
    status?: eventStatus;

    @ApiPropertyOptional({ type: eventLocationDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => eventLocationDto)
    location?: eventLocationDto;

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

    @ApiPropertyOptional({ example: '2026-06-01' })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'startDate must be in format YYYY-MM-DD' })
    startDate?: string;

    @ApiPropertyOptional({ example: '2026-06-01' })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'endDate must be in format YYYY-MM-DD' })
    endDate?: string;

    @ApiPropertyOptional({ example: 400 })
    @IsOptional()
    @IsInt({ message: 'maxParticipants must be an integer' })
    @IsPositive({ message: 'maxParticipants must be a positive number' })
    maxParticipants?: number;

    @ApiPropertyOptional({ example: '2026-05-25' })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'registrationDeadline must be in format YYYY-MM-DD' })
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