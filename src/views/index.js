import React from 'react';
import { graphql } from 'react-relay';
import {
  Route,
} from 'found';
import { relayRender } from 'routes/relayRender';
import App from './app';
import Login from './login';

const loginQuery = graphql`
  query views_login_Query {
    feed {
      ...login_feed
    }
  }
`;

const mainPageRoute = [
  <Route key="app" Component={App} render={relayRender(App)}>
    <Route
      path="login"
      key="login"
      Component={Login}
      render={relayRender(Login)}
      query={loginQuery}
    />
  </Route>
];

export default mainPageRoute;