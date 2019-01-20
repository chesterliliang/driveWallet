export const nodeEnv = 'production';

export const IPC_CHANNEL = 'ipc';

export const testnet = nodeEnv === 'development';
export const rootDerivePath = testnet ? "m/44'/1'/0'" : "m/44'/0'/0'";

export const coinNameDic = {
  bitcoin: 'BTC',
};

export const apiServer = {
  development: 'http://114.55.100.133:3000',
  production: 'https://api.51nebula.com',
}[nodeEnv];

export const socketServer = {
  development: 'http://114.55.100.133:3000',
  production: 'https://api.51nebula.com',
}[nodeEnv];

export const externalSites = {
  BTC: 'https://blockchain.info',
  ETH: 'https://etherscan.io',
  ETC: 'http://gastracker.io',
  LTC: 'https://bchain.info/LTC',
  NEO: 'https://scan.nel.group/zh/#mainnet',
  CYB: 'https://dex.cybex.io',
  EOS: 'https://eosflare.io',
  USDT: 'https://omniexplorer.info',
  XRP: 'https://xrpcharts.ripple.com/#',
};
