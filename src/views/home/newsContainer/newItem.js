import React, { Component } from 'react';
import styles from './styles.scss';

type Props = {
  node: Object,
};

class NewItem extends Component {
  props: Props;
  state = {};

  render() {
    const { node } = this.props;
    const { title, time, url } = node;

    return (
      <div className={styles.newItem}>
        <a className={styles.newTitle} href={`http://www.pubchn.com/${url}`}>{title}</a>
        <div className={styles.newTime}>{time}</div>
      </div>
    );
  }
}

export default NewItem;
