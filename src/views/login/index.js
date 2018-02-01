import React, { Component } from 'react';
import { Input, Icon, Form, Button, Modal } from 'antd';
import loginImg from '../../picture/loginImg.jpeg';
import Styles from './styles.css';

const FormItem = Form.Item;

type Props = {
  form: any,
  visible: boolean,
  onCancel: () => {},
};

class Login extends Component {
  props: Props;

  handleSubmit = () => {};

  render() {
    console.log(this.props);
    const { visible, form, onCancel } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal visible={this.props.visible} onCancel={onCancel} footer={null}>
        <div style={{ backgroundSize: '33%', backgroundImage: 'url(http://pic.qiantucdn.com/58pic/18/96/67/55Y58PICm6B_1024.jpg)' }}>
          <div style={{ marginLeft: 50, fontSize: 16, color: '#1890ff', paddingTop: 17 }}>
            {'登录'}
          </div>
          <div style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '用户名不能为空!',
                }],
              })(
                <div style={{ width: 300, margin: 'auto', marginTop: 30 }}>
                  <Input
                    placeholder="请输入用户名/手机号码"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={this.onChangeUserName}
                  />
                </div>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '密码不能为空!',
                }],
              })(
                <div style={{ width: 300, margin: 'auto' }}>
                  <Input
                    placeholder="请输入密码"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={this.onChangeUserName}
                    type={'password'}
                  />
                </div>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              <Button style={{ width: 120, height: 32, marginLeft: 195, marginBottom: 30 }} type="primary" htmlType="submit">
                {'登 录'}
              </Button>
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}

const LoginWithForm = Form.create()(Login);

export default LoginWithForm;
