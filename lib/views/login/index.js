'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('antd/dist/antd.css');

var _loginImg = require('../../picture/loginImg.jpeg');

var _loginImg2 = _interopRequireDefault(_loginImg);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _antd.Form.Item;

var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function () {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Login, [{
    key: 'render',
    value: function render() {
      console.log(this.props);
      var _props = this.props,
          visible = _props.visible,
          form = _props.form,
          onCancel = _props.onCancel;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      };

      return _react2.default.createElement(
        _antd.Modal,
        { visible: this.props.visible, onCancel: onCancel, footer: null },
        _react2.default.createElement(
          'div',
          { style: { backgroundSize: '33%', backgroundImage: 'url(http://pic.qiantucdn.com/58pic/18/96/67/55Y58PICm6B_1024.jpg)' } },
          _react2.default.createElement(
            'div',
            { style: { marginLeft: 50, fontSize: 16, color: '#1890ff', paddingTop: 17 } },
            '登录'
          ),
          _react2.default.createElement('div', { style: { width: '100%', height: 2, backgroundColor: 'black' } }),
          _react2.default.createElement(
            _antd.Form,
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
              FormItem,
              null,
              getFieldDecorator('account', {
                rules: [{
                  required: true, message: '用户名不能为空!'
                }]
              })(_react2.default.createElement(
                'div',
                { style: { width: 300, margin: 'auto', marginTop: 30 } },
                _react2.default.createElement(_antd.Input, {
                  placeholder: '\u8BF7\u8F93\u5165\u7528\u6237\u540D/\u624B\u673A\u53F7\u7801',
                  prefix: _react2.default.createElement(_antd.Icon, { type: 'user', style: { color: 'rgba(0,0,0,.25)' } }),
                  onChange: this.onChangeUserName
                })
              ))
            ),
            _react2.default.createElement(
              FormItem,
              null,
              getFieldDecorator('password', {
                rules: [{
                  required: true, message: '密码不能为空!'
                }]
              })(_react2.default.createElement(
                'div',
                { style: { width: 300, margin: 'auto' } },
                _react2.default.createElement(_antd.Input, {
                  placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801',
                  prefix: _react2.default.createElement(_antd.Icon, { type: 'lock', style: { color: 'rgba(0,0,0,.25)' } }),
                  onChange: this.onChangeUserName,
                  type: 'password'
                })
              ))
            ),
            _react2.default.createElement(
              FormItem,
              formItemLayout,
              _react2.default.createElement(
                _antd.Button,
                { style: { width: 120, height: 32, marginLeft: 195, marginBottom: 30 }, type: 'primary', htmlType: 'submit' },
                '登 录'
              )
            )
          )
        )
      );
    }
  }]);
  return Login;
}(_react.Component);

var LoginWithForm = _antd.Form.create()(Login);

exports.default = LoginWithForm;