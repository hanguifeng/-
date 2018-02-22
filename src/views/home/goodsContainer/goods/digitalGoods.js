import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import store from 'store';
import setMenuState from 'store/redux/actions/menu';
import Base from './base';
import styles from './styles.scss';

type Props = {
  viewer: Object,
};

class DigitalGoods extends Component {
  props: Props;
  state={};

  handleClick = () => {
    store.dispatch(setMenuState('goods'));
    this.context.router.push({
      pathname: `/goods/digitalProduct`,
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
          <div className={styles.titleText}>{'数码产品'}</div>
          <div onClick={this.handleClick} className={styles.actionText}>{'更多'}</div>
        </div>
        <Base commodities={viewer.digitalCommodities}/>
      </div>
    );
  }
}

DigitalGoods.contextTypes = {
  router: PropTypes.object.isRequired,
};

const DigitalGoodsWithFragmentContainer = createRefetchContainer(
  DigitalGoods,
  {
    viewer: graphql`
      fragment digitalGoods_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 6 }
        category: { type: "String", defaultValue: "digitalProduct" }
      ) {
        digitalCommodities: commodities(category: $category, first: $first) {
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
  
export default DigitalGoodsWithFragmentContainer;