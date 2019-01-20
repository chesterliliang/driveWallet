var ref = require('ref');
var { TYPE, CallbackParam, Api, callback, CONST } = require('./common');
var Promise = require('bluebird');
let { voidPP, uint32Array } = TYPE;
let {
  PAEW_BTC_SIG_MAX_LEN,
  BTC_DERIVE_PATH,
  PAEW_LTC_SIG_MAX_LEN,
  LTC_DERIVE_PATH,
  PAEW_NEO_SIG_MAX_LEN,
  NEO_DERIVE_PATH,
  ETH_DERIVE_PATH,
  ETC_DERIVE_PATH,
  CYB_DERIVE_PATH,
  PAEW_DEV_INFO_LEN,
} = CONST;

/*
获取数字货币地址，要求先调用PAEW_DeriveTradeAddress
七龙珠钱包：操作的设备为PAEW_DeriveTradeAddress选中的设备
[IN] pPAEWContext：上下文结构体指针，不可为NULL
[IN] nDevIndex：（个人版钱包专用）操作的设备索引号，范围为[0, nDevCount-1]
[IN] nCoinType：币种类型PAEW_COIN_TYPE_XXX，必须与PAEW_DeriveTradeAddress时传入的币种一致
[RETURN] PAEW_RET_SUCCESS为成功，非PAEW_RET_SUCCESS值为失败
*/
const GetCoinAddress = async () => {
  var Addresses = [];
  var TXAddressLen = [];
  var map = {};
  console.log('[Nebula Driver][PAEW_GetCoinAddress]: Start');
  var ppPAEWContext = ref.alloc(voidPP);
  var devCounter = ref.alloc('int');
  var param = new CallbackParam();

  var result = await Api.PAEW_InitContext(
    ppPAEWContext,
    devCounter,
    callback,
    param.ref()
  );
  console.log(
    `[Nebula Driver][GetCoinAddress][InitContext]result=${result},counter=${devCounter.deref()}`
  );
  if (result !== 0) {
    return { result };
  }
  var pnTXAddressLen = 120;
  var pBTCAddress = Buffer.alloc(pnTXAddressLen);
  var pLTCAddress = Buffer.alloc(pnTXAddressLen);
  var pNEOAddress = Buffer.alloc(pnTXAddressLen);
  var pETHAddress = Buffer.alloc(pnTXAddressLen);
  var pETCAddress = Buffer.alloc(pnTXAddressLen);
  var pCYBAddress = Buffer.alloc(pnTXAddressLen);
  var pnBTCAddressLen = ref.alloc('int', 120);
  var pnLTCAddressLen = ref.alloc('int', 120);
  var pnNEOAddressLen = ref.alloc('int', 120);
  var pnETHAddressLen = ref.alloc('int', 120);
  var pnETCAddressLen = ref.alloc('int', 120);
  var pnCYBAddressLen = ref.alloc('int', 120);
  pBTCAddress.type = ref.types.CString;
  pLTCAddress.type = ref.types.CString;
  pNEOAddress.type = ref.types.CString;
  pETHAddress.type = ref.types.CString;
  pETCAddress.type = ref.types.CString;
  pCYBAddress.type = ref.types.CString;

  var puiBTCDerivePath = uint32Array(BTC_DERIVE_PATH);
  var uiBTCDerivePathLen = ref.alloc('int', puiBTCDerivePath.length);
  var puiLTCDerivePath = uint32Array(LTC_DERIVE_PATH);
  var uiLTCDerivePathLen = ref.alloc('int', puiLTCDerivePath.length);
  var puiETHDerivePath = uint32Array(ETH_DERIVE_PATH);
  var uiETHDerivePathLen = ref.alloc('int', puiETHDerivePath.length);
  var puiETCDerivePath = uint32Array(ETC_DERIVE_PATH);
  var uiETCDerivePathLen = ref.alloc('int', puiETCDerivePath.length);
  var puiNEODerivePath = uint32Array(NEO_DERIVE_PATH);
  var uiNEODerivePathLen = ref.alloc('int', puiNEODerivePath.length);
  var puiCYBDerivePath = uint32Array(CYB_DERIVE_PATH);
  var uiCYBDerivePathLen = ref.alloc('int', puiCYBDerivePath.length);
  pnTXAddressLen = 0;
  var rtn = 0;
  try {
    rtn = await new Promise((resolve, reject) => {
      result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        0,
        puiBTCDerivePath,
        uiBTCDerivePathLen.deref()
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
        0,
        pBTCAddress,
        pnBTCAddressLen,
        (err, res) => {
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          map['BTC'] = pBTCAddress
            .slice(0, pnBTCAddressLen.deref() - 1)
            .toString(); //BTC长度-1，最后一位为\0
          pnTXAddressLen = pnTXAddressLen + pnBTCAddressLen.deref() - 1;
          return resolve(res);
        }
      );
    });
    if (rtn != 0) {
      return { result: rtn };
    }

    rtn = await new Promise((resolve, reject) => {
      result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        1,
        puiETHDerivePath,
        uiETHDerivePathLen.deref()
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
        1,
        pETHAddress,
        pnETHAddressLen,
        (err, res) => {
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          map['ETH'] =
            '0x' + pETHAddress.slice(0, pnETHAddressLen.deref()).toString();
          pnTXAddressLen = pnTXAddressLen + pnETHAddressLen.deref() + 2;
          return resolve(res);
        }
      );
    });
    if (rtn != 0) {
      return { result: rtn };
    }

    rtn = await new Promise((resolve, reject) => {
      result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        6,
        puiETCDerivePath,
        uiETCDerivePathLen.deref()
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
        6,
        pETCAddress,
        pnETCAddressLen,
        (err, res) => {
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          map['ETC'] =
            '0x' + pETCAddress.slice(0, pnETCAddressLen.deref()).toString();
          pnTXAddressLen = pnTXAddressLen + pnETCAddressLen.deref() + 2;
          return resolve(res);
        }
      );
    });
    if (rtn != 0) {
      return { result: rtn };
    }

    rtn = await new Promise((resolve, reject) => {
      result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        4,
        puiLTCDerivePath,
        uiLTCDerivePathLen.deref()
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
        4,
        pLTCAddress,
        pnLTCAddressLen,
        (err, res) => {
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          map['LTC'] = pLTCAddress
            .slice(0, pnLTCAddressLen.deref() - 1)
            .toString(); //LTC长度-1，最后一位为\0
          pnTXAddressLen = pnTXAddressLen + pnLTCAddressLen.deref() - 1;
          return resolve(res);
        }
      );
    });
    if (rtn != 0) {
      return { result: rtn };
    }

    rtn = await new Promise((resolve, reject) => {
      result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        5,
        puiNEODerivePath,
        uiNEODerivePathLen.deref()
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
        5,
        pNEOAddress,
        pnNEOAddressLen,
        (err, res) => {
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          map['NEO'] = pNEOAddress
            .slice(0, pnNEOAddressLen.deref() - 1)
            .toString(); //LTC长度-1，最后一位为\0
          map['GAS'] = pNEOAddress
            .slice(0, pnNEOAddressLen.deref() - 1)
            .toString(); //LTC长度-1，最后一位为\0
          pnTXAddressLen = pnTXAddressLen + 2 * pnNEOAddressLen.deref() - 2;
          return resolve(res);
        }
      );
    });
    if (rtn != 0) {
      return { result: rtn };
    }

    rtn = await new Promise((resolve, reject) => {
      result = Api.PAEW_DeriveTradeAddress(
        ppPAEWContext.deref(),
        0,
        2,
        puiCYBDerivePath,
        uiCYBDerivePathLen.deref()
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
        2,
        pCYBAddress,
        pnCYBAddressLen,
        (err, res) => {
          if (res === 0x80000011) {
            return resolve(res);
          }
          if (res !== 0) {
            return reject(res);
          }
          map['CYB'] = pCYBAddress
            .slice(0, pnCYBAddressLen.deref() - 1)
            .toString();
          pnTXAddressLen = pnTXAddressLen + pnCYBAddressLen.deref() - 1;
          return resolve(res);
        }
      );
    });
    if (rtn != 0) {
      return { result: rtn };
    }

    Addresses.push(map);
    TXAddressLen.push(pnTXAddressLen);
    console.log('[GetCoinAddress][map len]=', Addresses[0], TXAddressLen);
    return { result: 0, Addresses, TXAddressLen };
  } catch (err) {
    console.log('[Nebula Driver][GetCoinAddress]Error=', err.toString());
    return { result: err };
  } finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref());
    console.log(
      `[Nebula Driver][PAEW_GetCoinAddress][FreeContext]result=${result}`
    );
    console.log('[Nebula Driver][PAEW_GetCoinAddress]: End');
  }
};

module.exports = {
  GetCoinAddress,
};
