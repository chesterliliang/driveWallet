const Promise = require('bluebird');
const request = require('request');
const ping = require('ping');

const requestPromise = Promise.promisify(request);

const pingAdd = async (url, coin, index) => {
  try {
    const startDate = new Date();
    let retUrl = url;
    if (/^wss:/.test(retUrl)) {
      if (/^wss:.*(\d)$/.test(retUrl)) {
        retUrl = retUrl.match(/^wss:\/\/(.*):\d/)[1];
        const { time } = await ping.promise.probe(retUrl);
        return { pingStatus: 1, speed: time, coin, index };
      }
      retUrl = retUrl.replace(/^wss:\/\//, '');
      const { time } = await ping.promise.probe(retUrl);
      return { pingStatus: 1, speed: time, coin, index };
    } else {
      const response = await requestPromise(retUrl, {
        timeout: 3000,
      }).then(res => {
        return res.toJSON();
      });
      console.log(
        'ping response',
        response.statusCode,
        `${new Date() - startDate}ms`,
        url
      );
      return { pingStatus: 1, speed: new Date() - startDate, coin, index };
    }
  } catch (e) {
    console.log('ping error', e, url);
    return { pingStatus: 0, coin, index };
  }
};

const speed = async (nodesObj, orisObj) => {
  const coins = Object.keys(nodesObj);
  console.log(`工作进程 ${process.pid} 已启动`);
  try {
    const promiseList = [];
    const resultConfig = {};
    Object.entries(nodesObj).forEach(([coin, { TestNet, MainNet }]) => {
      MainNet.forEach((item, index) => {
        promiseList.push(pingAdd(item, coin, index));
      });
    });
    const res = await Promise.all(promiseList);
    console.log('response', res);
    coins.forEach(item => {
      const coinSpeedArr = res.filter(v => v.coin === item && v.pingStatus);
      if (coinSpeedArr.length === 0) {
        resultConfig[item] = orisObj[item];
        return;
      }
      const sortSpeedArr = coinSpeedArr.sort((v1, v2) => {
        return v1.speed - v2.speed;
      });
      const fastAddr = sortSpeedArr[0];
      resultConfig[item] = {
        TestNet: nodesObj[item].TestNet,
        MainNet: nodesObj[item].MainNet[fastAddr.index],
      };
      const workNodes = [];
      sortSpeedArr.forEach((v, index) => {
        if (index !== 0 && v.pingStatus) {
          workNodes.push(nodesObj[item].MainNet[index]);
        }
      });
      resultConfig[item]['WorkNodes'] = workNodes;
    });
    console.log('resultConfig', resultConfig);
    setTimeout(() => process.exit(1), 5000);
    return resultConfig;
  } catch (e) {
    console.log('error: ', e);
  }
};

process.on('message', async ({ nodes: msg, orisObj }) => {
  console.log('message', msg);
  const result = await speed(msg, orisObj);
  process.send({ result });
});

module.exports = {
  speed,
};
