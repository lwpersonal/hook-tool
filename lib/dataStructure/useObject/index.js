import { isObject } from '../../utils';
/**
 * 对象结构封装
 *
 * @param {*} initValue 初始值
 */
export const useObject = (initValue={}) => {
  const objectMethods = {
    empty: () => { return {} },
    set: (state, source) => {
      if (!isObject(source)) {
        throw new Error('source must be an Object');
      }
      return { ...state,  ...source };
    },
    reSet: (state, newValue) => {
      if (!isObject(source)) {
        throw new Error('newValue must be an Object');
      }
      return newValue;
    },
    remove: (state, key) => {
      if (!state.hasOwnProperty(key)) { return state };
      return Object.entries.reduce((res, [itemKey, value]) => {
        if (itemKey!==key) { res[itemKey] = value };
        return res;
      }, {});
    }
  };
  if (!isObject(source)) {
    throw new Error('initValue must be an Object');
  }
  return useMethods(initValue, objectMethods);
};