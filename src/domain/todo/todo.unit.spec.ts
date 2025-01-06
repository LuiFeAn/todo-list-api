import { randomUUID } from 'crypto';
import { TodoList } from './todo.domain';
import { PriorityEnum } from './priority.enum';
import { TodoListMapper } from './todo.mapper';

describe('TodoList Entity Unit Tests', () => {
  it('should create a TodoList successfully', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      done: false,
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = TodoListMapper.toOuput(new TodoList(input));

    expect(input).toEqual(todo);
  });

  it('should throw an error if the UUID is empty', () => {
    const input = {
      id: '',
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    expect(() => new TodoList(input)).toThrow('_id should not be empty');
  });

  it('should throw an error if the UUID is invalid', () => {
    const input = {
      id: '12345',
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    expect(() => new TodoList(input)).toThrow('_id must be a UUID');
  });

  it('should throw an error if the title is empty', () => {
    const input = {
      id: randomUUID(),
      title: '',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    expect(() => new TodoList(input)).toThrow('_title should not be empty');
  });

  it('should throw an error if the title exceeds 100 characters', () => {
    const input = {
      id: randomUUID(),
      title: 'A'.repeat(101),
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    expect(() => new TodoList(input)).toThrow(
      '_title must be shorter than or equal to 100 characters',
    );
  });

  it('should throw an error if the description is empty', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      description: '',
      createdAt: new Date().toISOString(),
    };

    expect(() => new TodoList(input)).toThrow(
      '_description should not be empty',
    );
  });

  it('should throw an error if the description exceeds 800 characters', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      description: 'A'.repeat(801),
      createdAt: new Date().toISOString(),
    };

    expect(() => new TodoList(input)).toThrow(
      '_description must be shorter than or equal to 800 characters',
    );
  });

  it('should throw an error if the createdAt is empty', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: '',
    };

    expect(() => new TodoList(input)).toThrow('_createdAt should not be empty');
  });

  it('should throw an error if the createdAt is not a valid ISO8601 date', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: 'invalid-date',
    };

    expect(() => new TodoList(input)).toThrow(
      '_createdAt must be a valid ISO 8601 date',
    );
  });

  it('should default done to false and priority to Low if not provided', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);

    expect(todo.done).toBe(false);
    expect(todo.priority).toBe(PriorityEnum.Low);
  });

  it('should allow setting done and priority explicitly', () => {
    const input = {
      id: randomUUID(),
      title: 'Sample Todo',
      description: 'This is a sample todo description',
      createdAt: new Date().toISOString(),
    };

    const todo = new TodoList(input);
    todo.makeDone();
    todo.changePriority(PriorityEnum.High);

    expect(todo.done).toBe(true);
    expect(todo.priority).toBe(PriorityEnum.High);
  });
});
