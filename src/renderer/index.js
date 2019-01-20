import dva from 'dva';
import NProgress from 'nprogress';
import React from 'react';
import { toast } from 'react-toastify';
import { reducer as formReducer } from 'redux-form';
import { init, configureScope } from '@sentry/electron';
import localForage from 'localforage';
import createHistory from 'history/createBrowserHistory';

import { isElectron } from 'shared/utils';
import constants from 'shared/constants';

import router from './router';

import './theme/app.global.css';

let environment = 'production';

//removeIf(!consoleShow)
environment = 'development';
//endRemoveIf(!consoleShow)

init({
  dsn: 'https://669e2de5b3ac488398cb41592cba7cce@sentry.nbltrust.com/9',
  sendDefaultPii: true,
  environment,
  onFatalError: error => console.log('Something!'),
});

if (isElectron()) {
  const { remote } = require('electron'); // eslint-disable-line global-require
  const { core } = remote.getGlobal('services');
  console.log('---------', core);
  window.clientCore = core;
}

// disable zoom
require('electron').webFrame.setVisualZoomLevelLimits(1, 1);

window.showToast = (text, onClick, autoClose = 5000, closeable = true) => {
  const content = (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <span style={{ display: 'block', width: '100%', wordWrap: 'break-word' }}>
        {text}
      </span>
    </div>
  );

  const config = {
    className: 'dark-toast',
    progressClassName: 'transparent-progress',
    autoClose,
  };

  if (!closeable) {
    config.closeButton = false;
    config.closeOnClick = false;
  }

  return toast(content, config);
};

window.showError = (text, onClick, autoClose = 3000, closeable = true) => {
  const content = (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <span style={{ display: 'block', width: '100%', wordWrap: 'break-word' }}>
        {text}
      </span>
    </div>
  );

  const config = {
    type: 'error',
    progressClassName: 'transparent-progress',
    autoClose,
  };

  if (!closeable) {
    config.closeButton = false;
    config.closeOnClick = true;
  }

  return toast(content, config);
};

window.showLoading = () => {
  if (!NProgress.isRendered()) {
    NProgress.start();
  }
};

window.dismissLoading = () => {
  if (NProgress.isRendered()) {
    NProgress.done();
    NProgress.remove();
  }
};

async function startApp() {
  let settings = {
    language: 'en',
    ethDerivePath: 'fourLevel',
    fiatType: 'USD',
  };
  try {
    const value = await localForage.getItem('settings');
    settings = { ...settings, ...value };
  } catch (error) {
    //
  }
  constants.strings.setLanguage(settings.language);
  window.localizedStrings = constants.strings;

  // 1. Initialize
  const app = (global.app = dva({
    // history: createHistory(),
    extraReducers: { form: formReducer },
    onError(error) {
      console.error(error);
    },
  }));

  // 2. Plugins
  // app.use({});

  // 3. Model
  app.model(require('./models/app').default);
  app.model(require('./models/data').default);
  app.model(require('./models/device').default);
  app.model(require('./models/wallet').default);
  app.model(require('./models/send').default);

  // 4. Router
  app.router(router);

  // 5. Start
  app.start('#root');

  app._store.dispatch({ type: 'app/setSettings', payload: settings });
  const ipc = require('electron').ipcRenderer;
  ipc.send('localizedStrings', window.localizedStrings, settings.language);
}

startApp();
