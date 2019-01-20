var ref = require('ref');
var {
  TYPE,
  CallbackParam,
  Api,
  callback,
  toHex,
  StringtoArray,
  CONST,
} = require('./common');

let { voidPP, uint32Array, ucharArray } = TYPE;
let { PAEW_ETH_SIG_MAX_LEN, ETH_DERIVE_PATH, ETC_DERIVE_PATH } = CONST;
/*
以太币签名，要求先调用PAEW_DeriveTradeAddress
七龙珠钱包：操作的设备为PAEW_DeriveTradeAddress选中的设备
[IN] pPAEWContext：上下文结构体指针，不可为NULL
[IN] nDevIndex：（个人版钱包专用）操作的设备索引号，范围为[0, nDevCount-1]
[IN] pbCurrentTX：本次交易的未签名的交易信息
[IN] nCurrentTXLen：本次交易的未签名交易信息的长度
[OUT] pbTXSig：签名之后的交易数据
[IN OUT] pnTXSigLen：本次交易的交易信息签名的长度，输入时的值表示pbTXSig缓冲区的长度，输出的值为实际返回的签名后的交易数据的长度
[RETURN] PAEW_RET_SUCCESS为成功，非PAEW_RET_SUCCESS值为失败
*/
const ETHTXSign = async (currentTx, etc, erc20, decimal) => {
  var sign = {};
  console.log('[Nebula Driver][PAEW_ETHTXSign]: Start');
  var ppPAEWContext = ref.alloc(voidPP);
  var devCounter = ref.alloc('int');
  var param = new CallbackParam();

  var puiEthDerivePath = etc
    ? uint32Array(ETC_DERIVE_PATH)
    : uint32Array(ETH_DERIVE_PATH);
  var uiETHDerivePathLen = ref.alloc('int', puiEthDerivePath.length);

  var ppbTXSigs = ucharArray(PAEW_ETH_SIG_MAX_LEN);
  var pnTXSigLen = ref.alloc('uint64', PAEW_ETH_SIG_MAX_LEN);

  var pbCurrentTX = ucharArray(StringtoArray(currentTx));
  console.log(pbCurrentTX);
  var pbCurrentTXLen = pbCurrentTX.length;

  var result = await Api.PAEW_InitContext(
    ppPAEWContext,
    devCounter,
    callback,
    param.ref()
  );
  console.log(
    `[Nebula Driver][ETHTXSign][InitContext]result=${result},counter=${devCounter.deref()}`
  );
  if (result !== 0) {
    return { result };
  }
  try {
    result = await Api.PAEW_DeriveTradeAddress(
      ppPAEWContext.deref(),
      0,
      etc ? 6 : 1,
      puiEthDerivePath,
      uiETHDerivePathLen.deref()
    );
    console.log(
      `[Nebula Driver][ETHTXSign][PAEW_DeriveTradeAddress]result=${result}`
    );
    if (result !== 0) {
      return { result };
    }

    if (erc20 !== undefined && erc20 !== null && erc20 !== '') {
      result = await Api.PAEW_SetERC20Info(
        ppPAEWContext.deref(),
        0,
        etc ? 6 : 1,
        erc20,
        decimal
      );
      console.log(
        `[Nebula Driver][ETHTXSign][PAEW_SetERC20Info]erc20=${erc20}, decimal=${decimal}, result=${result}`
      );
      if (result !== 0) {
        return { result };
      }
    }

    var strSign = null;

    strSign = await new Promise((resolve, reject) => {
      Api.PAEW_ETH_TXSign.async(
        ppPAEWContext.deref(),
        0,
        pbCurrentTX,
        pbCurrentTXLen,
        ppbTXSigs,
        pnTXSigLen,
        (err, res) => {
          console.log(`[Nebula Driver][ETHTXSign][ETH_TXSign]result=${res}`);
          if (res !== 0) {
            return reject(res);
          }
          const str = toHex(ppbTXSigs, pnTXSigLen.deref());
          console.log(`[Nebula Driver][ETHTXSign][ETH_TXSign]ppbTXSigs=${str}`);
          resolve(str);
        }
      );
    });
    sign['raw'] = strSign;
    sign['r'] = '0x' + strSign.slice(0, 64);
    sign['s'] = '0x' + strSign.slice(64, 128);
    sign['v'] = '0x' + strSign.slice(128);
    return { result: 0, sign };
  } catch (err) {
    return { result: err };
  } finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref());
    console.log(`[Nebula Driver][ETHTXSign][FreeContext]result=${result}`);
    console.log('[Nebula Driver][PAEW_ETHTXSign]: End');
  }
};

module.exports = {
  ETHTXSign,
};
