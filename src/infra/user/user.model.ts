import { BaseTypeOrmEntity } from '@infra/@shared/database/typeorm/base-entity';
import { TodoListModel } from '@infra/todo/todo.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserModel extends BaseTypeOrmEntity {
  @Column({
    type: 'varchar',
    length: 250,
  })
  username: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @OneToMany(() => TodoListModel, (todoListModel) => todoListModel)
  todos: TodoListModel[];
}
