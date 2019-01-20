var ref = require('ref')
var {TYPE, CallbackParam, Api, callback} = require('./common')

let { voidPP, strArray, ucharArray } = TYPE
/*
Instruction:
  根据助记词恢复Seed
  [IN] 字符串数组，助记词列表
  [RETURN] { result, PrvSeed }
      result: 数字，0为成功，非0值为失败
      PrvSeed: 字符串，恢复的seed
Example:
  var word = 'merge today youth raccoon clock rocket pipe clump narrow come brief move card mom useless lesson abandon airport'
  RecoverMNE(word)
*/
const RecoverMNE = async (word) => {
  console.log('[Nebula Driver][PAEW_RecoverMNE]: Start')
  var ppPAEWContext = ref.alloc(voidPP)
  var devCounter = ref.alloc('int')
  var param = new CallbackParam()

  var mneWord = ucharArray(word.split(''))
  var mneWordLen = mneWord.length

  var nPrvSeedLen = ref.alloc('uint64', 64)
  var pPrvSeed = ucharArray(nPrvSeedLen.deref())
  var result = await Api.PAEW_RecoverSeedFromMne(mneWord, mneWordLen, pPrvSeed, nPrvSeedLen)
  console.log(`[Nebula Driver][RecoverMNE][RecoverMNE]result=${result}`)
  if (result !== 0) {
    return {result}
  }
  console.log('pPrvSeed = ',pPrvSeed)
  console.log('pPrvSeed.length = ',pPrvSeed.length)
  console.log('[Nebula Driver][PAEW_RecoverMNE]: End')
  result = 0
  return { result, pPrvSeed }
}

module.exports = {
  RecoverMNE
}
