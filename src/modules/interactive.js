import List from './list.js';

export default function addCheckboxListener() {
  const todoList = new List();

  const listSection = document.querySelector('#list-items');
  listSection.addEventListener('change', (event) => {
    if (
      (event.target.tagName === 'INPUT' && event.target.type === 'checkbox')
      || event.target.tagName === 'LABEL'
    ) {
      const taskItem = event.target.closest('.list-item');
      const taskId = parseInt(taskItem.dataset.taskId, 10);
      const task = todoList.list.find((item) => item.index === taskId);

      if (task) {
        task.completed = event.target.checked;
        todoList.saveData();
        todoList.display();
      }

      // Add or remove "completed" class to the taskItem based on checkbox state
      if (event.target.checked) {
        taskItem.classList.add('completed');
        todoList.saveData();
      } else {
        taskItem.classList.remove('completed');
        todoList.saveData();
      }
    }
  });
}