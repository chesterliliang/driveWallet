import superagent from 'superagent';

import { getPubkForage } from 'shared/utils';
import constants from 'shared/constants';

class HttpClient {
  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].forEach(method => {
      this[method] = (path, options = { params: {} }) => {
        return new Promise(async (resolve, reject) => {
          const adjustedPath = path[0] !== '/' ? `/${path}` : path;
          const url = `${constants.apiServer}${adjustedPath}`;
          const request = superagent[method](url);

          if (options && options.params) {
            request.query(options.params);
          }

          let headers = options && options.headers;

          // const { auth: { token: jwt } } = app._store.getState();
          const storage = await getPubkForage();
          const jwt = await storage.getItem('jwt');
          if (jwt) {
            headers = { Authorization: `Bearer ${jwt}`, ...headers };
          }

          if (headers) {
            request.set(headers);
          }

          if (options && options.data) {
            request.send(options.data);
          }

          request.end((err, res) => {
            const error = (res && res.body && res.body.error) || err;

            if (error) {
              reject(error);
              console.log(`Error: ${JSON.stringify(error)}`);
            } else {
              resolve(res.body);
              console.log(`Response: ${JSON.stringify(res.body)}`);
            }

            if (this.dataCallback) {
              this.dataCallback(error, {
                key: `${method} ${adjustedPath}`,
                options,
                data: res.body,
              });
            }
          });
        });
      };
    });
  }

  onReceive = cb => {
    this.dataCallback = cb;
  };
}

const client = new HttpClient();

module.exports = {
  get: client.get,
  post: client.post,
  put: client.put,
  patch: client.patch,
  delete: client.del,
  onReceive: client.onReceive,
};
