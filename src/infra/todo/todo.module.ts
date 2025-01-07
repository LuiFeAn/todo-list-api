import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListModel } from './todo.model';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { TypeOrmTodoRepository } from './typeorm-todo.repository';
import { TodoListController } from './todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListModel])],
  controllers: [TodoListController],
  providers: [
    {
      provide: TodoGateway,
      useClass: TypeOrmTodoRepository,
    },
    {
      provide: CreateTodoUseCase,
      useFactory: (todoGateway: TodoGateway) =>
        new CreateTodoUseCase(todoGateway),
    },
  ],
  exports: [TodoGateway],
})
export class TodoModule {}
