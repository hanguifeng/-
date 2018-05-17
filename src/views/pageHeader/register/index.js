import React, { Component } from 'react';
import { Input, Form, Modal, Radio, DatePicker, Upload, Icon } from 'antd';
import { Button, Message } from 'components';
import { hashPassword } from 'utils/getHash';
import { createUserMutation } from 'store/relay/mutation';
import styles from './styles.scss';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 30 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const options = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];
const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  defaultFileList: [...fileList],
};

type Props = {
  visible: boolean,
  form: any,
  onCancel: () => {},
}

const orderNumberFormat = type => {
  return (rule, value, callback) => {
    const re = /^[\u4e00-\u9fa5a-zA-Z0-9-]+$/;
    if (!re.test(value)) {
      callback(`${type}只能由英文字母、中文、数字、-组成`);
    }
    callback();
  };
};

class Register extends Component {
  props: Props;
  state = {
    sex: 'male',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
      return null;
    }
    this.setState({ visible: false });
  }

  onChange1 = (e) => {
    console.log(e);
    this.setState({
      sex: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { nickName, password, phoneNumber, sex, birthday } = values;
        console.log(birthday._d);
        const variables = {
          input: {
            nickName,
            password: hashPassword(password),
            phoneNumber,
            sex,
            birthday: birthday._d,
          }
        };
        const onCompleted = ({ createUser }) => {
          const { error } = createUser;
          if (error) {
            Message.error(error);
            return null;
          }
          setTimeout(() => {
            Message.success('注册成功');
            this.setState({ visible: false });
          }, 100);
          return null;
        };

        const onError = error => {
          Message.error(error);
        };

        createUserMutation({ variables, onCompleted, onError })();
      } else {
        console.log('set user info failed');
      }
    });
  }

  render() {
    const { form, onCancel } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal visible={this.state.visible} onCancel={() => { onCancel('register') }} footer={null}>
        <div onClick={(e) => {console.log(e.target);}} className={styles.loginWrapper}>
          <div className={styles.regesterTopInfo}>
            {'注册'}
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div style={{marginTop: 30 }}>
              <FormItem
                label="昵称"
                {...formItemLayout}
              >
                {getFieldDecorator('nickName', {
                  rules: [{
                    required: true, message: '请输入昵称',
                  },
                  { validator: orderNumberFormat('昵称') },
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
                <Upload {...props}>
                  <Icon type="upload" />
                </Upload>
              )}
            </FormItem>
            <div className={styles.regesterButton}>
              <Button text={'注 册'} />
            </div>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default Form.create()(Register);