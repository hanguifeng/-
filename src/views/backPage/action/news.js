import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPaginationContainer, graphql } from 'react-relay';
import { Spin } from 'antd';
import styles from './styles.scss';

type Props = {
  viewer: Object,
  relay: any,
};

class News extends Component {
  props: Props;
  state={};

  render() {
    const { viewer, relay } = this.props;
    // if (!viewer) {
    //   return null;
    // }
    // const { commodities } = viewer;

    return (
      <div>
        dsdsa
      </div>
    );
  }
}
News.contextTypes = { router: PropTypes.object.isRequired };
  
export default News;
