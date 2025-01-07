import { ICreateTodoInputDto } from './create-todo.use-case';
import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { NotFoundDomainError } from '@domain/@shared/errors/not-found/not-found.errors';
export interface IUpdateTodoInputDto extends Partial<ICreateTodoInputDto> {
  id: string;
}
export class UpdateTodoUseCase
  implements IBaseUseCase<IUpdateTodoInputDto, void>
{
  constructor(private readonly todoGateway: TodoGateway) {}

  async execute({
    id,
    description,
    title,
    priority,
  }: IUpdateTodoInputDto): Promise<void> {
    const todo = await this.todoGateway.findById(id);

    if (!todo) {
      throw new NotFoundDomainError('Todo não encontrado');
    }

    if (title) {
      todo.updateTilte(title);
    }

    if (description) {
      todo.updateDescription(description);
    }

    if (priority) {
      todo.updatePriority(priority);
    }

    await this.todoGateway.update(id, todo);
  }
}
