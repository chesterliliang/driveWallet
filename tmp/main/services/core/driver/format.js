var ref = require('ref')
var { TYPE, CallbackParam, Api, callback } = require('./common')

let { voidPP } = TYPE
/*
Instruction:
  初始化，能够重新协商
  [RETURN] 0为成功，非0值为失败
Example:
  format()
*/
const format = async () => {
  console.log('[Nebula Driver][PAEW_Format]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][Format][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await new Promise((resolve, reject) => {
      Api.PAEW_Format.async(ppPAEWContext.deref(), 0, (err, res) => {
        if (res !== 0) {
          return reject(res)
        }
        resolve(res)
      })
    })
    console.log(`[Nebula Driver][Format]result=${result}`)
    return { result }
  }
  catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][Format][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_Format]: End')
  }
}

module.exports = {
  format
}
