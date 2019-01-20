var ref = require('ref')
// var rf=require("fs");
var { TYPE, CallbackParam, Api, callback, toHex, StringtoArray, CONST } = require('./common')

let { voidPP, uint32Array, ucharArray, uint64Array, strArray } = TYPE
let { PAEW_BTC_SIG_MAX_LEN, BTC_DERIVE_PATH, ETH_DERIVE_PATH, BTS_DERIVE_PATH, PAEW_DEV_INFO_LEN } = CONST
/*
Instruction:
  升级COS
  [IN] Cosdata：二进制COS数据
  [RETURN] { result }
    result: 0为成功，非0值为失败
*/
const UpdateCos = async (Cosdata) => {
  console.log('[Nebula Driver][UpdateCos]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()
  //   var data=rf.readFileSync("D:\/NodeJsTestProject\/EWalletCOS_Enc.bin");  
  //   console.log('data = ',data)
  //   console.log('data.length = ',data.length)
  var ByteCosdata = ucharArray(Cosdata)
  var Cosdatalen = ByteCosdata.length

  console.log('[Nebula Driver][UpdateCos]Cosdatalen = ', Cosdatalen)

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][UpdateCos][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await new Promise((resolve, reject) => {
      Api.PAEW_ClearCOS.async(ppPAEWContext.deref(), 0, (err, res) => {
        console.log(`[Nebula Driver][UpdateCos][PAEW_UpdateCos]result=${res}`)
        if (res !== 0 && res !== 0x80000010) {
          return reject(res);
        }
        resolve(res)
      });
    });
  } catch (res) {
    console.log('PAEW_UpdateCos error,res = ', res)
    return { result: res }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][UpdateCos][FreeContext]result=${result}`)
  }

  result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][UpdateCos][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await new Promise((resolve, reject) => {
      Api.PAEW_UpdateCOS.async(ppPAEWContext.deref(), 0, ByteCosdata, Cosdatalen, (err, res) => {
        console.log(`[Nebula Driver][UpdateCos][PAEW_UpdateCos]result=${res}`)
        if (res !== 0) {
          return reject(res);
        }
        resolve(res);
      });
    })
    return { result: 0 }
  } catch (res) {
    console.log('PAEW_UpdateCos error,res = ', res)
    return { result: res }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][UpdateCos][FreeContext]result=${result}`)
    console.log('[Nebula Driver][UpdateCos]: End')
  }
}

module.exports = {
  UpdateCos
}
