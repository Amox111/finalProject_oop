import { Module } from '@nestjs/common';
import { eventsController } from './events.controller';
import { eventsService } from './events.service';

@Module({
  controllers: [eventsController],
  providers: [eventsService],
  exports: [eventsService],
})
export class eventsModule {}

