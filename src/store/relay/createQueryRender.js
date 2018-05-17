import React from 'react';
import { message, Spin } from 'antd';
import { QueryRenderer } from 'react-relay';
import { errorsHandle } from 'src/utils/errorHandle';
import defaultEnvironment from './environment';

const defaultRender = (Component, extraProps) => {
  return (myProps: { errors: any, props: any }) => {
    const { errors, props } = myProps;
    if (errors) {
      errorsHandle(errors, err => {
        message.error(err && err.message);
      });
      return null;
    }
    if (props) {
      return <Component {...props} {...extraProps} />;
    }

    return (
      <div style={{ textAlign: 'center', height: 100, lineHeight: '100px' }}>
        <Spin size="large" />
      </div>
    );
  };
};

const createQueryRenderer = (Component, query, defaultVaribles) => {
  if (!Component) {
    throw new Error('Component参数是createQueryRenderer函数必须的参数');
  }
  if (!query) {
    throw new Error('query参数是createQueryRenderer函数必须的参数');
  }
  return (props: { params: {}, environment: {} }) => {
    const { params, environment, ...rest } = props;

    return (
      <QueryRenderer
        variables={{ ...defaultVaribles, ...params }}
        query={query}
        render={defaultRender(
          Component,
          { variables: { ...defaultVaribles, ...params }, ...rest },
        )}
        environment={environment || defaultEnvironment}
      />
    );
  };
};

export default createQueryRenderer;
