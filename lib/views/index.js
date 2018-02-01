'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _found = require('found');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserRouter = (0, _found.createBrowserRouter)({
  routeConfig: (0, _found.makeRouteConfig)(_react2.default.createElement(
    _found.Route,
    { path: '/', Component: _app2.default },
    _react2.default.createElement(_found.Route, { path: 'login', Component: _login2.default })
  ))
});

exports.default = BrowserRouter;