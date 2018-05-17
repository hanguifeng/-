import React, { Component } from 'react';
import moment from 'moment';
import { Tabs, Table } from 'antd';
import { graphql } from 'react-relay';
import { createQueryRenderer } from 'store/relay';
import { Message } from 'components';
import { borderGrey, backgroundGrey } from 'styles/color';
import { updatePurchaseOrderPay } from 'store/relay/mutation';

type Props = {
  viewer: any,
  params: {
    userID: String,
    form: any,
  },
};
const TabPane = Tabs.TabPane;

class PurchaseInfo extends Component {
  props: Props;
  state={
    isShow: false,
  };

  getColumns = () => {
    const columns = [
      {
        title: '商品',
        dataIndex: 'commoditiyName',
        key: 'commoditiyName',
        render: (commoditiyName, record) => {
          return (
            <div style={{ maxWidth: 156 }}>
              <img style={{ width: 150, height: 100 }} src={record.commoditiyImage} alt={''} />
              <div>{commoditiyName}</div>
            </div>
          );
        }
      },
      {
        title: '单价',
        dataIndex: 'totalPrice',
        key: 'name1',
        render: (name, record) => <div>{record.commoditiyPrice}</div>
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '总价',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
      },
      {
        title: '状态',
        dataIndex: 'isPay',
        key: 'isPay',
        render: (isPay, record) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{isPay === 'true' || isPay === null ? '已支付' : '未支付'}</div>
            {
              isPay === 'false' ?
                <div
                  style={{ cursor: 'pointer', marginLeft: 20, padding: '2px 5px', backgroundColor: '#ffd6cc', borderRadius: 3, border: '1px solid #ff3800', color: '#f30' }}
                  onClick={() => {
                    const onCompleted = () => {
                      setTimeout(() => {
                        Message.success('支付成功');
                        this.setState({ visible: false });
                      }, 100);
                    };
                    updatePurchaseOrderPay({ variables: { isPay: 'true', amount: record.commoditiyAmount - record.amount, commodityId: record.commoditiyId, purchaseOrderId: record.id }, onCompleted })();
                  }}
                >
                  去支付
                </div>
              : null
            }
          </div>
        )
      },
    ];
    return columns;
  }

  render() {
    const { viewer } = this.props;
    const { purchaseOrders } = viewer;
    const _purchaseOrders = purchaseOrders.edges.map(({ node }) => node);
    const payPurchaseOrders = purchaseOrders.edges.filter(({ node }) => node.isPay === 'true');
    const noPayPurchaseOrders = purchaseOrders.edges.filter(({ node }) => node.isPay === 'false');

    return (
      <div style={{ width: 950, border: `1px ${borderGrey} solid`, padding: 20, marginBottom: 100 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="全部订单" key="1">
            {
              purchaseOrders.edges.map(({ node }) => {
                return (
                  <div style={{ border: '1px solid #DDD' }}>
                    <div style={{ backgroundColor: borderGrey, padding: '10px 0 10px 20px', borderBottom: '#DDD' }}>订单信息</div>
                    <div style={{ backgroundColor: backgroundGrey, padding: '5px 0 5px 20px' }}>
                      <div>收货人姓名：{node.name}</div>
                      <div>收货地址：{`${node.province}/${node.city}/${node.detailAddress}`}</div>
                      <div>收货人电话：{node.phoneNumber}</div>
                      <div>邮编：{node.zipCode}</div>
                      <div>订单创建时间：{moment(node.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>
                      <Table pagination={false} dataSource={[{ ...node }]} columns={this.getColumns()} />
                    </div>
                  </div>
                );
              })
            }
          </TabPane>
          <TabPane tab="已支付订单" key="2">
            {
              payPurchaseOrders.length > 0 ?
                payPurchaseOrders.map(({ node }) => {
                  return (
                    <div style={{ border: '1px solid #DDD' }}>
                      <div style={{ backgroundColor: borderGrey, padding: '10px 0 10px 20px', borderBottom: '#DDD' }}>订单信息</div>
                      <div style={{ backgroundColor: backgroundGrey, padding: '5px 0 5px 20px' }}>
                        <div>收货人姓名：{node.name}</div>
                        <div>收货地址：{`${node.province}/${node.city}/${node.detailAddress}`}</div>
                        <div>收货人电话：{node.phoneNumber}</div>
                        <div>邮编：{node.zipCode}</div>
                        <div>订单创建时间：{moment(node.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>
                        <Table pagination={false} dataSource={[{ ...node }]} columns={this.getColumns()} />
                      </div>
                    </div>
                  );
                })
              : <div style={{ height: 366, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  暂无订单
                </div>
            }
          </TabPane>
          <TabPane tab="未支付订单" key="3">
            {
              noPayPurchaseOrders.length > 0 ?
                noPayPurchaseOrders.map(({ node }) => {
                  return (
                    <div style={{ border: '1px solid #DDD' }}>
                      <div style={{ backgroundColor: borderGrey, padding: '10px 0 10px 20px', borderBottom: '#DDD' }}>订单信息</div>
                      <div style={{ backgroundColor: backgroundGrey, padding: '5px 0 5px 20px' }}>
                        <div>收货人姓名：{node.name}</div>
                        <div>收货地址：{`${node.province}/${node.city}/${node.detailAddress}`}</div>
                        <div>收货人电话：{node.phoneNumber}</div>
                        <div>邮编：{node.zipCode}</div>
                        <div>订单创建时间：{moment(node.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>
                        <Table pagination={false} dataSource={[{ ...node }]} columns={this.getColumns()} />
                      </div>
                    </div>
                  );
                })
              : <div style={{ height: 366, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  暂无订单
                </div>
            }
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const query = graphql`
  query purchaseInfo_User_Query($userId: String!) {
    viewer {
      id
      purchaseOrders(user_id: $userId) {
        edges {
          node {
            id
            totalPrice
            amount
            province
            isPay
            city
            block
            detailAddress
            name
            phoneNumber
            zipCode
            createdAt
            commoditiyId
            commoditiyAmount
            commoditiyName
            commoditiyPrice
            commoditiyImage
          }
        }
      }
    }
  }
`;

const PurchaseInfoWithQueryRenderer = createQueryRenderer(PurchaseInfo, query);

export default PurchaseInfoWithQueryRenderer;
