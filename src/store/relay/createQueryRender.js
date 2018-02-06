// 对relay modern的queryRenderer进行封装
import React from 'react';
import { message, Spin } from 'antd';
import { QueryRenderer } from 'react-relay';
import { errorsHandle } from 'src/utils/errorHandle';
import defaultEnvironment from './environment';

const defaultRender = (Component, extraProps, render) => {
  return (myProps: { errors: any, props: any }) => {
    const { errors, props } = myProps;
    if (errors) {
      errorsHandle(errors, err => {
        message.error(err && err.message);
      });
      return null;
    }
    if (render) {
      return render({ ...props, ...extraProps }, Component);
    }
    if (props) {
      return <Component {...props} {...extraProps} />;
    }
    // 默认必须返回null。防止出现生命周期混乱
    return (
      <div style={{ textAlign: 'center', height: 100, lineHeight: '100px' }}>
        <Spin size="large" />
      </div>
    );
  };
};

const createQueryRenderer = (Component, query, defaultVaribles, render) => {
  if (!Component) {
    throw new Error('Component参数是createQueryRenderer函数必须的参数');
  }
  if (!query) {
    throw new Error('query参数是createQueryRenderer函数必须的参数');
  }
  return (props: { variables: {}, environment: {} }) => {
    const { variables, environment, ...rest } = props;
    return (
      <QueryRenderer
        variables={{ ...defaultVaribles, ...variables }}
        query={query}
        render={defaultRender(
          Component,
          { variables: { ...defaultVaribles, ...variables }, ...rest },
          render,
        )}
        environment={environment || defaultEnvironment}
      />
    );
  };
};

export default createQueryRenderer;
