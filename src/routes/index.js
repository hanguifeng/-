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
    renderPending: props => {
      return (
        <div style={containerStyle}>
          <Spin size="large" style={childrenStyle} />
        </div>
      );
    },
    renderReady: (props: { elements: any }) => {
      const { elements } = props;      
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
