import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private usersRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
  ) {
    this.usersRepository = usersRepository;
  }

  async findOne(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
