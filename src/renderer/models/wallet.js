import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { toast } from 'react-toastify';

export default {
  namespace: 'wallet',
  state: {
    subPageIndex: 0,
    balances: {},
    fiatBalances: null,
    unregistereds: {},
    captchaimg: {},
    Inloop: false,
    disableCancel: false,
    SNUsedStatus: false,
    memo: null,
    tag: null,
    initMemo: true,
    statusToastId: null,
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        const { pathname, action } = location;

        if (pathname.indexOf('/wallet') === 0 && action !== 'POP') {
          dispatch({ type: 'updateState', payload: { ...location } });
          dispatch({ type: 'getBalances', payload: { ...location } });
        }
      });
    },
  },
  effects: {
    *updateState(
      {
        payload: { pathname },
      },
      { put }
    ) {
      let subPageIndex = 0;

      switch (true) {
        case pathToRegexp('/wallet').test(pathname): {
          yield put(routerRedux.replace({ pathname: '/wallet/overview' }));
          return;
        }

        case pathToRegexp('/wallet/overview').test(pathname): {
          subPageIndex = 0;
          break;
        }

        case pathToRegexp('/wallet/send').test(pathname): {
          subPageIndex = 1;
          break;
        }
        case pathToRegexp('/wallet/profile').test(pathname): {
          subPageIndex = 2;
          break;
        }

        default:
      }

      yield put({ type: 'updatePage', payload: { subPageIndex } });
    },

    *Register(
      {
        payload: {
          coinType,
          accountName,
          captchaid,
          captcha,
          address,
          validation,
          app_id,
        },
        onComplete,
      },
      { put, select, take, fork, call }
    ) {
      let statusToastId = null;
      // const { num: deviceNum } = yield select(state => state.device);
      console.log('[register]enter register = ');
      yield put({ type: 'send/setInProgress', payload: true });
      yield put({ type: 'wallet/setDisableCancel', payload: true });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'driver',
          fn: 'getStatus',
          args: ['register'],
          handleType: 'register',
        },
      });

      const { type: actionTYPE } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionTYPE !== 'device/checkStatusSuccess') {
        window.dismissLoading();
        yield put({ type: 'send/setInProgress', payload: false });
        yield put({ type: 'app/setState', payload: { locked: false } });
        yield put({ type: 'wallet/setDisableCancel', payload: false });
        return;
      }
      statusToastId = window.showToast(
        localizedStrings.confirmRegAddressOnKey,
        null,
        false,
        false
      );
      yield put({
        type: 'wallet/setToastId',
        payload: statusToastId,
      });
      window.showLoading();
      yield put({
        type: 'wallet/keyConfirmAddress',
        payload: { coinType },
        closeModal: false,
        autoCloseLoading: false,
      });
      const { closeModal: confirmStatus } = yield take([
        'device/setKeyConfirmAddressStatus',
      ]);
      console.log('confirmStatus', confirmStatus);
      if (!confirmStatus) {
        // window.showError(localizedStrings.operationCancelled);
        yield put({ type: 'send/setInProgress', payload: false });
        yield put({ type: 'wallet/setDisableCancel', payload: false });
        window.dismissLoading();
        return false;
      }
      switch (coinType) {
        case 'CYB': {
          yield put({
            type: 'data/clientCoreInvoke',
            payload: {
              category: 'cyb',
              fn: 'cybRegister',
              args: [coinType, accountName, captchaid, captcha, address],
              handleType: 'register',
            },
          });

          const { type: actionType, payload: resultdata } = yield take([
            'wallet/registerSuccess',
            'wallet/registerError',
          ]);
          console.log('[register]resultdata = ', resultdata);
          window.dismissLoading();
          yield put({ type: 'send/setInProgress', payload: false });
          yield put({ type: 'wallet/setDisableCancel', payload: false });
          if (onComplete) {
            console.log('[register]onComplete = ', onComplete);
            onComplete();
          }
          if (actionType !== 'wallet/registerSuccess') {
            if (resultdata === -1) {
              window.showError(localizedStrings.registerErrOther);
              return;
            }
            switch (resultdata.err.code) {
              case 403: {
                window.showError(localizedStrings.registerErr403);
                break;
              }
              case 507: {
                window.showError(localizedStrings.registerErr507);
                break;
              }
              case 429: {
                window.showError(localizedStrings.registerErr429);
                break;
              }
              default: {
                window.showError(localizedStrings.registerErrOther);
                break;
              }
            }
            return;
          } else {
            window.showToast(localizedStrings.registersuccess);
            window.location.reload(true);
          }
          break;
        }
        case 'EOS': {
          yield put({
            type: 'data/clientCoreInvoke',
            payload: {
              category: 'eos',
              fn: 'eosRegister',
              args: [accountName, app_id, address, validation],
              handleType: 'register',
            },
          });

          const { type: actionType, payload: resultdata } = yield take([
            'wallet/registerSuccess',
            'wallet/registerError',
          ]);
          console.log('[register][eos]resultdata = ', resultdata);
          console.log('[register][eos]resultdata.err = ', resultdata.err);
          window.dismissLoading();
          yield put({ type: 'send/setInProgress', payload: false });
          yield put({ type: 'wallet/setDisableCancel', payload: false });
          if (actionType !== 'wallet/registerSuccess') {
            if (resultdata.err && resultdata.err.code) {
              switch (resultdata.err.code) {
                case 10002: {
                  window.showError(localizedStrings.registerErrEOS10002);
                  break;
                }
                case 10003: {
                  window.showError(localizedStrings.registerErrEOS10003);
                  break;
                }
                case 10004: {
                  window.showError(localizedStrings.registerErrEOS10004);
                  break;
                }
                case 10005: {
                  window.showError(localizedStrings.registerErrEOS10005);
                  break;
                }
                case 10006: {
                  window.showError(localizedStrings.registerErrEOS10006);
                  break;
                }
                case 10007: {
                  window.showError(localizedStrings.registerErrEOS10007);
                  break;
                }
                case 10008: {
                  window.showError(localizedStrings.registerErrEOS10008);
                  break;
                }
                case 10012: {
                  window.showError(localizedStrings.registerErrEOS10012);
                  break;
                }
                case 10014: {
                  window.showError(localizedStrings.registerErrEOS10014);
                  break;
                }
                case 10019: {
                  window.showError(localizedStrings.registerErrOther);
                  break;
                }
                case 10020: {
                  window.showError(localizedStrings.registerErrEOS10020);
                  break;
                }
                case 20001: {
                  window.showError(localizedStrings.registerErrEOS20001);
                  break;
                }
                case 20002: {
                  window.showError(localizedStrings.registerErrEOS20002);
                  break;
                }
                default: {
                  const appDefaultError = localizedStrings.appDefaultError.replace(
                    'XXX',
                    resultdata.err.code
                  );
                  window.showError(appDefaultError);
                  break;
                }
              }
            } else {
              window.showError(localizedStrings.registerErrOther);
            }
            return;
          } else {
            window.showToast(localizedStrings.registersuccess);
            window.location.reload(true);
          }
          break;
        }
        default:
          break;
      }
    },

    *getFiatBalances({ payload }, { put }) {
      const { coins, fiatType } = payload;
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'fiatServices',
          fn: 'getMajorCoinsFiatBalances',
          args: [coins, fiatType],
        },
      });
    },

    *getBalances(action, { put, select, take, call }) {
      console.log('======================2222getBalances222=======================');
      const { addresses, list } = yield select(state => state.device);
      const {
        settings: { fiatType },
      } = yield select(state => state.app);
      yield put({
        type: 'getFiatBalances',
        payload: {
          coins: [
            'BTC',
            /*'ETH',
            'USDT',
            'XRP',
            'LTC',
            'ETC',
            'NEO',
            'EOS',
            'CYB',*/
          ],
          fiatType,
        },
      });
      console.log('======================getBalances=======================');
      if (!addresses || Object.keys(addresses).length < 1) {
        yield put({ type: 'device/getAddresses' });
        yield take(['device/setAddresses']);
      }
      console.log('yield take([device/setAddresses]);');
      const [{ TestNet: testNet }] = list;
      const {
        addresses: {
          BTC: btcAddress,
          /*LTC: ltcAddress,
          ETH: ethAddress,
          ETC: etcAddress,
          NEO: neoAddress,
          CYB: cybAddress,
          EOS: eosAddressOri,
          XRP: xrpAddress,*/
        },
        eosAddress,
      } = yield select(state => state.device);
      //console.log('ltcaddresses = ', ltcAddress, 'neoAddress', neoAddress);
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'btc',
          fn: 'getBalance',
          args: [{ address: btcAddress, testNet }],
        },
      });
      console.log('[btcAddress]', btcAddress);
    },
    *checkSN({ payload }, { put }) {
      console.log('checkSN SN', payload);
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'eos',
          fn: 'checkSN',
          args: [payload, false],
        },
      });
    },
    *keyConfirmAddress(
      {
        payload: { coinType, derivePath },
        closeModal = true,
        autoCloseLoading = true,
      },
      { put, take, select }
    ) {
      window.showLoading();
      const { statusToastId } = yield select(state => state.wallet);
      yield put({ type: 'app/setState', payload: { locked: true } });
      yield put({
        type: 'device/setKeyStatus',
        payload: true,
      });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'driver',
          fn: 'keyConfirmAddress',
          args: [coinType, closeModal, derivePath],
        },
      });
      const { payload: confirmStatus } = yield take([
        'device/setKeyConfirmAddressStatus',
      ]);
      if (!confirmStatus && closeModal) {
        yield put({ type: 'app/popModal' });
      }
      if (autoCloseLoading) {
        window.dismissLoading();
        yield put({ type: 'app/setState', payload: { locked: false } });
      }
      toast.dismiss(statusToastId);
    },
  },
  reducers: {
    updatePage(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setFiatBalance(state, { payload }) {
      const newFiatBalances = Object.assign({}, state.fiatBalances, payload);
      return {
        ...state,
        fiatBalances: newFiatBalances,
      };
    },
    setBalance(
      state,
      {
        payload: { handleType, coinType, balance, other },
      }
    ) {
      if (handleType && handleType === 'erc20') {
        return {
          ...state,
          balances: {
            ...state.balances,
            [coinType]: { balance, ...other },
          },
        };
      }
      return {
        ...state,
        balances: {
          ...state.balances,
          [coinType]: balance,
        },
      };
    },

    setUnregistered(
      state,
      {
        payload: { coinType, unregistered },
      }
    ) {
      return {
        ...state,
        unregistereds: {
          ...state.unregistereds,
          [coinType]: unregistered,
        },
      };
    },
    setCaptcha(
      state,
      {
        payload: { captchaimg },
      }
    ) {
      return {
        ...state,
        captchaimg,
      };
    },
    setInLoop(
      state,
      {
        payload: { Inloop },
      }
    ) {
      return {
        ...state,
        Inloop,
      };
    },
    setDisableCancel(state, { payload }) {
      return {
        ...state,
        disableCancel: payload,
      };
    },
    setSNStatus(
      state,
      {
        payload: { status },
      }
    ) {
      return {
        ...state,
        SNUsedStatus: status,
      };
    },
    setMemo(state, { payload, initMemo = false }) {
      return {
        ...state,
        memo: payload,
        initMemo,
      };
    },
    setTag(state, { payload }) {
      return {
        ...state,
        tag: payload,
      };
    },
    setToastId(state, { payload }) {
      return {
        ...state,
        statusToastId: payload,
      };
    },
  },
};
