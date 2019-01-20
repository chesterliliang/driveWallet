var ref = require('ref')
var { TYPE, CallbackParam, DeviceInfo, Api, callback, toHex, PharseDeviceInfo, CONST } = require('./common')

let { voidPP } = TYPE
let { PAEW_DEV_INFO_LEN } = CONST


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
const GetPinStatus = async () => {
  var DevInfo = []
  var DevInfoLen = []
  console.log('[Nebula Driver][PAEW_GetPinStatus]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var result = await Api.PAEW_InitContext(ppPAEWContext, devCounter, callback, param.ref())
  console.log(`[Nebula Driver][GetPinStatus][InitContext]result=${result},counter=${devCounter.deref()}`)
  if (result !== 0) {
    return { result }
  }

  try {
    var dev_info = new DeviceInfo()
    for (var i = 0; i < devCounter.deref(); i++) {
      result = await Api.PAEW_GetDevInfo(ppPAEWContext.deref(), i, 0x00000001, dev_info.ref())
      console.log(`[Nebula Driver][GetPinStatus]at=${i},result=${result}`)
      if (result === 0x80000010) {//如果未识别此指令，认为key进入无cos状态，此时升级cos不需要输入pin
        return { result:0 }
      }
      if (result !== 0) {
        return { result }
      }

      // strDevInfo = toHex(pbDevInfo, pnDevInfoLen.deref())
      console.log(`[Nebula Driver][GetPinStatus]at=${i},DevInfo=${dev_info}`)
      if (dev_info.ucPINState !== 1) {
        result = 0x80000007
        return { result }
      }
    }
    return { result:0 }
  }
  catch (err) {
    console.log('[GetPinStatus]err = ', err)
    return err
  }
  finally {
    result = await Api.PAEW_FreeContext(ppPAEWContext.deref())
    console.log(`[Nebula Driver][GetPinStatus][FreeContext]result=${result}`)
  }
}

module.exports = {
  GetPinStatus
}
