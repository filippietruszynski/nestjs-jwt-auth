import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  private eventsRepository: Repository<Event>;

  constructor(@InjectRepository(Event) eventsRepository: Repository<Event>) {
    this.eventsRepository = eventsRepository;
  }

  create(eventDto: CreateEventDto) {
    const event = this.eventsRepository.create(eventDto);
    return this.eventsRepository.save(event);
  }
}
