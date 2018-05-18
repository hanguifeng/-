import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { createQueryRenderer } from 'store/relay';
import { Button, Icon, Modal, Select } from 'antd';
import { Message } from 'components';
import store from 'store';
import { borderGrey, sliverGrey, errorRed } from 'styles/color';
import { addPurchaseOrder, addSCC } from 'store/relay/mutation';

type Props = {
  viewer: {},
  params: {
    commodityId: String,
  },
};
const Option = Select.Option;

class GoodsDetail extends Component {
  props: Props;
  state={
    num: 1,
    visible: false,
    visible1: false,
    addressId: '',
  };

  decline = () => {
    if (this.state.num <= 1) {
      return null;
    }
    this.setState({ num: this.state.num - 1 });
  }

  increase = amount => {
    if (this.state.num >= amount) {
      return null;
    }
    this.setState({ num: this.state.num + 1 });
  }

  handleOk = (e) => {
    const { viewer } = this.props;
    const { commodity, addresses } = viewer;
    const { price } = commodity;
    const defaultAddress = addresses.edges.filter(({ node }) => node.isDefault === 'true');
    const userId = store.getState().loginReducer.userID || "";
    const value = {};
    value.isPay = 'false';
    value.userId = userId;
    value.commodityId = this.props.variables.commodityId;
    value.addressId = this.state.addressId || defaultAddress[0].node.id;
    value.amount = this.state.num;
    value.totalPrice = this.state.num * price;
    const onCompleted = () => {
      setTimeout(() => {
        this.setState({ visible: false, visible1: true });
      }, 100);
    };
    addPurchaseOrder({ variables: value, onCompleted })();
  }
  handleOk1 = () => {
    const { viewer } = this.props;
    const { commodity } = viewer;
    const { image } = commodity;
    const userId = store.getState().loginReducer.userID || "";
    this.context.router.push({
      pathname: `/${userId}/${image.split('/').join('-')}/userInfo/purchaseInfo`,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      visible1: false,
    });
  }

  handleChange = (value) => {
    this.setState({ addressId: value.key });
  }

  render() {
    const { viewer } = this.props;
    const { commodity, addresses } = viewer;
    const { id, desc, amount, name, price, image } = commodity;
    const defaultAddress = addresses.edges.filter(({ node }) => node.isDefault === 'true');
    const otherAddress = addresses.edges.filter(({ node }) => node.isDefault === 'false');

    return (
      <div style={{ marginLeft: 220 }}>
        <div style={{ display: 'flex' }}>
          <img style={{ width: 450, height: 335 }} src={image} alt="图片" />
          <div style={{ marginLeft: 20, maxWidth: 500 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{name}</div>
            <div style={{ backgroundColor: '#FFF2E8', padding: '10px 0', marginTop: 20 }}>
              <span style={{ marginRight: 20 }}>价格</span>
              <span style={{ color: '#F40', fontSize:17 }}>{price}</span>
            </div>
            <div style={{ marginTop: 30 }}>
              <span style={{ marginRight: 20 }}>数量</span>
              <Button onClick={this.decline} icon="minus" />
              <span style={{ width: 45, lineHeight: '29px', borderBottom: '1px solid grey', borderTop: '1px solid grey', display: 'inline-flex', justifyContent: 'center' }}>{this.state.num}</span>
              <Button onClick={() => { this.increase(amount) }} icon="plus" />
              <span style={{ marginLeft: 8 }}>件(库存{amount}件)</span>
            </div>
            <div style={{ display: 'flex', marginTop: 40 }}>
              <div style={{ border: `1px solid ${borderGrey}`, backgroundColor: '#FFE4D0', color: errorRed, padding: '12px 35px', marginRight: 20, cursor: 'pointer' }} onClick={() => {this.setState({ visible: true })}}>立即购买</div>
              <div
                style={{ border: `1px solid ${borderGrey}`, backgroundColor: errorRed, color: 'white', padding: '12px 35px', cursor: 'pointer' }}
                onClick={() => {
                  const onCompleted = () => {
                    setTimeout(() => {
                      Message.success('加入购物车成功');
                    }, 100);
                  };
                  addSCC({ variables: { commodityId: id, amount: this.state.num }, onCompleted })();
                }}
              >
                <Icon type={"shopping-cart"} style={{ marginRight: 8 }}></Icon>
                加入购物车
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', borderBottom: `1px solid ${sliverGrey}`, margin: '15px 0 10px 0' }} />
        <div>
          <div style={{ fontSize: 16, marginBottom: 10 }}>商品介绍</div>
          <div>{desc}</div>
        </div>
        <Modal
          title="确认订单信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={'确认订单'}
          cancelText={'取消'}
        >
          <div style={{ display: 'flex', margin: '20px 0 10px 40px' }}>
            <div style={{ marginRight: 20 }}>商品名称</div>
            <div>{name}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: 10, marginLeft: 40 }}>
            <div style={{ marginRight: 20 }}>商品数量</div>
            <div>{this.state.num}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: 10, marginLeft: 40 }}>
            <div style={{ marginRight: 20 }}>商品总价</div>
            <div>{this.state.num * price}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: 30, marginLeft: 40 }}>
            <div style={{ marginRight: 20 }}>收货地址</div>
            <Select onChange={this.handleChange} labelInValue defaultValue={{ key: defaultAddress[0].node.id }} style={{ width: 360 }}>
              {
                defaultAddress.map(n => {
                  return (
                    <Option key={n.node.id} value={n.node.id}>{`${n.node.name} ${n.node.province}${n.node.city}${n.node.block} ${n.node.detailAddress}`}</Option>
                  );
                })
              }
              {
                otherAddress.map(n => {
                  return (
                    <Option key={n.node.id} value={n.node.id}>{`${n.node.name} ${n.node.province}${n.node.city}${n.node.block} ${n.node.detailAddress}`}</Option>
                  );
                })
              }
            </Select>
          </div>
        </Modal>
        <Modal
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel}
          cancelText={'留下继续浏览商品'}
          okText={'好的'}
        >
          <div style={{ display: 'flex', padding: '20px 0 30px 50px' }}>
            <Icon style={{ fontSize: 32, color: 'green' }} type={'check-circle'}></Icon>
            <div style={{ fontSize: 20 }}>下单成功</div>
          </div>
          <div style={{ padding: '0 0 10px 50px' }}>是否去查看订单并支付</div>
        </Modal>
      </div>
    );
  }
}

GoodsDetail.contextTypes = {
  router: PropTypes.object.isRequired,
};

const query = graphql`
  query detail_Commodity_Query($commodityId: String!, $userId: String!) {
    viewer {
      id
      addresses(user_id: $userId) {
        edges {
          node {
            id
            province
            city
            block
            detailAddress
            zipCode
            name
            isDefault
            phoneNumber
          }
        }
      }
      commodity(id: $commodityId) {
        id
        name
        amount
        desc
        image
        price
      }
    }
  }
`;

const GoodsDetailWithQueryRenderer = createQueryRenderer(GoodsDetail, query);

export default GoodsDetailWithQueryRenderer;
