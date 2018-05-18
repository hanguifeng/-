import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { graphql } from 'react-relay';
import yimai from 'picture/yimai.png';
import { hashPassword } from 'utils/getHash';
import { createQueryRenderer } from 'store/relay';
import { sign_in } from 'store/redux';
import { createTokenMutation } from 'store/relay/mutation';
import store from 'store';
import { sign_out } from 'store/redux';
import Login from './login';
import Register from './register';
import styles from './styles.scss';

type Props = {
  viewer: Object,
  params: {
    userID: String,
  },
};

class PageHeader extends Component {
  state = {
    loginVisible: false,
    registerVisible: false,
  }

  componentWillMount() {
    const nickName1 = localStorage.getItem("user_name");
    const password = localStorage.getItem("token_password");
    if (JSON.parse(nickName1).data && JSON.parse(password).data) {
      const onCompleted = ({ createToken }) => {
        store.dispatch(sign_in(createToken.user.id));
      };
      createTokenMutation({ variables: { nickName: JSON.parse(nickName1).data, password: hashPassword(JSON.parse(password).data) }, onCompleted })();
    }
  }

  handleCancel = (type) => {
    type === 'login' ?
      this.setState({ loginVisible: false })
    : this.setState({ registerVisible: false })
  }
  signOut = () => {
    store.dispatch(sign_out());
  }

  render() {
    const { viewer, variables } = this.props;
    if (!viewer) {
      return null;
    }
    const loginState = store.getState().loginReducer.loginState;
    const user = viewer.user || {};
    const { nickName, accountImage } = user;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={() => {
            this.context.router.push({ pathname: `/${variables.userID}/${viewer.user.accountImage.split('/').join('-')}/userInfo` })
          }}>个人资料</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <span onClick={() => {
            this.context.router.push({ pathname: `/${variables.userID}/${viewer.user.accountImage.split('/').join('-')}/userInfo/purchaseInfo` })
          }}>个人交易信息</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span onClick={() => {console.log(1)}}>我要义卖</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <span onClick={() => {
            this.context.router.push({ pathname: `/${variables.userID}/${viewer.user.accountImage.split('/').join('-')}/userInfo/address` })
          }}>收货地址</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <header>
          {
            !loginState ?
              <div className={styles.topNavigationWrapper}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: 40 }}>
                    <Icon type="notification"></Icon>
                    爱心公告
                  </div>
                  <div>
                    <Icon type="menu-unfold"></Icon>
                    使用帮助
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    className={styles.login}
                    onClick={() => {this.setState({ loginVisible: true })}}
                  >
                    {'登录'}
                  </div>
                  <div
                    className={styles.register}
                    onClick={() => {this.setState({ registerVisible: true })}}
                  >
                    {'注册'}
                  </div>
                </div>
              </div>
            : <div className={styles.topNavigationWrapper1}>
                <div style={{ marginRight: 40, cursor: 'pointer' }}>
                  <Icon type="notification"></Icon>
                  爱心公告
                </div>
                <div style={{ marginRight: 680, cursor: 'pointer' }}>
                  <Icon type="menu-unfold"></Icon>
                  使用帮助
                </div>
                <div style={{ marginRight: 60, cursor: 'pointer' }}>
                  <Icon type="shopping-cart" />
                  购物车
                </div>
                <div style={{ backgroundImage: `url(${accountImage})` }} className={styles.accountImage} />
                <Dropdown overlay={menu} trigger={['click']}>
                  <div onClick={this.onClick} className={styles.userName}>{nickName}</div>
                </Dropdown>
                <div onClick={this.signOut}>
                  {'登出'}
                </div>
              </div>
          }
          <img src={yimai} className={styles.pageHeaderImg} alt={'tp'}/>
        </header>
        <Login visible={this.state.loginVisible} onCancel={this.handleCancel}/>
        <Register visible={this.state.registerVisible} onCancel={this.handleCancel}/>
      </div>
    );
  }
}

PageHeader.contextTypes = {
  router: PropTypes.object.isRequired,
};

const query = graphql`
  query pageHeader_User_Query($userID: String!) {
    viewer {
      id
      user(id: $userID) {
        id
        nickName
        accountImage
      }
    }
  }
`;

const PageHeaderWithQueryRenderer = createQueryRenderer(PageHeader, query);

export default PageHeaderWithQueryRenderer;
