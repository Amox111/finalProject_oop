import { Injectable } from '@nestjs/common';

@Injectable()
export class eventsService {
    private events: Event[] = [];
    private idCounter = 1;

    private generateId(): string {
        return `event - ${String(this.idCounter++).padStart(3,"0")}`;
    }


    
}
