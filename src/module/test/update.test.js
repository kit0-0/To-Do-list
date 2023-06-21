

import updateStatus from '../statusFunctions.js';
import { tasks } from '../taskFunctions.js';

describe('updateStatus', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn(() => JSON.stringify(tasks)),
      setItem: jest.fn(),
    };

    // Set initial data
    tasks.splice(0, tasks.length, // Clear the array
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 });
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.localStorage;
  });

  test('should update the completed status of a task', () => {
    const index = 0;
    const newCompletedStatus = true;

    updateStatus(index, newCompletedStatus);

    expect(tasks[index].completed).toBe(newCompletedStatus);
  });

  test('should update the tasks in localStorage', () => {
    const index = 1;
    const newCompletedStatus = true;

    updateStatus(index, newCompletedStatus);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'Tasks',
      JSON.stringify([
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: newCompletedStatus, index: 2 },
      ]),
    );
  });
});
