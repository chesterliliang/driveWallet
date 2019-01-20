var ref = require('ref')
var { TYPE, CallbackParam, Api, callback, toHex, StringtoArray, CONST } = require('./common')

let { voidPP, uint32Array, ucharArray, uint64Array, strArray } = TYPE
let { PAEW_LTC_SIG_MAX_LEN, LTC_DERIVE_PATH, ETH_DERIVE_PATH, BTS_DERIVE_PATH, PAEW_DEV_INFO_LEN } = CONST
/*
比特币签名，要求先调用PAEW_DeriveTradeAddress
七龙珠钱包：操作的设备为PAEW_DeriveTradeAddress选中的设备
[IN] pPAEWContext：上下文结构体指针，不可为NULL
[IN] nDevIndex：（个人版钱包专用）操作的设备索引号，范围为[0, nDevCount-1]
[IN] nUTXOCount：本次交易使用的UTXO的个数，与本次交易使用的Input个数相等
[IN] ppbUTXO：本次交易使用的UTXO的完整信息
[IN] pnUTXOLen：本次交易使用的UTXO的信息长度，每个元素对应ppbUTXO的一个元素指向的信息
[IN] pbCurrentTX：本次交易的未签名的交易信息
[IN] nCurrentTXLen：本次交易的未签名交易信息的长度
[OUT] ppbTXSig：签名之后的交易数据，个数与Input个数相等
[IN OUT] pnTXSigLen：本次交易的交易信息签名的长度，输入时的值表示pbTXSig缓冲区的长度，输出的值为实际返回的签名后的交易数据的长度
[RETURN] PAEW_RET_SUCCESS为成功，非PAEW_RET_SUCCESS值为失败
*/
const LTCTXSign = async (utxos, currentTx) => {
  console.log('[Nebula Driver][PAEW_LTCTXSign]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var puiLTCDerivePath = uint32Array(LTC_DERIVE_PATH)
  var uiLTCDerivePathLen = ref.alloc('int', puiLTCDerivePath.length)

  var nUTXOCount = utxos.length
  var pnUTXOLen = []
  var ppbUTXOs = strArray(nUTXOCount)
  var ppbTXSigArray = []
  var pnTXSigLenArray = []
  utxos.forEach(function (value, index) {
    let array = StringtoArray(value)
    let pbUTXO = ucharArray(array)
    ppbUTXOs[index] = pbUTXO
    pnUTXOLen.push(array.length)
    var ppbTXSig = ucharArray(PAEW_LTC_SIG_MAX_LEN)
    ppbTXSigArray.push(ppbTXSig)
    pnTXSigLenArray.push(PAEW_LTC_SIG_MAX_LEN)
  })
  var ppbTXSigs = strArray(ppbTXSigArray)
  var pnTXSigLen = uint64Array(pnTXSigLenArray)
  var pbCurrentTX = ucharArray(StringtoArray(currentTx))
  var pbCurrentTXLen = pbCurrentTX.length

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][LTCTXSign][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await Api.PAEW_DeriveTradeAddress(ppPAEWContext.deref(), 0, 4, puiLTCDerivePath, uiLTCDerivePathLen.deref())//index = 0,cointype = 0(bitcoin)
    console.log(`[Nebula Driver][LTCTXSign][PAEW_DeriveTradeAddress]result=${result}`)
    if (result !== 0) {
      return { result }
    }

    var strSigns = []

    strSigns = await new Promise((resolve, reject) => {
      Api.PAEW_LTC_TXSign.async(ppPAEWContext.deref(), 0, nUTXOCount, ppbUTXOs, pnUTXOLen, pbCurrentTX, pbCurrentTXLen, ppbTXSigs, pnTXSigLen, (err, res) => {
        console.log(`[Nebula Driver][LTCTXSign][LTC_TXSign]result=${res}`)

        if (res !== 0) {
          return reject(res);
        }

        var strs = [];
        for (var i = 0; i < nUTXOCount; i++) {
          const strSign = toHex(ppbTXSigs[i], pnTXSigLen[i])
          console.log(`[Nebula Driver][LTCTXSign][LTC_TXSign]ppbTXSigs[${i}]=${strSign}`)
          strs.push(strSign)
        }

        resolve(strs);
      });
    });
    return { result: 0, strSigns, pnTXSigLen }
  } catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][LTCTXSign][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_LTCTXSign]: End')
  }
}

module.exports = {
  LTCTXSign
}
