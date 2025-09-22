const { act } = require('react');

const storeResetFns = new Set();

const create = (createState) => {
  const store = createState();
  const storeProxy = new Proxy(store, {
    get: (target, prop) => {
      if (typeof target[prop] === 'function') {
        return (...args) => {
          return target[prop](...args);
        };
      }
      return target[prop];
    },
  });

  const useStore = () => storeProxy;

  useStore.persist = {
    rehydrate: jest.fn(),
  };

  const reset = () => {
    // Reset store to initial state
    const initialState = createState();
    Object.assign(store, initialState);
  };

  storeResetFns.add(reset);
  return useStore;
};

const persist = (storeCreator, options) => {
  return storeCreator;
};

const createJSONStorage = (getStorage) => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
});

module.exports = {
  create,
  persist,
  createJSONStorage,
};