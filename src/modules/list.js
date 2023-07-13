let tasks = [];

tasks.sort((a, b) => a.index - b.index);

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index;
  });
}

export function createItem() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    const aTask = document.createElement('li');
    list.appendChild(aTask);
    aTask.classList.add('list-li');

    aTask.addEventListener('click', () => {
      makeTaskEditable(aTask, task);
    });

    aTask.textContent = task.description;
    if (task.completed) {
      aTask.classList.add('completed');
    }
  });
}

function deleteTask(task) {
  const taskIndex = tasks.findIndex((item) => item === task);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateTaskIndexes();
    saveTasksToLocalStorage();
    createItem();
  }
}

function makeTaskEditable(taskItem, task) {
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.value = task.description;
  inputField.classList.add('todo-input');
  taskItem.innerHTML = '';
  taskItem.appendChild(inputField);

  const trashIcon = document.createElement('span');
  trashIcon.classList.add('trash-icon');
  trashIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';

  taskItem.appendChild(trashIcon);

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      task.description = inputField.value;
      saveTasksToLocalStorage();
      createItem();
    }
  });

  trashIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteTask(task);
  });

  inputField.focus();
}

export function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };

  tasks.push(newTask);
  updateTaskIndexes();
  saveTasksToLocalStorage();
  createItem();
}

const taskInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-btn');

addTaskButton.addEventListener('click', () => {
  const description = taskInput.value.trim();
  if (description !== '') {
    addTask(description);
    taskInput.value = '';
  }
});

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  createItem();
});

document.addEventListener('click', (event) => {
  const clickedElement = event.target;

  if (clickedElement.tagName !== 'INPUT' && !clickedElement.closest('.list li')) {
    createItem();
  }
});
