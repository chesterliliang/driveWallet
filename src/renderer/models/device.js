import Promise from 'bluebird';
import { toast } from 'react-toastify';
import _ from 'lodash';
import localForage from 'localforage';

import { decimalToHexString } from 'shared/utils';

let statusToastId = null;

const ETHDerivePath = {
  fourLevel: [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000],
  fiveLevel: [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000, 0x00000000],
};

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
  namespace: 'device',
  state: {
    num: 1, // 个人版始终是1
    list: [],
    LcdState: 0, // only for solo
    addresses: {},
    COSVersion: null,
    insetting: false,
    ElectronVer: '0.0.0',
    MidWareVer: '0.0.0.0',
    eosAddress: '',
    confirmOK: 'init',
    keyStatus: false,
  },
  subscriptions: {},
  effects: {
    *tryConnect({ payload = { delay: 0 } }, { put, select, call, take }) {
      const { num: deviceNum, insetting } = yield select(state => state.device);
      if (insetting) {
        console.log('[deveice][tryconnect]insetting = ', insetting);
        yield call(Promise.delay, 2000);
        yield put({ type: 'tryConnect', payload: { delay: payload.delay } });
        return;
      }
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'driver',
          fn: 'getStatus',
          args: ['getAppVersion'],
        },
      });
      const { type: actionType } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);

      if (actionType === 'device/checkStatusError') {
        console.log('[deveice][tryconnect]checkStatusError');
        yield call(Promise.delay, 2000);
        yield put({ type: 'tryConnect', payload: { delay: payload.delay } });
        return;
      }

      for (let index = 0; index < deviceNum; index += 1) {
        yield call(Promise.delay, payload.delay);
        yield put({
          type: 'data/clientCoreInvoke',
          payload: {
            category: 'driver',
            fn: 'getStatusByIndex',
            args: [index],
          },
        });
        yield take(['device/addDevice']);
      }
      yield put({ type: 'app/setState', payload: { outloading: true } });
    },

    *getAddresses(action, { put, take, call }) {
      const localSettings = yield localForage.getItem('settings');
      let EthDerivePath = 'fourLevel';
      if (localSettings) {
        const { ethDerivePath } = localSettings;
        EthDerivePath = ethDerivePath;
      }
      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'getStatus', args: [] },
      });

      const { type: actionType, payload: deviceList } = yield take([
        'device/checkStatusSuccess',
        'device/checkStatusError',
      ]);
      if (actionType === 'device/checkStatusSuccess') {
        const initializedCount = deviceList.filter(
          ({ SesStatus: initializing }) => !initializing
        ).length;

        if (initializedCount === deviceList.length) {
          yield put({
            type: 'data/clientCoreInvoke',
            payload: {
              category: 'driver',
              fn: 'getDeviceAddresses',
              args: [ETHDerivePath[EthDerivePath]],
            },
          });
        } else if (initializedCount > 0) {
          window.showError(localizedStrings.notAllInitialized);
        }
      } else {
        yield call(Promise.delay, 2000);
        yield put({ type: 'getAddresses' });
      }
    },

    *format(action, { put, take }) {
      window.showLoading();
      yield put({ type: 'send/setInProgress', payload: true });
      console.log('[device][format] enter');
      yield put({ type: 'app/setState', payload: { locked: true } });
      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'format', args: [] },
      });
      const { type: actionType, payload: result } = yield take([
        'device/formatSuccess',
        'device/formatError',
      ]);
      yield put({ type: 'app/setState', payload: { locked: false } });
      window.dismissLoading();
      yield put({ type: 'send/setInProgress', payload: false });
      if (actionType === 'device/formatSuccess' && !result) {
        return true;
      }
      return false;
    },

    *changepin(action, { put, take, fork, call }) {
      if (statusToastId) {
        toast.dismiss(statusToastId);
        statusToastId = null;
      }
      window.showLoading();
      yield put({ type: 'send/setInProgress', payload: true });
      yield put({
        type: 'app/setState',
        payload: { locked: true, outloading: true },
      });
      console.log('[device][changePIN] enter');
      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'changePIN', args: [0] },
      });
      const { type: actionType, payload: result } = yield take([
        'device/changePINSuccess',
        'device/changePINError',
      ]);
      yield put({ type: 'app/setState', payload: { locked: false } });
      window.dismissLoading();
      yield put({ type: 'send/setInProgress', payload: false });
      if (actionType === 'device/changePINSuccess' && !result) {
        return true;
      } else {
        // yield fork(
        //   assertPinStatus,
        //   { put, take, call },
        //   { type: 'device/changepin' },
        // );
        return false;
      }
    },

    *importMNE(
      {
        payload: { Memos },
        onComplete,
      },
      { put, select, take, fork, call }
    ) {
      // const { num: deviceNum } = yield select(state => state.device);
      window.showLoading();
      yield put({ type: 'send/setInProgress', payload: true });

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
          { type: 'device/importMNE', payload: { Memos }, onComplete }
        );
        return;
      }

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'importMne', args: [Memos] },
      }); //index=0,seedlen=32，实际seedlen可选16,20,24,28,32修改此参数将影响助记词长度

      let { type: initActionType, payload: initResult } = yield take([
        'device/importMneSuccess',
        'device/importMneError',
      ]);
      if (
        initActionType === 'device/importMneSuccess' &&
        !initResult &&
        onComplete
      ) {
        onComplete(null);
      } else if (onComplete) {
        onComplete(initResult);
      }

      window.dismissLoading();
      yield put({ type: 'send/setInProgress', payload: false });
    },

    *initialize(
      {
        payload: { threshold },
        onComplete,
      },
      { put, select, take }
    ) {
      // const { num: deviceNum } = yield select(state => state.device);

      yield put({
        type: 'data/clientCoreInvoke',
        payload: { category: 'driver', fn: 'initialize', args: [0, 32] },
      }); //index=0,seedlen=32，实际seedlen可选16,20,24,28,32修改此参数将影响助记词长度

      const { type: initActionType, payload: initResult } = yield take([
        'device/initSuccess',
        'device/initError',
      ]);
      if (
        initActionType === 'device/initSuccess' &&
        !initResult &&
        onComplete
      ) {
        onComplete(null);
      } else if (onComplete) {
        onComplete(initResult);
      }
    },

    *handleStatus(
      {
        payload: { status, handleType },
      },
      { put, select }
    ) {
      const closeable = [
        'register',
        'keyConfirmAddress',
        'getAppVersion',
      ].includes(handleType);
      console.log('handleStatus', statusToastId, decimalToHexString(status));
      switch (decimalToHexString(status)) {
        case '6993': // old code
        case '80000007': {
          const { num } = yield select(state => state.device);
          const { outloading } = yield select(state => state.app);
          if (num < 1 || num > 7) {
            return;
          }
          console.log('[outloading] = ', outloading);
          if (
            (!statusToastId && outloading && handleType !== 'legal') ||
            closeable
          ) {
            statusToastId = 'fakeHoldId';
            statusToastId = window.showToast(
              localizedStrings.unlockToast,
              null,
              false,
              closeable
            );
          } else if (statusToastId && !outloading) {
            toast.dismiss(statusToastId);
            statusToastId = null;
          }
          if (outloading)
            yield put({ type: 'app/setState', payload: { locked: true } });
          break;
        }
        case '80000001': {
          const { num } = yield select(state => state.device);
          if (num < 1 || num > 7) {
            return;
          }
          // if (statusToastId) {
          //   toast.dismiss(statusToastId);
          //   statusToastId = null;
          // }
          if (!statusToastId) {
            statusToastId = 'fakeHoldId';
            statusToastId = window.showToast(
              localizedStrings.reconnectToast,
              null,
              false,
              closeable
            );
          }
          yield put({ type: 'app/setState', payload: { locked: true } });
          break;
        }

        case '8000000B': {
          // window.showError(localizedStrings.notMatchMHint, null, false, false);
          const { num } = yield select(state => state.device);
          if (num < 1 || num > 7) {
            return;
          }
          // if (statusToastId) {
          //   toast.dismiss(statusToastId);
          //   statusToastId = null;
          // }
          if (!statusToastId) {
            statusToastId = 'fakeHoldId';
            statusToastId = window.showToast(
              localizedStrings.noKeys,
              null,
              false,
              closeable
            );
          }
          yield put({ type: 'app/setState', payload: { locked: true } });
          break;
        }

        case '80000008': {
          window.showError(localizedStrings.operationCancelled);
          break;
        }

        case '0': {
          if (statusToastId) {
            toast.dismiss(statusToastId);
            statusToastId = null;
          }

          yield put({ type: 'app/setState', payload: { locked: false } });
          break;
        }

        //case '0'://PAEW_DEV_INFO_LCD_NULL
        //case '1'://PAEW_DEV_INFO_LCD_SHOWLOGO
        case '2': //PAEW_DEV_INFO_LCD_WAITTING
        case '4': //PAEW_DEV_INFO_LCD_SHOWOK
        case '8': //PAEW_DEV_INFO_LCD_SHOWCANCEL
        case '10': //PAEW_DEV_INFO_LCD_SHOWSKEYHASH
        case '20': //PAEW_DEV_INFO_LCD_SHOWADDRESS
        case '40': //PAEW_DEV_INFO_LCD_SHOWBTCSIGN
        case '80': //PAEW_DEV_INFO_LCD_SHOWETHSIGN
        case '100': //PAEW_DEV_INFO_LCD_SETNEWPIN
        case '200': //PAEW_DEV_INFO_LCD_CHANGEPIN
        //case '400'://PAEW_DEV_INFO_LCD_VERIFYPIN
        case '800': //PAEW_DEV_INFO_LCD_PINLOCKED
        case '1000': //PAEW_DEV_INFO_LCD_FORMAT
        case '2000': //PAEW_DEV_INFO_LCD_REBOOT
        case '4000': //PAEW_DEV_INFO_LCD_SHOWBIP39
        case '8000': //PAEW_DEV_INFO_LCD_CHECKBIP39
        case '10000': //PAEW_DEV_INFO_LCD_SHOWBTSSIGN
        case '20000': //PAEW_DEV_INFO_LCD_PINERROR
        case '40000': //PAEW_DEV_INFO_LCD_SELECT_MNENUM
        case '80000': //PAEW_DEV_INFO_LCD_SHOWM
        case '100000': //PAEW_DEV_INFO_LCD_SHOWTIMEOUT
        case '200000': //PAEW_DEV_INFO_LCD_SHOWEOSSIGN
        case '400000': //PAEW_DEV_INFO_LCD_SHOWFAIL
        case '800000': //PAEW_DEV_INFO_LCD_SHOWNEOSIGN
        case '1000000': //PAEW_DEV_INFO_LCD_WAITING_TIMEOUT
        case '2000000': //PAEW_DEV_INFO_LCD_GET_MNENUM
        case '4000000': //PAEW_DEV_INFO_LCD_GETMNE_BYDEV
          // if (!statusToastId) {
          //   statusToastId = 'fakeHoldId';
          //   statusToastId = window.showToast(localizedStrings.errorDeviceStatus, null, 0, true);
          // }
          break;

        default:
          break;
      }
    },
  },
  reducers: {
    setNumber(
      state,
      {
        payload: { DevNum: num },
      }
    ) {
      if (num < 1) {
        return { ...state, num: 0, list: [] };
      }

      return {
        ...state,
        num,
      };
    },
    setAppVer(
      state,
      {
        payload: { ElectronVer, MidWareVer },
      }
    ) {
      return {
        ...state,
        ElectronVer,
        MidWareVer,
      };
    },
    setloopstop(
      state,
      {
        payload: { insetting },
      }
    ) {
      return {
        ...state,
        insetting,
      };
    },

    setLcdState(
      state,
      {
        payload: { lcdState },
      }
    ) {
      return {
        ...state,
        LcdState: lcdState,
      };
    },

    addDevice(
      state,
      {
        payload: { index, device },
      }
    ) {
      const { list: oldList, num } = state;

      let newList = oldList.slice();
      if (index >= oldList.length) {
        newList.push(device);
      } else {
        newList = oldList.map(
          (value, tmpIndex) => (tmpIndex === index ? device : value)
        );
      }

      return {
        ...state,
        list: newList.slice(0, num),
        COSVersion: device.COS,
      };
    },

    clearAllDevices() {
      return {
        num: 0,
        list: [],
        addresses: {},
      };
    },

    setAddresses(state, { payload: addresses }) {
      let tmpAddresses = _.omit(addresses, 'BTS');
      // tmpAddresses = { ...tmpAddresses, ETH: `0x${tmpAddresses.ETH}`, ETC: `0x${tmpAddresses.ETC}` };

      return {
        ...state,
        addresses: tmpAddresses,
      };
    },

    setETHAddress(state, { payload }) {
      console.log('fanshide');
      const newAddresses = Object.assign({}, state.addresses, { ETH: payload });
      console.log('newAddresses', newAddresses);
      return {
        ...state,
        addresses: newAddresses,
      };
    },

    setEOSAddresses(state, { payload: eosAddress }) {
      return {
        ...state,
        eosAddress,
      };
    },

    formatSuccess(state) {
      return {
        ...state,
      };
    },

    formatError(state) {
      return {
        ...state,
      };
    },

    initSuccess(state) {
      return {
        ...state,
      };
    },

    initError(state) {
      return {
        ...state,
      };
    },

    checkStatusSuccess(
      state,
      {
        payload: [{ COS }],
      }
    ) {
      return {
        ...state,
        COSVersion: COS,
        LcdState: 0,
      };
    },

    checkStatusError(state, { payload: resultCode }) {
      let lcdState = 0;
      if (resultCode) {
        console.log('set lcdstate code:', resultCode);
        console.log('current device state:', state);
        lcdState = resultCode;
      }
      return {
        ...state,
        LcdState: lcdState,
      };
    },
    setKeyConfirmAddressStatus(state, { payload }) {
      return {
        ...state,
        confirmOK: payload,
      };
    },
    setKeyStatus(state, { payload }) {
      return {
        ...state,
        keyStatus: payload,
      };
    },
  },
};
