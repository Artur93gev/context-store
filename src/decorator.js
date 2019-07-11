import React from 'react';
import isEqual from 'lodash-es/isEqual';

/** @function createConsumerObject
 * @param {React.Context} Context
 * @param {string} storeName
 * This function is creating a decorator for any given context.
 */

const createConsumerObject = (Context, storeName) =>
  (Component, accessors = () => void 0, actionKeys = []) => {

    let updateFromParent = true;
    let cachedState = null;
    let cachedComponent = null;

    return props => (
      <Context.Consumer>
        {
          ({ state, actions }) => {
            const nextCapture = accessors(state, props);
            const storeActions = Object.create(null);
            actionKeys.forEach(actionKey => storeActions[actionKey] = actions[actionKey]);

            const nextState = { ...nextCapture, ...props, ...storeActions };
            updateFromParent = false;
            if (!updateFromParent && (nextState === cachedState || isEqual(nextState, cachedState))) {
              return cachedComponent;
            } else {
              cachedState = nextState;
              cachedComponent = (
                <Component { ...cachedState } />
              );
              return cachedComponent;
            }
          }
        }
      </Context.Consumer>
    );
  };

export default createConsumerObject;
