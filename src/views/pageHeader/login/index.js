import React, { Component } from 'react';
import { Input, Icon, Form, Modal } from 'antd';
import LocalStorage from 'utils/localStorage';
import { hashPassword } from 'utils/getHash';
import store from 'store';
import { sign_in } from 'store/redux';
import { createTokenMutation } from 'store/relay/mutation';
import { Button, Message } from 'components';
import styles from './styles.scss';

const FormItem = Form.Item;

type Props = {
  form: any,
  visible: boolean,
  onCancel: () => {},
  users: {},
};
const orderNumberFormat = type => {
  return (rule, value, callback) => {
    const re = /^[\u4e00-\u9fa5a-zA-Z0-9-]+$/;
    if (!re.test(value)) {
      callback(`${type}只能由英文字母、中文、数字、-组成`);
    }
    callback();
  };
};

class Login extends Component {
  props: Props;
  state = {
    visible: false,
  }

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
        const { nickName, password } = values;
        const variables = {
          input: {
            nickName: nickName.length !== 11 ? nickName: null,
            phoneNumber: nickName.length === 11 ? nickName: null,
            password: hashPassword(password),
          }
        };
        const onCompleted = ({ createToken }) => {
          const { error } = createToken;
          if (error) {
            Message.error(error);
            return null;
          }
          LocalStorage.set('token_password', password, 60 * 60 * 24);
          LocalStorage.set('user_name', nickName);
          setTimeout(() => {
            Message.success('登陆成功');
            this.setState({ visible: false });
          }, 100);
          store.dispatch(sign_in(createToken.user.id));
          return null;
        };

        const onError = error => {
          Message.error(error);
        };

        createTokenMutation({ variables, onCompleted, onError })();
      } else {
        console.log('get user info failed');
      }
    });
  };

  render() {
    const { form, onCancel } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal visible={this.state.visible} onCancel={() => { onCancel('login') }} footer={null}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginTopInfo}>
            {'登录'}
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('nickName', {
                rules: [{
                  required: true, message: '用户名不能为空!',
                },{ validator: orderNumberFormat('昵称') },
                { max: 10, message: '昵称长度不能超过10个字' },
              ],
              })(
                <div style={{marginTop: 30 }}>
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
                <div className={styles.loginInput}>
                  <Input
                    placeholder="请输入密码"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={this.onChangeUserName}
                    type={'password'}
                  />
                </div>
              )}
            </FormItem>
            <div className={styles.loginButton}>
              <Button text={'登 录'} />
            </div>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default Form.create()(Login);
