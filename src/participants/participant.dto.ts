import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EmergencyContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact name must not be empty' })
  name!: string;


  @ApiProperty({ example: '+66884455669' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact.phone must not be empty' })
  phone!: string;
}

export class CreateParticipantDto {

}

export class UpdateParticipantDto {
 
}

export class PatchatchParticipantDto {

}

/*export interface EmergencyContact {
  name: string; /
  phone: string; 
  relationship: string;
}
  
export interface Participant {
  id: string; xxxไม่
  eventId: string; 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: participantRole;
  status: participantStatus; xxx
  emergencyContact: emergencyContact;
  dietaryRequirements: string;
  specialNeeds: string;
  registeredAt: string;
  confirmedAt: string | null;   
  checkedInAt: string | null; 
  notes: string;
  createdAt: string; xxxไม่
  updatedAt: string; xxxไม่
}*/