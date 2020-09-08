
import { useRef, useCallback, useEffect } from 'react';
import { useObject } from '../dataStructure/useObject';

/**
 * fetch 请求包装
 *
 * @param {*} fetchFn 一个 fetch 请求函数
 * @param {*} option firstRequest 首次是否请求、initParams 初始化请求参数、formatResult 格式化请求结果数据、onSuccess, onError, onFinally 三个状态回调函数
 * @return {*} [手动发起请求, 设置参数会传入 fetch、请求成功的结果、请求失败的 error 信息、loading 状态、直接修改数据的方法]，调用参数设置后发起请求
 */
export const useHandleFetch = (fetchFn, options={}) => {
  const {
    firstRequest = true,
    initParams = {},
    formatResult = data => data,
    onSuccess = () => {},
    onError = () => {},
    onFinally = () => {}
  } = options;
  const initResult = { data: undefined, error: undefined, loading: false };
  const oldParams = useRef({});
  const [result, resultMethods] = useObject(initResult);
  const handleChangeParams = useCallback(async params => {
    // 用 ref 存储 params, 下一次执行 run 时可以使用本次 params
    oldParams.current = params;
    resultMethods.set({ loading: true });
    const res = {};
    try {
      const data = await fetchFn(params);
      const formatData = formatResult(data);
      resultMethods.set({ data: formatData, loading: false, error: undefined });
      onSuccess(formatData, params);
      res.data = formatData;
    } catch(error) {
      resultMethods.set({ error, loading: false, data: undefined });
      onError(error, params);
      res.error = error;
    }
    onFinally(params);
    res.params = params;
    return res;
  }, []);
  const mutate = useCallback(newData => {
    const data = typeof newData === 'function' ? newData(result.data) : newData;
    resultMethods.set({ data });
  }, [result]);
  const run = formatParams => {
    let params = formatParams || initParams;
    if (typeof formatParams === 'function') {
      params = formatParams(oldParams.current);
    }
    return handleChangeParams(params);
  };

  useEffect(() => {
    if(firstRequest) {
      oldParams.current = initParams;
      handleChangeParams(initParams);
    }
  }, []);
  
  return [result.data, result.error, result.loading, run, mutate];
}