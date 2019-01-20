import { create, getPath } from './window';

export function init() {
  const win = create({
    width: 1100,
    height: 772,
    center: true,
    maximizable: false,
    backgroundColor: '#1f1f1f',
    webPreferences: {
      blinkFeatures: 'OverlayScrollbars',
      nodeIntegrationInWorker: true,
    },
    title: '',
  });
  win.loadURL(getPath());
  win.setFullScreenable(false);
  win.setResizable(false);

  return win;
}
