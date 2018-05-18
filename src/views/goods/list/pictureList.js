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

class PictureList extends Component {
  props: Props;
  state={
    commodities: '',
  };

  loadMore = () => {
    const { relay } = this.props;
    if (!relay.hasMore() || relay.isLoading()) {
      return;
    }
    setTimeout(() => {
      relay.loadMore();
    }, 1500);
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
    const _commodities = this.state.commodities || commodities.edges;

    return (
      <div className={styles.wrapper}>
        <Search
          placeholder="请输入商品名称"
          onSearch={value => {
            const findBySearch = commodities.edges.filter(({ node }) => {
              return node.name.indexOf(value) !== -1;
            });
            if (!value) {
              this.setState({ commodities: '' });
            }
            this.setState({ commodities: findBySearch });
            this.props.relay.refetchConnection(
            10,
            () => { console.log('Refetch done') },
            {
              category: 'picture',
              first: 10,
              search: value,
            });
          }}
          enterButton
          style={{ width: 320, marginLeft: 800, margin: '9px 0 17px 600px' }}
        />
        {
          _commodities.map(({ node }) => {
            return <GoodsItem key={node.id} node={node} />
          })
        }
        {
          !relay.hasMore() ? <div className={styles.bottomText}>{'没有更多了'}</div> : null
        }
        {
          relay.hasMore()
            ? <div style={{ margin: '10px auto 30px auto' }}>
              <Spin size="large" />
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
        search: { type: "String", defaultValue: "" }
        category: { type: "String", defaultValue: "picture" }
      ) {
        commodities(first: $first, after: $after, category: $category, search: $search)
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
        category: "picture",
        search: "",
      };
    },
    query: graphql`
      query pictureListPaginationQuery($category: String, $first: Int, $after: String, $search: String) {
        viewer {
          ...pictureList_viewer @arguments(category: $category, first: $first, after: $after, search: $search)
        }
      }
    `,
  },
);
  
export default PictureListWithPaginationContainer;
