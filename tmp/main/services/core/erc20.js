const BigNumber = require('bignumber.js')
const config = require('config')
const _ = require('lodash')
const { getWeb3 } = require('./web3Facotry')

const getBalance = async ({add, testNet}) => {
  console.log('[erc20 getbalance]')
  let web3 = getWeb3(testNet)
  console.log('[erc20 getbalance][testNet]',testNet)
  let result = []

  for (let i = 0; i < config.coins.ERC20.length; i++) {
    let coin = config.coins.ERC20[i]

    let {name, abi, address} = coin

    let contract = new web3.eth.Contract(abi, address)

    let decimal = await getDecimal({name, testNet})

    let func = contract.methods.balanceOf(add)
    let b = await func.call()

    let value = new BigNumber(b).dividedBy(new BigNumber(Math.pow(10, decimal))).toString()
    result.push({name, value})
  }

  console.log('[erc20 getbalance]',result)

  return result
}

const getDecimal = async ({name, testNet}) => {
  let web3 = getWeb3(testNet)

  let r = _.find(config.coins.ERC20, {name})
  let contract = new web3.eth.Contract(r.abi, r.address)

  if (!contract.methods.decimals || !_.isFunction(contract.methods.decimals)) {
    return r.decimals
  }

  let func = contract.methods.decimals()
  let b = await func.call()

  return b
}

const getTxs = async ({address, name, testNet}) => {
  let web3 = getWeb3(testNet)

  for (let i = 0; i < config.coins.ERC20.length; i++) {
    let r = config.coins.ERC20[i]

    let contract = new web3.eth.Contract(r.abi, r.address)
    // let options = { filter: {from: '0xE65619146eDBA349C7c4d94cA933E754a9288d5d'}, fromBlock: 5000000, toBlock: 'latest' }
    let options = { filter: {to: address}, fromBlock: 5000000, toBlock: 'latest' }
    let pastEvts = await contract.getPastEvents('Transfer', options)

    for (let j = 0, len = pastEvts.length; j < len; j++) {
      const evt = pastEvts[j]
      const from = evt.returnValues.from
      const to = evt.returnValues.to
      const value = evt.returnValues.value
      console.log(`BLOCK=${evt.blockNumber},from=${from},to=${to},value=${value}`)
      // console.log(`BLOCK=${evt.blockNumber},from=${from},to=${to},value=${value},event=${JSON.stringify(evt)}`)
    }
  }
}

module.exports = {
  getBalance,
  getDecimal,
  getTxs
}

// getTxs({add: '0xE65619146eDBA349C7c4d94cA933E754a9288d5d', testNet: true})
// getBalance({add: '0xFd6c17fC630Da3966B0aF04aa0d8E5cc25eD7668', testNet: true})
// getDecimal({name: 'OMG', testNet: true})
