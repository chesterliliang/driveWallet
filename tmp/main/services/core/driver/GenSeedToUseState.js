var ref = require('ref')
var { TYPE, CallbackParam, Api, callback, CONST } = require('./common')

let { voidPP, uint32Array } = TYPE
let { BTC_DERIVE_PATH, ETH_DERIVE_PATH } = CONST
/*
生成种子以初始化设备
七龙珠钱包：包括协商会话密钥、生成种子、分发种子、生成助记词、考试。成功后切换设备生命周期状态
个人版钱包：初始化设备，包括生成种子、生成助记词、考试。成功后切换设备生命周期状态
[IN] pPAEWContext：上下文结构体指针，不可为NULL
[IN] nDevIndex：（个人版钱包专用）操作的设备索引号，范围为[0, nDevCount-1]
[IN] nSeedLen：（个人版钱包专用）助记词直接对应的种子长度，取值为[16, 32]之内的4的倍数
[IN] nN：（七龙珠钱包专用）系统参数，密钥分散的数量，4<=N<=7，且当前插入的设备数量必须与nN相等
[IN] nT：（七龙珠钱包专用）系统参数，密钥恢复的数量，2<=M<=N
[RETURN] PAEW_RET_SUCCESS为成功，非PAEW_RET_SUCCESS值为失败
*/
const GenSeedToUseState = async (index, seedlen) => {
  console.log('[Nebula Driver][GenSeedToUseState]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][GenSeedToUseState][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    var rtn =await new Promise((resolve, reject) => {
      Api.PAEW_GenerateSeed.async(ppPAEWContext.deref(), index, seedlen, 0, 0, (err, res) => {
        console.log(`[Nebula Driver][GenSeedToUseState]result=${res}`)
        if (res !== 0) {
          return reject(res);
        }
        return resolve(res);
      });
    });
    return { result: rtn }
  } catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][GenSeedToUseState][FreeContext]result=${result}`)
    console.log('[Nebula Driver][GenSeedToUseState]: End')
  }
}

module.exports = {
  GenSeedToUseState
}
