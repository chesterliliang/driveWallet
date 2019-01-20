import dva from 'dva';
import NProgress from 'nprogress';
import React from 'react';
import { toast } from 'react-toastify';
import { reducer as formReducer } from 'redux-form';
import localForage from 'localforage';

import { isElectron } from 'shared/utils';
import * as constants from 'shared/constants';

import './theme/app.global.css';

if (isElectron()) {
  const { remote } = require('electron'); // eslint-disable-line global-require
  const { core } = remote.getGlobal('services');
  window.clientCore = core;
}


window.showToast = (text, onClick, autoClose = 5000, closeable = true) => {
  const content = (
    <div
      style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center' }}
      onClick={onClick}
    >
      <span style={{ display: 'block', width: '100%', wordWrap: 'break-word' }}>{text}</span>
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

window.showError = (text, onClick, autoClose = 2000, closeable = true) => {
  const content = (
    <div
      style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center' }}
      onClick={onClick}
    >
      <span style={{ display: 'block', width: '100%', wordWrap: 'break-word' }}>{text}</span>
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
  let settings = { language: 'en' };
  try {
    const value = await localForage.getItem('settings');
    settings = { ...settings, ...value };
  } catch (error) {
    //
  }
  constants.strings.setLanguage(settings.language);
  window.localizedStrings = constants.strings;

  // 1. Initialize
  const app = global.app = dva({ extraReducers: { form: formReducer } });

  // 2. Plugins
  // app.use({});

  // 3. Model
  app.model(require('./models/app'));
  app.model(require('./models/data'));
  app.model(require('./models/device'));
  app.model(require('./models/wallet'));
  app.model(require('./models/send'));

  // 4. Router
  app.router(require('./router'));

  // 5. Start
  app.start('#root');

  app._store.dispatch({ type: 'app/setSettings', payload: settings });
  const ipc = require('electron').ipcRenderer;
  ipc.send('localizedStrings', window.localizedStrings, settings.language);
}

startApp();
