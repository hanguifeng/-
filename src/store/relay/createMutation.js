import { commitMutation } from 'react-relay';
import { errorsHandle, errorHandle } from 'src/utils/errorHandle';
import defaultEnvironment from './environment';

// 统一报错
const checkNecessaryParam = (configName, value) => {
  if (!value) {
    throw new Error(`createMutation需要${configName}，却得到了${value}`);
  }
};

// 对variables的格式进行处理
const formatVariables = variables => {
  if (variables && variables.input) {
    return variables;
  }
  if (variables && !variables.input) {
    return {
      input: {
        ...variables,
      },
    };
  }
  return variables;
};

// 获取relay mutation的基本设置
const getBaseConfigs = (mutationParams, resolve, reject) => {
  const {
    variables,
    mutation,
    onCompleted: extraOnCompleted,
    onError: extraOnError,
    optimisticResponse,
    optimisticUpdater,
    updater,
    configs,
  } = mutationParams;
  checkNecessaryParam('mutation', mutation);
  checkNecessaryParam('variables', variables);
  const _variables = formatVariables(variables);
  return {
    // 必填参数
    variables: _variables,
    mutation,
    // onCompleted, onError处理函数，可传可不传
    onCompleted: (response, errors) => {
      // 对错误进行处理
      if (errors && errors.length) {
        errorsHandle(errors, err => {
          console.log(`mutation错误处理:${err && err.message}`);
        });
        reject(errors);
      }
      if (extraOnCompleted) {
        extraOnCompleted(response, errors);
      }
      console.log('mutation completed');
      resolve(true);
    },
    onError: error => {
      if (extraOnError) {
        extraOnError(error);
      } else {
        errorHandle(error, err => {
          console.log(`mutation错误处理:${err && err.message}`);
        });
      }
      reject(error);
    },
    // relay可选参数，当前不提供默认值
    optimisticResponse,
    optimisticUpdater,
    updater,
    configs,
  };
};

const createMutation = (mutationParams, environment = defaultEnvironment) => {
  return () =>
    new Promise((resolve, reject) => {
      const baseConfigs = getBaseConfigs(mutationParams, resolve, reject);
      commitMutation(environment, baseConfigs);
    });
};

export default createMutation;
