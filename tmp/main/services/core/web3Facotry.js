const Web3 = require('web3')
const config = require('config')

const web3Test_eth = new Web3()
web3Test_eth.setProvider(new web3Test_eth.providers.HttpProvider(config.node.ETH.TestNet))

const web3Main_eth = new Web3()
web3Main_eth.setProvider(new web3Main_eth.providers.HttpProvider(config.node.ETH.MainNet))

const web3Test_etc = new Web3()
web3Test_etc.setProvider(new web3Test_etc.providers.HttpProvider(config.node.ETC.TestNet))

const web3Main_etc = new Web3()
web3Main_etc.setProvider(new web3Main_etc.providers.HttpProvider(config.node.ETC.MainNet))

const getWeb3 = (testNet,etc) => {
  if(etc){
    console.log('=======[getWeb3]=',testNet ? config.node.ETC.TestNet : config.node.ETC.MainNet)
    return testNet ? web3Test_etc : web3Main_etc
  }
  else{
    console.log('=======[getWeb3]=',testNet ? config.node.ETH.TestNet : config.node.ETH.MainNet)
    return testNet ? web3Test_eth : web3Main_eth
  }
}

module.exports = {
  getWeb3
}
