import React from 'react';
import { makeRouteConfig, Route } from 'found';
import mainPageRoute from 'src/views';

const routeConfig = makeRouteConfig(
  <Route path="/">
    {mainPageRoute}
  </Route>,
);

export default routeConfig;
