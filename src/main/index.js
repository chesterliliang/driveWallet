import { app, BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';
import log from 'electron-log';
import Promise from 'bluebird';
import util from 'util';
import { init, configureScope } from '@sentry/electron';

import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as config from './configs';
import { updateHandle } from './services/autoUpdate';
import startSpeed from './services/childProcessSpeed';

const ipc = require('electron').ipcMain;

log.transports.console = msg => {
  const text = util.format(msg.text);
  console.log(`[${msg.date.toLocaleTimeString()}] [${msg.level}] ${text}`);
};

ipc.on('localizedStrings', (event, localizedStrings, lang) => {
  global.localizedStrings = localizedStrings;
  global.lang = lang;
});

global.manualUpdate = false;
global.updateInstance = 0;

log.transports.file.level = 'info';

log.info('(main/index) >>>>>>>>>>>>>>>>>>');
log.info('(main/index) app start');

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
  process.env.NODE_CONFIG_DIR = 'app/dist';
  process.env.CACHE_DIR = 'app/dist/cache';
} else {
  const configPath = `${app.getAppPath()}/dist`;
  require('dotenv').config({ path: `${configPath}/production.env` }); // eslint-disable-line global-require
  process.env.NODE_CONFIG_DIR = configPath;
  process.env.CACHE_DIR = `${app.getPath('userData')}/dist/cache`;
  // process.env.CACHE_DIR = `${app.getAppPath()}/dist/cache`;
}

function launchApp() {
  const win = application.init();

  require('electron-unhandled')({ showDialog: is.dev() }); // eslint-disable-line global-require

  // 加载 devtools extension
  if (is.dev()) {
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/redux-devtools/2.11.1_0')
    );
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/react-developer-tools/0.15.4_0')
    );
  }

  global.services.core = {
    driver: require('./services/core/driver'), // eslint-disable-line global-require
    btc: require('./services/core/bitcoin'), // eslint-disable-line global-require
    cos: require('./services/cos'), // eslint-disable-line global-require
    autoUpdate: require('./services/autoUpdate'), // eslint-disable-line global-require
    childProcessSpeed: require('./services/childProcessSpeed').default, // eslint-disable-line global-require
    fiatServices: require('./services/core/fiatBalances'), // eslint-disable-line global-require
  };

  return win;
}

async function showSplash() {
  const windowOptions = {
    width: 1100,
    height: 772,
    transparent: true,
    frame: false,
    center: true,
    hasShadow: false,
    alwaysOnTop: true,
    webPreferences: {
      blinkFeatures: 'OverlayScrollbars',
    },
  };

  const splashWindow = window.create(windowOptions);
  // splashWindow.webContents.openDevTools();
  // Menu.setApplicationMenu(Menu.buildFromTemplate([]));

  let path = `file://${join($dirname, '..', 'pages')}/splash.html`;
  if (is.dev()) {
    const {
      serverIp,
      serverPort,
    } = require('../../webpack.config.renderer.babel.js'); // eslint-disable-line global-require
    path = `http://${serverIp}:${serverPort}/splash-dev.html`;
  }
  splashWindow.loadURL(path);

  await Promise.delay(800);
  splashWindow.show();

  return new Promise(resolve => {
    const update = index => {
      // splashWindow.webContents.send('update', index);
      // if (index < 136) {
      //   setTimeout(() => update(index + 1), 40);
      // } else {
      setTimeout(() => {
        splashWindow.close();
        resolve();
      }, 0);
      // }
    };

    update(0);
  });
}

const isSecondInstance = app.makeSingleInstance(() => {
  // Someone tried to run a second instance, we should focus our window.
  if (window.getCount() > 0) {
    const lastWin = window
      .getWindows()
      .slice(-1)
      .pop();
    if (lastWin.isMinimized()) {
      lastWin.restore();
    }

    lastWin.focus();
  }
});

if (isSecondInstance) {
  app.quit();
}

app.on('ready', async () => {
  log.info('(main/index) app ready');
  init({
    dsn: 'https://669e2de5b3ac488398cb41592cba7cce@sentry.nbltrust.com/9',
    sendDefaultPii: true,
    environment: is.dev() ? 'development' : 'production',
    onFatalError: error => console.log('Something!'),
  });

  const appWindow = launchApp();
  await showSplash();

  appWindow.show();
  if (process.platform === 'darwin') {
    menu.init();
  }
  const { speedNodes, node } = require('config');
  startSpeed(speedNodes, node);
  ipc.once('checkupdate', (event, message) => {
    log.info('main recieve message', message);
    if (is.production()) {
      updateHandle(event, false, 1, true);
    }
  });
  // await require('./services/cos').update();
});

app.on('browser-window-created', (event, win) => {
  win.setMenu(null);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window.getCount() === 0) {
    const appWindow = launchApp();
    appWindow.show();
  }
});

ipc.on('optionalUpdate', (event, message) => {
  ++global.updateInstance;
  log.info('main recieve optionalUpdate message', global.manualUpdate, message);
  if (is.production() && !global.manualUpdate && message) {
    global.manualUpdate = true;
    updateHandle(event, message, global.updateInstance, false);
  }
});

app.on('quit', () => {
  log.info('(main/index) app quit');
  log.info('(main/index) <<<<<<<<<<<<<<<<<<<');
});

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
};
global.configs = {
  config,
};

global.localizedStrings = 'undefined';
global.lang = 'undefined';
