
export const getType = data => {
  const str = Object.prototype.toString.call(data).toLocaleLowerCase();
  return str.replace(/^\[object (\w+)\]$/, '$1');
}

export const isObject = val => getType(val) === 'object';

export const isNull = val => getType(val) === 'null';

/**
 * 封装简单的 use
 *
 * @param {*} initValue 初始值
 * @param {*} methods 对值的操作方法 eg: { fn1(value, ...args) {}, fn2() {} }
 */
export const useMethods = (initValue, methods) => {
  const [ value, setValue ] = useState(initValue);
  const methodsArr = Object.entries(methods);
  const boundMethods = useMemo(() => {
    return methodsArr.reduce(
      (resMethods, [ name, fn ]) => {
        const method = (...args) => setValue(value => fn(value, ...args));
        resMethods[name] = method;
        return resMethods;
      }, {}
    );
  }, methodsArr);
  return [value, boundMethods];
}; 
