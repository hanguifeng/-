import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import GoodsContainer from './goodsContainer';
import NewsContainer from './newsContainer';

type Props = {
  viewer: Object,
};

class Home extends Component {
  props: Props;
  state = {};

  render() {
    const { viewer } = this.props;
    if (!viewer) {
      return null;
    }

    return (
      <div>
        <NewsContainer viewer={viewer}/>
        <GoodsContainer viewer={viewer}/>
      </div>
    );
  }
}

const HomeWithFragmentContainer = createFragmentContainer(
  Home,
  {
    viewer: graphql`
      fragment home_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        from: { type: "Int", defaultValue: 0 }
      ) {
        ...goodsContainer_viewer
        ...newsContainer_viewer
      }
    `,
  },
);

export default HomeWithFragmentContainer;