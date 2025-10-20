import List from './List';

class ListManager {
  constructor(storageAdapter) {
    this.storage = storageAdapter;
    this.lists = this.loadLists();
  }

  loadLists() {
    const lists = this.storage.get('lists');
    return lists !== null ? lists : [];
  }
}

export default ListManager;
