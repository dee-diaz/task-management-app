/**
 * An abstract interface for storage adapters
 */

class StorageInterface {
  // eslint-disable-next-line no-unused-vars
  get(key) {
    throw new Error('Must implement');
  }

  // eslint-disable-next-line no-unused-vars
  save(key, value) {
    throw new Error('Must implement');
  }

  // eslint-disable-next-line no-unused-vars
  remove(key) {
    throw new Error('Must implement');
  }
}

export default StorageInterface;
