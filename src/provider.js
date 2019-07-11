import React from 'react';

/** Class creating a provider component for given context */

class StateProvider extends React.PureComponent {

  static namespace = [];

  static addToNamespace = storeName => {
    if (StateProvider.namespace.includes(storeName)) {
      console.warn(`Store with ${storeName} already exists`);
    } else {
      StateProvider.namespace.push(storeName);
    }
  };

  static checkForFreeNamespace = storeName => !StateProvider.namespace.includes(storeName);

  runCachingTask() {
    window.addEventListener('beforeunload', this.caching);
  }

  render() {
    const {
      state,
      actions,
      Context,
      props: {
        children,
      },
    } = this;

    return (
      <Context.Provider
        value={{
          state,
          actions,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
};

export default StateProvider;
