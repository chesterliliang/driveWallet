import Promise from 'bluebird';

export default {
  namespace: 'app',
  state: {
    modals: [],
    locked: false,
    outloading: false,
    settings: {
      language: 'en',
    },
  },
  subscriptions: {
    setupDeviceListener({ dispatch }) {
      clientCore.driver.onPinStatus((error, status) => {
        if (!error) {
          console.log(`device status: ${status}`);
          dispatch({ type: 'device/handleStatus', payload: { status } });
        } else {
          console.error(error);
        }
      });
    },
  },
  effects: {
    * pushModal({
      payload,
    }, { put }) {
      yield put({ type: 'addModal', payload: { modalHover: false, ...payload, modalOpen: true } });
    },

    * popModal({
      payload,
    }, { call, select, put }) {
      const { modals } = yield select(state => state.app);
      if (modals.length > 0) {
        if (modals.length < 2) {
          yield put({ type: 'setModal', payload: { modalOpen: false, modalHover: false } });
          yield call(Promise.delay, 300);
        }

        const { count } = payload || { count: 1 };
        yield put({ type: 'removeModal', payload: { count: count || 1 } });
      }
    },

    * clearAllModals({
      payload,
    }, { call, select, put }) {
      const { modals } = yield select(state => state.app);
      if (modals.length > 0) {
        yield put({ type: 'setModal', payload: { modalOpen: false, modalHover: false } });
        yield call(Promise.delay, 300);

        yield put({ type: 'removeModal', payload: { count: modals.length } });
      }
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
        return { ...modal, ...payload, modalProps: { ...oldProps, ...newProps } };
      });

      return {
        ...state,
        modals: newModals,
      };
    },

    addModal(state, { payload }) {
      const oldModals = state.modals.map(modal => ({ ...modal, modalOpen: false }));

      return {
        ...state,
        modals: [...oldModals, payload],
      };
    },

    removeModal(state, { payload: { count } }) {
      const newModals = state.modals.slice(0, -count).map((modal, index, arr) => {
        return (index < arr.length - 1) ? modal : { ...modal, modalOpen: true };
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
      }
    }
  },
};
