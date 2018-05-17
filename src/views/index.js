import React from 'react';
import { graphql } from 'react-relay';
import {
  Route,
  Redirect,
} from 'found';
import { relayRender } from 'routes/relayRender';
import goodsRouter from './goods/routes';
import backPageRouter from './backPage/routes';
import App from './app';
import BackPage from './backPage';
import Home from './home';
import News from './news';
import BackPageLogin from './backPage/login';
import UserInfo from './userInfo';
import DetailInfo from './userInfo/detailInfo';
import Address from './userInfo/address';
import PurchaseInfo from './userInfo/purchaseInfo';

const homeQuery = graphql`
  query views_home_Query {
    viewer {
      ...home_viewer
    }
  }
`;
const newsQuery = graphql`
  query views_news_Query {
    viewer {
      ...news_viewer
    }
  }
`;

const isFront = true;
const mainPageRoute = isFront ? [
  <Route key="App" Component={App} render={relayRender(App)}>
    <Redirect to="/home" />
    <Route
      path="home"
      key="home"
      Component={Home}
      render={relayRender(Home)}
      query={homeQuery}
    />
    <Route
      path="news"
      key="news"
      Component={News}
      render={relayRender(News)}
      query={newsQuery}
    />
    {
      goodsRouter
    }
    <Route path=":userId/:image/userInfo" key="userInfo" Component={UserInfo}>
      <Redirect to="/:userId/:image/userInfo/detailInfo" />
      <Route
        path="detailInfo"
        key="detailInfo"
        Component={DetailInfo}
      />
      <Route
        path="address"
        key="address"
        Component={Address}
      />
      <Route
        path="purchaseInfo"
        key="purchaseInfo"
        Component={PurchaseInfo}
      />
    </Route>
  </Route>,
] : [
  <Route key="login" Component={BackPageLogin} />,
  <Route key="backpage" path="backpage" Component={BackPage} render={relayRender(BackPage)}>
    {
      backPageRouter
    }
  </Route>,
];

export default mainPageRoute;