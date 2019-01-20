import { app, BrowserWindow, Menu } from 'electron';
import is from 'electron-is';
import { join } from 'path';
import log from 'electron-log';
import Promise from 'bluebird';

import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as config from './configs';
import { updateHandle } from './services/autoUpdate';
const ipc = require('electron').ipcMain;
ipc.on("localizedStrings", (event, localizedStrings, lang) => {
  global.localizedStrings = localizedStrings;
  global.lang = lang;
})

log.transports.file.level = 'info';

log.info('(main/index) >>>>>>>>>>>>>>>>>>');
log.info('(main/index) app start');
log.info(`(main/index) log file at ${log.findLogPath()}`);

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
  process.env.NODE_CONFIG_DIR = 'app/dist';
  process.env.CACHE_DIR = 'app/dist/cache';
} else {
  const configPath = `${app.getAppPath()}/dist`;
  require('dotenv').config({ path: `${configPath}/production.env` }); // eslint-disable-line global-require
  process.env.NODE_CONFIG_DIR = configPath;
  process.env.CACHE_DIR = `${app.getAppPath()}/dist/cache`;
}

function launchApp() {
  const win = application.init();

  require('electron-unhandled')({ showDialog: is.dev() }); // eslint-disable-line global-require

  // 加载 devtools extension
  if (is.dev()) {
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/redux-devtools/2.11.1_0'),
    );
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/react-developer-tools/0.15.4_0'),
    );
  }

  global.services.core = {
    driver: require('./services/core/driver'), // eslint-disable-line global-require
    btc: require('./services/core/bitcoin'), // eslint-disable-line global-require
    eth: require('./services/core/ethereum'), // eslint-disable-line global-require
    ltc: require('./services/core/litecoin'), // eslint-disable-line global-require
    neo: require('./services/core/neon'), // eslint-disable-line global-require
    cyb: require('./services/core/cybex'), // eslint-disable-line global-require
    erc20: require('./services/core/erc20'), // eslint-disable-line global-require
    cos: require('./services/cos'), // eslint-disable-line global-require
  };

  return win;

  // // test load config
  // const { config: cfg } = global.nblservices['app.service'];
  // dialog.showMessageBox({ message: JSON.stringify(cfg) });
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

  // Menu.setApplicationMenu(Menu.buildFromTemplate([]));

  let path = `file://${join($dirname, '..', 'pages')}/splash.html`;
  if (is.dev()) {
    const { serverIp, serverPort } = require('../../webpack.config.renderer.babel.js'); // eslint-disable-line global-require
    path = `http://${serverIp}:${serverPort}/splash-dev.html`;
  }
  splashWindow.loadURL(path);

  await Promise.delay(800);
  splashWindow.show();

  return new Promise((resolve) => {
    const update = (index) => {
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
    const lastWin = window.getWindows().slice(-1).pop();
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

  const appWindow = launchApp();
  await showSplash();

  appWindow.show();
  if (process.platform == 'darwin') {
    menu.init();
  }

  await require('./services/cos').update();

  if (is.production()) {
    updateHandle();
  }
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
    application.init();
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
