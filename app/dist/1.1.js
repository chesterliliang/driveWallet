webpackJsonp([1],{

/***/ 1084:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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

	var _index = __webpack_require__(1085);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ConfirmLaunch = function (_React$Component) {
	  (0, _inherits3.default)(ConfirmLaunch, _React$Component);

	  function ConfirmLaunch() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, ConfirmLaunch);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ConfirmLaunch.__proto__ || (0, _getPrototypeOf2.default)(ConfirmLaunch)).call.apply(_ref, [this].concat(args))), _this), _this.handleConfirm = function () {
	      _this.props.dispatch(_router.routerRedux.replace('/connecting'));
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(ConfirmLaunch, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.bottom },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.hintArea },
	            _react2.default.createElement('h3', { dangerouslySetInnerHTML: { __html: localizedStrings.confirmLaunchText } }),
	            _react2.default.createElement(
	              'h4',
	              null,
	              localizedStrings.confirmLaunchHint
	            )
	          ),
	          _react2.default.createElement(_FlatButton2.default, {
	            style: { position: 'absolute', bottom: 30, right: 30 },
	            label: localizedStrings.confirmLaunchBtn,
	            labelStyle: { fontSize: 20 },
	            primary: true,
	            onTouchTap: this.handleConfirm
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.upper },
	          _react2.default.createElement('div', { className: _index2.default.card })
	        )
	      );
	    }
	  }]);
	  return ConfirmLaunch;
	}(_react2.default.Component);

	ConfirmLaunch.propTypes = {};

	function mapStateToProps() {
	  return {};
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(ConfirmLaunch);
	module.exports = exports['default'];

/***/ }),

/***/ 1085:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___2AaD9","bottom":"bottom___3Nhz8","hintArea":"hintArea___1QQpB","upper":"upper___1vQSx","card":"card___2fNBe"};

/***/ })

});