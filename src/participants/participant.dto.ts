import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class eventLocationDto{
    @ApiProperty({ example: 'MBK' })
    @IsString()
    @IsNotEmpty({ message: 'venue must not be empty' })
    venue!: string;

    @
}

/*export interface eventLocation {
  venue: string;
  address: string;
  city: string;
  country: string;
  isOnline: boolean;
  onlineUrl?: string;
}*/