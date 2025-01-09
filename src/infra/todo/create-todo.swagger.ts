import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoHttpInput {
  @ApiProperty({
    description: 'Título da tarefa.',
    example: 'Alguma tarefa',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa.',
    example: 'Piririporporo',
  })
  description: string;

  @ApiProperty({
    description: 'Prioridade da tarefa. Pode ser "Alta", "Média" ou "Baixa".',
    example: 'Alta',
  })
  priority: string;
}
