import { ApiProperty } from '@nestjs/swagger';

export class TodoItem {
  @ApiProperty({
    description: 'ID único da tarefa.',
    example: '52ebec08-2d01-4dc9-b100-3a172c99a71f',
  })
  id: string;

  @ApiProperty({
    description: 'ID do usuário associado à tarefa.',
    example: '6c99c2d0-64f0-46cd-a47c-cd54febd0732',
  })
  userId: string;

  @ApiProperty({
    description: 'Título da tarefa.',
    example: 'Alguma tarefa',
  })
  title: string;

  @ApiProperty({
    description: 'Prioridade da tarefa.',
    example: 'Alta',
  })
  priority: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa.',
    example: 'Piririporporo',
  })
  description: string;

  @ApiProperty({
    description: 'Indica se a tarefa foi concluída.',
    example: false,
  })
  done: boolean;

  @ApiProperty({
    description: 'Data de criação da tarefa.',
    example: '2025-01-08T22:41:54.982Z',
  })
  createdAt: string;
}

export class ListTodoHttpInput {
  @ApiProperty({
    description: 'Página atual da listagem.',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: 'Número total de itens na página atual.',
    example: 4,
  })
  totalItemsInPage: number;

  @ApiProperty({
    description: 'Indica se há uma próxima página.',
    example: false,
  })
  nextPage: boolean;

  @ApiProperty({
    description: 'Indica se é a última página.',
    example: false,
  })
  lastPage: boolean;

  @ApiProperty({
    description: 'Total de itens na listagem.',
    example: 4,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Número total de páginas.',
    example: 1,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Lista de tarefas.',
    type: [TodoItem],
  })
  items: TodoItem[];
}
