import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [EventsModule, ParticipantsModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class AppModule {}
