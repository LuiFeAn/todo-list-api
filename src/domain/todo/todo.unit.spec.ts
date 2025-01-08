import { randomUUID } from 'crypto';
import { TodoList } from './todo.domain';
import { PriorityEnum } from './priority.enum';

describe('TodoList Entity Update Methods', () => {
  it('should update the title successfully', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);
    const newTitle = 'Updated Title';

    todo.updateTilte(newTitle);
    expect(todo.title).toBe(newTitle);
  });

  it('should throw an error when updating the title to an empty value', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);

    expect(() => todo.updateTilte('')).toThrow('_title should not be empty');
  });

  it('should throw an error when updating the title to exceed 20 characters', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);
    const longTitle = 'A'.repeat(101);

    expect(() => todo.updateTilte(longTitle)).toThrow(
      '_title must be shorter than or equal to 20 characters',
    );
  });

  it('should update the description successfully', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);
    const newDescription = 'Updated description';

    todo.updateDescription(newDescription);
    expect(todo.description).toBe(newDescription);
  });

  it('should throw an error when updating the description to an empty value', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);

    expect(() => todo.updateDescription('')).toThrow(
      '_description should not be empty',
    );
  });

  it('should throw an error when updating the description to exceed 250 characters', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);
    const longDescription = 'A'.repeat(801);

    expect(() => todo.updateDescription(longDescription)).toThrow(
      '_description must be shorter than or equal to 250 characters',
    );
  });

  it('should update the priority successfully', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);

    todo.updatePriority(PriorityEnum.High);
    expect(todo.priority).toBe(PriorityEnum.High);

    todo.updatePriority(PriorityEnum.Medium);
    expect(todo.priority).toBe(PriorityEnum.Medium);
  });

  it('should throw an error when updating priority to an invalid value', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);

    // @ts-expect-error Testing invalid enum value
    expect(() => todo.updatePriority('InvalidPriority')).toThrow();
  });
});
