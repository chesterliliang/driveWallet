var ref = require('ref')
var { TYPE, CallbackParam, DeviceInfo, Api, callback, toHex, PharseDeviceInfo, CONST } = require('./common')

let { voidPP } = TYPE
let { PAEW_DEV_INFO_LEN } = CONST
const PAEW_DEV_INFOTYPE_PIN_STATE = 0x00000001
const PAEW_DEV_INFOTYPE_COS_TYPE = 0x00000002
const PAEW_DEV_INFOTYPE_CHAIN_TYPE = 0x00000004
const PAEW_DEV_INFOTYPE_SN = 0x00000008
const PAEW_DEV_INFOTYPE_COS_VERSION = 0x00000010
const PAEW_DEV_INFOTYPE_LIFECYCLE = 0x00000020
const PAEW_DEV_INFOTYPE_SESSKEY_HASH = 0x00000040
const PAEW_DEV_INFOTYPE_N_T = 0x00000080

/*
Instruction:
  根据index获取设备的硬件信息及状态信息
  [IN] index, 待获取信息的设备序号
  [RETURN] { result, DevInfo }
    result:
      0为成功，非0值为失败
    DevInfo:
      对象，下面是对象属性：
        Num: 数字，设备序号，从1开始计数
        COS：8位字符串, cos版本号
        SN： 64位字符串, 设备序列号
        TestNet: BOOL,Ture-TestNet, False-正式网
        SesStatus: BOOL,Ture-协商状态，False-用户状态
        Hash：8位字符串，协商秘钥hash
        N: 数字，密钥分散的数量
        M: 数字，密钥恢复的数量
Example:
  var index = 1
  GetStatusByIndex(index)
*/
const GetStatusByIndex = async (index) => {
  var DevInfo = {}
  console.log('[Nebula Driver][PAEW_GetStatusByIndex]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][GetStatusByIndex][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    var dev_info = new DeviceInfo()
    var nDevInfoType = PAEW_DEV_INFOTYPE_COS_TYPE + PAEW_DEV_INFOTYPE_COS_VERSION + PAEW_DEV_INFOTYPE_SN + PAEW_DEV_INFOTYPE_CHAIN_TYPE + PAEW_DEV_INFOTYPE_PIN_STATE + PAEW_DEV_INFOTYPE_LIFECYCLE
    result = await Api.PAEW_GetDevInfo(ppPAEWContext.deref(), index, nDevInfoType, dev_info.ref())
    console.log(`[Nebula Driver][GetStatusByIndex]at=${index},result=${result}`)
    if (result === 0x80000010) {
      result = 0
      DevInfo.SN = '00000000'
      DevInfo.COS = [1, 1, 0, 0]
      DevInfo.SesStatus = false
    }
    else {
      if (result !== 0) {
        return { result }
      }
      console.log(`[Nebula Driver][GetStatusByIndex]at=${index},DevInfo=${dev_info}`)
      DevInfo = PharseDeviceInfo(index, dev_info)
    }
    return { result: 0, DevInfo }
  }
  catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][GetStatusByIndex][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_GetStatusByIndex]: End')
  }
}

module.exports = {
  GetStatusByIndex
}
