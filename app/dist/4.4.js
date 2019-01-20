webpackJsonp([4],{

/***/ 1093:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _from = __webpack_require__(85);

	var _from2 = _interopRequireDefault(_from);

	var _keys = __webpack_require__(357);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(723);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(720);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(721);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(726);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(727);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _dva = __webpack_require__(699);

	var _router = __webpack_require__(362);

	var _FlatButton = __webpack_require__(815);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _components = __webpack_require__(785);

	var _index = __webpack_require__(1094);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Status = {
	  ing: 0,
	  success: 1,
	  error: 2
	};

	var Initialize = function (_React$Component) {
	  (0, _inherits3.default)(Initialize, _React$Component);

	  function Initialize() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Initialize);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Initialize.__proto__ || (0, _getPrototypeOf2.default)(Initialize)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      initStatus: Status.ing
	    }, _this.handleInitialize = function () {
	      var threshold = _this.props.threshold;


	      _this.setState({ initStatus: Status.ing });

	      _this.props.dispatch({
	        type: 'device/initialize',
	        payload: { threshold: threshold },
	        onComplete: _this.handleInitCallback
	      });
	    }, _this.handleInitCallback = function (error) {
	      if (error) {
	        _this.setState({ initStatus: Status.error });
	      } else {
	        _this.props.dispatch({ type: 'device/getAddresses' });

	        setTimeout(function () {
	          _this.setState({ initStatus: Status.success });
	        }, 1000);
	      }
	    }, _this.handleNext = function () {
	      _this.props.dispatch(_router.routerRedux.replace('/wallet'));
	    }, _this.renderCard = function (index) {
	      return _react2.default.createElement(_components.KeyCard, {
	        key: index,
	        index: index,
	        connecting: true,
	        delay: index * 200,
	        hideIndex: true
	      });
	    }, _this.renderMessage = function (status) {
	      switch (status) {
	        case Status.error:
	          {
	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement(
	                'h3',
	                null,
	                localizedStrings.initError
	              ),
	              _react2.default.createElement(
	                'h4',
	                null,
	                localizedStrings.retryHint
	              )
	            );
	          }

	        case Status.success:
	          {
	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement(
	                'h3',
	                null,
	                localizedStrings.initSuccess
	              ),
	              _react2.default.createElement(
	                'h4',
	                null,
	                localizedStrings.initSuccessHint
	              )
	            );
	          }

	        default:
	          {
	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement('h3', { dangerouslySetInnerHTML: { __html: localizedStrings.initing } }),
	              _react2.default.createElement(
	                'h4',
	                null,
	                localizedStrings.initingHint
	              )
	            );
	          }
	      }
	    }, _this.renderButton = function (status) {
	      switch (status) {
	        case Status.error:
	          {
	            return _react2.default.createElement(_FlatButton2.default, {
	              style: { position: 'absolute', bottom: 30, right: 30 },
	              label: localizedStrings.checkAndRetry,
	              labelStyle: { fontSize: 20 },
	              secondary: true,
	              onTouchTap: function onTouchTap() {
	                return setTimeout(_this.handleInitialize, 300);
	              }
	            });
	          }

	        case Status.success:
	          {
	            var addresses = _this.props.addresses;


	            if ((0, _keys2.default)(addresses).length > 0) {
	              return _react2.default.createElement(_FlatButton2.default, {
	                style: { position: 'absolute', bottom: 30, right: 30 },
	                label: localizedStrings.enter,
	                labelStyle: { fontSize: 20 },
	                primary: true,
	                onTouchTap: _this.handleNext
	              });
	            }

	            return null;
	          }

	        default:
	          return null;
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Initialize, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (this.props.deviceNum > 0) {
	        setTimeout(function () {
	          _this2.handleInitialize();
	        }, 2000);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var deviceNum = this.props.deviceNum;
	      var initStatus = this.state.initStatus;


	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.bottom },
	          this.renderMessage(initStatus),
	          this.renderButton(initStatus)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.upper },
	          (0, _from2.default)(Array(deviceNum)).map(function (__, index) {
	            return _this3.renderCard(index);
	          })
	        )
	      );
	    }
	  }]);
	  return Initialize;
	}(_react2.default.Component);

	Initialize.propTypes = {
	  deviceNum: _propTypes2.default.number,
	  threshold: _propTypes2.default.number
	};

	function mapStateToProps(_ref2, _ref3) {
	  var _ref2$device = _ref2.device,
	      deviceNum = _ref2$device.num,
	      addresses = _ref2$device.addresses;
	  var m = _ref3.location.query.m;

	  return {
	    deviceNum: deviceNum,
	    addresses: addresses,
	    threshold: parseInt(m, 10)
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(Initialize);
	module.exports = exports['default'];

/***/ }),

/***/ 1094:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___1qZQl","bottom":"bottom___3V4Uo","hintArea":"hintArea___2mgw2","upper":"upper___1tcuy"};

/***/ })

});