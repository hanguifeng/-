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

var _index = require('../../styles/color/index');

var _logo = require('../../picture/logo.svg');

var _logo2 = _interopRequireDefault(_logo);

var _yimai = require('../../picture/yimai.png');

var _yimai2 = _interopRequireDefault(_yimai);

var _login = require('../login');

var _login2 = _interopRequireDefault(_login);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

require('./App.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false
    }, _this.handleCancel = function (e) {
      _this.setState({
        visible: false
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'header',
          { style: { backgroundColor: _index.borderGrey } },
          _react2.default.createElement(
            'div',
            { style: { width: '100%', display: 'flex', boxShadow: '1px 1px black', marginLeft: '85%' } },
            _react2.default.createElement(
              'div',
              {
                style: { cursor: 'pointer' },
                onClick: function onClick() {
                  _this2.setState({ visible: true });
                }
              },
              '登录'
            ),
            '\xA0',
            _react2.default.createElement(
              'span',
              null,
              '|'
            ),
            '\xA0',
            _react2.default.createElement(
              'div',
              { style: { cursor: 'pointer' } },
              '注册'
            )
          ),
          _react2.default.createElement('img', { src: _logo2.default, className: 'App-logo', alt: 'logo' }),
          _react2.default.createElement('img', { src: _yimai2.default, style: { width: '100%', height: 200 } })
        ),
        _react2.default.createElement(_login2.default, { visible: this.state.visible, onCancel: this.handleCancel }),
        _react2.default.createElement(_Nav2.default, null)
      );
    }
  }]);
  return App;
}(_react.Component);

exports.default = App;