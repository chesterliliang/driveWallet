webpackJsonp([3],{

/***/ 1089:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _from = __webpack_require__(85);

	var _from2 = _interopRequireDefault(_from);

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

	var _index = __webpack_require__(1090);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SelectThreshold = function (_React$Component) {
	  (0, _inherits3.default)(SelectThreshold, _React$Component);

	  function SelectThreshold() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, SelectThreshold);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectThreshold.__proto__ || (0, _getPrototypeOf2.default)(SelectThreshold)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      threshold: Math.max(_this.props.deviceNum - 2, 2)
	    }, _this.handleConfirm = function () {
	      _this.props.dispatch(_router.routerRedux.replace('/initialize?m=' + _this.state.threshold));
	    }, _this.handleChangeThreshold = function (delta, enabled) {
	      if (!enabled) {
	        return;
	      }

	      _this.setState(function (_ref2) {
	        var threshold = _ref2.threshold;
	        return { threshold: threshold + delta };
	      });
	    }, _this.renderThreshold = function (index) {
	      var threshold = _this.state.threshold;


	      return _react2.default.createElement(
	        'li',
	        { key: index, style: { transform: 'translate(' + -100 * (threshold - 1) + '%)' } },
	        _react2.default.createElement(
	          'a',
	          null,
	          index + 1
	        )
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(SelectThreshold, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var deviceNum = this.props.deviceNum;
	      var threshold = this.state.threshold;

	      var leftArrowEnabled = threshold > Math.max(Math.ceil(deviceNum / 2), 2);
	      var rightArrowEnabled = threshold < deviceNum;
	      var leftArrowBg = leftArrowEnabled ? __webpack_require__(1091) : __webpack_require__(1092);
	      var rightArrowBg = rightArrowEnabled ? __webpack_require__(1091) : __webpack_require__(1092);

	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.bottom },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.hintArea },
	            _react2.default.createElement(
	              'h3',
	              null,
	              localizedStrings.selectThreshold
	            ),
	            _react2.default.createElement('h4', { dangerouslySetInnerHTML: { __html: localizedStrings.minThresholdHint } })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.buttonDiv },
	            _react2.default.createElement(_FlatButton2.default, {
	              style: { float: 'right' },
	              label: localizedStrings.next,
	              labelStyle: { fontSize: 20 },
	              primary: true,
	              onTouchTap: this.handleConfirm
	            })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.upper },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.card },
	            _react2.default.createElement('div', {
	              className: _index2.default.leftArrow,
	              style: { backgroundImage: 'url(' + leftArrowBg + ')' },
	              onClick: this.handleChangeThreshold.bind(this, -1, leftArrowEnabled)
	            }),
	            _react2.default.createElement(
	              'ul',
	              null,
	              (0, _from2.default)(Array(deviceNum)).map(function (__, index) {
	                return _this2.renderThreshold(index);
	              })
	            ),
	            _react2.default.createElement('div', {
	              className: _index2.default.rightArrow,
	              style: { backgroundImage: 'url(' + rightArrowBg + ')' },
	              onClick: this.handleChangeThreshold.bind(this, 1, rightArrowEnabled)
	            })
	          )
	        )
	      );
	    }
	  }]);
	  return SelectThreshold;
	}(_react2.default.Component);

	SelectThreshold.propTypes = {
	  deviceNum: _propTypes2.default.number
	};

	function mapStateToProps(_ref3) {
	  var deviceNum = _ref3.device.num;

	  return {
	    deviceNum: deviceNum
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(SelectThreshold);
	module.exports = exports['default'];

/***/ }),

/***/ 1090:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___18R4X","bottom":"bottom___2jR2B","hintArea":"hintArea___10VXP","buttonDiv":"buttonDiv___3DRdI","upper":"upper___21ty-","card":"card___2CdfF","leftArrow":"leftArrow___3D4KG","rightArrow":"rightArrow___1BjPn"};

/***/ }),

/***/ 1091:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1092:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ })

});