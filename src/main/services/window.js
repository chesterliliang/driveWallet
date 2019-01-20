import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow } from 'electron';

let count = 0;
let windows = [];

export function create(opts) {
  count += 1;
  let win = new BrowserWindow({ ...opts, show: false });

  //removeIf(!consoleShow)
  win.webContents.openDevTools();
  //endRemoveIf(!consoleShow)

  if (opts.maximize) {
    win.maximize();
  }
  // win.show();

  win.on('close', () => {
    count -= 1;
    windows = windows.filter(item => item !== win);
    win = null;
  });

  windows = [...windows, win];

  return win;
}

export function getCount() {
  return count;
}

export function getWindows() {
  return windows;
}

export function getPath() {
  let path = `file://${join($dirname, '..', 'dist')}/index.html`;
  if (is.dev()) {
    const {
      serverIp,
      serverPort,
    } = require('../../../webpack.config.renderer.babel.js'); // eslint-disable-line global-require
    path = `http://${serverIp}:${serverPort}/index.html`;
  }
  return path;
}
