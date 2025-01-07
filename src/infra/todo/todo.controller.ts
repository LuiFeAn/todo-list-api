import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { CreateTodoInputDto } from 'src/use-cases/todo/create-todo.dto';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodoListController {
  constructor(private readonly createTodo: CreateTodoUseCase) {}

  @Post()
  async create(@Body() dto: CreateTodoInputDto, @Req() request: Request) {
    await this.createTodo.execute({
      userId: request.user.id,
      ...dto,
    });
  }

  @Delete(':id')
  delete() {}
}
