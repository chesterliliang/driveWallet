webpackJsonp([7],{

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

/***/ 1099:
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

	var _IconButton = __webpack_require__(952);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _settings = __webpack_require__(1087);

	var _settings2 = _interopRequireDefault(_settings);

	var _refresh = __webpack_require__(1100);

	var _refresh2 = _interopRequireDefault(_refresh);

	var _index = __webpack_require__(1101);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var tabIcons = {
	  images: {
	    0: __webpack_require__(1102),
	    1: __webpack_require__(1103)
	  },
	  text: {
	    'zh-Hans': {
	      0: '账户',
	      1: '发送'
	    },
	    en: {
	      0: 'ACCOUNTS',
	      1: 'SEND'
	    }
	  }
	};

	var Wallet = function (_React$Component) {
	  (0, _inherits3.default)(Wallet, _React$Component);

	  function Wallet() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Wallet);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Wallet.__proto__ || (0, _getPrototypeOf2.default)(Wallet)).call.apply(_ref, [this].concat(args))), _this), _this.changeRoute = function (pathname) {
	      _this.props.dispatch(_router.routerRedux.replace(pathname));
	    }, _this.handleSettingButtonClick = function () {
	      var modalPlayload = { modalType: 'Settings', modalProps: {} };
	      _this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
	    }, _this.renderSubItem = function (index, isCurrent) {
	      var language = _this.props.language;

	      var icon = tabIcons.images[index];
	      var labelText = tabIcons.text[language][index];
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.subItem, style: { opacity: isCurrent ? 1 : 0.5 } },
	        _react2.default.createElement('div', {
	          className: _index2.default.icon,
	          style: {
	            backgroundImage: 'url(' + icon + ')',
	            width: '25px',
	            height: '25px',
	            marginTop: '10px'
	          }
	        }),
	        _react2.default.createElement(
	          'span',
	          { className: _index2.default.text },
	          labelText
	        )
	      );
	    }, _this.renderSubPageTab = function (index, onClick, isCurrent) {
	      return _react2.default.createElement(
	        'div',
	        {
	          key: index,
	          className: _index2.default.tab,
	          style: { backgroundColor: isCurrent ? '#171717' : 'transparent' }
	        },
	        _react2.default.createElement(_FlatButton2.default, {
	          backgroundColor: isCurrent ? '#171717' : '#282828',
	          children: _this.renderSubItem(index, isCurrent),
	          style: {
	            width: 200,
	            height: 68,
	            borderRadius: 0,
	            display: 'flex',
	            justifyContent: 'center'
	          },
	          disabled: isCurrent,
	          onClick: onClick
	        })
	      );
	    }, _this.renderTabs = function (subPageIndex) {
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.tabs },
	        _react2.default.createElement('div', { className: _index2.default.logo }),
	        _this.renderSubPageTab(0, _this.changeRoute.bind(_this, '/wallet/overview'), subPageIndex === 0),
	        _this.renderSubPageTab(1, _this.changeRoute.bind(_this, '/wallet/send'), subPageIndex === 1)
	      );
	    }, _this.renderSettingButton = function () {
	      return _react2.default.createElement(
	        _IconButton2.default,
	        {
	          tooltipPosition: 'bottom-center',
	          tooltip: localizedStrings.settings,
	          style: {
	            position: 'absolute',
	            top: 25,
	            right: 15,
	            transform: 'scale(0.85)'
	          },
	          onTouchTap: _this.handleSettingButtonClick
	        },
	        _react2.default.createElement(_settings2.default, {
	          color: 'rgba(255, 255, 255, 0.5)',
	          hoverColor: 'rgba(255, 255, 255, 0.8)'
	        })
	      );
	    }, _this.renderRefreshButton = function () {
	      return _react2.default.createElement(
	        _IconButton2.default,
	        {
	          tooltipPosition: 'bottom-center',
	          tooltip: localizedStrings.refresh,
	          style: { position: 'absolute', top: 25, right: 65 },
	          onTouchTap: function onTouchTap() {
	            _this.props.dispatch({ type: 'wallet/getBalances' });
	          }
	        },
	        _react2.default.createElement(_refresh2.default, {
	          color: 'rgba(255, 255, 255, 0.5)',
	          hoverColor: 'rgba(255, 255, 255, 0.8)'
	        })
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Wallet, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          subPageIndex = _props.subPageIndex,
	          accessible = _props.accessible;

	      var style = accessible ? {} : { pointerEvents: 'none', filter: 'grayscale(95%)' };

	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container, style: style },
	        this.renderTabs(subPageIndex),
	        this.renderSettingButton(),
	        this.renderRefreshButton(),
	        this.props.children
	      );
	    }
	  }]);
	  return Wallet;
	}(_react2.default.Component);

	Wallet.propTypes = {
	  subPageIndex: _propTypes2.default.number,
	  accessible: _propTypes2.default.bool
	};

	function mapStateToProps(_ref2) {
	  var subPageIndex = _ref2.wallet.subPageIndex,
	      inProgress = _ref2.send.inProgress,
	      language = _ref2.app.settings.language;

	  return {
	    subPageIndex: subPageIndex,
	    accessible: !inProgress,
	    language: language
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(Wallet);
	module.exports = exports['default'];

/***/ }),

/***/ 1100:
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

	var NavigationRefresh = function NavigationRefresh(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' })
	  );
	};
	NavigationRefresh = (0, _pure2.default)(NavigationRefresh);
	NavigationRefresh.displayName = 'NavigationRefresh';
	NavigationRefresh.muiName = 'SvgIcon';

	exports.default = NavigationRefresh;

/***/ }),

/***/ 1101:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___1Q3qn","tabs":"tabs___2H16h","logo":"logo___fqtcy","tab":"tab___16DqI","icon":"icon___1LixP","text":"text___2L7oe","subItem":"subItem___PG0_G"};

/***/ }),

/***/ 1102:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEpElEQVR4Xu2bW8ilYxTHf3+HEJKcckrJKZSLceGsSSlFueBKKOUwkZnBDCaHyCEzDDOoEaWYhHCj3MiFMjSDIolkhBkpISUzzn+tevbX8+3Z+33fb+/97r3N96yr73vf57DWf6/1rMOzXjHPSfNcfiYGgO0zgTXAZmC5pG8m8WOMHQDbRwMPAZdkAv8BPAbcL+nXcQIxNgBs7wfcASwGdu8j5A/AXcDTkv4dBxCtA2B7V+Ba4B7gwEyojcASoKMRR2TvPg2gJL3VNgitAmD7AmA1cEImyNfAbZJe6jyzvSdwE7AC2Dsb+wZws6TP2wKiFQBsh8BPAOdljIdtPwA8KilsfgeyfQhwH3AVsEsa8DfwVJiGpJ9HDcRIAbB9EHAvcDUQqh/0D/BM2L+kH5sIYPsk4Eng3Gz8LwmctZL+arJOkzEjAcD2Hulwi0Nu32zjsOGw5bDpOZPti4BHgGOzyR23+dqcF+wxYWgAbF8KrAKOytb/DLhFUtjwUGR7N2BROkT3zxbbAFwv6eNhNhgYANsLUiATAU2HQsXvDpuVFKo/MrIdwoeLvAEIUIIMPAfcLun7QTabMwC2w109CFwGM5Hkn8DasP+2AxnbYQ4rgYszgbclLVwpKf5uTI0BsB3u6VZgGRBuq0OvxHNJXzXedQQDbccBGaH0Kdly3yVX+ryk0I5aqgXAdrijKyNMBQ7NVvwwHXBhixOhUfBWCUAflLcmlNc3RbltdCq0MzzFsirt7AlASljC/eR29luyvbCz39sWapD1a86n1b0Oyh0ASOHrq8BeiYlISuKkXTHoSTuIMMPM6eOh4nBc0B1W9wIgVPzwxMDbyc6H8rXDCDPM3B4xyguSwnvN0CwAbEeaGuodB18g9v4wDEzJ3IhST0u8bJB0Vl8A4oXt14ELp4T5UbOxStLyOgAi0IlE5Pwufz9qZsa5XmSRL6bwfHslAOPkahr2qg2EpoHJNnkYGADb4SnyNLWbz62SvswfprT59AqBtkuKUtkssn0qsE/FvE1zzQE6aw0DQGRlj1cwtUZS1PxmyPaRwLcVczZLOqYHAB91xfzdQ04etOZQABjUvmznGnAj8AlwABDZYVCdBkRRdF0aGzW/4+KSpEYDtgBXpDmXp9ph/DtxDThb0ju2DwMiJW0CwMOSIrWO2OODCFMbAPCFpOPTnDtT/bEAUDSgmEA5A8ohOOk4oHiB4gZLHFACoRIJllC45AIlGSrZYEmHSz2gFERKRWg+lsSeTeXuaJGLjs8mNcF3gTfT2GtS90ldUfSn1IAZ084BFqb5E68H9Cou11WFe82pA6BfEbsAMImCyMHAiRX3ClskRVfnDNmOi5i8/bV7+jZJm7of2o5OsLxJsnvIRkmzbn0r+Jr1auCboaYbTPu4AkCTX8h29NWsbzJ2SsZEN/lCSbU9jI00wPbLQDRF/5/oOklx51hJTQGIK+u8N7hu3Um/j48zoi+wtl22EQCTlqbN/QsAPXxudHXkLbJt/gDjXnudpOgWm6HuRsn4ECF6/3dWzXhP0hl9AYgXtuPzl6XZR0/j/pXa3G+ppPhCtbcGtLnztK69s6p6Y7z/A6Kf026ls8uAAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1103:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADYUlEQVR4XuXbz8tNQRzH8ffxIxT5tbJSlGKDQhILrEgpIpEUKxYkZSFKZKEkFqweJSmRhRIr5EeSFDaUovwBbJDtV1/O0bnnmTk/7pwfM+feeup2n5nnzuc1c+eZM2duJCI3gbEoip4ygo9IRG4DOwEFOB1F0bNRclCAI8ClVOiRglCAVcBrQ6+PBIQCTAR+AVMtQ7/XEJGGFpEXwNqCz34vIRKA88DxkpNfryASgK3AvZIASbFeQCQAc4DvFQF6AfEXIJ4HPgMLh0TQakGOiDTADWCvA0CQIyINcBC4WgNAUBBpgKXA+xoBgoBIA+jz3zkLIlcbL+eI/wDxRPgI2OiaNKQFVRbgDHCqYQCvPhpZgE3Aw5YAvIDIAkwHfrYM0CnEAEA8D3wAlnSE0PqCygQwBhzoEKDVEWEC2A9c8wCgFQgTwGLgo0cAjUKMA4jngR/ADA8Rap8jbAAPgM2eAtQ6ImwAJ4GzngPUAmED2AA8DgTACcIGMCW+MJoQGELlOcIIEE+E74BlAQJUGhF5AFeAQwEDlILIA1gJ7AZ0w3R2/JM8nxcgjN7z1HufAzeBrQBFAUVE5wkFSVBMUKbXFHNS0d9v8PcDGzNDA7g0UER0kaUQZdGScjOButr8D8IlSNW68X3IuYAGmRX/JM9Nr2mZ9OsKV1ebqwOIiO4XDNt4rTetKloD5ct9BERkG6ArwqQXdBiG/Kg2CYrIdWBfyInjtufuRuf9G/wELAoYoNQ2vG0p3OXeoKt5qeDJm9gAtgD3XVvScv1KwYsAzgEnWg4w7NsNFbwI4AmwftgWtVTPKbgVQESavkfo6lNL8DyA5cBb11Y2UL/W4HkAegmsl8K+PBoJngegZ4f3eJC+0eB5AF+ABR0CtBLcCCAieqX2raPwrQa3AQxzXtDVq5PgNoAqJ0aDDm4DeA6sc01WUL/THs+2LX1ISvfp9HCE7dS4q4tXwceNABFZAbxxTWmo72VwE8Bh4HKNAF4HNwHcAnbVABBEcBPAV2C+A0BQwQcAHBdAQQbPAmwH7lbs/aCDZwEuAMdKAvQieBbgJbAmpAVMyc4qLKZfm9MFkJ4Sn2wp3aseH7cSFJHVwKvQFjCFXVuygI6Ao8DFVPle97hpBNwBdoT6paeSHW0tpiNgpL8+/wfAIHzIzQJwVgAAAABJRU5ErkJggg=="

/***/ })

});