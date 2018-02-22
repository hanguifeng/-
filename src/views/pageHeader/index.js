import React, { Component } from 'react';
import { graphql } from 'react-relay';
import yimai from 'picture/yimai.png';
import { createQueryRenderer } from 'store/relay';
import store from 'store';
import { sign_out } from 'store/redux';
import Login from './login';
import Register from './register';
import styles from './styles.scss';

type Props = {
  viewer: Object,
  variables: {
    userID: String,
  },
};

class PageHeader extends Component {
  state = {
    loginVisible: false,
    registerVisible: false,
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
    const { viewer } = this.props;
    if (!viewer) {
      return null;
    }
    console.log(this.props);
    const loginState = store.getState().loginReducer.loginState;
    const user = viewer.user || {};
    const { nickName, accountImage } = user;
    return (
      <div>
        <header>
          {
            !loginState ?
              <div className={styles.topNavigationWrapper}>
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
            : <div className={styles.topNavigationWrapper}>
                <div style={{ backgroundImage: `url(${accountImage})` }} className={styles.accountImage} />
                <div className={styles.userName}>{nickName}</div>
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
