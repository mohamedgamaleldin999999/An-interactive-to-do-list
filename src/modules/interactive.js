import { tasks, saveTasksToLocalStorage, createItem } from './list.js';

export function addCheckboxListener() {
  const list = document.getElementById('list');

  list.addEventListener('change', (event) => {
    if (
      (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') ||
      event.target.tagName === 'LABEL'
    ) {
      const taskItem = event.target.parentNode;
      const taskId = parseInt(taskItem.dataset.taskId, 10);
      const task = tasks.find((item) => item.index === taskId);

      if (task) {
        task.completed = event.target.checked;
        saveTasksToLocalStorage();
        createItem();
      }

      // Add or remove "completed" class to the taskItem based on checkbox state
      if (event.target.checked) {
        taskItem.classList.add('completed');
        saveTasksToLocalStorage();
      } else {
        taskItem.classList.remove('completed');
        saveTasksToLocalStorage();
      }
    }
  });
}
