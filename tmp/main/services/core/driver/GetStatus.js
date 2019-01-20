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
const PAEW_DEV_INFOTYPE_LCD_STATE	=	0x00000100
/*
获取某一设备的硬件信息
[IN] pPAEWContext：上下文结构体指针，不可为NULL
[IN] nDevIndex：操作的设备索引号，范围为[0, nDevCount-1]
[IN] nDevInfoType：获取的设备信息类型，取值为PAEW_DEV_INFOTYPE_XXX的异或组合
[OUT] pDevInfo：返回的设备信息，不可为NULL
[RETURN] PAEW_RET_SUCCESS为成功，非PAEW_RET_SUCCESS值为失败

==============dev info=============
#define PAEW_DEV_INFOTYPE_PIN_STATE		0x00000001
#define PAEW_DEV_INFOTYPE_COS_TYPE		0x00000002
#define PAEW_DEV_INFOTYPE_CHAIN_TYPE	0x00000004
#define PAEW_DEV_INFOTYPE_SN			0x00000008
#define PAEW_DEV_INFOTYPE_COS_VERSION	0x00000010
#define PAEW_DEV_INFOTYPE_LIFECYCLE		0x00000020
#define PAEW_DEV_INFOTYPE_SESSKEY_HASH	0x00000040
#define PAEW_DEV_INFOTYPE_N_T			0x00000080

==============pin state===========
#define PAEW_DEV_INFO_PIN_INVALID_STATE		0xFF
#define PAEW_DEV_INFO_PIN_LOGOUT			0x00
#define PAEW_DEV_INFO_PIN_LOGIN				0x01
#define PAEW_DEV_INFO_PIN_LOCKED			0x02
#define PAEW_DEV_INFO_PIN_UNSET				0x03
chain type
#define PAEW_DEV_INFO_CHAIN_TYPE_FORMAL		0x01
#define PAEW_DEV_INFO_CHAIN_TYPE_TEST		0x02
=================sn===============
#define PAEW_DEV_INFO_SN_LEN				0x20
*/
const GetStatus = async (isOldDevice = false) => {
  var DevInfo = []
  var DevInfoLen = []
  console.log('[Nebula Driver][PAEW_GetStatus]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()
  var dev_info = new DeviceInfo()
  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][GetStatus][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }
  try {
    var nDevInfoType = PAEW_DEV_INFOTYPE_COS_TYPE + PAEW_DEV_INFOTYPE_COS_VERSION 
    + PAEW_DEV_INFOTYPE_SN + PAEW_DEV_INFOTYPE_CHAIN_TYPE 
    + PAEW_DEV_INFOTYPE_PIN_STATE + PAEW_DEV_INFOTYPE_LIFECYCLE
    + (isOldDevice ? 0 : PAEW_DEV_INFOTYPE_LCD_STATE); 
    for (var i = 0; i < devCounter.deref(); i++) {
      result = await Api.PAEW_GetDevInfo(ppPAEWContext.deref(), i, nDevInfoType, dev_info.ref())
      console.log(`[Nebula Driver][GetStatus]at=${i},result=${result}`)
      if (result === 0x80000010) {
        result = 0
        DevInfo.push({ COS: [1, 1, 0, 0], SesStatus: false, SN: '00000000', LcdState: 0 })
        DevInfoLen.push(13)
      }
      else {
        if (result !== 0) {
          return { result }
        }
        console.log(`[Nebula Driver][GetStatus]at=${i},DevInfo=${dev_info}`)
        DevInfo.push(PharseDeviceInfo(i + 1, dev_info))
        DevInfoLen.push(DevInfo.length)
      }
    }
    return { result: 0, DevInfo, DevInfoLen }
  }
  catch (err) {
    return { result: err }
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][GetStatus][FreeContext]result=${result}`)
    console.log('[Nebula Driver][PAEW_GetStatus]: End')
  }
}

module.exports = {
  GetStatus
}
