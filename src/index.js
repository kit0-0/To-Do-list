import './index.css';

const todoListContainer = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');
const tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

const storeTasksToLocalStorage = () => {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
};

const sortTasks = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

const displayTasks = () => {
  todoListContainer.textContent = '';
  tasks.forEach((task, index) => {
    todoListContainer.innerHTML += `
      <li class="task" draggable="true" data-index="${index}">
        <div class="checkbox-container">
          <input type="checkbox" name="${task.description}" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.description}" readonly>
        </div>
        <i class="fas fa-ellipsis-vertical" data-index="${index}"></i>
      </li>
    `;
  });

  const deleteTask = (item, index) => {
    item.addEventListener('click', () => {
      tasks.splice(index, 1);
      tasks.forEach((task, newIndex) => {
        task.index = newIndex + 1;
      });
      sortTasks();
      storeTasksToLocalStorage();
      displayTasks();
    });
  };

  const editTask = (description, index) => {
    tasks[index].description = description;
    storeTasksToLocalStorage();
  };

  const addedTasks = document.querySelectorAll('.task');

  const checkboxContainers = document.querySelectorAll('.task > .checkbox-container > input[type="checkbox"]');

  checkboxContainers.forEach((checkbox) => {
    const inputText = checkbox.nextElementSibling;
    let previousState = checkbox.checked;

    inputText.readOnly = true;

    checkbox.addEventListener('change', (event) => {
      const currentState = event.target.checked;

      if (currentState !== previousState) {
        const foundTask = tasks.find((task) => task.description === inputText.value);
        if (foundTask) {
          foundTask.completed = currentState;
          storeTasksToLocalStorage();
        }
      }

      previousState = currentState;
    });
  });

  addedTasks.forEach((task, index) => {
    const textInput = task.querySelector('input[type="text"]');
    task.addEventListener('dblclick', () => {
      textInput.readOnly = false;
      if (task.querySelector('.fa-ellipsis-vertical')) {
        const ellipsisIcon = task.querySelector('.fa-ellipsis-vertical');
        ellipsisIcon.classList.remove('fa-ellipsis-vertical');
        ellipsisIcon.classList.add('fa-trash');
        deleteTask(ellipsisIcon, index);
      } else {
        const trashIcon = task.querySelector('.fa-trash');
        trashIcon.classList.remove('fa-trash');
        trashIcon.classList.add('fa-ellipsis-vertical');
        textInput.readOnly = true;
      }
    });

    // Edit
    textInput.addEventListener('input', () => {
      const data = textInput.value.trim();
      editTask(data, index);
    });
  });
};

const addTask = () => {
  const inputField = document.getElementById('input-task');
  const taskDescription = inputField.value.trim();

  // Check if the task description is not empty
  if (taskDescription !== '') {
    const newTask = {
      description: taskDescription,
      completed: false,
      index: tasks.length + 1, // Set the index as array length + 1
    };
    tasks.push(newTask);
    storeTasksToLocalStorage();
    inputField.value = '';
    displayTasks();
  }
};

const initializeTasks = () => {
  document.addEventListener('DOMContentLoaded', displayTasks);
};

const refreshPage = () => {
  localStorage.removeItem('Tasks');
  window.location.reload();
};

initializeTasks();
addBtn.addEventListener('click', addTask);
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
document.querySelector('.fa-arrows-rotate').addEventListener('click', refreshPage);

export {};