import { Menu } from 'electron';
import log from 'electron-log';

function getTemplate() {
  const template = [
    {
      label: 'WOOKONG Solo',
      submenu: [
        { role: 'hide', label: 'Hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
      ],
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
  ];

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'development') {
    template[1].submenu.push({ role: 'toggledevtools' });
  }

  return template;
}

export function init() {
  log.info('(menu) init');
  const menu = Menu.buildFromTemplate(getTemplate());
  Menu.setApplicationMenu(menu);
}
