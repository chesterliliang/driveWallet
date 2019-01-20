const axios = require('axios');
const config = require('config');

const getMajorCoinsFiatBalances = async (coins, fiatType) => {
  try {
    const retRes = {};
    const { result } = await axios
      .post('https://solopkgsignature.nbltrust.com/api/getCoinFiat', {
        coins,
        fiat: fiatType,
      })
      .then(res => res.data);
    console.log('result', result);
    if (result.length === 0) return { result: 2 };
    result.forEach(item => {
      retRes[item.symbol] = item.price;
    });
    console.log('retRes', retRes);
    return retRes;
  } catch (e) {
    console.log('getMajorCoinsFiatBalances fail: ', e);
    return { result: 2 };
  }
};

module.exports = {
  getMajorCoinsFiatBalances,
};
