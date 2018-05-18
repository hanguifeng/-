import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Modal, Select } from 'antd';
import { graphql } from 'react-relay';
import { createQueryRenderer } from 'store/relay';
import { Message } from 'components';
import store from 'store';
import { addPurchaseOrder, deleteSCC } from 'store/relay/mutation';

type Props = {
  viewer: Object,
};
const Option = Select.Option;

class ShoppingCar extends Component {
  state = {
    selectedRows: [],
    shoppingCar: '',
    visible: false,
    addressId: '',
  }

  handleOk = (e) => {
    const { viewer } = this.props;
    const { addresses } = viewer;
    const defaultAddress = addresses.edges.filter(({ node }) => node.isDefault === 'true');
    const userId = store.getState().loginReducer.userID || "";
    const onCompleted = () => {
      setTimeout(() => {
        Message.success('结算成功');
        this.setState({ visible: false });
      }, 100);
    };
    const valueArr = this.state.selectedRows.map(n => {
      const value = {};
      value.commodityId = n.id;
      value.amount = n.amount;
      value.isPay = 'true';
      value.userId = userId;
      value.totalPrice = n.amount * n.price;
      value.addressId = this.state.addressId || defaultAddress[0].node.id;
      return value;
    });
    const { shoppingCar } = viewer;
    const shoppingCar1 = shoppingCar.edges.map(({ node }) => node);
    valueArr.forEach(value => {
      addPurchaseOrder({ variables: value, onCompleted })();
      deleteSCC({ variables: { commodity_id: value.commodityId } })();
      const shoppingCar2 = shoppingCar1.filter(n => n.commodityId !== value.commodityId);
      this.setState({ shoppingCar: shoppingCar2 });
    })
  }

  getColumns = () => {
    const columns = [
      {
        title: '商品信息',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => {
          return (
            <div>
              <img style={{ width: 120, height: 100 }} src={record.image} alt={""} />
              <div style={{ maxWidth: 156 }}>{name}</div>
            </div>
          );
        }
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '金额',
        dataIndex: 'price',
        key: 'price1',
        render: (price, record) => <div>{price * record.amount}</div>
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => {
          return (
            <div
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => {
                const onCompleted = () => {
                  setTimeout(() => {
                    Message.success('删除购物车内商品成功');
                  }, 100);
                };
                const { viewer } = this.props;
                const { shoppingCar } = viewer;
                const shoppingCar1 = shoppingCar.edges.map(({ node }) => node);
                const shoppingCar2 = shoppingCar1.filter(n => n.commodityId !== record.commodityId);
                this.setState({ shoppingCar: shoppingCar2 });
                deleteSCC({ variables: { commodity_id: parseInt(record.commodityId, 10) }, onCompleted })();
              }}
            >
              删除
            </div>
          );
        }
      },
    ];
    return columns;
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

  onClick = () => {
    this.setState({ visible: true });
  }

  render() {
    const { viewer } = this.props;
    console.log(viewer);
    const { shoppingCar, addresses } = viewer;
    const shoppingCar1 = shoppingCar.edges.map(({ node }) => node);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    const defaultAddress = addresses.edges.filter(({ node }) => node.isDefault === 'true');
    const otherAddress = addresses.edges.filter(({ node }) => node.isDefault === 'false');

    return (
      <div style={{ backgroundColor: 'white', width: '100%', padding: 20, marginTop: 20 }}>
        <Table pagination={false} rowSelection={rowSelection} dataSource={this.state.shoppingCar || shoppingCar1} columns={this.getColumns()} />
        <Button onClick={this.onClick} disabled={this.state.selectedRows.length === 0} style={{ marginLeft: 920, marginTop: 30, width: 140, height: 42, backgroundColor: this.state.selectedRows.length > 0 ? '#f40' : 'grey', color: 'white', fontSize: 15, fontWeight: 500 }}>结算</Button>
        <Modal
          title="确认订单信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={'确认订单'}
          cancelText={'取消'}
        >
          {
            this.state.selectedRows.map(n => {
              return (
                <div>
                  <div style={{ display: 'flex', margin: '20px 0 10px 40px' }}>
                    <div style={{ marginRight: 20 }}>商品名称</div>
                    <div>{n.name}</div>
                  </div>
                  <div style={{ display: 'flex', marginBottom: 10, marginLeft: 40 }}>
                    <div style={{ marginRight: 20 }}>商品数量</div>
                    <div>{n.amount}</div>
                  </div>
                  <div style={{ display: 'flex', marginBottom: 10, marginLeft: 40 }}>
                    <div style={{ marginRight: 20 }}>商品总价</div>
                    <div>{n.amount * n.price}</div>
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
                </div>
              );
            })
          }
        </Modal>
      </div>
    );
  }
}

ShoppingCar.contextTypes = {
  router: PropTypes.object.isRequired,
};

const query = graphql`
  query shoppingCar_User_Query($userId: String!) {
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
      shoppingCar {
        edges {
          node {
            id
            name
            price
            image
            amount
            commodityId
          }
        }
      }
    }
  }
`;

const ShoppingCarWithQueryRenderer = createQueryRenderer(ShoppingCar, query);

export default ShoppingCarWithQueryRenderer;
