import React from 'react';
import { graphql } from 'react-relay';
import { Route, Redirect } from 'found';
import { relayRender } from 'routes/relayRender';
import Goods from './index';
import PictureList from './list/pictureList';
import FurnitureList from './list/furnitureList';
import DigitalProductList from './list/digitalProductList';
import CalligraphyList from './list/calligraphyList';

const pictureListQuery = graphql`
  query routes_pictureList_Query {
    viewer {
        ...pictureList_viewer
    }
  }
`;
const furnitureListQuery = graphql`
  query routes_furnitureList_Query {
    viewer {
        ...furnitureList_viewer
    }
  }
`;
const digitalProductListQuery = graphql`
  query routes_digitalProductList_Query {
    viewer {
        ...digitalProductList_viewer
    }
  }
`;
const calligraphyListQuery = graphql`
  query routes_calligraphyList_Query {
    viewer {
        ...calligraphyList_viewer
    }
  }
`;

const router = [
  <Route path="goods" key="goods" Component={Goods}>
    <Redirect to="/goods/picture" />
    <Route
      path="picture"
      key="picture"
      Component={PictureList}
      render={relayRender(PictureList)}
      query={pictureListQuery}
    />,
    <Route
      path="furniture"
      key="furniture"
      Component={FurnitureList}
      render={relayRender(FurnitureList)}
      query={furnitureListQuery}
    />,
    <Route
      path="digitalProduct"
      key="digitalProduct"
      Component={DigitalProductList}
      render={relayRender(DigitalProductList)}
      query={digitalProductListQuery}
    />,
    <Route
      path="calligraphy"
      key="calligraphy"
      Component={CalligraphyList}
      render={relayRender(CalligraphyList)}
      query={calligraphyListQuery}
    />,
  </Route>
];

export default router;
