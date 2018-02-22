import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PictureGoods from './goods/pictureGoods';
import DigitalGoods from './goods/digitalGoods';
import CalligraphyGoods from './goods/calligraphyGoods';
import FurnitureGoods from './goods/furnitureGoods';

type Props = {
  viewer: {}
};

class GoodsContainer extends Component {
  props: Props;
  state={};

  render() {
    const { viewer } = this.props;
    if (!viewer) {
      return null;
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <PictureGoods viewer={viewer} />
        <div style={{ marginLeft: 10 }}>
          <DigitalGoods viewer={viewer} />
        </div>
        <CalligraphyGoods viewer={viewer} />
        <div style={{ marginLeft: 10 }}>
          <FurnitureGoods viewer={viewer} />
        </div>
      </div>
    );
  }
}

const GoodsContainerWithFragmentContainer = createFragmentContainer(
  GoodsContainer,
  {
    viewer: graphql`
      fragment goodsContainer_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
      ) {
        ...pictureGoods_viewer
        ...digitalGoods_viewer
        ...calligraphyGoods_viewer
        ...furnitureGoods_viewer
      }
    `,
  },
);

export default GoodsContainerWithFragmentContainer;