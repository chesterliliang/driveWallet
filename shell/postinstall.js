const defaultShell = require('default-shell');
const shell = require('shelljs');

if (defaultShell.toLowerCase().indexOf('windows') !== -1) {
  shell.exec(
    '..\\node_modules\\.bin\\electron-rebuild.cmd --force -d https://gh-contractor-zcbenz.cnpmjs.org/atom-shell/dist/'
  );
} else {
  shell.exec(
    '../node_modules/.bin/electron-rebuild --force -d https://gh-contractor-zcbenz.cnpmjs.org/atom-shell/dist/'
  );
}
