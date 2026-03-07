import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class emergencyContactDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact name must not be empty' })
  name!: string;

  @ApiProperty
}

export class createParticipantDto {

}

export class updateParticipantDto {
 
}

export class patchParticipantDto {

}

/*export interface emergencyContact {
  name: string;
  phone: string;
  relationship: string;
}
  
export interface Participant {
  id: string; xxx
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
  createdAt: string; xxx
  updatedAt: string; xxx
}*/