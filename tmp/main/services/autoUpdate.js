import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

const Message = {
  error: 'Unable to check for updates',
  checking: 'Checking for updates...',
  updateAvailable: 'Please confirm to download this version: ',
  updateNotAvailabe: 'No new release found. You have installed the latest version.',
  downloaded: 'New version will be available after restart.',
};

function updateHandle() {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';

  autoUpdater.autoDownload = false;
  autoUpdater.setFeedURL('https://nebuladownload.oss-cn-beijing.aliyuncs.com/wookong/personal/');
  // 'http://118.31.68.5/7-dragon-ball-wallet/personal/client/wookong/erc20list.json'
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', (meta) => {
    log.info('[updater] update avaiable', JSON.stringify(meta));

    const { force: forceUpdate } = meta;

    const index = dialog.showMessageBox({
      type: 'info',
      buttons: forceUpdate ? ['Confirm'] : ['Confirm', 'Cancel'],
      title: 'New release found',
      message: Message.updateAvailable + meta.version,
      detail: meta.readme,
    });

    if (forceUpdate) {
      autoUpdater.downloadUpdate();
    } else if (index === 0) {
      autoUpdater.downloadUpdate();
    }
  });

  autoUpdater.on('update-not-available', () => {
    // dialog.showMessageBox({
    //   type: 'info',
    //   buttons: ['确定'],
    //   title: '软件更新',
    //   message: Message.updateNotAvailabe,
    // });
  });

  autoUpdater.on('download-progress', (progressObj) => {
    log.info('[updater] download progress', JSON.stringify(progressObj));
  });

  autoUpdater.on('update-downloaded', (meta) => {
    log.info('[updater] update downloaded', meta.version);
    const index = dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart now', 'later'],
      title: 'Updates downloaded',
      message: Message.downloaded + meta.version,
      detail: meta.readme,
    });

    if (index === 0) {
      try {
        autoUpdater.quitAndInstall();
      } catch (e) {
        dialog.showErrorBox('Error', 'Failed to install updates');
      }
    }
  });

  autoUpdater.on('error', (err) => {
    log.error('[updater] update error', err);
    // dialog.showMessageBox({
    //   type: 'error',
    //   // icon: appIcon,
    //   buttons: ['确定'],
    //   title: '软件更新',
    //   message: Message.error,
    //   detail: JSON.stringify(err),
    // });
  });
}

module.exports = {
  updateHandle,
};
