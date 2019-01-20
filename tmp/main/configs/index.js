import Config from 'electron-config';

import './default.json';
import './production.json';
import './production.env';

//removeIf(!mac)
import '../lib/libEWallet.dylib';
//endRemoveIf(!mac)

export default new Config({ name: 'config' });
