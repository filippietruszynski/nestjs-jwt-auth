import { Expose, Transform } from 'class-transformer';

export class EventDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Transform(({ obj }) => obj.user?.id)
  @Expose()
  userId: number;
}
