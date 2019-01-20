import Promise from 'bluebird';
import { addBreadcrumb, captureMessage } from '@sentry/electron';
import localForage from 'localForage';

import { decimalToHexString } from 'shared/utils';

const ipc = require('electron').ipcRenderer;

function* callClientCore(
  { fork, select, call, put, take },
  category,
  fn,
  args,
  handleType,
  onComplete
) {
  let data = -1;
  let error = null;

  try {
    console.log('args', args);
    data = yield call(clientCore[category][fn], ...args) || data;
    console.log(JSON.stringify(data), `callClientCore ${category} ${fn}`);
  } catch (err) {
    data = -1;
    error = err;
    console.log('err in', category, ':', err);
  }

  const resultCode = data.result || parseInt(data, 10) || 0;
  yield put({ type: 'app/setState', payload: { handleType } });
  yield put({
    type: 'device/handleStatus',
    payload: { status: resultCode, handleType },
  });
  let errorHandled = false;

  if (error || !!resultCode) {
    console.log(
      'decimalToHexString(resultCode)',
      decimalToHexString(resultCode)
    );
    if (decimalToHexString(resultCode) !== '80000008') {
      addBreadcrumb({
        category: `${category}.${fn}|`,
        data: `error=${error} | resultCode=${resultCode} | args=${args}`,
        message: `args=${args}`,
        level: 'error',
        type: 'renderer',
      });
      captureMessage(`${category}.${fn}|${args.join('/')}|`, 'error');
    }
  }

  // return;
  switch (`${category}.${fn}`) {
    case 'driver.getDevNum': {
      if (error || !!resultCode) {
        errorHandled = true;
      } else {
        yield put({ type: 'device/setAppVer', payload: data });
      }

      break;
    }

    case 'driver.getAppVersion': {
      if (error || !!resultCode) {
        errorHandled = true;
      } else {
        yield put({ type: 'device/setAppVer', payload: data });
      }

      break;
    }

    case 'driver.getStatusByIndex': {
      if (error || !!resultCode) {
        errorHandled = true;
      } else {
        yield put({
          type: 'device/addDevice',
          payload: { index: args[0], device: data.DevInfo },
        });
      }

      break;
    }

    case 'driver.getStatus': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'device/checkStatusError',
          payload: error || resultCode,
        });
      } else {
        yield put({ type: 'device/checkStatusSuccess', payload: data.DevInfo });
      }

      break;
    }

    case 'driver.getDeviceAddresses': {
      if (error || !!resultCode) {
        errorHandled = true;

        if (decimalToHexString(resultCode) !== '8000000B') {
          yield call(Promise.delay, 2000);
          yield put({ type: 'device/getAddresses' });
        }
      } else {
        yield put({ type: 'device/setAddresses', payload: data.Addresses[0] });
        if (data.Addresses[0]['EOS']) {
          yield put({
            type: 'device/setEOSAddresses',
            payload: data.Addresses[0]['EOS'],
          });
        }
      }

      break;
    }

    case 'driver.getETHAddress': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield call(Promise.delay, 2000);
        yield put({
          type: 'data/clientCoreInvoke',
          payload: {
            category: 'driver',
            fn: 'getETHAddress',
            args: [args[0]],
          },
        });
      } else {
        yield put({ type: 'device/setETHAddress', payload: data.address });
        yield put({
          type: 'data/clientCoreInvoke',
          payload: {
            category: 'eth',
            fn: 'getEthBalance',
            args: [{ address: data.address, testNet: false }],
          },
        });
      }

      break;
    }

    case 'driver.format': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'device/formatError', payload: error || resultCode });
        window.showError(localizedStrings.formatError);
      } else {
        yield put({ type: 'device/formatSuccess', payload: resultCode });
        window.showToast(localizedStrings.formatSuccess);
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      }

      // if (error || !!resultCode) {
      //   errorHandled = true;
      //   yield put({ type: 'device/formatError', payload: error || resultCode });
      // } else {
      //   yield put({ type: 'device/formatSuccess', payload: resultCode });
      // }

      break;
    }

    case 'driver.initialize': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'device/initError', payload: error || resultCode });
      } else {
        yield put({ type: 'device/initSuccess', payload: resultCode });
      }

      break;
    }

    case 'driver.importMne': {
      if (error || !!resultCode) {
        errorHandled = true;
        let mnePayload = {};
        if (!error || error == null) {
          mnePayload = resultCode;
        } else {
          mnePayload = error;
        }
        yield put({ type: 'device/importMneError', payload: resultCode });
      } else {
        yield put({ type: 'device/importMneSuccess', payload: resultCode });
      }

      break;
    }

    case 'driver.changePIN': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'device/changePINError',
          payload: error || resultCode,
        });
        if (resultCode) {
          switch (resultCode) {
            case 0x80000025:
              window.showError(localizedStrings.errorPinLocked);
              break;
            case 0x80000026:
              window.showError(localizedStrings.errorPinConfirmFail);
              break;
            case 0x80000027:
              window.showError(localizedStrings.errorPinVerifyFail);
              break;
            case 0x80000028:
              window.showError(localizedStrings.modifyPINError);
              break;
            case 0x80000029:
              window.showError(localizedStrings.modifyPINError);
              break;
            // case 0x80000007:
            //   window.showToast(
            //     localizedStrings.unlockToast,
            //     null,
            //     2000,
            //     false,
            //   );
            //   break;
            default:
              break;
          }
        } else {
          window.showError(localizedStrings.modifyPINError);
        }
      } else {
        yield put({ type: 'device/changePINSuccess', payload: resultCode });
        window.showToast(localizedStrings.modifyPINSuccess);
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      }

      break;
    }

    case 'driver.keyConfirmAddress': {
      if (error || !!resultCode) {
        yield put({
          type: 'device/setKeyConfirmAddressStatus',
          payload: false,
          closeModal: args[1],
        });

        if (resultCode === 0x80000008 || resultCode !== 0) {
          yield put({
            type: 'device/setloopstop',
            payload: { insetting: false },
          });
        }
      } else {
        yield put({
          type: 'device/setKeyConfirmAddressStatus',
          payload: true,
          closeModal: true,
        });
      }
      break;
    }

    case 'driver.verifyPkgSignature': {
      if (error || !!resultCode) {
        errorHandled = true;
        ipc.send('pkgPathRes', false);
        console.log('verify 失败');
      } else {
        ipc.send('pkgPathRes', true);
      }
      break;
    }

    case 'fiatServices.getMajorCoinsFiatBalances': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setFiatBalance',
          payload: data,
        });
      } else {
        yield put({
          type: 'wallet/setFiatBalance',
          payload: data,
        });
      }
      break;
    }

    case 'xrp.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'XRP', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'XRP', balance: data.balance },
        });
      }
      break;
    }

    case 'xrp.signXRPTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'usdt.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: {
            coinType: 'USDT',
            balance: 'NaN',
          },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: {
            coinType: 'USDT',
            balance: data.balance,
          },
        });
      }
      break;
    }

    case 'usdt.signUSDTTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'btc.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'BTC', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'BTC', balance: data.balance },
        });
      }
      break;
    }

    case 'btc.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'ltc.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'LTC', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'LTC', balance: data.balance },
        });
      }
      break;
    }
    case 'ltc.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'cyb.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        const { addresses } = yield select(state => state.device);
        addresses['CYBORIGIN'] = addresses['CYB'];
        addresses['CYB'] = 'NaN';
        yield put({ type: 'device/setAddresses', payload: addresses });
        yield put({
          type: 'wallet/setUnregistered',
          payload: { coinType: 'CYB', unregistered: false },
        });
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'CYB', balance: 'NaN' },
        });
      } else if (data.unregistered) {
        console.log('true unregistered = ', data.unregistered);
        yield put({
          type: 'wallet/setUnregistered',
          payload: { coinType: 'CYB', unregistered: data.unregistered },
        });
      } else {
        const { addresses } = yield select(state => state.device);
        addresses['CYB'] = data.name;
        console.log('[data][cyb.getbalance]addresses = ', addresses);
        yield put({ type: 'device/setAddresses', payload: addresses });
        console.log('false unregistered = ', data.unregistered);
        yield put({
          type: 'wallet/setUnregistered',
          payload: { coinType: 'CYB', unregistered: false },
        });
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'CYB', balance: data.balance },
        });
      }
      break;
    }
    case 'cyb.getCaptcha': {
      yield put({
        type: 'wallet/setCaptcha',
        payload: { captchaimg: data.captcha },
      });
      break;
    }
    case 'cyb.cybRegister': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'wallet/registerError', payload: data });
      } else {
        yield put({ type: 'wallet/registerSuccess', payload: data });
      }
      break;
    }

    case 'neo.getNeoBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'NEO', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'NEO', balance: data.balance },
        });
      }
      break;
    }
    case 'neo.getGasBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'GAS', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'GAS', balance: data.balance },
        });
      }
      break;
    }
    case 'neo.SendAsset': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'eth.getEthBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'ETH', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'ETH', balance: data.balance },
        });
      }
      break;
    }
    case 'eth.getEtcBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'ETC', balance: 'NaN' },
        });
      } else {
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'ETC', balance: data.balance },
        });
      }
      break;
    }

    case 'erc20.getBalance': {
      const erc20List = [];
      for (let index = 0; index < data.length; index += 1) {
        if (data[index] && data[index].name !== 'EOS') {
          erc20List.push(data[index].name);
          yield put({
            type: 'wallet/setBalance',
            payload: {
              handleType: 'erc20',
              coinType: data[index].name,
              balance: data[index].value,
              other: {
                decimal: data[index].decimal,
                picture: data[index].picture,
                erc20Address: data[index].erc20Address,
              },
            },
          });
        }
      }
      if (erc20List.length === 0) return;
      const localSettings = yield localForage.getItem('settings');
      let FiatType = 'USD';
      if (localSettings) {
        const { fiatType } = localSettings;
        FiatType = fiatType;
      }
      yield put({
        type: 'wallet/getFiatBalances',
        payload: { coins: erc20List, fiatType: FiatType },
      });
      break;
    }

    case 'eth.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }
    case 'cyb.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }
    case 'eos.getBalance': {
      if (data.unregistered) {
        const { addresses } = yield select(state => state.device);
        console.log('true unregistered = ', data.unregistered);
        yield put({
          type: 'wallet/setUnregistered',
          payload: { coinType: 'EOS', unregistered: data.unregistered },
        });
        yield put({
          type: 'wallet/checkSN',
          payload: addresses['EOSSN'],
        });
      } else {
        const { addresses, eosAddress } = yield select(state => state.device);
        addresses['EOSORIGIN'] = addresses['EOS'];
        console.log('eosAddress', eosAddress);

        addresses['EOS'] = data.name;
        console.log('[data][eos.getbalance]addresses = ', addresses);
        yield put({ type: 'device/setAddresses', payload: addresses });
        console.log('false unregistered = ', data.unregistered);
        yield put({
          type: 'wallet/setUnregistered',
          payload: { coinType: 'EOS', unregistered: false },
        });
        yield put({
          type: 'wallet/setBalance',
          payload: { coinType: 'EOS', balance: data.balance },
        });
      }
      break;
    }
    case 'eos.eosRegister': {
      console.log('case eos.eosRegister entering, error: ', error);
      console.log('case eos.eosRegister entering, resultCode:', resultCode);
      if (error || !!resultCode) {
        errorHandled = true;
        console.log('eos error branch, error: ', error);
        if (data.err && data.err.code) {
          yield put({ type: 'wallet/registerError', payload: data });
        } else {
          yield put({ type: 'wallet/registerError', payload: error });
        }
      } else {
        console.log('eos no error branch, error: ', data);
        if (data.err && data.err.code) {
          yield put({ type: 'wallet/registerError', payload: data });
        } else {
          yield put({ type: 'wallet/registerSuccess', payload: data });
        }
      }
      break;
    }
    case 'eos.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: data });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }
    case 'eos.checkSN': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({
          type: 'wallet/setSNStatus',
          payload: false,
        });
      } else {
        yield put({
          type: 'wallet/setSNStatus',
          payload: data,
        });
      }

      break;
    }

    default:
  }

  if (onComplete) {
    if (!errorHandled && error) {
      onComplete(error, data);
    } else if (!error) {
      onComplete(error, data);
    }
  }
}

export default {
  namespace: 'data',
  state: {},
  subscriptions: {},
  effects: {
    *clientCoreInvoke(
      {
        payload: { category, fn, args, handleType },
        onComplete,
      },
      { fork, put, call, select, take }
    ) {
      yield fork(
        callClientCore,
        { fork, select, call, put, take },
        category,
        fn,
        args,
        handleType,
        onComplete
      );
    },
  },
  reducers: {},
};
