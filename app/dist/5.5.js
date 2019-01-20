webpackJsonp([5],{

/***/ 1087:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _pure = __webpack_require__(943);

	var _pure2 = _interopRequireDefault(_pure);

	var _SvgIcon = __webpack_require__(949);

	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ActionSettings = function ActionSettings(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' })
	  );
	};
	ActionSettings = (0, _pure2.default)(ActionSettings);
	ActionSettings.displayName = 'ActionSettings';
	ActionSettings.muiName = 'SvgIcon';

	exports.default = ActionSettings;

/***/ }),

/***/ 1095:
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

	var _List = __webpack_require__(969);

	var _IconButton = __webpack_require__(952);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _settings = __webpack_require__(1087);

	var _settings2 = _interopRequireDefault(_settings);

	var _index = __webpack_require__(1096);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SingleMode = function (_React$Component) {
	  (0, _inherits3.default)(SingleMode, _React$Component);

	  function SingleMode() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, SingleMode);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SingleMode.__proto__ || (0, _getPrototypeOf2.default)(SingleMode)).call.apply(_ref, [this].concat(args))), _this), _this.onItemClick = function (index) {
	      switch (index) {
	        case 0:
	          {
	            _this.props.dispatch({ type: 'device/changepin' });
	            // this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'changePIN', args: [0] } });
	            break;
	          }
	        case 1:
	          {
	            _this.props.dispatch({ type: 'device/format' });
	            // this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'format', args: [0] } });
	            break;
	          }

	        default:
	      }
	    }, _this.changeRoute = function (pathname) {
	      _this.props.dispatch(_router.routerRedux.replace(pathname));
	    }, _this.handleSettingButtonClick = function () {
	      var modalPlayload = { modalType: 'Settings', modalProps: {} };
	      _this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
	    }, _this.renderSubPageTab = function (current, index, label, onClick) {
	      var isCurrent = current === index;

	      var labelStyle = { paddingLeft: 15, paddingRight: 15, fontSize: '14px' };
	      if (isCurrent) {
	        labelStyle.color = 'white';
	      }

	      return _react2.default.createElement(
	        'div',
	        { key: index, className: _index2.default.tab, style: { backgroundColor: isCurrent ? '#171717' : 'transparent' } },
	        _react2.default.createElement(_FlatButton2.default, {
	          backgroundColor: isCurrent ? '#171717' : '#282828',
	          style: { width: 200, height: 68, borderRadius: 0 },
	          label: label,
	          labelStyle: labelStyle,
	          disabled: isCurrent,
	          onClick: onClick
	        })
	      );
	    }, _this.renderTabs = function (subPageIndex) {
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.tabs },
	        _this.renderSubPageTab(subPageIndex, 0, localizedStrings.keymanageMode, _this.changeRoute.bind(_this, '/single'))
	      );
	    }, _this.renderSettingButton = function () {
	      return _react2.default.createElement(
	        _IconButton2.default,
	        {
	          tooltipPosition: 'bottom-center',
	          tooltip: localizedStrings.settings,
	          style: { position: 'absolute', top: 25, right: 15, transform: 'scale(0.85)' },
	          onTouchTap: _this.handleSettingButtonClick
	        },
	        _react2.default.createElement(_settings2.default, { color: 'rgba(255, 255, 255, 0.5)', hoverColor: 'rgba(255, 255, 255, 0.8)' })
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(SingleMode, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log('[singlemode][componentDidMount]');
	      this.props.dispatch({ type: 'device/setloopstop', payload: { insetting: true } });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var subPageIndex = this.props.subPageIndex;


	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        this.renderTabs(subPageIndex),
	        this.renderSettingButton(),
	        _react2.default.createElement(
	          _List.List,
	          { style: { paddingTop: 70 } },
	          _react2.default.createElement(_List.ListItem, {
	            primaryText: localizedStrings.modifyPINOption,
	            secondaryText: localizedStrings.modifyPINOptionHint,
	            style: { paddingLeft: 80, paddingRight: 80 },
	            innerDivStyle: { transform: 'scale(1.3)', transformOrigin: 'left', padding: '30px 0' },
	            onTouchTap: this.onItemClick.bind(this, 0)
	          })
	        ),
	        _react2.default.createElement(
	          _List.List,
	          { style: { paddingTop: 70 } },
	          _react2.default.createElement(_List.ListItem, {
	            primaryText: localizedStrings.format,
	            secondaryText: localizedStrings.formatHint,
	            style: { paddingLeft: 80, paddingRight: 80 },
	            innerDivStyle: { transform: 'scale(1.3)', transformOrigin: 'left', padding: '30px 0' },
	            onTouchTap: this.onItemClick.bind(this, 1)
	          })
	        )
	      );
	    }
	  }]);
	  return SingleMode;
	}(_react2.default.Component);

	SingleMode.propTypes = {
	  subPageIndex: _propTypes2.default.number
	};

	SingleMode.defaultProps = {
	  subPageIndex: 0
	};

	function mapStateToProps(_ref2) {
	  var subPageIndex = _ref2.wallet.subPageIndex;

	  return {
	    subPageIndex: subPageIndex
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(SingleMode);
	module.exports = exports['default'];

/***/ }),

/***/ 1096:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___3HCXB","tabs":"tabs___2GGbL","tab":"tab___3765_"};

/***/ })

});