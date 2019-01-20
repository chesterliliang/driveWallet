webpackJsonp([8],{

/***/ 1104:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

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

	var _List = __webpack_require__(969);

	var _Avatar = __webpack_require__(1077);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _IconButton = __webpack_require__(952);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _reactTappable = __webpack_require__(1009);

	var _reactTappable2 = _interopRequireDefault(_reactTappable);

	var _reactCopyToClipboard = __webpack_require__(1004);

	var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

	var _FlatButton = __webpack_require__(815);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _assignment = __webpack_require__(1105);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _components = __webpack_require__(785);

	var _constants = __webpack_require__(691);

	var constants = _interopRequireWildcard(_constants);

	var _index = __webpack_require__(1106);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Overview = function (_React$Component) {
	  (0, _inherits3.default)(Overview, _React$Component);

	  function Overview() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Overview);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Overview.__proto__ || (0, _getPrototypeOf2.default)(Overview)).call.apply(_ref, [this].concat(args))), _this), _this.handleShowQRCode = function (value) {
	      var modalPlayload = { modalType: 'QRCode', modalProps: { value: value } };
	      _this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
	    }, _this.handleShowHistory = function (address, coinType) {
	      var _require = __webpack_require__(156),
	          shell = _require.shell;

	      switch (coinType) {
	        case 'BTC':
	          shell.openExternal(constants.externalSites.BTC + '/address/' + address, null);
	          break;
	        case 'ETH':
	          shell.openExternal(constants.externalSites.ETH + '/address/' + address, null);
	          break;
	        case 'ETC':
	          shell.openExternal(constants.externalSites.ETC + '/addr/' + address, null);
	          break;
	        case 'LTC':
	          shell.openExternal(constants.externalSites.LTC + '/addr/' + address, null);
	          break;
	        case 'NEO':
	          shell.openExternal(constants.externalSites.NEO + '/address/' + address, null);
	          break;
	        case 'CYB':
	          shell.openExternal(constants.externalSites.CYB + '/account/' + address + '/overview', null);
	          break;

	        default:
	          break;
	      }
	    }, _this.handleregister = function (coinType) {
	      console.log('handleregister coinType,', coinType);
	      var modalPlayload = { modalType: 'register', modalProps: { coinType: coinType } };
	      _this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
	      console.log('handleregister');
	    }, _this.renderQRIcon = function (address) {
	      return _react2.default.createElement(
	        _reactTappable2.default,
	        {
	          component: 'div',
	          className: _index2.default.qrWrapper,
	          stopPropagation: true,
	          preventDefault: true,
	          onTap: _this.handleShowQRCode.bind(_this, address)
	        },
	        _react2.default.createElement(
	          _IconButton2.default,
	          { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, tooltip: localizedStrings.showQRCode, tooltipStyles: { fontSize: 13 } },
	          _react2.default.createElement('div', { className: _index2.default.qrIcon })
	        )
	      );
	    }, _this.renderHistoryIcon = function (address, coinType) {
	      return _react2.default.createElement(
	        _reactTappable2.default,
	        {
	          component: 'div',
	          className: _index2.default.historyWrapper,
	          stopPropagation: true,
	          preventDefault: true,
	          onTap: _this.handleShowHistory.bind(_this, address, coinType)
	        },
	        _react2.default.createElement(
	          _IconButton2.default,
	          { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, tooltip: localizedStrings.viewHistory, tooltipStyles: { fontSize: 13 } },
	          _react2.default.createElement(_assignment2.default, { color: 'rgba(255, 255, 255, 0.5)', hoverColor: 'rgba(255, 255, 255, 0.8)', viewBox: '0 0 30 30' })
	        )
	      );
	    }, _this.renderAddressField = function (title, value) {
	      var addressValid = !(value === 'NaN');
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.fieldDiv },
	        _react2.default.createElement(
	          'h4',
	          null,
	          title
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.textDiv },
	          addressValid ? _react2.default.createElement(
	            _reactCopyToClipboard2.default,
	            {
	              onCopy: function onCopy() {
	                return window.showToast(localizedStrings.copiedToClipboard);
	              },
	              text: value
	            },
	            _react2.default.createElement(
	              'span',
	              { className: _index2.default.text },
	              addressValid ? value : localizedStrings.unavailable
	            )
	          ) : _react2.default.createElement(
	            'span',
	            { className: _index2.default.text },
	            addressValid ? value : localizedStrings.unavailable
	          ),
	          addressValid ? _this.renderQRIcon(value) : _react2.default.createElement('div', null),
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('hr', null)
	          )
	        )
	      );
	    }, _this.renderBalanceField = function (title, value, address, coinType) {
	      var addressValid = !(address === 'NaN');
	      var balanceValid = !(value === 'NaN');
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.fieldDiv },
	        _react2.default.createElement(
	          'h4',
	          null,
	          title
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.textDiv },
	          _react2.default.createElement(
	            'h5',
	            { className: _index2.default.text },
	            balanceValid ? value : localizedStrings.unavailable
	          ),
	          addressValid ? _this.renderHistoryIcon(address, coinType) : _react2.default.createElement('div', null),
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('hr', null)
	          )
	        )
	      );
	    }, _this.renderToken = function (_ref2, index) {
	      var type = _ref2.type,
	          balance = _ref2.balance;

	      return _react2.default.createElement(_components.TokenChip, { key: index, icon: _components.CryptoIcons[type.toLowerCase()], amount: balance, unit: type });
	    }, _this.renderTokens = function (tokens) {
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.fieldDiv },
	        _react2.default.createElement(
	          'h4',
	          { style: { top: 25 } },
	          'ERC20'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.tokens },
	          tokens.map(_this.renderToken)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.textDiv, style: { height: 0 } },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('hr', null)
	          )
	        )
	      );
	    }, _this.renderneoTokens = function (tokens) {
	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.fieldDiv },
	        _react2.default.createElement(
	          'h4',
	          { style: { top: 25 } },
	          'NEOs'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.tokens },
	          tokens.map(_this.renderToken)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.textDiv, style: { height: 0 } },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('hr', null)
	          )
	        )
	      );
	    }, _this.renderUnregistered = function (index, coinType, _ref3) {
	      var address = _ref3.address,
	          unregistered = _ref3.unregistered;

	      return _react2.default.createElement(
	        'div',
	        { key: index, className: _index2.default.item },
	        _react2.default.createElement(_Avatar2.default, {
	          className: _index2.default.icon,
	          size: 32,
	          src: _components.CryptoIcons[coinType.toLowerCase()]
	        }),
	        _react2.default.createElement(
	          'h4',
	          { className: _index2.default.name },
	          coinType
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.fieldDiv },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.textDiv },
	            _react2.default.createElement(_FlatButton2.default, {
	              className: _index2.default.button,
	              label: localizedStrings.register,
	              onTouchTap: _this.handleregister.bind(_this, coinType)
	            }),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('hr', null)
	            )
	          )
	        )
	      );
	    }, _this.renderUnregistereds = function (sortedCoinTypes, unregistereds, addresses) {
	      return sortedCoinTypes.map(function (type, index) {
	        var address = addresses[type];
	        return _this.renderUnregistered(index, type, { address: address, unregistered: unregistereds[type] });
	      });
	    }, _this.renderCurrency = function (index, coinType, _ref4) {
	      var address = _ref4.address,
	          balance = _ref4.balance,
	          erc20tokens = _ref4.erc20tokens,
	          neotokens = _ref4.neotokens;

	      var balanceStr = balance ? balance.toString() : balance === 0 ? balance.toString() : 'NaN';
	      // 判断一下有没有减号
	      if (balanceStr.indexOf('-') >= 0) {
	        balanceStr = '0' + String(Number(balanceStr) + 1).substr(1);
	      }
	      //const parts = balanceStr.split('.');
	      // if (!(parts.length > 1 && parts[1].length > 4)) {
	      //   balanceStr = Number(balanceStr).toFixed(5);
	      // }

	      return _react2.default.createElement(
	        'div',
	        { key: index, className: _index2.default.item },
	        _react2.default.createElement(_Avatar2.default, {
	          className: _index2.default.icon,
	          size: 32,
	          src: _components.CryptoIcons[coinType.toLowerCase()]
	        }),
	        _react2.default.createElement(
	          'h4',
	          { className: _index2.default.name },
	          coinType
	        ),
	        _this.renderAddressField(localizedStrings.address, address, coinType),
	        _this.renderBalanceField(localizedStrings.balance, balanceStr, address, coinType),
	        erc20tokens && erc20tokens.length > 0 && _this.renderTokens(erc20tokens),
	        neotokens && neotokens.length > 0 && _this.renderneoTokens(neotokens)
	      );
	    }, _this.renderCurrencies = function (sortedCoinTypes, erc20Types, neoTypes, balances, addresses) {
	      return sortedCoinTypes.map(function (type, index) {
	        var address = addresses[type];

	        if (type === 'ETH') {
	          var erc20tokens = erc20Types.map(function (erc20Type) {
	            return { type: erc20Type, balance: balances[erc20Type] };
	          }).filter(function (_ref5) {
	            var balance = _ref5.balance;
	            return parseFloat(balance) > 0;
	          });
	          return _this.renderCurrency(index, type, { address: address, balance: balances[type], erc20tokens: erc20tokens });
	        }
	        if (type === 'NEO') {
	          var neotokens = neoTypes.map(function (neoType) {
	            return { type: neoType, balance: balances[neoType] };
	          }).filter(function (_ref6) {
	            var balance = _ref6.balance;
	            return parseFloat(balance) > 0;
	          });
	          return _this.renderCurrency(index, type, { address: address, balance: balances[type], neotokens: neotokens });
	        }

	        return _this.renderCurrency(index, type, { address: address, balance: balances[type] });
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Overview, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          balances = _props.balances,
	          addresses = _props.addresses,
	          unregistereds = _props.unregistereds;

	      var coinTypes = (0, _keys2.default)(balances);
	      var unregCoinTypes = (0, _keys2.default)(unregistereds).filter(function (type) {
	        return unregistereds[type];
	      });
	      var erc20Types = coinTypes.filter(function (type) {
	        return !addresses[type];
	      });
	      var neoTypes = coinTypes.filter(function (type) {
	        return type === 'GAS';
	      });
	      var sortedCoinTypes = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO'];
	      if (unregCoinTypes.indexOf('CYB') < 0) {
	        sortedCoinTypes.push('CYB');
	      }
	      sortedCoinTypes.concat(coinTypes.filter(function (type) {
	        return type !== 'BTC' && type !== 'ETH' && type !== 'ETC' && type !== 'LTC' && type !== 'NEO' && type !== 'CYB' && erc20Types.indexOf(type) < 0 && neoTypes.indexOf(type) < 0;
	      }));

	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.list, style: { paddingBottom: 3 } },
	          _react2.default.createElement(
	            _List.List,
	            {
	              className: 'scrollable',
	              style: { padding: 0 }
	            },
	            this.renderCurrencies(sortedCoinTypes, erc20Types, neoTypes, balances, addresses),
	            this.renderUnregistereds(unregCoinTypes, unregistereds, addresses),
	            _react2.default.createElement('div', { style: { width: '100%', height: 62 } })
	          )
	        )
	      );
	    }
	  }]);
	  return Overview;
	}(_react2.default.Component);

	Overview.propTypes = {
	  addresses: _propTypes2.default.object,
	  balances: _propTypes2.default.object,
	  unregistereds: _propTypes2.default.object
	};

	function mapStateToProps(_ref7) {
	  var addresses = _ref7.device.addresses,
	      _ref7$wallet = _ref7.wallet,
	      balances = _ref7$wallet.balances,
	      unregistereds = _ref7$wallet.unregistereds;

	  return {
	    addresses: addresses,
	    balances: (0, _extends3.default)({ BTC: '', ETH: '' }, balances),
	    unregistereds: unregistereds
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(Overview);
	module.exports = exports['default'];

/***/ }),

/***/ 1105:
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

	var ActionAssignment = function ActionAssignment(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' })
	  );
	};
	ActionAssignment = (0, _pure2.default)(ActionAssignment);
	ActionAssignment.displayName = 'ActionAssignment';
	ActionAssignment.muiName = 'SvgIcon';

	exports.default = ActionAssignment;

/***/ }),

/***/ 1106:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___YUdyS","list":"list___3wAsp","item":"item___1EWze","icon":"icon___2u4Z7","name":"name___23T1M","fieldDiv":"fieldDiv___g-tMU","textDiv":"textDiv___21vqB","copy":"copy___f_1TK","qrWrapper":"qrWrapper___3o-Fb","qrIcon":"qrIcon___1GFrd","historyWrapper":"historyWrapper___3ZbCa","historyIcon":"historyIcon___1D6ia","text":"text___pW2WY","tokens":"tokens___2df17","button":"button___303v4"};

/***/ })

});