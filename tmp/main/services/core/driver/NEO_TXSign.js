var ref = require('ref')
var { TYPE, CallbackParam, Api, callback, toHex, StringtoArray, CONST } = require('./common')

let { voidPP, uint32Array, ucharArray, uint64Array, strArray } = TYPE
let { PAEW_NEO_SIG_MAX_LEN, NEO_DERIVE_PATH, PAEW_DEV_INFO_LEN } = CONST

/*
NEO签名，要求先调用PAEW_DeriveTradeAddress
*/
const NEO_TXSign = async (utxos, currentTx) => {
  console.log('[Nebula Driver][PAEW_NEOTXSign]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var puiNEODerivePath = uint32Array(NEO_DERIVE_PATH)
  var uiNEODerivePathLen = ref.alloc('int', puiNEODerivePath.length)

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
    var ppbTXSig = ucharArray(PAEW_NEO_SIG_MAX_LEN)
    ppbTXSigArray.push(ppbTXSig)
    pnTXSigLenArray.push(PAEW_NEO_SIG_MAX_LEN)
  })
  var ppbTXSigs = ucharArray(PAEW_NEO_SIG_MAX_LEN)
  var pnTXSigLen = ref.alloc('uint64', PAEW_NEO_SIG_MAX_LEN)
  var pbCurrentTX = ucharArray(StringtoArray(currentTx))
  var pbCurrentTXLen = pbCurrentTX.length

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][NEOTXSign][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await Api.PAEW_DeriveTradeAddress(ppPAEWContext.deref(), 0, 5, puiNEODerivePath, uiNEODerivePathLen.deref())//index = 0,cointype = 0(bitcoin)
    console.log(`[Nebula Driver][NEOTXSign][PAEW_DeriveTradeAddress]result=${result}`)
    if (result !== 0) {
      return { result }
    }

    var Signs = {}
    Signs = await new Promise((resolve, reject) => {
      Api.PAEW_NEO_TXSign.async(ppPAEWContext.deref(), 0, nUTXOCount, ppbUTXOs, pnUTXOLen, pbCurrentTX, pbCurrentTXLen, ppbTXSigs, pnTXSigLen, (err, res) => {
        console.log(`[Nebula Driver][NEOTXSign][NEO_TXSign]result=${res}`)

        if (res !== 0) {
          return reject(res);
        }
        let invocationlen = ppbTXSigs[0]
        let invocation = toHex(ppbTXSigs, invocationlen + 1)
        let verificationlen = ppbTXSigs[invocationlen + 2]
        let verification = toHex(ppbTXSigs.slice(invocationlen + 2, verificationlen + 1), verificationlen + 1) + 'ac'
        const signedData = { invocation, verification }
        resolve(signedData);
      });
    });
    return { result: 0, Signs }
  } catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][NEOTXSign][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_NEOTXSign]: End')
  }
}

module.exports = {
  NEO_TXSign
}
