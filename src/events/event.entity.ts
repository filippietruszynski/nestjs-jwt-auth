import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // User is being returned by function because it can't be directly accessed because of circular dependency with users entity
  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
