var ref = require('ref')
var {TYPE, CallbackParam, Api, callback} = require('./common')

let { voidPP } = TYPE

/*
Instruction:
  获取设备数量
  [RETURN] { result, DevNum }
    result:
      0为成功，非0值为失败
    DevNum:
      连接的key的数量
Example:
  GetDevNum()
*/
const GetDevNum = async () => {
  console.log('[Nebula Driver][PAEW_GetDevNum]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][GetDevNum][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return {result}
  }

  var DevNum = devCounter.deref()
  result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
  console.log(`[Nebula Driver][GetDevNum][FreeContext]result=${result}`)
  if (result !== 0) {
    return {result}
  }

  console.log('[Nebula Driver][PAEW_GetDevNum]: End')
  result = 0
  return { result, DevNum }
}

module.exports = {
  GetDevNum
}
