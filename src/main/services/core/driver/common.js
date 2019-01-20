const config = require('config');
var ffi = require('ffi');
var ref = require('ref');
var Struct = require('ref-struct');
var Array = require('ref-array');
var iconv = require('iconv-lite');
var path = require('path');
var sprintf = require('sprintf-js');
const os = require('os');

// typedef
var TYPE = {};
TYPE.voidPP = ref.refType(ref.refType(ref.types.void));
TYPE.uint8 = ref.types.uint8;
TYPE.uint32 = ref.types.uint32;
TYPE.uint64 = ref.types.uint64;
TYPE.uint32Array = Array(TYPE.uint32);
TYPE.uint64Array = Array(TYPE.uint64);
TYPE.uchar = ref.types.uchar;
TYPE.ucharArray = Array(ref.types.uchar);
TYPE.strArray = Array(TYPE.ucharArray);

let { uint8, uint32Array, uint64Array, ucharArray, strArray } = TYPE;

const Steplist = {
  pstep_invalid: 0,

  pstep_comm_enum_dev: 1,
  pstep_comm_open_dev: 2,
  pstep_comm_close_dev: 3,
  pstep_comm_get_devinfo: 4,
  pstep_comm_dev_select: 5,

  pstep_init_seed_gen: 6,
  pstep_init_mne_show: 7,
  pstep_init_mne_confirm: 8,
  pstep_init_seed_import: 9,

  pstep_init_keypair_gen: 10,
  pstep_init_key_agree_init: 11,
  pstep_init_key_agree_update: 12,
  pstep_init_key_agree_final: 13,
  pstep_init_key_agree_show: 14,
  pstep_init_key_agree_confirm: 15,

  pstep_init_shamir_transmit_init: 16,
  pstep_init_shamir_export: 17,
  pstep_init_shamir_import: 18,
  pstep_init_shamir_confirm: 19,

  pstep_sig_output_data: 20,
  pstep_sig_confirm: 21,

  pstep_comm_addr_gen: 22,
  pstep_comm_shamir_transmit_init: 23,
  pstep_comm_shamir_export: 24,
  pstep_comm_shamir_import: 25,

  pstep_comm_addr_get: 26,
  pstep_comm_addr_confirm: 27,

  pstep_comm_format: 28,
  pstep_comm_format_confirm: 29,

  pstep_comm_clearcos: 30,
  pstep_comm_clearcos_confirm: 31,

  pstep_comm_updatecos: 32,

  pstep_comm_changepin: 33,
  pstep_comm_changepin_confirm: 34,
};

const Statuslist = {
  pstatus_invalid: 0,
  pstatus_start: 1,
  pstatus_finish: 2,
};

var CallbackParam = Struct({
  pstep: 'int',
  pstatus: 'int',
  ret_value: 'int',
  dev_index: 'uint64',
  dev_count: 'uint64',
  data: Array('uchar', 1024),
});

var DeviceInfo = Struct({
  ucPINState: 'uchar', //PAEW_DEV_INFO_PIN_XX
  ucCOSType: 'uchar', //PAEW_DEV_INFO_COS_TYPE_XXX
  ucChainType: 'uchar', //PAEW_DEV_INFO_CHAIN_TYPE_XXX
  pbSerialNumber: Array('uchar', 32),
  pbCOSVersion: Array('uchar', 4),
  ucLifeCycle: 'uchar', // PAEW_DEV_INFO_LIFECYCLE_XXX
  nLcdState: 'uint64',
  pbSessKeyHash: Array('uchar', 4),
  nN: 'uint8',
  nT: 'uint8',
});
var DIptr = ref.refType(DeviceInfo);

const callback = ffi.Callback('int', [CallbackParam], function(cbparam) {
  // if (!cbparam){
  //   console.log('callback error!')
  //   return
  // }
  // if (cbparam.pstep !== Steplist.pstep_comm_enum_dev){
  //   console.log(`dev(${cbparam.dev_index + 1}/${cbparam.dev_count})`);
  // }
  // else{
  //   console.log("dev(?/?)");
  // }
  // console.log('pstep: ', ewallet_step2string(cbparam.pstep), '| pstatus: ', ewallet_status2string(cbparam.pstatus),)
  // if (cbparam.pstatus === Statuslist.pstatus_finish)
  // {
  //   console.log('ret_value=', cbparam.ret_value);
  //   if ((cbparam.pstep === Steplist.pstep_comm_addr_get) && (cbparam.ret_value === 0))
  //   {
  //     if (cbparam.data[0] === 0){
  //       console.log("BTC address:", ArraytoStr(DataArray2Address(cbparam.data)))
  //     }
  //     else if (cbparam.data[0] === 1)
  //     {
  //       console.log("ETH address:", ArraytoStr(DataArray2Address(cbparam.data)))
  //     }
  //     else if (cbparam.data[0] === 2)
  //     {
  //       console.log("CYB address:", ArraytoStr(DataArray2Address(cbparam.data)))
  //     }
  //   }
  //   else if ((cbparam.pstep === Steplist.pstep_comm_updatecos) && (cbparam.ret_value === 0))
  //   {
  //     console.log('UpdateCos:data',cbparam.data)
  //   }
  // }
});

// 调用winapi SetDllDirectoryA设置目录
if (process.platform !== 'darwin') {
  const kernel32 = ffi.Library('kernel32', {
    SetDllDirectoryA: ['bool', ['string']],
  });
  const configPath = process.env.NODE_CONFIG_DIR;
  kernel32.SetDllDirectoryA(configPath);
}
const Api = ffi.Library(
  path.resolve(
    process.env.NODE_CONFIG_DIR,
    os.platform() === 'win32' ? './EWallet' : './libEWallet'
  ),
  {
    PAEW_GetDevInfo: ['uint64', ['pointer', 'uint64', 'uint64', DIptr]],
    PAEW_GetTradeAddress: [
      'uint64',
      ['pointer', 'uint64', 'uchar', 'uchar', 'pointer', 'pointer'],
    ],
    PAEW_DeriveTradeAddress: [
      'uint64',
      ['pointer', 'uint64', 'uchar', uint32Array, 'uint64'],
    ],
    PAEW_InitContext: ['uint64', ['pointer', 'pointer', 'pointer', 'pointer']],
    PAEW_FreeContext: ['uint64', ['pointer']],
    PAEW_Format: ['uint64', ['pointer', 'uint64']],
    PAEW_GenerateSeed: [
      'uint64',
      ['pointer', 'uint64', 'uchar', 'uint8', 'uint8'],
    ],
    PAEW_ChangePIN: ['uint64', ['pointer', 'uint64']],
    PAEW_RecoverSeedFromMne: [
      'uint64',
      [ucharArray, 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_BTC_TXSign: [
      'uint64',
      [
        'pointer',
        'uint64',
        'uint64',
        strArray,
        uint64Array,
        ucharArray,
        'uint64',
        strArray,
        uint64Array,
      ],
    ],
    PAEW_LTC_TXSign: [
      'uint64',
      [
        'pointer',
        'uint64',
        'uint64',
        strArray,
        uint64Array,
        ucharArray,
        'uint64',
        strArray,
        uint64Array,
      ],
    ],
    PAEW_NEO_TXSign: [
      'uint64',
      [
        'pointer',
        'uint64',
        'uint64',
        strArray,
        uint64Array,
        ucharArray,
        'uint64',
        ucharArray,
        uint64Array,
      ],
    ],
    PAEW_ETH_TXSign: [
      'uint64',
      ['pointer', 'uint64', ucharArray, 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_ETC_TXSign: [
      'uint64',
      ['pointer', 'uint64', ucharArray, 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_CYB_TXSign: [
      'uint64',
      ['pointer', 'uint64', ucharArray, 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_EOS_TXSign: [
      'uint64',
      ['pointer', 'uint64', ucharArray, 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_ClearCOS: ['uint64', ['pointer', 'uint64']],
    PAEW_UpdateCOS: ['uint64', ['pointer', 'uint64', ucharArray, 'uint64']],
    PAEW_ImportSeed: ['uint64', ['pointer', 'uint64', ucharArray, 'uint64']],
    PAEW_GetTradeAddressFromSeed: [
      'uint64',
      [
        ucharArray,
        'uint64',
        uint32Array,
        'uint64',
        ucharArray,
        'pointer',
        'uchar',
        'uchar',
        ucharArray,
        'pointer',
      ],
    ],
    PAEW_GetLibraryVersion: ['uint64', [ucharArray, uint64Array]],
    PAEW_SetERC20Info: [
      'uint64',
      ['pointer', 'uint64', 'uchar', 'string', 'uchar'],
    ],
    PAEW_EOS_TX_Serialize: ['uint64', ['string', ucharArray, uint64Array]],
    PAEW_GetDeviceCheckCode: [
      'uint64',
      ['pointer', 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_VerifyFileECCSignature: ['uint64', ['string', 'pointer', 'uint64']],
    PAEW_XRP_TXSign: [
      'uint64',
      ['pointer', 'uint64', ucharArray, 'uint64', ucharArray, 'pointer'],
    ],
    PAEW_GetPublicKey: [
      'uint64',
      ['pointer', 'uint64', 'uchar', 'pointer', 'pointer'],
    ],
  }
);

function toHex(charArray, len) {
  var converted = '';
  var str = '';
  for (var i = 0; i < len; i++) {
    str = sprintf.sprintf('%02x', charArray[i]);
    converted = converted + str;
  }
  return converted;
}

function StringtoArray(str) {
  var array = [];
  for (var i = 0; i < str.length / 2; i++) {
    array.push(parseInt('0x' + str.slice(2 * i, 2 * i + 2)));
  }
  // console.log(array)
  return array;
}

function DataArray2Address(data) {
  var addresslen = data[1];
  var address = [];
  for (var i = 0; i < addresslen; i++) {
    address.push(data[9 + i]);
  }
  return address;
}

function ArraytoStr(array) {
  var str = '';
  for (var i = 0; i < array.length; i++) {
    if (array[i] >= 0x30) {
      str += String.fromCharCode(array[i]);
    } else break;
  }
  return str;
}

function PharseDeviceInfo(num, deviceinfo) {
  /*
	0:COS, [0,7], 8位
	1:SN Serial, [8,71], 64位
	2:Net, [72,73], 2位
	3:Status, [74,81], 8位
	4:Hash, [82,89], 8位
	5:N, [90,91], 2位
	6:N, [92,93], 2位
  
	COS：8位字符串, cos版本号
	SN： 64位字符串, 设备序列号
	TestNet: BOOL,Ture-TestNet, False-正式网
	SesStatus: BOOL,Ture-协商状态，False-用户状态
	Hash：8位字符串，协商秘钥hash
	N: 数字，密钥分散的数量
	M: 数字，密钥恢复的数量
	*/
  var devinfo = {};
  devinfo['NO'] = num;
  devinfo['COS'] = deviceinfo.pbCOSVersion;
  devinfo['SN'] = ArraytoStr(deviceinfo.pbSerialNumber);
  if (deviceinfo.ucChainType === 1) {
    devinfo['TestNet'] = false;
  } else {
    devinfo['TestNet'] = true;
  }
  if (deviceinfo.ucLifeCycle === 1) {
    devinfo['SesStatus'] = true;
  } else {
    devinfo['SesStatus'] = false;
  }
  devinfo['Hash'] = deviceinfo.pbSessKeyHash;
  devinfo['N'] = deviceinfo.nN;
  devinfo['M'] = deviceinfo.nT;
  devinfo['LcdState'] = deviceinfo.nLcdState;

  return devinfo;
}

function ewallet_step2string(step) {
  var szRet = '';

  switch (step) {
    case Steplist.pstep_invalid:
      szRet = 'invalid';
      break;
    case Steplist.pstep_comm_enum_dev:
      szRet = 'comm_enum_dev';
      break;
    case Steplist.pstep_comm_open_dev:
      szRet = 'comm_open_dev';
      break;
    case Steplist.pstep_comm_close_dev:
      szRet = 'comm_close_dev';
      break;
    case Steplist.pstep_comm_get_devinfo:
      szRet = 'comm_get_devinfo';
      break;
    case Steplist.pstep_comm_dev_select:
      szRet = 'comm_dev_select';
      break;
    case Steplist.pstep_init_seed_gen:
      szRet = 'init_seed_gen';
      break;
    case Steplist.pstep_init_mne_show:
      szRet = 'init_mne_show';
      break;
    case Steplist.pstep_init_mne_confirm:
      szRet = 'init_mne_confirm';
      break;
    case Steplist.pstep_init_seed_import:
      szRet = 'init_seed_import';
      break;
    case Steplist.pstep_init_keypair_gen:
      szRet = 'init_keypair_gen';
      break;
    case Steplist.pstep_init_key_agree_init:
      szRet = 'init_key_agree_init';
      break;
    case Steplist.pstep_init_key_agree_update:
      szRet = 'init_key_agree_update';
      break;
    case Steplist.pstep_init_key_agree_final:
      szRet = 'init_key_agree_final';
      break;
    case Steplist.pstep_init_key_agree_show:
      szRet = 'init_key_agree_show';
      break;
    case Steplist.pstep_init_key_agree_confirm:
      szRet = 'init_key_agree_confirm';
      break;
    case Steplist.pstep_init_shamir_transmit_init:
      szRet = 'init_shamir_transmit_init';
      break;
    case Steplist.pstep_init_shamir_export:
      szRet = 'init_shamir_export';
      break;
    case Steplist.pstep_init_shamir_import:
      szRet = 'init_shamir_import';
      break;
    case Steplist.pstep_init_shamir_confirm:
      szRet = 'init_shamir_confirm';
      break;
    case Steplist.pstep_comm_addr_gen:
      szRet = 'comm_addr_gen';
      break;
    case Steplist.pstep_comm_shamir_transmit_init:
      szRet = 'comm_shamir_transmit_init';
      break;
    case Steplist.pstep_comm_shamir_export:
      szRet = 'comm_shamir_export';
      break;
    case Steplist.pstep_comm_shamir_import:
      szRet = 'comm_shamir_import';
      break;
    case Steplist.pstep_comm_addr_get:
      szRet = 'comm_addr_get';
      break;
    case Steplist.pstep_comm_addr_confirm:
      szRet = 'comm_addr_confirm';
      break;
    case Steplist.pstep_comm_format:
      szRet = 'comm_format';
      break;
    case Steplist.pstep_comm_format_confirm:
      szRet = 'comm_format_confirm';
      break;
    case Steplist.pstep_sig_output_data:
      szRet = 'sig_output_data';
      break;
    case Steplist.pstep_sig_confirm:
      szRet = 'sig_confirm';
      break;
    case Steplist.pstep_comm_clearcos:
      szRet = 'comm_clearcos';
      break;
    case Steplist.pstep_comm_clearcos_confirm:
      szRet = 'comm_clearcos_confirm';
      break;
    case Steplist.pstep_comm_updatecos:
      szRet = 'comm_updatecos';
      break;
    case Steplist.pstep_comm_changepin:
      szRet = 'comm_changepin';
      break;
    case Steplist.pstep_comm_changepin_confirm:
      szRet = 'comm_changepin_confirm';
      break;
    default:
      szRet = 'unknown';
      break;
  }
  return szRet;
}

function ewallet_status2string(status) {
  var szRet = '';

  switch (status) {
    case Statuslist.pstatus_invalid:
      szRet = 'invalid';
      break;
    case Statuslist.pstatus_start:
      szRet = 'start';
      break;
    case Statuslist.pstatus_finish:
      szRet = 'finish';
      break;
    default:
      szRet = 'unknown';
      break;
  }
  return szRet;
}

var CONST = {};
CONST.PAEW_BTC_SIG_MAX_LEN = 112;
CONST.PAEW_LTC_SIG_MAX_LEN = 112;
CONST.PAEW_NEO_SIG_MAX_LEN = 112;
CONST.PAEW_CYB_SIG_MAX_LEN = 65;
CONST.PAEW_ETH_SIG_MAX_LEN = 69;
CONST.PAEW_XRP_SIG_MAX_LEN = 112;
CONST.PAEW_XRP_PUBKEY_MAX_LEN = 96;
CONST.PAEW_DEV_INFO_LEN = 47;
CONST.PAEW_PROCMSG_MAX_LEN = 256;
CONST.PAEW_BTC_ADDR_LEN = 40;
CONST.PAEW_LTC_ADDR_LEN = 40;
CONST.PAEW_NEO_ADDR_LEN = 40;
CONST.PAEW_ETH_ADDR_LEN = 40;
CONST.PAEW_CYB_ADDR_LEN = 40;
CONST.PAEW_EOS_SIG_MAX_LEN = 256;
CONST.PAEW_SN_LEN = 32;
CONST.BTC_DERIVE_PATH =
  config.coins.BTC.DerivativeRoot === "m/44'/1'/0'/0/"
    ? [0, 0x8000002c, 0x80000001, 0x80000000, 0x00000000, 0x00000000]
    : [0, 0x8000002c, 0x80000000, 0x80000000, 0x00000000, 0x00000000];
CONST.USDT_DERIVE_PATH =
  config.coins.BTC.DerivativeRoot === "m/44'/1'/0'/0/"
    ? [0, 0x8000002c, 0x80000001, 0x80000000, 0x00000000, 0x00000000]
    : [0, 0x8000002c, 0x80000000, 0x80000000, 0x00000000, 0x00000000];
CONST.LTC_DERIVE_PATH = [
  0,
  0x8000002c,
  0x80000002,
  0x80000000,
  0x00000000,
  0x00000000,
];
CONST.NEO_DERIVE_PATH = [
  0,
  0x8000002c,
  0x80000378,
  0x80000000,
  0x00000000,
  0x00000000,
];
CONST.ETH_DERIVE_PATH = [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000];
CONST.ETC_DERIVE_PATH = [
  0,
  0x8000002c,
  0x8000003d,
  0x80000000,
  0x00000000,
  0x00000000,
];
CONST.CYB_DERIVE_PATH = [0, 0, 1, 0x80];
CONST.EOS_DERIVE_PATH = [
  0,
  0x8000002c,
  0x800000c2,
  0x80000000,
  0x00000000,
  0x00000000,
];
CONST.XRP_DERIVE_PATH = [0, 0x8000002c, 0x80000090, 0x80000000, 0x00000000];

module.exports = {
  Api,
  toHex,
  CallbackParam,
  DeviceInfo,
  callback,
  TYPE,
  StringtoArray,
  PharseDeviceInfo,
  CONST,
};
