'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./index.css');

var _views = require('./views');

var _views2 = _interopRequireDefault(_views);

var _registerServiceWorker = require('./registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_views2.default, null), document.getElementById('root'));
(0, _registerServiceWorker2.default)();