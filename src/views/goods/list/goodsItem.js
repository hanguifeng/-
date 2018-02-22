import React, { Component } from 'react';
import styles from './styles.scss';

type Props = {
  node: Object,
};

class GoodsItem extends Component {
  props: Props;
  state={};

  render() {
    const { node } = this.props;
    const { image, name, price, desc } = node;

    return (
      <div className={styles.itemWrapper}>
        <img className={styles.pictureImg} src={image} alt={name} />
        <div>
          <div className={styles.pictureName}>{name}</div>
          <div style={{ margin: '5px 0' }}>{`￥${price}`}</div>
        </div>
        <div className={styles.pictureDesc}>{desc}</div>
      </div>
    );
  }
}

export default GoodsItem;
