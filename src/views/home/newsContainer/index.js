import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createRefetchContainer, graphql } from 'react-relay';
import setMenuState from 'store/redux/actions/menu';
import store from 'store';
import NewItem from './newItem';
import styles from './styles.scss';

type Props = {
  viewer: Object,
};

class NewsContainer extends Component {
  props: Props;
  state={};

  handleClick() {
    
  }

  render() {
    const { viewer } = this.props;
    if (!viewer) {
      return null;
    }
    const { news } = viewer;

    return (
      <div className={styles.newsWrapper}>
        <div className={styles.title}>
          <div className={styles.titleText}>
            {'最新资讯'}
          </div>
          <div
            className={styles.titleAction}
            onClick={() => {
              setTimeout(() => {
                store.dispatch(setMenuState('news'));
                console.log(store.getState());
              }, 3000);
              console.log(store.getState());
              this.context.router.push({
                pathname: `/news`,
              });
            }}
          >{'更多'}</div>
        </div>
        {
          news.edges.map(({ node }) => <NewItem key={node.id} node={node} />)
        }
      </div>
    );
  }
}

NewsContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

const NewsContainerWithFragmentContainer = createRefetchContainer(
  NewsContainer,
  {
    viewer: graphql`
      fragment newsContainer_viewer on Viewer @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
      ) {
        news(first: $first) {
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
);
  
export default NewsContainerWithFragmentContainer;