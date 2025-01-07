import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateTodoInputDto } from 'src/use-cases/todo/create-todo.dto';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';
import { DeleteTodoUseCase } from 'src/use-cases/todo/delete-todo.use-case';
import { DetailTodoUseCase } from 'src/use-cases/todo/detail-todo.use-case';
import { UpdateTodoInputDto } from 'src/use-cases/todo/update-todo.dto';
import { UpdateTodoUseCase } from 'src/use-cases/todo/update-todos.use-case';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodoListController {
  constructor(
    private readonly createTodo: CreateTodoUseCase,
    private readonly detailTodo: DetailTodoUseCase,
    private readonly updateTodo: UpdateTodoUseCase,
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

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() dto: UpdateTodoInputDto,
  ) {
    await this.updateTodo.execute({
      id,
      ...dto,
    });
  }

  @Delete(':id')
  async del(@Param('id') id: string) {
    await this.deleteTodo.execute(id);
  }
}
