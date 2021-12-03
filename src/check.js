import { listArray, showTasks } from './data.js';

const listInput = showTasks();

const interact = () => {
  listInput.forEach((item) => {
    item.addEventListener('change', () => {
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const currentItem = listArray[index].completed;
      if (currentItem) {
        listArray[index].completed = false;
      } else {
        listArray[index].completed = true;
      }
    });
  });
};

const storeValues = () => {
  listInput.forEach((item) => {
    item.addEventListener('change', () => {
      localStorage.setItem('itemsLocal', JSON.stringify(listArray));
    });
  });
};

const populateStorage = () => {
  window.addEventListener('load', () => {
    const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
    listArray.splice(0, listArray.length, ...itemsLocal);
    listInput.forEach((item) => {
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const currentItem = listArray[index].completed;
      if (currentItem) {
        item.setAttribute('checked', '');
      }
    });
  });
};

export { interact, storeValues, populateStorage };