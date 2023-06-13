import { tasks, storeTasksToLocalStorage, sortTasks } from './taskFunctions.js';

const dragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.dataset.index);
};

const dragOver = (event) => {
  event.preventDefault();
};

const drop = (event) => {
  event.preventDefault();
  const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
  const targetIndex = parseInt(event.target.dataset.index, 10);

  if (sourceIndex !== targetIndex) {
    const [task] = tasks.splice(sourceIndex, 1);
    tasks.splice(targetIndex, 0, task);
    sortTasks();
    storeTasksToLocalStorage();

    // Dispatch custom event to notify index.js to update the display
    const updateDisplayEvent = new CustomEvent('updateDisplay');
    document.dispatchEvent(updateDisplayEvent);
  }
};

export { dragStart, dragOver, drop };
