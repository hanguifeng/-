import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import setMenuState from 'store/redux/actions/menu';
import Base from './base';
import styles from './styles.scss';

type Props = {
  viewer: Object,
};

class FurnitureGoods extends Component {
  props: Props;
  state={};

  handleClick = () => {
    const { store } = this.context;
    store.dispatch(setMenuState('goods'));
    this.context.router.push({
      pathname: `/goods/furniture`,
    });
  }

  render() {
    const { viewer } = this.props;
    if (!viewer) {
      return null;
    }

    return (
      <div className={styles.pictureGoodsContainer}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleText}>{'家具'}</div>
          <div onClick={this.handleClick} className={styles.actionText}>{'更多'}</div>
        </div>
        <Base commodities={viewer.furnitureCommodities}/>
      </div>
    );
  }
}

FurnitureGoods.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const FurnitureGoodsWithFragmentContainer = createRefetchContainer(
  FurnitureGoods,
  {
    viewer: graphql`
      fragment furnitureGoods_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 4 }
        category: { type: "String", defaultValue: "furniture" }
      ) {
        furnitureCommodities: commodities(category: $category, first: $first) {
          edges {
            node {
              id
              name
              price
              image
              desc
              category
            }
          }
        }
      }
    `,
  },
);
  
export default FurnitureGoodsWithFragmentContainer;