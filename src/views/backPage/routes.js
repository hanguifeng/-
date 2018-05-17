import React from 'react';
import { graphql } from 'react-relay';
import { Route, Redirect } from 'found';
import { relayRender } from 'routes/relayRender';
import News from './action/news';

const router = [
  <Route
    path="newsManager"
    key="newsManager"
    Component={News}
    // render={relayRender(News)}
    // query={NewsQuery}
  />,
];

export default router;
