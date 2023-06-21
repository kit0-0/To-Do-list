import { tasks, storeTasksToLocalStorage } from './taskFunctions.js';

const clearAllCompletedTasks = () => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  tasks.splice(0, tasks.length, ...incompleteTasks);
  storeTasksToLocalStorage();
};

export default clearAllCompletedTasks;
