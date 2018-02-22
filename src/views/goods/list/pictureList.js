import React, { Component } from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import { Spin } from 'antd';
import GoodsItem from './goodsItem';
import styles from './styles.scss';

type Props = {
  viewer: Object,
  relay: any,
};

class PictureList extends Component {
  props: Props;
  state={};

  loadMore = () => {
    const { relay } = this.props;
    if (!relay.hasMore() || relay.isLoading()) {
      return;
    }
    relay.loadMore();
  }

  render() {
    const { viewer, relay } = this.props;
    if (!viewer) {
      return null;
    }
    const { commodities } = viewer;
    window.onscroll = () => {
      if (document.body.scrollHeight === Math.floor(document.body.clientHeight + (document.body.scrollTop + document.documentElement.scrollTop))) {
        this.loadMore();
      }
    }

    return (
      <div className={styles.wrapper}>
        {
          commodities.edges.map(({ node }) => {
            return <GoodsItem key={node.id} node={node} />
          })
        }
        {
          !relay.hasMore() ? <div className={styles.bottomText}>{'没有更多了'}</div> : null
        }
        {
          relay.isLoading() && relay.hasMore() ?
            <div style={{ margin: '0 auto' }}>
              <Spin />
            </div>
          : null
        }
      </div>
    );
  }
}

const PictureListWithPaginationContainer = createPaginationContainer(
  PictureList,
  {
    viewer: graphql`
      fragment pictureList_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String" }
        category: { type: "String", defaultValue: "picture" }
      ) {
        commodities(first: $first, after: $after, category: $category)
          @connection(key: "pictureList_commodities", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
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
  {
    direction: 'forward',
    getVariables(props, {first, after}, fragmentVariables) {
      return {
        first: 10,
        after: props.viewer.commodities.pageInfo.endCursor,
        category: "picture"
      };
    },
    query: graphql`
      query pictureListPaginationQuery($category: String, $first: Int, $after: String) {
        viewer {
          ...pictureList_viewer @arguments(category: $category, first: $first, after: $after)
        }
      }
    `,
  },
);
  
export default PictureListWithPaginationContainer;