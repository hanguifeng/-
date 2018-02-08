import React from 'react';
import { Provider } from 'react-redux';
import { Spin, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Actions as FarceActions } from 'farce';
import { createRender, createConnectedRouter, ElementsRenderer } from 'found';
import { Resolver } from 'found-relay';
import environment from 'store/relay/environment';
import store from 'src/store';

moment.locale('zh-cn');

// 居中样式
const containerStyle = {
  textAlign: 'center',
  height: '100%',
  width: '100%',
  display: 'flex',
  jusitfyContent: 'space-around',
};
const childrenStyle = {
  fontSize: 40,
  width: '100%',
  alignSelf: 'center',
};

store.dispatch(FarceActions.init());

const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError: (props: { error: {}, router: {} }) => {
      const { error, router } = props;
      // global.log('routes: renderError', props);
      // 如果路由没有匹配会进入renderError 且error.status = 404
      if (error && error.status === 404) {
        router.replace('/');
      }
      return (
        <div style={containerStyle}>
          {error && error.status === 404 ? (
            <div style={childrenStyle}> {'页面不存在'} </div>
          ) : (
            <span style={childrenStyle}>{error.status}</span>
          )}
        </div>
      );
    },
    renderPending: props => {
      // global.log('routes: renderPending', props);
      return (
        <div style={containerStyle}>
          <Spin size="large" style={childrenStyle} />
        </div>
      );
    },
    renderReady: (props: { elements: any }) => {
      // global.log('routes: renderReady', props);
      const { elements } = props;
      console.log(elements);
      return <ElementsRenderer elements={elements} />;
    },
  }),
});

export default () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <ConnectedRouter resolver={new Resolver(environment)} />
    </Provider>
  </LocaleProvider>
);
