import './style.css';

const tasks = [
  {
    description: 'do homework',
    completed: true,
    index: 0,
  },
  {
    description: 'do dishes',
    completed: true,
    index: 2,
  },
  {
    description: 'do white',
    completed: true,
    index: 1,
  },
];

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