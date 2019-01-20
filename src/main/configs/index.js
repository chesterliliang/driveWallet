import Config from 'electron-config';

//removeIf(production)
import './development.json';
import './staging.json';
import './testing.json';
//endRemoveIf(production)

import './default.json';
import './production.json';
import './production.env';

//removeIf(!win)
import '../lib/EWallet.dll';
import '../lib/libusb-1.0.dll';
//endRemoveIf(!win)

//removeIf(!mac)
import '../lib/libEWallet.dylib';
//endRemoveIf(!mac)

export default new Config({ name: 'config' });
