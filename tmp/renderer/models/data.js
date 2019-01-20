import Promise from 'bluebird';

import { decimalToHexString } from 'shared/utils';

function* callClientCore({ fork, select, call, put }, category, fn, args, onComplete) {
  let data = -1;
  let error = null;

  try {
    data = yield call(clientCore[category][fn], ...args) || data;
    console.log(JSON.stringify(data), `callClientCore ${category} ${fn}`);
  } catch (err) {
    data = -1;
    error = err;
    console.log('err in', category, ':', err);
  }

  const resultCode = data.result || parseInt(data, 10) || 0;
  yield put({ type: 'device/handleStatus', payload: { status: resultCode } });

  let errorHandled = false;

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
        yield put({ type: 'device/addDevice', payload: { index: args[0], device: data.DevInfo } });
      }

      break;
    }

    case 'driver.getStatus': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'device/checkStatusError', payload: error || resultCode });
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
        yield put({ type: 'device/changePINError', payload: error || resultCode });
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
            default:
              window.showError(localizedStrings.modifyPINError);
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

    case 'btc.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'BTC', balance: 'NaN' } });
      } else {
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'BTC', balance: data.balance } });
      }
      break;
    }

    case 'btc.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: error || resultCode });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'ltc.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'LTC', balance: 'NaN' } });
      } else {
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'LTC', balance: data.balance } });
      }
      break;
    }
    case 'ltc.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: error || resultCode });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'cyb.getBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        const { addresses } = yield select(state => state.device);
        addresses['CYB'] = 'NaN';
        yield put({ type: 'device/setAddresses', payload: addresses });
        yield put({ type: 'wallet/setUnregistered', payload: { coinType: 'CYB', unregistered: false } });
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'CYB', balance: 'NaN' } });
      } else if (data.unregistered) {
        console.log('true unregistered = ', data.unregistered)
        yield put({ type: 'wallet/setUnregistered', payload: { coinType: 'CYB', unregistered: data.unregistered } });
      } else {
        const { addresses } = yield select(state => state.device);
        addresses['CYB'] = data.name;
        console.log('[data][cyb.getbalance]addresses = ', addresses)
        yield put({ type: 'device/setAddresses', payload: addresses });
        console.log('false unregistered = ', data.unregistered);
        yield put({ type: 'wallet/setUnregistered', payload: { coinType: 'CYB', unregistered: false } });
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'CYB', balance: data.balance } });
      }
      break;
    }
    case 'cyb.getCaptcha': {
      yield put({ type: 'wallet/setCaptcha', payload: { captchaimg: data.captcha } });
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
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'NEO', balance: 'NaN' } });
      } else {
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'NEO', balance: data.balance } });
      }
      break;
    }
    case 'neo.getGasBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'GAS', balance: 'NaN' } });
      } else {
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'GAS', balance: data.balance } });
      }
      break;
    }
    case 'neo.SendAsset': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: error || resultCode });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }

    case 'eth.getEthBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'ETH', balance: 'NaN' } });
      } else {
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'ETH', balance: data.balance } });
      }
      break;
    }
    case 'eth.getEtcBalance': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'ETC', balance: 'NaN' } });
      } else {
        yield put({ type: 'wallet/setBalance', payload: { coinType: 'ETC', balance: data.balance } });
      }
      break;
    }

    case 'erc20.getBalance': {
      for (let index = 0; index < data.length; index += 1) {
        yield put({ type: 'wallet/setBalance', payload: { coinType: data[index].name, balance: data[index].value } });
      }
      break;
    }

    case 'eth.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: error || resultCode });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
      }

      break;
    }
    case 'cyb.signTx': {
      if (error || !!resultCode) {
        errorHandled = true;
        yield put({ type: 'send/transferError', payload: error || resultCode });
      } else {
        yield put({ type: 'send/transferSuccess', payload: data });
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
  state: {
  },
  subscriptions: {
  },
  effects: {
    * clientCoreInvoke({
      payload: { category, fn, args },
      onComplete,
    }, { fork, put, call, select }) {
      yield fork(callClientCore, { fork, select, call, put }, category, fn, args, onComplete);
    },
  },
  reducers: {
  },
};
