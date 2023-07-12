import './style.css';

const tasks = [];

tasks.sort((a, b) => a.index - b.index);

function createItem() {
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

document.addEventListener('DOMContentLoaded', createItem);