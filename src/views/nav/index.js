import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import setMenuState from 'store/redux/actions/menu';
import store from 'store';
import './styles.scss';

type Props = {};

class Nav extends Component {
  props: Props
  state = {};

  handleClick = (e) => {
    store.dispatch(setMenuState(e.key));
    this.context.router.push({
      pathname: `/${e.key}`,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[store.getState().menuReducer.key || 'home']}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Icon type="mail" />首页
        </Menu.Item>
        <Menu.Item key="news">
          <Icon type="appstore"/>最新资讯
        </Menu.Item>
        <Menu.Item key="goods">
        <Icon type="appstore" />爱心义卖
        </Menu.Item>
      </Menu>
    );
  }
}

Nav.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Nav;