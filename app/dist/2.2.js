webpackJsonp([2],{

/***/ 1086:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _from = __webpack_require__(85);

	var _from2 = _interopRequireDefault(_from);

	var _keys = __webpack_require__(357);

	var _keys2 = _interopRequireDefault(_keys);

	var _defineProperty2 = __webpack_require__(353);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends3 = __webpack_require__(4);

	var _extends4 = _interopRequireDefault(_extends3);

	var _toConsumableArray2 = __webpack_require__(84);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _regenerator = __webpack_require__(1);

	var _regenerator2 = _interopRequireDefault(_regenerator);

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

	var _react = __webpack_require__(167);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(197);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _dva = __webpack_require__(699);

	var _router = __webpack_require__(362);

	var _FlatButton = __webpack_require__(815);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _deepEqual = __webpack_require__(382);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _settings = __webpack_require__(1087);

	var _settings2 = _interopRequireDefault(_settings);

	var _IconButton = __webpack_require__(952);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _components = __webpack_require__(785);

	var _index = __webpack_require__(1088);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ErrorCode = {
	  noError: 0,
	  notAllConnected: 1,
	  notSameGroup: 2,
	  notSameStatus: 3,
	  notReadyStatus: 4
	};

	var Connecting = function (_React$Component) {
	  (0, _inherits3.default)(Connecting, _React$Component);

	  function Connecting() {
	    var _ref,
	        _this2 = this;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3.default)(this, Connecting);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Connecting.__proto__ || (0, _getPrototypeOf2.default)(Connecting)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      COSPath: null
	    }, _this.handleCheckDownloadedCOS = function () {
	      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(version) {
	        var path;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return clientCore.cos.checkDownloaded(version);

	              case 2:
	                path = _context.sent;

	                if (path) {
	                  _this.setState({ COSPath: path });
	                }

	              case 4:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, _this2);
	      }));

	      return function (_x) {
	        return _ref2.apply(this, arguments);
	      };
	    }(), _this.handleUpdateCOS = function () {
	      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(COSPath) {
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _this.props.dispatch({
	                  type: 'data/clientCoreInvoke',
	                  payload: { category: 'cos', fn: 'burn', args: [COSPath] },
	                  onComplete: function onComplete(err, data) {
	                    var resultCode = data.result || parseInt(data, 10);

	                    if (err || resultCode === 0x80000008) {
	                      // 若更新cos被取消，则跳过进入后续流程
	                      console.log('resultCode = ', resultCode);
	                      _this.setState({ COSPath: null });
	                      _this.props.dispatch({ type: 'device/getAddresses' });
	                    } else {
	                      window.showToast(localizedStrings.updateCosStopTips);
	                      _this.props.dispatch({ type: 'device/tryConnect', payload: { delay: 1000 } });
	                    }
	                  }
	                });

	              case 1:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, _this2);
	      }));

	      return function (_x2) {
	        return _ref3.apply(this, arguments);
	      };
	    }(), _this.handleNext = function (initialized) {
	      var _this$props = _this.props,
	          deviceNum = _this$props.deviceNum,
	          deviceList = _this$props.deviceList;

	      if (deviceNum < 2 || deviceList.length < 2) {
	        //个人版钱包
	        if (initialized) {
	          _this.props.dispatch(_router.routerRedux.replace('/wallet'));
	        } else {
	          _this.props.dispatch(_router.routerRedux.replace('/initialize'));
	        }
	        return;
	      }

	      if (initialized) {
	        _this.props.dispatch(_router.routerRedux.replace('/wallet'));
	      } else {
	        _this.props.dispatch(_router.routerRedux.replace('/select-m'));
	      }
	    }, _this.handleSettingButtonClick = function () {
	      console.log('[Connecting][handleSettingButtonClick]');
	      var modalPlayload = { modalType: 'Settings', modalProps: {} };
	      _this.props.dispatch({ type: 'device/setloopstop', payload: { insetting: true } });
	      _this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
	    }, _this.handleimportmne = function () {
	      _this.props.dispatch(_router.routerRedux.replace('/importm'));
	    }, _this.handleRefresh = function () {
	      _this.props.dispatch({ type: 'device/clearAllDevices' });
	      _this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'getDevNum', args: [] } });
	    }, _this.checkDevices = function (deviceNum, deviceList) {
	      if (_this.props.LcdState && _this.props.LcdState != 1 && _this.props.LcdState != 0x400) {
	        return { code: ErrorCode.notReadyStatus };
	      }
	      var connectedDevices = deviceList.filter(function (info) {
	        return info && !!info.SN;
	      });
	      if (!deviceNum || connectedDevices.length < deviceNum) {
	        return { code: ErrorCode.notAllConnected };
	      }

	      var groupKeys = deviceList.map(function (_ref4) {
	        var groupKey = _ref4.groupKey;
	        return groupKey;
	      }).reduce(function (tmp, groupKey) {
	        return tmp.indexOf(groupKey) > -1 ? tmp : [].concat((0, _toConsumableArray3.default)(tmp), [groupKey]);
	      }, []);

	      var groupMembers = groupKeys.reduce(function (tmp, groupKey) {
	        return (0, _extends4.default)({}, tmp, (0, _defineProperty3.default)({}, groupKey, deviceList.filter(function (_ref5) {
	          var tmpKey = _ref5.groupKey;
	          return tmpKey === groupKey;
	        })));
	      }, {});

	      var groupMemberNums = groupKeys.map(function (groupKey) {
	        return groupMembers[groupKey].length;
	      });
	      var maxMemberNum = Math.max.apply(Math, (0, _toConsumableArray3.default)(groupMemberNums));
	      var groupKey = groupKeys[groupMemberNums.indexOf(maxMemberNum)];

	      var isSameGroup = groupKeys.length === 1;
	      if (!isSameGroup) {
	        return { code: ErrorCode.notSameGroup, data: { groupKey: groupKey } };
	      }

	      // 检查所有星钥的状态是否一
	      var initializedCount = deviceList.filter(function (_ref6) {
	        var initializing = _ref6.SesStatus;
	        return !initializing;
	      }).length;
	      if (initializedCount > 0 && initializedCount !== deviceList.length) {
	        return { code: ErrorCode.notSameStatus }; // 有星钥未完成初始化
	      }

	      return { code: ErrorCode.noError, data: { initialized: initializedCount > 0 } };
	    }, _this.renderCard = function (index, deviceList, error) {
	      var checkedDevices = deviceList.filter(function (info) {
	        return !!info;
	      });
	      var connecting = index === checkedDevices.length;
	      var connected = index < checkedDevices.length && !!deviceList[index].SN;

	      var safe = true;
	      if (error) {
	        var code = error.code,
	            data = error.data;


	        switch (code) {
	          case ErrorCode.notSameGroup:
	            {
	              var groupKey = data.groupKey;

	              safe = deviceList[index].groupKey === groupKey;
	              break;
	            }

	          case ErrorCode.notSameStatus:
	            {
	              safe = !deviceList[index].SesStatus;
	              break;
	            }

	          default:
	        }
	      }

	      return _react2.default.createElement(_components.KeyCard, {
	        key: index,
	        index: index,
	        connected: connected,
	        connecting: connecting,
	        safe: safe,
	        sn: connected ? deviceList[index].SN : ''
	      });
	    }, _this.renderMessage = function (code, data) {
	      switch (code) {
	        case ErrorCode.notSameGroup:
	          {
	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement(
	                'h3',
	                null,
	                localizedStrings.connectError
	              ),
	              _react2.default.createElement(
	                'h4',
	                null,
	                localizedStrings.connectHintNotSameGroup
	              )
	            );
	          }

	        case ErrorCode.notSameStatus:
	          {
	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement(
	                'h3',
	                null,
	                localizedStrings.connectError
	              ),
	              _react2.default.createElement(
	                'h4',
	                null,
	                localizedStrings.connectHintNotInited
	              )
	            );
	          }

	        case ErrorCode.notReadyStatus:
	          {
	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement(
	                'h3',
	                null,
	                localizedStrings.connecting
	              ),
	              _react2.default.createElement(
	                'h4',
	                null,
	                localizedStrings.connectingHintNotReady
	              )
	            );
	          }

	        case ErrorCode.noError:
	          {
	            var _this$props2 = _this.props,
	                deviceNum = _this$props2.deviceNum,
	                deviceList = _this$props2.deviceList;

	            if (deviceNum < 1 || deviceList.length < 1) {
	              return _react2.default.createElement(
	                'div',
	                { className: _index2.default.hintArea, style: { justifyContent: 'center' } },
	                _react2.default.createElement(
	                  'h4',
	                  { style: { color: '#white', fontSize: '20px' } },
	                  localizedStrings.connectSuccess
	                )
	              );
	            }

	            if (deviceNum > 1 || deviceList.length > 1) {
	              return _react2.default.createElement(
	                'div',
	                { className: _index2.default.hintArea, style: { justifyContent: 'center' } },
	                _react2.default.createElement(
	                  'h4',
	                  { style: { color: '#white', fontSize: '20px' } },
	                  localizedStrings.connectHintTooMuchDev
	                )
	              );
	            }

	            if (data.initialized) {
	              var addresses = _this.props.addresses;


	              if ((0, _keys2.default)(addresses).length > 0) {
	                return _react2.default.createElement(
	                  'div',
	                  { className: _index2.default.hintArea, style: { justifyContent: 'center' } },
	                  _react2.default.createElement(
	                    'h4',
	                    { style: { color: '#white', fontSize: '20px' } },
	                    localizedStrings.connectSuccess
	                  )
	                );
	              }

	              if (_this.state.COSPath) {
	                return _react2.default.createElement(
	                  'div',
	                  { className: _index2.default.hintArea },
	                  _react2.default.createElement(
	                    'h3',
	                    null,
	                    localizedStrings.updatingCOS
	                  ),
	                  _react2.default.createElement(
	                    'h4',
	                    null,
	                    localizedStrings.updatingCOSHint
	                  )
	                );
	              }

	              return _react2.default.createElement(
	                'div',
	                { className: _index2.default.hintArea },
	                _react2.default.createElement(
	                  'h3',
	                  null,
	                  localizedStrings.fetchingAddresses
	                )
	              )
	              //<h4>{localizedStrings.fetchingHint}</h4>
	              ;
	            }

	            return _react2.default.createElement(
	              'div',
	              { className: _index2.default.hintArea },
	              _react2.default.createElement(
	                'h3',
	                null,
	                localizedStrings.readyToInit
	              ),
	              _react2.default.createElement('h4', { dangerouslySetInnerHTML: { __html: localizedStrings.readyHint } })
	            );
	          }

	        default:
	          return _react2.default.createElement(
	            'div',
	            { className: _index2.default.hintArea },
	            _react2.default.createElement(
	              'h3',
	              null,
	              localizedStrings.connecting
	            ),
	            _react2.default.createElement(
	              'h4',
	              null,
	              localizedStrings.connectingHint
	            )
	          );
	      }
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
	    }, _this.renderButton = function (code, data) {
	      switch (code) {
	        case ErrorCode.notSameGroup:
	        case ErrorCode.notSameStatus:
	          {
	            return _react2.default.createElement(_FlatButton2.default, {
	              style: { position: 'absolute', bottom: 30, right: 30 },
	              label: localizedStrings.retry,
	              labelStyle: { fontSize: 20 },
	              secondary: true,
	              onTouchTap: _this.handleRefresh
	            });
	          }

	        case ErrorCode.noError:
	          {
	            var _this$props3 = _this.props,
	                deviceNum = _this$props3.deviceNum,
	                deviceList = _this$props3.deviceList;


	            if (data.initialized && deviceNum > 0 && deviceList.length > 0) {
	              return null;
	              // const { addresses } = this.props;

	              // if (Object.keys(addresses).length < 1) {
	              //   return null;
	              // }
	            }

	            //ChangePin暂时只用来测试功能，请随意修改
	            return _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(_FlatButton2.default, {
	                style: { position: 'absolute', bottom: 30, right: 30 },
	                label: localizedStrings.createNewWallet,
	                labelStyle: { fontSize: 20 },
	                primary: true,
	                onTouchTap: _this.handleNext.bind(_this, data.initialized)
	              }),
	              _react2.default.createElement(_FlatButton2.default, {
	                style: { position: 'absolute', bottom: 30, left: 30 },
	                label: localizedStrings.importmemo,
	                labelStyle: { fontSize: 20 },
	                primary: true,
	                onTouchTap: _this.handleimportmne
	              })
	            );
	          }

	        default:
	          return null;
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  (0, _createClass3.default)(Connecting, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log('componentDidMount');
	      if (this.props.deviceNum > 0) {
	        this.props.dispatch({ type: 'device/tryConnect', payload: { delay: 1000 } });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      //if (nextProps && nextProps.LcdState != this.props.LcdState) {
	      //  this.setState({LcdState:nextProps.LcdState});
	      //}
	      if (nextProps && nextProps.deviceNum !== this.props.deviceNum && nextProps.deviceNum > 0) {
	        this.props.dispatch({ type: 'device/tryConnect', payload: { delay: 1000 } });
	      }

	      if (nextProps && nextProps.COSVersion && !this.props.COSVersion) {
	        this.handleCheckDownloadedCOS(nextProps.COSVersion);
	      }

	      if (nextProps && !(0, _deepEqual2.default)(this.props.deviceList, nextProps.deviceList) && nextProps.deviceList.length === nextProps.deviceNum && nextProps.deviceNum > 0 && nextProps.deviceList.length > 0) {
	        var _checkDevices = this.checkDevices(nextProps.deviceNum, nextProps.deviceList),
	            code = _checkDevices.code,
	            data = _checkDevices.data;

	        if (code !== ErrorCode.noError || !data.initialized) {
	          return;
	        }

	        if (this.state.COSPath) {
	          this.handleUpdateCOS(this.state.COSPath);
	        } else {
	          this.props.dispatch({ type: 'device/getAddresses' });
	        }
	      } else {
	        console.log('else');
	      }
	      if (nextProps && nextProps.addresses && nextProps.addresses !== this.props.addresses) {
	        this.props.dispatch(_router.routerRedux.replace('/wallet'));
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props = this.props,
	          deviceNum = _props.deviceNum,
	          deviceList = _props.deviceList;

	      var _checkDevices2 = this.checkDevices(deviceNum, deviceList),
	          code = _checkDevices2.code,
	          data = _checkDevices2.data;

	      var upper = null;
	      if (deviceNum < 1) {
	        upper = _react2.default.createElement(
	          'div',
	          { className: _index2.default.hintArea, style: { justifyContent: 'center', background: 'transparent' } },
	          _react2.default.createElement(
	            'h4',
	            { style: { color: 'white', fontSize: '28px', marginBottom: 20 } },
	            localizedStrings.noKeys
	          ),
	          _react2.default.createElement(_FlatButton2.default, {
	            label: localizedStrings.retry,
	            labelStyle: { fontSize: 20 },
	            secondary: true,
	            onTouchTap: this.handleRefresh,
	            backgroundColor: 'rgba(255,255,255,0.05)'
	          })
	        );
	      } else if (deviceNum > 7) {
	        upper = _react2.default.createElement(
	          'div',
	          { className: _index2.default.hintArea, style: { justifyContent: 'center', background: 'transparent' } },
	          _react2.default.createElement(
	            'h4',
	            { style: { color: 'white', fontSize: '28px', marginBottom: 20 } },
	            localizedStrings.tooManyKeys
	          ),
	          _react2.default.createElement(_FlatButton2.default, {
	            label: localizedStrings.retry,
	            labelStyle: { fontSize: 20 },
	            secondary: true,
	            onTouchTap: this.handleRefresh,
	            backgroundColor: 'rgba(255,255,255,0.05)'
	          })
	        );
	      } else {
	        upper = (0, _from2.default)(Array(deviceNum)).map(function (__, index) {
	          return _this3.renderCard(index, deviceList, code && { code: code, data: data });
	        });
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: _index2.default.container },
	        this.renderSettingButton(),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.bottom },
	          this.renderMessage(code, data),
	          this.renderButton(code, data)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.upper },
	          upper
	        )
	      );
	    }
	  }]);
	  return Connecting;
	}(_react2.default.Component);

	Connecting.propTypes = {
	  deviceNum: _propTypes2.default.number,
	  deviceList: _propTypes2.default.array
	};

	function splitDevicesByGroup(list) {
	  return list.map(function (device) {
	    var hash = device.Hash,
	        n = device.N,
	        m = device.M;


	    return (0, _extends4.default)({
	      groupKey: hash + '_' + n + '_' + m
	    }, device);
	  });
	}

	function mapStateToProps(_ref7) {
	  var _ref7$device = _ref7.device,
	      deviceNum = _ref7$device.num,
	      list = _ref7$device.list,
	      addresses = _ref7$device.addresses,
	      COSVersion = _ref7$device.COSVersion,
	      LcdState = _ref7$device.LcdState;

	  var lcdState = LcdState & 0x80000000 ? 0 : LcdState;
	  return {
	    deviceNum: deviceNum,
	    deviceList: splitDevicesByGroup(list),
	    addresses: addresses,
	    COSVersion: COSVersion,
	    LcdState: lcdState
	  };
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(Connecting);
	module.exports = exports['default'];

/***/ }),

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

/***/ 1088:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"container___k2nOQ","bottom":"bottom___1r684","upper":"upper___fb50S","hintArea":"hintArea___3jGAh"};

/***/ })

});