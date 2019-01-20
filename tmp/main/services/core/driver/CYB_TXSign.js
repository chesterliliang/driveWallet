var ref = require('ref')
var { TYPE, CallbackParam, Api, callback, toHex, StringtoArray, CONST } = require('./common')

let { voidPP, uint32Array, ucharArray } = TYPE
let { PAEW_CYB_SIG_MAX_LEN, CYB_DERIVE_PATH } = CONST
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
const CYBTXSign = async (currentTx) => {
  console.log('[Nebula Driver][PAEW_CYBTXSign]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var puiCYBDerivePath = uint32Array(CYB_DERIVE_PATH)
  var uiCYBDerivePathLen = ref.alloc('int', puiCYBDerivePath.length)

  var ppbTXSigs = new Buffer(PAEW_CYB_SIG_MAX_LEN)
  var pnTXSigLen = ref.alloc('uint64', PAEW_CYB_SIG_MAX_LEN)

  var pbCurrentTX = ucharArray(currentTx)
  console.log(pbCurrentTX)
  var pbCurrentTXLen = pbCurrentTX.length
  console.log('currentTx = ',toHex(currentTx,currentTx.length))

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][CYBTXSign][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await Api.PAEW_DeriveTradeAddress(ppPAEWContext.deref(), 0, 2, puiCYBDerivePath, uiCYBDerivePathLen.deref())
    console.log(`[Nebula Driver][CYBTXSign][PAEW_DeriveTradeAddress]result=${result}`)
    if (result !== 0) {
      return { result }
    }

    var signature1 = new Buffer(65)
    var signature2 = new Buffer(65)
    var rtn = await new Promise((resolve, reject) => {
      Api.PAEW_CYB_TXSign.async(ppPAEWContext.deref(), 0, pbCurrentTX, pbCurrentTXLen, ppbTXSigs, pnTXSigLen, (err, res) => {
        console.log(`[Nebula Driver][CYBTXSign][CYB_TXSign]result=${res}`)
        if (res !== 0) {
          return reject(res)
        }
        const str = toHex(ppbTXSigs, pnTXSigLen.deref())
        signature1[0] = ppbTXSigs[64]+31
        ppbTXSigs.copy(signature1,1,0,64)
        // signature2[0] = 0x20//ppbTXSigs[64]+33
        // ppbTXSigs.copy(signature2,1,0,64)
        console.log(`[Nebula Driver][CYBTXSign][CYB_TXSign]ppbTXSigs=${str}`)
        console.log(`[Nebula Driver][CYBTXSign][CYB_TXSign]ppbTXSigs=${toHex(signature1, 65)}`)
        // console.log(`[Nebula Driver][CYBTXSign][CYB_TXSign]ppbTXSigs=${toHex(signature2, 65)}`)
        return resolve(res);
      })
    });
    return { result:rtn, signature1, signature2 }
  }
  catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][CYBTXSign][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_CYBTXSign]: End')
  }
}

module.exports = {
  CYBTXSign
}
