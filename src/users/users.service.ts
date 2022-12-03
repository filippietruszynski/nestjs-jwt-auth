import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  async find(email: string, where?: FindOptionsWhere<User>): Promise<User[]> {
    return await this.usersRepository.find({ where: { email, ...where } });
  }

  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ ...where });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async create(email: string, password: string): Promise<User> {
    const usersWithTheSameEmail = await this.find(email);

    if (usersWithTheSameEmail.length) {
      throw new NotFoundException('user with following email already exists');
    }

    const user = this.usersRepository.create({ email, password });

    return this.usersRepository.save(user);
  }

  async update(
    id: number,
    attributes: Partial<User>,
    where?: FindOptionsWhere<User>,
  ): Promise<User> {
    const user = await this.findOne({ id, ...where });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attributes);

    return this.usersRepository.save(user);
  }
}
