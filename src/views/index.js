import React from 'react'
import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route,
} from 'found';
import App from './app';
import Login from './login';

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={App}>
      <Route path="login" Component={Login} />
    </Route>
  )
});

export default BrowserRouter;