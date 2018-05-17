import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import styles from './styles.scss';

type Props = {
  node: Object,
};

class GoodsItem extends Component {
  props: Props;
  state={};

  onClick = () => {
    const { node } = this.props;
    this.context.router.push({
      pathname: `/goods/digitalProduct/${node.id}/${store.getState().loginReducer.userID || ""}/detail`,
    });
  }

  render() {
    const { node } = this.props;
    const { image, name, price, desc } = node;

    return (
      <div className={styles.itemWrapper} onClick={this.onClick}>
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

GoodsItem.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default GoodsItem;
