/** Base Action constructor
 * Store action handlers must extend this class,
 * then provide own abstraction and actual handling.
 */

class Actions {

  /**
   * @prop {Object} cache - Some like a store of resources
   * that had been fetched from any endPoint
   */

  cache = {};

  /** Create action's instance
   * @param {object} memory
   * @param {string} storeName
   */

  constructor(memory, storeName) {
    this.memory = memory;
    this.storeName = storeName;
  }

  /**
   * Use this function for store update.
   * Api is similar with `setState` function Api.
   */

  store = (nextState, fn) => {
    this.memory.setState(nextState, fn);
  }

  /** Storing endpoint to
   * local store cache
   */

  storeInCache = (url, promise) => {
    this.cache[url] = promise;
  }

  removeCache = _ => {
    window.localStorage.removeItem(this.storeName);
  }

  /** Function checks does the resource already fetched */
  doesExistInStore = url => this.cache[url];

  /** force storeing data to storage */

  storeToStorage = () => this.memory.caching();
}

export default Actions;
