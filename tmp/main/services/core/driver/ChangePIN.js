var ref = require('ref')
var { TYPE, CallbackParam, Api, callback } = require('./common')

let { voidPP } = TYPE
/*
修改PIN
[IN] pPAEWContext：上下文结构体指针，不可为NULL
[IN] nDevIndex：操作的设备索引号，范围为[0, nDevCount-1]
[RETURN] PAEW_RET_SUCCESS为成功，非PAEW_RET_SUCCESS值为失败
*/
const ChangePIN = async (num) => {
  console.log('[Nebula Driver][PAEW_ChangePIN]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][ChangePIN][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    result = await new Promise((resolve,reject) => {
      Api.PAEW_ChangePIN.async(ppPAEWContext.deref(), num,(err,res) =>{
        if(res !== 0){
          return reject(res)
        }
        resolve(res)
      })
    }) 
    console.log(`[Nebula Driver][ChangePIN][PAEW_ChangePIN]result=${result}`)
    return { result }
  }
  catch (err) {
    console.log('[Nebula Driver][changepin]err = ',err)
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][ChangePIN][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_ChangePIN]: End')
  }
}

module.exports = {
  ChangePIN
}
