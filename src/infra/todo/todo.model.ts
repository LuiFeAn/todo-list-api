import { PriorityEnum } from '@domain/todo/priority.enum';
import { BaseTypeOrmEntity } from '@infra/@shared/database/typeorm/base-entity';
import { UserModel } from '@infra/user/user.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('todo_list')
export class TodoListModel extends BaseTypeOrmEntity {
  @Column({
    type: 'varchar',
    length: 20,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 250,
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

  @ManyToOne(() => UserModel, (userModel) => userModel.todos)
  user: UserModel;
}
