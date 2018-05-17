import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Form, Checkbox, Spin } from 'antd';
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
  users: {},
  location: {},
};

class Login extends Component {
  props: Props;
  state = {
    loading: false,
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
          const { error, user } = createToken;
          if (error) {
            Message.error(error);
            return null;
          }
          if (user.authority === 'manager') {
            LocalStorage.set('token_password', createToken.token, 60 * 60 * 24);
            LocalStorage.set('user_name', nickName);
            this.setState({ loading: true });
            setTimeout(() => {
              this.setState({ loading: false });
              Message.success('登陆成功');
              this.context.router.push('/backpage');
            }, 1000);
            store.dispatch(sign_in(createToken.user.id));
          } else {
            Message.error('没有管理员权限');
          }
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
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
    <div className={styles.loginFormContainer}>
      <div className={styles.formTitle}>
        <span>后台管理系统</span>
      </div>
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('nickName', {
              rules: [{
                required: true, message: '账号不能为空!',
              }],
            })(
            <div style={{marginTop: 30 }}>
              <Input
                placeholder="请输入管理员账号"
                maxLength={10}
                addonBefore={<Icon type="user" />}
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
                addonBefore={<Icon type="lock" />}
                onChange={this.onChangeUserName}
                type={'password'}
              />
            </div>
          )}
        </FormItem>
        <Button style={{ width: '100%', height: 32, marginTop: 20 }} text={this.state.loading ? <Spin style={{ color: 'white' }} spinning={this.state.loading} /> : '登 录'} />
        <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>保持登录</Checkbox>)}
          </FormItem>
      </Form>
    </div>
    );
  }
}

Login.contextTypes = { router: PropTypes.object.isRequired };

export default Form.create()(Login);
