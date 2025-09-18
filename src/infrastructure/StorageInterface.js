/**
 * An abstract interface for storage adapters
 */

class StorageInterface {
  async get(key) {
    throw new Error('Must implement');
  }

  async save(key, value) {
    throw new Error('Must implement');
  }

  async remove(key) {
    throw new Error('Must implement');
  }
}

export default StorageInterface;