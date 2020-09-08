
/**
 * 数组结构封装
 *
 * @param {*} initValue 初始值
 */
export default useArray = (initValue=[]) => {
  const arrayMethods = {
    push: (state, ...args) => state.concat(...args),
    pop: state => state.slice(0, -1),
    shift: state => state.slice(1),
    slice: (state, ...args) => state.slice(...args),
    empty: () => [],
    set: (state, newValue) => {
      invariant(Array.isArray(newValue), 'newValue must be an Array');
      return newValue;
    },
    removeForIndex: (state, index) => {
      if (index<0) { return state };
      return [...state.slice(0, index), ...state.slice(index+1)];
    },
    remove: (state, item) => {
      const index = state.indexOf(item);
      return arrayMethods.removeForIndex(state, index);
    }
  };
  invariant(Array.isArray(initValue), 'initValue must be an Array');
  return useMethods(initValue, arrayMethods);
}
