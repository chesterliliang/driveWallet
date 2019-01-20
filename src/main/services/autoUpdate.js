import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater-debug';
import path from 'path';
import fs from 'fs';
import fetch from 'electron-fetch';
import Promise from 'bluebird';

const delFile = pkgCacheDir => {
  try {
    const filesname = fs.readdirSync(pkgCacheDir);
    filesname.forEach(item => {
      log.info('unlink file path', path.join(pkgCacheDir, item));
      fs.unlinkSync(path.join(pkgCacheDir, item));
    });
  } catch (e) {
    log.info('del pkg file fail: ', e);
  }
};

let signatureRet = 'error';

const removeUpdaterEvent = updater => {
  updater.removeAllListeners('download-progress');
  updater.removeAllListeners('update-downloaded');
  updater.removeAllListeners('update-not-available');
  updater.removeAllListeners('update-available');
};

function updateHandle(event, manualUpdate, updateInstance, autoUpdate) {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  // autoUpdater.allowDowngrade = true; // 允许降级下载

  let feedURL =
    'https://nebuladownload.oss-cn-beijing.aliyuncs.com/wookong/personal/';
  //removeIf(!consoleShow)
  feedURL =
    'https://nebuladownload.oss-cn-beijing.aliyuncs.com/wookong/personal/test_releases/';
  //endRemoveIf(!consoleShow)
  autoUpdater.setFeedURL(feedURL);
  // delFile(autoUpdater.downloadedUpdateHelper.cacheDir);
  log.info('update recieve msg', manualUpdate, updateInstance);
  if ((manualUpdate && updateInstance === 1) || autoUpdate) {
    autoUpdater.checkForUpdates();
  } else {
    removeUpdaterEvent(autoUpdater);
    require('./cos').update(1000, manualUpdate);
    return false;
  }
  log.info('***************');

  autoUpdater.once('update-available', async meta => {
    log.info('[updater] update avaiable', JSON.stringify(meta));
    global.appUpdateInfo = {
      newVersion: true,
      version: meta.version,
    };
    let fetchUrl = 'https://solopkgsignature.nbltrust.com/api/pkgSignature';
    if (process.platform !== 'darwin') {
      fetchUrl =
        'https://solopkgsignature.nbltrust.com/api/pkgSignature?platform=win';
    }
    const { signature } = await fetch(fetchUrl)
      .then(res => res.json())
      .catch(e => console.log('error', e));
    signatureRet = signature;
    const downloadDir = autoUpdater.downloadedUpdateHelper.cacheDir;
    const fileDir = path.join(downloadDir, meta.path);
    const fsExist = fs.existsSync(fileDir);
    if (fsExist) {
      const verifyResult = await global.services.core.driver.verifyPkgSignature(
        fileDir,
        signatureRet
      );
      if (!verifyResult.result) {
        removeUpdaterEvent(autoUpdater);
        const index = dialog.showMessageBox({
          type: 'info',
          buttons: [
            global.localizedStrings.restartNow,
            global.localizedStrings.restartLater,
          ],
          title: global.localizedStrings.updateFinish,
          message: global.localizedStrings.SoftwareUpdateMessage,
          detail: meta.readme,
          cancelId: 1,
        });
        if (index === 0) {
          try {
            autoUpdater.quitAndInstall();
          } catch (e) {
            dialog.showErrorBox('Error', e);
          }
        } else if (index === 1) {
          global.manualUpdate = false;
          global.updateInstance = 0;
          removeUpdaterEvent(autoUpdater);
        }
        return false;
      } else {
        delFile(autoUpdater.downloadedUpdateHelper.cacheDir);
      }
    }
    const { force: forceUpdate, optionalUpdate } = meta;
    let index = null;
    if (!optionalUpdate || manualUpdate) {
      index = dialog.showMessageBox({
        type: 'info',
        buttons: forceUpdate
          ? [global.localizedStrings.download]
          : [global.localizedStrings.download, global.localizedStrings.cancel],
        title: global.localizedStrings.updateAppTitle,
        message: global.localizedStrings.updateAppMessage + meta.version,
        detail: meta.readme,
        cancelId: 1,
      });
    }

    if (optionalUpdate && autoUpdate) {
      removeUpdaterEvent(autoUpdater);
    }

    if (forceUpdate) {
      autoUpdater.downloadUpdate();
      event.sender.send('startUpdate', true);
    } else if (index === 0) {
      autoUpdater.downloadUpdate();
      event.sender.send('startUpdate', true);
    } else if (index === 1) {
      global.manualUpdate = false;
      global.updateInstance = 0;
      removeUpdaterEvent(autoUpdater);
    }
  });

  autoUpdater.once('update-not-available', async () => {
    global.appUpdateInfo = {
      newVersion: false,
    };
    const cosResult = await require('./cos').update(1000, manualUpdate, true);
    if (cosResult && manualUpdate) {
      dialog.showMessageBox({
        type: 'info',
        buttons: [global.localizedStrings.OK],
        title: global.localizedStrings.checkUpdate,
        message: global.localizedStrings.latestTotal,
      });
    } else if (manualUpdate) {
      // dialog.showMessageBox({
      //   type: 'info',
      //   buttons: [global.localizedStrings.OK],
      //   title: global.localizedStrings.updateAppTitle,
      //   message: global.localizedStrings.latestVersion,
      // });
      await require('./cos').update(1000, manualUpdate, false);
    }
    global.manualUpdate = false;
    global.updateInstance = 0;
  });

  autoUpdater.on('download-progress', progressObj => {
    log.info('[updater] download progress', JSON.stringify(progressObj));
    event.sender.send('downloadProgress', progressObj);
    log.info('main send success');
  });

  autoUpdater.once('update-downloaded', meta => {
    let index = null;
    const pkgCacheDir = autoUpdater.downloadedUpdateHelper.cacheDir;
    log.info('pkgCacheDir', pkgCacheDir);
    const pkg = path.join(pkgCacheDir, meta.path);
    global.updateInstance = 0;
    global.services.core.driver
      .verifyPkgSignature(pkg, signatureRet)
      .then(res => {
        log.info('verify res', res);
        if (res.result === 0) {
          log.info('[updater] update downloaded', meta.version);
          Promise.delay(6000).then(() => {
            index = dialog.showMessageBox({
              type: 'info',
              buttons: [
                global.localizedStrings.restartNow,
                global.localizedStrings.restartLater,
              ],
              title: global.localizedStrings.updateFinish,
              message: global.localizedStrings.updateAPPRestartMessage,
              detail: meta.readme,
              cancelId: 1,
            });
            if (index === 0) {
              try {
                autoUpdater.quitAndInstall();
              } catch (e) {
                dialog.showErrorBox('Error', e);
              }
            } else if (index === 1) {
              global.manualUpdate = false;
              global.updateInstance = 0;
              removeUpdaterEvent(autoUpdater);
              // require('./cos').update(1000);
            }
          });
        } else {
          delFile(pkgCacheDir);
          dialog.showMessageBox({
            type: 'warning',
            buttons: [global.localizedStrings.OK],
            title: global.localizedStrings.updateAppTitle,
            message: global.localizedStrings.pkgSignFailMessage,
            detail: global.localizedStrings.pkgSignFailDetail,
          });
          global.manualUpdate = false;
          global.updateInstance = 0;
          removeUpdaterEvent(autoUpdater);
        }
      });
  });

  autoUpdater.on('error', err => {
    log.error('[updater] update error', err);
    global.manualUpdate = false;
    global.updateInstance = 0;
    removeUpdaterEvent(autoUpdater);
  });
}

module.exports = {
  updateHandle,
  delFile,
};
