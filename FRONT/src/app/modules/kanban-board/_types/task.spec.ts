import { Task } from './task';

describe('Task', () => {
  it('should create a Task object with properties', () => {
    const task: Task = {
      edit: false,
      id: '123',
      titulo: 'Test Task',
      newTitulo: undefined,
      conteudo: 'This is a test task',
      newConteudo: undefined,
      lista: 'To Do'
    };

    expect(task.edit).toBe(false);
    expect(task.id).toBe('123');
    expect(task.titulo).toBe('Test Task');
    expect(task.newTitulo).toBeUndefined();
    expect(task.conteudo).toBe('This is a test task');
    expect(task.newConteudo).toBeUndefined();
    expect(task.lista).toBe('To Do');
  });
});