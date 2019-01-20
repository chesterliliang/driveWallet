var ref = require('ref')
var {
  TYPE,
  CallbackParam,
  Api,
  callback,
  CONST,
  toHex
} = require('./common')
var Promise = require('bluebird')
let {
  voidPP,
  uint32Array,
  ucharArray
} = TYPE
let {
  PAEW_BTC_SIG_MAX_LEN,
  BTC_DERIVE_PATH,
  ETH_DERIVE_PATH,
  BTS_DERIVE_PATH,
  PAEW_DEV_INFO_LEN
} = CONST

/*
Instruction:
  获取比特币以太币私钥
  [RETURN] { result, Privatekey }
    result:
      0为成功，非0值为失败
    Privatekey:
        {'BTC':'mnCRbcVysHk2h6QKNYYEqpTrpTdBvRx5Va','ETH':'d99473f68712A08B075d68B7615ccD35eF48e3A5'},
Example:
  Seed2PrivateKey(Seed) Seed为RecoverMNE恢复出的种子
*/
const Seed2PrivateKey = async (Seed) => {
  var Privatekeys = {}
  console.log('[Nebula Driver][Seed2PrivateKey]: Start')
  var result = -1
  var pnTXPrivatekeyLen = 120
  var pBTCPrivatekey = Buffer.alloc(pnTXPrivatekeyLen)
  var pETHPrivatekey = Buffer.alloc(pnTXPrivatekeyLen)
  var pBTSPrivatekey = Buffer.alloc(pnTXPrivatekeyLen)
  var pnBTCPrivatekeyLen = ref.alloc('int', 120)
  var pnETHPrivatekeyLen = ref.alloc('int', 120)
  var pnBTSPrivatekeyLen = ref.alloc('int', 120)
  pBTCPrivatekey.type = ref.types.uchar
  pETHPrivatekey.type = ref.types.uchar
  pBTSPrivatekey.type = ref.types.uchar

  var puiBTCDerivePath = uint32Array(BTC_DERIVE_PATH)
  var uiBTCDerivePathLen = ref.alloc('int', puiBTCDerivePath.length)
  var puiEthDerivePath = uint32Array(ETH_DERIVE_PATH)
  var uiETHDerivePathLen = ref.alloc('int', puiEthDerivePath.length)
  var puiBTSDerivePath = uint32Array(BTS_DERIVE_PATH)
  var uiBTSDerivePathLen = ref.alloc('int', puiBTSDerivePath.length)

  var pnTXAddressLen = 120
  var pBTCAddress = Buffer.alloc(pnTXAddressLen)
  pBTCAddress.type = ref.types.CString
  var pnBTCAddressLen = ref.alloc('int', 120)

  var pETHAddress = Buffer.alloc(pnTXAddressLen)
  pETHAddress.type = ref.types.CString
  var pnETHAddressLen = ref.alloc('int', 120)

  try {
    result = await new Promise((resolve, reject) => {
        console.log(`[Nebula Driver][Seed2PrivateKey][before PAEW_GetTradeAddressFromSeed]at=BTC,Seed = ${Seed},Seed.length = ${Seed.length},pnBTCPrivatekeyLen=${pnBTCPrivatekeyLen.deref()}`)
      console.log(`[Nebula Driver][Seed2PrivateKey][before PAEW_GetTradeAddressFromSeed]at=BTC,pnTXPrivatekeyLen=${pnBTCPrivatekeyLen.deref()}`)
      Api.PAEW_GetTradeAddressFromSeed.async(Seed, Seed.length, puiBTCDerivePath, uiBTCDerivePathLen.deref(), pBTCPrivatekey, pnBTCPrivatekeyLen, 1, 0, pBTCAddress, pnBTCAddressLen, (err, res) => {
        console.log(`[Nebula Driver][Seed2PrivateKey][BTC]privatekeylen= ${pnBTCPrivatekeyLen.deref()}`);
        console.log('BTCAddress = ',pBTCAddress.slice(0, pnBTCAddressLen.deref()).toString())
        console.log(`[Nebula Driver][Seed2PrivateKey]at=BTC,result=${res}`);
        if (res !== 0) {
          return reject(res);
        }
        console.log(`[Nebula Driver][Seed2PrivateKey]Privatekey=`,pBTCPrivatekey);
        console.log(`[Nebula Driver][Seed2PrivateKey][before PAEW_GetTradeAddressFromSeed]at=ETH,pnETHPrivatekeyLen=${pnETHPrivatekeyLen.deref()}`)
        Api.PAEW_GetTradeAddressFromSeed.async(Seed, Seed.length, puiEthDerivePath, uiETHDerivePathLen.deref(), pETHPrivatekey, pnETHPrivatekeyLen, 1, 1, pETHAddress, pnETHAddressLen, (err, res) => {
          console.log(`[Nebula Driver][Seed2PrivateKey][ETH]privatekeylen= ${pnETHPrivatekeyLen.deref()}`);
          console.log('ETHAddress = ',pETHAddress.slice(0, pnETHAddressLen.deref()).toString())
          console.log(`[Nebula Driver][Seed2PrivateKey]at=ETH,result=${res}`);
          if (res !== 0) {
            return reject(res);
          }
          Privatekeys['BTC'] = toHex(pBTCPrivatekey,32)
          Privatekeys['ETH'] = toHex(pETHPrivatekey,32)
          console.log(`[Nebula Driver][Seed2PrivateKey]privatekeys = ${Privatekeys.BTC}`);
          console.log(`[Nebula Driver][Seed2PrivateKey]privatekeys = ${Privatekeys.ETH}`);
          return resolve(res);
        })
      })
      })

  } catch (res) {
    console.log('[Nebula Driver][Seed2PrivateKey]Error=', res.toString());
    result = res;
    return {result};
  }
  console.log('[Nebula Driver][Seed2PrivateKey]: End')
  //result = 0
  return {
    result,
    Privatekeys
  }
}

module.exports = {
  Seed2PrivateKey
}
