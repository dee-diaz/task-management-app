import List from './List';

class ListManager {
  constructor(storageAdapter) {
    this.storage = storageAdapter;
    this.lists = this.loadLists() || [];
  }

  loadLists() {
    const lists = this.storage.get('lists');
    return lists !== null ? lists : [];
  }

  getLists() {
    return this.lists;
  }

  getList(listId) {
    const lists = this.storage.get('lists');
    const list = lists.filter((list) => list._id === listId)[0];
    console.log(list);
    return list;
  }

  saveList(title, color) {
    const newList = new List(title, color);
    this.lists.push(newList);
    this.storage.save('lists', this.lists);

    return newList;
  }

  deleteList(listId) {
    const deletedList = this.lists.find((list) => list._id === listId);
    if (!deletedList) {
      console.warn('List to delete not found by ID');
      return;
    }
    const index = this.lists.findIndex((list) => list._id === listId);
    if (index !== -1) this.lists.splice(index, 1);
    this.storage.save('lists', this.lists);

    return deletedList;
  }
}

export default ListManager;
