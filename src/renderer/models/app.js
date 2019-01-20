import Promise from 'bluebird';

export default {
  namespace: 'app',
  state: {
    modals: [],
    locked: false,
    outloading: false,
    settings: {
      language: 'en',
      ethDerivePath: 'fourLevel',
      fiatType: 'USD',
    },
    progressObj: null,
    toastNum: 0,
    startUpdate: false,
    progressFull: false,
  },
  subscriptions: {
    setupDeviceListener({ dispatch }) {
      clientCore.driver.onPinStatus((error, status, handleType) => {
        if (!error) {
          console.log(`device status: ${status}`, handleType);
          const handleTypeRe = [
            'register',
            'keyConfirmAddress',
            'getAppVersion',
          ].includes(handleType)
            ? 'legal'
            : 'unlegal';
          dispatch({
            type: 'device/handleStatus',
            payload: { status, handleType: handleTypeRe },
          });
        } else {
          console.error(error);
        }
      });
    },
  },
  effects: {
    *pushModal({ payload }, { put, take }) {
      if (['coinInfo', 'register'].includes(payload.modalType)) {
        yield put({
          type: 'data/clientCoreInvoke',
          payload: {
            category: 'driver',
            fn: 'getStatus',
            args: ['keyConfirmAddress'],
            handleType: 'keyConfirmAddress',
          },
        });
        const { type: actionType } = yield take([
          'device/checkStatusSuccess',
          'device/checkStatusError',
        ]);
        if (actionType !== 'device/checkStatusSuccess') {
          window.dismissLoading();
          yield put({ type: 'app/setState', payload: { locked: false } });
          return false;
        }
      }
      yield put({
        type: 'addModal',
        payload: { modalHover: false, ...payload, modalOpen: true },
      });
    },

    *popModal({ payload }, { call, select, put }) {
      const { modals } = yield select(state => state.app);
      if (modals.length > 0) {
        if (modals.length < 2) {
          yield put({
            type: 'setModal',
            payload: { modalOpen: false, modalHover: false },
          });
          yield call(Promise.delay, 300);
        }

        const { count } = payload || { count: 1 };
        yield put({ type: 'removeModal', payload: { count: count || 1 } });
      }
    },

    *clearAllModals({ payload }, { call, select, put }) {
      const { modals } = yield select(state => state.app);
      if (modals.length > 0) {
        yield put({
          type: 'setModal',
          payload: { modalOpen: false, modalHover: false },
        });
        yield call(Promise.delay, 300);

        yield put({ type: 'removeModal', payload: { count: modals.length } });
      }
    },

    *saveProgrssInfo({ payload }, { put }) {
      console.log('saveProgrssInfo', payload);
      yield put({ type: 'setState', payload: { progressObj: payload } });
      if (payload.percent === 100) {
        yield put({ type: 'setState', payload: { progressFull: true } });
      }
    },

    *progressSettings({ payload }, { put }) {
      console.log('saveprogressSettings', payload);
      yield put({ type: 'setState', payload });
    },

    *verifyPkg({ payload }, { put }) {
      const { signature } = yield fetch(
        'http://47.75.154.248:9001/api/pkgSignature'
      ).then(response => response.json());
      yield put({
        type: 'data/clientCoreInvoke',
        payload: {
          category: 'driver',
          fn: 'verifyPkgSignature',
          args: [payload, signature],
        },
      });
    },
  },
  reducers: {
    setModal(state, { payload }) {
      const newModals = state.modals.map((modal, index, arr) => {
        if (index < arr.length - 1) {
          return modal;
        }

        const { modalProps: oldProps } = modal || { modalProps: {} };
        const { modalProps: newProps } = payload || { modalProps: {} };
        return {
          ...modal,
          ...payload,
          modalProps: { ...oldProps, ...newProps },
        };
      });

      return {
        ...state,
        modals: newModals,
      };
    },

    addModal(state, { payload }) {
      const oldModals = state.modals.map(modal => ({
        ...modal,
        modalOpen: false,
      }));

      return {
        ...state,
        modals: [...oldModals, payload],
      };
    },

    removeModal(
      state,
      {
        payload: { count },
      }
    ) {
      const newModals = state.modals
        .slice(0, -count)
        .map((modal, index, arr) => {
          return index < arr.length - 1 ? modal : { ...modal, modalOpen: true };
        });

      return {
        ...state,
        modals: newModals,
      };
    },

    setState(state, { payload: newState }) {
      return {
        ...state,
        ...newState,
      };
    },

    setSettings(state, { payload }) {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload,
        },
      };
    },
  },
};
