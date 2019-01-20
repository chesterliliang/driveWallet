import { app, dialog } from 'electron';
import axios from 'axios';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import unusedFilename from 'unused-filename';
import { createHash } from 'crypto';

import { getCOSVersion, updateCOS } from './core/driver';
import * as window from './window';

let timerID = null;

function checkCOSVersion() {
  return new Promise((resolve) => {
    timerID = setInterval(() => {
      const version = getCOSVersion();
      if (!!version) {
        clearInterval(timerID);
        resolve(version);
      }
    }, 10000);
  });
}

async function getUpdateInfo() {
  const url = 'https://nebuladownload.oss-cn-beijing.aliyuncs.com/wookong/personal/COS/latest-cos.json';

  const response = await axios.get(url);
  console.log('getUpdateInfo response.data = ',response.data)
  return response.data;
}

function downloadCOSPkg(url) {
  const win = window.getWindows().slice(-1).pop();
  win.webContents.downloadURL(url);
  win.webContents.session.on('will-download', (event, item, webContents) => {
    const cacheDir = process.env.CACHE_DIR;
    const dir = `${cacheDir}/cos/`;

    const name = item.getFilename();
    const filePath = unusedFilename.sync(path.resolve(dir, name));

    item.setSavePath(filePath);

    item.once('done', (event, state) => {
      if (state === 'completed') {
        const index = dialog.showMessageBox({
          type: 'info',
          buttons: [global.localizedStrings.restartNow, global.localizedStrings.restartLater],
          title: global.localizedStrings.updateCOSRestartTitle,
          message: global.localizedStrings.updateCOSRestartMessage,
        });
    
        if (index === 0) {
          app.relaunch();
          app.exit(0);
        }
      }
    });
  });
}

function hashFile(file) {
  return new Promise((resolve, reject) => {
    const algorithm = 'sha512';
    const hash = createHash(algorithm);
    hash.on('error', reject).setEncoding('base64');

    fs.createReadStream(file, { highWaterMark: 1024 * 1024 /* better to use more memory but hash faster */ })
      .on('error', reject)
      .on('end', () => {
        hash.end();
        resolve(hash.read());
      })
      .pipe(hash, { end: false });
  });
}

async function checkHash(file, hash) {
  try {
    const computedHash = await hashFile(file);
    console.log('computedHash = ',computedHash)
    console.log('hash = ',hash)
    console.log('return ',hash===computedHash)
    return hash === computedHash;
  } catch (error) {
    console.error(error)
    return false;
  }
}

async function checkDownloaded(cosVersion) {
  const cacheDir = process.env.CACHE_DIR;
  const dir = `${cacheDir}/cos/`;
  const readdirAsync = Promise.promisify(fs.readdir);

  let files = null;
  try {
    files = await readdirAsync(dir);
  } catch (error) {
    return null;
  }

  const sortedFiles =
    files
      .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item) && (/\w+\.bin$/g).test(item)) //过滤隐藏文件及非.bin文件
      .map((fileName) => {
        return {
          name: fileName,
          time: fs.statSync(dir + fileName).ctime.getTime(),
        };
      })
      .sort((a, b) => {
        return b.time - a.time;
      })
      .map(item => item.name);

  const latestFile = sortedFiles.slice(0, 1).pop();
  console.log('latestFile = ',latestFile)
  if (!latestFile) {
    return null;
  }

  const { hash, cosVersion: newVersion } = await getUpdateInfo();
  const intnewVersion = parseInt(newVersion.slice(4, 8), 16)
  const intcosVersion = cosVersion[3] + 16*cosVersion[2]
  console.log('Int_newVersion = ', intnewVersion, ' Int_cosVersion', intcosVersion)
  console.log('checkDownloaded hash = ', hash,' intcosVersion = ' , intcosVersion)

  let verified = await checkHash(path.resolve(dir, latestFile), hash);
  console.log('checkDownloaded1 verified = ',verified)
  verified = verified && (intnewVersion > intcosVersion);
  console.log('checkDownloaded2 verified = ',verified)

  if (verified) {
    return path.resolve(dir, latestFile);
  }

  return null;
}

async function burn(COSPath) {
  const readFileAsync = Promise.promisify(fs.readFile);

  let data = -1;

  try {
    const fileContent = await readFileAsync(COSPath);
    data = await updateCOS(fileContent) || data;

    const resultCode = data.result || parseInt(data, 10);
    if (!resultCode) { // 更新成功
      // 删除cos文件
      fs.unlinkSync(COSPath);

      // 重启软件
      app.relaunch();
      app.exit(0);
    }
  } catch (error) {
    console.error(error);
  } finally {
    return data;
  }
}

async function update() {
  if (timerID) {
    return;
  }

  const cosVersion = await checkCOSVersion()
  console.log('update cosVersion = ', cosVersion)
  const existedCOS = await checkDownloaded(cosVersion)
  console.log('update existedCOS = ', existedCOS)
  if (existedCOS) {
    return;
  }

  const appVersion = app.getVersion()
  const { cosVersion: newVersion, minAppVersion, force: forceUpdate, readme, readme_en, COSUrl } = await getUpdateInfo();
  console.log('update getUpdateInfo  = ',newVersion)
  const intnewVersion = parseInt(newVersion.slice(4,8),16)
  const intcosVersion = cosVersion[3] + 16*cosVersion[2]
  console.log('Int_newVersion = ', intnewVersion, ' Int_cosVersion',intcosVersion)
  if (appVersion >= minAppVersion && intnewVersion > intcosVersion) {
    // let lang = global.language;
    // updateCosStrings.setLanguage(global.language);
    // let localizedStrings = updateCosStrings;
    // const index = dialog.showMessageBox({
    //   type: localizedStrings.info,
    //   buttons: forceUpdate ? localizedStrings.download : [localizedStrings.download, localizedStrings.cancel],
    //   title: localizedStrings.title,
    //   message: localizedStrings.message,
    //   detail: lang==='en' ? readme_en : readme,
    // });
    console.log(`global.localizedStrings.updateCOSTitle = ${global.localizedStrings.updateCOSTitle}`)
    console.log(`global.localizedStrings.updateCOSMessage = ${global.localizedStrings.updateCOSMessage}`)
    const index = dialog.showMessageBox({
      type: 'info',
      buttons: forceUpdate ? global.localizedStrings.download : [global.localizedStrings.download, global.localizedStrings.cancel],
      title: global.localizedStrings.updateCOSTitle,
      message: global.localizedStrings.updateCOSMessage,
      detail: global.lang.toLowerCase()==='en' ? readme_en : readme,
    });

    if (forceUpdate) {
      downloadCOSPkg(COSUrl);
    } else if (index === 0) {
      downloadCOSPkg(COSUrl);
    }
  }
}

export {
  update,
  checkDownloaded,
  burn,
};
