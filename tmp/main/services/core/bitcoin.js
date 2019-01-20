const Bitcoin = require('bitcoinjs-lib')
const BigNumber = require('bignumber.js')
const axios = require('axios')
const config = require('config')
const _ = require('lodash')
const { Logger } = require('./utils')
const { BTCTXSign } = require('./driver/BTC_TXSign')
const NBDataError = require('./error/NBDataError')

const get = async (url, testNet) => {
  const _B = testNet ? config.node.BTC.TestNet : config.node.BTC.MainNet
  console.log('[bitcoin][get]', _B, '  testnet=', testNet)
  return (await axios.get(_B + url)).data
}

const post = async (url, data, testNet) => {
  const _B = testNet ? config.node.BTC.TestNet : config.node.BTC.MainNet
  console.log('[bitcoin][post]', _B, '  testnet=', testNet)
  return (await axios.post(_B + url, data)).data
}

const logger = new Logger('Bitcoin')

const getRawTransaction = async ({ txid, testNet }) => {
  return get(`/rawtx/${txid}`, testNet)
}

const sendTx = async ({ rawtx, testNet }) => {
  return post(`/tx/send`, { rawtx }, testNet)
}

const getAddressUtxo = async ({ address, testNet }) => {
  return post('/addrs/utxo', { addrs: address }, testNet)
}

const getEstimateFee = async ({ selector, testNet }) => {
  const result = await get(`/utils/estimatefee?nbBlocks=${selector}`, false)
  return result[selector.toString()]
}

const composeTx = async ({ inputs, outputs, testNet }) => {
  const network = testNet ? Bitcoin.networks.testnet : Bitcoin.networks.bitcoin

  let tx = new Bitcoin.TransactionBuilder(network)

  inputs.forEach((e) => tx.addInput(e.txid, e.vout))
  outputs.forEach((e) => tx.addOutput(e.address, e.amount))

  var txRaw = tx.buildIncomplete()

  if (inputs[0].signature) {
    inputs.forEach((e, i) => txRaw.setInputScript(i, Buffer.from(e.signature, 'hex')))
  }

  return { rawTx: txRaw.toHex(), inputs, outputs, testNet }
}

const getBalance = async ({ address, testNet }) => {
  try{
    const r = await get(`/addr/${address}/balance`, testNet)
    const a = new BigNumber(r)
    const b = new BigNumber(config.coins.BTC.Rate)
    return { address, balance: a.dividedBy(b).toNumber() }
  }
  catch(err)
  {
    console.log(err)
    return{ address,balance: 'NaN'}
  }
}

const getTxs = async ({ address, from, to, testNet }) => {
  let addrs = address
  let result = {}
  if (from !== undefined && to !== undefined) {
    result = await post(`/addrs/txs`, { addrs, from, to }, testNet)
  } else {
    result = await post(`/addrs/txs`, { addrs }, testNet)
  }

  return result
}

const prepareTx = async ({ address, to, value, fee, selector, testNet }) => {
  const addressInvalid = (address === undefined || address === null || address === '')
  const toInvalid = (to === undefined || to === '' || to === null)
  const valueInvalid = (value === undefined || value === '' || value === null)
  const feeInvalid = (fee === undefined || fee === null || fee === '')
  const selectorInvalid = (selector === undefined || selector === '' || selector === null)
  if (addressInvalid || valueInvalid) throw new Error(20301)

  if (!feeInvalid && toInvalid) throw new Error(20301)//有fee时为转账，to必须存在

  if (feeInvalid && selectorInvalid) throw new Error(20301)//无fee时为预估手续费，selector必须存在

  if (toInvalid && selectorInvalid) throw new Error(20301)

  let { Rate } = config.coins.BTC
  let { balance } = await getBalance({ address, testNet })
  balance = new BigNumber(balance).times(Rate)
  value = new BigNumber(value).times(Rate)

  if (!balance.minus(value).greaterThanOrEqualTo(0) && BigNumber(value).dividedBy(Rate) != -1) throw new Error(20304)

  let utxos = await getAddressUtxo({ address, testNet })
  utxos = _.filter(utxos, (e) => e.confirmations >= config.coins.BTC.MinimalConfirmation)
  utxos = _.orderBy(utxos, ['amount'], ['desc'])

  let sum = new BigNumber(0)
  let inputs = []
  let reminder = new BigNumber(0)
  let found = false
  let calculatedFee = 0.0

  if (fee) {
    fee = new BigNumber(fee).times(Rate)
    if (BigNumber(value).dividedBy(Rate) == -1) {
      console.log('[bitcoin][prepareTx] should use all utxos')
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]
        inputs.push(_.pick(utxo, ['txid', 'vout']))
      }
    } else {
      const cap = value.plus(fee)

      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]
        inputs.push(_.pick(utxo, ['txid', 'vout']))
  
        sum = sum.plus(utxo.satoshis)
        reminder = sum.minus(cap)
        if (reminder.greaterThanOrEqualTo(0.0)) { // utxos is ok for transaction
          found = true
          break
        }
      }
    }

    
  } else {
    const cap = value

    // todo: return -1 error handler
    const feePriceRe = await getEstimateFee({ selector, testNet })
    const feePrice = new BigNumber(feePriceRe).times(Rate)
    const txGeneralBytesNum = 10
    const txOutputBytesNum = 34 * 2 // assume all output is P2PKH
    const txInputUnitBytesNum = 149
    let txTotalBytesNum = txGeneralBytesNum + txOutputBytesNum

    if (BigNumber(value).dividedBy(Rate) == -1) {
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]
        inputs.push(_.pick(utxo, ['txid', 'vout', 'address', 'redeemScript', 'derivedPath']))
  
        sum = sum.plus(utxo.satoshis)
        txTotalBytesNum += txInputUnitBytesNum * inputs.length
        calculatedFee = feePrice.times(txTotalBytesNum).dividedBy(1024).floor()
      }
      fee = calculatedFee
      logger.log(`inputs value=${sum},outputs value=${value},change=${reminder},fee=${calculatedFee},tx bytes=${txTotalBytesNum}, fee price=${feePrice}`, ['Prepare Tx'])
    } else {
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]
        inputs.push(_.pick(utxo, ['txid', 'vout', 'address', 'redeemScript', 'derivedPath']))
  
        sum = sum.plus(utxo.satoshis)
        reminder = sum.minus(cap)
        if (reminder.greaterThanOrEqualTo(0.0)) {
          txTotalBytesNum += txInputUnitBytesNum * inputs.length
          calculatedFee = feePrice.times(txTotalBytesNum).dividedBy(1024).floor()
          if (reminder.greaterThanOrEqualTo(calculatedFee)) {
            found = true
            fee = calculatedFee
            reminder = reminder.minus(fee)
            logger.log(`inputs value=${sum},outputs value=${value},change=${reminder},fee=${calculatedFee},tx bytes=${txTotalBytesNum}, fee price=${feePrice}`, ['Prepare Tx'])
            break
          }
        }
      }
    }
  }

  if (!found) {
    throw new NBDataError({fee: calculatedFee.toNumber()}, 20305)
  }

  let outputs = {}
  let result = reminder.eq(0);
  logger.log(`result=${result}`, ['Prepare Tx'])
  if (result) {
    outputs = JSON.parse(`{"${to}": ${value}}`)
    logger.log(`outputs=${JSON.stringify(outputs)}`, ['Prepare Tx'])
  } else {
    if (to === address) {
      reminder = reminder.plus(value)
      outputs = JSON.parse(`{"${address}": ${reminder}}`)
    } else {
      outputs = JSON.parse(`{"${to}": ${value}, "${address}": ${reminder}}`)
    }
    logger.log(`outputs=${JSON.stringify(outputs)}`, ['Prepare Tx'])
  }
  logger.log(`to: ${to}, value: ${value}, address: ${address}, reminder: ${reminder}`, ['Prepare Tx'])
  logger.log(`inputs=${JSON.stringify(inputs)},outputs=${JSON.stringify(outputs)}`, ['Prepare Tx'])

  return { inputs, outputs, address, to, selector, testNet, value: value.toNumber(), fee: fee.toNumber() }
}

const signTx = async ({ address, to, value, fee, selector, memo, testNet }) => {
  try {
    let result = await prepareTx({ address, to, value, fee, selector, testNet })
    let { inputs, outputs } = result

    outputs = _.keys(outputs).map((e) => JSON.parse(`{"address":"${e}", "amount":${outputs[e]}}`))

    logger.log(`outputs=${JSON.stringify(outputs)}`, ['Sign Tx'])

    let tx = await composeTx({ inputs, outputs, testNet })

    logger.log(`rawtx=${JSON.stringify(tx)}`, ['Sign Tx'])

    let preTxs = []

    for (let i = 0; i < inputs.length; i++) {
      preTxs.push((await getRawTransaction({ txid: inputs[i].txid, testNet })).rawtx)
    }

    logger.log(`preTxs=${JSON.stringify(preTxs)}`, ['Sign Tx'])

    // todo: need change below number to M & N
    result = await BTCTXSign(preTxs, tx.rawTx)
    if (!!(result.result || parseInt(result, 10))) {
      return result.result || parseInt(result, 10);
    }

    logger.log(`signature=${JSON.stringify(result)}`, ['Sign Tx'])

    let sigs = result.strSigns

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].signature = sigs[i]
    }

    tx = await composeTx({ inputs, outputs, testNet })

    logger.log(`rawtxWithSig=${JSON.stringify(tx)}`, ['Sign Tx'])

    result = await sendTx({ rawtx: tx.rawTx, testNet }) 
    logger.log(`result = ${result}`)
    return result
  }
  catch (err) {
    logger.log(err)
    return -1
  }
}

const createTx = async ({ address, to, value, fee, selector, memo, testNet }) => {
  let result = await prepareTx({ address, to, value, fee, selector, testNet })
  let { inputs, outputs } = result

  outputs = _.keys(outputs).map((e) => JSON.parse(`{"address":"${e}", "amount":${outputs[e]}}`))

  logger.log(`outputs=${JSON.stringify(outputs)}`, ['Sign Tx'])

  let tx = await composeTx({ inputs, outputs, testNet })

  logger.log(`rawtx=${JSON.stringify(tx)}`, ['Sign Tx'])

  return tx
}

module.exports = {
  getBalance,
  getTxs,
  prepareTx,
  signTx,
  getAddressUtxo,
  composeTx,
  createTx
}
