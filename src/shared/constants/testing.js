export const nodeEnv = 'development';

export const IPC_CHANNEL = 'ipc';

export const testnet = nodeEnv === 'development';
export const rootDerivePath = testnet ? "m/44'/0'/0'" : "m/44'/0'/0'";

export const coinNameDic = {
  bitcoin: 'BTC',
};

export const apiServer = {
  development: 'http://101.132.41.225:3443',
  production: 'https://api.51nebula.com',
}[nodeEnv];

export const socketServer = {
  development: 'http://101.132.41.225:3443',
  production: 'http://114.55.100.133:3000',
}[nodeEnv];

export const externalSites = {
  BTC: 'https://www.blocktrail.com/tBTC',
  ETH: 'https://kovan.etherscan.io',
};
