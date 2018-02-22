import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

type Props = {
  children: React.node,
};

class Goods extends Component {
  props: Props;
  state = {
    category: 'picture',
  };

  handleClick = (category) => {
    this.setState({ category })
    this.context.router.push({
      pathname: `/goods/${category}`,
    });
  }

  render() {
    const { children } = this.props;
    const { category } = this.state;

    return (
      <div className={styles.goodsWrapper}>
        <ul className={styles.categoryUl}>
          <div className={styles.categoryTitle}>{'商品'}</div>
          <li
            className={category !== 'picture' ? styles.categoryLi : styles.selectedLi}
            onClick={() => {this.handleClick('picture')}}
          >
            {'画作'}
          </li>
          <li
            className={category !== 'digitalProduct' ? styles.categoryLi : styles.selectedLi}
            onClick={() => {this.handleClick('digitalProduct')}}
          >
            {'数码产品'}
          </li>
          <li
            className={category !== 'calligraphy' ? styles.categoryLi : styles.selectedLi}
            onClick={() => {this.handleClick('calligraphy')}}
          >
            {'书法作品'}
          </li>
          <li
            className={category !== 'furniture' ? styles.categoryLi : styles.selectedLi}
            onClick={() => {this.handleClick('furniture')}}
          >
            {'家具'}
          </li>
        </ul>
        <div>
          {
            children
          }
        </div>
      </div>
    );
  }
}

Goods.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Goods;
