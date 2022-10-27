import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventEntity } from './event.entity';

@Injectable()
export class EventsService {
  private repository: Repository<EventEntity>;

  constructor(
    @InjectRepository(EventEntity) repository: Repository<EventEntity>,
  ) {
    this.repository = repository;
  }

  create(eventDto: CreateEventDto) {
    const event = this.repository.create(eventDto);
    return this.repository.save(event);
  }
}
