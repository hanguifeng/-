import React, { Component } from 'react';
import { Pagination } from 'components';
import { createRefetchContainer, graphql } from 'react-relay';
import NewItem from '../home/newsContainer/newItem';
import styles from './styles.scss';

type Props = {
  viewer: Object,
  relay: any,
};

class News extends Component {
  props: Props;
  state = {};

  handleChange = (page) => {
    const { relay } = this.props;
    relay.refetch({ first: 20, from: (page - 1) * 10 });
  }

  render() {
    const { viewer } = this.props;
    const { news } = viewer;

    if (!viewer) {
      return null;
    }

    return (
      <div className={styles.newsWrapper}>
        <div className={styles.newsTitle}>
          <div></div>
          <div className={styles.titleLeftText}>{'公益要闻'}</div>
          <div className={styles.titleRightText}>{'NEWS'}</div>
        </div>
        {
          news.edges.map(({ node }) => <NewItem key={node.id} node={node} />)
        }
        <div style={{ padding: '10px 0 30px 0' }}>
          <Pagination
            onChange={this.handleChange}
            defaultPageSize={20}
            total={80}
          />
        </div>
      </div>
    );
  }
}

const NewsWithRefetchContainer = createRefetchContainer(
  News,
  {
    viewer: graphql`
      fragment news_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        from: { type: "Int", defaultValue: 0 }
      ) {
        news(first: $first, from: $from) {
          edges {
            node {
              id
              title
              time
              url
            }
          }
        }
      }
    `,
  },
  graphql`
    query newsRefetchQuery($from: Int, $first: Int) {
      viewer {
        ...news_viewer @arguments(from: $from, first: $first)
      }
    }
  `,
);
  
export default NewsWithRefetchContainer;
