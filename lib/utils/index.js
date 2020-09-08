
export const getType = data => {
  const str = Object.prototype.toString.call(data).toLocaleLowerCase();
  return str.replace(/^\[object (\w+)\]$/, '$1');
}

export const isObject = val => getType(val) === 'object';

export const isNull = val => getType(val) === 'null';
