import { PriorityEnum } from '@domain/todo/priority.enum';
import { BaseTypeOrmEntity } from '@infra/@shared/database/typeorm/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('todo_list')
export class TodoListModel extends BaseTypeOrmEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'boolean',
  })
  done: boolean;

  @Column({
    type: 'enum',
    enum: PriorityEnum,
  })
  priority: PriorityEnum;
}
