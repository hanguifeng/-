import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import Base from './base';
import styles from './styles.scss';

type Props = {
  viewer: Object,
};

class PictureGoods extends Component {
  props: Props;
  state={
    num: 1,
  };

  handleClick = () => {
    const { viewer, relay } = this.props;
    const { pageInfo: { hasNextPage } } = viewer.commodities;
    if (!hasNextPage) {
      this.setState({ num: 1 });
      relay.refetch({ first: 4, from: 0, category: "picture" });
    } else {
      relay.refetch({ first: 4, from: this.state.num * 4, category: "picture" });
      this.setState({ num: this.state.num + 1 });
    }
  }

  render() {
    const { viewer } = this.props;
    if (!viewer) {
      return null;
    }

    return (
      <div className={styles.pictureGoodsContainer}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleText}>{'画作'}</div>
          <div onClick={this.handleClick} className={styles.actionText}>{'换一批'}</div>
        </div>
        <Base commodities={viewer.commodities}/>
      </div>
    );
  }
}

const PictureGoodsWithFragmentContainer = createRefetchContainer(
  PictureGoods,
  {
    viewer: graphql`
      fragment pictureGoods_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 4 }
        from: { type: "Int", defaultValue: 0 }
        category: { type: "String", defaultValue: "picture" }
      ) {
        commodities(category: $category, first: $first, from: $from) {
          pageInfo {
            hasNextPage
          }
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
  graphql`
    query pictureGoodsRefetchQuery($first: Int, $from: Int, $category: String) {
      viewer {
        ...pictureGoods_viewer @arguments(first: $first, from: $from, category: $category)
      }
    }
  `,
);
  
export default PictureGoodsWithFragmentContainer;