import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventDto } from './dtos/event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  private eventsService: EventsService;

  constructor(eventsService: EventsService) {
    this.eventsService = eventsService;
  }

  @Post()
  @Serialize(EventDto)
  createEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
