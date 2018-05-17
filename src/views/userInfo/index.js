import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

type Props = {
  params: {
    userId: String,
    accountImage: String,
  },
  children: ?[React.Element],
};

class UserInfo extends Component {
  props: Props;
  state={
    selected: 1,
  };

  onClick = () => {
    const { params } = this.props;
    const { userId, image } = params;
    console.log(params);
    this.setState({ selected: 1 });
    this.context.router.push({
      pathname: `/${userId}/${image}/userInfo/detailInfo`,
    });
  }

  onClick1 = () => {
    const { params } = this.props;
    const { userId, image } = params;
    this.setState({ selected: 2 });
    this.context.router.push({
      pathname: `/${userId}/${image}/userInfo/purchaseInfo`,
    });
  }

  onClick2 = () => {
    const { params } = this.props;
    const { userId, image } = params;
    this.setState({ selected: 3 });
    this.context.router.push({
      pathname: `/${userId}/${image}/userInfo/address`,
    });
  }

  render() {
    const { params, children } = this.props;
    const { userId, image } = params;
    const _image = image.split('-').join('/');
    const { selected } = this.state;

    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'white', marginTop: 20, paddingTop: 30, display: 'flex' }}>
        <div style={{ margin: '0 30px 100px 30px' }}>
          <img style={{ width: 100, height: 100 }} alt={'我的图片'} src={_image} />
          <div style={{ fontSize: 15, color: '#f40', marginTop: 10 }}>账号管理</div>
          <div style={{ cursor: 'pointer', marginTop: 5, color: selected === 1 ? '#f40' : 'black'  }} onClick={this.onClick}>个人资料</div>
          <div style={{ cursor: 'pointer', marginTop: 5, color: selected === 2 ? '#f40' : 'black' }} onClick={this.onClick1}>个人交易信息</div>
          <div style={{ cursor: 'pointer', marginTop: 5, color: selected === 3 ? '#f40' : 'black' }} onClick={this.onClick2}>收货地址</div>
        </div>
        {children}
      </div>
    );
  }
}

UserInfo.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default UserInfo;
