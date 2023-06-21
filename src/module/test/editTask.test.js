import 'jest-localstorage-mock';

import {
  editTask,
  tasks,
} from '../taskFunctions.js';

describe('Task Functions', () => {
  describe('editTask', () => {
    beforeEach(() => {
      tasks.length = 0;
      localStorage.clear();
    });

    test('should edit the task description and update localStorage', () => {
      // Arrange
      const description = 'New description';
      tasks.push({ description: 'Old description', completed: false, index: 1 });

      // Act
      editTask(description, 0);

      // Assert
      expect(tasks[0].description).toBe(description);
      expect(localStorage.getItem('Tasks')).toBe(JSON.stringify(tasks));
    });
  });
});