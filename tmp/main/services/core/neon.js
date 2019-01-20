import SHA256 from 'crypto-js/sha256'
import base58 from 'bs58'
import hexEncoding from 'crypto-js/enc-hex'
const axios = require('axios')
const { NEO_TXSign } = require('./driver/NEO_TXSign')
const config = require('config')

//const Net = 'http://47.75.154.248:5000'
const GAS_ID = '0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const NEO_ID = '0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';

const hexRegex = /^([0-9A-Fa-f]{2})*$/

/**
 * Checks if input is a hexstring. Empty string is considered a hexstring.
 * @example
 * isHex('0101') = true
 * isHex('') = true
 * isHex('0x01') = false
 * @param {string} str
 * @return {boolean}
 */
const isHex = str => {
  try {
    return hexRegex.test(str)
  } catch (err) { return false }
}

/**
 * Throws an error if input is not hexstring.
 * @param {string} str
 */
export const ensureHex = str => {
  if (!isHex(str)) throw new Error(`Expected a hexstring but got ${str}`)
}

/**
 * Reverses a HEX string, treating 2 chars as a byte.
 * @example
 * reverseHex('abcdef') = 'efcdab'
 * @param {string} hex - HEX string
 * @return {string} HEX string reversed in 2s.
 */
export const reverseHex = hex => {
    ensureHex(hex)
    let out = ''
    for (let i = hex.length - 2; i >= 0; i -= 2) {
      out += hex.substr(i, 2)
    }
    return out
}

/**
 * Converts a number to a big endian hexstring of a suitable size, optionally little endian
 * @param {number} num
 * @param {number} size - The required size in bytes, eg 1 for Uint8, 2 for Uint16. Defaults to 1.
 * @param {boolean} littleEndian - Encode the hex in little endian form
 * @return {string}
 */
const num2hexstring = (num, size = 1, littleEndian = false) => {
    if (typeof num !== 'number') throw new Error('num must be numeric')
    if (num < 0) throw new RangeError('num is unsigned (>= 0)')
    if (size % 1 !== 0) throw new Error('size must be a whole integer')
    if (!Number.isSafeInteger(num)) throw new RangeError(`num (${num}) must be a safe integer`)
    size = size * 2
    let hexstring = num.toString(16)
    hexstring = hexstring.length % size === 0 ? hexstring : ('0'.repeat(size) + hexstring).substring(hexstring.length)
    if (littleEndian) hexstring = reverseHex(hexstring)
    return hexstring
}

/**
 * Converts a number to a variable length Int. Used for array length header
 * @param {number} num - The number
 * @returns {string} hexstring of the variable Int.
 */
const num2VarInt = (num) => {
    if (num < 0xfd) {
      return num2hexstring(num)
    } else if (num <= 0xffff) {
      // uint16
      return 'fd' + num2hexstring(num, 2, true)
    } else if (num <= 0xffffffff) {
      // uint32
      return 'fe' + num2hexstring(num, 4, true)
    } else {
      // uint64
      return 'ff' + num2hexstring(num, 8, true)
    }
}

/**
 * Performs 2 SHA256.
 * @param {string} hex - String to hash
 * @returns {string} hash output
 */
const hash256 = (hex) => {
    if (typeof hex !== 'string') throw new Error('reverseHex expects a string')
    if (hex.length % 2 !== 0) throw new Error(`Incorrect Length: ${hex}`)
    let hexEncoded = hexEncoding.parse(hex)
    let ProgramSha256 = SHA256(hexEncoded)
    return SHA256(ProgramSha256).toString()
}

/**
 * @param {arrayBuffer} arr
 * @returns {string} HEX string
 */
const ab2hexstring = arr => {
    if (typeof arr !== 'object') {
      throw new Error('ab2hexstring expects an array')
    }
    let result = ''
    for (let i = 0; i < arr.length; i++) {
      let str = arr[i].toString(16)
      str = str.length === 0 ? '00'
        : str.length === 1 ? '0' + str
          : str
      result += str
    }
    return result
}

/**
 * @param {string} scriptHash
 * @return {string}
 */
const getAddressFromScriptHash = (scriptHash) => {
    const ADDR_VERSION = '17'
    scriptHash = reverseHex(scriptHash)
    const shaChecksum = hash256(ADDR_VERSION + scriptHash).substr(0, 8)
    return base58.encode(Buffer.from(ADDR_VERSION + scriptHash + shaChecksum, 'hex'))
}

/**
 * Verifies an address using its checksum.
 * @param {string} address
 * @return {boolean}
 */
const isAddress = (address) => {
    try {
      console.log(`address is ${address}`)
      let programHash = ab2hexstring(base58.decode(address))
      console.log(`programHash is ${programHash}`)
      let shaChecksum = hash256(programHash.slice(0, 42)).substr(0, 8)
      console.log(`shaChecksum is ${shaChecksum}`)
      // We use the checksum to verify the address
      if (shaChecksum !== programHash.substr(42, 8)) return false
      console.log(`shaChecksum is valid`)
      // As other chains use similar checksum methods, we need to attempt to transform the programHash back into the address
      const scriptHash = reverseHex(programHash.slice(2, 42))
      console.log(`scriptHash is ${scriptHash}`)
      if (getAddressFromScriptHash(scriptHash) !== address) {
        // address is not valid Neo address, could be btc, ltc etc.
        return false
      }
      return true
    } catch (e) { return false }
}

const get = async (testNet) => {
    const _B = testNet ? config.node.NEO.TestNet : config.node.NEO.MainNet
    console.log('[neo][get]', _B, '  testnet=', testNet)
    return (await axios.get(_B)).data
}

const post = async (data, testNet) => {
    const _B = testNet ? config.node.NEO.TestNet : config.node.NEO.MainNet
    console.log('[neo][post]', _B, '  testnet=', testNet)
    return (await axios.post(_B, data)).data
}

const postNode = async (data, testNet) => {
    const _B = testNet ? config.node.NEO_NODE.TestNet : config.node.NEO_NODE.MainNet
    console.log('[neo][postNode]', _B, '  testnet=', testNet)
    return (await axios.post(_B, data)).data
}

const getGasBalance = async ({ address, testNet }) => {
    try {
        //const Net = 'http://47.75.154.248:5000'//'MainNet'//testNet ? 'TestNet' : 'MainNet'
        const request = {
                jsonrpc: "2.0",
                method: "getbalance",
                params: [address],
                id: 10001
        };
        console.log('[getGasBalance][request] = ',request);
        const response= await post(request, testNet);
        //if there is no neo nor gas preset, the api will return like this:
        // {
        //     "jsonrpc": "2.0",
        //     "id": 10001,
        //     "error": {
        //         "code": -1,
        //         "message": "No Data",
        //         "data": "Data does not exist"
        //     }
        // }
        if (!response.result) {
            if (response.error && response.error.code === -1) {
                return  {address, balance: 0};
            }
            return  {address, balance: 'NaN'};
        }
        let gasBalance = 0;
        for (var value of response.result) {
            if (value.asset === GAS_ID) {
                gasBalance = value.balance;
                break;
            }
        }
        
        //let Balance = await Neon.get.balance(Net, address);
        //let gasBalance = Balance.assets.GAS.balance.toString();
        console.log("gasBalance = ", gasBalance)
        return { address, balance: gasBalance }
    }
    catch(err)
    {
        console.log('[neon.js][getGasBalance]err = ',err)
        return  {address, balance: 'NaN'}
    }
}

const getNeoBalance = async ({ address, testNet }) => {
    try{
        //const Net = 'http://47.75.154.248:5000'//'MainNet'//testNet ? 'TestNet' : 'MainNet'
        //let Balance = await Neon.get.balance(Net, address)
        const request = {
            jsonrpc: "2.0",
            method: "getbalance",
            params: [address],
            id: 10002
        };
        console.log('[getGasBalance][request] = ',request);
        const response= await post(request, testNet);
        let neoBalance = 0;
        //if there is no neo nor gas preset, the api will return like this:
        // {
        //     "jsonrpc": "2.0",
        //     "id": 10001,
        //     "error": {
        //         "code": -1,
        //         "message": "No Data",
        //         "data": "Data does not exist"
        //     }
        // }
        if (!response.result) {
            if (response.error && response.error.code === -1) {
                return  {address, balance: 0};
            }
            return  {address, balance: 'NaN'};
        }
        for (var value of response.result) {
            if (value.asset === NEO_ID) {
                neoBalance = value.balance;
                break;
            }
        }
        //let neoBalance = Balance.assets.NEO.balance.toString();
        console.log("neoBalance = ", neoBalance)
        return { address, balance: neoBalance }
    }
    catch(err)
    {
        console.log('[neon.js][getNeoBalance]err = ',err)
        return  {address, balance: 'NaN'}
    }
}

/*const signTxMain = async (rawTx, rpcnet) => {
    // Sign tx and attach signature onto tx
    // The publicKey passed in is used as a check to ensure that the private and public keys match.
    let result
    let serializedTx = tx.serializeTransaction(rawTx)
    let utxos = []
    let client = Neon.create.rpcClient(config.node.NEO_NODE.MainNet)
    try {
        if(rawTx.claims){
          for (let Claim of rawTx.claims) {
            let utxo = await client.getRawTransaction(Claim.prevHash, 0)
            utxos.push(utxo)
          };
        }
        else{
          for (let input of rawTx.inputs) {
            let utxo = await client.getRawTransaction(input.prevHash, 0)
            utxos.push(utxo)
          };
        }
      }
    catch (err) {
        console.log('[neon.js][signTxMain] err = ',err)
        throw new Error(`NEO getRawTransaction failed, reason is ${err}`)
    }
    result = await NEO_TXSign(utxos, serializedTx)
    if (result.result !== 0) throw new Error(`NEO signed failed, reason is ${result.result}`)
    const invocationScript = result.Signs.invocation
    const verificationScript = result.Signs.verification
    const txObj = tx.deserializeTransaction(serializedTx)
    txObj.scripts.push({ invocationScript, verificationScript })
    let serializedtx = await tx.serializeTransaction(txObj)
    return new Promise(resolve =>
        resolve(tx.serializeTransaction(txObj)))
}*/

const SendAsset = async ({ address, to, value, testNet, GAS }) => {
    let transfertxhex
    const requestForUTXOIds = {
            jsonrpc: "2.0",
            method: "getutxostopay",
            params: [
                address,
                GAS ? GAS_ID : NEO_ID,
                value
            ],
            "id": 10002
    }
    const requestForCurrentTx = {
        jsonrpc: "2.0",
        method: "gettransfertxhex",
        params: [
            address,
            to,
            GAS ? GAS_ID : NEO_ID,
            value
        ],
        "id": 10003
    }
    //const Net = 'http://47.75.154.248:5000'//'MainNet'//testNet ? 'TestNet' : 'MainNet'
    /*const intent = GAS ? api.makeIntent({ GAS: value }, to) : api.makeIntent({ NEO: value }, to)
    console.log('NEON intent = ',intent) // This is an array of 2 Intent objects, one for each asset
    const neoconfig = {
        net: Net, //'http://47.75.154.248:10332',// The network to perform the action, MainNet or TestNet.
        address: address,//'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',  // This is the address which the assets come from.
        // privateKey: '9ab7e154840daca3a2efadaf0df93cd3a5b51768c632f5433f86909d9b994a69',
        intents: intent,
        publicKey: '',//此参数会传入signTx种 原本传私钥 现在用作测试网标记
        signingFunction: signTxMain
    }*/
    try {
        //get utxo ids for pay
        const resultUTXOIds = await post(requestForUTXOIds, testNet);
        if (!resultUTXOIds.result) {
            console.log('[neon.js][SendAsset][requestForUTXOIds]failed, request = ',requestForUTXOIds, ' ---', 'response = ', resultUTXOIds);
            return -1010;
        } else {
            console.log('[neon.js][SendAsset][requestForUTXOIds]succeeded, request = ',requestForUTXOIds, ' ---', 'response = ', resultUTXOIds);
        }

        //get utxos by utxoids from our own full node
        var utxos = [];
        for (const iterator of resultUTXOIds.result) {
            if (iterator.txid) {
                const requestForFullUTXO = {
                    jsonrpc: "2.0",
                    method: "getrawtransaction",
                    params: [iterator.txid],
                    "id": 10003
                }
                const resultUTXO = await postNode(requestForFullUTXO, testNet);
                if (!resultUTXO.result) {
                    console.log('[neon.js][SendAsset][requestForFullUTXO]failed, request = ',requestForFullUTXO, ' ---', 'response = ', resultUTXO);
                    return -1020;
                }
                else {
                    console.log('[neon.js][SendAsset][requestForFullUTXO]succeeded, request = ',requestForFullUTXO, ' ---', 'response = ', resultUTXO);
                }
                utxos.push(resultUTXO.result);
            } else {
                console.log('[neon.js][SendAsset][requestForUTXOIds]failed, request = ',requestForUTXOIds, ' ---', 'response = ', resultUTXOIds);
                return -1030;
            }
        }

        //get raw transactions from utxo ids
        const requestForFullUTXOs = {
            jsonrpc: "2.0",
            method: "gettransfertxhex",
            params: [
                address,
                to,
                GAS ? GAS_ID : NEO_ID,
                value
            ],
            "id": 10003
        }
        const resultForCurrentTx = await post(requestForCurrentTx, testNet);
        if (!resultForCurrentTx.result) {
            console.log('[neon.js][SendAsset][requestForCurrentTx]1failed, request = ',requestForCurrentTx, ' ---', 'response = ', resultForCurrentTx);
            return -1040;
        } else {
            console.log('[neon.js][SendAsset][requestForCurrentTx]succeeded, request = ',requestForCurrentTx, ' ---', 'response = ', resultForCurrentTx);
        }
        if (resultForCurrentTx.result.length > 0) {
            if (resultForCurrentTx.result[0].transfertxhex) {
                transfertxhex = resultForCurrentTx.result[0].transfertxhex;
            } else {
                console.log('[neon.js][SendAsset][requestForCurrentTx]2failed, request = ',requestForCurrentTx, ' ---', 'response = ', resultForCurrentTx);
                return -1050;
            }
        } else {
            console.log('[neon.js][SendAsset][requestForCurrentTx]3failed, request = ',requestForCurrentTx, ' ---', 'response = ', resultForCurrentTx);
            return -1060;
        }

        let result = await NEO_TXSign(utxos, transfertxhex);
        if (result.result !== 0) throw new Error(`NEO signed failed, reason is ${result.result}`)
        const invocationScript = result.Signs.invocation;
        const verificationScript = result.Signs.verification;
        transfertxhex += num2VarInt(1);//now the scripts length is always 1(just one signature)
        const invoLength = num2VarInt(invocationScript.length / 2);
        const veriLength = num2VarInt(invocationScript.length / 2);
        transfertxhex += (invoLength + invocationScript + veriLength + verificationScript);

        const requestSendAssert = {
            jsonrpc: "2.0",
            method: "sendrawtransaction",
            params: [transfertxhex],
            id: 10000
        };
        result = await post(requestSendAssert, testNet);
        if (result.result.length > 0 && result.result[0].sendrawtransactionresult) {
            console.log('[neon.js][SendAsset][requestSendAssert]succeeded, request = ',requestSendAssert, ' ---', 'response = ', result);
            return {result:0,txid:result.result[0].txid};
        } else {
            console.log('[neon.js][SendAsset][requestSendAssert]failed, request = ',requestSendAssert, ' ---', 'response = ', result);
            return -1070;
        }


        /*result = await Neon.sendAsset(neoconfig)
        if(result.response.result === true){
            console.log('[neon.js][SendAsset]succeed, response = ', result.response)
            return {result:0,txid:result.response.txid}
        }
        else{
            console.log('[neon.js][SendAsset]failed, response = ', result.response)
            return -1080;
        }*/
    }
    catch (err) {
        console.log('[neon.js][SendAsset] err = ',err)
        return -1;
    }
}

const ClaimGas = async ({ address, value, testNet }) => {
    // let result
    // //const Net = 'http://47.75.154.248:5000'//'MainNet'//testNet ? 'TestNet' : 'MainNet'
    // const neoconfig = {
    //     net: Net, //'http://47.75.154.248:10332',// The network to perform the action, MainNet or TestNet.
    //     address: address,//'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',  // This is the address which the assets come from.
    //     publicKey: '',
    //     signingFunction: signTxMain
    // }
    // try {
    //     result = await Neon.claimGas(neoconfig)
    //     if(result.response.result === true){
    //         console.log('[neon.js][ClaimGas]succeed, response = ', result.response)
    //         return {result:0,txid:result.response.txid}
    //     }
    //     else{
    //         console.log('[neon.js][ClaimGas]failed, response = ', result.response)
    //         return -1
    //     }
    // }
    // catch (err) {
    //     console.log('[neon.js][ClaimGas] err = ',err)
    //     return -1
    // }
    return 0;
}
const NeoAddressValidate = (address)=>{
    let legal = isAddress(address);//wallet.isAddress(address)
    console.log(`address:${address} is ${legal}`);
    return legal;
}





module.exports = {
    getGasBalance,
    getNeoBalance,
    SendAsset,
    NeoAddressValidate,
    ClaimGas,
}


