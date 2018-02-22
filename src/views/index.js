import React from 'react';
import { graphql } from 'react-relay';
import {
  Route,
  Redirect,
} from 'found';
import { relayRender } from 'routes/relayRender';
import goodsRouter from './goods/routes';
import App from './app';
import Home from './home';
import News from './news';

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

const mainPageRoute = [
  <Route key="App" Component={App} render={relayRender(App)} >
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
  </Route>,
];

export default mainPageRoute;