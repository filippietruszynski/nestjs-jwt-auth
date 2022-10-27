// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UserEntity } from './user.entity';

// @Injectable()
// export class UsersService {
//   private usersRepository: Repository<UserEntity>;

//   constructor(
//     @InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
//   ) {
//     this.usersRepository = usersRepository;
//   }
// }

import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
