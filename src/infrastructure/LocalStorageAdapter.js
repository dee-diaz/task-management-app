// localStorage implementation

import StorageInterface from "./StorageInterface";

class LocalStorageAdapter extends StorageInterface {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting from localStorage", error);
      return null;
    }
  }

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }
}

export default LocalStorageAdapter;
