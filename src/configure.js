
import StateProvider from './provider';
import createContext from './createContext';
import createConsumerObject from './decorator';

import { updater } from './utils';

const getStore = (hasCachedData, storeName, storage) => hasCachedData ? JSON.parse(storage.getItem(storeName)) : null;

/** @function configureStore
 * Main propose of the function is createing React Context based store over
 * provider/consumer pattern.
 * @param {string} storeName - unique string for store name (will be used as key for storages)
 * @param {object} defaultState - store initial state
 * @param {Action} StoreActions - store updater class extended from Actions
 * @param {function} caching - optional argument that must return object,
 * which structure is similar with store structure. The object must include the values that need to be stored to storage.
 */

const configureStore = (storeName, defaultState, StoreActions, caching, isSession = true) => {

  const storage = isSession ? window.sessionStorage : window.localStorage;

  if (!StateProvider.checkForFreeNamespace(storeName)) {
    return console.warn(`${storeName} as store is already taken`);
  } else {
    StateProvider.addToNamespace(storeName);
  }

  /* Local Storage access */

  const clone = {
    store: { ...defaultState },
  };

  const cache = getStore(!!caching, storeName, storage);

  if (cache) {
    storage.removeItem(storeName);
    updater(clone, cache, 'store');
  }

  const Context = createContext(clone.store);

  class StoreProvider extends StateProvider {

    Context = Context;
    state = clone.store;
    name = storeName;

    constructor(props) {
      super(props);

      if (StoreProvider.instance) {
        return StoreProvider.instance;
      }

      this.actions = new StoreActions(this, storeName);
      if (typeof caching === 'function') {
        this.caching = () => {
          storage.setItem(storeName, JSON.stringify(caching(this.state)));
        };
        this.runCachingTask();
      }

      StoreProvider.instance = this;
    }
  }

  const consumerDecorator = createConsumerObject(Context, storeName);

  return {
    StoreProvider,
    consumerDecorator,
  };
};

export default configureStore;
