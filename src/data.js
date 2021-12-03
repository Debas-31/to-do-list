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

const showTasks = () => {
  const container = document.querySelector('.task-list');

  for (let i = 0; i < listArray.length; i += 1) {
    const item = listArray[i];
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = `<input class="list-input" type = "checkbox"><p class="item-details">${item.description}</p> <label><i class="fas fa-ellipsis-v"></i></label>`;
    container.appendChild(listItem);
  }
  const listInput = document.querySelectorAll('.list-input');
  return listInput;
};

export { listArray, showTasks };