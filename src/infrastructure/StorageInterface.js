/**
 * An abstract interface for storage adapters
 */

class StorageInterface {
  async save(key, value) {
    throw new Error('Must implement');
  }

  async delete(key) {
    throw new Error('Must implement');
  }

  async get(key) {
    throw new Error('Must implement');
  }

  async clear() {
    throw new Error('Must implement');
  }
}

export default StorageInterface;