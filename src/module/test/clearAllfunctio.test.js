import { tasks, storeTasksToLocalStorage, deleteTask } from '../taskFunctions.js';
import clearAllCompletedTasks from '../clearTask.js';

jest.mock('../taskFunctions.js', () => ({
  tasks: [
    { description: 'Task 1', completed: false, index: 1 },
    { description: 'Task 2', completed: false, index: 2 },
    { description: 'Task 3', completed: false, index: 3 },
  ],
  storeTasksToLocalStorage: jest.fn(),
  deleteTask: jest.fn(),
  addTask: jest.fn(),
  sortTasks: jest.fn(),
}));

describe('clearAllCompletedTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should clear all completed tasks', () => {
    // Set some tasks as completed
    tasks[0].completed = true;
    tasks[1].completed = false;
    tasks[2].completed = true;

    clearAllCompletedTasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe('Task 2');
    expect(tasks[0].completed).toBe(false);
    expect(storeTasksToLocalStorage).toHaveBeenCalledTimes(1);
  });

  it('should not delete not completed tasks', () => {
    // Set all tasks as not completed
    tasks.forEach((task) => {
      task.completed = false;
    });

    clearAllCompletedTasks();

    expect(deleteTask).not.toHaveBeenCalled();
  });

  it('should not do anything if the list is empty', () => {
    const emptyTasks = [];

    clearAllCompletedTasks(emptyTasks);

    expect(emptyTasks.length).toBe(0);
  });
});
