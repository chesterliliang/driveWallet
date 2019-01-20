import child_process from 'child_process';
import path from 'path';

const startSpeed = (nodes, orisObj) => {
  const nodeConfig = require('config');
  if (!nodes && !orisObj) {
    nodes = nodeConfig.speedNodes;
    orisObj = nodeConfig.node;
  }
  const childP = child_process.fork(
    path.join(process.env.NODE_CONFIG_DIR, './nodeSpeedWorker.js')
  );
  childP.send({ nodes, orisObj });

  childP.on('close', code => {
    console.log('子进程关闭', code);
  });

  childP.on('message', ({ result }) => {
    console.log('进程收到 ', result);
    Object.assign(nodeConfig, { excellentNode: result });
    Object.assign(nodeConfig.node, result);
  });
};

export default startSpeed;
