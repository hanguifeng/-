import React, { Component } from 'react';
import moment from 'moment';
import { Icon, Form, Button, Input, DatePicker, Upload, Radio } from 'antd';
import { graphql } from 'react-relay';
import { createQueryRenderer } from 'store/relay';
import { Message } from 'components';
import { borderGrey, alertYellow } from 'styles/color';
import { updateUser } from 'store/relay/mutation';

type Props = {
  params: {
    userID: String,
    form: any,
  },
};
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
const options = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];
const orderNumberFormat = type => {
  return (rule, value, callback) => {
    const re = /^[\u4e00-\u9fa5a-zA-Z0-9-]+$/;
    if (!re.test(value)) {
      callback(`${type}只能由英文字母、中文、数字、-组成`);
    }
    callback();
  };
};

class DetailInfo extends Component {
  props: Props;
  state={
    selected: 1,
    accountImage: '',
  };

  componentWillMount() {
    const { viewer } = this.props;
    const { user } = viewer;
    const { accountImage } = user;
    this.setState({ accountImage });
  }
  
  componentDidMount() {
    const { viewer } = this.props;
    const { user } = viewer;
    const { sex, phoneNumber, nickName, password, birthday } = user;
    const { form } = this.props;
    const { setFieldsValue } = form;
    setFieldsValue({ sex, phoneNumber, nickName, password, birthday: moment(birthday) });
  }

  handleSubmit = () => {
    const { form } = this.props;
    const { getFieldsValue } = form;
    const value = getFieldsValue();
    value.birthday = value.birthday._d;
    value.user_id = this.props.variables.userId;
    const onCompleted = () => {
      setTimeout(() => {
        Message.success('修改信息成功');
        this.setState({ visible: false });
      }, 100);
    };
    updateUser({ variables: value, onCompleted })();
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: this.state.accountImage,
      thumbUrl: this.state.accountImage,
    }];
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...fileList],
    };

    return (
      <div style={{ width: 750, border: `1px ${borderGrey} solid`, padding: 20, marginBottom: 100 }}>
        <div style={{ marginBottom: 10 }}>个人资料</div>
        <div style={{ width: '100%', borderBottom: `1px solid ${borderGrey}` }} />
        <Form>
          <div style={{marginTop: 30 }}>
            <FormItem
              label="昵称"
              {...formItemLayout}
            >
              {getFieldDecorator('nickName', {
                rules: [{
                  required: true, message: '请输入昵称',
                },{ validator: orderNumberFormat('昵称') },
                { max: 10, message: '昵称长度不能超过10个字' },
              ],
              })(
                <Input />
              )}
            </FormItem>
          </div>
          <FormItem
            label="Password"
            {...formItemLayout}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            {getFieldDecorator('sex')(
              <RadioGroup defaultValue={'male'} options={options} onChange={this.onChange1} value={this.state.sex} />
            )}
          </FormItem>
          <FormItem
            label="出生日期"
            {...formItemLayout}
          >
            {getFieldDecorator('birthday', )(
              <DatePicker />
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
          <FormItem
            label="头像"
            {...formItemLayout}
          >
            {getFieldDecorator('accountImage')(
              <Upload onChange={e => {console.log(e);}} {...props}>
                <Icon type="upload" />
              </Upload>
            )}
          </FormItem>
          <FormItem>
            <Button onClick={this.handleSubmit} style={{ margin: '30px 0 80px 20px', width: 100, height: 32, backgroundColor: alertYellow, color: 'white' }}>保存</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const query = graphql`
query detailInfo_User_Query($userId: String!) {
  viewer {
    id
    user(id: $userId) {
      id
      sex
      password
      accountImage
      nickName
      birthday
      phoneNumber
    }
  }
}
`;

const DetailInfoWithQueryRenderer = createQueryRenderer(Form.create()(DetailInfo), query);

export default DetailInfoWithQueryRenderer;
