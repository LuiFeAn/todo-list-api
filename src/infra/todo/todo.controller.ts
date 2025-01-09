import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateTodoInputDto } from 'src/use-cases/todo/create-todo.dto';
import { CreateTodoUseCase } from 'src/use-cases/todo/create-todo.use-case';
import { DeleteTodoUseCase } from 'src/use-cases/todo/delete-todo.use-case';
import { DetailTodoUseCase } from 'src/use-cases/todo/detail-todo.use-case';
import { ListTodoInputDto } from 'src/use-cases/todo/list-todos.dto';
import { ListTodoUseCase } from 'src/use-cases/todo/list-todos.use-case';
import { UpdateTodoInputDto } from 'src/use-cases/todo/update-todo.dto';
import { UpdateTodoUseCase } from 'src/use-cases/todo/update-todos.use-case';
import { CreateTodoHttpInput } from './create-todo.swagger';
import {
  ListTodoHttpInput,
  ListTodoHttpQueryParamsInput,
} from './list-todo.swagger';
import { DetailTodoHttpInput } from './detail-todo.swagger';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodoListController {
  constructor(
    private readonly createTodo: CreateTodoUseCase,
    private readonly listTodo: ListTodoUseCase,
    private readonly detailTodo: DetailTodoUseCase,
    private readonly updateTodo: UpdateTodoUseCase,
    private readonly deleteTodo: DeleteTodoUseCase,
  ) {}

  @Post()
  @ApiBody({
    type: CreateTodoHttpInput,
  })
  @ApiCreatedResponse({
    description: 'Tarefa criada com Sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Erro de Validação no Body',
  })
  async create(@Body() dto: CreateTodoInputDto, @Req() request: Request) {
    await this.createTodo.execute({
      userId: request.user.id,
      ...dto,
    });
  }

  @Get()
  @ApiOkResponse({
    type: ListTodoHttpInput,
  })
  @ApiQuery({
    type: ListTodoHttpQueryParamsInput,
  })
  async list(@Query() dto: ListTodoInputDto, @Req() request: Request) {
    return await this.listTodo.execute({
      userId: request.user.id,
      ...dto,
    });
  }

  @Get(':id')
  @ApiOkResponse({
    type: DetailTodoHttpInput,
  })
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
