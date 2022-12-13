import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors';
import { CreateEventDto, EventDto } from './dtos';
import { EventsRoute } from './events.routes';
import { EventsService } from './events.service';

@Controller(EventsRoute.EVENTS)
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
