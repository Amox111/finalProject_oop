import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { eventsController } from './events/events.controller';
import { eventsService } from './events/events.service';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [EventsModule, ParticipantsModule],
  controllers: [eventsController],
  providers: [eventsService],
})
export class AppModule {}
