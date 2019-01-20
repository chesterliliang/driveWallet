webpackJsonp([9],{

/***/ 1107:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(357);

	var _keys2 = _interopRequireDefault(_keys);

	var _toConsumableArray2 = __webpack_require__(84);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(788);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _stringify = __webpack_require__(129);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _regenerator = __webpack_require__(1);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _slicedToArray2 = __webpack_require__(158);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _asyncToGenerator2 = __webpack_require__(43);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

	var _bluebird = __webpack_require__(89);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _walletAddressValidator = __webpack_require__(1108);

	var _walletAddressValidator2 = _interopRequireDefault(_walletAddressValidator);

	var _FlatButton = __webpack_require__(815);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _IconButton = __webpack_require__(952);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _TextField = __webpack_require__(828);

	var _TextField2 = _interopRequireDefault(_TextField);

	var _Popover = __webpack_require__(928);

	var _Popover2 = _interopRequireDefault(_Popover);

	var _Menu = __webpack_require__(933);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuItem = __webpack_require__(940);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _DropDownMenu = __webpack_require__(1118);

	var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

	var _Toggle = __webpack_require__(1123);

	var _Toggle2 = _interopRequireDefault(_Toggle);

	var _Avatar = __webpack_require__(1077);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	var _cropFree = __webpack_require__(1126);

	var _cropFree2 = _interopRequireDefault(_cropFree);

	var _photo = __webpack_require__(1127);

	var _photo2 = _interopRequireDefault(_photo);

	var _reactDropzone = __webpack_require__(1128);

	var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

	var _jsqr = __webpack_require__(1129);

	var _jsqr2 = _interopRequireDefault(_jsqr);

	var _reactMeasure = __webpack_require__(961);

	var _reduxForm = __webpack_require__(432);

	var _dva = __webpack_require__(699);

	var _cybexjs = __webpack_require__(834);

	var _big = __webpack_require__(154);

	var _big2 = _interopRequireDefault(_big);

	var _constants = __webpack_require__(691);

	var constants = _interopRequireWildcard(_constants);

	var _utils = __webpack_require__(131);

	var _components = __webpack_require__(785);

	var _index = __webpack_require__(1130);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validateRecipient(recipient) {
	  if (!recipient || !recipient.trim()) {
	    return [];
	  }

	  var types = ['BTC', 'LTC', 'NEO', 'GAS', 'ETH', 'ETC'];
	  var recipientTypes = types.filter(function (type) {
	    return _walletAddressValidator2.default.validate(recipient, type, 'both');
	  });

	  if (!_cybexjs.ChainValidation.is_account_name_error(recipient)) {
	    recipientTypes.push('CYB');
	  }

	  return recipientTypes;
	}

	var Send = function (_React$Component) {
	  (0, _inherits3.default)(Send, _React$Component);

	  function Send() {
	    var _ref,
	        _this2 = this;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Send);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Send.__proto__ || (0, _getPrototypeOf2.default)(Send)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      unitFieldFocused: false,
	      unitFieldWidth: 920,
	      feeLevel: 5,
	      balanceNotEnough: false
	    }, _this.getEstimatedFee = function () {
	      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
	        var selector, selectedCoin, to, value, addresses, _props$deviceList, testNet, fullBalance, address, data, etc;

	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                selector = _this.state.feeLevel;
	                selectedCoin = props.selectedCoin, to = props.recipient, value = props.amount, addresses = props.addresses, _props$deviceList = (0, _slicedToArray3.default)(props.deviceList, 1), testNet = _props$deviceList[0].TestNet, fullBalance = props.fullBalance;

	                console.log('getEstimatedFee, this.props:', props);

	                address = addresses[selectedCoin] || addresses.ETH;

	                console.log('getEstimatedFee, address:', address);
	                data = { address: address, to: to, value: value, selector: selector, testNet: testNet };

	                console.log('getEstimatedFee, data:', data);
	                etc = true;
	                _context.t0 = selectedCoin;
	                _context.next = _context.t0 === 'BTC' ? 11 : _context.t0 === 'LTC' ? 15 : _context.t0 === 'ETC' ? 19 : _context.t0 === 'NEO' ? 22 : _context.t0 === 'GAS' ? 25 : _context.t0 === 'CYB' ? 28 : 31;
	                break;

	              case 11:
	                data.value = fullBalance ? -1 : data.value;
	                _context.next = 14;
	                return _this.getEstimatedBTCFee(data);

	              case 14:
	                return _context.abrupt('break', 34);

	              case 15:
	                data.value = fullBalance ? -1 : data.value;
	                _context.next = 18;
	                return _this.getEstimatedLTCFee(data);

	              case 18:
	                return _context.abrupt('break', 34);

	              case 19:
	                _context.next = 21;
	                return _this.getEstimatedETHFee(selectedCoin, data, etc);

	              case 21:
	                return _context.abrupt('break', 34);

	              case 22:
	                _context.next = 24;
	                return _this.getEstimatedNEOFee();

	              case 24:
	                return _context.abrupt('break', 34);

	              case 25:
	                _context.next = 27;
	                return _this.getEstimatedNEOFee();

	              case 27:
	                return _context.abrupt('break', 34);

	              case 28:
	                _context.next = 30;
	                return _this.getEstimatedCYBFee(data);

	              case 30:
	                return _context.abrupt('break', 34);

	              case 31:
	                _context.next = 33;
	                return _this.getEstimatedETHFee(selectedCoin, data, false);

	              case 33:
	                return _context.abrupt('break', 34);

	              case 34:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, _this2);
	      }));

	      return function (_x) {
	        return _ref2.apply(this, arguments);
	      };
	    }(), _this.getEstimatedBTCFee = function () {
	      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
	        var _ref4, fee, _fee;

	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.prev = 0;
	                _context2.next = 3;
	                return clientCore.btc.prepareTx(data);

	              case 3:
	                _ref4 = _context2.sent;
	                fee = _ref4.fee;

	                console.log('wallet send clientCore.btc.prepareTx , fee = ', fee);
	                _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', (0, _utils.toBTC)(fee)));
	                _context2.next = 13;
	                break;

	              case 9:
	                _context2.prev = 9;
	                _context2.t0 = _context2['catch'](0);

	                console.log((0, _stringify2.default)(_context2.t0), 'error');
	                if (_context2.t0.data) {
	                  _fee = _context2.t0.data.fee;

	                  if (_fee) {
	                    _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', (0, _utils.toBTC)(_fee)));
	                  }
	                }

	              case 13:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2, [[0, 9]]);
	      }));

	      return function (_x2) {
	        return _ref3.apply(this, arguments);
	      };
	    }(), _this.getEstimatedLTCFee = function () {
	      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
	        var _ref6, fee, _fee2;

	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                _context3.prev = 0;
	                _context3.next = 3;
	                return clientCore.ltc.prepareTx(data);

	              case 3:
	                _ref6 = _context3.sent;
	                fee = _ref6.fee;

	                console.log('wallet send clientCore.ltc.prepareTx , fee = ', fee);
	                _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', (0, _utils.toBTC)(fee)));
	                _context3.next = 13;
	                break;

	              case 9:
	                _context3.prev = 9;
	                _context3.t0 = _context3['catch'](0);

	                console.log((0, _stringify2.default)(_context3.t0), 'error');
	                if (_context3.t0.data) {
	                  _fee2 = _context3.t0.data.fee;

	                  if (_fee2) {
	                    _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', (0, _utils.toBTC)(_fee2)));
	                  }
	                }

	              case 13:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, _this2, [[0, 9]]);
	      }));

	      return function (_x3) {
	        return _ref5.apply(this, arguments);
	      };
	    }(), _this.getEstimatedNEOFee = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
	      return _regenerator2.default.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', 0));

	            case 1:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, _callee4, _this2);
	    })), _this.getEstimatedCYBFee = function () {
	      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data) {
	        var _ref9, fee, balanceNotEnough;

	        return _regenerator2.default.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                _context5.prev = 0;
	                _context5.next = 3;
	                return clientCore.cyb.getFee(data);

	              case 3:
	                _ref9 = _context5.sent;
	                fee = _ref9.fee;
	                balanceNotEnough = _ref9.balanceNotEnough;

	                console.log('[getEstimatedCYBFee]', fee, balanceNotEnough);
	                _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', fee));
	                _context5.next = 13;
	                break;

	              case 10:
	                _context5.prev = 10;
	                _context5.t0 = _context5['catch'](0);

	                console.log((0, _stringify2.default)(_context5.t0), 'error');

	              case 13:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, _this2, [[0, 10]]);
	      }));

	      return function (_x4) {
	        return _ref8.apply(this, arguments);
	      };
	    }(), _this.getEstimatedETHFee = function () {
	      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(selectedCoin, _ref11, etc) {
	        var testNet = _ref11.testNet,
	            selector = _ref11.selector,
	            address = _ref11.address;
	        var gas, gasPrice, nonce;
	        return _regenerator2.default.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                if (!(selector === 0)) {
	                  _context6.next = 2;
	                  break;
	                }

	                return _context6.abrupt('return');

	              case 2:
	                _context6.prev = 2;
	                _context6.next = 5;
	                return clientCore.eth.getGasLimit({ erc20: selectedCoin === 'ETH' ? '' : selectedCoin });

	              case 5:
	                gas = _context6.sent;
	                _context6.next = 8;
	                return clientCore.eth.getGasPrice(testNet, etc);

	              case 8:
	                gasPrice = _context6.sent;
	                _context6.next = 11;
	                return clientCore.eth.getNonce({ address: address, testNet: testNet, etc: etc });

	              case 11:
	                nonce = _context6.sent;

	                console.log('nonce:', nonce);
	                _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'gas', gas));
	                _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'gasPrice', gasPrice));
	                _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'nonce', nonce));
	                _context6.next = 24;
	                break;

	              case 18:
	                _context6.prev = 18;
	                _context6.t0 = _context6['catch'](2);
	                _context6.next = 22;
	                return _bluebird2.default.delay(2000);

	              case 22:
	                _context6.next = 24;
	                return _this.getEstimatedETHFee(selectedCoin, { testNet: testNet, selector: selector, address: address }, etc);

	              case 24:
	              case 'end':
	                return _context6.stop();
	            }
	          }
	        }, _callee6, _this2, [[2, 18]]);
	      }));

	      return function (_x5, _x6, _x7) {
	        return _ref10.apply(this, arguments);
	      };
	    }(), _this.handleCreateTransaction = function () {
	      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref13) {
	        var recipient = _ref13.recipient,
	            amount = _ref13.amount,
	            memo = _ref13.memo;

	        var _this$props, selectedCoin, addresses, fee, _this$props$deviceLis, testNet, address, _selector, _selector2, erc20, _this$props2, gas, gasPrice, nonce, _erc, _this$props3, _gas, _gasPrice, _nonce;

	        return _regenerator2.default.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                _this$props = _this.props, selectedCoin = _this$props.selectedCoin, addresses = _this$props.addresses, fee = _this$props.fee, _this$props$deviceLis = (0, _slicedToArray3.default)(_this$props.deviceList, 1), testNet = _this$props$deviceLis[0].TestNet;
	                address = addresses[selectedCoin] || addresses.ETH;
	                _context7.t0 = selectedCoin;
	                _context7.next = _context7.t0 === 'BTC' ? 5 : _context7.t0 === 'LTC' ? 8 : _context7.t0 === 'NEO' ? 11 : _context7.t0 === 'GAS' ? 13 : _context7.t0 === 'ETC' ? 15 : _context7.t0 === 'CYB' ? 19 : 21;
	                break;

	              case 5:
	                _selector = _this.state.feeLevel;


	                _this.props.dispatch({
	                  type: 'send/createBTCTransaction',
	                  payload: { address: address, to: recipient, value: amount, fee: fee, memo: memo, selector: _selector, testNet: testNet }
	                });
	                return _context7.abrupt('break', 24);

	              case 8:
	                _selector2 = _this.state.feeLevel;


	                _this.props.dispatch({
	                  type: 'send/createLTCTransaction',
	                  payload: { address: address, to: recipient, value: amount, fee: fee, memo: memo, selector: _selector2, testNet: testNet }
	                });
	                return _context7.abrupt('break', 24);

	              case 11:
	                _this.props.dispatch({
	                  type: 'send/createNEOTransaction',
	                  payload: { address: address, to: recipient, value: amount, testNet: testNet, GAS: false }
	                });
	                return _context7.abrupt('break', 24);

	              case 13:
	                _this.props.dispatch({
	                  type: 'send/createNEOTransaction',
	                  payload: { address: address, to: recipient, value: amount, testNet: testNet, GAS: true }
	                });
	                return _context7.abrupt('break', 24);

	              case 15:
	                erc20 = null;
	                _this$props2 = _this.props, gas = _this$props2.gas, gasPrice = _this$props2.gasPrice, nonce = _this$props2.nonce;


	                _this.props.dispatch({
	                  type: 'send/createETHTransaction',
	                  payload: { address: address, to: recipient, value: amount, memo: memo, testNet: testNet, etc: true, erc20: erc20, gas: gas, gasprice: gasPrice, nonce: nonce }
	                });
	                return _context7.abrupt('break', 24);

	              case 19:
	                _this.props.dispatch({
	                  type: 'send/createCYBTransaction',
	                  payload: { from: address, to: recipient, value: amount, testNet: testNet, GAS: false }
	                });
	                return _context7.abrupt('break', 24);

	              case 21:
	                _erc = selectedCoin === 'ETH' ? null : selectedCoin;
	                _this$props3 = _this.props, _gas = _this$props3.gas, _gasPrice = _this$props3.gasPrice, _nonce = _this$props3.nonce;


	                _this.props.dispatch({
	                  type: 'send/createETHTransaction',
	                  payload: { address: address, to: recipient, value: amount, memo: memo, testNet: testNet, etc: false, erc20: _erc, gas: _gas, gasprice: _gasPrice, nonce: _nonce }
	                });

	              case 24:
	              case 'end':
	                return _context7.stop();
	            }
	          }
	        }, _callee7, _this2);
	      }));

	      return function (_x8) {
	        return _ref12.apply(this, arguments);
	      };
	    }(), _this.handleCoinTypeChange = function (event, type) {
	      _this.props.dispatch({ type: 'send/setSelectedCoin', payload: { coinType: type } });

	      _this.setState({ unitFieldFocused: false, feeLevel: 5, estimatedFee: null, balanceNotEnough: false });

	      var recipient = _this.props.recipient;

	      _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'recipient', ''));
	      setTimeout(function () {
	        _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'recipient', recipient));
	      }, 0);
	    }, _this.handleClearFields = function () {
	      _this.props.dispatch((0, _reduxForm.reset)('createTransaction'));
	    }, _this.handleQRScan = function () {
	      var onResult = function onResult(result) {
	        _this.handleQRResult(result);
	      };

	      var modalPlayload = { modalType: 'QRScan', modalProps: { onResult: onResult } };
	      _this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
	    }, _this.handleSelectQRCode = function (files) {
	      if (!files || files.length < 1) {
	        return;
	      }

	      document.querySelector('input[name*=recipient]').focus();

	      var file = files.slice(-1).pop();
	      var fileReader = new window.FileReader();
	      fileReader.onload = function (event) {
	        var result = event.target.result;

	        var img = new window.Image();
	        var canvas = document.createElement('canvas');
	        var ctx = canvas.getContext('2d');

	        img.onload = function () {
	          var width = img.width,
	              height = img.height;

	          canvas.width = width;
	          canvas.height = height;

	          ctx.drawImage(img, 0, 0, width, height);

	          var imageData = ctx.getImageData(0, 0, width, height);
	          var decoded = _jsqr2.default.decodeQRFromImage(imageData.data, imageData.width, imageData.height);

	          if (decoded) {
	            _this.handleQRResult(decoded);
	          }
	        };
	        img.src = result;
	      };

	      fileReader.readAsDataURL(file);
	    }, _this.handleQRResult = function (result) {
	      var parts = result.match(/(\b[^:?$]+\b)/g);
	      var type = parts.length > 1 ? parts[0] : null;
	      var address = !type ? parts[0] : parts[1];

	      var recipient = address;
	      if (type === 'iban') {
	        recipient = clientCore.eth.getWeb3().eth.Iban.toAddress(address);
	      }

	      _this.props.dispatch((0, _reduxForm.change)('createTransaction', 'recipient', recipient));
	    }, _this.renderMenuItem = function (_ref14, index) {
	      var type = _ref14.type,
	          amount = _ref14.amount;
	      var selectedCoin = _this.props.selectedCoin;

	      var amountStr = amount ? amount.toString() : '0';
	      // 判断一下有没有减号
	      if (amountStr.indexOf('-') >= 0) {
	        amountStr = '0' + String(Number(amountStr) + 1).substr(1);
	      } else if (amountStr === 'NaN') {
	        amountStr = localizedStrings.unavailable;
	      }

	      var item = _react2.default.createElement(
	        'div',
	        { className: _index2.default.currencyField },
	        _react2.default.createElement(_Avatar2.default, {
	          size: 22,
	          style: { width: 22, height: 22, margin: '-1px 0px 1px 0px' },
	          src: _components.CryptoIcons[type.toLowerCase()]
	        }),
	        _react2.default.createElement(
	          'b',
	          null,
	          type
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          amountStr
	        )
	      );

	      return _react2.default.createElement(_MenuItem2.default, {
	        key: index,
	        innerDivStyle: { color: selectedCoin === type ? 'white' : 'rgba(255,255,255,0.6)', fontSize: 15 },
	        value: type,
	        primaryText: item
	      });
	    }, _this.renderTextField = function (_ref15) {
	      var input = _ref15.input,
	          label = _ref15.label,
	          _ref15$meta = _ref15.meta,
	          touched = _ref15$meta.touched,
	          error = _ref15$meta.error,
	          refactorInput = _ref15.refactorInput,
	          errorText = _ref15.errorText,
	          custom = (0, _objectWithoutProperties3.default)(_ref15, ['input', 'label', 'meta', 'refactorInput', 'errorText']);

	      return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
	        style: { fontSize: 17 },
	        floatingLabelStyle: { fontSize: 16, top: 34 },
	        floatingLabelText: label,
	        fullWidth: true,
	        errorText: errorText || touched && error
	      }, !refactorInput ? input : refactorInput(input), custom));
	    }, _this.renderToggle = function (_ref16) {
	      var _ref16$input = _ref16.input,
	          onChange = _ref16$input.onChange,
	          value = _ref16$input.value,
	          inputProps = (0, _objectWithoutProperties3.default)(_ref16$input, ['onChange', 'value']),
	          defaultToggled = _ref16.defaultToggled,
	          meta = _ref16.meta,
	          props = (0, _objectWithoutProperties3.default)(_ref16, ['input', 'defaultToggled', 'meta']);

	      return _react2.default.createElement(_Toggle2.default, (0, _extends3.default)({}, inputProps, props, { onToggle: onChange, toggled: !!value }));
	    }, _this.renderEstimatedInfo = function () {
	      var selectedCoin = _this.props.selectedCoin;
	      var _this$state = _this.state,
	          estimatedFee = _this$state.estimatedFee,
	          feeLevel = _this$state.feeLevel;


	      switch (selectedCoin) {
	        case 'BTC':
	          {
	            return _react2.default.createElement(
	              'div',
	              { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } },
	              !!estimatedFee && localizedStrings.estimate + ': ' + estimatedFee + ' BTC\uFF0C' + feeLevel * 10 + ' ' + localizedStrings.minute
	            );
	          }
	        case 'LTC':
	          {
	            return _react2.default.createElement(
	              'div',
	              { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } },
	              !!estimatedFee && localizedStrings.estimate + ': ' + estimatedFee + ' LTC\uFF0C' + feeLevel * 2 + ' ' + localizedStrings.minute
	            );
	          }
	        case 'NEO':
	          {
	            console.log('renderEstimatedInfo NEO');
	            return _react2.default.createElement('div', { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } });
	          }
	        case 'GAS':
	          {
	            return _react2.default.createElement('div', { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } });
	          }
	        case 'CYB':
	          {
	            console.log('renderEstimatedInfo CYB');
	            return _react2.default.createElement(
	              'div',
	              { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } },
	              !!estimatedFee && localizedStrings.estimate + ': ' + estimatedFee + ' CYB'
	            );
	          }
	        case 'ETC':
	          {
	            return _react2.default.createElement(
	              'div',
	              { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } },
	              !!estimatedFee && localizedStrings.estimate + ': ' + estimatedFee + ' ETC'
	            );
	          }

	        default:
	          {
	            return _react2.default.createElement(
	              'div',
	              { style: { display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' } },
	              !!estimatedFee && localizedStrings.estimate + ': ' + estimatedFee + ' ETH'
	            );
	          }
	      }
	    }, _this.renderUnitField = function () {
	      var _this$state2 = _this.state,
	          unitFieldFocused = _this$state2.unitFieldFocused,
	          anchorEl = _this$state2.anchorEl,
	          unitFieldWidth = _this$state2.unitFieldWidth;
	      var _this$props4 = _this.props,
	          balances = _this$props4.balances,
	          selectedCoin = _this$props4.selectedCoin,
	          recipient = _this$props4.recipient;


	      var recipientType = selectedCoin;
	      var recipientTypes = validateRecipient(recipient);

	      if (recipientTypes.indexOf('ETH') > -1) {
	        var erc20Types = balances.filter(function (_ref17) {
	          var type = _ref17.type;
	          return ['BTC', 'LTC', 'NEO', 'GAS', 'ETH', 'ETC', 'CYB'].indexOf(type) < 0;
	        }).map(function (_ref18) {
	          var type = _ref18.type;
	          return type;
	        });
	        recipientTypes.push.apply(recipientTypes, (0, _toConsumableArray3.default)(erc20Types));
	      }

	      if (recipientTypes.length > 0 && recipientTypes.indexOf(recipientType) < 0) {
	        recipientType = recipientTypes[0];

	        _this.props.dispatch({ type: 'send/setSelectedCoin', payload: { coinType: recipientType } });
	        _this.setState({ unitFieldFocused: false, feeLevel: 5, estimatedFee: null });
	      }

	      var balance = balances.find(function (_ref19) {
	        var type = _ref19.type;
	        return type === recipientType;
	      });

	      var ItemToMeasure = (0, _reactMeasure.withContentRect)('bounds')(function (_ref20) {
	        var measureRef = _ref20.measureRef;

	        var amountStr = '';
	        if (balance.amount) {
	          amountStr = balance.amount.toString();
	          // 判断一下有没有减号，避免科学计数法
	          if (amountStr.indexOf('-') >= 0) {
	            amountStr = '0' + String(Number(amountStr) + 1).substr(1);
	          } else if (amountStr === 'NaN') {
	            amountStr = localizedStrings.unavailable;
	          }
	        } else {
	          amountStr = '0';
	        }

	        return _react2.default.createElement(
	          'div',
	          { ref: measureRef, className: _index2.default.relativeField, style: { marginBottom: 10 } },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.currencyField, style: { position: 'absolute', left: 0, top: 40 } },
	            _react2.default.createElement(_Avatar2.default, {
	              size: 22,
	              style: { width: 22, height: 22, margin: '-1px 0px 1px 0px' },
	              src: _components.CryptoIcons[balance.type.toLowerCase()]
	            }),
	            _react2.default.createElement(
	              'b',
	              null,
	              balance.type
	            ),
	            _react2.default.createElement(
	              'span',
	              null,
	              amountStr
	            )
	          ),
	          _react2.default.createElement(_TextField2.default, {
	            name: 'unitField',
	            floatingLabelText: localizedStrings.coinType,
	            floatingLabelFixed: true,
	            fullWidth: true,
	            floatingLabelStyle: { fontSize: 16, top: 34 },
	            style: { fontSize: 17 },
	            underlineStyle: { borderColor: unitFieldFocused ? '#ee602b' : '#686868' },
	            onFocus: function onFocus() {
	              return _this.setState({
	                unitFieldFocused: true,
	                anchorEl: _this.lastFieldParent,
	                unitFieldWidth: document.querySelector('input[name*=unitField]').offsetWidth || 920
	              });
	            },
	            onBlur: function onBlur() {
	              return _this.setState({ unitFieldFocused: false });
	            }
	          })
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        {
	          className: _index2.default.relativeField,
	          ref: function ref(_ref22) {
	            _this.lastFieldParent = _ref22;
	          } },
	        _react2.default.createElement(ItemToMeasure, null),
	        _react2.default.createElement(
	          _Popover2.default,
	          {
	            open: unitFieldFocused,
	            anchorEl: anchorEl,
	            anchorOrigin: { horizontal: 'right', vertical: 'top' },
	            targetOrigin: { horizontal: 'right', vertical: 'top' },
	            style: { marginTop: 70, marginRight: 0, background: '#202020' },
	            onRequestClose: function onRequestClose() {
	              return _this.setState({ unitFieldFocused: false });
	            }
	          },
	          _react2.default.createElement(
	            _Menu2.default,
	            {
	              autoWidth: false,
	              maxHeight: 230,
	              width: unitFieldWidth,
	              value: recipientType,
	              onChange: _this.handleCoinTypeChange
	            },
	            balances && balances.filter(function (_ref21) {
	              var type = _ref21.type;
	              return !recipientTypes.length || recipientTypes.indexOf(type) > -1;
	            }).map(_this.renderMenuItem)
	          )
	        )
	      );
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Send, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.querySelector('input[name*=recipient]').focus();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var recipient = nextProps.recipient,
	          selectedCoin = nextProps.selectedCoin,
	          amount = nextProps.amount,
	          fee = nextProps.fee,
	          valid = nextProps.valid,
	          fullBalance = nextProps.fullBalance,
	          displayAdvanced = nextProps.displayAdvanced,
	          balances = nextProps.balances;


	      if (selectedCoin !== 'BTC' && selectedCoin !== 'LTC' && selectedCoin !== 'NEO ' && selectedCoin !== 'GAS' && selectedCoin !== 'CYB' && selectedCoin !== 'EOS') {
	        if (fee) {
	          this.setState({ estimatedFee: fee, balanceNotEnough: false });
	        } else {
	          this.setState({ estimatedFee: null, balanceNotEnough: false });
	        }
	      }

	      if (selectedCoin !== this.props.selectedCoin) {
	        this.props.dispatch((0, _reduxForm.reset)('createTransaction'));
	        this.getEstimatedFee(nextProps);
	        this.props.dispatch((0, _reduxForm.change)('createTransaction', 'recipient', recipient));
	        this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', fee));
	      }

	      if (amount !== this.props.amount && this.props.amount !== undefined && this.props.selectedCoin === selectedCoin) {
	        if (!parseFloat(fee) || !!parseFloat(fee) && !displayAdvanced || fullBalance && !this.props.fullBalance) {
	          this.getEstimatedFee(nextProps);
	        }

	        this.props.dispatch((0, _reduxForm.change)('createTransaction', 'amount', '' + amount));
	      }

	      if (!!fee && new RegExp(/(^\d+)\.?(\d*$)/).test(fee) || !fee) {
	        this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', '' + fee));
	      } else {
	        this.props.dispatch((0, _reduxForm.change)('createTransaction', 'fee', this.props.fee));
	      }

	      try {
	        if (selectedCoin) {
	          var selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
	          var currentAmount = amount ? new _big2.default(amount) : new _big2.default(0);
	          var currentFee = new _big2.default(fee);
	          var currentbalance = new _big2.default(balances.find(function (_ref23) {
	            var type = _ref23.type;
	            return type === selectedCoin;
	          }).amount);
	          if (selectedType != 'ERC20') {
	            if (currentAmount.plus(currentFee).gt(currentbalance)) {
	              this.setState({ estimatedFee: fee, balanceNotEnough: true });
	            } else {
	              this.setState({ estimatedFee: fee, balanceNotEnough: false });
	            }
	          } else {
	            var ethBalance = new _big2.default(balances.find(function (_ref24) {
	              var type = _ref24.type;
	              return type === 'ETH';
	            }).amount);
	            if (ethBalance.lt(currentFee) || currentbalance.lt(currentAmount)) {
	              this.setState({ estimatedFee: fee, balanceNotEnough: true });
	            } else {
	              this.setState({ estimatedFee: fee, balanceNotEnough: false });
	            }
	          }
	        }
	      } catch (error) {
	        console.log('error: ' + error);
	      }

	      if (fullBalance && !this.props.fullBalance) {
	        this.getEstimatedFee(nextProps);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          handleSubmit = _props.handleSubmit,
	          valid = _props.valid,
	          inProgress = _props.inProgress,
	          recipient = _props.recipient,
	          fullBalance = _props.fullBalance,
	          displayAdvanced = _props.displayAdvanced,
	          selectedCoin = _props.selectedCoin,
	          fee = _props.fee,
	          balances = _props.balances;
	      var _state = this.state,
	          feeLevel = _state.feeLevel,
	          balanceNotEnough = _state.balanceNotEnough;


	      var balance = balances.find(function (_ref25) {
	        var type = _ref25.type;
	        return type === selectedCoin;
	      }).amount;
	      var unavailable = !balance || isNaN(balance);
	      var selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
	      var transferOption = constants.transferOptions[selectedType];

	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.relativeField, style: { marginBottom: 10 } },
	          _react2.default.createElement(_reduxForm.Field, {
	            component: this.renderTextField,
	            name: 'recipient',
	            label: localizedStrings.recipientAddress,
	            hintText: localizedStrings.recipientHint,
	            floatingLabelFixed: true
	          }),
	          _react2.default.createElement(
	            'div',
	            {
	              className: _index2.default.icons
	            },
	            _react2.default.createElement(
	              _IconButton2.default,
	              {
	                style: { float: 'right', transform: 'scale(0.85)' },
	                onTouchTap: this.handleQRScan
	              },
	              _react2.default.createElement(_cropFree2.default, { color: 'rgba(255, 255, 255, 0.5)', hoverColor: 'rgba(255, 255, 255, 0.8)' })
	            ),
	            _react2.default.createElement(
	              _IconButton2.default,
	              {
	                style: { float: 'right', transform: 'scale(0.85)', marginRight: -15 }
	              },
	              _react2.default.createElement(
	                _reactDropzone2.default,
	                {
	                  onDrop: this.handleSelectQRCode,
	                  accept: 'image/*'
	                },
	                _react2.default.createElement(_photo2.default, { color: 'rgba(255, 255, 255, 0.5)', hoverColor: 'rgba(255, 255, 255, 0.8)' })
	              )
	            )
	          )
	        ),
	        this.renderUnitField(),
	        _react2.default.createElement(_reduxForm.Field, {
	          style: { fontSize: 17, width: '50%', marginBottom: 10 },
	          component: this.renderTextField,
	          name: 'amount',
	          label: localizedStrings.sendAmount,
	          floatingLabelFixed: true,
	          errorText: balanceNotEnough ? localizedStrings.exceedBalanceHint : null,
	          disabled: fullBalance || unavailable
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.toggleDiv },
	          _react2.default.createElement(_reduxForm.Field, {
	            name: 'fullBalance',
	            component: this.renderToggle,
	            label: localizedStrings.fullBalance,
	            labelPosition: 'right',
	            disabled: unavailable
	          })
	        ),
	        _react2.default.createElement(_reduxForm.Field, {
	          style: { fontSize: 17, width: '50%', marginBottom: 10 },
	          component: this.renderTextField,
	          name: 'fee',
	          label: localizedStrings.fee,
	          floatingLabelFixed: true,
	          disabled: !transferOption.feeEditable || !displayAdvanced || unavailable
	        }),
	        _react2.default.createElement(
	          'div',
	          {
	            className: _index2.default.toggleDiv,
	            style: { display: transferOption.advanced ? 'flex' : 'none' } },
	          _react2.default.createElement(_reduxForm.Field, {
	            name: 'displayAdvanced',
	            component: this.renderToggle,
	            label: localizedStrings.advanced,
	            labelPosition: 'right',
	            disabled: unavailable
	          })
	        ),
	        displayAdvanced && transferOption.feeType === constants.feeTypes.multiply && _react2.default.createElement(
	          'div',
	          {
	            className: _index2.default.collapse,
	            style: { width: '60%', transform: 'scale(0.8)', transformOrigin: 'left', marginRight: '40%' }
	          },
	          _react2.default.createElement(_reduxForm.Field, {
	            component: this.renderTextField,
	            name: 'gas',
	            label: 'Gas',
	            floatingLabelFixed: true,
	            style: { fontSize: 17, flex: 1 }
	          }),
	          _react2.default.createElement(_reduxForm.Field, {
	            component: this.renderTextField,
	            name: 'gasPrice',
	            label: 'Gas Price',
	            floatingLabelFixed: true,
	            style: { fontSize: 17, flex: 1 }
	          })
	        ),
	        displayAdvanced && transferOption.feeType === constants.feeTypes.multiply && transferOption.nonce && _react2.default.createElement(
	          'div',
	          {
	            className: _index2.default.collapse,
	            style: { width: '30%', transform: 'scale(0.8)', transformOrigin: 'left' }
	          },
	          _react2.default.createElement(_reduxForm.Field, {
	            component: this.renderTextField,
	            name: 'nonce',
	            label: 'Nonce',
	            floatingLabelFixed: true
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.buttonDiv },
	          _react2.default.createElement(_FlatButton2.default, {
	            style: { float: 'right' },
	            label: localizedStrings.confirmSend,
	            labelStyle: { fontSize: 18 },
	            primary: true,
	            disabled: !(valid && recipient) || balanceNotEnough || inProgress,
	            onTouchTap: handleSubmit(this.handleCreateTransaction)
	          }),
	          _react2.default.createElement(_FlatButton2.default, {
	            style: { float: 'right' },
	            label: localizedStrings.clear,
	            labelStyle: { fontSize: 18 },
	            disabled: inProgress || !fee,
	            onTouchTap: this.handleClearFields
	          })
	        )
	      );
	    }
	  }]);
	  return Send;
	}(_react2.default.Component);

	Send.propTypes = {
	  recipient: _propTypes2.default.string,
	  amount: _propTypes2.default.string,
	  addresses: _propTypes2.default.object,
	  balances: _propTypes2.default.array,
	  deviceList: _propTypes2.default.array,
	  selectedCoin: _propTypes2.default.string
	};

	function validate(_ref26, _ref27) {
	  var recipient = _ref26.recipient,
	      amount = _ref26.amount,
	      gas = _ref26.gas,
	      gasPrice = _ref26.gasPrice,
	      fee = _ref26.fee,
	      nonce = _ref26.nonce;
	  var balances = _ref27.balances,
	      selectedCoin = _ref27.selectedCoin,
	      displayAdvanced = _ref27.displayAdvanced;

	  var errors = {};

	  if (!recipient) {
	    errors.recipient = localizedStrings.recipientRequired;
	  } else {
	    var legal = validateRecipient(recipient).length > 0;
	    console.log('validate = ', legal);

	    if (!legal) {
	      errors.recipient = localizedStrings.recipientInvalid;
	    }
	  }

	  var selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
	  var transferOption = constants.transferOptions[selectedType];

	  if (!amount || !/^([1-9][0-9]*)(\.[0-9]*)?$|^(0\.[0-9]*)$/.test(amount)) {
	    errors.amount = localizedStrings.amountInvalid;
	  } else {
	    var parts = (amount + '').split('.');
	    if (parts.length === 2 && parts[1].length > transferOption.precision) {
	      errors.amount = localizedStrings.amountInvalid;
	    }

	    if (selectedCoin === 'NEO' && parts.length === 2) {
	      // neo只能整数交易
	      errors.amount = localizedStrings.amountInvalid_fractionalamount;
	    }

	    var balance = balances.find(function (_ref28) {
	      var type = _ref28.type;
	      return type === selectedCoin;
	    }).amount;
	    try {
	      var tmpFee = selectedType === 'ERC20' ? 0 : fee;
	      if (new _big2.default(amount).plus(tmpFee).minus(balance).gt(0)) {
	        errors.amount = localizedStrings.balanceNotEnough;
	      }
	    } catch (error) {
	      errors.amount = localizedStrings.balanceNotEnough;
	    }

	    if (selectedCoin !== 'BTC' && selectedCoin !== 'ETH' && selectedCoin !== 'ETC' && selectedCoin !== 'LTC' && selectedCoin !== 'NEO' && selectedCoin !== 'GAS' && selectedCoin !== 'CYB') {
	      // erc20
	      var ethBalance = balances.find(function (_ref29) {
	        var type = _ref29.type;
	        return type === 'ETH';
	      }).amount;
	      if (!parseFloat(ethBalance)) {
	        errors.amount = localizedStrings.ethNotEnough;
	      }
	    }
	  }

	  var amountInvalid = false;
	  try {
	    var tmp = new _big2.default(amount);
	  } catch (error) {
	    errors.amount = localizedStrings.amountInvalid;
	    amountInvalid = true;
	  }
	  var zeroForbiddenTypes = ['BTC', 'LTC', 'NEO', 'CYB', 'GAS'];
	  if (zeroForbiddenTypes.indexOf(selectedCoin) < 0 && !amountInvalid && parseFloat(amount) === 0) {
	    errors.amount = null;
	  }

	  if (displayAdvanced && transferOption.feeType === constants.feeTypes.multiply) {
	    if (!gas || !/^[1-9]\d*$/.test(gas)) {
	      errors.gas = localizedStrings.gasInvalid;
	    }

	    if (!gasPrice || !/^[1-9]\d*$/.test(gasPrice)) {
	      errors.gasPrice = localizedStrings.gasPriceInvalid;
	    }
	  }

	  if (displayAdvanced && transferOption.nonce) {
	    if (!/^([1-9]\d*|[0]{1,1})$/.test('' + nonce)) {
	      errors.nonce = localizedStrings.nonceInvalid;
	    }
	  }

	  if (!!fee && !(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(fee) || /^[1-9]\d*$/.test(fee))) {
	    if ((fee === 0 || fee === '0') && (selectedCoin === 'NEO' || selectedCoin === 'GAS')) {
	      errors.fee = null;
	    } else {
	      errors.fee = localizedStrings.feeInvalid;
	    }
	  } else {
	    if (parseFloat(fee) >= 0) {
	      var _parts = (fee + '').split('.');
	      if (_parts.length === 2 && _parts[1].length > transferOption.precision) {
	        errors.fee = localizedStrings.feeInvalid;
	      }
	    } else {
	      errors.fee = localizedStrings.feeInvalid;
	    }
	  }

	  console.log('validate.errors = ', errors);
	  return errors;
	}

	var SendForm = (0, _reduxForm.reduxForm)({
	  form: 'createTransaction',
	  initialValues: { amount: '0', fee: '0', gas: '0', gasPrice: '0' },
	  validate: validate
	})(Send);

	var selector = (0, _reduxForm.formValueSelector)('createTransaction');

	function mapStateToProps(state) {
	  var _selector3 = selector(state, 'recipient', 'amount', 'fee', 'gas', 'gasPrice', 'fullBalance', 'displayAdvanced', 'nonce'),
	      recipient = _selector3.recipient,
	      amount = _selector3.amount,
	      fee = _selector3.fee,
	      gas = _selector3.gas,
	      gasPrice = _selector3.gasPrice,
	      fullBalance = _selector3.fullBalance,
	      displayAdvanced = _selector3.displayAdvanced,
	      nonce = _selector3.nonce;

	  var _state$device = state.device,
	      addresses = _state$device.addresses,
	      deviceList = _state$device.list,
	      balanceMap = state.wallet.balances,
	      _state$send = state.send,
	      selectedCoin = _state$send.selectedCoin,
	      inProgress = _state$send.inProgress;

	  var coinTypes = (0, _keys2.default)(balanceMap);

	  // TODO:: 在支持EOS后，这里要加上EOS
	  var types = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'];
	  var sortedCoinTypes = types.concat(coinTypes.filter(function (type) {
	    return types.indexOf(type) < 0;
	  }));
	  var balances = sortedCoinTypes.map(function (type) {
	    return { type: type, amount: balanceMap[type] };
	  }).filter(function (_ref30) {
	    var type = _ref30.type,
	        amount = _ref30.amount;

	    return parseFloat(amount) > 0 || types.indexOf(type) > -1 && type !== 'GAS' || type === selectedCoin;
	  });

	  var selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
	  var transferOption = constants.transferOptions[selectedType];

	  var newAmount = amount;
	  var balance = balances.find(function (_ref31) {
	    var type = _ref31.type;
	    return type === selectedCoin;
	  }).amount;
	  if (fullBalance) {
	    if (types.indexOf(selectedCoin) > -1) {
	      try {
	        if (!!fee && !(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(fee) || /^[1-9]\d*$/.test(fee))) {
	          if (fee === '0' && (selectedCoin === 'NEO' || selectedCoin === 'GAS')) {
	            console.log('NEO fee allow 0');
	          } else {
	            throw localizedStrings.feeInvalid;
	          }
	        } else {
	          if (parseFloat(fee) >= 0) {
	            var parts = (fee + '').split('.');
	            if (parts.length === 2 && parts[1].length > transferOption.precision) {
	              throw localizedStrings.feeInvalid;
	            }
	          } else {
	            throw localizedStrings.feeInvalid;
	          }
	        }

	        newAmount = fee > balance ? '0' : new _big2.default(balance).minus(fee).toFixed(transferOption.precision);
	      } catch (error) {
	        console.error(error);
	      }
	    } else {
	      newAmount = balance;
	    }
	  }

	  var newFee = fee;

	  switch (transferOption.feeType) {
	    case constants.feeTypes.multiply:
	      {
	        try {
	          newFee = (0, _utils.toETH)(new _big2.default(gas).times(gasPrice));
	          newFee = isNaN(newFee) ? (0, _utils.toETH)(0) : newFee;
	        } catch (error) {
	          if (fee == undefined) {
	            newFee = (0, _utils.toETH)(0);
	          } else {
	            newFee = fee;
	          }
	        }
	        break;
	      }

	    case constants.feeTypes.fixed:
	      {
	        newFee = constants.transferOptions[selectedCoin].fee;
	        break;
	      }

	    default:
	      {
	        if (newFee || newFee === 0 || newFee === '0') {
	          if (!displayAdvanced) {
	            newFee = new _big2.default(newFee).toFixed(transferOption.precision);
	          }
	        }
	        break;
	      }
	  }

	  console.log('newfee', newFee);

	  return {
	    recipient: recipient,
	    amount: newAmount,
	    addresses: addresses,
	    deviceList: deviceList,
	    selectedCoin: selectedCoin,
	    inProgress: inProgress,
	    balances: balances,
	    fee: newFee,
	    gas: gas,
	    gasPrice: gasPrice,
	    nonce: nonce,
	    fullBalance: fullBalance,
	    displayAdvanced: displayAdvanced
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(SendForm);
	module.exports = exports['default'];

/***/ }),

/***/ 1108:
/***/ (function(module, exports, __webpack_require__) {

	var base58 = __webpack_require__(1109);
	var cryptoUtils = __webpack_require__(1110);
	var currencies = __webpack_require__(1114);

	var DEFAULT_CURRENCY_NAME = 'bitcoin';
	var DEFAULT_NETWORK_TYPE = 'prod';

	function getDecoded(address) {
	    try {
	        return base58.decode(address);
	    } catch (e) {
	        // if decoding fails, assume invalid address
	        return null;
	    }
	}

	function getChecksum(hashFunction, payload) {
	    // Each currency may implement different hashing algorithm
	    switch (hashFunction) {
	        case 'blake256':
	            return cryptoUtils.blake256Checksum(payload);
	            break;
	        case 'sha256':
	        default:
	            return cryptoUtils.sha256Checksum(payload);
	    }
	}

	function getAddressType(address, currency) {
	    currency = currency || {};
	    // should be 25 bytes per btc address spec and 26 decred
	    var expectedLength = currency.expectedLength || 25;
	    var hashFunction = currency.hashFunction || 'sha256';
	    var decoded = getDecoded(address);

	    if (decoded) {
	        var length = decoded.length;

	        if (length !== expectedLength) {
	            return null;
	        }

	        var checksum = cryptoUtils.toHex(decoded.slice(length - 4, length)),
	            body = cryptoUtils.toHex(decoded.slice(0, length - 4)),
	            goodChecksum = getChecksum(hashFunction, body);

	        return checksum === goodChecksum ? cryptoUtils.toHex(decoded.slice(0, expectedLength - 24)) : null;
	    }

	    return null;
	}

	function validate(address, currencyNameOrSymbol, networkType) {
	    currencyNameOrSymbol = currencyNameOrSymbol || DEFAULT_CURRENCY_NAME;
	    networkType = networkType || DEFAULT_NETWORK_TYPE;

	    var currency = currencies.getByNameOrSymbol(currencyNameOrSymbol);

	    if (currency.validator) {
	        return currency.validator.isValidAddress(address);
	    }

	    var correctAddressTypes;
	    var addressType = getAddressType(address, currency);
	    if (addressType == null) {
	        return false;
	    }

	    if (networkType === 'prod' || networkType === 'testnet'){
	        correctAddressTypes = currency.addressTypes[networkType]
	    } else {
	        correctAddressTypes = currency.addressTypes.prod.concat(currency.addressTypes.testnet);
	    }

	    return correctAddressTypes.indexOf(addressType) >= 0;
	}

	module.exports = {
	    getAddressType: getAddressType,
	    checksum: getChecksum,
	    validate: validate,
	};


/***/ }),

/***/ 1109:
/***/ (function(module, exports) {

	// Base58 encoding/decoding
	// Originally written by Mike Hearn for BitcoinJ
	// Copyright (c) 2011 Google Inc
	// Ported to JavaScript by Stefan Thomas
	// Merged Buffer refactorings from base58-native by Stephen Pair
	// Copyright (c) 2013 BitPay Inc

	var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
	var ALPHABET_MAP = {};
	for (var i = 0; i < ALPHABET.length; ++i) {
	    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
	}
	var BASE = ALPHABET.length;

	module.exports = {
	    decode: function(string) {
	        if (string.length === 0) return [];

	        var i, j, bytes = [0];
	        for (i = 0; i < string.length; ++i) {
	            var c = string[i];
	            if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

	            for (j = 0; j < bytes.length; ++j) bytes[j] *= BASE
	            bytes[0] += ALPHABET_MAP[c];

	            var carry = 0;
	            for (j = 0; j < bytes.length; ++j) {
	                bytes[j] += carry;
	                carry = bytes[j] >> 8;
	                bytes[j] &= 0xff
	            }

	            while (carry) {
	                bytes.push(carry & 0xff);
	                carry >>= 8;
	            }
	        }
	        // deal with leading zeros
	        for (i = 0; string[i] === '1' && i < string.length - 1; ++i){
	            bytes.push(0);
	        }

	        return bytes.reverse();
	    }
	};


/***/ }),

/***/ 1110:
/***/ (function(module, exports, __webpack_require__) {

	var jsSHA = __webpack_require__(1111);
	var Blake256 = __webpack_require__(1112);
	var keccak256 = __webpack_require__(1113)['keccak256'];

	function numberToHex (number) {
	    var hex = Math.round(number).toString(16);
	    if(hex.length === 1) {
	        hex = '0' + hex;
	    }
	    return hex;
	}

	module.exports = {
	    toHex: function (arrayOfBytes) {
	        var hex = '';
	        for(var i = 0; i < arrayOfBytes.length; i++) {
	            hex += numberToHex(arrayOfBytes[i]);
	        }
	        return hex;
	    },
	    sha256: function (hexString) {
	        var sha = new jsSHA('SHA-256', 'HEX');
	        sha.update(hexString);
	        return sha.getHash('HEX');
	    },
	    sha256Checksum: function (payload) {
	        return this.sha256(this.sha256(payload)).substr(0, 8);
	    },
	    blake256: function (hexString) {
	        return new Blake256().update(hexString, 'hex').digest('hex');
	    },
	    blake256Checksum: function (payload) {
	        return this.blake256(this.blake256(payload)).substr(0, 8);
	    },
	    keccak256: function (hexString) {
	        return keccak256(hexString);
	    }
	};


/***/ }),

/***/ 1111:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 A JavaScript implementation of the SHA family of hashes, as
	 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
	 HMAC implementation as defined in FIPS PUB 198a

	 Copyright Brian Turek 2008-2017
	 Distributed under the BSD License
	 See http://caligatio.github.com/jsSHA/ for more information

	 Several functions taken from Paul Johnston
	*/
	'use strict';(function(I){function w(c,a,d){var l=0,b=[],g=0,f,n,k,e,h,q,y,p,m=!1,t=[],r=[],u,z=!1;d=d||{};f=d.encoding||"UTF8";u=d.numRounds||1;if(u!==parseInt(u,10)||1>u)throw Error("numRounds must a integer >= 1");if(0===c.lastIndexOf("SHA-",0))if(q=function(b,a){return A(b,a,c)},y=function(b,a,l,f){var g,e;if("SHA-224"===c||"SHA-256"===c)g=(a+65>>>9<<4)+15,e=16;else throw Error("Unexpected error in SHA-2 implementation");for(;b.length<=g;)b.push(0);b[a>>>5]|=128<<24-a%32;a=a+l;b[g]=a&4294967295;
	b[g-1]=a/4294967296|0;l=b.length;for(a=0;a<l;a+=e)f=A(b.slice(a,a+e),f,c);if("SHA-224"===c)b=[f[0],f[1],f[2],f[3],f[4],f[5],f[6]];else if("SHA-256"===c)b=f;else throw Error("Unexpected error in SHA-2 implementation");return b},p=function(b){return b.slice()},"SHA-224"===c)h=512,e=224;else if("SHA-256"===c)h=512,e=256;else throw Error("Chosen SHA variant is not supported");else throw Error("Chosen SHA variant is not supported");k=B(a,f);n=x(c);this.setHMACKey=function(b,a,g){var e;if(!0===m)throw Error("HMAC key already set");
	if(!0===z)throw Error("Cannot set HMAC key after calling update");f=(g||{}).encoding||"UTF8";a=B(a,f)(b);b=a.binLen;a=a.value;e=h>>>3;g=e/4-1;if(e<b/8){for(a=y(a,b,0,x(c));a.length<=g;)a.push(0);a[g]&=4294967040}else if(e>b/8){for(;a.length<=g;)a.push(0);a[g]&=4294967040}for(b=0;b<=g;b+=1)t[b]=a[b]^909522486,r[b]=a[b]^1549556828;n=q(t,n);l=h;m=!0};this.update=function(a){var c,f,e,d=0,p=h>>>5;c=k(a,b,g);a=c.binLen;f=c.value;c=a>>>5;for(e=0;e<c;e+=p)d+h<=a&&(n=q(f.slice(e,e+p),n),d+=h);l+=d;b=f.slice(d>>>
	5);g=a%h;z=!0};this.getHash=function(a,f){var d,h,k,q;if(!0===m)throw Error("Cannot call getHash after setting HMAC key");k=C(f);switch(a){case "HEX":d=function(a){return D(a,e,k)};break;case "B64":d=function(a){return E(a,e,k)};break;case "BYTES":d=function(a){return F(a,e)};break;case "ARRAYBUFFER":try{h=new ArrayBuffer(0)}catch(v){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a){return G(a,e)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
	}q=y(b.slice(),g,l,p(n));for(h=1;h<u;h+=1)q=y(q,e,0,x(c));return d(q)};this.getHMAC=function(a,f){var d,k,t,u;if(!1===m)throw Error("Cannot call getHMAC without first setting HMAC key");t=C(f);switch(a){case "HEX":d=function(a){return D(a,e,t)};break;case "B64":d=function(a){return E(a,e,t)};break;case "BYTES":d=function(a){return F(a,e)};break;case "ARRAYBUFFER":try{d=new ArrayBuffer(0)}catch(v){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a){return G(a,e)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
	}k=y(b.slice(),g,l,p(n));u=q(r,x(c));u=y(k,e,h,u);return d(u)}}function m(){}function D(c,a,d){var l="";a/=8;var b,g;for(b=0;b<a;b+=1)g=c[b>>>2]>>>8*(3+b%4*-1),l+="0123456789abcdef".charAt(g>>>4&15)+"0123456789abcdef".charAt(g&15);return d.outputUpper?l.toUpperCase():l}function E(c,a,d){var l="",b=a/8,g,f,n;for(g=0;g<b;g+=3)for(f=g+1<b?c[g+1>>>2]:0,n=g+2<b?c[g+2>>>2]:0,n=(c[g>>>2]>>>8*(3+g%4*-1)&255)<<16|(f>>>8*(3+(g+1)%4*-1)&255)<<8|n>>>8*(3+(g+2)%4*-1)&255,f=0;4>f;f+=1)8*g+6*f<=a?l+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n>>>
	6*(3-f)&63):l+=d.b64Pad;return l}function F(c,a){var d="",l=a/8,b,g;for(b=0;b<l;b+=1)g=c[b>>>2]>>>8*(3+b%4*-1)&255,d+=String.fromCharCode(g);return d}function G(c,a){var d=a/8,l,b=new ArrayBuffer(d),g;g=new Uint8Array(b);for(l=0;l<d;l+=1)g[l]=c[l>>>2]>>>8*(3+l%4*-1)&255;return b}function C(c){var a={outputUpper:!1,b64Pad:"=",shakeLen:-1};c=c||{};a.outputUpper=c.outputUpper||!1;!0===c.hasOwnProperty("b64Pad")&&(a.b64Pad=c.b64Pad);if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");
	if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function B(c,a){var d;switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(c){case "HEX":d=function(a,b,c){var f=a.length,d,k,e,h,q;if(0!==f%2)throw Error("String of HEX type must be in byte increments");b=b||[0];c=c||0;q=c>>>3;for(d=0;d<f;d+=2){k=parseInt(a.substr(d,2),16);if(isNaN(k))throw Error("String of HEX type contains invalid characters");
	h=(d>>>1)+q;for(e=h>>>2;b.length<=e;)b.push(0);b[e]|=k<<8*(3+h%4*-1)}return{value:b,binLen:4*f+c}};break;case "TEXT":d=function(c,b,d){var f,n,k=0,e,h,q,m,p,r;b=b||[0];d=d||0;q=d>>>3;if("UTF8"===a)for(r=3,e=0;e<c.length;e+=1)for(f=c.charCodeAt(e),n=[],128>f?n.push(f):2048>f?(n.push(192|f>>>6),n.push(128|f&63)):55296>f||57344<=f?n.push(224|f>>>12,128|f>>>6&63,128|f&63):(e+=1,f=65536+((f&1023)<<10|c.charCodeAt(e)&1023),n.push(240|f>>>18,128|f>>>12&63,128|f>>>6&63,128|f&63)),h=0;h<n.length;h+=1){p=k+
	q;for(m=p>>>2;b.length<=m;)b.push(0);b[m]|=n[h]<<8*(r+p%4*-1);k+=1}else if("UTF16BE"===a||"UTF16LE"===a)for(r=2,n="UTF16LE"===a&&!0||"UTF16LE"!==a&&!1,e=0;e<c.length;e+=1){f=c.charCodeAt(e);!0===n&&(h=f&255,f=h<<8|f>>>8);p=k+q;for(m=p>>>2;b.length<=m;)b.push(0);b[m]|=f<<8*(r+p%4*-1);k+=2}return{value:b,binLen:8*k+d}};break;case "B64":d=function(a,b,c){var f=0,d,k,e,h,q,m,p;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");k=a.indexOf("=");a=a.replace(/\=/g,
	"");if(-1!==k&&k<a.length)throw Error("Invalid '=' found in base-64 string");b=b||[0];c=c||0;m=c>>>3;for(k=0;k<a.length;k+=4){q=a.substr(k,4);for(e=h=0;e<q.length;e+=1)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(q[e]),h|=d<<18-6*e;for(e=0;e<q.length-1;e+=1){p=f+m;for(d=p>>>2;b.length<=d;)b.push(0);b[d]|=(h>>>16-8*e&255)<<8*(3+p%4*-1);f+=1}}return{value:b,binLen:8*f+c}};break;case "BYTES":d=function(a,b,c){var d,n,k,e,h;b=b||[0];c=c||0;k=c>>>3;for(n=0;n<a.length;n+=
	1)d=a.charCodeAt(n),h=n+k,e=h>>>2,b.length<=e&&b.push(0),b[e]|=d<<8*(3+h%4*-1);return{value:b,binLen:8*a.length+c}};break;case "ARRAYBUFFER":try{d=new ArrayBuffer(0)}catch(l){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a,b,c){var d,n,k,e,h;b=b||[0];c=c||0;n=c>>>3;h=new Uint8Array(a);for(d=0;d<a.byteLength;d+=1)e=d+n,k=e>>>2,b.length<=k&&b.push(0),b[k]|=h[d]<<8*(3+e%4*-1);return{value:b,binLen:8*a.byteLength+c}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
	}return d}function r(c,a){return c>>>a|c<<32-a}function J(c,a,d){return c&a^~c&d}function K(c,a,d){return c&a^c&d^a&d}function L(c){return r(c,2)^r(c,13)^r(c,22)}function M(c){return r(c,6)^r(c,11)^r(c,25)}function N(c){return r(c,7)^r(c,18)^c>>>3}function O(c){return r(c,17)^r(c,19)^c>>>10}function P(c,a){var d=(c&65535)+(a&65535);return((c>>>16)+(a>>>16)+(d>>>16)&65535)<<16|d&65535}function Q(c,a,d,l){var b=(c&65535)+(a&65535)+(d&65535)+(l&65535);return((c>>>16)+(a>>>16)+(d>>>16)+(l>>>16)+(b>>>
	16)&65535)<<16|b&65535}function R(c,a,d,l,b){var g=(c&65535)+(a&65535)+(d&65535)+(l&65535)+(b&65535);return((c>>>16)+(a>>>16)+(d>>>16)+(l>>>16)+(b>>>16)+(g>>>16)&65535)<<16|g&65535}function x(c){var a=[],d;if(0===c.lastIndexOf("SHA-",0))switch(a=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],d=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],c){case "SHA-224":break;case "SHA-256":a=d;break;case "SHA-384":a=[new m,new m,
	new m,new m,new m,new m,new m,new m];break;case "SHA-512":a=[new m,new m,new m,new m,new m,new m,new m,new m];break;default:throw Error("Unknown SHA variant");}else throw Error("No SHA variants supported");return a}function A(c,a,d){var l,b,g,f,n,k,e,h,m,r,p,w,t,x,u,z,A,B,C,D,E,F,v=[],G;if("SHA-224"===d||"SHA-256"===d)r=64,w=1,F=Number,t=P,x=Q,u=R,z=N,A=O,B=L,C=M,E=K,D=J,G=H;else throw Error("Unexpected error in SHA-2 implementation");d=a[0];l=a[1];b=a[2];g=a[3];f=a[4];n=a[5];k=a[6];e=a[7];for(p=
	0;p<r;p+=1)16>p?(m=p*w,h=c.length<=m?0:c[m],m=c.length<=m+1?0:c[m+1],v[p]=new F(h,m)):v[p]=x(A(v[p-2]),v[p-7],z(v[p-15]),v[p-16]),h=u(e,C(f),D(f,n,k),G[p],v[p]),m=t(B(d),E(d,l,b)),e=k,k=n,n=f,f=t(g,h),g=b,b=l,l=d,d=t(h,m);a[0]=t(d,a[0]);a[1]=t(l,a[1]);a[2]=t(b,a[2]);a[3]=t(g,a[3]);a[4]=t(f,a[4]);a[5]=t(n,a[5]);a[6]=t(k,a[6]);a[7]=t(e,a[7]);return a}var H;H=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,
	2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,
	2756734187,3204031479,3329325298]; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return w}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(module.exports=w),exports=w):I.jsSHA=w})(this);


/***/ }),

/***/ 1112:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	/**
	 * Credits to https://github.com/cryptocoinjs/blake-hash
	 */
	Blake256.sigma = [
	    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	    [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
	    [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
	    [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
	    [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
	    [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
	    [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
	    [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
	    [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
	    [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
	    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	    [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
	    [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
	    [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
	    [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
	    [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]
	]

	Blake256.u256 = [
	    0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344,
	    0xa4093822, 0x299f31d0, 0x082efa98, 0xec4e6c89,
	    0x452821e6, 0x38d01377, 0xbe5466cf, 0x34e90c6c,
	    0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5, 0xb5470917
	]

	Blake256.padding = new Buffer([
	    0x80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	])

	Blake256.prototype._length_carry = function (arr) {
	    for (var j = 0; j < arr.length; ++j) {
	        if (arr[j] < 0x0100000000) break
	        arr[j] -= 0x0100000000
	        arr[j + 1] += 1
	    }
	}

	Blake256.prototype.update = function (data, encoding) {
	    data = new Buffer(data, encoding);
	    var block = this._block
	    var offset = 0

	    while (this._blockOffset + data.length - offset >= block.length) {
	        for (var i = this._blockOffset; i < block.length;) block[i++] = data[offset++]

	        this._length[0] += block.length * 8
	        this._length_carry(this._length)

	        this._compress()
	        this._blockOffset = 0
	    }

	    while (offset < data.length) block[this._blockOffset++] = data[offset++]
	    return this;
	}

	var zo = new Buffer([0x01])
	var oo = new Buffer([0x81])

	function rot (x, n) {
	    return ((x << (32 - n)) | (x >>> n)) >>> 0
	}

	function g (v, m, i, a, b, c, d, e) {
	    var sigma = Blake256.sigma
	    var u256 = Blake256.u256

	    v[a] = (v[a] + ((m[sigma[i][e]] ^ u256[sigma[i][e + 1]]) >>> 0) + v[b]) >>> 0
	    v[d] = rot(v[d] ^ v[a], 16)
	    v[c] = (v[c] + v[d]) >>> 0
	    v[b] = rot(v[b] ^ v[c], 12)
	    v[a] = (v[a] + ((m[sigma[i][e + 1]] ^ u256[sigma[i][e]]) >>> 0) + v[b]) >>> 0
	    v[d] = rot(v[d] ^ v[a], 8)
	    v[c] = (v[c] + v[d]) >>> 0
	    v[b] = rot(v[b] ^ v[c], 7)
	}

	function Blake256 () {
	    this._h = [
	        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	    ]

	    this._s = [0, 0, 0, 0]

	    this._block = new Buffer(64)
	    this._blockOffset = 0
	    this._length = [0, 0]

	    this._nullt = false

	    this._zo = zo
	    this._oo = oo
	}

	Blake256.prototype._compress = function () {
	    var u256 = Blake256.u256
	    var v = new Array(16)
	    var m = new Array(16)
	    var i

	    for (i = 0; i < 16; ++i) m[i] = this._block.readUInt32BE(i * 4)
	    for (i = 0; i < 8; ++i) v[i] = this._h[i] >>> 0
	    for (i = 8; i < 12; ++i) v[i] = (this._s[i - 8] ^ u256[i - 8]) >>> 0
	    for (i = 12; i < 16; ++i) v[i] = u256[i - 8]

	    if (!this._nullt) {
	        v[12] = (v[12] ^ this._length[0]) >>> 0
	        v[13] = (v[13] ^ this._length[0]) >>> 0
	        v[14] = (v[14] ^ this._length[1]) >>> 0
	        v[15] = (v[15] ^ this._length[1]) >>> 0
	    }

	    for (i = 0; i < 14; ++i) {
	        /* column step */
	        g(v, m, i, 0, 4, 8, 12, 0)
	        g(v, m, i, 1, 5, 9, 13, 2)
	        g(v, m, i, 2, 6, 10, 14, 4)
	        g(v, m, i, 3, 7, 11, 15, 6)
	        /* diagonal step */
	        g(v, m, i, 0, 5, 10, 15, 8)
	        g(v, m, i, 1, 6, 11, 12, 10)
	        g(v, m, i, 2, 7, 8, 13, 12)
	        g(v, m, i, 3, 4, 9, 14, 14)
	    }

	    for (i = 0; i < 16; ++i) this._h[i % 8] = (this._h[i % 8] ^ v[i]) >>> 0
	    for (i = 0; i < 8; ++i) this._h[i] = (this._h[i] ^ this._s[i % 4]) >>> 0
	}

	Blake256.prototype._padding = function () {
	    var lo = this._length[0] + this._blockOffset * 8
	    var hi = this._length[1]
	    if (lo >= 0x0100000000) {
	        lo -= 0x0100000000
	        hi += 1
	    }

	    var msglen = new Buffer(8)
	    msglen.writeUInt32BE(hi, 0)
	    msglen.writeUInt32BE(lo, 4)

	    if (this._blockOffset === 55) {
	        this._length[0] -= 8
	        this.update(this._oo)
	    } else {
	        if (this._blockOffset < 55) {
	            if (this._blockOffset === 0) this._nullt = true
	            this._length[0] -= (55 - this._blockOffset) * 8
	            this.update(Blake256.padding.slice(0, 55 - this._blockOffset))
	        } else {
	            this._length[0] -= (64 - this._blockOffset) * 8
	            this.update(Blake256.padding.slice(0, 64 - this._blockOffset))
	            this._length[0] -= 55 * 8
	            this.update(Blake256.padding.slice(1, 1 + 55))
	            this._nullt = true
	        }

	        this.update(this._zo)
	        this._length[0] -= 8
	    }

	    this._length[0] -= 64
	    this.update(msglen)
	}

	Blake256.prototype.digest = function (encoding) {
	    this._padding()

	    var buffer = new Buffer(32)
	    for (var i = 0; i < 8; ++i) buffer.writeUInt32BE(this._h[i], i * 4)
	    return buffer.toString(encoding);
	}

	module.exports = Blake256;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(835).Buffer))

/***/ }),

/***/ 1113:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/**
	 * [js-sha3]{@link https://github.com/emn178/js-sha3}
	 *
	 * @version 0.7.0
	 * @author Chen, Yi-Cyuan [emn178@gmail.com]
	 * @copyright Chen, Yi-Cyuan 2015-2017
	 * @license MIT
	 */
	/*jslint bitwise: true */
	'use strict';

	var ERROR = 'input is invalid type';
	var WINDOW = typeof window === 'object';
	var root = WINDOW ? window : {};
	if (root.JS_SHA3_NO_WINDOW) {
	    WINDOW = false;
	}
	var WEB_WORKER = !WINDOW && typeof self === 'object';
	var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
	if (NODE_JS) {
	    root = global;
	} else if (WEB_WORKER) {
	    root = self;
	}
	var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
	var HEX_CHARS = '0123456789abcdef'.split('');
	var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
	var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
	var KECCAK_PADDING = [1, 256, 65536, 16777216];
	var PADDING = [6, 1536, 393216, 100663296];
	var SHIFT = [0, 8, 16, 24];
	var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
	    0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
	    2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
	    2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
	    2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
	var BITS = [224, 256, 384, 512];
	var SHAKE_BITS = [128, 256];
	var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
	var CSHAKE_BYTEPAD = {
	    '128': 168,
	    '256': 136
	};

	if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
	    Array.isArray = function (obj) {
	        return Object.prototype.toString.call(obj) === '[object Array]';
	    };
	}

	if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
	    ArrayBuffer.isView = function (obj) {
	        return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
	    };
	}

	var createOutputMethod = function (bits, padding, outputType) {
	    return function (message) {
	        return new Keccak(bits, padding, bits).update(message)[outputType]();
	    };
	};

	var createShakeOutputMethod = function (bits, padding, outputType) {
	    return function (message, outputBits) {
	        return new Keccak(bits, padding, outputBits).update(message)[outputType]();
	    };
	};

	var createCshakeOutputMethod = function (bits, padding, outputType) {
	    return function (message, outputBits, n, s) {
	        return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
	    };
	};

	var createKmacOutputMethod = function (bits, padding, outputType) {
	    return function (key, message, outputBits, s) {
	        return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
	    };
	};

	var createOutputMethods = function (method, createMethod, bits, padding) {
	    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
	        var type = OUTPUT_TYPES[i];
	        method[type] = createMethod(bits, padding, type);
	    }
	    return method;
	};

	var createMethod = function (bits, padding) {
	    var method = createOutputMethod(bits, padding, 'hex');
	    method.create = function () {
	        return new Keccak(bits, padding, bits);
	    };
	    method.update = function (message) {
	        return method.create().update(message);
	    };
	    return createOutputMethods(method, createOutputMethod, bits, padding);
	};

	var createShakeMethod = function (bits, padding) {
	    var method = createShakeOutputMethod(bits, padding, 'hex');
	    method.create = function (outputBits) {
	        return new Keccak(bits, padding, outputBits);
	    };
	    method.update = function (message, outputBits) {
	        return method.create(outputBits).update(message);
	    };
	    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
	};

	var createCshakeMethod = function (bits, padding) {
	    var w = CSHAKE_BYTEPAD[bits];
	    var method = createCshakeOutputMethod(bits, padding, 'hex');
	    method.create = function (outputBits, n, s) {
	        if (!n && !s) {
	            return methods['shake' + bits].create(outputBits);
	        } else {
	            return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
	        }
	    };
	    method.update = function (message, outputBits, n, s) {
	        return method.create(outputBits, n, s).update(message);
	    };
	    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
	};

	var createKmacMethod = function (bits, padding) {
	    var w = CSHAKE_BYTEPAD[bits];
	    var method = createKmacOutputMethod(bits, padding, 'hex');
	    method.create = function (key, outputBits, s) {
	        return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
	    };
	    method.update = function (key, message, outputBits, s) {
	        return method.create(key, outputBits, s).update(message);
	    };
	    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
	};

	var algorithms = [
	    { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
	    { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
	    { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
	    { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
	    { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
	];

	var methods = {}, methodNames = [];

	for (var i = 0; i < algorithms.length; ++i) {
	    var algorithm = algorithms[i];
	    var bits = algorithm.bits;
	    for (var j = 0; j < bits.length; ++j) {
	        var methodName = algorithm.name + '_' + bits[j];
	        methodNames.push(methodName);
	        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
	        if (algorithm.name !== 'sha3') {
	            var newMethodName = algorithm.name + bits[j];
	            methodNames.push(newMethodName);
	            methods[newMethodName] = methods[methodName];
	        }
	    }
	}

	function Keccak(bits, padding, outputBits) {
	    this.blocks = [];
	    this.s = [];
	    this.padding = padding;
	    this.outputBits = outputBits;
	    this.reset = true;
	    this.finalized = false;
	    this.block = 0;
	    this.start = 0;
	    this.blockCount = (1600 - (bits << 1)) >> 5;
	    this.byteCount = this.blockCount << 2;
	    this.outputBlocks = outputBits >> 5;
	    this.extraBytes = (outputBits & 31) >> 3;

	    for (var i = 0; i < 50; ++i) {
	        this.s[i] = 0;
	    }
	}

	Keccak.prototype.update = function (message) {
	    if (this.finalized) {
	        return;
	    }
	    var notString, type = typeof message;
	    if (type !== 'string') {
	        if (type === 'object') {
	            if (message === null) {
	                throw ERROR;
	            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
	                message = new Uint8Array(message);
	            } else if (!Array.isArray(message)) {
	                if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
	                    throw ERROR;
	                }
	            }
	        } else {
	            throw ERROR;
	        }
	        notString = true;
	    }
	    var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
	        blockCount = this.blockCount, index = 0, s = this.s, i, code;

	    while (index < length) {
	        if (this.reset) {
	            this.reset = false;
	            blocks[0] = this.block;
	            for (i = 1; i < blockCount + 1; ++i) {
	                blocks[i] = 0;
	            }
	        }
	        if (notString) {
	            for (i = this.start; index < length && i < byteCount; ++index) {
	                blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
	            }
	        } else {
	            for (i = this.start; index < length && i < byteCount; ++index) {
	                code = message.charCodeAt(index);
	                if (code < 0x80) {
	                    blocks[i >> 2] |= code << SHIFT[i++ & 3];
	                } else if (code < 0x800) {
	                    blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
	                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	                } else if (code < 0xd800 || code >= 0xe000) {
	                    blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
	                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
	                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	                } else {
	                    code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
	                    blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
	                    blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
	                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
	                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
	                }
	            }
	        }
	        this.lastByteIndex = i;
	        if (i >= byteCount) {
	            this.start = i - byteCount;
	            this.block = blocks[blockCount];
	            for (i = 0; i < blockCount; ++i) {
	                s[i] ^= blocks[i];
	            }
	            f(s);
	            this.reset = true;
	        } else {
	            this.start = i;
	        }
	    }
	    return this;
	};

	Keccak.prototype.encode = function (x, right) {
	    var o = x & 255, n = 1;
	    var bytes = [o];
	    x = x >> 8;
	    o = x & 255;
	    while (o > 0) {
	        bytes.unshift(o);
	        x = x >> 8;
	        o = x & 255;
	        ++n;
	    }
	    if (right) {
	        bytes.push(n);
	    } else {
	        bytes.unshift(n);
	    }
	    this.update(bytes);
	    return bytes.length;
	};

	Keccak.prototype.encodeString = function (str) {
	    var notString, type = typeof str;
	    if (type !== 'string') {
	        if (type === 'object') {
	            if (str === null) {
	                throw ERROR;
	            } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
	                str = new Uint8Array(str);
	            } else if (!Array.isArray(str)) {
	                if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
	                    throw ERROR;
	                }
	            }
	        } else {
	            throw ERROR;
	        }
	        notString = true;
	    }
	    var bytes = 0, length = str.length;
	    if (notString) {
	        bytes = length;
	    } else {
	        for (var i = 0; i < str.length; ++i) {
	            var code = str.charCodeAt(i);
	            if (code < 0x80) {
	                bytes += 1;
	            } else if (code < 0x800) {
	                bytes += 2;
	            } else if (code < 0xd800 || code >= 0xe000) {
	                bytes += 3;
	            } else {
	                code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
	                bytes += 4;
	            }
	        }
	    }
	    bytes += this.encode(bytes * 8);
	    this.update(str);
	    return bytes;
	};

	Keccak.prototype.bytepad = function (strs, w) {
	    var bytes = this.encode(w);
	    for (var i = 0; i < strs.length; ++i) {
	        bytes += this.encodeString(strs[i]);
	    }
	    var paddingBytes = w - bytes % w;
	    var zeros = [];
	    zeros.length = paddingBytes;
	    this.update(zeros);
	    return this;
	};

	Keccak.prototype.finalize = function () {
	    if (this.finalized) {
	        return;
	    }
	    this.finalized = true;
	    var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
	    blocks[i >> 2] |= this.padding[i & 3];
	    if (this.lastByteIndex === this.byteCount) {
	        blocks[0] = blocks[blockCount];
	        for (i = 1; i < blockCount + 1; ++i) {
	            blocks[i] = 0;
	        }
	    }
	    blocks[blockCount - 1] |= 0x80000000;
	    for (i = 0; i < blockCount; ++i) {
	        s[i] ^= blocks[i];
	    }
	    f(s);
	};

	Keccak.prototype.toString = Keccak.prototype.hex = function () {
	    this.finalize();

	    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
	        extraBytes = this.extraBytes, i = 0, j = 0;
	    var hex = '', block;
	    while (j < outputBlocks) {
	        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
	            block = s[i];
	            hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
	                HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
	                HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
	                HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
	        }
	        if (j % blockCount === 0) {
	            f(s);
	            i = 0;
	        }
	    }
	    if (extraBytes) {
	        block = s[i];
	        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
	        if (extraBytes > 1) {
	            hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
	        }
	        if (extraBytes > 2) {
	            hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
	        }
	    }
	    return hex;
	};

	Keccak.prototype.arrayBuffer = function () {
	    this.finalize();

	    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
	        extraBytes = this.extraBytes, i = 0, j = 0;
	    var bytes = this.outputBits >> 3;
	    var buffer;
	    if (extraBytes) {
	        buffer = new ArrayBuffer((outputBlocks + 1) << 2);
	    } else {
	        buffer = new ArrayBuffer(bytes);
	    }
	    var array = new Uint32Array(buffer);
	    while (j < outputBlocks) {
	        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
	            array[j] = s[i];
	        }
	        if (j % blockCount === 0) {
	            f(s);
	        }
	    }
	    if (extraBytes) {
	        array[i] = s[i];
	        buffer = buffer.slice(0, bytes);
	    }
	    return buffer;
	};

	Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

	Keccak.prototype.digest = Keccak.prototype.array = function () {
	    this.finalize();

	    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
	        extraBytes = this.extraBytes, i = 0, j = 0;
	    var array = [], offset, block;
	    while (j < outputBlocks) {
	        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
	            offset = j << 2;
	            block = s[i];
	            array[offset] = block & 0xFF;
	            array[offset + 1] = (block >> 8) & 0xFF;
	            array[offset + 2] = (block >> 16) & 0xFF;
	            array[offset + 3] = (block >> 24) & 0xFF;
	        }
	        if (j % blockCount === 0) {
	            f(s);
	        }
	    }
	    if (extraBytes) {
	        offset = j << 2;
	        block = s[i];
	        array[offset] = block & 0xFF;
	        if (extraBytes > 1) {
	            array[offset + 1] = (block >> 8) & 0xFF;
	        }
	        if (extraBytes > 2) {
	            array[offset + 2] = (block >> 16) & 0xFF;
	        }
	    }
	    return array;
	};

	function Kmac(bits, padding, outputBits) {
	    Keccak.call(this, bits, padding, outputBits);
	}

	Kmac.prototype = new Keccak();

	Kmac.prototype.finalize = function () {
	    this.encode(this.outputBits, true);
	    return Keccak.prototype.finalize.call(this);
	};

	var f = function (s) {
	    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
	        b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
	        b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
	        b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
	    for (n = 0; n < 48; n += 2) {
	        c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
	        c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
	        c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
	        c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
	        c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
	        c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
	        c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
	        c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
	        c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
	        c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

	        h = c8 ^ ((c2 << 1) | (c3 >>> 31));
	        l = c9 ^ ((c3 << 1) | (c2 >>> 31));
	        s[0] ^= h;
	        s[1] ^= l;
	        s[10] ^= h;
	        s[11] ^= l;
	        s[20] ^= h;
	        s[21] ^= l;
	        s[30] ^= h;
	        s[31] ^= l;
	        s[40] ^= h;
	        s[41] ^= l;
	        h = c0 ^ ((c4 << 1) | (c5 >>> 31));
	        l = c1 ^ ((c5 << 1) | (c4 >>> 31));
	        s[2] ^= h;
	        s[3] ^= l;
	        s[12] ^= h;
	        s[13] ^= l;
	        s[22] ^= h;
	        s[23] ^= l;
	        s[32] ^= h;
	        s[33] ^= l;
	        s[42] ^= h;
	        s[43] ^= l;
	        h = c2 ^ ((c6 << 1) | (c7 >>> 31));
	        l = c3 ^ ((c7 << 1) | (c6 >>> 31));
	        s[4] ^= h;
	        s[5] ^= l;
	        s[14] ^= h;
	        s[15] ^= l;
	        s[24] ^= h;
	        s[25] ^= l;
	        s[34] ^= h;
	        s[35] ^= l;
	        s[44] ^= h;
	        s[45] ^= l;
	        h = c4 ^ ((c8 << 1) | (c9 >>> 31));
	        l = c5 ^ ((c9 << 1) | (c8 >>> 31));
	        s[6] ^= h;
	        s[7] ^= l;
	        s[16] ^= h;
	        s[17] ^= l;
	        s[26] ^= h;
	        s[27] ^= l;
	        s[36] ^= h;
	        s[37] ^= l;
	        s[46] ^= h;
	        s[47] ^= l;
	        h = c6 ^ ((c0 << 1) | (c1 >>> 31));
	        l = c7 ^ ((c1 << 1) | (c0 >>> 31));
	        s[8] ^= h;
	        s[9] ^= l;
	        s[18] ^= h;
	        s[19] ^= l;
	        s[28] ^= h;
	        s[29] ^= l;
	        s[38] ^= h;
	        s[39] ^= l;
	        s[48] ^= h;
	        s[49] ^= l;

	        b0 = s[0];
	        b1 = s[1];
	        b32 = (s[11] << 4) | (s[10] >>> 28);
	        b33 = (s[10] << 4) | (s[11] >>> 28);
	        b14 = (s[20] << 3) | (s[21] >>> 29);
	        b15 = (s[21] << 3) | (s[20] >>> 29);
	        b46 = (s[31] << 9) | (s[30] >>> 23);
	        b47 = (s[30] << 9) | (s[31] >>> 23);
	        b28 = (s[40] << 18) | (s[41] >>> 14);
	        b29 = (s[41] << 18) | (s[40] >>> 14);
	        b20 = (s[2] << 1) | (s[3] >>> 31);
	        b21 = (s[3] << 1) | (s[2] >>> 31);
	        b2 = (s[13] << 12) | (s[12] >>> 20);
	        b3 = (s[12] << 12) | (s[13] >>> 20);
	        b34 = (s[22] << 10) | (s[23] >>> 22);
	        b35 = (s[23] << 10) | (s[22] >>> 22);
	        b16 = (s[33] << 13) | (s[32] >>> 19);
	        b17 = (s[32] << 13) | (s[33] >>> 19);
	        b48 = (s[42] << 2) | (s[43] >>> 30);
	        b49 = (s[43] << 2) | (s[42] >>> 30);
	        b40 = (s[5] << 30) | (s[4] >>> 2);
	        b41 = (s[4] << 30) | (s[5] >>> 2);
	        b22 = (s[14] << 6) | (s[15] >>> 26);
	        b23 = (s[15] << 6) | (s[14] >>> 26);
	        b4 = (s[25] << 11) | (s[24] >>> 21);
	        b5 = (s[24] << 11) | (s[25] >>> 21);
	        b36 = (s[34] << 15) | (s[35] >>> 17);
	        b37 = (s[35] << 15) | (s[34] >>> 17);
	        b18 = (s[45] << 29) | (s[44] >>> 3);
	        b19 = (s[44] << 29) | (s[45] >>> 3);
	        b10 = (s[6] << 28) | (s[7] >>> 4);
	        b11 = (s[7] << 28) | (s[6] >>> 4);
	        b42 = (s[17] << 23) | (s[16] >>> 9);
	        b43 = (s[16] << 23) | (s[17] >>> 9);
	        b24 = (s[26] << 25) | (s[27] >>> 7);
	        b25 = (s[27] << 25) | (s[26] >>> 7);
	        b6 = (s[36] << 21) | (s[37] >>> 11);
	        b7 = (s[37] << 21) | (s[36] >>> 11);
	        b38 = (s[47] << 24) | (s[46] >>> 8);
	        b39 = (s[46] << 24) | (s[47] >>> 8);
	        b30 = (s[8] << 27) | (s[9] >>> 5);
	        b31 = (s[9] << 27) | (s[8] >>> 5);
	        b12 = (s[18] << 20) | (s[19] >>> 12);
	        b13 = (s[19] << 20) | (s[18] >>> 12);
	        b44 = (s[29] << 7) | (s[28] >>> 25);
	        b45 = (s[28] << 7) | (s[29] >>> 25);
	        b26 = (s[38] << 8) | (s[39] >>> 24);
	        b27 = (s[39] << 8) | (s[38] >>> 24);
	        b8 = (s[48] << 14) | (s[49] >>> 18);
	        b9 = (s[49] << 14) | (s[48] >>> 18);

	        s[0] = b0 ^ (~b2 & b4);
	        s[1] = b1 ^ (~b3 & b5);
	        s[10] = b10 ^ (~b12 & b14);
	        s[11] = b11 ^ (~b13 & b15);
	        s[20] = b20 ^ (~b22 & b24);
	        s[21] = b21 ^ (~b23 & b25);
	        s[30] = b30 ^ (~b32 & b34);
	        s[31] = b31 ^ (~b33 & b35);
	        s[40] = b40 ^ (~b42 & b44);
	        s[41] = b41 ^ (~b43 & b45);
	        s[2] = b2 ^ (~b4 & b6);
	        s[3] = b3 ^ (~b5 & b7);
	        s[12] = b12 ^ (~b14 & b16);
	        s[13] = b13 ^ (~b15 & b17);
	        s[22] = b22 ^ (~b24 & b26);
	        s[23] = b23 ^ (~b25 & b27);
	        s[32] = b32 ^ (~b34 & b36);
	        s[33] = b33 ^ (~b35 & b37);
	        s[42] = b42 ^ (~b44 & b46);
	        s[43] = b43 ^ (~b45 & b47);
	        s[4] = b4 ^ (~b6 & b8);
	        s[5] = b5 ^ (~b7 & b9);
	        s[14] = b14 ^ (~b16 & b18);
	        s[15] = b15 ^ (~b17 & b19);
	        s[24] = b24 ^ (~b26 & b28);
	        s[25] = b25 ^ (~b27 & b29);
	        s[34] = b34 ^ (~b36 & b38);
	        s[35] = b35 ^ (~b37 & b39);
	        s[44] = b44 ^ (~b46 & b48);
	        s[45] = b45 ^ (~b47 & b49);
	        s[6] = b6 ^ (~b8 & b0);
	        s[7] = b7 ^ (~b9 & b1);
	        s[16] = b16 ^ (~b18 & b10);
	        s[17] = b17 ^ (~b19 & b11);
	        s[26] = b26 ^ (~b28 & b20);
	        s[27] = b27 ^ (~b29 & b21);
	        s[36] = b36 ^ (~b38 & b30);
	        s[37] = b37 ^ (~b39 & b31);
	        s[46] = b46 ^ (~b48 & b40);
	        s[47] = b47 ^ (~b49 & b41);
	        s[8] = b8 ^ (~b0 & b2);
	        s[9] = b9 ^ (~b1 & b3);
	        s[18] = b18 ^ (~b10 & b12);
	        s[19] = b19 ^ (~b11 & b13);
	        s[28] = b28 ^ (~b20 & b22);
	        s[29] = b29 ^ (~b21 & b23);
	        s[38] = b38 ^ (~b30 & b32);
	        s[39] = b39 ^ (~b31 & b33);
	        s[48] = b48 ^ (~b40 & b42);
	        s[49] = b49 ^ (~b41 & b43);

	        s[0] ^= RC[n];
	        s[1] ^= RC[n + 1];
	    }
	};

	module.exports = methods;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(91), (function() { return this; }())))

/***/ }),

/***/ 1114:
/***/ (function(module, exports, __webpack_require__) {

	var XRPValidator = __webpack_require__(1115);
	var ETHValidator = __webpack_require__(1117);

	// defines P2PKH and P2SH address types for standard (prod) and testnet networks
	var CURRENCIES = [{
	    name: 'bitcoin',
	    symbol: 'btc',
	    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'bitcoincash',
	    symbol: 'bch',
	    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'litecoin',
	    symbol: 'ltc',
	    addressTypes: {prod: ['30', '05', '32'], testnet: ['6f', 'c4']}
	},{
	    name: 'peercoin',
	    symbol: 'ppc',
	    addressTypes: {prod: ['37', '75'], testnet: ['6f', 'c4']}
	},{
	    name: 'dogecoin',
	    symbol: 'doge',
	    addressTypes: {prod: ['1e', '16'], testnet: ['71', 'c4']}
	},{
	    name: 'beavercoin',
	    symbol: 'bvc',
	    addressTypes: {prod: ['19', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'freicoin',
	    symbol: 'frc',
	    addressTypes: {prod: ['00', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'protoshares',
	    symbol: 'pts',
	    addressTypes: {prod: ['38', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'megacoin',
	    symbol: 'mec',
	    addressTypes: {prod: ['32', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'primecoin',
	    symbol: 'xpm',
	    addressTypes: {prod: ['17', '53'], testnet: ['6f', 'c4']}
	},{
	    name: 'auroracoin',
	    symbol: 'aur',
	    addressTypes: {prod: ['17', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'namecoin',
	    symbol: 'nmc',
	    addressTypes: {prod: ['34'], testnet: []}
	},{
	    name: 'biocoin',
	    symbol: 'bio',
	    addressTypes: {prod: ['19', '14'], testnet: ['6f', 'c4']}
	},{
	    name: 'garlicoin',
	    symbol: 'grlc',
	    addressTypes: {prod: ['26', '05'], testnet: ['6f', 'c4']}
	},{
	    name: 'vertcoin',
	    symbol: 'vtc',
	    addressTypes: {prod: ['0x', '47'], testnet: ['6f', 'c4']}
	},{
	    name: 'bitcoingold',
	    symbol: 'btg',
	    addressTypes: {prod: ['26', '17'], testnet: ['6f', 'c4']}
	},{
	    name: 'komodo',
	    symbol: 'kmd',
	    addressTypes: {prod: ['3c', '55'], testnet: ['0','5']}
	},{
	    name: 'bitcoinz',
	    symbol: 'btcz',
	    expectedLength: 26,
	    addressTypes: {prod: ['1cb8','1cbd'], testnet: ['1d25', '1cba']}
	},{
	    name: 'bitcoinprivate',
	    symbol: 'btcp',
	    expectedLength: 26,
	    addressTypes: {prod: ['1325','13af'], testnet: ['1957', '19e0']}
	},{
	    name: 'hush',
	    symbol: 'hush',
	    expectedLength: 26,
	    addressTypes: {prod: ['1cb8','1cbd'], testnet: ['1d25', '1cba']}
	},{
	    name: 'snowgem',
	    symbol: 'sng',
	    expectedLength: 26,
	    addressTypes: {prod: ['1c28','1c2d'], testnet: ['1d25', '1cba']}
	},{
	    name: 'zcash',
	    symbol: 'zec',
	    expectedLength: 26,
	    addressTypes: {prod: ['1cb8','1cbd'], testnet: ['1d25', '1cba']}
	},{
	    name: 'zclassic',
	    symbol: 'zcl',
	    expectedLength: 26,
	    addressTypes: {prod: ['1cb8','1cbd'], testnet: ['1d25', '1cba']}
	},{
	    name: 'zencash',
	    symbol: 'zen',
	    expectedLength: 26,
	    addressTypes: {prod: ['2089','2096'], testnet: ['2092','2098']}
	},{
	    name: 'votecoin',
	    symbol: 'vot',
	    expectedLength: 26,
	    addressTypes: {prod: ['1cb8','1cbd'], testnet: ['1d25', '1cba']}
	},{
	    name: 'decred',
	    symbol: 'dcr',
	    addressTypes: {prod: ['073f', '071a'], testnet: ['0f21', '0efc']},
	    hashFunction: 'blake256',
	    expectedLength: 26
	},{
	    name: 'digibyte',
	    symbol: 'dgb',
	    addressTypes: {prod: ['1e'], testnet: []},
	},{
	    name: 'ethereum',
	    symbol: 'eth',
	    validator: ETHValidator,
	},{
	    name: 'etherzero',
	    symbol: 'etz',
	    validator: ETHValidator,
	},{
	    name: 'ethereumclassic',
	    symbol: 'etc',
	    validator: ETHValidator,
	},{
	    name: 'callisto',
	    symbol: 'clo',
	    validator: ETHValidator,
	},{
	    name: 'ripple',
	    symbol: 'xrp',
	    validator: XRPValidator,
	},{
	    name: 'dash',
	    symbol: 'dash',
	    addressTypes: {prod: ['4c', '10'], testnet: ['8c', '13']}
	},{
	    name: 'neo',
	    symbol: 'neo',
	    addressTypes: {prod: ['17'], testnet: []}
	},{
	    name: 'neogas',
	    symbol: 'gas',
	    addressTypes: {prod: ['17'], testnet: []}
	},{
	    name: 'qtum',
	    symbol: 'qtum',
	    addressTypes: {prod: ['3a', '32'], testnet: ['6f', 'c4']}
	}];


	module.exports = {
	    getByNameOrSymbol: function (currencyNameOrSymbol) {
	        var nameOrSymbol = currencyNameOrSymbol.toLowerCase();
	        for (var i = 0; i < CURRENCIES.length; i++) {
	            var currency = CURRENCIES[i];
	            if(currency.name === nameOrSymbol || currency.symbol === nameOrSymbol) {
	                return currency;
	            }
	        }
	        return null;
	    }
	};


/***/ }),

/***/ 1115:
/***/ (function(module, exports, __webpack_require__) {

	var cryptoUtils = __webpack_require__(1110);
	var baseX = __webpack_require__(1116);

	var ALLOWED_CHARS = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';

	var codec = baseX(ALLOWED_CHARS);
	var regexp = new RegExp('^r[' + ALLOWED_CHARS + ']{27,35}$');

	module.exports = {
	    /**
	     * ripple address validation
	     */
	    isValidAddress: function (address) {
	        if (regexp.test(address)) {
	            return this.verifyChecksum(address);
	        }

	        return false;
	    },

	    verifyChecksum: function (address) {
	        var bytes = codec.decode(address);
	        var computedChecksum = cryptoUtils.sha256Checksum(cryptoUtils.toHex(bytes.slice(0, -4)));
	        var checksum = cryptoUtils.toHex(bytes.slice(-4));

	        return computedChecksum === checksum
	    }
	};


/***/ }),

/***/ 1116:
/***/ (function(module, exports, __webpack_require__) {

	// base-x encoding
	// Forked from https://github.com/cryptocoinjs/bs58
	// Originally written by Mike Hearn for BitcoinJ
	// Copyright (c) 2011 Google Inc
	// Ported to JavaScript by Stefan Thomas
	// Merged Buffer refactorings from base58-native by Stephen Pair
	// Copyright (c) 2013 BitPay Inc

	var Buffer = __webpack_require__(869).Buffer

	module.exports = function base (ALPHABET) {
	  var ALPHABET_MAP = {}
	  var BASE = ALPHABET.length
	  var LEADER = ALPHABET.charAt(0)

	  // pre-compute lookup table
	  for (var z = 0; z < ALPHABET.length; z++) {
	    var x = ALPHABET.charAt(z)

	    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
	    ALPHABET_MAP[x] = z
	  }

	  function encode (source) {
	    if (source.length === 0) return ''

	    var digits = [0]
	    for (var i = 0; i < source.length; ++i) {
	      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
	        carry += digits[j] << 8
	        digits[j] = carry % BASE
	        carry = (carry / BASE) | 0
	      }

	      while (carry > 0) {
	        digits.push(carry % BASE)
	        carry = (carry / BASE) | 0
	      }
	    }

	    var string = ''

	    // deal with leading zeros
	    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER
	    // convert digits to a string
	    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]

	    return string
	  }

	  function decodeUnsafe (string) {
	    if (typeof string !== 'string') throw new TypeError('Expected String')
	    if (string.length === 0) return Buffer.allocUnsafe(0)

	    var bytes = [0]
	    for (var i = 0; i < string.length; i++) {
	      var value = ALPHABET_MAP[string[i]]
	      if (value === undefined) return

	      for (var j = 0, carry = value; j < bytes.length; ++j) {
	        carry += bytes[j] * BASE
	        bytes[j] = carry & 0xff
	        carry >>= 8
	      }

	      while (carry > 0) {
	        bytes.push(carry & 0xff)
	        carry >>= 8
	      }
	    }

	    // deal with leading zeros
	    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
	      bytes.push(0)
	    }

	    return Buffer.from(bytes.reverse())
	  }

	  function decode (string) {
	    var buffer = decodeUnsafe(string)
	    if (buffer) return buffer

	    throw new Error('Non-base' + BASE + ' character')
	  }

	  return {
	    encode: encode,
	    decodeUnsafe: decodeUnsafe,
	    decode: decode
	  }
	}


/***/ }),

/***/ 1117:
/***/ (function(module, exports, __webpack_require__) {

	var cryptoUtils = __webpack_require__(1110);

	module.exports = {
	    isValidAddress: function (address) {
	        if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
	            // Check if it has the basic requirements of an address
	            return false;
	        }

	        if (/^0x[0-9a-f]{40}$/.test(address) || /^0x?[0-9A-F]{40}$/.test(address)) {
	            // If it's all small caps or all all caps, return true
	            return true;
	        }

	        // Otherwise check each case
	        return this.verifyChecksum(address);
	    },
	    verifyChecksum: function (address) {
	        // Check each case
	        address = address.replace('0x','');

	        var addressHash = cryptoUtils.keccak256(address.toLowerCase());

	        for (var i = 0; i < 40; i++ ) {
	            // The nth letter should be uppercase if the nth digit of casemap is 1
	            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
	                (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
	                return false;
	            }
	        }

	        return true;
	    }
	};


/***/ }),

/***/ 1118:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.MenuItem = exports.DropDownMenu = undefined;

	var _DropDownMenu2 = __webpack_require__(1119);

	var _DropDownMenu3 = _interopRequireDefault(_DropDownMenu2);

	var _MenuItem2 = __webpack_require__(941);

	var _MenuItem3 = _interopRequireDefault(_MenuItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.DropDownMenu = _DropDownMenu3.default;
	exports.MenuItem = _MenuItem3.default;
	exports.default = _DropDownMenu3.default;

/***/ }),

/***/ 1119:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(788);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

	var _simpleAssign = __webpack_require__(791);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(209);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _transitions = __webpack_require__(804);

	var _transitions2 = _interopRequireDefault(_transitions);

	var _arrowDropDown = __webpack_require__(1120);

	var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

	var _Menu = __webpack_require__(934);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _ClearFix = __webpack_require__(1121);

	var _ClearFix2 = _interopRequireDefault(_ClearFix);

	var _Popover = __webpack_require__(929);

	var _Popover2 = _interopRequireDefault(_Popover);

	var _PopoverAnimationVertical = __webpack_require__(932);

	var _PopoverAnimationVertical2 = _interopRequireDefault(_PopoverAnimationVertical);

	var _keycode = __webpack_require__(803);

	var _keycode2 = _interopRequireDefault(_keycode);

	var _events = __webpack_require__(818);

	var _events2 = _interopRequireDefault(_events);

	var _IconButton = __webpack_require__(952);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _propTypes3 = __webpack_require__(811);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getStyles(props, context) {
	  var disabled = props.disabled;

	  var spacing = context.muiTheme.baseTheme.spacing;
	  var palette = context.muiTheme.baseTheme.palette;
	  var accentColor = context.muiTheme.dropDownMenu.accentColor;
	  return {
	    control: {
	      cursor: disabled ? 'not-allowed' : 'pointer',
	      height: '100%',
	      position: 'relative',
	      width: '100%'
	    },
	    icon: {
	      fill: accentColor,
	      position: 'absolute',
	      right: spacing.desktopGutterLess,
	      top: (spacing.iconSize - 24) / 2 + spacing.desktopGutterMini / 2
	    },
	    iconChildren: {
	      fill: 'inherit'
	    },
	    label: {
	      color: disabled ? palette.disabledColor : palette.textColor,
	      height: spacing.desktopToolbarHeight + 'px',
	      lineHeight: spacing.desktopToolbarHeight + 'px',
	      overflow: 'hidden',
	      opacity: 1,
	      position: 'relative',
	      paddingLeft: spacing.desktopGutter,
	      paddingRight: spacing.iconSize * 2 + spacing.desktopGutterMini,
	      textOverflow: 'ellipsis',
	      top: 0,
	      whiteSpace: 'nowrap'
	    },
	    labelWhenOpen: {
	      opacity: 0,
	      top: spacing.desktopToolbarHeight / 8
	    },
	    root: {
	      display: 'inline-block',
	      fontSize: spacing.desktopDropDownMenuFontSize,
	      height: spacing.desktopSubheaderHeight,
	      fontFamily: context.muiTheme.baseTheme.fontFamily,
	      outline: 'none',
	      position: 'relative',
	      transition: _transitions2.default.easeOut()
	    },
	    rootWhenOpen: {
	      opacity: 1
	    },
	    underline: {
	      borderTop: 'solid 1px ' + accentColor,
	      bottom: 1,
	      left: 0,
	      margin: '-1px ' + spacing.desktopGutter + 'px',
	      right: 0,
	      position: 'absolute'
	    }
	  };
	}

	var DropDownMenu = function (_Component) {
	  (0, _inherits3.default)(DropDownMenu, _Component);

	  function DropDownMenu() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, DropDownMenu);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropDownMenu.__proto__ || (0, _getPrototypeOf2.default)(DropDownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      open: false
	    }, _this.rootNode = undefined, _this.arrowNode = undefined, _this.handleTouchTapControl = function (event) {
	      event.preventDefault();
	      if (!_this.props.disabled) {
	        _this.setState({
	          open: !_this.state.open,
	          anchorEl: _this.rootNode
	        });
	      }
	    }, _this.handleRequestCloseMenu = function () {
	      _this.close(false);
	    }, _this.handleEscKeyDownMenu = function () {
	      _this.close(true);
	    }, _this.handleKeyDown = function (event) {
	      switch ((0, _keycode2.default)(event)) {
	        case 'up':
	        case 'down':
	        case 'space':
	        case 'enter':
	          event.preventDefault();
	          _this.setState({
	            open: true,
	            anchorEl: _this.rootNode
	          });
	          break;
	      }
	    }, _this.handleItemTouchTap = function (event, child, index) {
	      if (_this.props.multiple) {
	        if (!_this.state.open) {
	          _this.setState({ open: true });
	        }
	      } else {
	        event.persist();
	        _this.setState({
	          open: false
	        }, function () {
	          if (_this.props.onChange) {
	            _this.props.onChange(event, index, child.props.value);
	          }

	          _this.close(_events2.default.isKeyboard(event));
	        });
	      }
	    }, _this.handleChange = function (event, value) {
	      if (_this.props.multiple && _this.props.onChange) {
	        _this.props.onChange(event, undefined, value);
	      }
	    }, _this.close = function (isKeyboard) {
	      _this.setState({
	        open: false
	      }, function () {
	        if (_this.props.onClose) {
	          _this.props.onClose();
	        }

	        if (isKeyboard) {
	          var dropArrow = _this.arrowNode;
	          var dropNode = _reactDom2.default.findDOMNode(dropArrow);
	          dropNode.focus();
	          dropArrow.setKeyboardFocus(true);
	        }
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  // The nested styles for drop-down-menu are modified by toolbar and possibly
	  // other user components, so it will give full access to its js styles rather
	  // than just the parent.


	  (0, _createClass3.default)(DropDownMenu, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (this.props.autoWidth) {
	        this.setWidth();
	      }
	      if (this.props.openImmediately) {
	        // TODO: Temporary fix to make openImmediately work with popover.
	        /* eslint-disable react/no-did-mount-set-state */
	        setTimeout(function () {
	          return _this2.setState({
	            open: true,
	            anchorEl: _this2.rootNode
	          });
	        }, 0);
	        /* eslint-enable react/no-did-mount-set-state */
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      if (this.props.autoWidth) {
	        this.setWidth();
	      }
	    }
	  }, {
	    key: 'getInputNode',


	    /**
	     * This method is deprecated but still here because the TextField
	     * need it in order to work. TODO: That will be addressed later.
	     */
	    value: function getInputNode() {
	      var _this3 = this;

	      var rootNode = this.rootNode;

	      rootNode.focus = function () {
	        if (!_this3.props.disabled) {
	          _this3.setState({
	            open: !_this3.state.open,
	            anchorEl: _this3.rootNode
	          });
	        }
	      };

	      return rootNode;
	    }
	  }, {
	    key: 'setWidth',
	    value: function setWidth() {
	      var el = this.rootNode;
	      if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
	        el.style.width = 'auto';
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _props = this.props,
	          animated = _props.animated,
	          animation = _props.animation,
	          autoWidth = _props.autoWidth,
	          multiple = _props.multiple,
	          children = _props.children,
	          className = _props.className,
	          disabled = _props.disabled,
	          iconStyle = _props.iconStyle,
	          labelStyle = _props.labelStyle,
	          listStyle = _props.listStyle,
	          maxHeight = _props.maxHeight,
	          menuStyleProp = _props.menuStyle,
	          selectionRenderer = _props.selectionRenderer,
	          onClose = _props.onClose,
	          openImmediately = _props.openImmediately,
	          menuItemStyle = _props.menuItemStyle,
	          selectedMenuItemStyle = _props.selectedMenuItemStyle,
	          style = _props.style,
	          underlineStyle = _props.underlineStyle,
	          value = _props.value,
	          iconButton = _props.iconButton,
	          anchorOrigin = _props.anchorOrigin,
	          targetOrigin = _props.targetOrigin,
	          other = (0, _objectWithoutProperties3.default)(_props, ['animated', 'animation', 'autoWidth', 'multiple', 'children', 'className', 'disabled', 'iconStyle', 'labelStyle', 'listStyle', 'maxHeight', 'menuStyle', 'selectionRenderer', 'onClose', 'openImmediately', 'menuItemStyle', 'selectedMenuItemStyle', 'style', 'underlineStyle', 'value', 'iconButton', 'anchorOrigin', 'targetOrigin']);
	      var _state = this.state,
	          anchorEl = _state.anchorEl,
	          open = _state.open;
	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context);

	      var displayValue = '';
	      if (!multiple) {
	        _react2.default.Children.forEach(children, function (child) {
	          if (child && value === child.props.value) {
	            if (selectionRenderer) {
	              displayValue = selectionRenderer(value, child);
	            } else {
	              // This will need to be improved (in case primaryText is a node)
	              displayValue = child.props.label || child.props.primaryText;
	            }
	          }
	        });
	      } else {
	        var values = [];
	        var selectionRendererChildren = [];
	        _react2.default.Children.forEach(children, function (child) {
	          if (child && value && value.indexOf(child.props.value) > -1) {
	            if (selectionRenderer) {
	              values.push(child.props.value);
	              selectionRendererChildren.push(child);
	            } else {
	              values.push(child.props.label || child.props.primaryText);
	            }
	          }
	        });

	        displayValue = [];
	        if (selectionRenderer) {
	          displayValue = selectionRenderer(values, selectionRendererChildren);
	        } else {
	          displayValue = values.join(', ');
	        }
	      }

	      var menuStyle = void 0;
	      if (anchorEl && !autoWidth) {
	        menuStyle = (0, _simpleAssign2.default)({
	          width: anchorEl.clientWidth
	        }, menuStyleProp);
	      } else {
	        menuStyle = menuStyleProp;
	      }

	      return _react2.default.createElement(
	        'div',
	        (0, _extends3.default)({}, other, {
	          ref: function ref(node) {
	            _this4.rootNode = node;
	          },
	          className: className,
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, open && styles.rootWhenOpen, style))
	        }),
	        _react2.default.createElement(
	          _ClearFix2.default,
	          { style: styles.control, onClick: this.handleTouchTapControl },
	          _react2.default.createElement(
	            'div',
	            { style: prepareStyles((0, _simpleAssign2.default)({}, styles.label, open && styles.labelWhenOpen, labelStyle)) },
	            displayValue
	          ),
	          _react2.default.createElement(
	            _IconButton2.default,
	            {
	              disabled: disabled,
	              onKeyDown: this.handleKeyDown,
	              ref: function ref(node) {
	                _this4.arrowNode = node;
	              },
	              style: (0, _simpleAssign2.default)({}, styles.icon, iconStyle),
	              iconStyle: styles.iconChildren
	            },
	            iconButton
	          ),
	          _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, styles.underline, underlineStyle)) })
	        ),
	        _react2.default.createElement(
	          _Popover2.default,
	          {
	            anchorOrigin: anchorOrigin,
	            targetOrigin: targetOrigin,
	            anchorEl: anchorEl,
	            animation: animation || _PopoverAnimationVertical2.default,
	            open: open,
	            animated: animated,
	            onRequestClose: this.handleRequestCloseMenu
	          },
	          _react2.default.createElement(
	            _Menu2.default,
	            {
	              multiple: multiple,
	              maxHeight: maxHeight,
	              desktop: true,
	              value: value,
	              onEscKeyDown: this.handleEscKeyDownMenu,
	              style: menuStyle,
	              listStyle: listStyle,
	              onItemTouchTap: this.handleItemTouchTap,
	              onChange: this.handleChange,
	              menuItemStyle: menuItemStyle,
	              selectedMenuItemStyle: selectedMenuItemStyle,
	              autoWidth: autoWidth,
	              width: !autoWidth && menuStyle ? menuStyle.width : null
	            },
	            children
	          )
	        )
	      );
	    }
	  }]);
	  return DropDownMenu;
	}(_react.Component);

	DropDownMenu.muiName = 'DropDownMenu';
	DropDownMenu.defaultProps = {
	  animated: true,
	  autoWidth: true,
	  disabled: false,
	  iconButton: _react2.default.createElement(_arrowDropDown2.default, null),
	  openImmediately: false,
	  maxHeight: 500,
	  multiple: false,
	  anchorOrigin: {
	    vertical: 'top',
	    horizontal: 'left'
	  }
	};
	DropDownMenu.contextTypes = {
	  muiTheme: _propTypes2.default.object.isRequired
	};
	DropDownMenu.propTypes =  false ? {
	  /**
	   * This is the point on the anchor that the popover's
	   * `targetOrigin` will attach to.
	   * Options:
	   * vertical: [top, center, bottom]
	   * horizontal: [left, middle, right].
	   */
	  anchorOrigin: _propTypes4.default.origin,
	  /**
	   * If true, the popover will apply transitions when
	   * it gets added to the DOM.
	   */
	  animated: _propTypes2.default.bool,
	  /**
	   * Override the default animation component used.
	   */
	  animation: _propTypes2.default.func,
	  /**
	   * The width will automatically be set according to the items inside the menu.
	   * To control this width in css instead, set this prop to `false`.
	   */
	  autoWidth: _propTypes2.default.bool,
	  /**
	   * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
	   * prop `label` that value will be used to render the representation of that
	   * item within the field.
	   */
	  children: _propTypes2.default.node,
	  /**
	   * The css class name of the root element.
	   */
	  className: _propTypes2.default.string,
	  /**
	   * Disables the menu.
	   */
	  disabled: _propTypes2.default.bool,
	  /**
	   * Overrides default `SvgIcon` dropdown arrow component.
	   */
	  iconButton: _propTypes2.default.node,
	  /**
	   * Overrides the styles of icon element.
	   */
	  iconStyle: _propTypes2.default.object,
	  /**
	   * Overrides the styles of label when the `DropDownMenu` is inactive.
	   */
	  labelStyle: _propTypes2.default.object,
	  /**
	   * The style object to use to override underlying list style.
	   */
	  listStyle: _propTypes2.default.object,
	  /**
	   * The maximum height of the `Menu` when it is displayed.
	   */
	  maxHeight: _propTypes2.default.number,
	  /**
	   * Override the inline-styles of menu items.
	   */
	  menuItemStyle: _propTypes2.default.object,
	  /**
	   * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
	   */
	  menuStyle: _propTypes2.default.object,
	  /**
	   * If true, `value` must be an array and the menu will support
	   * multiple selections.
	   */
	  multiple: _propTypes2.default.bool,
	  /**
	   * Callback function fired when a menu item is clicked, other than the one currently selected.
	   *
	   * @param {object} event TouchTap event targeting the menu item that was clicked.
	   * @param {number} key The index of the clicked menu item in the `children` collection.
	   * @param {any} value If `multiple` is true, the menu's `value`
	   * array with either the menu item's `value` added (if
	   * it wasn't already selected) or omitted (if it was already selected).
	   * Otherwise, the `value` of the menu item.
	   */
	  onChange: _propTypes2.default.func,
	  /**
	   * Callback function fired when the menu is closed.
	   */
	  onClose: _propTypes2.default.func,
	  /**
	   * Set to true to have the `DropDownMenu` automatically open on mount.
	   */
	  openImmediately: _propTypes2.default.bool,
	  /**
	   * Override the inline-styles of selected menu items.
	   */
	  selectedMenuItemStyle: _propTypes2.default.object,
	  /**
	   * Callback function fired when a menu item is clicked, other than the one currently selected.
	   *
	   * @param {any} value If `multiple` is true, the menu's `value`
	   * array with either the menu item's `value` added (if
	   * it wasn't already selected) or omitted (if it was already selected).
	   * Otherwise, the `value` of the menu item.
	   * @param {any} menuItem The selected `MenuItem`.
	   * If `multiple` is true, this will be an array with the `MenuItem`s matching the `value`s parameter.
	   */
	  selectionRenderer: _propTypes2.default.func,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _propTypes2.default.object,
	  /**
	   * This is the point on the popover which will attach to
	   * the anchor's origin.
	   * Options:
	   * vertical: [top, center, bottom]
	   * horizontal: [left, middle, right].
	   */
	  targetOrigin: _propTypes4.default.origin,
	  /**
	   * Overrides the inline-styles of the underline.
	   */
	  underlineStyle: _propTypes2.default.object,
	  /**
	   * If `multiple` is true, an array of the `value`s of the selected
	   * menu items. Otherwise, the `value` of the selected menu item.
	   * If provided, the menu will be a controlled component.
	   */
	  value: _propTypes2.default.any
	} : {};
	exports.default = DropDownMenu;

/***/ }),

/***/ 1120:
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

	var NavigationArrowDropDown = function NavigationArrowDropDown(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' })
	  );
	};
	NavigationArrowDropDown = (0, _pure2.default)(NavigationArrowDropDown);
	NavigationArrowDropDown.displayName = 'NavigationArrowDropDown';
	NavigationArrowDropDown.muiName = 'SvgIcon';

	exports.default = NavigationArrowDropDown;

/***/ }),

/***/ 1121:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(788);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _BeforeAfterWrapper = __webpack_require__(1122);

	var _BeforeAfterWrapper2 = _interopRequireDefault(_BeforeAfterWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var styles = {
	  before: {
	    content: "' '",
	    display: 'table'
	  },
	  after: {
	    content: "' '",
	    clear: 'both',
	    display: 'table'
	  }
	};

	var ClearFix = function ClearFix(_ref) {
	  var style = _ref.style,
	      children = _ref.children,
	      other = (0, _objectWithoutProperties3.default)(_ref, ['style', 'children']);
	  return _react2.default.createElement(
	    _BeforeAfterWrapper2.default,
	    (0, _extends3.default)({}, other, {
	      beforeStyle: styles.before,
	      afterStyle: styles.after,
	      style: style
	    }),
	    children
	  );
	};

	ClearFix.muiName = 'ClearFix';

	ClearFix.propTypes =  false ? {
	  children: _propTypes2.default.node,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _propTypes2.default.object
	} : {};

	exports.default = ClearFix;

/***/ }),

/***/ 1122:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _objectWithoutProperties2 = __webpack_require__(788);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

	var _simpleAssign = __webpack_require__(791);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *  BeforeAfterWrapper
	 *    An alternative for the ::before and ::after css pseudo-elements for
	 *    components whose styles are defined in javascript instead of css.
	 *
	 *  Usage: For the element that we want to apply before and after elements to,
	 *    wrap its children with BeforeAfterWrapper. For example:
	 *
	 *                                            <Paper>
	 *  <Paper>                                     <div> // See notice
	 *    <BeforeAfterWrapper>        renders         <div/> // before element
	 *      [children of paper]       ------>         [children of paper]
	 *    </BeforeAfterWrapper>                       <div/> // after element
	 *  </Paper>                                    </div>
	 *                                            </Paper>
	 *
	 *  Notice: Notice that this div bundles together our elements. If the element
	 *    that we want to apply before and after elements is a HTML tag (i.e. a
	 *    div, p, or button tag), we can avoid this extra nesting by passing using
	 *    the BeforeAfterWrapper in place of said tag like so:
	 *
	 *  <p>
	 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
	 *      [children of p]          ------>         [children of p]
	 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper>
	 *  </p>
	 *
	 *  BeforeAfterWrapper features spread functionality. This means that we can
	 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
	 *
	 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement
	 *  and afterElement have a defined style position.
	 */

	var styles = {
	  box: {
	    boxSizing: 'border-box'
	  }
	};

	var BeforeAfterWrapper = function (_Component) {
	  (0, _inherits3.default)(BeforeAfterWrapper, _Component);

	  function BeforeAfterWrapper() {
	    (0, _classCallCheck3.default)(this, BeforeAfterWrapper);
	    return (0, _possibleConstructorReturn3.default)(this, (BeforeAfterWrapper.__proto__ || (0, _getPrototypeOf2.default)(BeforeAfterWrapper)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(BeforeAfterWrapper, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          beforeStyle = _props.beforeStyle,
	          afterStyle = _props.afterStyle,
	          beforeElementType = _props.beforeElementType,
	          afterElementType = _props.afterElementType,
	          elementType = _props.elementType,
	          other = (0, _objectWithoutProperties3.default)(_props, ['beforeStyle', 'afterStyle', 'beforeElementType', 'afterElementType', 'elementType']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;


	      var beforeElement = void 0;
	      var afterElement = void 0;

	      if (beforeStyle) {
	        beforeElement = _react2.default.createElement(this.props.beforeElementType, {
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.box, beforeStyle)),
	          key: '::before'
	        });
	      }

	      if (afterStyle) {
	        afterElement = _react2.default.createElement(this.props.afterElementType, {
	          style: prepareStyles((0, _simpleAssign2.default)({}, styles.box, afterStyle)),
	          key: '::after'
	        });
	      }

	      var children = [beforeElement, this.props.children, afterElement];

	      var props = other;
	      props.style = prepareStyles((0, _simpleAssign2.default)({}, this.props.style));

	      return _react2.default.createElement(this.props.elementType, props, children);
	    }
	  }]);
	  return BeforeAfterWrapper;
	}(_react.Component);

	BeforeAfterWrapper.defaultProps = {
	  beforeElementType: 'div',
	  afterElementType: 'div',
	  elementType: 'div'
	};
	BeforeAfterWrapper.contextTypes = {
	  muiTheme: _propTypes2.default.object.isRequired
	};
	BeforeAfterWrapper.propTypes =  false ? {
	  afterElementType: _propTypes2.default.string,
	  afterStyle: _propTypes2.default.object,
	  beforeElementType: _propTypes2.default.string,
	  beforeStyle: _propTypes2.default.object,
	  children: _propTypes2.default.node,
	  elementType: _propTypes2.default.string,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _propTypes2.default.object
	} : {};
	exports.default = BeforeAfterWrapper;

/***/ }),

/***/ 1123:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _Toggle = __webpack_require__(1124);

	var _Toggle2 = _interopRequireDefault(_Toggle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Toggle2.default;

/***/ }),

/***/ 1124:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(788);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

	var _simpleAssign = __webpack_require__(791);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _transitions = __webpack_require__(804);

	var _transitions2 = _interopRequireDefault(_transitions);

	var _Paper = __webpack_require__(809);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _EnhancedSwitch = __webpack_require__(1125);

	var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getStyles(props, context, state) {
	  var disabled = props.disabled,
	      elementStyle = props.elementStyle,
	      trackSwitchedStyle = props.trackSwitchedStyle,
	      thumbSwitchedStyle = props.thumbSwitchedStyle,
	      trackStyle = props.trackStyle,
	      thumbStyle = props.thumbStyle,
	      iconStyle = props.iconStyle,
	      rippleStyle = props.rippleStyle,
	      labelStyle = props.labelStyle;
	  var _context$muiTheme = context.muiTheme,
	      baseTheme = _context$muiTheme.baseTheme,
	      toggle = _context$muiTheme.toggle;


	  var toggleSize = 20;
	  var toggleTrackWidth = 36;
	  var styles = {
	    icon: {
	      width: 36,
	      padding: '4px 0px 6px 2px'
	    },
	    ripple: {
	      top: -10,
	      left: -10,
	      color: state.switched ? toggle.thumbOnColor : baseTheme.palette.textColor
	    },
	    toggleElement: {
	      width: toggleTrackWidth
	    },
	    track: {
	      transition: _transitions2.default.easeOut(),
	      width: '100%',
	      height: 14,
	      borderRadius: 30,
	      backgroundColor: toggle.trackOffColor
	    },
	    thumb: {
	      transition: _transitions2.default.easeOut(),
	      position: 'absolute',
	      top: 1,
	      left: 0,
	      width: toggleSize,
	      height: toggleSize,
	      lineHeight: '24px',
	      borderRadius: '50%',
	      backgroundColor: toggle.thumbOffColor
	    },
	    trackWhenSwitched: {
	      backgroundColor: toggle.trackOnColor
	    },
	    thumbWhenSwitched: {
	      backgroundColor: toggle.thumbOnColor,
	      left: '100%'
	    },
	    trackWhenDisabled: {
	      backgroundColor: toggle.trackDisabledColor
	    },
	    thumbWhenDisabled: {
	      backgroundColor: toggle.thumbDisabledColor
	    },
	    label: {
	      color: disabled ? toggle.labelDisabledColor : toggle.labelColor,
	      width: 'calc(100% - ' + (toggleTrackWidth + 10) + 'px)'
	    }
	  };

	  (0, _simpleAssign2.default)(styles.track, trackStyle, state.switched && styles.trackWhenSwitched, state.switched && trackSwitchedStyle, disabled && styles.trackWhenDisabled);

	  (0, _simpleAssign2.default)(styles.thumb, thumbStyle, state.switched && styles.thumbWhenSwitched, state.switched && thumbSwitchedStyle, disabled && styles.thumbWhenDisabled);

	  if (state.switched) {
	    styles.thumb.marginLeft = 0 - styles.thumb.width;
	  }

	  (0, _simpleAssign2.default)(styles.icon, iconStyle);

	  (0, _simpleAssign2.default)(styles.ripple, rippleStyle);

	  (0, _simpleAssign2.default)(styles.label, labelStyle);

	  (0, _simpleAssign2.default)(styles.toggleElement, elementStyle);

	  return styles;
	}

	var Toggle = function (_Component) {
	  (0, _inherits3.default)(Toggle, _Component);

	  function Toggle() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Toggle);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toggle.__proto__ || (0, _getPrototypeOf2.default)(Toggle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      switched: false
	    }, _this.handleStateChange = function (newSwitched) {
	      _this.setState({
	        switched: newSwitched
	      });
	    }, _this.handleToggle = function (event, isInputChecked) {
	      if (_this.props.onToggle) {
	        _this.props.onToggle(event, isInputChecked);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Toggle, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _props = this.props,
	          toggled = _props.toggled,
	          defaultToggled = _props.defaultToggled,
	          valueLink = _props.valueLink;


	      if (toggled || defaultToggled || valueLink && valueLink.value) {
	        this.setState({
	          switched: true
	        });
	      }
	    }
	  }, {
	    key: 'isToggled',
	    value: function isToggled() {
	      return this.refs.enhancedSwitch.isSwitched();
	    }
	  }, {
	    key: 'setToggled',
	    value: function setToggled(newToggledValue) {
	      this.refs.enhancedSwitch.setSwitched(newToggledValue);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          defaultToggled = _props2.defaultToggled,
	          elementStyle = _props2.elementStyle,
	          onToggle = _props2.onToggle,
	          trackSwitchedStyle = _props2.trackSwitchedStyle,
	          thumbSwitchedStyle = _props2.thumbSwitchedStyle,
	          toggled = _props2.toggled,
	          other = (0, _objectWithoutProperties3.default)(_props2, ['defaultToggled', 'elementStyle', 'onToggle', 'trackSwitchedStyle', 'thumbSwitchedStyle', 'toggled']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context, this.state);

	      var toggleElement = _react2.default.createElement(
	        'div',
	        { style: prepareStyles((0, _simpleAssign2.default)({}, styles.toggleElement)) },
	        _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, styles.track)) }),
	        _react2.default.createElement(_Paper2.default, { style: styles.thumb, circle: true, zDepth: 1 })
	      );

	      var enhancedSwitchProps = {
	        ref: 'enhancedSwitch',
	        inputType: 'checkbox',
	        switchElement: toggleElement,
	        rippleStyle: styles.ripple,
	        rippleColor: styles.ripple.color,
	        iconStyle: styles.icon,
	        trackStyle: styles.track,
	        thumbStyle: styles.thumb,
	        labelStyle: styles.label,
	        switched: this.state.switched,
	        onSwitch: this.handleToggle,
	        onParentShouldUpdate: this.handleStateChange,
	        labelPosition: this.props.labelPosition
	      };

	      if (this.props.hasOwnProperty('toggled')) {
	        enhancedSwitchProps.checked = toggled;
	      } else if (this.props.hasOwnProperty('defaultToggled')) {
	        enhancedSwitchProps.defaultChecked = defaultToggled;
	      }

	      return _react2.default.createElement(_EnhancedSwitch2.default, (0, _extends3.default)({}, other, enhancedSwitchProps));
	    }
	  }]);
	  return Toggle;
	}(_react.Component);

	Toggle.defaultProps = {
	  defaultToggled: false,
	  disabled: false,
	  labelPosition: 'left'
	};
	Toggle.contextTypes = {
	  muiTheme: _propTypes2.default.object.isRequired
	};
	Toggle.propTypes =  false ? {
	  /**
	   * Determines whether the Toggle is initially turned on.
	   * **Warning:** This cannot be used in conjunction with `toggled`.
	   * Decide between using a controlled or uncontrolled input element and remove one of these props.
	   * More info: https://fb.me/react-controlled-components
	   */
	  defaultToggled: _propTypes2.default.bool,
	  /**
	   * Will disable the toggle if true.
	   */
	  disabled: _propTypes2.default.bool,
	  /**
	   * Overrides the inline-styles of the Toggle element.
	   */
	  elementStyle: _propTypes2.default.object,
	  /**
	   * Overrides the inline-styles of the Icon element.
	   */
	  iconStyle: _propTypes2.default.object,
	  /**
	   * Overrides the inline-styles of the input element.
	   */
	  inputStyle: _propTypes2.default.object,
	  /**
	   * Label for toggle.
	   */
	  label: _propTypes2.default.node,
	  /**
	   * Where the label will be placed next to the toggle.
	   */
	  labelPosition: _propTypes2.default.oneOf(['left', 'right']),
	  /**
	   * Overrides the inline-styles of the Toggle element label.
	   */
	  labelStyle: _propTypes2.default.object,
	  /**
	   * Callback function that is fired when the toggle switch is toggled.
	   *
	   * @param {object} event Change event targeting the toggle.
	   * @param {bool} isInputChecked The new value of the toggle.
	   */
	  onToggle: _propTypes2.default.func,
	  /**
	   * Override style of ripple.
	   */
	  rippleStyle: _propTypes2.default.object,
	  /**
	   * Override the inline-styles of the root element.
	   */
	  style: _propTypes2.default.object,
	  /**
	   * Override style for thumb.
	   */
	  thumbStyle: _propTypes2.default.object,
	  /**
	  * Override the inline styles for thumb when the toggle switch is toggled on.
	  */
	  thumbSwitchedStyle: _propTypes2.default.object,
	  /**
	   * Toggled if set to true.
	   */
	  toggled: _propTypes2.default.bool,
	  /**
	   * Override style for track.
	   */
	  trackStyle: _propTypes2.default.object,
	  /**
	  * Override the inline styles for track when the toggle switch is toggled on.
	  */
	  trackSwitchedStyle: _propTypes2.default.object,
	  /**
	   * ValueLink prop for when using controlled toggle.
	   */
	  valueLink: _propTypes2.default.object
	} : {};
	exports.default = Toggle;

/***/ }),

/***/ 1125:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(788);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

	var _simpleAssign = __webpack_require__(791);

	var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactEventListener = __webpack_require__(792);

	var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

	var _keycode = __webpack_require__(803);

	var _keycode2 = _interopRequireDefault(_keycode);

	var _transitions = __webpack_require__(804);

	var _transitions2 = _interopRequireDefault(_transitions);

	var _FocusRipple = __webpack_require__(819);

	var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

	var _TouchRipple = __webpack_require__(824);

	var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

	var _Paper = __webpack_require__(809);

	var _Paper2 = _interopRequireDefault(_Paper);

	var _warning = __webpack_require__(368);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getStyles(props, context) {
	  var baseTheme = context.muiTheme.baseTheme;


	  return {
	    root: {
	      cursor: props.disabled ? 'not-allowed' : 'pointer',
	      position: 'relative',
	      overflow: 'visible',
	      display: 'table',
	      height: 'auto',
	      width: '100%'
	    },
	    input: {
	      position: 'absolute',
	      cursor: 'inherit',
	      pointerEvents: 'all',
	      opacity: 0,
	      width: '100%',
	      height: '100%',
	      zIndex: 2,
	      left: 0,
	      boxSizing: 'border-box',
	      padding: 0,
	      margin: 0
	    },
	    controls: {
	      display: 'flex',
	      width: '100%',
	      height: '100%'
	    },
	    label: {
	      float: 'left',
	      position: 'relative',
	      display: 'block',
	      width: 'calc(100% - 60px)',
	      lineHeight: '24px',
	      color: baseTheme.palette.textColor,
	      fontFamily: baseTheme.fontFamily
	    },
	    wrap: {
	      transition: _transitions2.default.easeOut(),
	      float: 'left',
	      position: 'relative',
	      display: 'block',
	      flexShrink: 0,
	      width: 60 - baseTheme.spacing.desktopGutterLess,
	      marginRight: props.labelPosition === 'right' ? baseTheme.spacing.desktopGutterLess : 0,
	      marginLeft: props.labelPosition === 'left' ? baseTheme.spacing.desktopGutterLess : 0
	    },
	    ripple: {
	      color: props.rippleColor || baseTheme.palette.primary1Color,
	      height: '200%',
	      width: '200%',
	      top: -12,
	      left: -12
	    }
	  };
	}

	var EnhancedSwitch = function (_Component) {
	  (0, _inherits3.default)(EnhancedSwitch, _Component);

	  function EnhancedSwitch() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, EnhancedSwitch);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EnhancedSwitch.__proto__ || (0, _getPrototypeOf2.default)(EnhancedSwitch)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      isKeyboardFocused: false
	    }, _this.handleChange = function (event) {
	      _this.tabPressed = false;
	      _this.setState({
	        isKeyboardFocused: false
	      });

	      var isInputChecked = _this.refs.checkbox.checked;

	      if (!_this.props.hasOwnProperty('checked') && _this.props.onParentShouldUpdate) {
	        _this.props.onParentShouldUpdate(isInputChecked);
	      }

	      if (_this.props.onSwitch) {
	        _this.props.onSwitch(event, isInputChecked);
	      }
	    }, _this.handleKeyDown = function (event) {
	      var code = (0, _keycode2.default)(event);

	      if (code === 'tab') {
	        _this.tabPressed = true;
	      }
	      if (_this.state.isKeyboardFocused && code === 'space') {
	        _this.handleChange(event);
	      }
	    }, _this.handleKeyUp = function (event) {
	      if (_this.state.isKeyboardFocused && (0, _keycode2.default)(event) === 'space') {
	        _this.handleChange(event);
	      }
	    }, _this.handleMouseDown = function (event) {
	      // only listen to left clicks
	      if (event.button === 0) {
	        _this.refs.touchRipple.start(event);
	      }
	    }, _this.handleMouseUp = function () {
	      _this.refs.touchRipple.end();
	    }, _this.handleMouseLeave = function () {
	      _this.refs.touchRipple.end();
	    }, _this.handleTouchStart = function (event) {
	      _this.refs.touchRipple.start(event);
	    }, _this.handleTouchEnd = function () {
	      _this.refs.touchRipple.end();
	    }, _this.handleBlur = function (event) {
	      _this.setState({
	        isKeyboardFocused: false
	      });

	      if (_this.props.onBlur) {
	        _this.props.onBlur(event);
	      }
	    }, _this.handleFocus = function (event) {
	      // setTimeout is needed becuase the focus event fires first
	      // Wait so that we can capture if this was a keyboard focus
	      // or touch focus
	      setTimeout(function () {
	        if (_this.tabPressed) {
	          _this.setState({
	            isKeyboardFocused: true
	          });
	        }
	      }, 150);

	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(EnhancedSwitch, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.componentWillReceiveProps(this.props);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var inputNode = this.refs.checkbox;
	      if ((!this.props.switched || inputNode.checked !== this.props.switched) && this.props.onParentShouldUpdate) {
	        this.props.onParentShouldUpdate(inputNode.checked);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var hasCheckedProp = nextProps.hasOwnProperty('checked');
	      var hasNewDefaultProp = nextProps.hasOwnProperty('defaultChecked') && nextProps.defaultChecked !== this.props.defaultChecked;

	      if (hasCheckedProp || hasNewDefaultProp) {
	        var switched = nextProps.checked || nextProps.defaultChecked || false;

	        this.setState({
	          switched: switched
	        });

	        if (this.props.onParentShouldUpdate && switched !== this.props.switched) {
	          this.props.onParentShouldUpdate(switched);
	        }
	      }
	    }
	  }, {
	    key: 'isSwitched',
	    value: function isSwitched() {
	      return this.refs.checkbox.checked;
	    }

	    // no callback here because there is no event

	  }, {
	    key: 'setSwitched',
	    value: function setSwitched(newSwitchedValue) {
	      if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
	        if (this.props.onParentShouldUpdate) {
	          this.props.onParentShouldUpdate(newSwitchedValue);
	        }
	        this.refs.checkbox.checked = newSwitchedValue;
	      } else {
	         false ? (0, _warning2.default)(false, 'Material-UI: Cannot call set method while checked is defined as a property.') : void 0;
	      }
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.refs.checkbox.value;
	    }

	    // Checkbox inputs only use SPACE to change their state. Using ENTER will
	    // update the ui but not the input.


	    /**
	     * Because both the ripples and the checkbox input cannot share pointer
	     * events, the checkbox input takes control of pointer events and calls
	     * ripple animations manually.
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          name = _props.name,
	          value = _props.value,
	          checked = _props.checked,
	          iconStyle = _props.iconStyle,
	          inputStyle = _props.inputStyle,
	          inputType = _props.inputType,
	          label = _props.label,
	          labelStyle = _props.labelStyle,
	          labelPosition = _props.labelPosition,
	          onSwitch = _props.onSwitch,
	          onBlur = _props.onBlur,
	          onFocus = _props.onFocus,
	          onMouseUp = _props.onMouseUp,
	          onMouseDown = _props.onMouseDown,
	          onMouseLeave = _props.onMouseLeave,
	          onTouchStart = _props.onTouchStart,
	          onTouchEnd = _props.onTouchEnd,
	          onParentShouldUpdate = _props.onParentShouldUpdate,
	          disabled = _props.disabled,
	          disableTouchRipple = _props.disableTouchRipple,
	          disableFocusRipple = _props.disableFocusRipple,
	          className = _props.className,
	          rippleColor = _props.rippleColor,
	          rippleStyle = _props.rippleStyle,
	          style = _props.style,
	          switched = _props.switched,
	          switchElement = _props.switchElement,
	          thumbStyle = _props.thumbStyle,
	          trackStyle = _props.trackStyle,
	          other = (0, _objectWithoutProperties3.default)(_props, ['name', 'value', 'checked', 'iconStyle', 'inputStyle', 'inputType', 'label', 'labelStyle', 'labelPosition', 'onSwitch', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'onParentShouldUpdate', 'disabled', 'disableTouchRipple', 'disableFocusRipple', 'className', 'rippleColor', 'rippleStyle', 'style', 'switched', 'switchElement', 'thumbStyle', 'trackStyle']);
	      var prepareStyles = this.context.muiTheme.prepareStyles;

	      var styles = getStyles(this.props, this.context);
	      var wrapStyles = (0, _simpleAssign2.default)(styles.wrap, iconStyle);
	      var mergedRippleStyle = (0, _simpleAssign2.default)(styles.ripple, rippleStyle);

	      if (thumbStyle) {
	        wrapStyles.marginLeft /= 2;
	        wrapStyles.marginRight /= 2;
	      }

	      var labelElement = label && _react2.default.createElement(
	        'label',
	        { style: prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle)) },
	        label
	      );

	      var showTouchRipple = !disabled && !disableTouchRipple;
	      var showFocusRipple = !disabled && !disableFocusRipple;

	      var touchRipple = _react2.default.createElement(_TouchRipple2.default, {
	        ref: 'touchRipple',
	        key: 'touchRipple',
	        style: mergedRippleStyle,
	        color: mergedRippleStyle.color,
	        muiTheme: this.context.muiTheme,
	        centerRipple: true
	      });

	      var focusRipple = _react2.default.createElement(_FocusRipple2.default, {
	        key: 'focusRipple',
	        innerStyle: mergedRippleStyle,
	        color: mergedRippleStyle.color,
	        muiTheme: this.context.muiTheme,
	        show: this.state.isKeyboardFocused
	      });

	      var ripples = [showTouchRipple ? touchRipple : null, showFocusRipple ? focusRipple : null];

	      var touchHandlers = showTouchRipple ? {
	        onMouseUp: this.handleMouseUp,
	        onMouseDown: this.handleMouseDown,
	        onMouseLeave: this.handleMouseLeave,
	        onTouchStart: this.handleTouchStart,
	        onTouchEnd: this.handleTouchEnd
	      } : {};

	      var inputElement = _react2.default.createElement('input', (0, _extends3.default)({}, other, {
	        ref: 'checkbox',
	        type: inputType,
	        style: prepareStyles((0, _simpleAssign2.default)(styles.input, inputStyle)),
	        name: name,
	        value: value,
	        checked: this.state.switched,
	        disabled: disabled,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onChange: this.handleChange
	      }, touchHandlers));

	      // If toggle component (indicated by whether the style includes thumb) manually lay out
	      // elements in order to nest ripple elements
	      var switchOrThumbElement = !thumbStyle ? _react2.default.createElement(
	        'div',
	        { style: prepareStyles(wrapStyles) },
	        switchElement,
	        ripples
	      ) : _react2.default.createElement(
	        'div',
	        { style: prepareStyles(wrapStyles) },
	        _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, trackStyle)) }),
	        _react2.default.createElement(
	          _Paper2.default,
	          { style: thumbStyle, zDepth: 1, circle: true },
	          ' ',
	          ripples,
	          ' '
	        )
	      );

	      var elementsInOrder = labelPosition === 'right' ? _react2.default.createElement(
	        'div',
	        { style: styles.controls },
	        switchOrThumbElement,
	        labelElement
	      ) : _react2.default.createElement(
	        'div',
	        { style: styles.controls },
	        labelElement,
	        switchOrThumbElement
	      );

	      return _react2.default.createElement(
	        'div',
	        { ref: 'root', className: className, style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
	        _react2.default.createElement(_reactEventListener2.default, {
	          target: 'window',
	          onKeyDown: this.handleKeyDown,
	          onKeyUp: this.handleKeyUp
	        }),
	        inputElement,
	        elementsInOrder
	      );
	    }
	  }]);
	  return EnhancedSwitch;
	}(_react.Component);

	EnhancedSwitch.contextTypes = {
	  muiTheme: _propTypes2.default.object.isRequired
	};
	EnhancedSwitch.propTypes =  false ? {
	  checked: _propTypes2.default.bool,
	  className: _propTypes2.default.string,
	  defaultChecked: _propTypes2.default.bool,
	  disableFocusRipple: _propTypes2.default.bool,
	  disableTouchRipple: _propTypes2.default.bool,
	  disabled: _propTypes2.default.bool,
	  iconStyle: _propTypes2.default.object,
	  inputStyle: _propTypes2.default.object,
	  inputType: _propTypes2.default.string.isRequired,
	  label: _propTypes2.default.node,
	  labelPosition: _propTypes2.default.oneOf(['left', 'right']),
	  labelStyle: _propTypes2.default.object,
	  name: _propTypes2.default.string,
	  onBlur: _propTypes2.default.func,
	  onFocus: _propTypes2.default.func,
	  onMouseDown: _propTypes2.default.func,
	  onMouseLeave: _propTypes2.default.func,
	  onMouseUp: _propTypes2.default.func,
	  onParentShouldUpdate: _propTypes2.default.func,
	  onSwitch: _propTypes2.default.func,
	  onTouchEnd: _propTypes2.default.func,
	  onTouchStart: _propTypes2.default.func,
	  rippleColor: _propTypes2.default.string,
	  rippleStyle: _propTypes2.default.object,
	  style: _propTypes2.default.object,
	  switchElement: _propTypes2.default.element.isRequired,
	  switched: _propTypes2.default.bool.isRequired,
	  thumbStyle: _propTypes2.default.object,
	  trackStyle: _propTypes2.default.object,
	  value: _propTypes2.default.any
	} : {};
	exports.default = EnhancedSwitch;

/***/ }),

/***/ 1126:
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

	var ImageCropFree = function ImageCropFree(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z' })
	  );
	};
	ImageCropFree = (0, _pure2.default)(ImageCropFree);
	ImageCropFree.displayName = 'ImageCropFree';
	ImageCropFree.muiName = 'SvgIcon';

	exports.default = ImageCropFree;

/***/ }),

/***/ 1127:
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

	var ImagePhoto = function ImagePhoto(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    props,
	    _react2.default.createElement('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
	  );
	};
	ImagePhoto = (0, _pure2.default)(ImagePhoto);
	ImagePhoto.displayName = 'ImagePhoto';
	ImagePhoto.muiName = 'SvgIcon';

	exports.default = ImagePhoto;

/***/ }),

/***/ 1128:
/***/ (function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(167),__webpack_require__(197)):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.Dropzone=t(require("react"),require("prop-types")):e.Dropzone=t(e.React,e.PropTypes)}(this,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=n(1),f=r(p),d=n(2),h=r(d),v=n(3),g=n(5),y=r(g),m=function(e){function t(e,n){a(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.renderChildren=function(e,t,n,o){return"function"==typeof e?e(c({},r.state,{isDragActive:t,isDragAccept:n,isDragReject:o})):e},r.composeHandlers=r.composeHandlers.bind(r),r.onClick=r.onClick.bind(r),r.onDocumentDrop=r.onDocumentDrop.bind(r),r.onDragEnter=r.onDragEnter.bind(r),r.onDragLeave=r.onDragLeave.bind(r),r.onDragOver=r.onDragOver.bind(r),r.onDragStart=r.onDragStart.bind(r),r.onDrop=r.onDrop.bind(r),r.onFileDialogCancel=r.onFileDialogCancel.bind(r),r.onInputElementClick=r.onInputElementClick.bind(r),r.setRef=r.setRef.bind(r),r.setRefs=r.setRefs.bind(r),r.isFileDialogActive=!1,r.state={draggedFiles:[],acceptedFiles:[],rejectedFiles:[]},r}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this.props.preventDropOnDocument;this.dragTargets=[],e&&(document.addEventListener("dragover",v.onDocumentDragOver,!1),document.addEventListener("drop",this.onDocumentDrop,!1)),this.fileInputEl.addEventListener("click",this.onInputElementClick,!1),window.addEventListener("focus",this.onFileDialogCancel,!1)}},{key:"componentWillUnmount",value:function(){this.props.preventDropOnDocument&&(document.removeEventListener("dragover",v.onDocumentDragOver),document.removeEventListener("drop",this.onDocumentDrop)),null!=this.fileInputEl&&this.fileInputEl.removeEventListener("click",this.onInputElementClick,!1),window.removeEventListener("focus",this.onFileDialogCancel,!1)}},{key:"composeHandlers",value:function(e){return this.props.disabled?null:e}},{key:"onDocumentDrop",value:function(e){this.node&&this.node.contains(e.target)||(e.preventDefault(),this.dragTargets=[])}},{key:"onDragStart",value:function(e){this.props.onDragStart&&this.props.onDragStart.call(this,e)}},{key:"onDragEnter",value:function(e){e.preventDefault(),-1===this.dragTargets.indexOf(e.target)&&this.dragTargets.push(e.target),this.setState({isDragActive:!0,draggedFiles:(0,v.getDataTransferItems)(e)}),this.props.onDragEnter&&this.props.onDragEnter.call(this,e)}},{key:"onDragOver",value:function(e){e.preventDefault(),e.stopPropagation();try{e.dataTransfer.dropEffect=this.isFileDialogActive?"none":"copy"}catch(e){}return this.props.onDragOver&&this.props.onDragOver.call(this,e),!1}},{key:"onDragLeave",value:function(e){var t=this;e.preventDefault(),this.dragTargets=this.dragTargets.filter(function(n){return n!==e.target&&t.node.contains(n)}),this.dragTargets.length>0||(this.setState({isDragActive:!1,draggedFiles:[]}),this.props.onDragLeave&&this.props.onDragLeave.call(this,e))}},{key:"onDrop",value:function(e){var t=this,n=this.props,r=n.onDrop,o=n.onDropAccepted,a=n.onDropRejected,s=n.multiple,l=n.disablePreview,c=n.accept,u=(0,v.getDataTransferItems)(e),p=[],f=[];e.preventDefault(),this.dragTargets=[],this.isFileDialogActive=!1,u.forEach(function(e){if(!l)try{e.preview=window.URL.createObjectURL(e)}catch(e){}(0,v.fileAccepted)(e,c)&&(0,v.fileMatchSize)(e,t.props.maxSize,t.props.minSize)?p.push(e):f.push(e)}),s||f.push.apply(f,i(p.splice(1))),r&&r.call(this,p,f,e),f.length>0&&a&&a.call(this,f,e),p.length>0&&o&&o.call(this,p,e),this.draggedFiles=null,this.setState({isDragActive:!1,draggedFiles:[],acceptedFiles:p,rejectedFiles:f})}},{key:"onClick",value:function(e){var t=this.props,n=t.onClick;t.disableClick||(e.stopPropagation(),n&&n.call(this,e),(0,v.isIeOrEdge)()?setTimeout(this.open.bind(this),0):this.open())}},{key:"onInputElementClick",value:function(e){e.stopPropagation(),this.props.inputProps&&this.props.inputProps.onClick&&this.props.inputProps.onClick()}},{key:"onFileDialogCancel",value:function(){var e=this,t=this.props.onFileDialogCancel;this.isFileDialogActive&&setTimeout(function(){if(null!=e.fileInputEl){e.fileInputEl.files.length||(e.isFileDialogActive=!1)}"function"==typeof t&&t()},300)}},{key:"setRef",value:function(e){this.node=e}},{key:"setRefs",value:function(e){this.fileInputEl=e}},{key:"open",value:function(){this.isFileDialogActive=!0,this.fileInputEl.value=null,this.fileInputEl.click()}},{key:"render",value:function(){var e=this.props,t=e.accept,n=e.acceptClassName,r=e.activeClassName,i=e.children,a=e.disabled,s=e.disabledClassName,l=e.inputProps,u=e.multiple,p=e.name,d=e.rejectClassName,h=o(e,["accept","acceptClassName","activeClassName","children","disabled","disabledClassName","inputProps","multiple","name","rejectClassName"]),g=h.acceptStyle,m=h.activeStyle,D=h.className,b=void 0===D?"":D,x=h.disabledStyle,S=h.rejectStyle,O=h.style,C=o(h,["acceptStyle","activeStyle","className","disabledStyle","rejectStyle","style"]),E=this.state,j=E.isDragActive,k=E.draggedFiles,w=k.length,P=u||w<=1,F=w>0&&(0,v.allFilesAccepted)(k,this.props.accept),_=w>0&&(!F||!P),A=!(b||O||m||g||S||x);j&&r&&(b+=" "+r),F&&n&&(b+=" "+n),_&&d&&(b+=" "+d),a&&s&&(b+=" "+s),A&&(O=y.default.default,m=y.default.active,g=y.default.active,S=y.default.rejected,x=y.default.disabled);var T=c({position:"relative"},O);m&&j&&(T=c({},T,m)),g&&F&&(T=c({},T,g)),S&&_&&(T=c({},T,S)),x&&a&&(T=c({},T,x));var M={accept:t,disabled:a,type:"file",style:c({position:"absolute",top:0,right:0,bottom:0,left:0,opacity:1e-5,pointerEvents:"none"},l.style),multiple:v.supportMultiple&&u,ref:this.setRefs,onChange:this.onDrop,autoComplete:"off"};p&&p.length&&(M.name=p);var I=(C.acceptedFiles,C.preventDropOnDocument,C.disablePreview,C.disableClick,C.onDropAccepted,C.onDropRejected,C.onFileDialogCancel,C.maxSize,C.minSize,o(C,["acceptedFiles","preventDropOnDocument","disablePreview","disableClick","onDropAccepted","onDropRejected","onFileDialogCancel","maxSize","minSize"]));return f.default.createElement("div",c({className:b,style:T},I,{onClick:this.composeHandlers(this.onClick),onDragStart:this.composeHandlers(this.onDragStart),onDragEnter:this.composeHandlers(this.onDragEnter),onDragOver:this.composeHandlers(this.onDragOver),onDragLeave:this.composeHandlers(this.onDragLeave),onDrop:this.composeHandlers(this.onDrop),ref:this.setRef,"aria-disabled":a}),this.renderChildren(i,j,F,_),f.default.createElement("input",c({},l,M)))}}]),t}(f.default.Component);t.default=m,m.propTypes={accept:h.default.oneOfType([h.default.string,h.default.arrayOf(h.default.string)]),children:h.default.oneOfType([h.default.node,h.default.func]),disableClick:h.default.bool,disabled:h.default.bool,disablePreview:h.default.bool,preventDropOnDocument:h.default.bool,inputProps:h.default.object,multiple:h.default.bool,name:h.default.string,maxSize:h.default.number,minSize:h.default.number,className:h.default.string,activeClassName:h.default.string,acceptClassName:h.default.string,rejectClassName:h.default.string,disabledClassName:h.default.string,style:h.default.object,activeStyle:h.default.object,acceptStyle:h.default.object,rejectStyle:h.default.object,disabledStyle:h.default.object,onClick:h.default.func,onDrop:h.default.func,onDropAccepted:h.default.func,onDropRejected:h.default.func,onDragStart:h.default.func,onDragEnter:h.default.func,onDragOver:h.default.func,onDragLeave:h.default.func,onFileDialogCancel:h.default.func},m.defaultProps={preventDropOnDocument:!0,disabled:!1,disablePreview:!1,disableClick:!1,inputProps:{},multiple:!0,maxSize:1/0,minSize:0},e.exports=t.default},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";function r(e){var t=[];if(e.dataTransfer){var n=e.dataTransfer;n.files&&n.files.length?t=n.files:n.items&&n.items.length&&(t=n.items)}else e.target&&e.target.files&&(t=e.target.files);return Array.prototype.slice.call(t)}function o(e,t){return"application/x-moz-file"===e.type||(0,f.default)(e,t)}function i(e,t,n){return e.size<=t&&e.size>=n}function a(e,t){return e.every(function(e){return o(e,t)})}function s(e){e.preventDefault()}function l(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}function c(e){return-1!==e.indexOf("Edge/")}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return l(e)||c(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.supportMultiple=void 0,t.getDataTransferItems=r,t.fileAccepted=o,t.fileMatchSize=i,t.allFilesAccepted=a,t.onDocumentDragOver=s,t.isIeOrEdge=u;var p=n(4),f=function(e){return e&&e.__esModule?e:{default:e}}(p);t.supportMultiple="undefined"==typeof document||!document||!document.createElement||"multiple"in document.createElement("input")},function(e,t){e.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";t.__esModule=!0,n(8),n(9),t.default=function(e,t){if(e&&t){var n=function(){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",o=e.type||"",i=o.replace(/\/.*$/,"");return{v:n.some(function(e){var t=e.trim();return"."===t.charAt(0)?r.toLowerCase().endsWith(t.toLowerCase()):/\/\*$/.test(t)?i===t.replace(/\/.*$/,""):o===t})}}();if("object"==typeof n)return n.v}return!0},e.exports=t.default},function(e,t){var n=e.exports={version:"1.2.2"};"number"==typeof __e&&(__e=n)},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){var r=n(2),o=n(1),i=n(4),a=n(19),s="prototype",l=function(e,t){return function(){return e.apply(t,arguments)}},c=function(e,t,n){var u,p,f,d,h=e&c.G,v=e&c.P,g=h?r:e&c.S?r[t]||(r[t]={}):(r[t]||{})[s],y=h?o:o[t]||(o[t]={});h&&(n=t);for(u in n)p=!(e&c.F)&&g&&u in g,f=(p?g:n)[u],d=e&c.B&&p?l(f,r):v&&"function"==typeof f?l(Function.call,f):f,g&&!p&&a(g,u,f),y[u]!=f&&i(y,u,d),v&&((y[s]||(y[s]={}))[u]=f)};r.core=o,c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,e.exports=c},function(e,t,n){var r=n(5),o=n(18);e.exports=n(22)?function(e,t,n){return r.setDesc(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t){var n=Object;e.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){var r=n(20)("wks"),o=n(2).Symbol;e.exports=function(e){return r[e]||(r[e]=o&&o[e]||(o||n(6))("Symbol."+e))}},function(e,t,n){n(26),e.exports=n(1).Array.some},function(e,t,n){n(25),e.exports=n(1).String.endsWith},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(10);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[n(7)("match")]=!1,!"/./"[e](t)}catch(e){}}return!0}},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){var r=n(16),o=n(11),i=n(7)("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==o(e))}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(2),o=n(4),i=n(6)("src"),a="toString",s=Function[a],l=(""+s).split(a);n(1).inspectSource=function(e){return s.call(e)},(e.exports=function(e,t,n,a){"function"==typeof n&&(o(n,i,e[t]?""+e[t]:l.join(String(t))),"name"in n||(n.name=t)),e===r?e[t]=n:(a||delete e[t],o(e,t,n))})(Function.prototype,a,function(){return"function"==typeof this&&this[i]||s.call(this)})},function(e,t,n){var r=n(2),o="__core-js_shared__",i=r[o]||(r[o]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,n){var r=n(17),o=n(13);e.exports=function(e,t,n){if(r(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(o(e))}},function(e,t,n){e.exports=!n(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(23),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t,n){"use strict";var r=n(3),o=n(24),i=n(21),a="endsWith",s=""[a];r(r.P+r.F*n(14)(a),"String",{endsWith:function(e){var t=i(this,e,a),n=arguments,r=n.length>1?n[1]:void 0,l=o(t.length),c=void 0===r?l:Math.min(o(r),l),u=String(e);return s?s.call(t,u,c):t.slice(c-u.length,c)===u}})},function(e,t,n){var r=n(5),o=n(3),i=n(1).Array||Array,a={},s=function(e,t){r.each.call(e.split(","),function(e){void 0==t&&e in i?a[e]=i[e]:e in[]&&(a[e]=n(12)(Function.call,[][e],t))})};s("pop,reverse,shift,keys,values,entries",1),s("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),s("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",a)}])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={rejected:{borderStyle:"solid",borderColor:"#c66",backgroundColor:"#eee"},disabled:{opacity:.5},active:{borderStyle:"solid",borderColor:"#6c6",backgroundColor:"#eee"},default:{width:200,height:200,borderWidth:2,borderColor:"#666",borderStyle:"dashed",borderRadius:5}},e.exports=t.default}])});
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2E5N2IxMjI2ZjQyMTFkODU5MGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQcm9wVHlwZXNcIixcImNvbW1vbmpzMlwiOlwicHJvcC10eXBlc1wiLFwiY29tbW9uanNcIjpcInByb3AtdHlwZXNcIixcImFtZFwiOlwicHJvcC10eXBlc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F0dHItYWNjZXB0L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3N0eWxlcy5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwiZGVmaW5lIiwiYW1kIiwidGhpcyIsIl9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fIiwiX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18iLCJtb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiaW5zdGFsbGVkTW9kdWxlcyIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibiIsIl9fZXNNb2R1bGUiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiZGVmYXVsdCIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsImtleXMiLCJ0YXJnZXQiLCJpbmRleE9mIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyMiIsImxlbmd0aCIsImZyb20iLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwid3JpdGFibGUiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9leHRlbmRzIiwiYXNzaWduIiwiYXJndW1lbnRzIiwic291cmNlIiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl9yZWFjdCIsIl9yZWFjdDIiLCJfcHJvcFR5cGVzIiwiX3Byb3BUeXBlczIiLCJfdXRpbHMiLCJfc3R5bGVzIiwiX3N0eWxlczIiLCJEcm9wem9uZSIsIl9SZWFjdCRDb21wb25lbnQiLCJjb250ZXh0IiwiX3RoaXMiLCJnZXRQcm90b3R5cGVPZiIsInJlbmRlckNoaWxkcmVuIiwiY2hpbGRyZW4iLCJpc0RyYWdBY3RpdmUiLCJpc0RyYWdBY2NlcHQiLCJpc0RyYWdSZWplY3QiLCJzdGF0ZSIsImNvbXBvc2VIYW5kbGVycyIsImJpbmQiLCJvbkNsaWNrIiwib25Eb2N1bWVudERyb3AiLCJvbkRyYWdFbnRlciIsIm9uRHJhZ0xlYXZlIiwib25EcmFnT3ZlciIsIm9uRHJhZ1N0YXJ0Iiwib25Ecm9wIiwib25GaWxlRGlhbG9nQ2FuY2VsIiwib25JbnB1dEVsZW1lbnRDbGljayIsInNldFJlZiIsInNldFJlZnMiLCJpc0ZpbGVEaWFsb2dBY3RpdmUiLCJkcmFnZ2VkRmlsZXMiLCJhY2NlcHRlZEZpbGVzIiwicmVqZWN0ZWRGaWxlcyIsInByZXZlbnREcm9wT25Eb2N1bWVudCIsImRyYWdUYXJnZXRzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwib25Eb2N1bWVudERyYWdPdmVyIiwiZmlsZUlucHV0RWwiLCJ3aW5kb3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlciIsImRpc2FibGVkIiwiZXZ0Iiwibm9kZSIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwdXNoIiwic2V0U3RhdGUiLCJnZXREYXRhVHJhbnNmZXJJdGVtcyIsInN0b3BQcm9wYWdhdGlvbiIsImRhdGFUcmFuc2ZlciIsImRyb3BFZmZlY3QiLCJlcnIiLCJfdGhpczIiLCJmaWx0ZXIiLCJlbCIsIl90aGlzMyIsIl9wcm9wcyIsIm9uRHJvcEFjY2VwdGVkIiwib25Ecm9wUmVqZWN0ZWQiLCJtdWx0aXBsZSIsImRpc2FibGVQcmV2aWV3IiwiYWNjZXB0IiwiZmlsZUxpc3QiLCJmb3JFYWNoIiwiZmlsZSIsInByZXZpZXciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJmaWxlQWNjZXB0ZWQiLCJmaWxlTWF0Y2hTaXplIiwibWF4U2l6ZSIsIm1pblNpemUiLCJhcHBseSIsInNwbGljZSIsIl9wcm9wczIiLCJkaXNhYmxlQ2xpY2siLCJpc0llT3JFZGdlIiwic2V0VGltZW91dCIsIm9wZW4iLCJpbnB1dFByb3BzIiwiX3RoaXM0IiwiZmlsZXMiLCJyZWYiLCJjbGljayIsIl9wcm9wczMiLCJhY2NlcHRDbGFzc05hbWUiLCJhY3RpdmVDbGFzc05hbWUiLCJkaXNhYmxlZENsYXNzTmFtZSIsInJlamVjdENsYXNzTmFtZSIsInJlc3QiLCJhY2NlcHRTdHlsZSIsImFjdGl2ZVN0eWxlIiwiX3Jlc3QkY2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwidW5kZWZpbmVkIiwiZGlzYWJsZWRTdHlsZSIsInJlamVjdFN0eWxlIiwic3R5bGUiLCJfc3RhdGUiLCJmaWxlc0NvdW50IiwiaXNNdWx0aXBsZUFsbG93ZWQiLCJhbGxGaWxlc0FjY2VwdGVkIiwibm9TdHlsZXMiLCJhY3RpdmUiLCJyZWplY3RlZCIsImFwcGxpZWRTdHlsZSIsInBvc2l0aW9uIiwiaW5wdXRBdHRyaWJ1dGVzIiwidHlwZSIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsIm9wYWNpdHkiLCJwb2ludGVyRXZlbnRzIiwic3VwcG9ydE11bHRpcGxlIiwib25DaGFuZ2UiLCJhdXRvQ29tcGxldGUiLCJkaXZQcm9wcyIsImNyZWF0ZUVsZW1lbnQiLCJhcmlhLWRpc2FibGVkIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiYXJyYXlPZiIsImZ1bmMiLCJib29sIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiSW5maW5pdHkiLCJldmVudCIsImRhdGFUcmFuc2Zlckl0ZW1zTGlzdCIsImR0IiwiaXRlbXMiLCJzbGljZSIsIl9hdHRyQWNjZXB0MiIsInNpemUiLCJldmVyeSIsImlzSWUiLCJ1c2VyQWdlbnQiLCJpc0VkZ2UiLCJuYXZpZ2F0b3IiLCJfYXR0ckFjY2VwdCIsInQiLCJlIiwiciIsImlkIiwibG9hZGVkIiwic3BsaXQiLCJyZXBsYWNlIiwidiIsInNvbWUiLCJ0cmltIiwiY2hhckF0IiwidG9Mb3dlckNhc2UiLCJlbmRzV2l0aCIsInRlc3QiLCJ2ZXJzaW9uIiwiX19lIiwiTWF0aCIsIkZ1bmN0aW9uIiwiX19nIiwidSIsImYiLCJhIiwieSIsIkciLCJoIiwiUCIsIlMiLCJ4IiwiRiIsIkIiLCJjb3JlIiwiVyIsInNldERlc2MiLCJnZXRQcm90byIsImlzRW51bSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiZ2V0RGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInNldERlc2NzIiwiZ2V0S2V5cyIsImdldE5hbWVzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldFN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJlYWNoIiwicmFuZG9tIiwiY29uY2F0IiwidG9TdHJpbmciLCJTeW1ib2wiLCJTdHJpbmciLCJpbnNwZWN0U291cmNlIiwiam9pbiIsImNlaWwiLCJmbG9vciIsImlzTmFOIiwibWluIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJDb2xvciIsImJhY2tncm91bmRDb2xvciIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyV2lkdGgiLCJib3JkZXJSYWRpdXMiXSwibWFwcGluZ3MiOiJDQUFBLFNBQUFBLEVBQUFDLEdBQ0EsZ0JBQUFDLFVBQUEsZ0JBQUFDLFFBQ0FBLE9BQUFELFFBQUFELEVBQUFHLFFBQUEsU0FBQUEsUUFBQSxlQUNBLGtCQUFBQyxnQkFBQUMsSUFDQUQsUUFBQSxzQkFBQUosR0FDQSxnQkFBQUMsU0FDQUEsUUFBQSxTQUFBRCxFQUFBRyxRQUFBLFNBQUFBLFFBQUEsZUFFQUosRUFBQSxTQUFBQyxFQUFBRCxFQUFBLE1BQUFBLEVBQUEsWUFDQ08sS0FBQSxTQUFBQyxFQUFBQyxHQUNELE1DQWdCLFVBQVVDLEdDTjFCLFFBQUFDLEdBQUFDLEdBR0EsR0FBQUMsRUFBQUQsR0FDQSxNQUFBQyxHQUFBRCxHQUFBVixPQUdBLElBQUFDLEdBQUFVLEVBQUFELElBQ0FFLEVBQUFGLEVBQ0FHLEdBQUEsRUFDQWIsV0FVQSxPQU5BUSxHQUFBRSxHQUFBSSxLQUFBYixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBUyxHQUdBUixFQUFBWSxHQUFBLEVBR0FaLEVBQUFELFFBdkJBLEdBQUFXLEtBNERBLE9BaENBRixHQUFBTSxFQUFBUCxFQUdBQyxFQUFBTyxFQUFBTCxFQUdBRixFQUFBUSxFQUFBLFNBQUFqQixFQUFBa0IsRUFBQUMsR0FDQVYsRUFBQVcsRUFBQXBCLEVBQUFrQixJQUNBRyxPQUFBQyxlQUFBdEIsRUFBQWtCLEdBQ0FLLGNBQUEsRUFDQUMsWUFBQSxFQUNBQyxJQUFBTixLQU1BVixFQUFBaUIsRUFBQSxTQUFBekIsR0FDQSxHQUFBa0IsR0FBQWxC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LEVBQUEsR0FBQTdNLEVBQUE2TSxFQUFBLEdBQUFyTixFQUFBcU4sRUFBQSxHQUFBdEwsYUFBQXVNLEtBQTBDbE8sRUFBQSxTQUFBK00sRUFBQXJNLEdBQWlCc00sRUFBQTJDLEtBQUE3UCxLQUFBaU4sRUFBQUssTUFBQSxjQUFBTCxPQUFxQyxJQUFBck0sR0FBQXFNLElBQUFuTixHQUFBc08sRUFBQW5CLEdBQUFuTixFQUFBbU4sWUFBQW1CLEVBQUFuQixHQUFBRSxFQUFBLElBQUFlLFNBQUFsTyxRQUFBaU4sR0FBQXJNLE1BQTJFVixHQUFBLDJDQUFBQSxFQUFBLG1FQUFBQSxFQUFBLDZGQUFBSSxJQUFBcU8sRUFBQSxRQUFBUCxPTit6QjVvSixTQUFValAsRUFBUUQsRUFBU1MsR0FFakMsWUFHQVksUUFBT0MsZUFBZXRCLEVBQVMsY0FDN0I0RCxPQUFPLElBRVQ1RCxFQUFRb0MsU090MEJObUosVUFDRWdHLFlBQWEsUUFDYkMsWUFBYSxPQUNiQyxnQkFBaUIsUUFFbkJsSyxVQUNFeUUsUUFBUyxJQUVYVixRQUNFaUcsWUFBYSxRQUNiQyxZQUFhLE9BQ2JDLGdCQUFpQixRQUVuQnJQLFNBQ0VzUCxNQUFPLElBQ1BDLE9BQVEsSUFDUkMsWUFBYSxFQUNiSixZQUFhLE9BQ2JELFlBQWEsU0FDYk0sYUFBYyxJUDAwQmxCNVIsRUFBT0QsUUFBVUEsRUFBaUIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJwcm9wLXR5cGVzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRyb3B6b25lXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEcm9wem9uZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdLCByb290W1wiUHJvcFR5cGVzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJwcm9wLXR5cGVzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRyb3B6b25lXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEcm9wem9uZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdLCByb290W1wiUHJvcFR5cGVzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3N0eWxlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfc3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyogZXNsaW50IHByZWZlci10ZW1wbGF0ZTogMCAqL1xuXG52YXIgRHJvcHpvbmUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRHJvcHpvbmUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIERyb3B6b25lKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyb3B6b25lKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChEcm9wem9uZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3B6b25lKSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMucmVuZGVyQ2hpbGRyZW4gPSBmdW5jdGlvbiAoY2hpbGRyZW4sIGlzRHJhZ0FjdGl2ZSwgaXNEcmFnQWNjZXB0LCBpc0RyYWdSZWplY3QpIHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuKF9leHRlbmRzKHt9LCBfdGhpcy5zdGF0ZSwge1xuICAgICAgICAgIGlzRHJhZ0FjdGl2ZTogaXNEcmFnQWN0aXZlLFxuICAgICAgICAgIGlzRHJhZ0FjY2VwdDogaXNEcmFnQWNjZXB0LFxuICAgICAgICAgIGlzRHJhZ1JlamVjdDogaXNEcmFnUmVqZWN0XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9O1xuXG4gICAgX3RoaXMuY29tcG9zZUhhbmRsZXJzID0gX3RoaXMuY29tcG9zZUhhbmRsZXJzLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLm9uQ2xpY2sgPSBfdGhpcy5vbkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLm9uRG9jdW1lbnREcm9wID0gX3RoaXMub25Eb2N1bWVudERyb3AuYmluZChfdGhpcyk7XG4gICAgX3RoaXMub25EcmFnRW50ZXIgPSBfdGhpcy5vbkRyYWdFbnRlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5vbkRyYWdMZWF2ZSA9IF90aGlzLm9uRHJhZ0xlYXZlLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLm9uRHJhZ092ZXIgPSBfdGhpcy5vbkRyYWdPdmVyLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLm9uRHJhZ1N0YXJ0ID0gX3RoaXMub25EcmFnU3RhcnQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMub25Ecm9wID0gX3RoaXMub25Ecm9wLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLm9uRmlsZURpYWxvZ0NhbmNlbCA9IF90aGlzLm9uRmlsZURpYWxvZ0NhbmNlbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5vbklucHV0RWxlbWVudENsaWNrID0gX3RoaXMub25JbnB1dEVsZW1lbnRDbGljay5iaW5kKF90aGlzKTtcblxuICAgIF90aGlzLnNldFJlZiA9IF90aGlzLnNldFJlZi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5zZXRSZWZzID0gX3RoaXMuc2V0UmVmcy5iaW5kKF90aGlzKTtcblxuICAgIF90aGlzLmlzRmlsZURpYWxvZ0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnZ2VkRmlsZXM6IFtdLFxuICAgICAgYWNjZXB0ZWRGaWxlczogW10sXG4gICAgICByZWplY3RlZEZpbGVzOiBbXVxuICAgIH07XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKERyb3B6b25lLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgcHJldmVudERyb3BPbkRvY3VtZW50ID0gdGhpcy5wcm9wcy5wcmV2ZW50RHJvcE9uRG9jdW1lbnQ7XG5cbiAgICAgIHRoaXMuZHJhZ1RhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKHByZXZlbnREcm9wT25Eb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIF91dGlscy5vbkRvY3VtZW50RHJhZ092ZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMub25Eb2N1bWVudERyb3AsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZUlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSW5wdXRFbGVtZW50Q2xpY2ssIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25GaWxlRGlhbG9nQ2FuY2VsLCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHZhciBwcmV2ZW50RHJvcE9uRG9jdW1lbnQgPSB0aGlzLnByb3BzLnByZXZlbnREcm9wT25Eb2N1bWVudDtcblxuICAgICAgaWYgKHByZXZlbnREcm9wT25Eb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIF91dGlscy5vbkRvY3VtZW50RHJhZ092ZXIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5vbkRvY3VtZW50RHJvcCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5maWxlSW5wdXRFbCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZmlsZUlucHV0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSW5wdXRFbGVtZW50Q2xpY2ssIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25GaWxlRGlhbG9nQ2FuY2VsLCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9zZUhhbmRsZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9zZUhhbmRsZXJzKGhhbmRsZXIpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkRvY3VtZW50RHJvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRG9jdW1lbnREcm9wKGV2dCkge1xuICAgICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuY29udGFpbnMoZXZ0LnRhcmdldCkpIHtcbiAgICAgICAgLy8gaWYgd2UgaW50ZXJjZXB0ZWQgYW4gZXZlbnQgZm9yIG91ciBpbnN0YW5jZSwgbGV0IGl0IHByb3BhZ2F0ZSBkb3duIHRvIHRoZSBpbnN0YW5jZSdzIG9uRHJvcCBoYW5kbGVyXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5kcmFnVGFyZ2V0cyA9IFtdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25EcmFnU3RhcnQoZXZ0KSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkRyYWdTdGFydCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0LmNhbGwodGhpcywgZXZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkRyYWdFbnRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRHJhZ0VudGVyKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIENvdW50IHRoZSBkcm9wem9uZSBhbmQgYW55IGNoaWxkcmVuIHRoYXQgYXJlIGVudGVyZWQuXG4gICAgICBpZiAodGhpcy5kcmFnVGFyZ2V0cy5pbmRleE9mKGV2dC50YXJnZXQpID09PSAtMSkge1xuICAgICAgICB0aGlzLmRyYWdUYXJnZXRzLnB1c2goZXZ0LnRhcmdldCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc0RyYWdBY3RpdmU6IHRydWUsIC8vIERvIG5vdCByZWx5IG9uIGZpbGVzIGZvciB0aGUgZHJhZyBzdGF0ZS4gSXQgZG9lc24ndCB3b3JrIGluIFNhZmFyaS5cbiAgICAgICAgZHJhZ2dlZEZpbGVzOiAoMCwgX3V0aWxzLmdldERhdGFUcmFuc2Zlckl0ZW1zKShldnQpXG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMucHJvcHMub25EcmFnRW50ZXIpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWdFbnRlci5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25EcmFnT3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRHJhZ092ZXIoZXZ0KSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhlIGZpbGUgZGlhbG9nIG9uIENocm9tZSBhbGxvd3MgdXNlcnMgdG8gZHJhZyBmaWxlcyBmcm9tIHRoZSBkaWFsb2cgb250b1xuICAgICAgICAvLyB0aGUgZHJvcHpvbmUsIGNhdXNpbmcgdGhlIGJyb3dzZXIgdGhlIGNyYXNoIHdoZW4gdGhlIGZpbGUgZGlhbG9nIGlzIGNsb3NlZC5cbiAgICAgICAgLy8gQSBkcm9wIGVmZmVjdCBvZiAnbm9uZScgcHJldmVudHMgdGhlIGZpbGUgZnJvbSBiZWluZyBkcm9wcGVkXG4gICAgICAgIGV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IHRoaXMuaXNGaWxlRGlhbG9nQWN0aXZlID8gJ25vbmUnIDogJ2NvcHknOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gY29udGludWUgcmVnYXJkbGVzcyBvZiBlcnJvclxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkRyYWdPdmVyKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25EcmFnT3Zlci5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25EcmFnTGVhdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkRyYWdMZWF2ZShldnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gT25seSBkZWFjdGl2YXRlIG9uY2UgdGhlIGRyb3B6b25lIGFuZCBhbGwgY2hpbGRyZW4gaGF2ZSBiZWVuIGxlZnQuXG4gICAgICB0aGlzLmRyYWdUYXJnZXRzID0gdGhpcy5kcmFnVGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBlbCAhPT0gZXZ0LnRhcmdldCAmJiBfdGhpczIubm9kZS5jb250YWlucyhlbCk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmRyYWdUYXJnZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGVhciBkcmFnZ2luZyBmaWxlcyBzdGF0ZVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzRHJhZ0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIGRyYWdnZWRGaWxlczogW11cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkRyYWdMZWF2ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRHJhZ0xlYXZlLmNhbGwodGhpcywgZXZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkRyb3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkRyb3AoZXZ0KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgb25Ecm9wID0gX3Byb3BzLm9uRHJvcCxcbiAgICAgICAgICBvbkRyb3BBY2NlcHRlZCA9IF9wcm9wcy5vbkRyb3BBY2NlcHRlZCxcbiAgICAgICAgICBvbkRyb3BSZWplY3RlZCA9IF9wcm9wcy5vbkRyb3BSZWplY3RlZCxcbiAgICAgICAgICBtdWx0aXBsZSA9IF9wcm9wcy5tdWx0aXBsZSxcbiAgICAgICAgICBkaXNhYmxlUHJldmlldyA9IF9wcm9wcy5kaXNhYmxlUHJldmlldyxcbiAgICAgICAgICBhY2NlcHQgPSBfcHJvcHMuYWNjZXB0O1xuXG4gICAgICB2YXIgZmlsZUxpc3QgPSAoMCwgX3V0aWxzLmdldERhdGFUcmFuc2Zlckl0ZW1zKShldnQpO1xuICAgICAgdmFyIGFjY2VwdGVkRmlsZXMgPSBbXTtcbiAgICAgIHZhciByZWplY3RlZEZpbGVzID0gW107XG5cbiAgICAgIC8vIFN0b3AgZGVmYXVsdCBicm93c2VyIGJlaGF2aW9yXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gUmVzZXQgdGhlIGNvdW50ZXIgYWxvbmcgd2l0aCB0aGUgZHJhZyBvbiBhIGRyb3AuXG4gICAgICB0aGlzLmRyYWdUYXJnZXRzID0gW107XG4gICAgICB0aGlzLmlzRmlsZURpYWxvZ0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICBmaWxlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIGlmICghZGlzYWJsZVByZXZpZXcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3ID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZ2VuZXJhdGUgcHJldmlldyBmb3IgZmlsZScsIGZpbGUsIGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoMCwgX3V0aWxzLmZpbGVBY2NlcHRlZCkoZmlsZSwgYWNjZXB0KSAmJiAoMCwgX3V0aWxzLmZpbGVNYXRjaFNpemUpKGZpbGUsIF90aGlzMy5wcm9wcy5tYXhTaXplLCBfdGhpczMucHJvcHMubWluU2l6ZSkpIHtcbiAgICAgICAgICBhY2NlcHRlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFtdWx0aXBsZSkge1xuICAgICAgICAvLyBpZiBub3QgaW4gbXVsdGkgbW9kZSBhZGQgYW55IGV4dHJhIGFjY2VwdGVkIGZpbGVzIHRvIHJlamVjdGVkLlxuICAgICAgICAvLyBUaGlzIHdpbGwgYWxsb3cgZW5kIHVzZXJzIHRvIGVhc2lseSBpZ25vcmUgYSBtdWx0aSBmaWxlIGRyb3AgaW4gXCJzaW5nbGVcIiBtb2RlLlxuICAgICAgICByZWplY3RlZEZpbGVzLnB1c2guYXBwbHkocmVqZWN0ZWRGaWxlcywgX3RvQ29uc3VtYWJsZUFycmF5KGFjY2VwdGVkRmlsZXMuc3BsaWNlKDEpKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvbkRyb3ApIHtcbiAgICAgICAgb25Ecm9wLmNhbGwodGhpcywgYWNjZXB0ZWRGaWxlcywgcmVqZWN0ZWRGaWxlcywgZXZ0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlamVjdGVkRmlsZXMubGVuZ3RoID4gMCAmJiBvbkRyb3BSZWplY3RlZCkge1xuICAgICAgICBvbkRyb3BSZWplY3RlZC5jYWxsKHRoaXMsIHJlamVjdGVkRmlsZXMsIGV2dCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY2NlcHRlZEZpbGVzLmxlbmd0aCA+IDAgJiYgb25Ecm9wQWNjZXB0ZWQpIHtcbiAgICAgICAgb25Ecm9wQWNjZXB0ZWQuY2FsbCh0aGlzLCBhY2NlcHRlZEZpbGVzLCBldnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGVhciBmaWxlcyB2YWx1ZVxuICAgICAgdGhpcy5kcmFnZ2VkRmlsZXMgPSBudWxsO1xuXG4gICAgICAvLyBSZXNldCBkcmFnIHN0YXRlXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNEcmFnQWN0aXZlOiBmYWxzZSxcbiAgICAgICAgZHJhZ2dlZEZpbGVzOiBbXSxcbiAgICAgICAgYWNjZXB0ZWRGaWxlczogYWNjZXB0ZWRGaWxlcyxcbiAgICAgICAgcmVqZWN0ZWRGaWxlczogcmVqZWN0ZWRGaWxlc1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25DbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xpY2soZXZ0KSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgb25DbGljayA9IF9wcm9wczIub25DbGljayxcbiAgICAgICAgICBkaXNhYmxlQ2xpY2sgPSBfcHJvcHMyLmRpc2FibGVDbGljaztcblxuICAgICAgaWYgKCFkaXNhYmxlQ2xpY2spIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICAgICAgb25DbGljay5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbiBJRTExL0VkZ2UgdGhlIGZpbGUtYnJvd3NlciBkaWFsb2cgaXMgYmxvY2tpbmcsIGVuc3VyZSB0aGlzIGlzIGJlaGluZCBzZXRUaW1lb3V0XG4gICAgICAgIC8vIHRoaXMgaXMgc28gcmVhY3QgY2FuIGhhbmRsZSBzdGF0ZSBjaGFuZ2VzIGluIHRoZSBvbkNsaWNrIHByb3AgYWJvdmUgYWJvdmVcbiAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3QtZHJvcHpvbmUvcmVhY3QtZHJvcHpvbmUvaXNzdWVzLzQ1MFxuICAgICAgICBpZiAoKDAsIF91dGlscy5pc0llT3JFZGdlKSgpKSB7XG4gICAgICAgICAgc2V0VGltZW91dCh0aGlzLm9wZW4uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbklucHV0RWxlbWVudENsaWNrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25JbnB1dEVsZW1lbnRDbGljayhldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMgJiYgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkZpbGVEaWFsb2dDYW5jZWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkZpbGVEaWFsb2dDYW5jZWwoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgLy8gdGltZW91dCB3aWxsIG5vdCByZWNvZ25pemUgY29udGV4dCBvZiB0aGlzIG1ldGhvZFxuICAgICAgdmFyIG9uRmlsZURpYWxvZ0NhbmNlbCA9IHRoaXMucHJvcHMub25GaWxlRGlhbG9nQ2FuY2VsO1xuICAgICAgLy8gZXhlY3V0ZSB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBGaWxlRGlhbG9nIGlzIG9wZW5lZCBpbiB0aGUgYnJvd3NlclxuXG4gICAgICBpZiAodGhpcy5pc0ZpbGVEaWFsb2dBY3RpdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzNC5maWxlSW5wdXRFbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm5zIGFuIG9iamVjdCBhcyBGaWxlTGlzdFxuICAgICAgICAgICAgdmFyIGZpbGVzID0gX3RoaXM0LmZpbGVJbnB1dEVsLmZpbGVzO1xuXG5cbiAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIF90aGlzNC5pc0ZpbGVEaWFsb2dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG9uRmlsZURpYWxvZ0NhbmNlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb25GaWxlRGlhbG9nQ2FuY2VsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAzMDApO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NldFJlZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFJlZihyZWYpIHtcbiAgICAgIHRoaXMubm9kZSA9IHJlZjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRSZWZzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UmVmcyhyZWYpIHtcbiAgICAgIHRoaXMuZmlsZUlucHV0RWwgPSByZWY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW4gc3lzdGVtIGZpbGUgdXBsb2FkIGRpYWxvZy5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3BlbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICB0aGlzLmlzRmlsZURpYWxvZ0FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmZpbGVJbnB1dEVsLnZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuZmlsZUlucHV0RWwuY2xpY2soKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYWNjZXB0ID0gX3Byb3BzMy5hY2NlcHQsXG4gICAgICAgICAgYWNjZXB0Q2xhc3NOYW1lID0gX3Byb3BzMy5hY2NlcHRDbGFzc05hbWUsXG4gICAgICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3Byb3BzMy5hY3RpdmVDbGFzc05hbWUsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMzLmNoaWxkcmVuLFxuICAgICAgICAgIGRpc2FibGVkID0gX3Byb3BzMy5kaXNhYmxlZCxcbiAgICAgICAgICBkaXNhYmxlZENsYXNzTmFtZSA9IF9wcm9wczMuZGlzYWJsZWRDbGFzc05hbWUsXG4gICAgICAgICAgaW5wdXRQcm9wcyA9IF9wcm9wczMuaW5wdXRQcm9wcyxcbiAgICAgICAgICBtdWx0aXBsZSA9IF9wcm9wczMubXVsdGlwbGUsXG4gICAgICAgICAgbmFtZSA9IF9wcm9wczMubmFtZSxcbiAgICAgICAgICByZWplY3RDbGFzc05hbWUgPSBfcHJvcHMzLnJlamVjdENsYXNzTmFtZSxcbiAgICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wczMsIFsnYWNjZXB0JywgJ2FjY2VwdENsYXNzTmFtZScsICdhY3RpdmVDbGFzc05hbWUnLCAnY2hpbGRyZW4nLCAnZGlzYWJsZWQnLCAnZGlzYWJsZWRDbGFzc05hbWUnLCAnaW5wdXRQcm9wcycsICdtdWx0aXBsZScsICduYW1lJywgJ3JlamVjdENsYXNzTmFtZSddKTtcblxuICAgICAgdmFyIGFjY2VwdFN0eWxlID0gcmVzdC5hY2NlcHRTdHlsZSxcbiAgICAgICAgICBhY3RpdmVTdHlsZSA9IHJlc3QuYWN0aXZlU3R5bGUsXG4gICAgICAgICAgX3Jlc3QkY2xhc3NOYW1lID0gcmVzdC5jbGFzc05hbWUsXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Jlc3QkY2xhc3NOYW1lID09PSB1bmRlZmluZWQgPyAnJyA6IF9yZXN0JGNsYXNzTmFtZSxcbiAgICAgICAgICBkaXNhYmxlZFN0eWxlID0gcmVzdC5kaXNhYmxlZFN0eWxlLFxuICAgICAgICAgIHJlamVjdFN0eWxlID0gcmVzdC5yZWplY3RTdHlsZSxcbiAgICAgICAgICBzdHlsZSA9IHJlc3Quc3R5bGUsXG4gICAgICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMocmVzdCwgWydhY2NlcHRTdHlsZScsICdhY3RpdmVTdHlsZScsICdjbGFzc05hbWUnLCAnZGlzYWJsZWRTdHlsZScsICdyZWplY3RTdHlsZScsICdzdHlsZSddKTtcblxuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgaXNEcmFnQWN0aXZlID0gX3N0YXRlLmlzRHJhZ0FjdGl2ZSxcbiAgICAgICAgICBkcmFnZ2VkRmlsZXMgPSBfc3RhdGUuZHJhZ2dlZEZpbGVzO1xuXG4gICAgICB2YXIgZmlsZXNDb3VudCA9IGRyYWdnZWRGaWxlcy5sZW5ndGg7XG4gICAgICB2YXIgaXNNdWx0aXBsZUFsbG93ZWQgPSBtdWx0aXBsZSB8fCBmaWxlc0NvdW50IDw9IDE7XG4gICAgICB2YXIgaXNEcmFnQWNjZXB0ID0gZmlsZXNDb3VudCA+IDAgJiYgKDAsIF91dGlscy5hbGxGaWxlc0FjY2VwdGVkKShkcmFnZ2VkRmlsZXMsIHRoaXMucHJvcHMuYWNjZXB0KTtcbiAgICAgIHZhciBpc0RyYWdSZWplY3QgPSBmaWxlc0NvdW50ID4gMCAmJiAoIWlzRHJhZ0FjY2VwdCB8fCAhaXNNdWx0aXBsZUFsbG93ZWQpO1xuICAgICAgdmFyIG5vU3R5bGVzID0gIWNsYXNzTmFtZSAmJiAhc3R5bGUgJiYgIWFjdGl2ZVN0eWxlICYmICFhY2NlcHRTdHlsZSAmJiAhcmVqZWN0U3R5bGUgJiYgIWRpc2FibGVkU3R5bGU7XG5cbiAgICAgIGlmIChpc0RyYWdBY3RpdmUgJiYgYWN0aXZlQ2xhc3NOYW1lKSB7XG4gICAgICAgIGNsYXNzTmFtZSArPSAnICcgKyBhY3RpdmVDbGFzc05hbWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNEcmFnQWNjZXB0ICYmIGFjY2VwdENsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc05hbWUgKz0gJyAnICsgYWNjZXB0Q2xhc3NOYW1lO1xuICAgICAgfVxuICAgICAgaWYgKGlzRHJhZ1JlamVjdCAmJiByZWplY3RDbGFzc05hbWUpIHtcbiAgICAgICAgY2xhc3NOYW1lICs9ICcgJyArIHJlamVjdENsYXNzTmFtZTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXNhYmxlZCAmJiBkaXNhYmxlZENsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc05hbWUgKz0gJyAnICsgZGlzYWJsZWRDbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChub1N0eWxlcykge1xuICAgICAgICBzdHlsZSA9IF9zdHlsZXMyLmRlZmF1bHQuZGVmYXVsdDtcbiAgICAgICAgYWN0aXZlU3R5bGUgPSBfc3R5bGVzMi5kZWZhdWx0LmFjdGl2ZTtcbiAgICAgICAgYWNjZXB0U3R5bGUgPSBfc3R5bGVzMi5kZWZhdWx0LmFjdGl2ZTtcbiAgICAgICAgcmVqZWN0U3R5bGUgPSBfc3R5bGVzMi5kZWZhdWx0LnJlamVjdGVkO1xuICAgICAgICBkaXNhYmxlZFN0eWxlID0gX3N0eWxlczIuZGVmYXVsdC5kaXNhYmxlZDtcbiAgICAgIH1cblxuICAgICAgdmFyIGFwcGxpZWRTdHlsZSA9IF9leHRlbmRzKHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfSwgc3R5bGUpO1xuICAgICAgaWYgKGFjdGl2ZVN0eWxlICYmIGlzRHJhZ0FjdGl2ZSkge1xuICAgICAgICBhcHBsaWVkU3R5bGUgPSBfZXh0ZW5kcyh7fSwgYXBwbGllZFN0eWxlLCBhY3RpdmVTdHlsZSk7XG4gICAgICB9XG4gICAgICBpZiAoYWNjZXB0U3R5bGUgJiYgaXNEcmFnQWNjZXB0KSB7XG4gICAgICAgIGFwcGxpZWRTdHlsZSA9IF9leHRlbmRzKHt9LCBhcHBsaWVkU3R5bGUsIGFjY2VwdFN0eWxlKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWplY3RTdHlsZSAmJiBpc0RyYWdSZWplY3QpIHtcbiAgICAgICAgYXBwbGllZFN0eWxlID0gX2V4dGVuZHMoe30sIGFwcGxpZWRTdHlsZSwgcmVqZWN0U3R5bGUpO1xuICAgICAgfVxuICAgICAgaWYgKGRpc2FibGVkU3R5bGUgJiYgZGlzYWJsZWQpIHtcbiAgICAgICAgYXBwbGllZFN0eWxlID0gX2V4dGVuZHMoe30sIGFwcGxpZWRTdHlsZSwgZGlzYWJsZWRTdHlsZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnB1dEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGFjY2VwdDogYWNjZXB0LFxuICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgICAgc3R5bGU6IF9leHRlbmRzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgb3BhY2l0eTogMC4wMDAwMSxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZSdcbiAgICAgICAgfSwgaW5wdXRQcm9wcy5zdHlsZSksXG4gICAgICAgIG11bHRpcGxlOiBfdXRpbHMuc3VwcG9ydE11bHRpcGxlICYmIG11bHRpcGxlLFxuICAgICAgICByZWY6IHRoaXMuc2V0UmVmcyxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25Ecm9wLFxuICAgICAgICBhdXRvQ29tcGxldGU6ICdvZmYnXG4gICAgICB9O1xuXG4gICAgICBpZiAobmFtZSAmJiBuYW1lLmxlbmd0aCkge1xuICAgICAgICBpbnB1dEF0dHJpYnV0ZXMubmFtZSA9IG5hbWU7XG4gICAgICB9XG5cbiAgICAgIC8vIERlc3RydWN0dXJlIGN1c3RvbSBwcm9wcyBhd2F5IGZyb20gcHJvcHMgdXNlZCBmb3IgdGhlIGRpdiBlbGVtZW50XG5cbiAgICAgIHZhciBhY2NlcHRlZEZpbGVzID0gcHJvcHMuYWNjZXB0ZWRGaWxlcyxcbiAgICAgICAgICBwcmV2ZW50RHJvcE9uRG9jdW1lbnQgPSBwcm9wcy5wcmV2ZW50RHJvcE9uRG9jdW1lbnQsXG4gICAgICAgICAgZGlzYWJsZVByZXZpZXcgPSBwcm9wcy5kaXNhYmxlUHJldmlldyxcbiAgICAgICAgICBkaXNhYmxlQ2xpY2sgPSBwcm9wcy5kaXNhYmxlQ2xpY2ssXG4gICAgICAgICAgb25Ecm9wQWNjZXB0ZWQgPSBwcm9wcy5vbkRyb3BBY2NlcHRlZCxcbiAgICAgICAgICBvbkRyb3BSZWplY3RlZCA9IHByb3BzLm9uRHJvcFJlamVjdGVkLFxuICAgICAgICAgIG9uRmlsZURpYWxvZ0NhbmNlbCA9IHByb3BzLm9uRmlsZURpYWxvZ0NhbmNlbCxcbiAgICAgICAgICBtYXhTaXplID0gcHJvcHMubWF4U2l6ZSxcbiAgICAgICAgICBtaW5TaXplID0gcHJvcHMubWluU2l6ZSxcbiAgICAgICAgICBkaXZQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgWydhY2NlcHRlZEZpbGVzJywgJ3ByZXZlbnREcm9wT25Eb2N1bWVudCcsICdkaXNhYmxlUHJldmlldycsICdkaXNhYmxlQ2xpY2snLCAnb25Ecm9wQWNjZXB0ZWQnLCAnb25Ecm9wUmVqZWN0ZWQnLCAnb25GaWxlRGlhbG9nQ2FuY2VsJywgJ21heFNpemUnLCAnbWluU2l6ZSddKTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgX2V4dGVuZHMoe1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIHN0eWxlOiBhcHBsaWVkU3R5bGVcbiAgICAgICAgfSwgZGl2UHJvcHMgLyogZXhwYW5kIHVzZXIgcHJvdmlkZWQgcHJvcHMgZmlyc3Qgc28gZXZlbnQgaGFuZGxlcnMgYXJlIG5ldmVyIG92ZXJyaWRkZW4gKi8sIHtcbiAgICAgICAgICBvbkNsaWNrOiB0aGlzLmNvbXBvc2VIYW5kbGVycyh0aGlzLm9uQ2xpY2spLFxuICAgICAgICAgIG9uRHJhZ1N0YXJ0OiB0aGlzLmNvbXBvc2VIYW5kbGVycyh0aGlzLm9uRHJhZ1N0YXJ0KSxcbiAgICAgICAgICBvbkRyYWdFbnRlcjogdGhpcy5jb21wb3NlSGFuZGxlcnModGhpcy5vbkRyYWdFbnRlciksXG4gICAgICAgICAgb25EcmFnT3ZlcjogdGhpcy5jb21wb3NlSGFuZGxlcnModGhpcy5vbkRyYWdPdmVyKSxcbiAgICAgICAgICBvbkRyYWdMZWF2ZTogdGhpcy5jb21wb3NlSGFuZGxlcnModGhpcy5vbkRyYWdMZWF2ZSksXG4gICAgICAgICAgb25Ecm9wOiB0aGlzLmNvbXBvc2VIYW5kbGVycyh0aGlzLm9uRHJvcCksXG4gICAgICAgICAgcmVmOiB0aGlzLnNldFJlZixcbiAgICAgICAgICAnYXJpYS1kaXNhYmxlZCc6IGRpc2FibGVkXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBpc0RyYWdBY3RpdmUsIGlzRHJhZ0FjY2VwdCwgaXNEcmFnUmVqZWN0KSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgX2V4dGVuZHMoe30sIGlucHV0UHJvcHMgLyogZXhwYW5kIHVzZXIgcHJvdmlkZWQgaW5wdXRQcm9wcyBmaXJzdCBzbyBpbnB1dEF0dHJpYnV0ZXMgb3ZlcnJpZGUgdGhlbSAqLywgaW5wdXRBdHRyaWJ1dGVzKSlcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIERyb3B6b25lO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJvcHpvbmU7XG5cblxuRHJvcHpvbmUucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogQWxsb3cgc3BlY2lmaWMgdHlwZXMgb2YgZmlsZXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vb2tvbmV0L2F0dHItYWNjZXB0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKiBLZWVwIGluIG1pbmQgdGhhdCBtaW1lIHR5cGUgZGV0ZXJtaW5hdGlvbiBpcyBub3QgcmVsaWFibGUgYWNyb3NzIHBsYXRmb3Jtcy4gQ1NWIGZpbGVzLFxuICAgKiBmb3IgZXhhbXBsZSwgYXJlIHJlcG9ydGVkIGFzIHRleHQvcGxhaW4gdW5kZXIgbWFjT1MgYnV0IGFzIGFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCB1bmRlclxuICAgKiBXaW5kb3dzLiBJbiBzb21lIGNhc2VzIHRoZXJlIG1pZ2h0IG5vdCBiZSBhIG1pbWUgdHlwZSBzZXQgYXQgYWxsLlxuICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdC1kcm9wem9uZS9yZWFjdC1kcm9wem9uZS9pc3N1ZXMvMjc2XG4gICAqL1xuICBhY2NlcHQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5hcnJheU9mKF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nKV0pLFxuXG4gIC8qKlxuICAgKiBDb250ZW50cyBvZiB0aGUgZHJvcHpvbmVcbiAgICovXG4gIGNoaWxkcmVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5ub2RlLCBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmNdKSxcblxuICAvKipcbiAgICogRGlzYWxsb3cgY2xpY2tpbmcgb24gdGhlIGRyb3B6b25lIGNvbnRhaW5lciB0byBvcGVuIGZpbGUgZGlhbG9nXG4gICAqL1xuICBkaXNhYmxlQ2xpY2s6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcblxuICAvKipcbiAgICogRW5hYmxlL2Rpc2FibGUgdGhlIGRyb3B6b25lIGVudGlyZWx5XG4gICAqL1xuICBkaXNhYmxlZDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuXG4gIC8qKlxuICAgKiBFbmFibGUvZGlzYWJsZSBwcmV2aWV3IGdlbmVyYXRpb25cbiAgICovXG4gIGRpc2FibGVQcmV2aWV3OiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG5cbiAgLyoqXG4gICAqIElmIGZhbHNlLCBhbGxvdyBkcm9wcGVkIGl0ZW1zIHRvIHRha2Ugb3ZlciB0aGUgY3VycmVudCBicm93c2VyIHdpbmRvd1xuICAgKi9cbiAgcHJldmVudERyb3BPbkRvY3VtZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG5cbiAgLyoqXG4gICAqIFBhc3MgYWRkaXRpb25hbCBhdHRyaWJ1dGVzIHRvIHRoZSBgPGlucHV0IHR5cGU9XCJmaWxlXCIvPmAgdGFnXG4gICAqL1xuICBpbnB1dFByb3BzOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcblxuICAvKipcbiAgICogQWxsb3cgZHJvcHBpbmcgbXVsdGlwbGUgZmlsZXNcbiAgICovXG4gIG11bHRpcGxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG5cbiAgLyoqXG4gICAqIGBuYW1lYCBhdHRyaWJ1dGUgZm9yIHRoZSBpbnB1dCB0YWdcbiAgICovXG4gIG5hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBNYXhpbXVtIGZpbGUgc2l6ZSAoaW4gYnl0ZXMpXG4gICAqL1xuICBtYXhTaXplOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlcixcblxuICAvKipcbiAgICogTWluaW11bSBmaWxlIHNpemUgKGluIGJ5dGVzKVxuICAgKi9cbiAgbWluU2l6ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsXG5cbiAgLyoqXG4gICAqIGNsYXNzTmFtZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcblxuICAvKipcbiAgICogY2xhc3NOYW1lIHRvIGFwcGx5IHdoZW4gZHJhZyBpcyBhY3RpdmVcbiAgICovXG4gIGFjdGl2ZUNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIGNsYXNzTmFtZSB0byBhcHBseSB3aGVuIGRyb3Agd2lsbCBiZSBhY2NlcHRlZFxuICAgKi9cbiAgYWNjZXB0Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcblxuICAvKipcbiAgICogY2xhc3NOYW1lIHRvIGFwcGx5IHdoZW4gZHJvcCB3aWxsIGJlIHJlamVjdGVkXG4gICAqL1xuICByZWplY3RDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBjbGFzc05hbWUgdG8gYXBwbHkgd2hlbiBkcm9wem9uZSBpcyBkaXNhYmxlZFxuICAgKi9cbiAgZGlzYWJsZWRDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBDU1Mgc3R5bGVzIHRvIGFwcGx5XG4gICAqL1xuICBzdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG5cbiAgLyoqXG4gICAqIENTUyBzdHlsZXMgdG8gYXBwbHkgd2hlbiBkcmFnIGlzIGFjdGl2ZVxuICAgKi9cbiAgYWN0aXZlU3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBDU1Mgc3R5bGVzIHRvIGFwcGx5IHdoZW4gZHJvcCB3aWxsIGJlIGFjY2VwdGVkXG4gICAqL1xuICBhY2NlcHRTdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG5cbiAgLyoqXG4gICAqIENTUyBzdHlsZXMgdG8gYXBwbHkgd2hlbiBkcm9wIHdpbGwgYmUgcmVqZWN0ZWRcbiAgICovXG4gIHJlamVjdFN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcblxuICAvKipcbiAgICogQ1NTIHN0eWxlcyB0byBhcHBseSB3aGVuIGRyb3B6b25lIGlzIGRpc2FibGVkXG4gICAqL1xuICBkaXNhYmxlZFN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcblxuICAvKipcbiAgICogb25DbGljayBjYWxsYmFja1xuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgKi9cbiAgb25DbGljazogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyb3AgY2FsbGJhY2tcbiAgICovXG4gIG9uRHJvcDogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyb3BBY2NlcHRlZCBjYWxsYmFja1xuICAgKi9cbiAgb25Ecm9wQWNjZXB0ZWQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcblxuICAvKipcbiAgICogb25Ecm9wUmVqZWN0ZWQgY2FsbGJhY2tcbiAgICovXG4gIG9uRHJvcFJlamVjdGVkOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG5cbiAgLyoqXG4gICAqIG9uRHJhZ1N0YXJ0IGNhbGxiYWNrXG4gICAqL1xuICBvbkRyYWdTdGFydDogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyYWdFbnRlciBjYWxsYmFja1xuICAgKi9cbiAgb25EcmFnRW50ZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcblxuICAvKipcbiAgICogb25EcmFnT3ZlciBjYWxsYmFja1xuICAgKi9cbiAgb25EcmFnT3ZlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyYWdMZWF2ZSBjYWxsYmFja1xuICAgKi9cbiAgb25EcmFnTGVhdmU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcblxuICAvKipcbiAgICogUHJvdmlkZSBhIGNhbGxiYWNrIG9uIGNsaWNraW5nIHRoZSBjYW5jZWwgYnV0dG9uIG9mIHRoZSBmaWxlIGRpYWxvZ1xuICAgKi9cbiAgb25GaWxlRGlhbG9nQ2FuY2VsOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmNcbn07XG5cbkRyb3B6b25lLmRlZmF1bHRQcm9wcyA9IHtcbiAgcHJldmVudERyb3BPbkRvY3VtZW50OiB0cnVlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIGRpc2FibGVQcmV2aWV3OiBmYWxzZSxcbiAgZGlzYWJsZUNsaWNrOiBmYWxzZSxcbiAgaW5wdXRQcm9wczoge30sXG4gIG11bHRpcGxlOiB0cnVlLFxuICBtYXhTaXplOiBJbmZpbml0eSxcbiAgbWluU2l6ZTogMFxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zdXBwb3J0TXVsdGlwbGUgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmdldERhdGFUcmFuc2Zlckl0ZW1zID0gZ2V0RGF0YVRyYW5zZmVySXRlbXM7XG5leHBvcnRzLmZpbGVBY2NlcHRlZCA9IGZpbGVBY2NlcHRlZDtcbmV4cG9ydHMuZmlsZU1hdGNoU2l6ZSA9IGZpbGVNYXRjaFNpemU7XG5leHBvcnRzLmFsbEZpbGVzQWNjZXB0ZWQgPSBhbGxGaWxlc0FjY2VwdGVkO1xuZXhwb3J0cy5vbkRvY3VtZW50RHJhZ092ZXIgPSBvbkRvY3VtZW50RHJhZ092ZXI7XG5leHBvcnRzLmlzSWVPckVkZ2UgPSBpc0llT3JFZGdlO1xuXG52YXIgX2F0dHJBY2NlcHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2F0dHJBY2NlcHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXR0ckFjY2VwdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdXBwb3J0TXVsdGlwbGUgPSBleHBvcnRzLnN1cHBvcnRNdWx0aXBsZSA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCA/ICdtdWx0aXBsZScgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSA6IHRydWU7XG5cbmZ1bmN0aW9uIGdldERhdGFUcmFuc2Zlckl0ZW1zKGV2ZW50KSB7XG4gIHZhciBkYXRhVHJhbnNmZXJJdGVtc0xpc3QgPSBbXTtcbiAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgIHZhciBkdCA9IGV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICBpZiAoZHQuZmlsZXMgJiYgZHQuZmlsZXMubGVuZ3RoKSB7XG4gICAgICBkYXRhVHJhbnNmZXJJdGVtc0xpc3QgPSBkdC5maWxlcztcbiAgICB9IGVsc2UgaWYgKGR0Lml0ZW1zICYmIGR0Lml0ZW1zLmxlbmd0aCkge1xuICAgICAgLy8gRHVyaW5nIHRoZSBkcmFnIGV2ZW4gdGhlIGRhdGFUcmFuc2Zlci5maWxlcyBpcyBudWxsXG4gICAgICAvLyBidXQgQ2hyb21lIGltcGxlbWVudHMgc29tZSBkcmFnIHN0b3JlLCB3aGljaCBpcyBhY2Nlc2libGUgdmlhIGRhdGFUcmFuc2Zlci5pdGVtc1xuICAgICAgZGF0YVRyYW5zZmVySXRlbXNMaXN0ID0gZHQuaXRlbXM7XG4gICAgfVxuICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuZmlsZXMpIHtcbiAgICBkYXRhVHJhbnNmZXJJdGVtc0xpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gIH1cbiAgLy8gQ29udmVydCBmcm9tIERhdGFUcmFuc2Zlckl0ZW1zTGlzdCB0byB0aGUgbmF0aXZlIEFycmF5XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhVHJhbnNmZXJJdGVtc0xpc3QpO1xufVxuXG4vLyBGaXJlZm94IHZlcnNpb25zIHByaW9yIHRvIDUzIHJldHVybiBhIGJvZ3VzIE1JTUUgdHlwZSBmb3IgZXZlcnkgZmlsZSBkcmFnLCBzbyBkcmFnb3ZlcnMgd2l0aFxuLy8gdGhhdCBNSU1FIHR5cGUgd2lsbCBhbHdheXMgYmUgYWNjZXB0ZWRcbmZ1bmN0aW9uIGZpbGVBY2NlcHRlZChmaWxlLCBhY2NlcHQpIHtcbiAgcmV0dXJuIGZpbGUudHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3gtbW96LWZpbGUnIHx8ICgwLCBfYXR0ckFjY2VwdDIuZGVmYXVsdCkoZmlsZSwgYWNjZXB0KTtcbn1cblxuZnVuY3Rpb24gZmlsZU1hdGNoU2l6ZShmaWxlLCBtYXhTaXplLCBtaW5TaXplKSB7XG4gIHJldHVybiBmaWxlLnNpemUgPD0gbWF4U2l6ZSAmJiBmaWxlLnNpemUgPj0gbWluU2l6ZTtcbn1cblxuZnVuY3Rpb24gYWxsRmlsZXNBY2NlcHRlZChmaWxlcywgYWNjZXB0KSB7XG4gIHJldHVybiBmaWxlcy5ldmVyeShmdW5jdGlvbiAoZmlsZSkge1xuICAgIHJldHVybiBmaWxlQWNjZXB0ZWQoZmlsZSwgYWNjZXB0KTtcbiAgfSk7XG59XG5cbi8vIGFsbG93IHRoZSBlbnRpcmUgZG9jdW1lbnQgdG8gYmUgYSBkcmFnIHRhcmdldFxuZnVuY3Rpb24gb25Eb2N1bWVudERyYWdPdmVyKGV2dCkge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaXNJZSh1c2VyQWdlbnQpIHtcbiAgcmV0dXJuIHVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgIT09IC0xIHx8IHVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gaXNFZGdlKHVzZXJBZ2VudCkge1xuICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YoJ0VkZ2UvJykgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBpc0llT3JFZGdlKCkge1xuICB2YXIgdXNlckFnZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICByZXR1cm4gaXNJZSh1c2VyQWdlbnQpIHx8IGlzRWRnZSh1c2VyQWdlbnQpO1xufVxuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gbihlKXtpZihyW2VdKXJldHVybiByW2VdLmV4cG9ydHM7dmFyIG89cltlXT17ZXhwb3J0czp7fSxpZDplLGxvYWRlZDohMX07cmV0dXJuIHRbZV0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsbiksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciByPXt9O3JldHVybiBuLm09dCxuLmM9cixuLnA9XCJcIixuKDApfShbZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO24uX19lc01vZHVsZT0hMCxyKDgpLHIoOSksbltcImRlZmF1bHRcIl09ZnVuY3Rpb24odCxuKXtpZih0JiZuKXt2YXIgcj1mdW5jdGlvbigpe3ZhciByPUFycmF5LmlzQXJyYXkobik/bjpuLnNwbGl0KFwiLFwiKSxlPXQubmFtZXx8XCJcIixvPXQudHlwZXx8XCJcIixpPW8ucmVwbGFjZSgvXFwvLiokLyxcIlwiKTtyZXR1cm57djpyLnNvbWUoZnVuY3Rpb24odCl7dmFyIG49dC50cmltKCk7cmV0dXJuXCIuXCI9PT1uLmNoYXJBdCgwKT9lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgobi50b0xvd2VyQ2FzZSgpKTovXFwvXFwqJC8udGVzdChuKT9pPT09bi5yZXBsYWNlKC9cXC8uKiQvLFwiXCIpOm89PT1ufSl9fSgpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXJldHVybiByLnZ9cmV0dXJuITB9LHQuZXhwb3J0cz1uW1wiZGVmYXVsdFwiXX0sZnVuY3Rpb24odCxuKXt2YXIgcj10LmV4cG9ydHM9e3ZlcnNpb246XCIxLjIuMlwifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPXIpfSxmdW5jdGlvbih0LG4pe3ZhciByPXQuZXhwb3J0cz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuTWF0aD09TWF0aD93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGYuTWF0aD09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcIm51bWJlclwiPT10eXBlb2YgX19nJiYoX19nPXIpfSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigyKSxvPXIoMSksaT1yKDQpLHU9cigxOSksYz1cInByb3RvdHlwZVwiLGY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyl9fSxzPWZ1bmN0aW9uKHQsbixyKXt2YXIgYSxwLGwseSxkPXQmcy5HLGg9dCZzLlAsdj1kP2U6dCZzLlM/ZVtuXXx8KGVbbl09e30pOihlW25dfHx7fSlbY10seD1kP286b1tuXXx8KG9bbl09e30pO2QmJihyPW4pO2ZvcihhIGluIHIpcD0hKHQmcy5GKSYmdiYmYSBpbiB2LGw9KHA/djpyKVthXSx5PXQmcy5CJiZwP2YobCxlKTpoJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBsP2YoRnVuY3Rpb24uY2FsbCxsKTpsLHYmJiFwJiZ1KHYsYSxsKSx4W2FdIT1sJiZpKHgsYSx5KSxoJiYoKHhbY118fCh4W2NdPXt9KSlbYV09bCl9O2UuY29yZT1vLHMuRj0xLHMuRz0yLHMuUz00LHMuUD04LHMuQj0xNixzLlc9MzIsdC5leHBvcnRzPXN9LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDUpLG89cigxOCk7dC5leHBvcnRzPXIoMjIpP2Z1bmN0aW9uKHQsbixyKXtyZXR1cm4gZS5zZXREZXNjKHQsbixvKDEscikpfTpmdW5jdGlvbih0LG4scil7cmV0dXJuIHRbbl09cix0fX0sZnVuY3Rpb24odCxuKXt2YXIgcj1PYmplY3Q7dC5leHBvcnRzPXtjcmVhdGU6ci5jcmVhdGUsZ2V0UHJvdG86ci5nZXRQcm90b3R5cGVPZixpc0VudW06e30ucHJvcGVydHlJc0VudW1lcmFibGUsZ2V0RGVzYzpyLmdldE93blByb3BlcnR5RGVzY3JpcHRvcixzZXREZXNjOnIuZGVmaW5lUHJvcGVydHksc2V0RGVzY3M6ci5kZWZpbmVQcm9wZXJ0aWVzLGdldEtleXM6ci5rZXlzLGdldE5hbWVzOnIuZ2V0T3duUHJvcGVydHlOYW1lcyxnZXRTeW1ib2xzOnIuZ2V0T3duUHJvcGVydHlTeW1ib2xzLGVhY2g6W10uZm9yRWFjaH19LGZ1bmN0aW9uKHQsbil7dmFyIHI9MCxlPU1hdGgucmFuZG9tKCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwiU3ltYm9sKFwiLmNvbmNhdCh2b2lkIDA9PT10P1wiXCI6dCxcIilfXCIsKCsrcitlKS50b1N0cmluZygzNikpfX0sZnVuY3Rpb24odCxuLHIpe3ZhciBlPXIoMjApKFwid2tzXCIpLG89cigyKS5TeW1ib2w7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBlW3RdfHwoZVt0XT1vJiZvW3RdfHwob3x8cig2KSkoXCJTeW1ib2wuXCIrdCkpfX0sZnVuY3Rpb24odCxuLHIpe3IoMjYpLHQuZXhwb3J0cz1yKDEpLkFycmF5LnNvbWV9LGZ1bmN0aW9uKHQsbixyKXtyKDI1KSx0LmV4cG9ydHM9cigxKS5TdHJpbmcuZW5kc1dpdGh9LGZ1bmN0aW9uKHQsbil7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxuKXt2YXIgcj17fS50b1N0cmluZzt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHIuY2FsbCh0KS5zbGljZSg4LC0xKX19LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDEwKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxuLHIpe2lmKGUodCksdm9pZCAwPT09bilyZXR1cm4gdDtzd2l0Y2gocil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gdC5jYWxsKG4scil9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24ocixlKXtyZXR1cm4gdC5jYWxsKG4scixlKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihyLGUsbyl7cmV0dXJuIHQuY2FsbChuLHIsZSxvKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpfX19LGZ1bmN0aW9uKHQsbil7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKHZvaWQgMD09dCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIrdCk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LG4scil7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBuPS8uLzt0cnl7XCIvLi9cIlt0XShuKX1jYXRjaChlKXt0cnl7cmV0dXJuIG5bcig3KShcIm1hdGNoXCIpXT0hMSwhXCIvLi9cIlt0XShuKX1jYXRjaChvKXt9fXJldHVybiEwfX0sZnVuY3Rpb24odCxuKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dHJ5e3JldHVybiEhdCgpfWNhdGNoKG4pe3JldHVybiEwfX19LGZ1bmN0aW9uKHQsbil7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigxNiksbz1yKDExKSxpPXIoNykoXCJtYXRjaFwiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIGUodCkmJih2b2lkIDAhPT0obj10W2ldKT8hIW46XCJSZWdFeHBcIj09byh0KSl9fSxmdW5jdGlvbih0LG4pe3QuZXhwb3J0cz1mdW5jdGlvbih0LG4pe3JldHVybntlbnVtZXJhYmxlOiEoMSZ0KSxjb25maWd1cmFibGU6ISgyJnQpLHdyaXRhYmxlOiEoNCZ0KSx2YWx1ZTpufX19LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDIpLG89cig0KSxpPXIoNikoXCJzcmNcIiksdT1cInRvU3RyaW5nXCIsYz1GdW5jdGlvblt1XSxmPShcIlwiK2MpLnNwbGl0KHUpO3IoMSkuaW5zcGVjdFNvdXJjZT1mdW5jdGlvbih0KXtyZXR1cm4gYy5jYWxsKHQpfSwodC5leHBvcnRzPWZ1bmN0aW9uKHQsbixyLHUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIHImJihvKHIsaSx0W25dP1wiXCIrdFtuXTpmLmpvaW4oU3RyaW5nKG4pKSksXCJuYW1lXCJpbiByfHwoci5uYW1lPW4pKSx0PT09ZT90W25dPXI6KHV8fGRlbGV0ZSB0W25dLG8odCxuLHIpKX0pKEZ1bmN0aW9uLnByb3RvdHlwZSx1LGZ1bmN0aW9uKCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcyYmdGhpc1tpXXx8Yy5jYWxsKHRoaXMpfSl9LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDIpLG89XCJfX2NvcmUtanNfc2hhcmVkX19cIixpPWVbb118fChlW29dPXt9KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlbdF18fChpW3RdPXt9KX19LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDE3KSxvPXIoMTMpO3QuZXhwb3J0cz1mdW5jdGlvbih0LG4scil7aWYoZShuKSl0aHJvdyBUeXBlRXJyb3IoXCJTdHJpbmcjXCIrcitcIiBkb2Vzbid0IGFjY2VwdCByZWdleCFcIik7cmV0dXJuIFN0cmluZyhvKHQpKX19LGZ1bmN0aW9uKHQsbixyKXt0LmV4cG9ydHM9IXIoMTUpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LG4pe3ZhciByPU1hdGguY2VpbCxlPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/ZTpyKSh0KX19LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDIzKSxvPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gdD4wP28oZSh0KSw5MDA3MTk5MjU0NzQwOTkxKTowfX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3ZhciBlPXIoMyksbz1yKDI0KSxpPXIoMjEpLHU9XCJlbmRzV2l0aFwiLGM9XCJcIlt1XTtlKGUuUCtlLkYqcigxNCkodSksXCJTdHJpbmdcIix7ZW5kc1dpdGg6ZnVuY3Rpb24odCl7dmFyIG49aSh0aGlzLHQsdSkscj1hcmd1bWVudHMsZT1yLmxlbmd0aD4xP3JbMV06dm9pZCAwLGY9byhuLmxlbmd0aCkscz12b2lkIDA9PT1lP2Y6TWF0aC5taW4obyhlKSxmKSxhPVN0cmluZyh0KTtyZXR1cm4gYz9jLmNhbGwobixhLHMpOm4uc2xpY2Uocy1hLmxlbmd0aCxzKT09PWF9fSl9LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDUpLG89cigzKSxpPXIoMSkuQXJyYXl8fEFycmF5LHU9e30sYz1mdW5jdGlvbih0LG4pe2UuZWFjaC5jYWxsKHQuc3BsaXQoXCIsXCIpLGZ1bmN0aW9uKHQpe3ZvaWQgMD09biYmdCBpbiBpP3VbdF09aVt0XTp0IGluW10mJih1W3RdPXIoMTIpKEZ1bmN0aW9uLmNhbGwsW11bdF0sbikpfSl9O2MoXCJwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzXCIsMSksYyhcImluZGV4T2YsZXZlcnksc29tZSxmb3JFYWNoLG1hcCxmaWx0ZXIsZmluZCxmaW5kSW5kZXgsaW5jbHVkZXNcIiwzKSxjKFwiam9pbixzbGljZSxjb25jYXQscHVzaCxzcGxpY2UsdW5zaGlmdCxzb3J0LGxhc3RJbmRleE9mLHJlZHVjZSxyZWR1Y2VSaWdodCxjb3B5V2l0aGluLGZpbGxcIiksbyhvLlMsXCJBcnJheVwiLHUpfV0pO1xuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcmVqZWN0ZWQ6IHtcbiAgICBib3JkZXJTdHlsZTogJ3NvbGlkJyxcbiAgICBib3JkZXJDb2xvcjogJyNjNjYnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnXG4gIH0sXG4gIGRpc2FibGVkOiB7XG4gICAgb3BhY2l0eTogMC41XG4gIH0sXG4gIGFjdGl2ZToge1xuICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxuICAgIGJvcmRlckNvbG9yOiAnIzZjNicsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnI2VlZSdcbiAgfSxcbiAgZGVmYXVsdDoge1xuICAgIHdpZHRoOiAyMDAsXG4gICAgaGVpZ2h0OiAyMDAsXG4gICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgYm9yZGVyQ29sb3I6ICcjNjY2JyxcbiAgICBib3JkZXJTdHlsZTogJ2Rhc2hlZCcsXG4gICAgYm9yZGVyUmFkaXVzOiA1XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGluZGV4LmpzIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2E5N2IxMjI2ZjQyMTFkODU5MGYiLCIvKiBlc2xpbnQgcHJlZmVyLXRlbXBsYXRlOiAwICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7XG4gIHN1cHBvcnRNdWx0aXBsZSxcbiAgZmlsZUFjY2VwdGVkLFxuICBhbGxGaWxlc0FjY2VwdGVkLFxuICBmaWxlTWF0Y2hTaXplLFxuICBvbkRvY3VtZW50RHJhZ092ZXIsXG4gIGdldERhdGFUcmFuc2Zlckl0ZW1zLFxuICBpc0llT3JFZGdlXG59IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vdXRpbHMvc3R5bGVzJ1xuXG5jbGFzcyBEcm9wem9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXG4gICAgdGhpcy5jb21wb3NlSGFuZGxlcnMgPSB0aGlzLmNvbXBvc2VIYW5kbGVycy5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRG9jdW1lbnREcm9wID0gdGhpcy5vbkRvY3VtZW50RHJvcC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkRyYWdFbnRlciA9IHRoaXMub25EcmFnRW50ZXIuYmluZCh0aGlzKVxuICAgIHRoaXMub25EcmFnTGVhdmUgPSB0aGlzLm9uRHJhZ0xlYXZlLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRHJhZ092ZXIgPSB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKVxuICAgIHRoaXMub25EcmFnU3RhcnQgPSB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcylcbiAgICB0aGlzLm9uRHJvcCA9IHRoaXMub25Ecm9wLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRmlsZURpYWxvZ0NhbmNlbCA9IHRoaXMub25GaWxlRGlhbG9nQ2FuY2VsLmJpbmQodGhpcylcbiAgICB0aGlzLm9uSW5wdXRFbGVtZW50Q2xpY2sgPSB0aGlzLm9uSW5wdXRFbGVtZW50Q2xpY2suYmluZCh0aGlzKVxuXG4gICAgdGhpcy5zZXRSZWYgPSB0aGlzLnNldFJlZi5iaW5kKHRoaXMpXG4gICAgdGhpcy5zZXRSZWZzID0gdGhpcy5zZXRSZWZzLmJpbmQodGhpcylcblxuICAgIHRoaXMuaXNGaWxlRGlhbG9nQWN0aXZlID0gZmFsc2VcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnZ2VkRmlsZXM6IFtdLFxuICAgICAgYWNjZXB0ZWRGaWxlczogW10sXG4gICAgICByZWplY3RlZEZpbGVzOiBbXVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcHJldmVudERyb3BPbkRvY3VtZW50IH0gPSB0aGlzLnByb3BzXG4gICAgdGhpcy5kcmFnVGFyZ2V0cyA9IFtdXG5cbiAgICBpZiAocHJldmVudERyb3BPbkRvY3VtZW50KSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIG9uRG9jdW1lbnREcmFnT3ZlciwgZmFsc2UpXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5vbkRvY3VtZW50RHJvcCwgZmFsc2UpXG4gICAgfVxuICAgIHRoaXMuZmlsZUlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSW5wdXRFbGVtZW50Q2xpY2ssIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25GaWxlRGlhbG9nQ2FuY2VsLCBmYWxzZSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNvbnN0IHsgcHJldmVudERyb3BPbkRvY3VtZW50IH0gPSB0aGlzLnByb3BzXG4gICAgaWYgKHByZXZlbnREcm9wT25Eb2N1bWVudCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBvbkRvY3VtZW50RHJhZ092ZXIpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5vbkRvY3VtZW50RHJvcClcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsZUlucHV0RWwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5maWxlSW5wdXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25JbnB1dEVsZW1lbnRDbGljaywgZmFsc2UpXG4gICAgfVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25GaWxlRGlhbG9nQ2FuY2VsLCBmYWxzZSlcbiAgfVxuXG4gIGNvbXBvc2VIYW5kbGVycyhoYW5kbGVyKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIGhhbmRsZXJcbiAgfVxuXG4gIG9uRG9jdW1lbnREcm9wKGV2dCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmNvbnRhaW5zKGV2dC50YXJnZXQpKSB7XG4gICAgICAvLyBpZiB3ZSBpbnRlcmNlcHRlZCBhbiBldmVudCBmb3Igb3VyIGluc3RhbmNlLCBsZXQgaXQgcHJvcGFnYXRlIGRvd24gdG8gdGhlIGluc3RhbmNlJ3Mgb25Ecm9wIGhhbmRsZXJcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMuZHJhZ1RhcmdldHMgPSBbXVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZ0KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25EcmFnU3RhcnQpIHtcbiAgICAgIHRoaXMucHJvcHMub25EcmFnU3RhcnQuY2FsbCh0aGlzLCBldnQpXG4gICAgfVxuICB9XG5cbiAgb25EcmFnRW50ZXIoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KClcblxuICAgIC8vIENvdW50IHRoZSBkcm9wem9uZSBhbmQgYW55IGNoaWxkcmVuIHRoYXQgYXJlIGVudGVyZWQuXG4gICAgaWYgKHRoaXMuZHJhZ1RhcmdldHMuaW5kZXhPZihldnQudGFyZ2V0KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuZHJhZ1RhcmdldHMucHVzaChldnQudGFyZ2V0KVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNEcmFnQWN0aXZlOiB0cnVlLCAvLyBEbyBub3QgcmVseSBvbiBmaWxlcyBmb3IgdGhlIGRyYWcgc3RhdGUuIEl0IGRvZXNuJ3Qgd29yayBpbiBTYWZhcmkuXG4gICAgICBkcmFnZ2VkRmlsZXM6IGdldERhdGFUcmFuc2Zlckl0ZW1zKGV2dClcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25EcmFnRW50ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EcmFnRW50ZXIuY2FsbCh0aGlzLCBldnQpXG4gICAgfVxuICB9XG5cbiAgb25EcmFnT3ZlcihldnQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgZmlsZSBkaWFsb2cgb24gQ2hyb21lIGFsbG93cyB1c2VycyB0byBkcmFnIGZpbGVzIGZyb20gdGhlIGRpYWxvZyBvbnRvXG4gICAgICAvLyB0aGUgZHJvcHpvbmUsIGNhdXNpbmcgdGhlIGJyb3dzZXIgdGhlIGNyYXNoIHdoZW4gdGhlIGZpbGUgZGlhbG9nIGlzIGNsb3NlZC5cbiAgICAgIC8vIEEgZHJvcCBlZmZlY3Qgb2YgJ25vbmUnIHByZXZlbnRzIHRoZSBmaWxlIGZyb20gYmVpbmcgZHJvcHBlZFxuICAgICAgZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gdGhpcy5pc0ZpbGVEaWFsb2dBY3RpdmUgPyAnbm9uZScgOiAnY29weScgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gY29udGludWUgcmVnYXJkbGVzcyBvZiBlcnJvclxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9uRHJhZ092ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25EcmFnT3Zlci5jYWxsKHRoaXMsIGV2dClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBvbkRyYWdMZWF2ZShldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgLy8gT25seSBkZWFjdGl2YXRlIG9uY2UgdGhlIGRyb3B6b25lIGFuZCBhbGwgY2hpbGRyZW4gaGF2ZSBiZWVuIGxlZnQuXG4gICAgdGhpcy5kcmFnVGFyZ2V0cyA9IHRoaXMuZHJhZ1RhcmdldHMuZmlsdGVyKGVsID0+IGVsICE9PSBldnQudGFyZ2V0ICYmIHRoaXMubm9kZS5jb250YWlucyhlbCkpXG4gICAgaWYgKHRoaXMuZHJhZ1RhcmdldHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgZHJhZ2dpbmcgZmlsZXMgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRHJhZ0FjdGl2ZTogZmFsc2UsXG4gICAgICBkcmFnZ2VkRmlsZXM6IFtdXG4gICAgfSlcblxuICAgIGlmICh0aGlzLnByb3BzLm9uRHJhZ0xlYXZlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRHJhZ0xlYXZlLmNhbGwodGhpcywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIG9uRHJvcChldnQpIHtcbiAgICBjb25zdCB7IG9uRHJvcCwgb25Ecm9wQWNjZXB0ZWQsIG9uRHJvcFJlamVjdGVkLCBtdWx0aXBsZSwgZGlzYWJsZVByZXZpZXcsIGFjY2VwdCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gZ2V0RGF0YVRyYW5zZmVySXRlbXMoZXZ0KVxuICAgIGNvbnN0IGFjY2VwdGVkRmlsZXMgPSBbXVxuICAgIGNvbnN0IHJlamVjdGVkRmlsZXMgPSBbXVxuXG4gICAgLy8gU3RvcCBkZWZhdWx0IGJyb3dzZXIgYmVoYXZpb3JcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgLy8gUmVzZXQgdGhlIGNvdW50ZXIgYWxvbmcgd2l0aCB0aGUgZHJhZyBvbiBhIGRyb3AuXG4gICAgdGhpcy5kcmFnVGFyZ2V0cyA9IFtdXG4gICAgdGhpcy5pc0ZpbGVEaWFsb2dBY3RpdmUgPSBmYWxzZVxuXG4gICAgZmlsZUxpc3QuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGlmICghZGlzYWJsZVByZXZpZXcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaWxlLnByZXZpZXcgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZ2VuZXJhdGUgcHJldmlldyBmb3IgZmlsZScsIGZpbGUsIGVycikgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZmlsZUFjY2VwdGVkKGZpbGUsIGFjY2VwdCkgJiZcbiAgICAgICAgZmlsZU1hdGNoU2l6ZShmaWxlLCB0aGlzLnByb3BzLm1heFNpemUsIHRoaXMucHJvcHMubWluU2l6ZSlcbiAgICAgICkge1xuICAgICAgICBhY2NlcHRlZEZpbGVzLnB1c2goZmlsZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdGVkRmlsZXMucHVzaChmaWxlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIW11bHRpcGxlKSB7XG4gICAgICAvLyBpZiBub3QgaW4gbXVsdGkgbW9kZSBhZGQgYW55IGV4dHJhIGFjY2VwdGVkIGZpbGVzIHRvIHJlamVjdGVkLlxuICAgICAgLy8gVGhpcyB3aWxsIGFsbG93IGVuZCB1c2VycyB0byBlYXNpbHkgaWdub3JlIGEgbXVsdGkgZmlsZSBkcm9wIGluIFwic2luZ2xlXCIgbW9kZS5cbiAgICAgIHJlamVjdGVkRmlsZXMucHVzaCguLi5hY2NlcHRlZEZpbGVzLnNwbGljZSgxKSlcbiAgICB9XG5cbiAgICBpZiAob25Ecm9wKSB7XG4gICAgICBvbkRyb3AuY2FsbCh0aGlzLCBhY2NlcHRlZEZpbGVzLCByZWplY3RlZEZpbGVzLCBldnQpXG4gICAgfVxuXG4gICAgaWYgKHJlamVjdGVkRmlsZXMubGVuZ3RoID4gMCAmJiBvbkRyb3BSZWplY3RlZCkge1xuICAgICAgb25Ecm9wUmVqZWN0ZWQuY2FsbCh0aGlzLCByZWplY3RlZEZpbGVzLCBldnQpXG4gICAgfVxuXG4gICAgaWYgKGFjY2VwdGVkRmlsZXMubGVuZ3RoID4gMCAmJiBvbkRyb3BBY2NlcHRlZCkge1xuICAgICAgb25Ecm9wQWNjZXB0ZWQuY2FsbCh0aGlzLCBhY2NlcHRlZEZpbGVzLCBldnQpXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgZmlsZXMgdmFsdWVcbiAgICB0aGlzLmRyYWdnZWRGaWxlcyA9IG51bGxcblxuICAgIC8vIFJlc2V0IGRyYWcgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRHJhZ0FjdGl2ZTogZmFsc2UsXG4gICAgICBkcmFnZ2VkRmlsZXM6IFtdLFxuICAgICAgYWNjZXB0ZWRGaWxlcyxcbiAgICAgIHJlamVjdGVkRmlsZXNcbiAgICB9KVxuICB9XG5cbiAgb25DbGljayhldnQpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2ssIGRpc2FibGVDbGljayB9ID0gdGhpcy5wcm9wc1xuICAgIGlmICghZGlzYWJsZUNsaWNrKSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgb25DbGljay5jYWxsKHRoaXMsIGV2dClcbiAgICAgIH1cblxuICAgICAgLy8gaW4gSUUxMS9FZGdlIHRoZSBmaWxlLWJyb3dzZXIgZGlhbG9nIGlzIGJsb2NraW5nLCBlbnN1cmUgdGhpcyBpcyBiZWhpbmQgc2V0VGltZW91dFxuICAgICAgLy8gdGhpcyBpcyBzbyByZWFjdCBjYW4gaGFuZGxlIHN0YXRlIGNoYW5nZXMgaW4gdGhlIG9uQ2xpY2sgcHJvcCBhYm92ZSBhYm92ZVxuICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3QtZHJvcHpvbmUvcmVhY3QtZHJvcHpvbmUvaXNzdWVzLzQ1MFxuICAgICAgaWYgKGlzSWVPckVkZ2UoKSkge1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMub3Blbi5iaW5kKHRoaXMpLCAwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbklucHV0RWxlbWVudENsaWNrKGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGlmICh0aGlzLnByb3BzLmlucHV0UHJvcHMgJiYgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNsaWNrKClcbiAgICB9XG4gIH1cblxuICBvbkZpbGVEaWFsb2dDYW5jZWwoKSB7XG4gICAgLy8gdGltZW91dCB3aWxsIG5vdCByZWNvZ25pemUgY29udGV4dCBvZiB0aGlzIG1ldGhvZFxuICAgIGNvbnN0IHsgb25GaWxlRGlhbG9nQ2FuY2VsIH0gPSB0aGlzLnByb3BzXG4gICAgLy8gZXhlY3V0ZSB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBGaWxlRGlhbG9nIGlzIG9wZW5lZCBpbiB0aGUgYnJvd3NlclxuICAgIGlmICh0aGlzLmlzRmlsZURpYWxvZ0FjdGl2ZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVJbnB1dEVsICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBSZXR1cm5zIGFuIG9iamVjdCBhcyBGaWxlTGlzdFxuICAgICAgICAgIGNvbnN0IHsgZmlsZXMgfSA9IHRoaXMuZmlsZUlucHV0RWxcblxuICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmlzRmlsZURpYWxvZ0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbkZpbGVEaWFsb2dDYW5jZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBvbkZpbGVEaWFsb2dDYW5jZWwoKVxuICAgICAgICB9XG4gICAgICB9LCAzMDApXG4gICAgfVxuICB9XG5cbiAgc2V0UmVmKHJlZikge1xuICAgIHRoaXMubm9kZSA9IHJlZlxuICB9XG5cbiAgc2V0UmVmcyhyZWYpIHtcbiAgICB0aGlzLmZpbGVJbnB1dEVsID0gcmVmXG4gIH1cbiAgLyoqXG4gICAqIE9wZW4gc3lzdGVtIGZpbGUgdXBsb2FkIGRpYWxvZy5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgb3BlbigpIHtcbiAgICB0aGlzLmlzRmlsZURpYWxvZ0FjdGl2ZSA9IHRydWVcbiAgICB0aGlzLmZpbGVJbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIHRoaXMuZmlsZUlucHV0RWwuY2xpY2soKVxuICB9XG5cbiAgcmVuZGVyQ2hpbGRyZW4gPSAoY2hpbGRyZW4sIGlzRHJhZ0FjdGl2ZSwgaXNEcmFnQWNjZXB0LCBpc0RyYWdSZWplY3QpID0+IHtcbiAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICBpc0RyYWdBY3RpdmUsXG4gICAgICAgIGlzRHJhZ0FjY2VwdCxcbiAgICAgICAgaXNEcmFnUmVqZWN0XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBhY2NlcHQsXG4gICAgICBhY2NlcHRDbGFzc05hbWUsXG4gICAgICBhY3RpdmVDbGFzc05hbWUsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGRpc2FibGVkLFxuICAgICAgZGlzYWJsZWRDbGFzc05hbWUsXG4gICAgICBpbnB1dFByb3BzLFxuICAgICAgbXVsdGlwbGUsXG4gICAgICBuYW1lLFxuICAgICAgcmVqZWN0Q2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICBsZXQge1xuICAgICAgYWNjZXB0U3R5bGUsXG4gICAgICBhY3RpdmVTdHlsZSxcbiAgICAgIGNsYXNzTmFtZSA9ICcnLFxuICAgICAgZGlzYWJsZWRTdHlsZSxcbiAgICAgIHJlamVjdFN0eWxlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5wcm9wcyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdFxuICAgIH0gPSByZXN0XG5cbiAgICBjb25zdCB7IGlzRHJhZ0FjdGl2ZSwgZHJhZ2dlZEZpbGVzIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgZmlsZXNDb3VudCA9IGRyYWdnZWRGaWxlcy5sZW5ndGhcbiAgICBjb25zdCBpc011bHRpcGxlQWxsb3dlZCA9IG11bHRpcGxlIHx8IGZpbGVzQ291bnQgPD0gMVxuICAgIGNvbnN0IGlzRHJhZ0FjY2VwdCA9IGZpbGVzQ291bnQgPiAwICYmIGFsbEZpbGVzQWNjZXB0ZWQoZHJhZ2dlZEZpbGVzLCB0aGlzLnByb3BzLmFjY2VwdClcbiAgICBjb25zdCBpc0RyYWdSZWplY3QgPSBmaWxlc0NvdW50ID4gMCAmJiAoIWlzRHJhZ0FjY2VwdCB8fCAhaXNNdWx0aXBsZUFsbG93ZWQpXG4gICAgY29uc3Qgbm9TdHlsZXMgPVxuICAgICAgIWNsYXNzTmFtZSAmJiAhc3R5bGUgJiYgIWFjdGl2ZVN0eWxlICYmICFhY2NlcHRTdHlsZSAmJiAhcmVqZWN0U3R5bGUgJiYgIWRpc2FibGVkU3R5bGVcblxuICAgIGlmIChpc0RyYWdBY3RpdmUgJiYgYWN0aXZlQ2xhc3NOYW1lKSB7XG4gICAgICBjbGFzc05hbWUgKz0gJyAnICsgYWN0aXZlQ2xhc3NOYW1lXG4gICAgfVxuICAgIGlmIChpc0RyYWdBY2NlcHQgJiYgYWNjZXB0Q2xhc3NOYW1lKSB7XG4gICAgICBjbGFzc05hbWUgKz0gJyAnICsgYWNjZXB0Q2xhc3NOYW1lXG4gICAgfVxuICAgIGlmIChpc0RyYWdSZWplY3QgJiYgcmVqZWN0Q2xhc3NOYW1lKSB7XG4gICAgICBjbGFzc05hbWUgKz0gJyAnICsgcmVqZWN0Q2xhc3NOYW1lXG4gICAgfVxuICAgIGlmIChkaXNhYmxlZCAmJiBkaXNhYmxlZENsYXNzTmFtZSkge1xuICAgICAgY2xhc3NOYW1lICs9ICcgJyArIGRpc2FibGVkQ2xhc3NOYW1lXG4gICAgfVxuXG4gICAgaWYgKG5vU3R5bGVzKSB7XG4gICAgICBzdHlsZSA9IHN0eWxlcy5kZWZhdWx0XG4gICAgICBhY3RpdmVTdHlsZSA9IHN0eWxlcy5hY3RpdmVcbiAgICAgIGFjY2VwdFN0eWxlID0gc3R5bGVzLmFjdGl2ZVxuICAgICAgcmVqZWN0U3R5bGUgPSBzdHlsZXMucmVqZWN0ZWRcbiAgICAgIGRpc2FibGVkU3R5bGUgPSBzdHlsZXMuZGlzYWJsZWRcbiAgICB9XG5cbiAgICBsZXQgYXBwbGllZFN0eWxlID0geyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgLi4uc3R5bGUgfVxuICAgIGlmIChhY3RpdmVTdHlsZSAmJiBpc0RyYWdBY3RpdmUpIHtcbiAgICAgIGFwcGxpZWRTdHlsZSA9IHtcbiAgICAgICAgLi4uYXBwbGllZFN0eWxlLFxuICAgICAgICAuLi5hY3RpdmVTdHlsZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWNjZXB0U3R5bGUgJiYgaXNEcmFnQWNjZXB0KSB7XG4gICAgICBhcHBsaWVkU3R5bGUgPSB7XG4gICAgICAgIC4uLmFwcGxpZWRTdHlsZSxcbiAgICAgICAgLi4uYWNjZXB0U3R5bGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlamVjdFN0eWxlICYmIGlzRHJhZ1JlamVjdCkge1xuICAgICAgYXBwbGllZFN0eWxlID0ge1xuICAgICAgICAuLi5hcHBsaWVkU3R5bGUsXG4gICAgICAgIC4uLnJlamVjdFN0eWxlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkaXNhYmxlZFN0eWxlICYmIGRpc2FibGVkKSB7XG4gICAgICBhcHBsaWVkU3R5bGUgPSB7XG4gICAgICAgIC4uLmFwcGxpZWRTdHlsZSxcbiAgICAgICAgLi4uZGlzYWJsZWRTdHlsZVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlucHV0QXR0cmlidXRlcyA9IHtcbiAgICAgIGFjY2VwdCxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgb3BhY2l0eTogMC4wMDAwMSxcbiAgICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgICAuLi5pbnB1dFByb3BzLnN0eWxlXG4gICAgICB9LFxuICAgICAgbXVsdGlwbGU6IHN1cHBvcnRNdWx0aXBsZSAmJiBtdWx0aXBsZSxcbiAgICAgIHJlZjogdGhpcy5zZXRSZWZzLFxuICAgICAgb25DaGFuZ2U6IHRoaXMub25Ecm9wLFxuICAgICAgYXV0b0NvbXBsZXRlOiAnb2ZmJ1xuICAgIH1cblxuICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoKSB7XG4gICAgICBpbnB1dEF0dHJpYnV0ZXMubmFtZSA9IG5hbWVcbiAgICB9XG5cbiAgICAvLyBEZXN0cnVjdHVyZSBjdXN0b20gcHJvcHMgYXdheSBmcm9tIHByb3BzIHVzZWQgZm9yIHRoZSBkaXYgZWxlbWVudFxuICAgIGNvbnN0IHtcbiAgICAgIGFjY2VwdGVkRmlsZXMsXG4gICAgICBwcmV2ZW50RHJvcE9uRG9jdW1lbnQsXG4gICAgICBkaXNhYmxlUHJldmlldyxcbiAgICAgIGRpc2FibGVDbGljayxcbiAgICAgIG9uRHJvcEFjY2VwdGVkLFxuICAgICAgb25Ecm9wUmVqZWN0ZWQsXG4gICAgICBvbkZpbGVEaWFsb2dDYW5jZWwsXG4gICAgICBtYXhTaXplLFxuICAgICAgbWluU2l6ZSxcbiAgICAgIC4uLmRpdlByb3BzXG4gICAgfSA9IHByb3BzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e2FwcGxpZWRTdHlsZX1cbiAgICAgICAgey4uLmRpdlByb3BzIC8qIGV4cGFuZCB1c2VyIHByb3ZpZGVkIHByb3BzIGZpcnN0IHNvIGV2ZW50IGhhbmRsZXJzIGFyZSBuZXZlciBvdmVycmlkZGVuICovfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmNvbXBvc2VIYW5kbGVycyh0aGlzLm9uQ2xpY2spfVxuICAgICAgICBvbkRyYWdTdGFydD17dGhpcy5jb21wb3NlSGFuZGxlcnModGhpcy5vbkRyYWdTdGFydCl9XG4gICAgICAgIG9uRHJhZ0VudGVyPXt0aGlzLmNvbXBvc2VIYW5kbGVycyh0aGlzLm9uRHJhZ0VudGVyKX1cbiAgICAgICAgb25EcmFnT3Zlcj17dGhpcy5jb21wb3NlSGFuZGxlcnModGhpcy5vbkRyYWdPdmVyKX1cbiAgICAgICAgb25EcmFnTGVhdmU9e3RoaXMuY29tcG9zZUhhbmRsZXJzKHRoaXMub25EcmFnTGVhdmUpfVxuICAgICAgICBvbkRyb3A9e3RoaXMuY29tcG9zZUhhbmRsZXJzKHRoaXMub25Ecm9wKX1cbiAgICAgICAgcmVmPXt0aGlzLnNldFJlZn1cbiAgICAgICAgYXJpYS1kaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlckNoaWxkcmVuKGNoaWxkcmVuLCBpc0RyYWdBY3RpdmUsIGlzRHJhZ0FjY2VwdCwgaXNEcmFnUmVqZWN0KX1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgey4uLmlucHV0UHJvcHMgLyogZXhwYW5kIHVzZXIgcHJvdmlkZWQgaW5wdXRQcm9wcyBmaXJzdCBzbyBpbnB1dEF0dHJpYnV0ZXMgb3ZlcnJpZGUgdGhlbSAqL31cbiAgICAgICAgICB7Li4uaW5wdXRBdHRyaWJ1dGVzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lXG5cbkRyb3B6b25lLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEFsbG93IHNwZWNpZmljIHR5cGVzIG9mIGZpbGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL29rb25ldC9hdHRyLWFjY2VwdCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICogS2VlcCBpbiBtaW5kIHRoYXQgbWltZSB0eXBlIGRldGVybWluYXRpb24gaXMgbm90IHJlbGlhYmxlIGFjcm9zcyBwbGF0Zm9ybXMuIENTViBmaWxlcyxcbiAgICogZm9yIGV4YW1wbGUsIGFyZSByZXBvcnRlZCBhcyB0ZXh0L3BsYWluIHVuZGVyIG1hY09TIGJ1dCBhcyBhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwgdW5kZXJcbiAgICogV2luZG93cy4gSW4gc29tZSBjYXNlcyB0aGVyZSBtaWdodCBub3QgYmUgYSBtaW1lIHR5cGUgc2V0IGF0IGFsbC5cbiAgICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3QtZHJvcHpvbmUvcmVhY3QtZHJvcHpvbmUvaXNzdWVzLzI3NlxuICAgKi9cbiAgYWNjZXB0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKV0pLFxuXG4gIC8qKlxuICAgKiBDb250ZW50cyBvZiB0aGUgZHJvcHpvbmVcbiAgICovXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubm9kZSwgUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAvKipcbiAgICogRGlzYWxsb3cgY2xpY2tpbmcgb24gdGhlIGRyb3B6b25lIGNvbnRhaW5lciB0byBvcGVuIGZpbGUgZGlhbG9nXG4gICAqL1xuICBkaXNhYmxlQ2xpY2s6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBFbmFibGUvZGlzYWJsZSB0aGUgZHJvcHpvbmUgZW50aXJlbHlcbiAgICovXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogRW5hYmxlL2Rpc2FibGUgcHJldmlldyBnZW5lcmF0aW9uXG4gICAqL1xuICBkaXNhYmxlUHJldmlldzogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIElmIGZhbHNlLCBhbGxvdyBkcm9wcGVkIGl0ZW1zIHRvIHRha2Ugb3ZlciB0aGUgY3VycmVudCBicm93c2VyIHdpbmRvd1xuICAgKi9cbiAgcHJldmVudERyb3BPbkRvY3VtZW50OiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogUGFzcyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgdG8gdGhlIGA8aW5wdXQgdHlwZT1cImZpbGVcIi8+YCB0YWdcbiAgICovXG4gIGlucHV0UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIEFsbG93IGRyb3BwaW5nIG11bHRpcGxlIGZpbGVzXG4gICAqL1xuICBtdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIGBuYW1lYCBhdHRyaWJ1dGUgZm9yIHRoZSBpbnB1dCB0YWdcbiAgICovXG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE1heGltdW0gZmlsZSBzaXplIChpbiBieXRlcylcbiAgICovXG4gIG1heFNpemU6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIE1pbmltdW0gZmlsZSBzaXplIChpbiBieXRlcylcbiAgICovXG4gIG1pblNpemU6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIGNsYXNzTmFtZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBjbGFzc05hbWUgdG8gYXBwbHkgd2hlbiBkcmFnIGlzIGFjdGl2ZVxuICAgKi9cbiAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBjbGFzc05hbWUgdG8gYXBwbHkgd2hlbiBkcm9wIHdpbGwgYmUgYWNjZXB0ZWRcbiAgICovXG4gIGFjY2VwdENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogY2xhc3NOYW1lIHRvIGFwcGx5IHdoZW4gZHJvcCB3aWxsIGJlIHJlamVjdGVkXG4gICAqL1xuICByZWplY3RDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIGNsYXNzTmFtZSB0byBhcHBseSB3aGVuIGRyb3B6b25lIGlzIGRpc2FibGVkXG4gICAqL1xuICBkaXNhYmxlZENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogQ1NTIHN0eWxlcyB0byBhcHBseVxuICAgKi9cbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIENTUyBzdHlsZXMgdG8gYXBwbHkgd2hlbiBkcmFnIGlzIGFjdGl2ZVxuICAgKi9cbiAgYWN0aXZlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIENTUyBzdHlsZXMgdG8gYXBwbHkgd2hlbiBkcm9wIHdpbGwgYmUgYWNjZXB0ZWRcbiAgICovXG4gIGFjY2VwdFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBDU1Mgc3R5bGVzIHRvIGFwcGx5IHdoZW4gZHJvcCB3aWxsIGJlIHJlamVjdGVkXG4gICAqL1xuICByZWplY3RTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKipcbiAgICogQ1NTIHN0eWxlcyB0byBhcHBseSB3aGVuIGRyb3B6b25lIGlzIGRpc2FibGVkXG4gICAqL1xuICBkaXNhYmxlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBvbkNsaWNrIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAqL1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogb25Ecm9wIGNhbGxiYWNrXG4gICAqL1xuICBvbkRyb3A6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyb3BBY2NlcHRlZCBjYWxsYmFja1xuICAgKi9cbiAgb25Ecm9wQWNjZXB0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyb3BSZWplY3RlZCBjYWxsYmFja1xuICAgKi9cbiAgb25Ecm9wUmVqZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyYWdTdGFydCBjYWxsYmFja1xuICAgKi9cbiAgb25EcmFnU3RhcnQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyYWdFbnRlciBjYWxsYmFja1xuICAgKi9cbiAgb25EcmFnRW50ZXI6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBvbkRyYWdPdmVyIGNhbGxiYWNrXG4gICAqL1xuICBvbkRyYWdPdmVyOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogb25EcmFnTGVhdmUgY2FsbGJhY2tcbiAgICovXG4gIG9uRHJhZ0xlYXZlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogUHJvdmlkZSBhIGNhbGxiYWNrIG9uIGNsaWNraW5nIHRoZSBjYW5jZWwgYnV0dG9uIG9mIHRoZSBmaWxlIGRpYWxvZ1xuICAgKi9cbiAgb25GaWxlRGlhbG9nQ2FuY2VsOiBQcm9wVHlwZXMuZnVuY1xufVxuXG5Ecm9wem9uZS5kZWZhdWx0UHJvcHMgPSB7XG4gIHByZXZlbnREcm9wT25Eb2N1bWVudDogdHJ1ZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBkaXNhYmxlUHJldmlldzogZmFsc2UsXG4gIGRpc2FibGVDbGljazogZmFsc2UsXG4gIGlucHV0UHJvcHM6IHt9LFxuICBtdWx0aXBsZTogdHJ1ZSxcbiAgbWF4U2l6ZTogSW5maW5pdHksXG4gIG1pblNpemU6IDBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifVxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIlByb3BUeXBlc1wiLFwiY29tbW9uanMyXCI6XCJwcm9wLXR5cGVzXCIsXCJjb21tb25qc1wiOlwicHJvcC10eXBlc1wiLFwiYW1kXCI6XCJwcm9wLXR5cGVzXCJ9XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhY2NlcHRzIGZyb20gJ2F0dHItYWNjZXB0J1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydE11bHRpcGxlID1cbiAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5jcmVhdGVFbGVtZW50XG4gICAgPyAnbXVsdGlwbGUnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICA6IHRydWVcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFUcmFuc2Zlckl0ZW1zKGV2ZW50KSB7XG4gIGxldCBkYXRhVHJhbnNmZXJJdGVtc0xpc3QgPSBbXVxuICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgY29uc3QgZHQgPSBldmVudC5kYXRhVHJhbnNmZXJcbiAgICBpZiAoZHQuZmlsZXMgJiYgZHQuZmlsZXMubGVuZ3RoKSB7XG4gICAgICBkYXRhVHJhbnNmZXJJdGVtc0xpc3QgPSBkdC5maWxlc1xuICAgIH0gZWxzZSBpZiAoZHQuaXRlbXMgJiYgZHQuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAvLyBEdXJpbmcgdGhlIGRyYWcgZXZlbiB0aGUgZGF0YVRyYW5zZmVyLmZpbGVzIGlzIG51bGxcbiAgICAgIC8vIGJ1dCBDaHJvbWUgaW1wbGVtZW50cyBzb21lIGRyYWcgc3RvcmUsIHdoaWNoIGlzIGFjY2VzaWJsZSB2aWEgZGF0YVRyYW5zZmVyLml0ZW1zXG4gICAgICBkYXRhVHJhbnNmZXJJdGVtc0xpc3QgPSBkdC5pdGVtc1xuICAgIH1cbiAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmZpbGVzKSB7XG4gICAgZGF0YVRyYW5zZmVySXRlbXNMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzXG4gIH1cbiAgLy8gQ29udmVydCBmcm9tIERhdGFUcmFuc2Zlckl0ZW1zTGlzdCB0byB0aGUgbmF0aXZlIEFycmF5XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhVHJhbnNmZXJJdGVtc0xpc3QpXG59XG5cbi8vIEZpcmVmb3ggdmVyc2lvbnMgcHJpb3IgdG8gNTMgcmV0dXJuIGEgYm9ndXMgTUlNRSB0eXBlIGZvciBldmVyeSBmaWxlIGRyYWcsIHNvIGRyYWdvdmVycyB3aXRoXG4vLyB0aGF0IE1JTUUgdHlwZSB3aWxsIGFsd2F5cyBiZSBhY2NlcHRlZFxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVBY2NlcHRlZChmaWxlLCBhY2NlcHQpIHtcbiAgcmV0dXJuIGZpbGUudHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3gtbW96LWZpbGUnIHx8IGFjY2VwdHMoZmlsZSwgYWNjZXB0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZU1hdGNoU2l6ZShmaWxlLCBtYXhTaXplLCBtaW5TaXplKSB7XG4gIHJldHVybiBmaWxlLnNpemUgPD0gbWF4U2l6ZSAmJiBmaWxlLnNpemUgPj0gbWluU2l6ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsRmlsZXNBY2NlcHRlZChmaWxlcywgYWNjZXB0KSB7XG4gIHJldHVybiBmaWxlcy5ldmVyeShmaWxlID0+IGZpbGVBY2NlcHRlZChmaWxlLCBhY2NlcHQpKVxufVxuXG4vLyBhbGxvdyB0aGUgZW50aXJlIGRvY3VtZW50IHRvIGJlIGEgZHJhZyB0YXJnZXRcbmV4cG9ydCBmdW5jdGlvbiBvbkRvY3VtZW50RHJhZ092ZXIoZXZ0KSB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbmZ1bmN0aW9uIGlzSWUodXNlckFnZW50KSB7XG4gIHJldHVybiB1c2VyQWdlbnQuaW5kZXhPZignTVNJRScpICE9PSAtMSB8fCB1c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTFcbn1cblxuZnVuY3Rpb24gaXNFZGdlKHVzZXJBZ2VudCkge1xuICByZXR1cm4gdXNlckFnZW50LmluZGV4T2YoJ0VkZ2UvJykgIT09IC0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0llT3JFZGdlKHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gIHJldHVybiBpc0llKHVzZXJBZ2VudCkgfHwgaXNFZGdlKHVzZXJBZ2VudClcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4oZSl7aWYocltlXSlyZXR1cm4gcltlXS5leHBvcnRzO3ZhciBvPXJbZV09e2V4cG9ydHM6e30saWQ6ZSxsb2FkZWQ6ITF9O3JldHVybiB0W2VdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLG4pLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgcj17fTtyZXR1cm4gbi5tPXQsbi5jPXIsbi5wPVwiXCIsbigwKX0oW2Z1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjtuLl9fZXNNb2R1bGU9ITAscig4KSxyKDkpLG5bXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKHQsbil7aWYodCYmbil7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgcj1BcnJheS5pc0FycmF5KG4pP246bi5zcGxpdChcIixcIiksZT10Lm5hbWV8fFwiXCIsbz10LnR5cGV8fFwiXCIsaT1vLnJlcGxhY2UoL1xcLy4qJC8sXCJcIik7cmV0dXJue3Y6ci5zb21lKGZ1bmN0aW9uKHQpe3ZhciBuPXQudHJpbSgpO3JldHVyblwiLlwiPT09bi5jaGFyQXQoMCk/ZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKG4udG9Mb3dlckNhc2UoKSk6L1xcL1xcKiQvLnRlc3Qobik/aT09PW4ucmVwbGFjZSgvXFwvLiokLyxcIlwiKTpvPT09bn0pfX0oKTtpZihcIm9iamVjdFwiPT10eXBlb2YgcilyZXR1cm4gci52fXJldHVybiEwfSx0LmV4cG9ydHM9bltcImRlZmF1bHRcIl19LGZ1bmN0aW9uKHQsbil7dmFyIHI9dC5leHBvcnRzPXt2ZXJzaW9uOlwiMS4yLjJcIn07XCJudW1iZXJcIj09dHlwZW9mIF9fZSYmKF9fZT1yKX0sZnVuY3Rpb24odCxuKXt2YXIgcj10LmV4cG9ydHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lk1hdGg9PU1hdGg/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLk1hdGg9PU1hdGg/c2VsZjpGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XCJudW1iZXJcIj09dHlwZW9mIF9fZyYmKF9fZz1yKX0sZnVuY3Rpb24odCxuLHIpe3ZhciBlPXIoMiksbz1yKDEpLGk9cig0KSx1PXIoMTkpLGM9XCJwcm90b3R5cGVcIixmPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpfX0scz1mdW5jdGlvbih0LG4scil7dmFyIGEscCxsLHksZD10JnMuRyxoPXQmcy5QLHY9ZD9lOnQmcy5TP2Vbbl18fChlW25dPXt9KTooZVtuXXx8e30pW2NdLHg9ZD9vOm9bbl18fChvW25dPXt9KTtkJiYocj1uKTtmb3IoYSBpbiByKXA9ISh0JnMuRikmJnYmJmEgaW4gdixsPShwP3Y6cilbYV0seT10JnMuQiYmcD9mKGwsZSk6aCYmXCJmdW5jdGlvblwiPT10eXBlb2YgbD9mKEZ1bmN0aW9uLmNhbGwsbCk6bCx2JiYhcCYmdSh2LGEsbCkseFthXSE9bCYmaSh4LGEseSksaCYmKCh4W2NdfHwoeFtjXT17fSkpW2FdPWwpfTtlLmNvcmU9byxzLkY9MSxzLkc9MixzLlM9NCxzLlA9OCxzLkI9MTYscy5XPTMyLHQuZXhwb3J0cz1zfSxmdW5jdGlvbih0LG4scil7dmFyIGU9cig1KSxvPXIoMTgpO3QuZXhwb3J0cz1yKDIyKT9mdW5jdGlvbih0LG4scil7cmV0dXJuIGUuc2V0RGVzYyh0LG4sbygxLHIpKX06ZnVuY3Rpb24odCxuLHIpe3JldHVybiB0W25dPXIsdH19LGZ1bmN0aW9uKHQsbil7dmFyIHI9T2JqZWN0O3QuZXhwb3J0cz17Y3JlYXRlOnIuY3JlYXRlLGdldFByb3RvOnIuZ2V0UHJvdG90eXBlT2YsaXNFbnVtOnt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLGdldERlc2M6ci5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Isc2V0RGVzYzpyLmRlZmluZVByb3BlcnR5LHNldERlc2NzOnIuZGVmaW5lUHJvcGVydGllcyxnZXRLZXlzOnIua2V5cyxnZXROYW1lczpyLmdldE93blByb3BlcnR5TmFtZXMsZ2V0U3ltYm9sczpyLmdldE93blByb3BlcnR5U3ltYm9scyxlYWNoOltdLmZvckVhY2h9fSxmdW5jdGlvbih0LG4pe3ZhciByPTAsZT1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK3IrZSkudG9TdHJpbmcoMzYpKX19LGZ1bmN0aW9uKHQsbixyKXt2YXIgZT1yKDIwKShcIndrc1wiKSxvPXIoMikuU3ltYm9sO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZVt0XXx8KGVbdF09byYmb1t0XXx8KG98fHIoNikpKFwiU3ltYm9sLlwiK3QpKX19LGZ1bmN0aW9uKHQsbixyKXtyKDI2KSx0LmV4cG9ydHM9cigxKS5BcnJheS5zb21lfSxmdW5jdGlvbih0LG4scil7cigyNSksdC5leHBvcnRzPXIoMSkuU3RyaW5nLmVuZHNXaXRofSxmdW5jdGlvbih0LG4pe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIGZ1bmN0aW9uIVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsbil7dmFyIHI9e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigxMCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsbixyKXtpZihlKHQpLHZvaWQgMD09PW4pcmV0dXJuIHQ7c3dpdGNoKHIpe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIHQuY2FsbChuLHIpfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKHIsZSl7cmV0dXJuIHQuY2FsbChuLHIsZSl9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24ocixlLG8pe3JldHVybiB0LmNhbGwobixyLGUsbyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KG4sYXJndW1lbnRzKX19fSxmdW5jdGlvbih0LG4pe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxuLHIpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgbj0vLi87dHJ5e1wiLy4vXCJbdF0obil9Y2F0Y2goZSl7dHJ5e3JldHVybiBuW3IoNykoXCJtYXRjaFwiKV09ITEsIVwiLy4vXCJbdF0obil9Y2F0Y2gobyl7fX1yZXR1cm4hMH19LGZ1bmN0aW9uKHQsbil7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4hIXQoKX1jYXRjaChuKXtyZXR1cm4hMH19fSxmdW5jdGlvbih0LG4pe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdD9udWxsIT09dDpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fX0sZnVuY3Rpb24odCxuLHIpe3ZhciBlPXIoMTYpLG89cigxMSksaT1yKDcpKFwibWF0Y2hcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBlKHQpJiYodm9pZCAwIT09KG49dFtpXSk/ISFuOlwiUmVnRXhwXCI9PW8odCkpfX0sZnVuY3Rpb24odCxuKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxuKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6bn19fSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigyKSxvPXIoNCksaT1yKDYpKFwic3JjXCIpLHU9XCJ0b1N0cmluZ1wiLGM9RnVuY3Rpb25bdV0sZj0oXCJcIitjKS5zcGxpdCh1KTtyKDEpLmluc3BlY3RTb3VyY2U9ZnVuY3Rpb24odCl7cmV0dXJuIGMuY2FsbCh0KX0sKHQuZXhwb3J0cz1mdW5jdGlvbih0LG4scix1KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiYobyhyLGksdFtuXT9cIlwiK3Rbbl06Zi5qb2luKFN0cmluZyhuKSkpLFwibmFtZVwiaW4gcnx8KHIubmFtZT1uKSksdD09PWU/dFtuXT1yOih1fHxkZWxldGUgdFtuXSxvKHQsbixyKSl9KShGdW5jdGlvbi5wcm90b3R5cGUsdSxmdW5jdGlvbigpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMmJnRoaXNbaV18fGMuY2FsbCh0aGlzKX0pfSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigyKSxvPVwiX19jb3JlLWpzX3NoYXJlZF9fXCIsaT1lW29dfHwoZVtvXT17fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT17fSl9fSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigxNyksbz1yKDEzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxuLHIpe2lmKGUobikpdGhyb3cgVHlwZUVycm9yKFwiU3RyaW5nI1wiK3IrXCIgZG9lc24ndCBhY2NlcHQgcmVnZXghXCIpO3JldHVybiBTdHJpbmcobyh0KSl9fSxmdW5jdGlvbih0LG4scil7dC5leHBvcnRzPSFyKDE1KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxuKXt2YXIgcj1NYXRoLmNlaWwsZT1NYXRoLmZsb29yO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaXNOYU4odD0rdCk/MDoodD4wP2U6cikodCl9fSxmdW5jdGlvbih0LG4scil7dmFyIGU9cigyMyksbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9vKGUodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1yKDMpLG89cigyNCksaT1yKDIxKSx1PVwiZW5kc1dpdGhcIixjPVwiXCJbdV07ZShlLlArZS5GKnIoMTQpKHUpLFwiU3RyaW5nXCIse2VuZHNXaXRoOmZ1bmN0aW9uKHQpe3ZhciBuPWkodGhpcyx0LHUpLHI9YXJndW1lbnRzLGU9ci5sZW5ndGg+MT9yWzFdOnZvaWQgMCxmPW8obi5sZW5ndGgpLHM9dm9pZCAwPT09ZT9mOk1hdGgubWluKG8oZSksZiksYT1TdHJpbmcodCk7cmV0dXJuIGM/Yy5jYWxsKG4sYSxzKTpuLnNsaWNlKHMtYS5sZW5ndGgscyk9PT1hfX0pfSxmdW5jdGlvbih0LG4scil7dmFyIGU9cig1KSxvPXIoMyksaT1yKDEpLkFycmF5fHxBcnJheSx1PXt9LGM9ZnVuY3Rpb24odCxuKXtlLmVhY2guY2FsbCh0LnNwbGl0KFwiLFwiKSxmdW5jdGlvbih0KXt2b2lkIDA9PW4mJnQgaW4gaT91W3RdPWlbdF06dCBpbltdJiYodVt0XT1yKDEyKShGdW5jdGlvbi5jYWxsLFtdW3RdLG4pKX0pfTtjKFwicG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllc1wiLDEpLGMoXCJpbmRleE9mLGV2ZXJ5LHNvbWUsZm9yRWFjaCxtYXAsZmlsdGVyLGZpbmQsZmluZEluZGV4LGluY2x1ZGVzXCIsMyksYyhcImpvaW4sc2xpY2UsY29uY2F0LHB1c2gsc3BsaWNlLHVuc2hpZnQsc29ydCxsYXN0SW5kZXhPZixyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsXCIpLG8oby5TLFwiQXJyYXlcIix1KX1dKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hdHRyLWFjY2VwdC9kaXN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgcmVqZWN0ZWQ6IHtcbiAgICBib3JkZXJTdHlsZTogJ3NvbGlkJyxcbiAgICBib3JkZXJDb2xvcjogJyNjNjYnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnXG4gIH0sXG4gIGRpc2FibGVkOiB7XG4gICAgb3BhY2l0eTogMC41XG4gIH0sXG4gIGFjdGl2ZToge1xuICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxuICAgIGJvcmRlckNvbG9yOiAnIzZjNicsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnI2VlZSdcbiAgfSxcbiAgZGVmYXVsdDoge1xuICAgIHdpZHRoOiAyMDAsXG4gICAgaGVpZ2h0OiAyMDAsXG4gICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgYm9yZGVyQ29sb3I6ICcjNjY2JyxcbiAgICBib3JkZXJTdHlsZTogJ2Rhc2hlZCcsXG4gICAgYm9yZGVyUmFkaXVzOiA1XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9zdHlsZXMuanMiXSwic291cmNlUm9vdCI6IiJ9

/***/ }),

/***/ 1129:
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["jsQR"] = factory();
		else
			root["jsQR"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		/// <reference path="./common/types.d.ts" />
		var binarizer_1 = __webpack_require__(1);
		var locator_1 = __webpack_require__(3);
		var extractor_1 = __webpack_require__(4);
		var decoder_1 = __webpack_require__(9);
		var bitmatrix_1 = __webpack_require__(2);
		var binarizeImage = binarizer_1.binarize;
		exports.binarizeImage = binarizeImage;
		var locateQRInBinaryImage = locator_1.locate;
		exports.locateQRInBinaryImage = locateQRInBinaryImage;
		var extractQRFromBinaryImage = extractor_1.extract;
		exports.extractQRFromBinaryImage = extractQRFromBinaryImage;
		function decodeQR(matrix) {
		    return byteArrayToString(decoder_1.decode(matrix));
		}
		exports.decodeQR = decodeQR;
		// return bytes.reduce((p, b) => p + String.fromCharCode(b), "");
		function byteArrayToString(bytes) {
		    var str = "";
		    if (bytes != null && bytes != undefined) {
		        for (var i = 0; i < bytes.length; i++) {
		            str += String.fromCharCode(bytes[i]);
		        }
		    }
		    return str;
		}
		function createBitMatrix(data, width) {
		    return new bitmatrix_1.BitMatrix(data, width);
		}
		exports.createBitMatrix = createBitMatrix;
		function decodeQRFromImage(data, width, height) {
		    return byteArrayToString(decodeQRFromImageAsByteArray(data, width, height));
		}
		exports.decodeQRFromImage = decodeQRFromImage;
		function decodeQRFromImageAsByteArray(data, width, height) {
		    var binarizedImage = binarizeImage(data, width, height);
		    var location = locator_1.locate(binarizedImage);
		    if (!location) {
		        return null;
		    }
		    var rawQR = extractor_1.extract(binarizedImage, location);
		    if (!rawQR) {
		        return null;
		    }
		    return decoder_1.decode(rawQR);
		}
		exports.decodeQRFromImageAsByteArray = decodeQRFromImageAsByteArray;


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var bitmatrix_1 = __webpack_require__(2);
		// Magic Constants
		var BLOCK_SIZE_POWER = 3;
		var BLOCK_SIZE = 1 << BLOCK_SIZE_POWER;
		var BLOCK_SIZE_MASK = BLOCK_SIZE - 1;
		var MIN_DYNAMIC_RANGE = 24;
		function calculateBlackPoints(luminances, subWidth, subHeight, width, height) {
		    var blackPoints = new Array(subHeight);
		    for (var i = 0; i < subHeight; i++) {
		        blackPoints[i] = new Array(subWidth);
		    }
		    for (var y = 0; y < subHeight; y++) {
		        var yoffset = y << BLOCK_SIZE_POWER;
		        var maxYOffset = height - BLOCK_SIZE;
		        if (yoffset > maxYOffset) {
		            yoffset = maxYOffset;
		        }
		        for (var x = 0; x < subWidth; x++) {
		            var xoffset = x << BLOCK_SIZE_POWER;
		            var maxXOffset = width - BLOCK_SIZE;
		            if (xoffset > maxXOffset) {
		                xoffset = maxXOffset;
		            }
		            var sum = 0;
		            var min = 0xFF;
		            var max = 0;
		            for (var yy = 0, offset = yoffset * width + xoffset; yy < BLOCK_SIZE; yy++, offset += width) {
		                for (var xx = 0; xx < BLOCK_SIZE; xx++) {
		                    var pixel = luminances[offset + xx] & 0xFF;
		                    // still looking for good contrast
		                    sum += pixel;
		                    if (pixel < min) {
		                        min = pixel;
		                    }
		                    if (pixel > max) {
		                        max = pixel;
		                    }
		                }
		                // short-circuit min/max tests once dynamic range is met
		                if (max - min > MIN_DYNAMIC_RANGE) {
		                    // finish the rest of the rows quickly
		                    for (yy++, offset += width; yy < BLOCK_SIZE; yy++, offset += width) {
		                        for (var xx = 0; xx < BLOCK_SIZE; xx++) {
		                            sum += luminances[offset + xx] & 0xFF;
		                        }
		                    }
		                }
		            }
		            // The default estimate is the average of the values in the block.
		            var average = sum >> (BLOCK_SIZE_POWER * 2);
		            if (max - min <= MIN_DYNAMIC_RANGE) {
		                // If variation within the block is low, assume this is a block with only light or only
		                // dark pixels. In that case we do not want to use the average, as it would divide this
		                // low contrast area into black and white pixels, essentially creating data out of noise.
		                //
		                // The default assumption is that the block is light/background. Since no estimate for
		                // the level of dark pixels exists locally, use half the min for the block.
		                average = min >> 1;
		                if (y > 0 && x > 0) {
		                    // Correct the "white background" assumption for blocks that have neighbors by comparing
		                    // the pixels in this block to the previously calculated black points. This is based on
		                    // the fact that dark barcode symbology is always surrounded by some amount of light
		                    // background for which reasonable black point estimates were made. The bp estimated at
		                    // the boundaries is used for the interior.
		                    // The (min < bp) is arbitrary but works better than other heuristics that were tried.
		                    var averageNeighborBlackPoint = (blackPoints[y - 1][x] + (2 * blackPoints[y][x - 1]) + blackPoints[y - 1][x - 1]) >> 2;
		                    if (min < averageNeighborBlackPoint) {
		                        average = averageNeighborBlackPoint;
		                    }
		                }
		            }
		            blackPoints[y][x] = average;
		        }
		    }
		    return blackPoints;
		}
		function calculateThresholdForBlock(luminances, subWidth, subHeight, width, height, blackPoints) {
		    function cap(value, min, max) {
		        return value < min ? min : value > max ? max : value;
		    }
		    // var outArray = new Array(width * height);
		    var outMatrix = bitmatrix_1.BitMatrix.createEmpty(width, height);
		    function thresholdBlock(luminances, xoffset, yoffset, threshold, stride) {
		        var offset = (yoffset * stride) + xoffset;
		        for (var y = 0; y < BLOCK_SIZE; y++, offset += stride) {
		            for (var x = 0; x < BLOCK_SIZE; x++) {
		                var pixel = luminances[offset + x] & 0xff;
		                // Comparison needs to be <= so that black == 0 pixels are black even if the threshold is 0.
		                outMatrix.set(xoffset + x, yoffset + y, pixel <= threshold);
		            }
		        }
		    }
		    for (var y = 0; y < subHeight; y++) {
		        var yoffset = y << BLOCK_SIZE_POWER;
		        var maxYOffset = height - BLOCK_SIZE;
		        if (yoffset > maxYOffset) {
		            yoffset = maxYOffset;
		        }
		        for (var x = 0; x < subWidth; x++) {
		            var xoffset = x << BLOCK_SIZE_POWER;
		            var maxXOffset = width - BLOCK_SIZE;
		            if (xoffset > maxXOffset) {
		                xoffset = maxXOffset;
		            }
		            var left = cap(x, 2, subWidth - 3);
		            var top = cap(y, 2, subHeight - 3);
		            var sum = 0;
		            for (var z = -2; z <= 2; z++) {
		                var blackRow = blackPoints[top + z];
		                sum += blackRow[left - 2];
		                sum += blackRow[left - 1];
		                sum += blackRow[left];
		                sum += blackRow[left + 1];
		                sum += blackRow[left + 2];
		            }
		            var average = sum / 25;
		            thresholdBlock(luminances, xoffset, yoffset, average, width);
		        }
		    }
		    return outMatrix;
		}
		function binarize(data, width, height) {
		    if (data.length !== width * height * 4) {
		        throw new Error("Binarizer data.length != width * height * 4");
		    }
		    var gsArray = new Array(width * height);
		    for (var x = 0; x < width; x++) {
		        for (var y = 0; y < height; y++) {
		            var startIndex = (y * width + x) * 4;
		            var r = data[startIndex];
		            var g = data[startIndex + 1];
		            var b = data[startIndex + 2];
		            // Magic lumosity constants
		            var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		            gsArray[y * width + x] = lum;
		        }
		    }
		    var subWidth = width >> BLOCK_SIZE_POWER;
		    if ((width & BLOCK_SIZE_MASK) != 0) {
		        subWidth++;
		    }
		    var subHeight = height >> BLOCK_SIZE_POWER;
		    if ((height & BLOCK_SIZE_MASK) != 0) {
		        subHeight++;
		    }
		    var blackPoints = calculateBlackPoints(gsArray, subWidth, subHeight, width, height);
		    return calculateThresholdForBlock(gsArray, subWidth, subHeight, width, height, blackPoints);
		}
		exports.binarize = binarize;


	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		"use strict";
		var BitMatrix = (function () {
		    function BitMatrix(data, width) {
		        this.width = width;
		        this.height = data.length / width;
		        this.data = data;
		    }
		    BitMatrix.createEmpty = function (width, height) {
		        var data = new Array(width * height);
		        for (var i = 0; i < data.length; i++) {
		            data[i] = false;
		        }
		        return new BitMatrix(data, width);
		    };
		    BitMatrix.prototype.get = function (x, y) {
		        return this.data[y * this.width + x];
		    };
		    BitMatrix.prototype.set = function (x, y, v) {
		        this.data[y * this.width + x] = v;
		    };
		    BitMatrix.prototype.copyBit = function (x, y, versionBits) {
		        return this.get(x, y) ? (versionBits << 1) | 0x1 : versionBits << 1;
		    };
		    BitMatrix.prototype.setRegion = function (left, top, width, height) {
		        var right = left + width;
		        var bottom = top + height;
		        for (var y = top; y < bottom; y++) {
		            for (var x = left; x < right; x++) {
		                this.set(x, y, true);
		            }
		        }
		    };
		    BitMatrix.prototype.mirror = function () {
		        for (var x = 0; x < this.width; x++) {
		            for (var y = x + 1; y < this.height; y++) {
		                if (this.get(x, y) != this.get(y, x)) {
		                    this.set(x, y, !this.get(x, y));
		                    this.set(y, x, !this.get(y, x));
		                }
		            }
		        }
		    };
		    return BitMatrix;
		}());
		exports.BitMatrix = BitMatrix;


	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		"use strict";
		var CENTER_QUORUM = 2;
		var MIN_SKIP = 3;
		var MAX_MODULES = 57;
		var INTEGER_MATH_SHIFT = 8;
		var FinderPattern = (function () {
		    function FinderPattern(x, y, estimatedModuleSize, count) {
		        this.x = x;
		        this.y = y;
		        this.estimatedModuleSize = estimatedModuleSize;
		        if (count == null) {
		            this.count = 1;
		        }
		        else {
		            this.count = count;
		        }
		    }
		    FinderPattern.prototype.aboutEquals = function (moduleSize, i, j) {
		        if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
		            var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
		            return moduleSizeDiff <= 1.0 || moduleSizeDiff <= this.estimatedModuleSize;
		        }
		        return false;
		    };
		    FinderPattern.prototype.combineEstimate = function (i, j, newModuleSize) {
		        var combinedCount = this.count + 1;
		        var combinedX = (this.count * this.x + j) / combinedCount;
		        var combinedY = (this.count * this.y + i) / combinedCount;
		        var combinedModuleSize = (this.count * this.estimatedModuleSize + newModuleSize) / combinedCount;
		        return new FinderPattern(combinedX, combinedY, combinedModuleSize, combinedCount);
		    };
		    return FinderPattern;
		}());
		function foundPatternCross(stateCount) {
		    var totalModuleSize = 0;
		    for (var i = 0; i < 5; i++) {
		        var count = stateCount[i];
		        if (count === 0)
		            return false;
		        totalModuleSize += count;
		    }
		    if (totalModuleSize < 7)
		        return false;
		    var moduleSize = (totalModuleSize << INTEGER_MATH_SHIFT) / 7;
		    var maxVariance = moduleSize / 2;
		    // Allow less than 50% variance from 1-1-3-1-1 proportions
		    return Math.abs(moduleSize - (stateCount[0] << INTEGER_MATH_SHIFT)) < maxVariance &&
		        Math.abs(moduleSize - (stateCount[1] << INTEGER_MATH_SHIFT)) < maxVariance &&
		        Math.abs(3 * moduleSize - (stateCount[2] << INTEGER_MATH_SHIFT)) < 3 * maxVariance &&
		        Math.abs(moduleSize - (stateCount[3] << INTEGER_MATH_SHIFT)) < maxVariance &&
		        Math.abs(moduleSize - (stateCount[4] << INTEGER_MATH_SHIFT)) < maxVariance;
		}
		function centerFromEnd(stateCount, end) {
		    var result = (end - stateCount[4] - stateCount[3]) - stateCount[2] / 2;
		    // Fix this.
		    if (result !== result) {
		        return null;
		    }
		    return result;
		}
		function distance(pattern1, pattern2) {
		    var a = pattern1.x - pattern2.x;
		    var b = pattern1.y - pattern2.y;
		    return Math.sqrt(a * a + b * b);
		}
		function crossProductZ(pointA, pointB, pointC) {
		    var bX = pointB.x;
		    var bY = pointB.y;
		    return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX));
		}
		function ReorderFinderPattern(patterns) {
		    // Find distances between pattern centers
		    var zeroOneDistance = distance(patterns[0], patterns[1]);
		    var oneTwoDistance = distance(patterns[1], patterns[2]);
		    var zeroTwoDistance = distance(patterns[0], patterns[2]);
		    var pointA, pointB, pointC;
		    // Assume one closest to other two is B; A and C will just be guesses at first
		    if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
		        pointB = patterns[0];
		        pointA = patterns[1];
		        pointC = patterns[2];
		    }
		    else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
		        pointB = patterns[1];
		        pointA = patterns[0];
		        pointC = patterns[2];
		    }
		    else {
		        pointB = patterns[2];
		        pointA = patterns[0];
		        pointC = patterns[1];
		    }
		    // Use cross product to figure out whether A and C are correct or flipped.
		    // This asks whether BC x BA has a positive z component, which is the arrangement
		    // we want for A, B, C. If it's negative, then we've got it flipped around and
		    // should swap A and C.
		    if (crossProductZ(pointA, pointB, pointC) < 0) {
		        var temp = pointA;
		        pointA = pointC;
		        pointC = temp;
		    }
		    return {
		        bottomLeft: { x: pointA.x, y: pointA.y },
		        topLeft: { x: pointB.x, y: pointB.y },
		        topRight: { x: pointC.x, y: pointC.y }
		    };
		}
		function locate(matrix) {
		    // Global state :(
		    var possibleCenters = [];
		    var hasSkipped = false;
		    function get(x, y) {
		        x = Math.floor(x);
		        y = Math.floor(y);
		        return matrix.get(x, y);
		    }
		    // Methods
		    function crossCheckDiagonal(startI, centerJ, maxCount, originalStateCountTotal) {
		        var maxI = matrix.height;
		        var maxJ = matrix.width;
		        var stateCount = [0, 0, 0, 0, 0];
		        // Start counting up, left from center finding black center mass
		        var i = 0;
		        while (startI - i >= 0 && get(centerJ - i, startI - i)) {
		            stateCount[2]++;
		            i++;
		        }
		        if ((startI - i < 0) || (centerJ - i < 0)) {
		            return false;
		        }
		        // Continue up, left finding white space
		        while ((startI - i >= 0) && (centerJ - i >= 0) && !get(centerJ - i, startI - i) && stateCount[1] <= maxCount) {
		            stateCount[1]++;
		            i++;
		        }
		        // If already too many modules in this state or ran off the edge:
		        if ((startI - i < 0) || (centerJ - i < 0) || stateCount[1] > maxCount) {
		            return false;
		        }
		        // Continue up, left finding black border
		        while ((startI - i >= 0) && (centerJ - i >= 0) && get(centerJ - i, startI - i) && stateCount[0] <= maxCount) {
		            stateCount[0]++;
		            i++;
		        }
		        if (stateCount[0] > maxCount) {
		            return false;
		        }
		        // Now also count down, right from center
		        i = 1;
		        while ((startI + i < maxI) && (centerJ + i < maxJ) && get(centerJ + i, startI + i)) {
		            stateCount[2]++;
		            i++;
		        }
		        // Ran off the edge?
		        if ((startI + i >= maxI) || (centerJ + i >= maxJ)) {
		            return false;
		        }
		        while ((startI + i < maxI) && (centerJ + i < maxJ) && !get(centerJ + i, startI + i) && stateCount[3] < maxCount) {
		            stateCount[3]++;
		            i++;
		        }
		        if ((startI + i >= maxI) || (centerJ + i >= maxJ) || stateCount[3] >= maxCount) {
		            return false;
		        }
		        while ((startI + i < maxI) && (centerJ + i < maxJ) && get(centerJ + i, startI + i) && stateCount[4] < maxCount) {
		            stateCount[4]++;
		            i++;
		        }
		        if (stateCount[4] >= maxCount) {
		            return false;
		        }
		        // If we found a finder-pattern-like section, but its size is more than 100% different than
		        // the original, assume it's a false positive
		        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
		        return Math.abs(stateCountTotal - originalStateCountTotal) < 2 * originalStateCountTotal &&
		            foundPatternCross(stateCount);
		    }
		    function crossCheckVertical(startI, centerJ, maxCount, originalStateCountTotal) {
		        var maxI = matrix.height;
		        var stateCount = [0, 0, 0, 0, 0];
		        // Start counting up from center
		        var i = startI;
		        while (i >= 0 && get(centerJ, i)) {
		            stateCount[2]++;
		            i--;
		        }
		        if (i < 0) {
		            return null;
		        }
		        while (i >= 0 && !get(centerJ, i) && stateCount[1] <= maxCount) {
		            stateCount[1]++;
		            i--;
		        }
		        // If already too many modules in this state or ran off the edge:
		        if (i < 0 || stateCount[1] > maxCount) {
		            return null;
		        }
		        while (i >= 0 && get(centerJ, i) && stateCount[0] <= maxCount) {
		            stateCount[0]++;
		            i--;
		        }
		        if (stateCount[0] > maxCount) {
		            return null;
		        }
		        // Now also count down from center
		        i = startI + 1;
		        while (i < maxI && get(centerJ, i)) {
		            stateCount[2]++;
		            i++;
		        }
		        if (i == maxI) {
		            return null;
		        }
		        while (i < maxI && !get(centerJ, i) && stateCount[3] < maxCount) {
		            stateCount[3]++;
		            i++;
		        }
		        if (i == maxI || stateCount[3] >= maxCount) {
		            return null;
		        }
		        while (i < maxI && get(centerJ, i) && stateCount[4] < maxCount) {
		            stateCount[4]++;
		            i++;
		        }
		        if (stateCount[4] >= maxCount) {
		            return null;
		        }
		        // If we found a finder-pattern-like section, but its size is more than 40% different than
		        // the original, assume it's a false positive
		        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
		        if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
		            return null;
		        }
		        return foundPatternCross(stateCount) ? centerFromEnd(stateCount, i) : null;
		    }
		    function haveMultiplyConfirmedCenters() {
		        var confirmedCount = 0;
		        var totalModuleSize = 0;
		        var max = possibleCenters.length;
		        possibleCenters.forEach(function (pattern) {
		            if (pattern.count >= CENTER_QUORUM) {
		                confirmedCount++;
		                totalModuleSize += pattern.estimatedModuleSize;
		            }
		        });
		        if (confirmedCount < 3) {
		            return false;
		        }
		        // OK, we have at least 3 confirmed centers, but, it's possible that one is a "false positive"
		        // and that we need to keep looking. We detect this by asking if the estimated module sizes
		        // vary too much. We arbitrarily say that when the total deviation from average exceeds
		        // 5% of the total module size estimates, it's too much.
		        var average = totalModuleSize / max;
		        var totalDeviation = 0;
		        for (var i = 0; i < max; i++) {
		            var pattern = possibleCenters[i];
		            totalDeviation += Math.abs(pattern.estimatedModuleSize - average);
		        }
		        return totalDeviation <= 0.05 * totalModuleSize;
		    }
		    function crossCheckHorizontal(startJ, centerI, maxCount, originalStateCountTotal) {
		        var maxJ = matrix.width;
		        var stateCount = [0, 0, 0, 0, 0];
		        var j = startJ;
		        while (j >= 0 && get(j, centerI)) {
		            stateCount[2]++;
		            j--;
		        }
		        if (j < 0) {
		            return null;
		        }
		        while (j >= 0 && !get(j, centerI) && stateCount[1] <= maxCount) {
		            stateCount[1]++;
		            j--;
		        }
		        if (j < 0 || stateCount[1] > maxCount) {
		            return null;
		        }
		        while (j >= 0 && get(j, centerI) && stateCount[0] <= maxCount) {
		            stateCount[0]++;
		            j--;
		        }
		        if (stateCount[0] > maxCount) {
		            return null;
		        }
		        j = startJ + 1;
		        while (j < maxJ && get(j, centerI)) {
		            stateCount[2]++;
		            j++;
		        }
		        if (j == maxJ) {
		            return null;
		        }
		        while (j < maxJ && !get(j, centerI) && stateCount[3] < maxCount) {
		            stateCount[3]++;
		            j++;
		        }
		        if (j == maxJ || stateCount[3] >= maxCount) {
		            return null;
		        }
		        while (j < maxJ && get(j, centerI) && stateCount[4] < maxCount) {
		            stateCount[4]++;
		            j++;
		        }
		        if (stateCount[4] >= maxCount) {
		            return null;
		        }
		        // If we found a finder-pattern-like section, but its size is significantly different than
		        // the original, assume it's a false positive
		        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
		        if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
		            return null;
		        }
		        return foundPatternCross(stateCount) ? centerFromEnd(stateCount, j) : null;
		    }
		    function handlePossibleCenter(stateCount, i, j, pureBarcode) {
		        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
		        var centerJ = centerFromEnd(stateCount, j);
		        if (centerJ == null)
		            return false;
		        var centerI = crossCheckVertical(i, Math.floor(centerJ), stateCount[2], stateCountTotal);
		        if (centerI != null) {
		            // Re-cross check
		            centerJ = crossCheckHorizontal(Math.floor(centerJ), Math.floor(centerI), stateCount[2], stateCountTotal);
		            if (centerJ != null && (!pureBarcode || crossCheckDiagonal(Math.floor(centerI), Math.floor(centerJ), stateCount[2], stateCountTotal))) {
		                var estimatedModuleSize = stateCountTotal / 7;
		                var found = false;
		                for (var index = 0; index < possibleCenters.length; index++) {
		                    var center = possibleCenters[index];
		                    // Look for about the same center and module size:
		                    if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
		                        possibleCenters.splice(index, 1, center.combineEstimate(centerI, centerJ, estimatedModuleSize));
		                        found = true;
		                        break;
		                    }
		                }
		                if (!found) {
		                    // var point = new FinderPattern(centerJ.Value, centerI.Value, estimatedModuleSize);
		                    var point = new FinderPattern(centerJ, centerI, estimatedModuleSize);
		                    possibleCenters.push(point);
		                }
		                return true;
		            }
		        }
		        return false;
		    }
		    function findRowSkip() {
		        var max = possibleCenters.length;
		        if (max <= 1) {
		            return 0;
		        }
		        var firstConfirmedCenter = null;
		        possibleCenters.forEach(function (center) {
		            if (center.count >= CENTER_QUORUM) {
		                if (firstConfirmedCenter == null) {
		                    firstConfirmedCenter = center;
		                }
		                else {
		                    // We have two confirmed centers
		                    // How far down can we skip before resuming looking for the next
		                    // pattern? In the worst case, only the difference between the
		                    // difference in the x / y coordinates of the two centers.
		                    // This is the case where you find top left last.
		                    hasSkipped = true;
		                    //UPGRADE_WARNING: Data types in Visual C# might be different.  Verify the accuracy of narrowing conversions. "ms-help://MS.VSCC.v80/dv_commoner/local/redirect.htm?index='!DefaultContextWindowIndex'&keyword='jlca1042'"
		                    return Math.floor(Math.abs(firstConfirmedCenter.x - center.x) - Math.abs(firstConfirmedCenter.y - center.y)) / 2;
		                }
		            }
		        });
		        return 0;
		    }
		    function selectBestPatterns() {
		        var startSize = possibleCenters.length;
		        if (startSize < 3) {
		            // Couldn't find enough finder patterns
		            return null;
		        }
		        // Filter outlier possibilities whose module size is too different
		        if (startSize > 3) {
		            // But we can only afford to do so if we have at least 4 possibilities to choose from
		            var totalModuleSize = 0;
		            var square = 0;
		            possibleCenters.forEach(function (center) {
		                var size = center.estimatedModuleSize;
		                totalModuleSize += size;
		                square += size * size;
		            });
		            var average = totalModuleSize / startSize;
		            var stdDev = Math.sqrt(square / startSize - average * average);
		            //possibleCenters.Sort(new FurthestFromAverageComparator(average));
		            possibleCenters.sort(function (x, y) {
		                var dA = Math.abs(y.estimatedModuleSize - average);
		                var dB = Math.abs(x.estimatedModuleSize - average);
		                return dA < dB ? -1 : dA == dB ? 0 : 1;
		            });
		            var limit = Math.max(0.2 * average, stdDev);
		            for (var i = 0; i < possibleCenters.length && possibleCenters.length > 3; i++) {
		                var pattern = possibleCenters[i];
		                if (Math.abs(pattern.estimatedModuleSize - average) > limit) {
		                    possibleCenters.splice(i, 1);
		                    ///possibleCenters.RemoveAt(i);
		                    i--;
		                }
		            }
		        }
		        if (possibleCenters.length > 3) {
		            // Throw away all but those first size candidate points we found.
		            var totalModuleSize = 0;
		            possibleCenters.forEach(function (possibleCenter) {
		                totalModuleSize += possibleCenter.estimatedModuleSize;
		            });
		            var average = totalModuleSize / possibleCenters.length;
		            // possibleCenters.Sort(new CenterComparator(average));
		            possibleCenters.sort(function (x, y) {
		                if (y.count === x.count) {
		                    var dA = Math.abs(y.estimatedModuleSize - average);
		                    var dB = Math.abs(x.estimatedModuleSize - average);
		                    return dA < dB ? 1 : dA == dB ? 0 : -1;
		                }
		                return y.count - x.count;
		            });
		            //possibleCenters.subList(3, possibleCenters.Count).clear();
		            ///possibleCenters = possibleCenters.GetRange(0, 3);
		            possibleCenters = possibleCenters.slice(0, 3);
		        }
		        return [possibleCenters[0], possibleCenters[1], possibleCenters[2]];
		    }
		    var pureBarcode = false;
		    var maxI = matrix.height;
		    var maxJ = matrix.width;
		    var iSkip = Math.floor((3 * maxI) / (4 * MAX_MODULES));
		    if (iSkip < MIN_SKIP || false) {
		        iSkip = MIN_SKIP;
		    }
		    var done = false;
		    var stateCount = [0, 0, 0, 0, 0];
		    for (var i = iSkip - 1; i < maxI && !done; i += iSkip) {
		        stateCount = [0, 0, 0, 0, 0];
		        var currentState = 0;
		        for (var j = 0; j < maxJ; j++) {
		            if (get(j, i)) {
		                // Black pixel
		                if ((currentState & 1) === 1) {
		                    currentState++;
		                }
		                stateCount[currentState]++;
		            }
		            else {
		                // White pixel
		                if ((currentState & 1) === 0) {
		                    // Counting black pixels
		                    if (currentState === 4) {
		                        // A winner?
		                        if (foundPatternCross(stateCount)) {
		                            // Yes
		                            var confirmed = handlePossibleCenter(stateCount, i, j, pureBarcode);
		                            if (confirmed) {
		                                // Start examining every other line. Checking each line turned out to be too
		                                // expensive and didn't improve performance.
		                                iSkip = 2;
		                                if (hasSkipped) {
		                                    done = haveMultiplyConfirmedCenters();
		                                }
		                                else {
		                                    var rowSkip = findRowSkip();
		                                    if (rowSkip > stateCount[2]) {
		                                        // Skip rows between row of lower confirmed center
		                                        // and top of presumed third confirmed center
		                                        // but back up a bit to get a full chance of detecting
		                                        // it, entire width of center of finder pattern
		                                        // Skip by rowSkip, but back off by stateCount[2] (size of last center
		                                        // of pattern we saw) to be conservative, and also back off by iSkip which
		                                        // is about to be re-added
		                                        i += rowSkip - stateCount[2] - iSkip;
		                                        j = maxJ - 1;
		                                    }
		                                }
		                            }
		                            else {
		                                stateCount = [stateCount[2], stateCount[3], stateCount[4], 1, 0];
		                                currentState = 3;
		                                continue;
		                            }
		                            // Clear state to start looking again
		                            stateCount = [0, 0, 0, 0, 0];
		                            currentState = 0;
		                        }
		                        else {
		                            stateCount = [stateCount[2], stateCount[3], stateCount[4], 1, 0];
		                            currentState = 3;
		                        }
		                    }
		                    else {
		                        // Should I really have copy/pasted this fuckery?
		                        stateCount[++currentState]++;
		                    }
		                }
		                else {
		                    // Counting the white pixels
		                    stateCount[currentState]++;
		                }
		            }
		        }
		        if (foundPatternCross(stateCount)) {
		            var confirmed = handlePossibleCenter(stateCount, i, maxJ, pureBarcode);
		            if (confirmed) {
		                iSkip = stateCount[0];
		                if (hasSkipped) {
		                    // Found a third one
		                    done = haveMultiplyConfirmedCenters();
		                }
		            }
		        }
		    }
		    var patternInfo = selectBestPatterns();
		    if (!patternInfo)
		        return null;
		    return ReorderFinderPattern(patternInfo);
		}
		exports.locate = locate;


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		/// <reference path="../common/types.d.ts" />
		var alignment_finder_1 = __webpack_require__(5);
		var perspective_transform_1 = __webpack_require__(7);
		var version_1 = __webpack_require__(8);
		var bitmatrix_1 = __webpack_require__(2);
		var helpers_1 = __webpack_require__(6);
		function checkAndNudgePoints(width, height, points) {
		    // Check and nudge points from start until we see some that are OK:
		    var nudged = true;
		    for (var offset = 0; offset < points.length && nudged; offset += 2) {
		        var x = Math.floor(points[offset]);
		        var y = Math.floor(points[offset + 1]);
		        if (x < -1 || x > width || y < -1 || y > height) {
		            throw new Error();
		        }
		        nudged = false;
		        if (x == -1) {
		            points[offset] = 0;
		            nudged = true;
		        }
		        else if (x == width) {
		            points[offset] = width - 1;
		            nudged = true;
		        }
		        if (y == -1) {
		            points[offset + 1] = 0;
		            nudged = true;
		        }
		        else if (y == height) {
		            points[offset + 1] = height - 1;
		            nudged = true;
		        }
		    }
		    // Check and nudge points from end:
		    nudged = true;
		    for (var offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
		        var x = Math.floor(points[offset]);
		        var y = Math.floor(points[offset + 1]);
		        if (x < -1 || x > width || y < -1 || y > height) {
		            throw new Error();
		        }
		        nudged = false;
		        if (x == -1) {
		            points[offset] = 0;
		            nudged = true;
		        }
		        else if (x == width) {
		            points[offset] = width - 1;
		            nudged = true;
		        }
		        if (y == -1) {
		            points[offset + 1] = 0;
		            nudged = true;
		        }
		        else if (y == height) {
		            points[offset + 1] = height - 1;
		            nudged = true;
		        }
		    }
		    return points;
		}
		function bitArrayFromImage(image, dimension, transform) {
		    if (dimension <= 0) {
		        return null;
		    }
		    var bits = bitmatrix_1.BitMatrix.createEmpty(dimension, dimension);
		    var points = new Array(dimension << 1);
		    for (var y = 0; y < dimension; y++) {
		        var max = points.length;
		        var iValue = y + 0.5;
		        for (var x = 0; x < max; x += 2) {
		            points[x] = (x >> 1) + 0.5;
		            points[x + 1] = iValue;
		        }
		        points = perspective_transform_1.transformPoints(transform, points);
		        // Quick check to see if points transformed to something inside the image;
		        // sufficient to check the endpoints
		        try {
		            var nudgedPoints = checkAndNudgePoints(image.width, image.height, points);
		        }
		        catch (e) {
		            return null;
		        }
		        // try {
		        for (var x = 0; x < max; x += 2) {
		            bits.set(x >> 1, y, image.get(Math.floor(nudgedPoints[x]), Math.floor(nudgedPoints[x + 1])));
		        }
		    }
		    return bits;
		}
		function createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension) {
		    var dimMinusThree = dimension - 3.5;
		    var bottomRightX;
		    var bottomRightY;
		    var sourceBottomRightX;
		    var sourceBottomRightY;
		    if (alignmentPattern != null) {
		        bottomRightX = alignmentPattern.x;
		        bottomRightY = alignmentPattern.y;
		        sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3;
		    }
		    else {
		        // Don't have an alignment pattern, just make up the bottom-right point
		        bottomRightX = (topRight.x - topLeft.x) + bottomLeft.x;
		        bottomRightY = (topRight.y - topLeft.y) + bottomLeft.y;
		        sourceBottomRightX = sourceBottomRightY = dimMinusThree;
		    }
		    return perspective_transform_1.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRightX, bottomRightY, bottomLeft.x, bottomLeft.y);
		}
		// Taken from 6th grade algebra
		function distance(x1, y1, x2, y2) {
		    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		}
		// Attempts to locate an alignment pattern in a limited region of the image, which is guessed to contain it.
		// overallEstModuleSize - estimated module size so far
		// estAlignmentX        - coordinate of center of area probably containing alignment pattern
		// estAlignmentY        - y coordinate of above</param>
		// allowanceFactor      - number of pixels in all directions to search from the center</param>
		function findAlignmentInRegion(overallEstModuleSize, estAlignmentX, estAlignmentY, allowanceFactor, image) {
		    estAlignmentX = Math.floor(estAlignmentX);
		    estAlignmentY = Math.floor(estAlignmentY);
		    // Look for an alignment pattern (3 modules in size) around where it should be
		    var allowance = Math.floor(allowanceFactor * overallEstModuleSize);
		    var alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance);
		    var alignmentAreaRightX = Math.min(image.width, estAlignmentX + allowance);
		    if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
		        return null;
		    }
		    var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance);
		    var alignmentAreaBottomY = Math.min(image.height - 1, estAlignmentY + allowance);
		    return alignment_finder_1.findAlignment(alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, image);
		}
		// Computes the dimension (number of modules on a size) of the QR Code based on the position of the finder
		// patterns and estimated module size.
		function computeDimension(topLeft, topRight, bottomLeft, moduleSize) {
		    var tltrCentersDimension = Math.round(distance(topLeft.x, topLeft.y, topRight.x, topRight.y) / moduleSize);
		    var tlblCentersDimension = Math.round(distance(topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y) / moduleSize);
		    var dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7;
		    switch (dimension & 0x03) {
		        // mod 4
		        case 0:
		            dimension++;
		            break;
		        // 1? do nothing
		        case 2:
		            dimension--;
		            break;
		    }
		    return dimension;
		}
		// Deduces version information purely from QR Code dimensions.
		// http://chan.catiewayne.com/z/src/131044167276.jpg
		function getProvisionalVersionForDimension(dimension) {
		    if (dimension % 4 != 1) {
		        return null;
		    }
		    var versionNumber = (dimension - 17) >> 2;
		    if (versionNumber < 1 || versionNumber > 40) {
		        return null;
		    }
		    return version_1.getVersionForNumber(versionNumber);
		}
		// This method traces a line from a point in the image, in the direction towards another point.
		// It begins in a black region, and keeps going until it finds white, then black, then white again.
		// It reports the distance from the start to this point.</p>
		//
		// This is used when figuring out how wide a finder pattern is, when the finder pattern
		// may be skewed or rotated.
		function sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY, image) {
		    fromX = Math.floor(fromX);
		    fromY = Math.floor(fromY);
		    toX = Math.floor(toX);
		    toY = Math.floor(toY);
		    // Mild variant of Bresenham's algorithm;
		    // see http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
		    var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
		    if (steep) {
		        var temp = fromX;
		        fromX = fromY;
		        fromY = temp;
		        temp = toX;
		        toX = toY;
		        toY = temp;
		    }
		    var dx = Math.abs(toX - fromX);
		    var dy = Math.abs(toY - fromY);
		    var error = -dx >> 1;
		    var xstep = fromX < toX ? 1 : -1;
		    var ystep = fromY < toY ? 1 : -1;
		    // In black pixels, looking for white, first or second time.
		    var state = 0;
		    // Loop up until x == toX, but not beyond
		    var xLimit = toX + xstep;
		    for (var x = fromX, y = fromY; x != xLimit; x += xstep) {
		        var realX = steep ? y : x;
		        var realY = steep ? x : y;
		        // Does current pixel mean we have moved white to black or vice versa?
		        // Scanning black in state 0,2 and white in state 1, so if we find the wrong
		        // color, advance to next state or end if we are in state 2 already
		        if ((state == 1) === image.get(realX, realY)) {
		            if (state == 2) {
		                return distance(x, y, fromX, fromY);
		            }
		            state++;
		        }
		        error += dy;
		        if (error > 0) {
		            if (y == toY) {
		                break;
		            }
		            y += ystep;
		            error -= dx;
		        }
		    }
		    // Found black-white-black; give the benefit of the doubt that the next pixel outside the image
		    // is "white" so this last point at (toX+xStep,toY) is the right ending. This is really a
		    // small approximation; (toX+xStep,toY+yStep) might be really correct. Ignore this.
		    if (state == 2) {
		        return distance(toX + xstep, toY, fromX, fromY);
		    }
		    // else we didn't find even black-white-black; no estimate is really possible
		    return NaN;
		}
		// Computes the total width of a finder pattern by looking for a black-white-black run from the center
		// in the direction of another point (another finder pattern center), and in the opposite direction too.
		function sizeOfBlackWhiteBlackRunBothWays(fromX, fromY, toX, toY, image) {
		    var result = sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY, image);
		    // Now count other way -- don't run off image though of course
		    var scale = 1;
		    var otherToX = fromX - (toX - fromX);
		    if (otherToX < 0) {
		        scale = fromX / (fromX - otherToX);
		        otherToX = 0;
		    }
		    else if (otherToX >= image.width) {
		        scale = (image.width - 1 - fromX) / (otherToX - fromX);
		        otherToX = image.width - 1;
		    }
		    var otherToY = (fromY - (toY - fromY) * scale);
		    scale = 1;
		    if (otherToY < 0) {
		        scale = fromY / (fromY - otherToY);
		        otherToY = 0;
		    }
		    else if (otherToY >= image.height) {
		        scale = (image.height - 1 - fromY) / (otherToY - fromY);
		        otherToY = image.height - 1;
		    }
		    otherToX = (fromX + (otherToX - fromX) * scale);
		    result += sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY, image);
		    return result - 1; // -1 because we counted the middle pixel twice
		}
		function calculateModuleSizeOneWay(pattern, otherPattern, image) {
		    var moduleSizeEst1 = sizeOfBlackWhiteBlackRunBothWays(pattern.x, pattern.y, otherPattern.x, otherPattern.y, image);
		    var moduleSizeEst2 = sizeOfBlackWhiteBlackRunBothWays(otherPattern.x, otherPattern.y, pattern.x, pattern.y, image);
		    if (helpers_1.isNaN(moduleSizeEst1)) {
		        return moduleSizeEst2 / 7;
		    }
		    if (helpers_1.isNaN(moduleSizeEst2)) {
		        return moduleSizeEst1 / 7;
		    }
		    // Average them, and divide by 7 since we've counted the width of 3 black modules,
		    // and 1 white and 1 black module on either side. Ergo, divide sum by 14.
		    return (moduleSizeEst1 + moduleSizeEst2) / 14;
		}
		// Computes an average estimated module size based on estimated derived from the positions of the three finder patterns.
		function calculateModuleSize(topLeft, topRight, bottomLeft, image) {
		    return (calculateModuleSizeOneWay(topLeft, topRight, image) + calculateModuleSizeOneWay(topLeft, bottomLeft, image)) / 2;
		}
		function extract(image, location) {
		    var moduleSize = calculateModuleSize(location.topLeft, location.topRight, location.bottomLeft, image);
		    if (moduleSize < 1) {
		        return null;
		    }
		    var dimension = computeDimension(location.topLeft, location.topRight, location.bottomLeft, moduleSize);
		    if (!dimension) {
		        return null;
		    }
		    var provisionalVersion = getProvisionalVersionForDimension(dimension);
		    if (provisionalVersion == null) {
		        return null;
		    }
		    var modulesBetweenFPCenters = provisionalVersion.getDimensionForVersion() - 7;
		    var alignmentPattern = null;
		    // Anything above version 1 has an alignment pattern
		    if (provisionalVersion.alignmentPatternCenters.length > 0) {
		        // Guess where a "bottom right" finder pattern would have been
		        var bottomRightX = location.topRight.x - location.topLeft.x + location.bottomLeft.x;
		        var bottomRightY = location.topRight.y - location.topLeft.y + location.bottomLeft.y;
		        // Estimate that alignment pattern is closer by 3 modules
		        // from "bottom right" to known top left location
		        var correctionToTopLeft = 1 - 3 / modulesBetweenFPCenters;
		        var estAlignmentX = location.topLeft.x + correctionToTopLeft * (bottomRightX - location.topLeft.x);
		        var estAlignmentY = location.topLeft.y + correctionToTopLeft * (bottomRightY - location.topLeft.y);
		        // Kind of arbitrary -- expand search radius before giving up
		        for (var i = 4; i <= 16; i <<= 1) {
		            alignmentPattern = findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY, i, image);
		            if (!alignmentPattern) {
		                continue;
		            }
		            break;
		        }
		    }
		    var transform = createTransform(location.topLeft, location.topRight, location.bottomLeft, alignmentPattern, dimension);
		    return bitArrayFromImage(image, dimension, transform);
		}
		exports.extract = extract;


	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var helpers_1 = __webpack_require__(6);
		function aboutEquals(center, moduleSize, i, j) {
		    if (Math.abs(i - center.y) <= moduleSize && Math.abs(j - center.x) <= moduleSize) {
		        var moduleSizeDiff = Math.abs(moduleSize - center.estimatedModuleSize);
		        return moduleSizeDiff <= 1 || moduleSizeDiff <= center.estimatedModuleSize;
		    }
		    return false;
		}
		function combineEstimate(center, i, j, newModuleSize) {
		    var combinedX = (center.x + j) / 2;
		    var combinedY = (center.y + i) / 2;
		    var combinedModuleSize = (center.estimatedModuleSize + newModuleSize) / 2;
		    return { x: combinedX, y: combinedY, estimatedModuleSize: combinedModuleSize };
		}
		// returns true if the proportions of the counts is close enough to the 1/1/1 ratios used by alignment
		// patterns to be considered a match
		function foundPatternCross(stateCount, moduleSize) {
		    var maxVariance = moduleSize / 2;
		    for (var i = 0; i < 3; i++) {
		        if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) {
		            return false;
		        }
		    }
		    return true;
		}
		// Given a count of black/white/black pixels just seen and an end position,
		// figures the location of the center of this black/white/black run.
		function centerFromEnd(stateCount, end) {
		    var result = (end - stateCount[2]) - stateCount[1] / 2;
		    if (helpers_1.isNaN(result)) {
		        return null;
		    }
		    return result;
		}
		// After a horizontal scan finds a potential alignment pattern, this method
		// "cross-checks" by scanning down vertically through the center of the possible
		// alignment pattern to see if the same proportion is detected.</p>
		//
		// startI - row where an alignment pattern was detected</param>
		// centerJ - center of the section that appears to cross an alignment pattern</param>
		// maxCount - maximum reasonable number of modules that should be observed in any reading state, based
		//   on the results of the horizontal scan</param>
		// originalStateCountTotal - The original state count total
		function crossCheckVertical(startI, centerJ, maxCount, originalStateCountTotal, moduleSize, image) {
		    var maxI = image.height;
		    var stateCount = [0, 0, 0];
		    // Start counting up from center
		    var i = startI;
		    while (i >= 0 && image.get(centerJ, i) && stateCount[1] <= maxCount) {
		        stateCount[1]++;
		        i--;
		    }
		    // If already too many modules in this state or ran off the edge:
		    if (i < 0 || stateCount[1] > maxCount) {
		        return null;
		    }
		    while (i >= 0 && !image.get(centerJ, i) && stateCount[0] <= maxCount) {
		        stateCount[0]++;
		        i--;
		    }
		    if (stateCount[0] > maxCount) {
		        return null;
		    }
		    // Now also count down from center
		    i = startI + 1;
		    while (i < maxI && image.get(centerJ, i) && stateCount[1] <= maxCount) {
		        stateCount[1]++;
		        i++;
		    }
		    if (i == maxI || stateCount[1] > maxCount) {
		        return null;
		    }
		    while (i < maxI && !image.get(centerJ, i) && stateCount[2] <= maxCount) {
		        stateCount[2]++;
		        i++;
		    }
		    if (stateCount[2] > maxCount) {
		        return null;
		    }
		    var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
		    if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
		        return null;
		    }
		    return foundPatternCross(stateCount, moduleSize) ? centerFromEnd(stateCount, i) : null;
		}
		function findAlignment(startX, startY, width, height, moduleSize, image) {
		    // Global State :(
		    var possibleCenters = [];
		    // This is called when a horizontal scan finds a possible alignment pattern. It will
		    // cross check with a vertical scan, and if successful, will see if this pattern had been
		    // found on a previous horizontal scan. If so, we consider it confirmed and conclude we have
		    // found the alignment pattern.</p>
		    //
		    // stateCount - reading state module counts from horizontal scan
		    // i - where alignment pattern may be found
		    // j - end of possible alignment pattern in row
		    function handlePossibleCenter(stateCount, i, j, moduleSize) {
		        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
		        var centerJ = centerFromEnd(stateCount, j);
		        if (centerJ == null) {
		            return null;
		        }
		        var centerI = crossCheckVertical(i, Math.floor(centerJ), 2 * stateCount[1], stateCountTotal, moduleSize, image);
		        if (centerI != null) {
		            var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3;
		            for (var i2 in possibleCenters) {
		                var center = possibleCenters[i2];
		                // Look for about the same center and module size:
		                if (aboutEquals(center, estimatedModuleSize, centerI, centerJ)) {
		                    return combineEstimate(center, centerI, centerJ, estimatedModuleSize);
		                }
		            }
		            // Hadn't found this before; save it
		            var point = { x: centerJ, y: centerI, estimatedModuleSize: estimatedModuleSize };
		            possibleCenters.push(point);
		        }
		        return null;
		    }
		    var maxJ = startX + width;
		    var middleI = startY + (height >> 1);
		    // We are looking for black/white/black modules in 1:1:1 ratio;
		    // this tracks the number of black/white/black modules seen so far
		    var stateCount = [0, 0, 0]; // WTF
		    for (var iGen = 0; iGen < height; iGen++) {
		        // Search from middle outwards
		        var i = middleI + ((iGen & 0x01) == 0 ? ((iGen + 1) >> 1) : -((iGen + 1) >> 1));
		        stateCount[0] = 0;
		        stateCount[1] = 0;
		        stateCount[2] = 0;
		        var j = startX;
		        // Burn off leading white pixels before anything else; if we start in the middle of
		        // a white run, it doesn't make sense to count its length, since we don't know if the
		        // white run continued to the left of the start point
		        while (j < maxJ && !image.get(j, i)) {
		            j++;
		        }
		        var currentState = 0;
		        while (j < maxJ) {
		            if (image.get(j, i)) {
		                // Black pixel
		                if (currentState == 1) {
		                    // Counting black pixels
		                    stateCount[currentState]++;
		                }
		                else {
		                    // Counting white pixels
		                    if (currentState == 2) {
		                        // A winner?
		                        if (foundPatternCross(stateCount, moduleSize)) {
		                            // Yes
		                            confirmed = handlePossibleCenter(stateCount, i, j, moduleSize);
		                            if (confirmed != null) {
		                                return confirmed;
		                            }
		                        }
		                        stateCount[0] = stateCount[2];
		                        stateCount[1] = 1;
		                        stateCount[2] = 0;
		                        currentState = 1;
		                    }
		                    else {
		                        stateCount[++currentState]++;
		                    }
		                }
		            }
		            else {
		                // White pixel
		                if (currentState == 1) {
		                    // Counting black pixels
		                    currentState++;
		                }
		                stateCount[currentState]++;
		            }
		            j++;
		        }
		        if (foundPatternCross(stateCount, moduleSize)) {
		            var confirmed = handlePossibleCenter(stateCount, i, moduleSize, maxJ);
		            if (confirmed != null) {
		                return confirmed;
		            }
		        }
		    }
		    // Hmm, nothing we saw was observed and confirmed twice. If we had
		    // any guess at all, return it.
		    if (possibleCenters.length != 0) {
		        return possibleCenters[0];
		    }
		    return null;
		}
		exports.findAlignment = findAlignment;


	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		"use strict";
		var BITS_SET_IN_HALF_BYTE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
		function numBitsDiffering(a, b) {
		    a ^= b; // a now has a 1 bit exactly where its bit differs with b's
		    // Count bits set quickly with a series of lookups:
		    return BITS_SET_IN_HALF_BYTE[a & 0x0F] +
		        BITS_SET_IN_HALF_BYTE[((a >> 4) & 0x0F)] +
		        BITS_SET_IN_HALF_BYTE[((a >> 8) & 0x0F)] +
		        BITS_SET_IN_HALF_BYTE[((a >> 12) & 0x0F)] +
		        BITS_SET_IN_HALF_BYTE[((a >> 16) & 0x0F)] +
		        BITS_SET_IN_HALF_BYTE[((a >> 20) & 0x0F)] +
		        BITS_SET_IN_HALF_BYTE[((a >> 24) & 0x0F)] +
		        BITS_SET_IN_HALF_BYTE[((a >> 28) & 0x0F)];
		}
		exports.numBitsDiffering = numBitsDiffering;
		// Taken from underscore JS
		function isNaN(obj) {
		    return Object.prototype.toString.call(obj) === '[object Number]' && obj !== +obj;
		}
		exports.isNaN = isNaN;


	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		/// <reference path="../common/types.d.ts" />
		"use strict";
		function squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3) {
		    var dx3 = x0 - x1 + x2 - x3;
		    var dy3 = y0 - y1 + y2 - y3;
		    if (dx3 == 0 && dy3 == 0) {
		        // Affine
		        return {
		            a11: x1 - x0,
		            a21: x2 - x1,
		            a31: x0,
		            a12: y1 - y0,
		            a22: y2 - y1,
		            a32: y0,
		            a13: 0,
		            a23: 0,
		            a33: 1
		        };
		    }
		    else {
		        var dx1 = x1 - x2;
		        var dx2 = x3 - x2;
		        var dy1 = y1 - y2;
		        var dy2 = y3 - y2;
		        var denominator = dx1 * dy2 - dx2 * dy1;
		        var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
		        var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
		        return {
		            a11: x1 - x0 + a13 * x1,
		            a21: x3 - x0 + a23 * x3,
		            a31: x0,
		            a12: y1 - y0 + a13 * y1,
		            a22: y3 - y0 + a23 * y3,
		            a32: y0,
		            a13: a13,
		            a23: a23,
		            a33: 1
		        };
		    }
		}
		function buildAdjoint(i) {
		    return {
		        a11: i.a22 * i.a33 - i.a23 * i.a32,
		        a21: i.a23 * i.a31 - i.a21 * i.a33,
		        a31: i.a21 * i.a32 - i.a22 * i.a31,
		        a12: i.a13 * i.a32 - i.a12 * i.a33,
		        a22: i.a11 * i.a33 - i.a13 * i.a31,
		        a32: i.a12 * i.a31 - i.a11 * i.a32,
		        a13: i.a12 * i.a23 - i.a13 * i.a22,
		        a23: i.a13 * i.a21 - i.a11 * i.a23,
		        a33: i.a11 * i.a22 - i.a12 * i.a21
		    };
		}
		function times(a, b) {
		    return {
		        a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
		        a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
		        a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
		        a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
		        a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
		        a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
		        a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
		        a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
		        a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
		    };
		}
		function quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3) {
		    // Here, the adjoint serves as the inverse:
		    return buildAdjoint(squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3));
		}
		function transformPoints(transform, points) {
		    var max = points.length;
		    var a11 = transform.a11;
		    var a12 = transform.a12;
		    var a13 = transform.a13;
		    var a21 = transform.a21;
		    var a22 = transform.a22;
		    var a23 = transform.a23;
		    var a31 = transform.a31;
		    var a32 = transform.a32;
		    var a33 = transform.a33;
		    for (var i = 0; i < max; i += 2) {
		        var x = points[i];
		        var y = points[i + 1];
		        var denominator = a13 * x + a23 * y + a33;
		        points[i] = (a11 * x + a21 * y + a31) / denominator;
		        points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
		    }
		    return points;
		}
		exports.transformPoints = transformPoints;
		function quadrilateralToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3, x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p) {
		    var qToS = quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3);
		    var sToQ = squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
		    return times(sToQ, qToS);
		}
		exports.quadrilateralToQuadrilateral = quadrilateralToQuadrilateral;


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var helpers_1 = __webpack_require__(6);
		var VERSION_DECODE_INFO = [
		    0x07C94, 0x085BC, 0x09A99, 0x0A4D3, 0x0BBF6,
		    0x0C762, 0x0D847, 0x0E60D, 0x0F928, 0x10B78,
		    0x1145D, 0x12A17, 0x13532, 0x149A6, 0x15683,
		    0x168C9, 0x177EC, 0x18EC4, 0x191E1, 0x1AFAB,
		    0x1B08E, 0x1CC1A, 0x1D33F, 0x1ED75, 0x1F250,
		    0x209D5, 0x216F0, 0x228BA, 0x2379F, 0x24B0B,
		    0x2542E, 0x26A64, 0x27541, 0x28C69,
		];
		var ECB = (function () {
		    function ECB(_count, _dataCodewords) {
		        this.count = _count;
		        this.dataCodewords = _dataCodewords;
		    }
		    return ECB;
		}());
		var ECBlocks = (function () {
		    function ECBlocks(_ecCodewordsPerBlock) {
		        var _ecBlocks = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            _ecBlocks[_i - 1] = arguments[_i];
		        }
		        this.ecCodewordsPerBlock = _ecCodewordsPerBlock;
		        this.ecBlocks = _ecBlocks;
		    }
		    ECBlocks.prototype.getNumBlocks = function () {
		        return this.ecBlocks.reduce(function (a, b) { return (a + b.count); }, 0);
		    };
		    ECBlocks.prototype.getTotalECCodewords = function () {
		        return this.ecCodewordsPerBlock * this.getNumBlocks();
		    };
		    return ECBlocks;
		}());
		var Version = (function () {
		    function Version(_versionNumber, _alignmentPatternCenters) {
		        var _ecBlocks = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            _ecBlocks[_i - 2] = arguments[_i];
		        }
		        this.versionNumber = _versionNumber;
		        this.alignmentPatternCenters = _alignmentPatternCenters;
		        this.ecBlocks = _ecBlocks;
		        var total = 0;
		        var ecCodewords = this.ecBlocks[0].ecCodewordsPerBlock;
		        var ecbArray = this.ecBlocks[0].ecBlocks;
		        ecbArray.forEach(function (ecBlock) {
		            total += ecBlock.count * (ecBlock.dataCodewords + ecCodewords);
		        });
		        this.totalCodewords = total;
		    }
		    Version.prototype.getDimensionForVersion = function () {
		        return 17 + 4 * this.versionNumber;
		    };
		    Version.prototype.getECBlocksForLevel = function (ecLevel) {
		        return this.ecBlocks[ecLevel.ordinal];
		    };
		    Version.decodeVersionInformation = function (versionBits) {
		        var bestDifference = Infinity;
		        var bestVersion = 0;
		        for (var i = 0; i < VERSION_DECODE_INFO.length; i++) {
		            var targetVersion = VERSION_DECODE_INFO[i];
		            // Do the version info bits match exactly? done.
		            if (targetVersion == versionBits) {
		                return getVersionForNumber(i + 7);
		            }
		            // Otherwise see if this is the closest to a real version info bit string
		            // we have seen so far
		            var bitsDifference = helpers_1.numBitsDiffering(versionBits, targetVersion);
		            if (bitsDifference < bestDifference) {
		                bestVersion = i + 7;
		                bestDifference = bitsDifference;
		            }
		        }
		        // We can tolerate up to 3 bits of error since no two version info codewords will
		        // differ in less than 8 bits.
		        if (bestDifference <= 3) {
		            return getVersionForNumber(bestVersion);
		        }
		        // If we didn't find a close enough match, fail
		        return null;
		    };
		    return Version;
		}());
		exports.Version = Version;
		var VERSIONS = [
		    new Version(1, [], new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))),
		    new Version(2, [6, 18], new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))),
		    new Version(3, [6, 22], new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))),
		    new Version(4, [6, 26], new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))),
		    new Version(5, [6, 30], new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))),
		    new Version(6, [6, 34], new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))),
		    new Version(7, [6, 22, 38], new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))),
		    new Version(8, [6, 24, 42], new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))),
		    new Version(9, [6, 26, 46], new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))),
		    new Version(10, [6, 28, 50], new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))),
		    new Version(11, [6, 30, 54], new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))),
		    new Version(12, [6, 32, 58], new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))),
		    new Version(13, [6, 34, 62], new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))),
		    new Version(14, [6, 26, 46, 66], new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))),
		    new Version(15, [6, 26, 48, 70], new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))),
		    new Version(16, [6, 26, 50, 74], new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))),
		    new Version(17, [6, 30, 54, 78], new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))),
		    new Version(18, [6, 30, 56, 82], new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))),
		    new Version(19, [6, 30, 58, 86], new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))),
		    new Version(20, [6, 34, 62, 90], new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))),
		    new Version(21, [6, 28, 50, 72, 94], new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))),
		    new Version(22, [6, 26, 50, 74, 98], new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))),
		    new Version(23, [6, 30, 54, 74, 102], new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))),
		    new Version(24, [6, 28, 54, 80, 106], new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))),
		    new Version(25, [6, 32, 58, 84, 110], new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))),
		    new Version(26, [6, 30, 58, 86, 114], new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))),
		    new Version(27, [6, 34, 62, 90, 118], new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15), new ECB(28, 16))),
		    new Version(28, [6, 26, 50, 74, 98, 122], new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))),
		    new Version(29, [6, 30, 54, 78, 102, 126], new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))),
		    new Version(30, [6, 26, 52, 78, 104, 130], new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))),
		    new Version(31, [6, 30, 56, 82, 108, 134], new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))),
		    new Version(32, [6, 34, 60, 86, 112, 138], new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))),
		    new Version(33, [6, 30, 58, 86, 114, 142], new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))),
		    new Version(34, [6, 34, 62, 90, 118, 146], new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))),
		    new Version(35, [6, 30, 54, 78, 102, 126, 150], new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))),
		    new Version(36, [6, 24, 50, 76, 102, 128, 154], new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))),
		    new Version(37, [6, 28, 54, 80, 106, 132, 158], new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))),
		    new Version(38, [6, 32, 58, 84, 110, 136, 162], new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))),
		    new Version(39, [6, 26, 54, 82, 110, 138, 166], new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))),
		    new Version(40, [6, 30, 58, 86, 114, 142, 170], new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16))),
		];
		function getVersionForNumber(versionNumber) {
		    if (versionNumber < 1 || versionNumber > 40) {
		        throw new Error("Invalid version number " + versionNumber);
		    }
		    return VERSIONS[versionNumber - 1];
		}
		exports.getVersionForNumber = getVersionForNumber;


	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var bitmatrix_1 = __webpack_require__(2);
		var decodeqrdata_1 = __webpack_require__(10);
		var helpers_1 = __webpack_require__(6);
		var reedsolomon_1 = __webpack_require__(12);
		var version_1 = __webpack_require__(8);
		var FORMAT_INFO_MASK_QR = 0x5412;
		var FORMAT_INFO_DECODE_LOOKUP = [
		    [0x5412, 0x00],
		    [0x5125, 0x01],
		    [0x5E7C, 0x02],
		    [0x5B4B, 0x03],
		    [0x45F9, 0x04],
		    [0x40CE, 0x05],
		    [0x4F97, 0x06],
		    [0x4AA0, 0x07],
		    [0x77C4, 0x08],
		    [0x72F3, 0x09],
		    [0x7DAA, 0x0A],
		    [0x789D, 0x0B],
		    [0x662F, 0x0C],
		    [0x6318, 0x0D],
		    [0x6C41, 0x0E],
		    [0x6976, 0x0F],
		    [0x1689, 0x10],
		    [0x13BE, 0x11],
		    [0x1CE7, 0x12],
		    [0x19D0, 0x13],
		    [0x0762, 0x14],
		    [0x0255, 0x15],
		    [0x0D0C, 0x16],
		    [0x083B, 0x17],
		    [0x355F, 0x18],
		    [0x3068, 0x19],
		    [0x3F31, 0x1A],
		    [0x3A06, 0x1B],
		    [0x24B4, 0x1C],
		    [0x2183, 0x1D],
		    [0x2EDA, 0x1E],
		    [0x2BED, 0x1F],
		];
		var DATA_MASKS = [
		    function (i, j) { return ((i + j) & 0x01) === 0; },
		    function (i, j) { return (i & 0x01) === 0; },
		    function (i, j) { return j % 3 == 0; },
		    function (i, j) { return (i + j) % 3 === 0; },
		    function (i, j) { return (((i >> 1) + (j / 3)) & 0x01) === 0; },
		    function (i, j) { return ((i * j) & 0x01) + ((i * j) % 3) === 0; },
		    function (i, j) { return ((((i * j) & 0x01) + ((i * j) % 3)) & 0x01) === 0; },
		    function (i, j) { return ((((i + j) & 0x01) + ((i * j) % 3)) & 0x01) === 0; },
		];
		var ERROR_CORRECTION_LEVELS = [
		    { ordinal: 1, bits: 0x00, name: "M" },
		    { ordinal: 0, bits: 0x01, name: "L" },
		    { ordinal: 3, bits: 0x02, name: "H" },
		    { ordinal: 2, bits: 0x03, name: "Q" },
		];
		function buildFunctionPattern(version) {
		    var dimension = version.getDimensionForVersion();
		    var emptyArray = new Array(dimension * dimension);
		    for (var i = 0; i < emptyArray.length; i++) {
		        emptyArray[i] = false;
		    }
		    var bitMatrix = new bitmatrix_1.BitMatrix(emptyArray, dimension);
		    ///BitMatrix bitMatrix = new BitMatrix(dimension);
		    // Top left finder pattern + separator + format
		    bitMatrix.setRegion(0, 0, 9, 9);
		    // Top right finder pattern + separator + format
		    bitMatrix.setRegion(dimension - 8, 0, 8, 9);
		    // Bottom left finder pattern + separator + format
		    bitMatrix.setRegion(0, dimension - 8, 9, 8);
		    // Alignment patterns
		    var max = version.alignmentPatternCenters.length;
		    for (var x = 0; x < max; x++) {
		        var i = version.alignmentPatternCenters[x] - 2;
		        for (var y = 0; y < max; y++) {
		            if ((x == 0 && (y == 0 || y == max - 1)) || (x == max - 1 && y == 0)) {
		                // No alignment patterns near the three finder paterns
		                continue;
		            }
		            bitMatrix.setRegion(version.alignmentPatternCenters[y] - 2, i, 5, 5);
		        }
		    }
		    // Vertical timing pattern
		    bitMatrix.setRegion(6, 9, 1, dimension - 17);
		    // Horizontal timing pattern
		    bitMatrix.setRegion(9, 6, dimension - 17, 1);
		    if (version.versionNumber > 6) {
		        // Version info, top right
		        bitMatrix.setRegion(dimension - 11, 0, 3, 6);
		        // Version info, bottom left
		        bitMatrix.setRegion(0, dimension - 11, 6, 3);
		    }
		    return bitMatrix;
		}
		function readCodewords(matrix, version, formatInfo) {
		    // Get the data mask for the format used in this QR Code. This will exclude
		    // some bits from reading as we wind through the bit matrix.
		    var dataMask = DATA_MASKS[formatInfo.dataMask];
		    var dimension = matrix.height;
		    var funcPattern = buildFunctionPattern(version);
		    var readingUp = true;
		    var result = [];
		    var resultOffset = 0;
		    var currentByte = 0;
		    var bitsRead = 0;
		    // Read columns in pairs, from right to left
		    for (var j = dimension - 1; j > 0; j -= 2) {
		        if (j == 6) {
		            // Skip whole column with vertical alignment pattern;
		            // saves time and makes the other code proceed more cleanly
		            j--;
		        }
		        // Read alternatingly from bottom to top then top to bottom
		        for (var count = 0; count < dimension; count++) {
		            var i = readingUp ? dimension - 1 - count : count;
		            for (var col = 0; col < 2; col++) {
		                // Ignore bits covered by the function pattern
		                if (!funcPattern.get(j - col, i)) {
		                    // Read a bit
		                    bitsRead++;
		                    currentByte <<= 1;
		                    if (matrix.get(j - col, i) !== dataMask(i, j - col)) {
		                        currentByte |= 1;
		                    }
		                    // If we've made a whole byte, save it off
		                    if (bitsRead == 8) {
		                        result[resultOffset++] = currentByte & 0xFF;
		                        bitsRead = 0;
		                        currentByte = 0;
		                    }
		                }
		            }
		        }
		        readingUp = !readingUp; // switch directions
		    }
		    if (resultOffset != version.totalCodewords) {
		        return null;
		    }
		    return result;
		}
		function readVersion(matrix) {
		    var dimension = matrix.height;
		    var provisionalVersion = (dimension - 17) >> 2;
		    if (provisionalVersion <= 6) {
		        return version_1.getVersionForNumber(provisionalVersion);
		    }
		    // Read top-right version info: 3 wide by 6 tall
		    var versionBits = 0;
		    var ijMin = dimension - 11;
		    for (var j = 5; j >= 0; j--) {
		        for (var i = dimension - 9; i >= ijMin; i--) {
		            versionBits = matrix.copyBit(i, j, versionBits);
		        }
		    }
		    var parsedVersion = version_1.Version.decodeVersionInformation(versionBits);
		    if (parsedVersion != null && parsedVersion.getDimensionForVersion() == dimension) {
		        return parsedVersion;
		    }
		    // Hmm, failed. Try bottom left: 6 wide by 3 tall
		    versionBits = 0;
		    for (var i = 5; i >= 0; i--) {
		        for (var j = dimension - 9; j >= ijMin; j--) {
		            versionBits = matrix.copyBit(i, j, versionBits);
		        }
		    }
		    parsedVersion = version_1.Version.decodeVersionInformation(versionBits);
		    if (parsedVersion != null && parsedVersion.getDimensionForVersion() == dimension) {
		        return parsedVersion;
		    }
		    return null;
		}
		function newFormatInformation(formatInfo) {
		    return {
		        errorCorrectionLevel: ERROR_CORRECTION_LEVELS[(formatInfo >> 3) & 0x03],
		        dataMask: formatInfo & 0x07
		    };
		}
		function doDecodeFormatInformation(maskedFormatInfo1, maskedFormatInfo2) {
		    // Find the int in FORMAT_INFO_DECODE_LOOKUP with fewest bits differing
		    var bestDifference = Infinity;
		    var bestFormatInfo = 0;
		    for (var i = 0; i < FORMAT_INFO_DECODE_LOOKUP.length; i++) {
		        var decodeInfo = FORMAT_INFO_DECODE_LOOKUP[i];
		        var targetInfo = decodeInfo[0];
		        if (targetInfo == maskedFormatInfo1 || targetInfo == maskedFormatInfo2) {
		            // Found an exact match
		            return newFormatInformation(decodeInfo[1]);
		        }
		        var bitsDifference = helpers_1.numBitsDiffering(maskedFormatInfo1, targetInfo);
		        if (bitsDifference < bestDifference) {
		            bestFormatInfo = decodeInfo[1];
		            bestDifference = bitsDifference;
		        }
		        if (maskedFormatInfo1 != maskedFormatInfo2) {
		            // also try the other option
		            bitsDifference = helpers_1.numBitsDiffering(maskedFormatInfo2, targetInfo);
		            if (bitsDifference < bestDifference) {
		                bestFormatInfo = decodeInfo[1];
		                bestDifference = bitsDifference;
		            }
		        }
		    }
		    // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits
		    // differing means we found a match
		    if (bestDifference <= 3)
		        return newFormatInformation(bestFormatInfo);
		    return null;
		}
		function decodeFormatInformation(maskedFormatInfo1, maskedFormatInfo2) {
		    var formatInfo = doDecodeFormatInformation(maskedFormatInfo1, maskedFormatInfo2);
		    if (formatInfo) {
		        return formatInfo;
		    }
		    // Should return null, but, some QR codes apparently
		    // do not mask this info. Try again by actually masking the pattern
		    // first
		    return doDecodeFormatInformation(maskedFormatInfo1 ^ FORMAT_INFO_MASK_QR, maskedFormatInfo2 ^ FORMAT_INFO_MASK_QR);
		}
		function readFormatInformation(matrix) {
		    // Read top-left format info bits
		    var formatInfoBits1 = 0;
		    for (var i = 0; i < 6; i++) {
		        formatInfoBits1 = matrix.copyBit(i, 8, formatInfoBits1);
		    }
		    // .. and skip a bit in the timing pattern ...
		    formatInfoBits1 = matrix.copyBit(7, 8, formatInfoBits1);
		    formatInfoBits1 = matrix.copyBit(8, 8, formatInfoBits1);
		    formatInfoBits1 = matrix.copyBit(8, 7, formatInfoBits1);
		    // .. and skip a bit in the timing pattern ...
		    for (var j = 5; j >= 0; j--) {
		        formatInfoBits1 = matrix.copyBit(8, j, formatInfoBits1);
		    }
		    // Read the top-right/bottom-left pattern too
		    var dimension = matrix.height;
		    var formatInfoBits2 = 0;
		    var jMin = dimension - 7;
		    for (var j = dimension - 1; j >= jMin; j--) {
		        formatInfoBits2 = matrix.copyBit(8, j, formatInfoBits2);
		    }
		    for (var i = dimension - 8; i < dimension; i++) {
		        formatInfoBits2 = matrix.copyBit(i, 8, formatInfoBits2);
		    }
		    // parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits1, formatInfoBits2);
		    var parsedFormatInfo = decodeFormatInformation(formatInfoBits1, formatInfoBits2);
		    if (parsedFormatInfo != null) {
		        return parsedFormatInfo;
		    }
		    return null;
		}
		function getDataBlocks(rawCodewords, version, ecLevel) {
		    if (rawCodewords.length != version.totalCodewords) {
		        throw new Error("Invalid number of codewords for version; got " + rawCodewords.length + " expected " + version.totalCodewords);
		    }
		    // Figure out the number and size of data blocks used by this version and
		    // error correction level
		    var ecBlocks = version.getECBlocksForLevel(ecLevel);
		    // First count the total number of data blocks
		    var totalBlocks = 0;
		    var ecBlockArray = ecBlocks.ecBlocks;
		    ecBlockArray.forEach(function (ecBlock) {
		        totalBlocks += ecBlock.count;
		    });
		    // Now establish DataBlocks of the appropriate size and number of data codewords
		    var result = new Array(totalBlocks);
		    var numResultBlocks = 0;
		    ecBlockArray.forEach(function (ecBlock) {
		        for (var i = 0; i < ecBlock.count; i++) {
		            var numDataCodewords = ecBlock.dataCodewords;
		            var numBlockCodewords = ecBlocks.ecCodewordsPerBlock + numDataCodewords;
		            result[numResultBlocks++] = { numDataCodewords: numDataCodewords, codewords: new Array(numBlockCodewords) };
		        }
		    });
		    // All blocks have the same amount of data, except that the last n
		    // (where n may be 0) have 1 more byte. Figure out where these start.
		    var shorterBlocksTotalCodewords = result[0].codewords.length;
		    var longerBlocksStartAt = result.length - 1;
		    while (longerBlocksStartAt >= 0) {
		        var numCodewords = result[longerBlocksStartAt].codewords.length;
		        if (numCodewords == shorterBlocksTotalCodewords) {
		            break;
		        }
		        longerBlocksStartAt--;
		    }
		    longerBlocksStartAt++;
		    var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.ecCodewordsPerBlock;
		    // The last elements of result may be 1 element longer;
		    // first fill out as many elements as all of them have
		    var rawCodewordsOffset = 0;
		    for (var i = 0; i < shorterBlocksNumDataCodewords; i++) {
		        for (var j = 0; j < numResultBlocks; j++) {
		            result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
		        }
		    }
		    // Fill out the last data block in the longer ones
		    for (var j = longerBlocksStartAt; j < numResultBlocks; j++) {
		        result[j].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
		    }
		    // Now add in error correction blocks
		    var max = result[0].codewords.length;
		    for (var i = shorterBlocksNumDataCodewords; i < max; i++) {
		        for (var j = 0; j < numResultBlocks; j++) {
		            var iOffset = j < longerBlocksStartAt ? i : i + 1;
		            result[j].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
		        }
		    }
		    return result;
		}
		function correctErrors(codewordBytes, numDataCodewords) {
		    var rsDecoder = new reedsolomon_1.ReedSolomonDecoder();
		    var numCodewords = codewordBytes.length;
		    // First read into an array of ints
		    var codewordsInts = new Array(numCodewords);
		    for (var i = 0; i < numCodewords; i++) {
		        codewordsInts[i] = codewordBytes[i] & 0xFF;
		    }
		    var numECCodewords = codewordBytes.length - numDataCodewords;
		    if (!rsDecoder.decode(codewordsInts, numECCodewords))
		        return false;
		    // Copy back into array of bytes -- only need to worry about the bytes that were data
		    // We don't care about errors in the error-correction codewords
		    for (var i = 0; i < numDataCodewords; i++) {
		        codewordBytes[i] = codewordsInts[i];
		    }
		    return true;
		}
		function decodeMatrix(matrix) {
		    var version = readVersion(matrix);
		    if (!version) {
		        return null;
		    }
		    var formatInfo = readFormatInformation(matrix);
		    if (!formatInfo) {
		        return null;
		    }
		    var ecLevel = formatInfo.errorCorrectionLevel;
		    // Read codewords
		    var codewords = readCodewords(matrix, version, formatInfo);
		    if (!codewords) {
		        return null;
		    }
		    // Separate into data blocks
		    var dataBlocks = getDataBlocks(codewords, version, ecLevel);
		    // Count total number of data bytes
		    var totalBytes = 0;
		    dataBlocks.forEach(function (dataBlock) {
		        totalBytes += dataBlock.numDataCodewords;
		    });
		    var resultBytes = new Array(totalBytes);
		    var resultOffset = 0;
		    // Error-correct and copy data blocks together into a stream of bytes
		    for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
		        var dataBlock = dataBlocks_1[_i];
		        var codewordBytes = dataBlock.codewords;
		        var numDataCodewords = dataBlock.numDataCodewords;
		        if (!correctErrors(codewordBytes, numDataCodewords))
		            return null;
		        for (var i = 0; i < numDataCodewords; i++) {
		            resultBytes[resultOffset++] = codewordBytes[i];
		        }
		    }
		    return decodeqrdata_1.decodeQRdata(resultBytes, version.versionNumber, ecLevel.name);
		}
		function decode(matrix) {
		    if (matrix == null) {
		        return null;
		    }
		    var result = decodeMatrix(matrix);
		    if (result) {
		        return result;
		    }
		    // Decoding didn't work, try mirroring the QR
		    matrix.mirror();
		    return decodeMatrix(matrix);
		}
		exports.decode = decode;


	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";
		var bitstream_1 = __webpack_require__(11);
		function toAlphaNumericByte(value) {
		    var ALPHANUMERIC_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B',
		        'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
		        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		        ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
		    if (value >= ALPHANUMERIC_CHARS.length) {
		        throw new Error("Could not decode alphanumeric char");
		    }
		    return ALPHANUMERIC_CHARS[value].charCodeAt(0);
		}
		var Mode = (function () {
		    function Mode(characterCountBitsForVersions, bits) {
		        this.characterCountBitsForVersions = characterCountBitsForVersions;
		        this.bits = bits;
		    }
		    Mode.prototype.getCharacterCountBits = function (version) {
		        if (this.characterCountBitsForVersions == null) {
		            throw new Error("Character count doesn't apply to this mode");
		        }
		        var offset;
		        if (version <= 9) {
		            offset = 0;
		        }
		        else if (version <= 26) {
		            offset = 1;
		        }
		        else {
		            offset = 2;
		        }
		        return this.characterCountBitsForVersions[offset];
		    };
		    return Mode;
		}());
		var TERMINATOR_MODE = new Mode([0, 0, 0], 0x00); // Not really a mod...
		var NUMERIC_MODE = new Mode([10, 12, 14], 0x01);
		var ALPHANUMERIC_MODE = new Mode([9, 11, 13], 0x02);
		var STRUCTURED_APPEND_MODE = new Mode([0, 0, 0], 0x03); // Not supported
		var BYTE_MODE = new Mode([8, 16, 16], 0x04);
		var ECI_MODE = new Mode(null, 0x07); // character counts don't apply
		var KANJI_MODE = new Mode([8, 10, 12], 0x08);
		var FNC1_FIRST_POSITION_MODE = new Mode(null, 0x05);
		var FNC1_SECOND_POSITION_MODE = new Mode(null, 0x09);
		var HANZI_MODE = new Mode([8, 10, 12], 0x0D);
		function modeForBits(bits) {
		    switch (bits) {
		        case 0x0:
		            return TERMINATOR_MODE;
		        case 0x1:
		            return NUMERIC_MODE;
		        case 0x2:
		            return ALPHANUMERIC_MODE;
		        case 0x3:
		            return STRUCTURED_APPEND_MODE;
		        case 0x4:
		            return BYTE_MODE;
		        case 0x5:
		            return FNC1_FIRST_POSITION_MODE;
		        case 0x7:
		            return ECI_MODE;
		        case 0x8:
		            return KANJI_MODE;
		        case 0x9:
		            return FNC1_SECOND_POSITION_MODE;
		        case 0xD:
		            // 0xD is defined in GBT 18284-2000, may not be supported in foreign country
		            return HANZI_MODE;
		        default:
		            throw new Error("Couldn't decode mode from byte array");
		    }
		}
		function parseECIValue(bits) {
		    var firstByte = bits.readBits(8);
		    if ((firstByte & 0x80) == 0) {
		        // just one byte
		        return firstByte & 0x7F;
		    }
		    if ((firstByte & 0xC0) == 0x80) {
		        // two bytes
		        var secondByte = bits.readBits(8);
		        return ((firstByte & 0x3F) << 8) | secondByte;
		    }
		    if ((firstByte & 0xE0) == 0xC0) {
		        // three bytes
		        var secondThirdBytes = bits.readBits(16);
		        return ((firstByte & 0x1F) << 16) | secondThirdBytes;
		    }
		    throw new Error("Bad ECI bits starting with byte " + firstByte);
		}
		function decodeHanziSegment(bits, result, count) {
		    // Don't crash trying to read more bits than we have available.
		    if (count * 13 > bits.available()) {
		        return false;
		    }
		    // Each character will require 2 bytes. Read the characters as 2-byte pairs
		    // and decode as GB2312 afterwards
		    var buffer = new Array(2 * count);
		    var offset = 0;
		    while (count > 0) {
		        // Each 13 bits encodes a 2-byte character
		        var twoBytes = bits.readBits(13);
		        var assembledTwoBytes = (Math.floor(twoBytes / 0x060) << 8) | (twoBytes % 0x060);
		        if (assembledTwoBytes < 0x003BF) {
		            // In the 0xA1A1 to 0xAAFE range
		            assembledTwoBytes += 0x0A1A1;
		        }
		        else {
		            // In the 0xB0A1 to 0xFAFE range
		            assembledTwoBytes += 0x0A6A1;
		        }
		        buffer[offset] = ((assembledTwoBytes >> 8) & 0xFF);
		        buffer[offset + 1] = (assembledTwoBytes & 0xFF);
		        offset += 2;
		        count--;
		    }
		    result.val = buffer;
		    return true;
		}
		function decodeNumericSegment(bits, result, count) {
		    // Read three digits at a time
		    while (count >= 3) {
		        // Each 10 bits encodes three digits
		        if (bits.available() < 10) {
		            return false;
		        }
		        var threeDigitsBits = bits.readBits(10);
		        if (threeDigitsBits >= 1000) {
		            return false;
		        }
		        result.val.push(toAlphaNumericByte(Math.floor(threeDigitsBits / 100)));
		        result.val.push(toAlphaNumericByte(Math.floor(threeDigitsBits / 10) % 10));
		        result.val.push(toAlphaNumericByte(threeDigitsBits % 10));
		        count -= 3;
		    }
		    if (count == 2) {
		        // Two digits left over to read, encoded in 7 bits
		        if (bits.available() < 7) {
		            return false;
		        }
		        var twoDigitsBits = bits.readBits(7);
		        if (twoDigitsBits >= 100) {
		            return false;
		        }
		        result.val.push(toAlphaNumericByte(Math.floor(twoDigitsBits / 10)));
		        result.val.push(toAlphaNumericByte(twoDigitsBits % 10));
		    }
		    else if (count == 1) {
		        // One digit left over to read
		        if (bits.available() < 4) {
		            return false;
		        }
		        var digitBits = bits.readBits(4);
		        if (digitBits >= 10) {
		            return false;
		        }
		        result.val.push(toAlphaNumericByte(digitBits));
		    }
		    return true;
		}
		function decodeAlphanumericSegment(bits, result, count, fc1InEffect) {
		    // Read two characters at a time
		    var start = result.val.length;
		    while (count > 1) {
		        if (bits.available() < 11) {
		            return false;
		        }
		        var nextTwoCharsBits = bits.readBits(11);
		        result.val.push(toAlphaNumericByte(Math.floor(nextTwoCharsBits / 45)));
		        result.val.push(toAlphaNumericByte(nextTwoCharsBits % 45));
		        count -= 2;
		    }
		    if (count == 1) {
		        // special case: one character left
		        if (bits.available() < 6) {
		            return false;
		        }
		        result.val.push(toAlphaNumericByte(bits.readBits(6)));
		    }
		    // See section 6.4.8.1, 6.4.8.2
		    if (fc1InEffect) {
		        // We need to massage the result a bit if in an FNC1 mode:
		        for (var i = start; i < result.val.length; i++) {
		            if (result.val[i] == '%'.charCodeAt(0)) {
		                if (i < result.val.length - 1 && result.val[i + 1] == '%'.charCodeAt(0)) {
		                    // %% is rendered as %
		                    result.val = result.val.slice(0, i + 1).concat(result.val.slice(i + 2));
		                }
		                else {
		                    // In alpha mode, % should be converted to FNC1 separator 0x1D
		                    // THIS IS ALMOST CERTAINLY INVALID
		                    result.val[i] = 0x1D;
		                }
		            }
		        }
		    }
		    return true;
		}
		function decodeByteSegment(bits, result, count) {
		    // Don't crash trying to read more bits than we have available.
		    if (count << 3 > bits.available()) {
		        return false;
		    }
		    var readBytes = new Array(count);
		    for (var i = 0; i < count; i++) {
		        readBytes[i] = bits.readBits(8);
		    }
		    Array.prototype.push.apply(result.val, readBytes);
		    return true;
		}
		var GB2312_SUBSET = 1;
		// Takes in a byte array, a qr version number and an error correction level.
		// Returns decoded data.
		function decodeQRdata(data, version, ecl) {
		    var symbolSequence = -1;
		    var parityData = -1;
		    var bits = new bitstream_1.BitStream(data);
		    var result = { val: [] }; // Have to pass this around so functions can share a reference to a number[]
		    var fc1InEffect = false;
		    var mode;
		    while (mode != TERMINATOR_MODE) {
		        // While still another segment to read...
		        if (bits.available() < 4) {
		            // OK, assume we're done. Really, a TERMINATOR mode should have been recorded here
		            mode = TERMINATOR_MODE;
		        }
		        else {
		            mode = modeForBits(bits.readBits(4)); // mode is encoded by 4 bits
		        }
		        if (mode != TERMINATOR_MODE) {
		            if (mode == FNC1_FIRST_POSITION_MODE || mode == FNC1_SECOND_POSITION_MODE) {
		                // We do little with FNC1 except alter the parsed result a bit according to the spec
		                fc1InEffect = true;
		            }
		            else if (mode == STRUCTURED_APPEND_MODE) {
		                if (bits.available() < 16) {
		                    return null;
		                }
		                // not really supported; but sequence number and parity is added later to the result metadata
		                // Read next 8 bits (symbol sequence #) and 8 bits (parity data), then continue
		                symbolSequence = bits.readBits(8);
		                parityData = bits.readBits(8);
		            }
		            else if (mode == ECI_MODE) {
		                // Ignore since we don't do character encoding in JS
		                var value = parseECIValue(bits);
		                if (value < 0 || value > 30) {
		                    return null;
		                }
		            }
		            else {
		                // First handle Hanzi mode which does not start with character count
		                if (mode == HANZI_MODE) {
		                    //chinese mode contains a sub set indicator right after mode indicator
		                    var subset = bits.readBits(4);
		                    var countHanzi = bits.readBits(mode.getCharacterCountBits(version));
		                    if (subset == GB2312_SUBSET) {
		                        if (!decodeHanziSegment(bits, result, countHanzi)) {
		                            return null;
		                        }
		                    }
		                }
		                else {
		                    // "Normal" QR code modes:
		                    // How many characters will follow, encoded in this mode?
		                    var count = bits.readBits(mode.getCharacterCountBits(version));
		                    if (mode == NUMERIC_MODE) {
		                        if (!decodeNumericSegment(bits, result, count)) {
		                            return null;
		                        }
		                    }
		                    else if (mode == ALPHANUMERIC_MODE) {
		                        if (!decodeAlphanumericSegment(bits, result, count, fc1InEffect)) {
		                            return null;
		                        }
		                    }
		                    else if (mode == BYTE_MODE) {
		                        if (!decodeByteSegment(bits, result, count)) {
		                            return null;
		                        }
		                    }
		                    else if (mode == KANJI_MODE) {
		                    }
		                    else {
		                        return null;
		                    }
		                }
		            }
		        }
		    }
		    return result.val;
		}
		exports.decodeQRdata = decodeQRdata;


	/***/ },
	/* 11 */
	/***/ function(module, exports) {

		"use strict";
		var BitStream = (function () {
		    function BitStream(bytes) {
		        this.byteOffset = 0;
		        this.bitOffset = 0;
		        this.bytes = bytes;
		    }
		    BitStream.prototype.readBits = function (numBits) {
		        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
		            throw new Error("Cannot read " + numBits.toString() + " bits");
		        }
		        var result = 0;
		        // First, read remainder from current byte
		        if (this.bitOffset > 0) {
		            var bitsLeft = 8 - this.bitOffset;
		            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
		            var bitsToNotRead = bitsLeft - toRead;
		            var mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
		            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
		            numBits -= toRead;
		            this.bitOffset += toRead;
		            if (this.bitOffset == 8) {
		                this.bitOffset = 0;
		                this.byteOffset++;
		            }
		        }
		        // Next read whole bytes
		        if (numBits > 0) {
		            while (numBits >= 8) {
		                result = (result << 8) | (this.bytes[this.byteOffset] & 0xFF);
		                this.byteOffset++;
		                numBits -= 8;
		            }
		            // Finally read a partial byte
		            if (numBits > 0) {
		                var bitsToNotRead = 8 - numBits;
		                var mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
		                result = (result << numBits) | ((this.bytes[this.byteOffset] & mask) >> bitsToNotRead);
		                this.bitOffset += numBits;
		            }
		        }
		        return result;
		    };
		    BitStream.prototype.available = function () {
		        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
		    };
		    return BitStream;
		}());
		exports.BitStream = BitStream;


	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		"use strict";
		var ReedSolomonDecoder = (function () {
		    function ReedSolomonDecoder() {
		        this.field = new GenericGF(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
		    }
		    ReedSolomonDecoder.prototype.decode = function (received, twoS) {
		        var poly = new GenericGFPoly(this.field, received);
		        var syndromeCoefficients = new Array(twoS);
		        var noError = true;
		        for (var i = 0; i < twoS; i++) {
		            var evaluation = poly.evaluateAt(this.field.exp(i + this.field.generatorBase));
		            syndromeCoefficients[syndromeCoefficients.length - 1 - i] = evaluation;
		            if (evaluation != 0) {
		                noError = false;
		            }
		        }
		        if (noError) {
		            return true;
		        }
		        var syndrome = new GenericGFPoly(this.field, syndromeCoefficients);
		        var sigmaOmega = this.runEuclideanAlgorithm(this.field.buildMonomial(twoS, 1), syndrome, twoS);
		        if (sigmaOmega == null)
		            return false;
		        var sigma = sigmaOmega[0];
		        var errorLocations = this.findErrorLocations(sigma);
		        if (errorLocations == null)
		            return false;
		        var omega = sigmaOmega[1];
		        var errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations);
		        for (var i = 0; i < errorLocations.length; i++) {
		            var position = received.length - 1 - this.field.log(errorLocations[i]);
		            if (position < 0) {
		                // throw new ReedSolomonException("Bad error location");
		                return false;
		            }
		            received[position] = GenericGF.addOrSubtract(received[position], errorMagnitudes[i]);
		        }
		        return true;
		    };
		    ReedSolomonDecoder.prototype.runEuclideanAlgorithm = function (a, b, R) {
		        // Assume a's degree is >= b's
		        if (a.degree() < b.degree()) {
		            var temp = a;
		            a = b;
		            b = temp;
		        }
		        var rLast = a;
		        var r = b;
		        var tLast = this.field.zero;
		        var t = this.field.one;
		        // Run Euclidean algorithm until r's degree is less than R/2
		        while (r.degree() >= R / 2) {
		            var rLastLast = rLast;
		            var tLastLast = tLast;
		            rLast = r;
		            tLast = t;
		            // Divide rLastLast by rLast, with quotient in q and remainder in r
		            if (rLast.isZero()) {
		                // Oops, Euclidean algorithm already terminated?
		                // throw new ReedSolomonException("r_{i-1} was zero");
		                return null;
		            }
		            r = rLastLast;
		            var q = this.field.zero;
		            var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
		            var dltInverse = this.field.inverse(denominatorLeadingTerm);
		            while (r.degree() >= rLast.degree() && !r.isZero()) {
		                var degreeDiff = r.degree() - rLast.degree();
		                var scale = this.field.multiply(r.getCoefficient(r.degree()), dltInverse);
		                q = q.addOrSubtract(this.field.buildMonomial(degreeDiff, scale));
		                r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
		            }
		            t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
		            if (r.degree() >= rLast.degree()) {
		                // throw new IllegalStateException("Division algorithm failed to reduce polynomial?");
		                return null;
		            }
		        }
		        var sigmaTildeAtZero = t.getCoefficient(0);
		        if (sigmaTildeAtZero == 0) {
		            // throw new ReedSolomonException("sigmaTilde(0) was zero");
		            return null;
		        }
		        var inverse = this.field.inverse(sigmaTildeAtZero);
		        var sigma = t.multiply(inverse);
		        var omega = r.multiply(inverse);
		        return [sigma, omega];
		    };
		    ReedSolomonDecoder.prototype.findErrorLocations = function (errorLocator) {
		        // This is a direct application of Chien's search
		        var numErrors = errorLocator.degree();
		        if (numErrors == 1) {
		            // shortcut
		            return [errorLocator.getCoefficient(1)];
		        }
		        var result = new Array(numErrors);
		        var e = 0;
		        for (var i = 1; i < this.field.size && e < numErrors; i++) {
		            if (errorLocator.evaluateAt(i) == 0) {
		                result[e] = this.field.inverse(i);
		                e++;
		            }
		        }
		        if (e != numErrors) {
		            // throw new ReedSolomonException("Error locator degree does not match number of roots");
		            return null;
		        }
		        return result;
		    };
		    ReedSolomonDecoder.prototype.findErrorMagnitudes = function (errorEvaluator, errorLocations) {
		        // This is directly applying Forney's Formula
		        var s = errorLocations.length;
		        var result = new Array(s);
		        for (var i = 0; i < s; i++) {
		            var xiInverse = this.field.inverse(errorLocations[i]);
		            var denominator = 1;
		            for (var j = 0; j < s; j++) {
		                if (i != j) {
		                    //denominator = field.multiply(denominator,
		                    //    GenericGF.addOrSubtract(1, field.multiply(errorLocations[j], xiInverse)));
		                    // Above should work but fails on some Apple and Linux JDKs due to a Hotspot bug.
		                    // Below is a funny-looking workaround from Steven Parkes
		                    var term = this.field.multiply(errorLocations[j], xiInverse);
		                    var termPlus1 = (term & 0x1) == 0 ? term | 1 : term & ~1;
		                    denominator = this.field.multiply(denominator, termPlus1);
		                }
		            }
		            result[i] = this.field.multiply(errorEvaluator.evaluateAt(xiInverse), this.field.inverse(denominator));
		            if (this.field.generatorBase != 0) {
		                result[i] = this.field.multiply(result[i], xiInverse);
		            }
		        }
		        return result;
		    };
		    return ReedSolomonDecoder;
		}());
		exports.ReedSolomonDecoder = ReedSolomonDecoder;
		var GenericGFPoly = (function () {
		    function GenericGFPoly(field, coefficients) {
		        if (coefficients.length == 0) {
		            throw new Error("No coefficients.");
		        }
		        this.field = field;
		        var coefficientsLength = coefficients.length;
		        if (coefficientsLength > 1 && coefficients[0] == 0) {
		            // Leading term must be non-zero for anything except the constant polynomial "0"
		            var firstNonZero = 1;
		            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] == 0) {
		                firstNonZero++;
		            }
		            if (firstNonZero == coefficientsLength) {
		                this.coefficients = field.zero.coefficients;
		            }
		            else {
		                this.coefficients = new Array(coefficientsLength - firstNonZero);
		                /*Array.Copy(coefficients,       // Source array
		                  firstNonZero,              // Source index
		                  this.coefficients,         // Destination array
		                  0,                         // Destination index
		                  this.coefficients.length); // length*/
		                for (var i = 0; i < this.coefficients.length; i++) {
		                    this.coefficients[i] = coefficients[firstNonZero + i];
		                }
		            }
		        }
		        else {
		            this.coefficients = coefficients;
		        }
		    }
		    GenericGFPoly.prototype.evaluateAt = function (a) {
		        var result = 0;
		        if (a == 0) {
		            // Just return the x^0 coefficient
		            return this.getCoefficient(0);
		        }
		        var size = this.coefficients.length;
		        if (a == 1) {
		            // Just the sum of the coefficients
		            this.coefficients.forEach(function (coefficient) {
		                result = GenericGF.addOrSubtract(result, coefficient);
		            });
		            return result;
		        }
		        result = this.coefficients[0];
		        for (var i = 1; i < size; i++) {
		            result = GenericGF.addOrSubtract(this.field.multiply(a, result), this.coefficients[i]);
		        }
		        return result;
		    };
		    GenericGFPoly.prototype.getCoefficient = function (degree) {
		        return this.coefficients[this.coefficients.length - 1 - degree];
		    };
		    GenericGFPoly.prototype.degree = function () {
		        return this.coefficients.length - 1;
		    };
		    GenericGFPoly.prototype.isZero = function () {
		        return this.coefficients[0] == 0;
		    };
		    GenericGFPoly.prototype.addOrSubtract = function (other) {
		        /* TODO, fix this.
		        if (!this.field.Equals(other.field))
		        {
		          throw new Error("GenericGFPolys do not have same GenericGF field");
		        }*/
		        if (this.isZero()) {
		            return other;
		        }
		        if (other.isZero()) {
		            return this;
		        }
		        var smallerCoefficients = this.coefficients;
		        var largerCoefficients = other.coefficients;
		        if (smallerCoefficients.length > largerCoefficients.length) {
		            var temp = smallerCoefficients;
		            smallerCoefficients = largerCoefficients;
		            largerCoefficients = temp;
		        }
		        var sumDiff = new Array(largerCoefficients.length);
		        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
		        // Copy high-order terms only found in higher-degree polynomial's coefficients
		        ///Array.Copy(largerCoefficients, 0, sumDiff, 0, lengthDiff);
		        for (var i = 0; i < lengthDiff; i++) {
		            sumDiff[i] = largerCoefficients[i];
		        }
		        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
		            sumDiff[i] = GenericGF.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
		        }
		        return new GenericGFPoly(this.field, sumDiff);
		    };
		    GenericGFPoly.prototype.multiply = function (scalar) {
		        if (scalar == 0) {
		            return this.field.zero;
		        }
		        if (scalar == 1) {
		            return this;
		        }
		        var size = this.coefficients.length;
		        var product = new Array(size);
		        for (var i = 0; i < size; i++) {
		            product[i] = this.field.multiply(this.coefficients[i], scalar);
		        }
		        return new GenericGFPoly(this.field, product);
		    };
		    GenericGFPoly.prototype.multiplyPoly = function (other) {
		        /* TODO Fix this.
		        if (!field.Equals(other.field))
		        {
		          throw new Error("GenericGFPolys do not have same GenericGF field");
		        }*/
		        if (this.isZero() || other.isZero()) {
		            return this.field.zero;
		        }
		        var aCoefficients = this.coefficients;
		        var aLength = aCoefficients.length;
		        var bCoefficients = other.coefficients;
		        var bLength = bCoefficients.length;
		        var product = new Array(aLength + bLength - 1);
		        for (var i = 0; i < aLength; i++) {
		            var aCoeff = aCoefficients[i];
		            for (var j = 0; j < bLength; j++) {
		                product[i + j] = GenericGF.addOrSubtract(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
		            }
		        }
		        return new GenericGFPoly(this.field, product);
		    };
		    GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
		        if (degree < 0) {
		            throw new Error("Invalid degree less than 0");
		        }
		        if (coefficient == 0) {
		            return this.field.zero;
		        }
		        var size = this.coefficients.length;
		        var product = new Array(size + degree);
		        for (var i = 0; i < size; i++) {
		            product[i] = this.field.multiply(this.coefficients[i], coefficient);
		        }
		        return new GenericGFPoly(this.field, product);
		    };
		    return GenericGFPoly;
		}());
		var GenericGF = (function () {
		    function GenericGF(primitive, size, genBase) {
		        // ok.
		        this.INITIALIZATION_THRESHOLD = 0;
		        this.initialized = false;
		        this.primitive = primitive;
		        this.size = size;
		        this.generatorBase = genBase;
		        if (size <= this.INITIALIZATION_THRESHOLD) {
		            this.initialize();
		        }
		    }
		    GenericGF.prototype.initialize = function () {
		        this.expTable = new Array(this.size);
		        this.logTable = new Array(this.size);
		        var x = 1;
		        for (var i = 0; i < this.size; i++) {
		            this.expTable[i] = x;
		            x <<= 1; // x = x * 2; we're assuming the generator alpha is 2
		            if (x >= this.size) {
		                x ^= this.primitive;
		                x &= this.size - 1;
		            }
		        }
		        for (var i = 0; i < this.size - 1; i++) {
		            this.logTable[this.expTable[i]] = i;
		        }
		        // logTable[0] == 0 but this should never be used
		        this.zero = new GenericGFPoly(this, [0]);
		        this.one = new GenericGFPoly(this, [1]);
		        this.initialized = true;
		    };
		    GenericGF.addOrSubtract = function (a, b) {
		        return a ^ b;
		    };
		    GenericGF.prototype.checkInit = function () {
		        if (!this.initialized)
		            this.initialize();
		    };
		    GenericGF.prototype.multiply = function (a, b) {
		        this.checkInit();
		        if (a == 0 || b == 0) {
		            return 0;
		        }
		        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
		    };
		    GenericGF.prototype.exp = function (a) {
		        this.checkInit();
		        return this.expTable[a];
		    };
		    GenericGF.prototype.log = function (a) {
		        this.checkInit();
		        if (a == 0) {
		            throw new Error("Can't take log(0)");
		        }
		        return this.logTable[a];
		    };
		    GenericGF.prototype.inverse = function (a) {
		        this.checkInit();
		        if (a == 0) {
		            throw new Error("Can't invert 0");
		        }
		        return this.expTable[this.size - this.logTable[a] - 1];
		    };
		    GenericGF.prototype.buildMonomial = function (degree, coefficient) {
		        this.checkInit();
		        if (degree < 0) {
		            throw new Error("Invalid monomial degree less than 0");
		        }
		        if (coefficient == 0) {
		            return this.zero;
		        }
		        var coefficients = new Array(degree + 1);
		        coefficients[0] = coefficient;
		        return new GenericGFPoly(this, coefficients);
		    };
		    return GenericGF;
		}());


	/***/ }
	/******/ ])
	});
	;

/***/ }),

/***/ 1130:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___3PbJy","collapse":"collapse___2lEyx","relativeField":"relativeField___1sXzq","buttonDiv":"buttonDiv___1U-Zi","toggleDiv":"toggleDiv___wEDM_","icons":"icons___-25Qg","currencyField":"currencyField___16XhS"};

/***/ })

});