
export const nodeEnv = 'staging';

export const IPC_CHANNEL = 'ipc';

export const testnet = nodeEnv === 'development';
export const rootDerivePath = testnet ? "m/44'/1'/0'" : "m/44'/0'/0'";

export const coinNameDic = {
  bitcoin: 'BTC',
};

export const apiServer = 'http://114.55.100.133:8002';

export const socketServer = 'http://114.55.100.133:8002';

export const externalSites = {
  BTC: 'https://blockchain.info',
  ETH: 'https://etherscan.io',
};
