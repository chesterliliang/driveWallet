import blockies from 'blockies';
import md5 from 'md5';
import Big from 'big.js';

import * as errorUtil from './error';

const bitcoin = {
  COIN: 100000000,
  PRECISION: 8,
};

const ethereum = {
  COIN: 1000000000000000000,
  PRECISION: 18,
};

export function isElectron() {
  // Renderer process
  if (
    typeof window !== 'undefined' &&
    typeof window.process === 'object' &&
    window.process.type === 'renderer'
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === 'object' &&
    typeof window.navigator.userAgent === 'string' &&
    window.navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true;
  }

  return false;
}

export function openExternalLink(url, event) {
  if (isElectron()) {
    const { shell } = require('electron');
    event.preventDefault();
    shell.openExternal(url);
  } else {
    event.preventDefault();
    window.open(url, '_blank');
  }
}

export function createIdentityImg(address, scale = 8) {
  return blockies({
    seed: (address || '').toLowerCase(),
    size: 8,
    scale,
  }).toDataURL();
}

export async function getPubkForage() {
  if (typeof window !== 'undefined') {
    if (!window.secureStorage) {
      window.secureStorage = {};
    }

    const md5Key = md5(rootPublicExtendedKey);
    if (!window.secureStorage[md5Key]) {
      const localForage = require('localforage');
      const store = localForage.createInstance({ name: md5Key });
      await store.ready();
      window.secureStorage[md5Key] = store;
    }

    return window.secureStorage[md5Key];
  }

  return null;
}

export function toBTC(satoshi) {
  return new Big(satoshi).div(bitcoin.COIN).toFixed(bitcoin.PRECISION);
}

export function toSatoshi(btc) {
  return parseInt(new Big(btc).times(bitcoin.COIN)); // eslint-disable-line radix
}

export function toETH(value) {
  return new Big(value).div(ethereum.COIN).toFixed(ethereum.PRECISION);
}

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = window.atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  return new window.Blob([ab], { type: mimeString });
}

export function decimalToHexString(number) {
  if (number < 0) {
    number = 0xffffffff + number + 1; // eslint-disable-line no-param-reassign
  }

  return number.toString(16).toUpperCase();
}

exports.handleError = errorUtil.handle;
