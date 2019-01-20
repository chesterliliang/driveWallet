import Promise from 'bluebird';
import { reset } from 'redux-form';

import constants from 'shared/constants';
import { openExternalLink, decimalToHexString } from 'shared/utils';

function* updateBalance({ select, put, take, call }, coinType, lowerThan) {
  const { addresses, list } = yield select(state => state.device);
  const [{ TestNet: testNet }] = list;
  const {
    BTC: btcAddress,
    /*LTC: ltcAddress,
    ETH: ethAddress,
    ETC: etcAddress,
    NEO: neoAddress,
    CYB: cybAddress,
    EOS: eosAddress,
    USDT: usdtAddress,
    XRP: xrpAddress,*/
  } = addresses; //

  switch (coinType) {
    case 'BTC': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'btc',
          fn: 'getBalance',
          args: [{ address: btcAddress, testNet }],
        },
      });
      break;
    }
    /*
    case 'USDT': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'usdt',
          fn: 'getBalance',
          args: [usdtAddress],
        },
      });
      break;
    }
    case 'XRP': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'xrp',
          fn: 'getBalance',
          args: [xrpAddress],
        },
      });
      break;
    }
    case 'LTC': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'ltc',
          fn: 'getBalance',
          args: [{ address: ltcAddress, testNet }],
        },
      });
      break;
    }
    case 'ETH': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'eth',
          fn: 'getEthBalance',
          args: [{ address: ethAddress, testNet }],
        },
      });
      break;
    }

    case 'CYB': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'cyb',
          fn: 'getBalance',
          args: [{ address: cybAddress, testNet }],
        },
      });
      break;
    }
    case 'EOS': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'eos',
          fn: 'getBalance',
          args: [{ address: eosAddress, testNet }],
        },
      });
      break;
    }
    case 'ETC': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'eth',
          fn: 'getEtcBalance',
          args: [{ address: etcAddress, testNet }],
        },
      });
      break;
    }
    case 'NEO': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'neo',
          fn: 'getNeoBalance',
          args: [{ address: neoAddress, testNet }],
        },
      });
      break;
    }
    case 'GAS': {
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'neo',
          fn: 'getGasBalance',
          args: [{ address: neoAddress, testNet }],
        },
      });
      break;
    }*/
    default: {
      /*yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'erc20',
          fn: 'getBalance',
          args: [{ add: ethAddress, testNet }],
        },
      });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'eth',
          fn: 'getBalance',
          args: [{ address: ethAddress, testNet }],
        },
      });*/
    }
  }

  yield take('wallet/setBalance');
  yield call(Promise.delay, 300);

  const { balances } = yield select(state => state.wallet);
  if (parseFloat(balances[coinType]) >= parseFloat(lowerThan)) {
    yield call(Promise.delay, 3000);
    yield updateBalance({ select, put, take, call }, coinType, lowerThan);
  }
}

function* assertPinStatus({ put, take, call }, unlockAction) {
  yield call(Promise.delay, 5000);
  yield put({
    type: 'data/clientCoreInvoke',
    payload: { category: 'driver', fn: 'getStatus', args: [] },
  });

  const { type: actionType } = yield take([
    'device/checkStatusSuccess',
    'device/checkStatusError',
  ]);
  if (actionType !== 'device/checkStatusSuccess') {
    yield assertPinStatus({ put, take, call }, unlockAction);
  } else {
    setTimeout(() => {
      app._store.dispatch(unlockAction);
    }, 300);
  }
}

export default {
  namespace: 'send',
  state: {
    selectedCoin: 'BTC',
    inProgress: false,
  },
  subscriptions: {},
  effects: {
   /* *createXRPTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });

      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        window.dismissLoading();
        // yield put({ type: 'setInProgress', payload: false });
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createXRPTransaction', payload }
        );
        return;
      }

      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'xrp', fn: 'signXRPTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.XRP}/transactions/${txid}`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        yield put({
          type: 'wallet/setTag',
          payload: null,
        });
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const coinType = 'XRP';
        const { value } = payload;
        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          coinType,
          balances[coinType]
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (message === 'tecNO_DST_INSUF_XRP') {
          window.showError(localizedStrings.sendTxActiveNewAccount);
        } else if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },*/
/*
    *createUSTDTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });

      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        window.dismissLoading();
        // yield put({ type: 'setInProgress', payload: false });
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createUSTDTransaction', payload }
        );
        return;
      }

      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'usdt', fn: 'signUSDTTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.USDT}/search/${txid}`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const coinType = 'USDT';
        const { value } = payload;
        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          coinType,
          balances[coinType]
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },*/
/*
    *createBTCTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });

      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        window.dismissLoading();
        // yield put({ type: 'setInProgress', payload: false });
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createBTCTransaction', payload }
        );
        return;
      }

      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'btc', fn: 'signTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.BTC}/tx/${txid}`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const coinType = 'BTC';
        const { value } = payload;
        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          coinType,
          balances[coinType]
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },

    *createLTCTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });

      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        // window.dismissLoading();
        // yield put({ type: 'setInProgress', payload: false });
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createLTCTransaction', payload }
        );
        return;
      }

      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'ltc', fn: 'signTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.LTC}/tx/${txid}`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const coinType = 'LTC';
        const { value } = payload;
        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          coinType,
          balances[coinType]
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },
/*
    *createNEOTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });
      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createNEOTransaction', payload }
        );
        return;
      }
      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'neo', fn: 'SendAsset', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.NEO}/transaction/${txid}`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const { value, GAS } = payload;
        const coinType = GAS ? 'GAS' : 'NEO';
        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          coinType,
          balances[coinType]
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },*/
/*
    *createCYBTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });
      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createCYBTransaction', payload }
        );
        return;
      }
      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'cyb', fn: 'signTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid, accountname },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.CYB}/account/${accountname}/overview`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          'CYB',
          balances['CYB']
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },

    *createEOSTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });
      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createEOSTransaction', payload }
        );
        return;
      }
      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'eos', fn: 'signTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const {
          payload: { txid, accountname },
        } = action;

        window.showToast(
          localizedStrings.formatString(localizedStrings.sendTxSuccess, txid),
          openExternalLink.bind(
            null,
            `${constants.externalSites.EOS}/tx/${txid}`
          ),
          10000
        );

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          'EOS',
          balances['EOS']
        );
        yield put({
          type: 'wallet/setMemo',
          payload: '',
        });
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },

    *createETHTransaction({ payload }, { put, select, take, fork, call }) {
      window.showLoading();
      yield put({ type: 'setInProgress', payload: true });

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });

      const { type: actionType, payload: resultCode } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType !== 'device/checkStatusSuccess') {
        // window.dismissLoading();
        // yield put({ type: 'setInProgress', payload: false });
        yield fork(
          assertPinStatus,
          { put, take, call },
          { type: 'send/createETHTransaction', payload }
        );
        return;
      }

      window.showToast(localizedStrings.pleaseConfirmOnKey);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'eth', fn: 'signTx', args: [payload] },
      });
      const action = yield take(['send/transferSuccess', 'send/transferError']);
      if (action.type === 'send/transferSuccess') {
        const { payload: transactionHash } = action;
        const { etc } = payload;
        if (etc) {
          window.showToast(
            localizedStrings.formatString(
              localizedStrings.sendTxSuccess,
              transactionHash
            ),
            openExternalLink.bind(
              null,
              `${constants.externalSites.ETC}/tx/${transactionHash}`
            ),
            10000
          );
        } else {
          window.showToast(
            localizedStrings.formatString(
              localizedStrings.sendTxSuccess,
              transactionHash
            ),
            openExternalLink.bind(
              null,
              `${constants.externalSites.ETH}/tx/${transactionHash}`
            ),
            10000
          );
        }

        yield put(reset('createTransaction'));
        setTimeout(() => {
          document.querySelector('input[name*=recipient]').focus();
        }, 1000);

        const { erc20, value } = payload;
        const coinType = etc ? 'ETC' : !erc20 ? 'ETH' : erc20;

        const { balances } = yield select(state => state.wallet);
        yield fork(
          updateBalance,
          { select, put, take, call },
          coinType,
          balances[coinType]
        );
      } else {
        const {
          payload: { result, message, keyResult = 0 },
        } = action;
        console.log(JSON.stringify(result), 'transfer error');
        if (
          result === -1 ||
          (keyResult === -1 && decimalToHexString(result) !== '80000008')
        ) {
          window.showError(
            localizedStrings.appDefaultError.replace('XXX', message)
          );
        } else if (
          typeof result !== 'number' ||
          decimalToHexString(result) !== '80000008'
        ) {
          window.showError(localizedStrings.sendTxError);
        }
      }

      window.dismissLoading();
      yield put({ type: 'setInProgress', payload: false });
    },*/
  },
  reducers: {
    setSelectedCoin(
      state,
      {
        payload: { coinType },
      }
    ) {
      return {
        ...state,
        selectedCoin: coinType,
      };
    },

    setInProgress(state, { payload: value }) {
      return {
        ...state,
        inProgress: value,
      };
    },

    transferSuccess(state) {
      return {
        ...state,
      };
    },

    transferError(state) {
      return {
        ...state,
      };
    },
  },
};
