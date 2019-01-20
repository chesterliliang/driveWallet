import io from 'socket.io-client';

import { getPubkForage } from 'shared/utils';
import * as constants from 'shared/constants';

let socket = null;

class WebSocket {
  constructor() {
    this.listeners = {};
  }

  connect = async () => {
    const storage = await getPubkForage();
    const jwt = await storage.getItem('jwt');
    if (!jwt) {
      this.disconnect();
      return;
    }

    if (jwt === this.jwt && this.connected) {
      return;
    }

    socket = io.connect(constants.socketServer, { query: `token=${jwt}` });
    socket
      .on('connect', () => {
        console.log('connect', 'connected');
        this.connected = true;
        this.jwt = jwt;

        // 连接后自动恢复监听器
        Object.keys(this.listeners).forEach((key) => {
          const cb = this.listeners[key];
          this.onReceive(key, cb);
        });
      })
      .on('connect_error', (err) => {
        console.log('connect_error', err);
      })
      .on('connect_timeout', () => {
        console.log('connect_timeout');
      })
      .on('reconnect', (attempt) => {
        console.log('reconnect', `Attempt #${attempt}`);
      })
      .on('reconnecting', (attempt) => {
        console.log('reconnecting', `Attempt #${attempt}`);
      })
      .on('reconnect_attempt', () => {
        console.log('reconnect_attempt');
      })
      .on('reconnect_error', (err) => {
        console.log('reconnect_error', err);
      })
      .on('reconnect_failed', () => {
        console.log('reconnect_failed');
      })
      .on('disconnect', () => {
        console.log('disconnected');
      });
  }

  disconnect = () => {
    if (!socket) {
      return;
    }

    socket.disconnect();
    socket = null;
    this.connected = false;
  }

  onReceive = (key, cb) => {
    if (!this.connected) { // 若未连接，先保存监听器
      this.listeners[key] = cb;
    } else {
      socket.on(key, (data) => {
        if (cb) {
          console.log(`SocketReceive: ${data}`);
          cb(JSON.parse(data));
        }
      });
    }
  }

  sendData = (key, data) => {
    if (!socket) {
      return;
    }

    socket.emit(key, data);
  }
}

const client = new WebSocket();

module.exports = {
  connect: client.connect,
  disconnect: client.disconnect,
  onReceive: client.onReceive,
  sendData: client.sendData,
};
