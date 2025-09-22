/**
 * An abstract interface for storage adapters
 */

class StorageInterface {
  get(key) {
    throw new Error('Must implement');
  }

  save(key, value) {
    throw new Error('Must implement');
  }

  remove(key) {
    throw new Error('Must implement');
  }
}

export default StorageInterface;