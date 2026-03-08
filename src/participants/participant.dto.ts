import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ParticipantRole, ParticipantStatus } from './participant.interface';

export class EmergencyContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact name must not be empty' })
  name!: string;

  @ApiProperty({ example: '+66884455669' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact.phone must not be empty' })
  phone!: string;

  @ApiProperty({ example: 'Spouse' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact.relationship must not be empty' })
  relationship!: string;
}

export class CreateParticipantDto {
  @ApiProperty({ example: 'event-001' })
  @IsString()
  @IsNotEmpty({ message: 'eventId must not be empty' })
  eventId!: string;

  @ApiProperty({ example: 'Somchai' })
  @IsString()
  @IsNotEmpty({ message: 'firstName must not be empty' })
  firstName!: string;

  @ApiProperty({ example: 'Meengen' })
  @IsString()
  @IsNotEmpty({ message: 'lastName must not be empty' })
  lastName!: string;

  @ApiProperty({ example: 'somchai@email.com' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email!: string;

  @ApiProperty({ example: '+66884455669' })
  @IsString()
  @IsNotEmpty({ message: 'phone must not be empty' })
  phone!: string;

  @ApiProperty({ enum: ParticipantRole, example: ParticipantRole.ATTENDEE })
  @IsEnum(ParticipantRole, { message: `role must be one of: ${Object.values(ParticipantRole).join(', ')}` })
  role!: ParticipantRole;

  @ApiProperty({ type: EmergencyContactDto })
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact!: EmergencyContactDto;

  @ApiProperty({ example: 'Vegetarian' })
  @IsString()
  dietaryRequirements!: string;

  @ApiProperty({ example: 'Wheelchair access needed' })
  @IsString()
  specialNeeds!: string;

  @ApiProperty({ example: 'Looking forward to the keynote' })
  @IsString()
  notes!: string;
}

export class UpdateParticipantDto {
  @ApiProperty({ example: 'event-001' })
  @IsString()
  @IsNotEmpty({ message: 'eventId must not be empty' })
  eventId!: string;

  @ApiProperty({ example: 'Somchai' })
  @IsString()
  @IsNotEmpty({ message: 'firstName must not be empty' })
  firstName!: string;

  @ApiProperty({ example: 'Meengen' })
  @IsString()
  @IsNotEmpty({ message: 'lastName must not be empty' })
  lastName!: string;

  @ApiProperty({ example: 'somchai@email.com' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email!: string;

  @ApiProperty({ example: '+66884455669' })
  @IsString()
  @IsNotEmpty({ message: 'phone must not be empty' })
  phone!: string;

  @ApiProperty({ enum: ParticipantRole })
  @IsEnum(ParticipantRole, {
    message: `role must be one of: ${Object.values(ParticipantRole).join(', ')}`,
  })
  role!: ParticipantRole;

  @ApiProperty({ enum: ParticipantStatus })
  @IsEnum(ParticipantStatus, {
    message: `status must be one of: ${Object.values(ParticipantStatus).join(', ')}`,
  })
  status!: ParticipantStatus;

  @ApiProperty({ type: EmergencyContactDto })
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact!: EmergencyContactDto;

  @ApiProperty({ example: 'Vegan' })
  @IsString()
  dietaryRequirements!: string;

  @ApiProperty({ example: '' })
  @IsString()
  specialNeeds!: string;

  @ApiProperty({ example: '' })
  @IsString()
  notes!: string;
}

export class PatchParticipantDto {
  @ApiPropertyOptional({ example: 'Somchai' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'firstName must not be empty if provided' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'Meengen' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'lastName must not be empty if provided' })
  lastName?: string;

  @ApiPropertyOptional({ example: 'somchai@email.com' })
  @IsOptional()
  @IsEmail({}, { message: 'email must be a valid email address' })
  email?: string;

  @ApiPropertyOptional({ example: '+66884455669' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'phone must not be empty if provided' })
  phone?: string;

  @ApiPropertyOptional({ enum: ParticipantRole })
  @IsOptional()
  @IsEnum(ParticipantRole, { message: `role must be one of: ${Object.values(ParticipantRole).join(', ')}` })
  role?: ParticipantRole;

  @ApiPropertyOptional({ enum: ParticipantStatus })
  @IsOptional()
  @IsEnum(ParticipantStatus, {
    message: `status must be one of: ${Object.values(ParticipantStatus).join(', ')}`,
  })
  status?: ParticipantStatus;

  @ApiPropertyOptional({ type: EmergencyContactDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact?: EmergencyContactDto;

  @ApiPropertyOptional({ example: 'Vegan' })
  @IsOptional()
  @IsString()
  dietaryRequirements?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  specialNeeds?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  notes?: string;
}

