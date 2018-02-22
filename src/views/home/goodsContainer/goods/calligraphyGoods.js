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

class CalligraphyGoods extends Component {
  props: Props;
  state={};

  handleClick = () => {
    store.dispatch(setMenuState('goods'));
    this.context.router.push({
      pathname: `/goods/calligraphy`,
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
          <div className={styles.titleText}>{'书法作品'}</div>
          <div onClick={this.handleClick} className={styles.actionText}>{'更多'}</div>
        </div>
        <Base commodities={viewer.calligraphyCommodities}/>
      </div>
    );
  }
}

CalligraphyGoods.contextTypes = {
  router: PropTypes.object.isRequired,
};

const CalligraphyGoodsWithFragmentContainer = createRefetchContainer(
  CalligraphyGoods,
  {
    viewer: graphql`
      fragment calligraphyGoods_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 6 }
        category: { type: "String", defaultValue: "calligraphy" }
      ) {
        calligraphyCommodities: commodities(category: $category, first: $first) {
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
  
export default CalligraphyGoodsWithFragmentContainer;