var ref = require('ref')
var { TYPE, CallbackParam, Api, callback, toHex } = require('./common')

let { voidPP,ucharArray } = TYPE
/*
Instruction:
  初始化，能够重新协商
  [RETURN] 0为成功，非0值为失败
Example:
  format()
*/
const GetLibVer = async () => {
  console.log('[Nebula Driver][GetLibVer]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()
  var libVer = ucharArray(4)
  var libVerLen = ref.alloc('uint64', 4)
  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][GetLibVer][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await new Promise((resolve, reject) => {
      Api.PAEW_GetLibraryVersion.async(libVer, libVerLen, (err, res) => {
        if (res !== 0) {
          return reject(res)
        }
        resolve(res)
      })
    })
    console.log(`[Nebula Driver][GetLibVer]result=${result}`)
    console.log(`[Nebula Driver][GetLibVer]libVer=${libVer}`)
    return { result, libVer }
  }
  catch (err) {
    console.log('[PAEW_GetLibraryVersion]err = ',err)
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][GetLibVer][FreeContext]result=${result}`)
    console.log('[Nebula Driver][GetLibVer]: End')
  }
}

module.exports = {
  GetLibVer
}
