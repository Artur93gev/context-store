const updater = (draftState, updateSegment, storeKey, removedStack = []) => {
  if (draftState[storeKey]) {
    for (const key in updateSegment) {
      if (updateSegment[key] && typeof updateSegment[key] === 'object' && (key in draftState[storeKey])) {
        updater(draftState[storeKey], updateSegment[key], key, removedStack);
      } else {
        // check for null case
        if (updateSegment[key] === null) {
          removedStack.push(key);
          const {
            [key]: removedKey,
            ...restState
          } = draftState[storeKey];
          draftState[storeKey] = restState;
        } else {
          draftState[storeKey][key] = updateSegment[key];
        }
      }
    }
  } else {
    draftState[storeKey] = updateSegment;
    console.log('there is no such segment in store');
  }

  return removedStack;
};

export default updater;
