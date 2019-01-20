import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import Promise from 'bluebird';

export default {
  namespace: 'wallet',
  state: {
    subPageIndex: 0,
    balances: {},
    unregistereds: {},
    captchaimg:{},
    Inloop:false,
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, action } = location;
        
        if (pathname.indexOf('/wallet') === 0 && action !== 'POP') {
          dispatch({ type: 'updateState', payload: { ...location } });
          dispatch({ type: 'getBalances', payload: { ...location } });
        }
      });
    },
  },
  effects: {
    * updateState({
      payload: { pathname },
    }, { put }) {
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

        default:
      }

      yield put({ type: 'updatePage', payload: { subPageIndex } });
    },

    * Register({ payload: { coinType, accountName, captchaid, captcha, address }, onComplete }, { put, select, take, fork, call }) {
    // const { num: deviceNum } = yield select(state => state.device);
    console.log('[register]enter register = ')
    window.showLoading();
    yield put({ type: 'send/setInProgress', payload: true });

    yield put({ type: 'data/clientCoreInvoke', payload: { category: 'cyb', fn: 'cybRegister', args: [coinType, accountName, captchaid, captcha, address] } });

    const { type: actionType, payload: resultdata } = yield take(['wallet/registerSuccess', 'wallet/registerError']);
    console.log('[register]resultdata = ',resultdata)
    window.dismissLoading();
    yield put({ type: 'send/setInProgress', payload: false });
    if (onComplete) {
      console.log('[register]onComplete = ', onComplete)
      onComplete();
    }
    if (actionType !== 'wallet/registerSuccess') {
      switch (resultdata.err.code) {
        case 403: {
          window.showError(localizedStrings.registerErr403);
          break
        }
        case 507: {
          window.showError(localizedStrings.registerErr507);
          break
        }
        case 429: {
          window.showError(localizedStrings.registerErr429);
          break
        }
        default: {
          window.showError(localizedStrings.registerErrOther);
          break
        }
      }
      return;
    }
    else{
      window.showToast(localizedStrings.registersuccess);
      window.location.reload(true);
    }
  },

    * getBalances(action, { put, select, take, call }) {
      const { addresses, list } = yield select(state => state.device);
      // const { Inloop } = yield select(state => state.wallet);
      // if(Inloop){
      //   console.log('[getbalances]Inloop = ',Inloop)
      //   return;
      // }
      // yield put({ type: 'setInLoop', payload: {Inloop: true} });
      // while(true){
        console.log('======================getBalances=======================')
        if (!addresses || Object.keys(addresses).length < 1) {
          yield put({ type: 'device/getAddresses' });
          yield take(['device/setAddresses']);
        }
        console.log('yield take([device/setAddresses]);')
        const [{ TestNet: testNet }] = list;
        const { addresses: { BTC: btcAddress, LTC: ltcAddress, ETH: ethAddress, ETC: etcAddress, NEO: neoAddress, CYB: cybAddress } } = yield select(state => state.device);//
        console.log('ltcaddresses = ', ltcAddress, 'neoAddress', neoAddress)
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'btc', fn: 'getBalance', args: [{ address: btcAddress, testNet }] } });
        console.log('[btcAddress]',btcAddress);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'ltc', fn: 'getBalance', args: [{ address: ltcAddress, testNet }] } });
        console.log('[ltcAddress]',ltcAddress);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'neo', fn: 'getNeoBalance', args: [{ address: neoAddress, testNet }] } });
        console.log('[neoAddress]',neoAddress);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'neo', fn: 'getGasBalance', args: [{ address: neoAddress, testNet }] } });
        console.log('[neoAddress]',neoAddress);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'cyb', fn: 'getBalance', args: [{ address: cybAddress, testNet }] } });
        console.log('[cybAddress]',cybAddress);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'eth', fn: 'getEthBalance', args: [{ address: ethAddress, testNet }] } });
        console.log('[ethaddress],[testNet]', ethAddress, testNet);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'eth', fn: 'getEtcBalance', args: [{ address: etcAddress, testNet }] } });
        console.log('[etcaddress],[testNet]', etcAddress, testNet);
        yield put({ type: 'data/clientCoreInvoke', payload: { category: 'erc20', fn: 'getBalance', args: [{ add: ethAddress, testNet }] } });
      //   yield call(Promise.delay, 60000);
      // }
    },
  },
  reducers: {
    updatePage(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    setBalance(state, { payload: { coinType, balance } }) {
      return {
        ...state,
        balances: {
          ...(state.balances),
          [coinType]: balance,
        },
      };
    },

    setUnregistered(state, { payload: { coinType, unregistered } }) {
      return {
        ...state,
        unregistereds: {
          ...(state.unregistereds),
          [coinType]: unregistered,
        },
      };
    },
    setCaptcha(state, { payload: { captchaimg } }) {
      return {
        ...state,
        captchaimg,
      };
    },
    setInLoop(state, { payload: { Inloop } }) {
      return {
        ...state,
        Inloop,
      };
    },

  },
};
