import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventEntity } from './event.entity';

@Injectable()
export class EventsService {
  private eventsRepository: Repository<EventEntity>;

  constructor(
    @InjectRepository(EventEntity) eventsRepository: Repository<EventEntity>,
  ) {
    this.eventsRepository = eventsRepository;
  }

  create(eventDto: CreateEventDto) {
    const event = this.eventsRepository.create(eventDto);
    return this.eventsRepository.save(event);
  }
}
