import { ICreateTodoInputDto } from './create-todo.use-case';
import { IBaseUseCase } from '@shared/base-use-case.interface';
import { TodoGateway } from '@domain/todo/todo.repository.gateway';
import { NotFoundDomainError } from '@domain/@shared/errors/not-found/not-found.errors';
export interface IUpdateTodoInputDto extends Partial<ICreateTodoInputDto> {
  id: string;
  done?: boolean;
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
    done,
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

    if (done && !todo.done) {
      todo.makeDone();
    }

    if (!done && todo.done) {
      todo.makeNotDone();
    }

    await this.todoGateway.update(id, todo);
  }
}
