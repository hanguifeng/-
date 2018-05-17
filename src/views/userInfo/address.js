import React, { Component } from 'react';
import { Icon, Form, Button, Input, Table, Cascader } from 'antd';
import { graphql } from 'react-relay';
import { createQueryRenderer } from 'store/relay';
import { borderGrey, alertYellow } from 'styles/color';
import { Message } from 'components';
import { updateAddress, addAddress, deleteAddress } from 'store/relay/mutation';

type Props = {
  viewer: any,
  params: {
    userID: String,
    form: any,
  },
};
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 10 },
  },
};
const options = [{
  value: '黑龙江',
  label: '黑龙江',
  children: [{
    value: '哈尔滨',
    label: '哈尔滨',
    children: [{
      value: '道外区',
      label: '道外区',
    },
    {
      value: '道里区',
      label: '道里区',
    },
    {
      value: '香坊区',
      label: '香坊区',
    },
    {
      value: '南岗区',
      label: '南岗区',
    }],
  },{
    value: '大庆',
    label: '大庆',
    children: [{
      value: '萨尔图区',
      label: '萨尔图区',
    },
    {
      value: '龙凤区',
      label: '龙凤区',
    },
    {
      value: '让胡路区',
      label: '让胡路区',
    },
    {
      value: '大同区',
      label: '大同区',
    }],
  }]},{
  value: '上海',
  label: '上海',
  children: [{
    value: '上海市',
    label: '上海市',
    children: [{
      value: '黄浦区',
      label: '黄浦区',
    },{
      value: '徐汇区',
      label: '徐汇区',
    },{
      value: '长宁区',
      label: '长宁区',
    },{
      value: '浦东新区',
      label: '浦东新区',
    },{
      value: '普陀区',
      label: '普陀区',
    }],
  }],
}];

class Address extends Component {
  props: Props;
  state={
    isShow: false,
    action: 'add',
    isDefault: 'false',
    address_id: '',
    addressId: '',
    defaultAddress: {},
    _addresses: {},
  };

  componentWillMount() {
    const { viewer } = this.props;
    const { addresses } = viewer;
    const _addresses = addresses.edges.map(({ node }) => node);
    this.setState({ _addresses });
    _addresses.forEach(n => {
      if (n.isDefault === 'true') {
        this.setState({
          defaultAddress: {
            address_id: n.id,
            province: n.province,
            city: n.city,
            block: n.block,
            detailAddress: n.detailAddress,
            zipCode: n.zipCode,
            phoneNumber: n.phoneNumber,
            name: n.name,
            isDefault: 'false',
          }
        });
      }
    })
  }
  componentWillReceiveProps() {
    const { viewer } = this.props;
    const { addresses } = viewer;
    const _addresses = addresses.edges.map(({ node }) => node);
    _addresses.forEach(n => {
      if (n.isDefault === 'true') {
        this.setState({
          defaultAddress: {
            address_id: n.id,
            province: n.province,
            city: n.city,
            block: n.block,
            detailAddress: n.detailAddress,
            zipCode: n.zipCode,
            phoneNumber: n.phoneNumber,
            name: n.name,
            isDefault: 'false',
          }
        });
      }
    })
  }

  handleSubmit = () => {
    const { form } = this.props;
    const { getFieldsValue } = form;
    const value = getFieldsValue();
    const province = value.address[0];
    const city = value.address[1];
    const block = value.address[2];
    value.province = province;
    value.city = city;
    value.block = block;
    value.isDefault = this.state.isDefault;
    value.address_id = this.state.address_id;
    delete value.address;
    if (this.state.action === 'edit') {
      const onCompleted = () => {
        setTimeout(() => {
          Message.success('修改地址成功');
          this.setState({ visible: false });
        }, 100);
      };
      updateAddress({ variables: value, onCompleted })();
    } else {
      value.user_id = this.props.variables.userId;
      delete value.address_id;
      const address1 = this.state._addresses;
      address1[this.state._addresses.length] = {
        id: this.state.address_id,
        province: province,
        city: city,
        block: block,
        isDefault: value.isDefault = this.state.isDefault,
        zipCode: value.zipCode,
        name: value.name,
        defaultAddress: value.defaultAddress,
        phoneNumber: value.phoneNumber,
      };
      this.setState({
        _addresses: address1
      });
      Message.success('新增地址成功');
      addAddress({ variables: value })();
    }
  }

  getColumns = () => {
    const columns = [
      {
        title: '收货人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所在地区',
        dataIndex: 'province',
        key: 'province',
        render: (province, record) => {
          return <div>{`${province ? province + '/' : ''}${record.city}/${record.block}`}</div>
        }
      },
      {
        title: '详细地址',
        dataIndex: 'detailAddress',
        key: 'detailAddress',
      },
      {
        title: '邮编',
        dataIndex: 'zipCode',
        key: 'zipCode',
      },
      {
        title: '电话/手机',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (name, record) => {
          return (
            <div
              style={{ display: 'flex', height: 30, alignItems: 'center' }}
              onMouseOver={
                record.isDefault === 'false' ?
                  () => {
                    this.setState({ isShow: true, addressId: record.id });
                  }
                : null
              }
              onMouseLeave={
                record.isDefault === 'false' ?
                  () => {this.setState({ isShow: false })}
                : null
              }
            >
              <div style={{ color: '#36c', cursor: 'pointer' }} onClick={() => {
                const { form } = this.props;
                const { setFieldsValue } = form;
                this.setState({ action: 'edit', isDefault: record.isDefault, address_id: record.id });
                const value = {
                  address: [record.province, record.city, record.block],
                  detailAddress: record.detailAddress,
                  zipCode: record.zipCode,
                  phoneNumber: record.phoneNumber,
                  name: record.name,
                };
                setFieldsValue(value);
              }}>修改</div>
              <div style={{ margin: '0 5px' }}>|</div>
              <div
                style={{ color: '#36c', cursor: 'pointer' }}
                onClick={() => {
                  const onCompleted = () => {
                    setTimeout(() => {
                      Message.success('删除地址成功');
                      this.setState({ visible: false });
                    }, 100);
                  };
                  console.log(this.state._addresses.filter(n => n.id !== record.id));
                  this.setState({
                    _addresses: this.state._addresses.filter(n => n.id !== record.id)
                  });
                  deleteAddress({variables: { address_id: record.id }, onCompleted})();
                }}
              >
                删除
              </div>
              {
                record.isDefault === 'true' ?
                  <div style={{ cursor: 'pointer', marginLeft: 20, padding: '2px 5px', backgroundColor: '#ffd6cc', borderRadius: 3, border: '1px solid #ff3800', color: '#f30' }}>默认地址</div>
                : this.state.isShow && record.id === this.state.addressId ?
                  <div
                    style={{ cursor: 'pointer', marginLeft: 20, padding: '2px 5px', backgroundColor: '#f60', borderRadius: 3, border: '1px solid #f60', color: 'white' }}
                    onClick={() => {
                      const value = {
                        province: record.province,
                        city: record.city,
                        block: record.block,
                        detailAddress: record.detailAddress,
                        zipCode: record.zipCode,
                        phoneNumber: record.phoneNumber,
                        name: record.name,
                        isDefault: 'true',
                        address_id: record.id,
                      };
                      const onCompleted = () => {
                        setTimeout(() => {
                          Message.success('设置默认地址成功');
                          this.setState({ visible: false });
                        }, 100);
                      };
                      updateAddress({ variables: value, onCompleted })();
                      updateAddress({ variables: this.state.defaultAddress })();
                    }}
                  >
                    设为默认
                  </div>
                  : null
              }
            </div>
          );
        },
      },
    ];
    return columns;
  }

  render() {
    const { form, viewer } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { addresses } = viewer;
    console.log(this.state._addresses);

    return (
      <div style={{ width: 950, border: `1px ${borderGrey} solid`, padding: 20, marginBottom: 100 }}>
        <div
          style={{
            fontSize: 14,
            color: '#014d7f',
            backgroundColor: '#f3f8fe',
            height: 30,
            lineHeight: '30px',
            paddingLeft: 20,
        }}>
          { this.state.action === 'add' ? '新增' : '修改' }收货地址
          {
            this.state.action === 'edit' ? 
              <Button
                style={{ width: 80, height: 20, fontSize: 12, padding: 0, marginLeft: 20 }}
                onClick={
                  () => {
                    this.setState({ action: 'add' });
                    setFieldsValue({
                      address: [],
                      zipCode: '',
                      phoneNumber: '',
                      name: '',
                      detailAddress: '',
                    });
                  }
                }
              >新增收货地址</Button>
            : null
          }
        </div>
        <Form>
          <div style={{marginTop: 30 }}>
            <FormItem
              label="所在地区"
              {...formItemLayout}
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: '请选择省市区',
                }],
              })(
                <Cascader options={options} placeholder="请选择省市区" />
              )}
            </FormItem>
          </div>
          <FormItem
            label="详细地址"
            {...formItemLayout}
          >
            {getFieldDecorator('detailAddress', {
              rules: [{
                required: true, message: '请输入详细地址',
              }],
            })(
              <Input.TextArea placeholder={"建议您如何填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"} />
            )}
          </FormItem>
          <FormItem
            label="邮政编码"
            {...formItemLayout}
          >
            {getFieldDecorator('zipCode', {
              rules: [{
                required: true, message: '请输入邮政编码',
              }],
            })(
              <Input maxLength="11" placeholder={"如您不清楚邮递区号，请填写000000"} />
            )}
          </FormItem>
          <FormItem
            label="收货人姓名"
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入收货人姓名',
              }],
            })(
              <Input maxLength="11" />
            )}
          </FormItem>
          <FormItem
            label="手机号码"
            {...formItemLayout}
          >
            {getFieldDecorator('phoneNumber', {
              rules: [{
                required: true, message: '请输入手机号码',
              }],
            })(
              <Input maxLength="11" />
            )}
          </FormItem>
          <FormItem>
            <Button onClick={this.handleSubmit} style={{ margin: '30px 0 80px -54px', width: 100, height: 32, backgroundColor: alertYellow, color: 'white' }}>保存</Button>
          </FormItem>
        </Form>
        <div style={{ height: 21, fontWeight: 700, color: '#fc6210', margin: '15px 0' }}>{`以保存了${addresses.edges.length}条地址，还能保存${10 - addresses.edges.length}条地址`}</div>
        <div style={{ border: '1px solid #e7e7e7', marginBottom: 50 }}>
          <Table pagination={false} dataSource={this.state._addresses} columns={this.getColumns()} />
        </div>
      </div>
    );
  }
}

const query = graphql`
  query address_User_Query($userId: String!) {
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
    }
  }
`;

const AddressWithQueryRenderer = createQueryRenderer(Form.create()(Address), query);

export default AddressWithQueryRenderer;
