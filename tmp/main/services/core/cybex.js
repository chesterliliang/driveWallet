const axios = require('axios')
const config = require('config')
const BigNumber = require('bignumber.js')
const { Apis } = require('cybexjs-ws')
const { TransactionBuilder } = require('cybexjs')
const { CYBTXSign } = require('./driver/CYB_TXSign')

const get = async (url, testNet) => {
    const _B = testNet ? config.node.CYB.TestNet : config.node.CYB.MainNet
    console.log('[cybex][get]', _B, '  testnet=', testNet)
    return (await axios.get(_B + url)).data
  }

const post = async (url, data, testNet) => {
    const _B = testNet ? config.node.CYB.TestNet : config.node.CYB.MainNet
    console.log('[cybex][post]', _B, '  testnet=', testNet)
    return (await axios.post(_B + url, data)).data
}

const initcybex = async()=>{
    try {
        console.log('[cybex][initcybex]Apis = ',Apis)
        await Apis.instance('wss://shanghai.51nebula.com/', true).init_promise
        await Apis.setAutoReconnect(true)
    }
    catch(err)
    {
        console.log('err in initcybex = ', err)
    }
}

const getBalance = async ({ address, testNet }) => {
    var id= {}
    // try {
    //     console.log('[cybex][getBalance]Apis = ',Apis)
    //     console.log('cybex.getbalance, address = ',address)
    //     await Apis.instance('wss://shanghai.51nebula.com/', true).init_promise
    //     await Apis.setAutoReconnect(true)
    // }
    // catch(err)
    // {
    //     console.log('err1 = ', err)
    // }
    try{
        // await Apis.instance().connect('wss://shanghai.51nebula.com/',30000)
        id = await Apis.instance().db_api().exec('get_key_references', [[address]])
        console.log('[getbalance][id]id = ',id)
        if(!id[0][0])
        return  {address, balance: 'NaN',unregistered: true}
    }
    catch(err)
    {
        let result = await Apis.instance().db_api().exec('get_account_by_name', [address])
        id = [[result.id,result.id]]
        console.log('[cybex][getBalance]get_key_references =',err)
        // return  {address, balance: 'NaN',unregistered: true}
    }
    try{
        console.log('[cybex][getBalance]id =',id)
        let account = await Apis.instance().db_api().exec('get_accounts', id)
        console.log('[getbalance][accounts]accounts = ', account[0].name)
        let assets = [ '1.3.0' ] // CYB系统币的id
        let balances = await Apis.instance().db_api().exec('get_account_balances', [id[0][0], assets])
        const a = new BigNumber(balances[0].amount)
        const b = new BigNumber(config.coins.CYB.Rate)
        console.log('[getbalance][balances]balance = ', a.dividedBy(b).toNumber())
        return { address,balance: a.dividedBy(b).toNumber(),name: account[0].name}
    }
    catch(err)
    {
        console.log('[cybex][getBalance]err2 =',err)
        return  {address, balance: 'NaN', name: 'NaN'}
    }
}
const getCaptcha = async() => {
    try {
        var captcha = await get('captcha',false)
        console.log('[cybex][getcaptcha]captcha = ', captcha)
        return { result: 0, captcha }
    }
    catch (err) {
        console.log("Captcha: ", err);
        return { result: -1 }
    }
}

const cybRegister = async(coinType, accountName, captchaid, captcha, address) => {
    try{
        const request = 	{
            cap: {
                    "id":captchaid, // 验证码ID
                    captcha,	// 验证码
                    "fp":address.slice(-32) // 设备指纹
            },
            account: {
                "name":accountName, // 注册用户名
                "owner_key":address, // 账户权限公钥
                "active_key":address, // 资金权限公钥 
                "memo_key":address, // Memo公钥
                "refcode":null, 
                "referrer":null 
            }
        }
        console.log('[cybRegister][request] = ',request)
        const res = await post(`register`, request, false)

        console.log('[cybRegister][res] = ',res)
        return{ result:0 ,res }
    }
    catch(err){
        console.log('[cybRegister] err = ', err.response.data)
        return {result:1, err:err.response.data}
    }
}
const getFee = async(data) => {
    try{
        let result = await Apis.instance().db_api().exec("get_objects", [["2.0.0"]])
        console.log('[getFee]result = ',result)
        let resultfee = result[0].parameters.current_fees.parameters[0][1].fee
        const b = new BigNumber(config.coins.CYB.Rate)
        const fee = new BigNumber(resultfee).dividedBy(b).toNumber()
        console.log('[cybex][getEstimatedFee]result = ',fee)   

        result = await Apis.instance().db_api().exec('get_account_by_name', [data.address])
        let id = [[result.id,result.id]]
        console.log('[cybex][getBalance]id =',id)
        let assets = [ '1.3.0' ] // CYB系统币的id
        let balances = await Apis.instance().db_api().exec('get_account_balances', [id[0][0], assets])
        let balance = new BigNumber(balances[0].amount).dividedBy(b).toNumber()
        let need = (fee+Number(data.value)).toFixed(5)
        return{result:0, fee, balanceNotEnough:need>balance}
    }
    catch(err){
        console.log('[cybex][getFee]err = ',err)
        return{result:0, fee: 0,balanceNotEnough:false}
    }
}
function buildTransferObject ({fromId, toId, amount, memo,name}) {
    return {
      from: fromId,
      to: toId,
      fee: { amount: 0, asset_id: '1.3.0' },
      amount: { amount, asset_id: '1.3.0' },
      memo,
      extensions:
      [
          [4,
          {name,asset_sym:"CYB",fee_asset_sym:"CYB",hw_cookie1:5,hw_cookie2:5}
          ]
      ]
    }
  }

const signTx = async({ from, to, value, fee, selector, memo, testNet }) =>{
    var fromId = {}
    var toId = {}
    var amount = new BigNumber(value).times(config.coins.CYB.Rate)
    console.log('[cybex][signTx]',from, to, amount.toNumber())
    try{
        
        fromId = await Apis.instance().db_api().exec('get_account_by_name', [from])
        // console.log('[cybex][signTx]fromId = ',fromId)
        toId = await Apis.instance().db_api().exec('get_account_by_name', [to])
        // console.log('[cybex][signTx]fromId = ',toId)
        console.log(`fromId = ${fromId.id},toId = ${toId.id}`)
    }
    catch(err)
    {
        console.log('[cybex][getBalance]err2 =',err)
        return  {result:-1}
    }

    var txObj = {}
    var tr = new TransactionBuilder()
    var signature = {}
    try{
    txObj = buildTransferObject({fromId:fromId.id, toId:toId.id, amount:amount.toNumber(),name:to})
    console.log('[cybex][signTx]txObj = ', txObj)
    let transferOp = tr.get_type_operation('transfer', txObj)
    tr.add_operation(transferOp)
    await tr.set_required_fees()
    await tr.finalize()
    signature = await CYBTXSign(tr.tr_buffer)
    if (signature.result) {
        return {result:signature.result}
    }
    console.log('[cybex][signTx]signature = ', signature)
    tr.signed = true
    tr.signatures.push(signature.signature1);
    console.log('[cybex][signTx]tr1',tr)
    let txResult = await tr.broadcast()
    console.log('[cybex][signTx]txResult1 = ',txResult)
    return {result:0,txid:txResult[0].id,accountname:from}
    }
    // catch(err)
    // {
    //     console.log('[cybex][signTx]err2 = ',err)
    // }
    // try{
    //     console.log('[cybex][signTx]try again')
    //     tr.signatures = [signature.signature2] ;
    //     console.log('[cybex][signTx]tr2',tr)
    //     let txResult = await tr.broadcast()
    //     console.log('[cybex][signTx]txResult2 = ',txResult)
    //     return {result:0,txid:txResult[0].id}
    // }
    catch(err){
        console.log('[cybex][signTx]err3 = ',err)
        return {result: -1}
    }
}

initcybex()

module.exports = {
    getBalance,
    getCaptcha,
    cybRegister,
    signTx,
    getFee,
}


