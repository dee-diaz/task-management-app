// localStorage implementation

import StorageInterface from "./StorageInterface";

class LocalStorageAdapter extends StorageInterface {
  async get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting from localStorage", error);
      return null;
    }
  }

  async save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  async remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }
}

export default LocalStorageAdapter;
