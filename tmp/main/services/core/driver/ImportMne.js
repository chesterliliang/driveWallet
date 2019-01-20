var ref = require('ref')
var { TYPE, CallbackParam, Api, callback } = require('./common')

let { voidPP, strArray, ucharArray } = TYPE
/*
Instruction:
  根据助记词恢复Seed
  [IN] 字符串数组，助记词列表
  [RETURN] { result, PrvSeed }
      result: 数字，0为成功，非0值为失败
      PrvSeed: 字符串，恢复的seed
Example:
  var words = 'merge today youth raccoon clock rocket pipe clump narrow come brief move card mom useless lesson abandon airport'
  ImportMne(words)
*/
const ImportMne = async (words) => {
  console.log('[Nebula Driver][PAEW_ImportMne]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()
  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][PAEW_ImportMne][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }

  try {
    result = await new Promise((resolve, reject) => {
      Api.PAEW_ImportSeed.async(ppPAEWContext.deref(), 0, 0, 0, (err, res) => {
        console.log('res = ', res)
        if (res !== 0) {
          return reject(res);
        }
        resolve(res)
      })
    })
    console.log('[Nebula Driver][PAEW_ImportMne]: End')
    return { result: 0 }
  }
  catch (err) {
    console.log('err in importMNE = ', err)
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][ImportMne][FreeContext]result=${result}`)
  }
}

module.exports = {
  ImportMne
}
