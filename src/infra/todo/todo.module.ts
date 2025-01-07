import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListModel } from './todo.model';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { TypeOrmTodoRepository } from './typeorm-todo.repository';
import { TodoListController } from './todo.controller';
import { DeleteTodoUseCase } from 'src/use-cases/todo/delete-todo.use-case';
import { DetailTodoUseCase } from 'src/use-cases/todo/detail-todo.use-case';
import { UpdateTodoUseCase } from 'src/use-cases/todo/update-todos.use-case';
import { ListTodoUseCase } from 'src/use-cases/todo/list-todos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListModel])],
  controllers: [TodoListController],
  providers: [
    {
      provide: TodoGateway,
      useClass: TypeOrmTodoRepository,
    },
    TypeOrmTodoRepository,
    {
      provide: CreateTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new CreateTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
    {
      provide: ListTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new ListTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
    {
      provide: DetailTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new DetailTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
    {
      provide: UpdateTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new UpdateTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
    {
      provide: DeleteTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new DeleteTodoUseCase(todoGateway),
      inject: [TodoGateway],
    },
  ],
  exports: [TodoGateway],
})
export class TodoModule {}
