import 'jest-localstorage-mock';

import clearAllCompletedTasks from '../clearTask.js';
import {
  tasks,
  storeTasksToLocalStorage,
  deleteTask,
} from '../taskFunctions.js';

// Mock the localStorage and DOM elements
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

const mockDisplayTasks = jest.fn();

jest.mock('../../index.js', () => ({
  displayTasks: mockDisplayTasks,
}));

const emptyTasks = [];

describe('clearAllCompletedTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should clear all completed tasks', () => {
    clearAllCompletedTasks(tasks);

    expect(tasks.length).toBe(3);
    expect(tasks[0].description).toBe('Task 1');
    expect(tasks[0].completed).toBe(false);
    expect(tasks[1].description).toBe('Task 2');
    expect(tasks[1].completed).toBe(false);
    expect(tasks[2].description).toBe('Task 3');
    expect(tasks[2].completed).toBe(false);
    expect(storeTasksToLocalStorage).toHaveBeenCalledTimes(1);
  });

  it('should not delete not completed tasks', () => {
    tasks.forEach((task) => {
      task.completed = false;
    });

    clearAllCompletedTasks(tasks);

    expect(deleteTask).not.toHaveBeenCalled();
  });

  it('should not do anything if the list is empty', () => {
    clearAllCompletedTasks(emptyTasks);

    expect(emptyTasks.length).toBe(0);
  });
});
