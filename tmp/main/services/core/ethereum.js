const config = require('config')
const RLP = require('rlp')
const BigNumber = require('bignumber.js')
const _ = require('lodash')
const { Logger } = require('./utils')
const { getWeb3 } = require('./web3Facotry')
const { ETHTXSign } = require('./driver/ETH_TXSign')
const { getDecimal } = require('./erc20')

const logger = new Logger('Ethereum')

let lastETHNonce = -1;
let lastETCNonce = -1;

const removeHexHeadingZero = (hexStr) => {
  let result = '0x'
  let index = 2
  for (let i = 2; i < hexStr.length; i += 2) {
    let one = hexStr.charAt(i)
    let two = hexStr.charAt(i + 1)

    if (!(one === '0' && two === '0')) {
      result = result + hexStr.substring(index)
      break
    } else {
      index = i + 2
    }
  }
  return result
}

const dec2hexString = (dec) => {
  let h = dec.toString(16)
  if (h.length % 2 === 1) {
    return '0x0' + h
  } else {
    return '0x' + h
  }
}

const signTx = async ({ address, to, value, etc, erc20, testNet, gas, gasprice, nonce }) => {
  // todo: need opt 0x2a setup
  // let [v, r, s] = ['0x2a', '', '']
  try {
    let [v, r, s] = ['', '', '']
    if(etc===true){
      if (testNet === true) {
        v = '0x3e'
      } else {
        v = '0x3d'
      }
    }
    else{
      if (testNet === true) {
        v = '0x2a'
      } else {
        v = '0x01'
      }
    }

    console.log(`v=${v},r=${r},s=${s}`)

    let tx = ''
    // if (testNet === true) {
    //const lastNonce = !etc ? lastETHNonce : lastETCNonce
    //const nonce = await getNonce({ address, testNet, etc });//Math.max(await getNonce({ address, testNet, etc }), lastNonce + 1)
    let txinfo =  await createTx({ address, to, value, v, r, s, testNet, etc, erc20, gas, gasprice, nonce })
    logger.log(`txinfo=${txinfo}`, ['Sign Tx'])
    tx = txinfo.tx
    // } else {
    //   tx = await createTx({ address, to, value, v, r, s, testNet, erc20, gas, gasprice })
    // }

    // let tx = await createTx({address, to, value, v, r, s, testNet, erc20})
    console.log(`address=${address},to=${to},value=${value},testnet=${testNet},erc20=${erc20}`)
    logger.log(`rawtxwosig=${tx}`, ['Sign Tx'])

    // todo: need change below number to M & N
    let result = await ETHTXSign(tx,etc,erc20,txinfo.decimal)
    if (!!(result.result || parseInt(result, 10))) {
      return result.result || parseInt(result, 10);
    }

    logger.log(`signature=${JSON.stringify(result)}`, ['Sign Tx'])

    v = result.sign.v
    r = result.sign.r
    s = result.sign.s
    console.log(`v=${v},r=${r},s=${s}`)
    if(etc===true){
      if (testNet && v === '0x00') {
        v = '0x9f'
      } else if (testNet && v !== '0x00') {
        v = '0xa0'
      } else if (!testNet && v === '0x00') {
        v = '0x9d'
      } else if (!testNet && v !== '0x00') {
        v = '0x9e'
      }
    }
    else{
      if (testNet && v === '0x00') {
        v = '0x77'
      } else if (testNet && v !== '0x00') {
        v = '0x78'
      } else if (!testNet && v === '0x00') {
        v = '0x25'
      } else if (!testNet && v !== '0x00') {
        v = '0x26'
      }
    }

    result = await createTx({ address, to, value, testNet, etc, r, s, v, erc20, gas, gasprice, nonce })
    logger.log(`createTx result=${JSON.stringify(result)}`, ['Sign Tx'])
    let rawtx = '0x' + result.tx
    logger.log(`rawtxwsig=${rawtx}`, ['Sign Tx'])

    result = await sendRawTx({ rawtx, testNet, etc })
    logger.log(`txid=${JSON.stringify(result)}`, ['Sign Tx'])

    if (etc) {
      lastETCNonce = nonce
    } else {
      lastETHNonce = nonce
    }

    return result
  }
  catch (err) {
    console.log(err)
    return 1
  }
}

const createTx = async ({ address, to, value, data, v, r, s, testNet, etc, erc20, gas, gasprice, nonce }) => {
  let web3 = getWeb3(testNet, etc)
  let gasLimit = 0
  let gasPrice = 0
  let decimal = -1

  if (erc20 !== undefined && erc20 !== null && erc20 !== '') {
    let r = _.find(config.coins.ERC20, { name: erc20 })

    decimal = await getDecimal({ name: erc20, testNet })
    value = new BigNumber(value).times(new BigNumber(Math.pow(10, decimal)))
    data = web3.eth.abi.encodeFunctionCall(_.find(r.abi, { name: 'transfer' }), [to, value])

    value = ''
    to = r.address
    if (gas !== undefined && gas !== null && gas !== '') {
      gasLimit = gas
    } else {
      gasLimit = config.coins.ETH.ERC20GasLimit
    }
  } else {
    value = new BigNumber(value).times(new BigNumber(1e18))
    value = dec2hexString(value)
    if (!data) data = ''
    if (gas !== undefined && gas !== null && gas !== '') {
      gasLimit = gas
    } else {
      gasLimit = config.coins.ETH.GasLimit
    }
  }

  gasLimit = dec2hexString(parseInt(gasLimit))

  if (nonce === 0) {
    nonce = ''
  } else {
    nonce = dec2hexString(nonce)
  }
  console.log('getNonce nonce = '.nonce)
  if (gasprice !== undefined && gasprice !== null && gasprice !== '') {
    gasPrice = gasprice
  } else {
    gasPrice = await getGasPrice(testNet, etc)
  }
  console.log(`type=${typeof (gasPrice)},gasPrice=${gasPrice}`)

  gasPrice = dec2hexString(parseInt(gasPrice))
  console.log(`gasPrice=${gasPrice}`)

  console.log(`nonce=${nonce}, gasPrice=${gasPrice}, gasLimit=${gasLimit}, to=${to}, value=${value}, data=${data},v=${v},r=${r},s=${s}`)
  let encoded = null
  if (v) {
    r = removeHexHeadingZero(r)
    s = removeHexHeadingZero(s)
    encoded = RLP.encode([nonce, gasPrice, gasLimit, to, value, data, v, r, s])
  } else {
    encoded = RLP.encode([nonce, gasPrice, gasLimit, to, value, data])
  }

  return { tx: encoded.toString('hex'), decimal }
}

const sendRawTx = ({ rawtx, testNet, etc }) => {
  let web3 = getWeb3(testNet, etc)
  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(rawtx, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

const getGasPrice = async (testNet, etc) => {
  let web3 = getWeb3(testNet, etc)
  return web3.eth.getGasPrice()
}

const getEtcBalance = async ({ address, testNet }) => {
  try{
    const etc = true
    let web3 = getWeb3(testNet, etc)
    let balance = await web3.eth.getBalance(address)
    const a = new BigNumber(balance)
    const b = new BigNumber(config.coins.ETH.Rate)
    return { address, balance: a.dividedBy(b).toNumber() }
  }
  catch(err)
  {
    console.log(err)
    return { address, balance: 'NaN' }
  }
}
const getEthBalance = async ({ address, testNet }) => {
try{
  const etc = false
  let web3 = getWeb3(testNet,etc)
  let balance = await web3.eth.getBalance(address)
  const a = new BigNumber(balance)
  const b = new BigNumber(config.coins.ETH.Rate)
  return { address, balance: a.dividedBy(b).toNumber() }
}
catch(err)
{
  console.log(err)
  return { address, balance: 'NaN' }
}
}

const getNonce = async ({ address, testNet, etc }) => {
  let web3 = getWeb3(testNet, etc)
  const lastNonce = !etc ? lastETHNonce : lastETCNonce
  return Math.max(await web3.eth.getTransactionCount(address), lastNonce + 1)
}

const getGasLimit = async ({ erc20 }) => {
  let GasLimit = 0
  if (erc20 !== undefined && erc20 !== null && erc20 !== '') {
    GasLimit = config.coins.ETH.ERC20GasLimit
  } else {
    GasLimit = config.coins.ETH.GasLimit
  }
  return GasLimit
}

module.exports = {
  getGasPrice,
  getEtcBalance,
  getEthBalance,
  getNonce,
  getGasLimit,
  // createTx,
  // sendRawTx,
  signTx,
  getWeb3,
}
