import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class emergencyContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'emergencyContact name must not be empty' })
  name!: string;

  @ApiProperty({ example: '+66889944556' })
  @IsString()
  
}

export class createParticipantDto {

}

export class updateParticipantDto {
 
}

export class patchParticipantDto {

}

/*export interface emergencyContact {
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