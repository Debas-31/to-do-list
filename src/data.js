/* eslint-disable no-use-before-define */
const listArray = [];
const form = document.getElementById('form-id');
const showTasks = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = form.elements[0].value;

    const data = {
      description: task,
      completed: false,
      index: listArray.length + 1,
    };
    form.reset();
    listArray.push(data);
    localStorage.setItem('itemsLocal', JSON.stringify(listArray));
    add();
  });
};

const removeItem = () => {
  const button = document.querySelectorAll('.fa-trash-alt');
  button.forEach((item) => {
    const parent = item.parentNode;
    const superParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(superParent.children, parent);
    const listInput = parent.firstChild;
    item.addEventListener('click', () => {
      const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
      listArray.splice(0, listArray.length, ...itemsLocal);
      if (listInput.hasAttribute('checked')) {
        parent.remove();
        listArray.splice(index, 1);
      }
      for (let i = 0; i < listArray.length; i += 1) {
        listArray[i].index = i + 1;
      }
      localStorage.setItem('itemsLocal', JSON.stringify(listArray));
      add();
    });
  });
};

const clearList = () => {
  const getClearElement = document.querySelector('.clear-task');
  getClearElement.addEventListener('click', () => {
    for (let i = 0; i < listArray.length; i += 1) {
      if (listArray[i].completed) {
        listArray.splice(i, 1);
      }
    }
    for (let i = 0; i < listArray.length; i += 1) {
      listArray[i].index = i + 1;
    }
    localStorage.setItem('itemsLocal', JSON.stringify(listArray));
    add();
  });
};

const updateValues = () => {
  const itemDetails = document.querySelectorAll('item-details');
  itemDetails.forEach((item) => {
    const parent = item.parentNode;
    const superParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(superParent.children, parent);
    item.addEventListener('change', () => {
      listArray[index].description = item.value;
      localStorage.setItem('itemsLocal', JSON.stringify(listArray));
    });
  });
};

const textDecor = (listInput) => {
  listInput.forEach((item) => {
    if (item.hasAttribute('checked')) {
      item.nextSibling.style.textDecoration = 'line-through';
    } else {
      item.nextSibling.style.textDecoration = 'none';
    }
  });
};

const storageForTask = () => {
  window.addEventListener('load', () => {
    add();
    const listInput = document.querySelectorAll('.list-input');
    const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
    listInput.forEach((item) => {
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const currentItem = itemsLocal[index].completed;
      if (currentItem) {
        item.setAttribute('checked', '');
        parent.lastChild.style.display = 'block';
      }
    });
    textDecor(listInput);
  });
};

const interact = (listInput) => {
  listInput.forEach((item) => {
    item.addEventListener('change', () => {
      const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const currentItem = itemsLocal[index].completed;
      if (currentItem) {
        item.removeAttribute('checked');
        parent.lastChild.style.display = 'none';
        itemsLocal[index].completed = false;
      } else {
        item.setAttribute('checked', '');
        parent.lastChild.style.display = 'block';
        itemsLocal[index].completed = true;
      }
      textDecor(listInput);
      localStorage.setItem('itemsLocal', JSON.stringify(itemsLocal));
      listArray.splice(0, listArray.length, ...itemsLocal);
    });
  });
};

const add = () => {
  const list = document.querySelector('.task-list');
  const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
  listArray.splice(0, listArray.length, ...itemsLocal);
  list.innerHTML = '';
  for (let i = 0; i < listArray.length; i += 1) {
    const { description } = itemsLocal[i];
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = `<input class="list-input" type="checkbox"><textarea name="textarea cols="30" class="item-details">${description}</textarea><i class="fas fa-trash-alt"></i>`;
    list.appendChild(listItem);
  }
  const listInput = document.querySelectorAll('.list-input');
  interact(listInput);
  clearList(listInput);
  removeItem();
  updateValues();
};

showTasks();

export default storageForTask;