import React, { Component } from 'react';
import { Input, Form, Modal } from 'antd';
import { Button, Message } from 'components';
import { hashPassword } from 'utils/getHash';
import { createUserMutation } from 'store/relay/mutation';
import styles from './styles.scss';

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

type Props = {
  visible: boolean,
  form: any,
  onCancel: () => {},
}

class Register extends Component {
  props: Props;
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
      return null;
    }
    this.setState({ visible: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { nickName, password, phoneNumber } = values;
        const variables = {
          input: {
            nickName,
            password: hashPassword(password),
            phoneNumber,
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
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </div>
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