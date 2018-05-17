import React, { Component } from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import { Spin, Input } from 'antd';
import GoodsItem from './goodsItem';
import styles from './styles.scss';

type Props = {
  viewer: Object,
  relay: any,
};
const Search = Input.Search;

class DigitalProductList extends Component {
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
        <Search
          placeholder="请输入商品名称"
          onSearch={value => {
            this.setState({ search: value });
          }}
          enterButton
          style={{ width: 320, marginLeft: 800, margin: '9px 0 17px 600px' }}
        />
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

const DigitalProductListWithPaginationContainer = createPaginationContainer(
  DigitalProductList,
  {
    viewer: graphql`
      fragment digitalProductList_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String" }
        category: { type: "String", defaultValue: "digitalProduct" }
      ) {
        commodities(first: $first, after: $after, category: $category)
          @connection(key: "digitalProductList_commodities", filters: []) {
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
        category: "digitalProduct"
      };
    },
    query: graphql`
      query digitalProductListPaginationQuery($category: String, $first: Int, $after: String) {
        viewer {
          ...digitalProductList_viewer @arguments(category: $category, first: $first, after: $after)
        }
      }
    `,
  },
);
  
export default DigitalProductListWithPaginationContainer;
