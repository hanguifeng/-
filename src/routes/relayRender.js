import React from 'react';
import { Spin } from 'antd';
import { errorFormat } from 'src/utils/errorHandle';

// 居中样式
const containerStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  height: 300,
  margin: 'auto',
};
const childrenStyle = {
  textAlign: 'center',
  margin: 'auto',
};

export const relayRender = () => {
  return a => {
    const { error, props, Component } = a;
    console.log(props);
    if (error) {
      // 对错误进行格式化处理
      const _error = errorFormat(error);
      if (_error) {
        global.log.error('relayRenderError:', error, _error);
        // 如果有error.message;
        if (_error.message) {
          return (
            <div style={containerStyle}>
              <div style={childrenStyle}>
                <pre>{_error.message}</pre>
              </div>
            </div>
          );
        }
        // 如果没有error.message
        if (!_error.message) {
          return (
            <div style={containerStyle}>
              <div style={childrenStyle}>出未知错误</div>
            </div>
          );
        }
      }
    }
    if (props) {
      return <Component {...props} />;
    }
    return (
      <div style={containerStyle}>
        <div style={childrenStyle}>
          <Spin size="large" />
        </div>
      </div>
    );
  };
};

export const genPrepareParams = () => (params, { location }) => Object.assign({}, params, location.query);
