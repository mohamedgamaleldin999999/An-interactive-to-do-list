let tasks = [];

tasks.sort((a, b) => a.index - b.index);

export function createItem() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  tasks.forEach((task) => {
    const aTask = document.createElement('li');
    list.appendChild(aTask);
    aTask.textContent = task.description;
    if (task.completed) {
      aTask.classList.add('completed');
    }
  });
}

export function addTask(description) {
  const newTask = {
    description: description,
    completed: false,
    index: tasks.length
  };

  tasks.push(newTask);
  updateTaskIndexes();
  saveTasksToLocalStorage();
  createItem();
}

const taskInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-btn');

addTaskButton.addEventListener('click', function() {
  const description = taskInput.value.trim();
  if (description !== '') {
    addTask(description);
    taskInput.value = '';
  }
});

export function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index;
  });
}

export function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadTasksFromLocalStorage();
  createItem();
});