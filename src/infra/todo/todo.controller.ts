import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateTodoInputDto } from 'src/use-cases/todo/create-todo.dto';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';
import { DeleteTodoUseCase } from 'src/use-cases/todo/delete-todo.use-case';
import { DetailTodoUseCase } from 'src/use-cases/todo/detail-todo.use-case';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodoListController {
  constructor(
    private readonly createTodo: CreateTodoUseCase,
    private readonly detailTodo: DetailTodoUseCase,
    private readonly deleteTodo: DeleteTodoUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTodoInputDto, @Req() request: Request) {
    await this.createTodo.execute({
      userId: request.user.id,
      ...dto,
    });
  }

  @Get(':id')
  async detial(@Param('id') id: string) {
    return await this.detailTodo.execute(id);
  }

  @Delete(':id')
  async del(@Param('id') id: string) {
    await this.deleteTodo.execute(id);
  }
}
