import React from 'react';
import { makeRouteConfig, Route, Redirect } from 'found';
import mainPageRoute from 'src/views';
import { relayRender } from 'routes/relayRender';
import App from 'views/app';

const routeConfig = makeRouteConfig(
  <Route path="/">
    {/* <Redirect to="/cooperate/productOrders" /> */}
    {mainPageRoute}
  </Route>,
);

export default routeConfig;
