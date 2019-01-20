const { Api, CONST, TYPE, callback, CallbackParam } = require('./common');
const ref = require('ref');

const { voidPP, uint32Array } = TYPE;
// const {
//   BTC_DERIVE_PATH,
//   LTC_DERIVE_PATH,
//   NEO_DERIVE_PATH,
//   ETH_DERIVE_PATH,
//   ETC_DERIVE_PATH,
//   CYB_DERIVE_PATH,
//   EOS_DERIVE_PATH,
// } = CONST;
const COIN = {
  BTC: 0,
  ETH: 1,
  CYB: 2,
  EOS: 3,
  LTC: 4,
  NEO: 5,
  ETC: 6,
  XRP: 9,
  USDT: 10,
};

const keyConfirmAddress = async (coinType, closeModal, derivePath) => {
  console.log('coinType', coinType);
  console.log('closeModal', closeModal);
  console.log('derivePath', derivePath);
  console.log('COIN[coinType]', COIN[coinType]);
  const ppPAEWContext = ref.alloc(voidPP);
  const param = new CallbackParam();
  const devCounter = ref.alloc('int');
  const coinfAddress = Buffer.alloc(120);
  coinfAddress.type = ref.types.CString;
  const coinAddressLen = ref.alloc('int', 120);
  const puiCoinDerivePath = uint32Array(
    derivePath || CONST[`${coinType}_DERIVE_PATH`]
  );
  const uiCoinDerivePathLen = ref.alloc('int', puiCoinDerivePath.length);
  try {
    const startResult = await Api.PAEW_InitContext(
      ppPAEWContext,
      devCounter,
      callback,
      param.ref()
    );
    console.log(
      `[Nebula Driver][GetCoinAddress][InitContext]result=${startResult},counter=${devCounter.deref()}`
    );
    if (startResult !== 0) {
      return { result: 1, res: startResult };
    }

    const rtn = await new Promise((resolve, reject) => {
      let COINTYPE = COIN[coinType];
      if (coinType === 'USDT') {
        COINTYPE = 0;
      }
      const result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        COINTYPE,
        puiCoinDerivePath,
        uiCoinDerivePathLen.deref()
      );
      console.log(
        `fetching Coin ${coinType} address, PAEW_DeriveTradeAddress parameters:{} returns: ${result}`
      );
      if (result === 0x80000011) {
        return resolve(result);
      }
      if (result !== 0) {
        return reject(result);
      }
      Api.PAEW_GetTradeAddress.async(
        ppPAEWContext.deref(),
        0,
        COIN[coinType],
        1,
        coinfAddress,
        coinAddressLen,
        (err, res) => {
          console.log(
            `fetching ${coinType} address, PAEW_GetTradeAddress returns: ${res}`
          );
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          return resolve(res);
        }
      );
    });
    if (rtn !== 0) {
      await Api.PAEW_FreeContext(ppPAEWContext.deref());
      return { result: 1 };
    }
    await Api.PAEW_FreeContext(ppPAEWContext.deref());
    return { result: 0, res: rtn };
  } catch (e) {
    console.log(`${coinType} get address error`, e);
    await Api.PAEW_FreeContext(ppPAEWContext.deref());
    return { result: e };
  }
};

module.exports = {
  keyConfirmAddress,
};
