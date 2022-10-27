import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // User is being returned by function because it can't be directly accessed because of circular dependency with users entity (whatever it means)
  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;
}
