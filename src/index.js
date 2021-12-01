import './style.css';

const allTasks = document.querySelector('.task-list');

const listArray = [
  {
    description: 'Complete To-Do list',
    completed: false,
    index: 0,
  },
  {
    description: 'Take a walk',
    completed: false,
    index: 1,
  },
  {
    description: 'Watch a movie',
    completed: false,
    index: 2,
  },
];

const showTasks = (tasks) => `
<li>
<input type="checkbox" name="" class="static-list" ${tasks.index}">
<label for="">${tasks.description}<i class="fas fa-ellipsis-v"></i></label>
</li>
`;
allTasks.innerHTML = listArray.map((tasks) => showTasks(tasks)).join('');