import React, { Component } from 'react';
import styles from './styles.scss';

type Props = {
  commodities: Object,
};

class Base extends Component {
  props: Props;
  state={};

  render() {
    const { commodities } = this.props;
    if (!commodities) {
      return null;
    }

    return (
      <div>
        <div className={styles.goodsWrapper}>
          {
            commodities.edges.map(({ node }) => {
              return (
                <div key={node.id} style = {{ paddingBottom: 15 }}>
                  <img className={styles.imageSize} src={node.image} alt={'img'} />
                  <div className={styles.goodName}>{node.name}</div>
                  <div className={styles.goodsDesc}>{node.desc}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Base;
