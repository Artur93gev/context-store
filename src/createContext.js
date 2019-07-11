import React from 'react';

/** @function createContext
 * @param {object} defaultState
 * This will become the default value for new Context
 */

const createContext = defaultState => React.createContext(defaultState);

export default createContext;
