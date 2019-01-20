import validator from 'wallet-address-validator';
import { ChainValidation as cybexValidation } from 'cybexjs';

const validateRecipient = (recipient, ethDerivePath) => {
  //console.log('ethDerivePath', ethDerivePath);
  const types = ['BTC'/*, 'LTC', 'NEO', 'GAS', 'ETH', 'ETC', 'XRP'*/];
  // const notSelfTypes = ['EOS', 'XRP'];
  if (!recipient || !recipient.trim()) {
    return [];
  }

  const recipientTypes = types.filter(type =>
    validator.validate(recipient, type, 'both')
  );
 /* if (recipientTypes.includes('BTC')) {
    recipientTypes.push('USDT');
  }
  if (!cybexValidation.is_account_name_error(recipient)) {
    recipientTypes.push('CYB');
  }

  if (/^[a-z1-5.]{1,12}$/.test(recipient)) {
    recipientTypes.push('EOS');
  }

  if (
    ethDerivePath &&
    ethDerivePath === 'fiveLevel' &&
    recipientTypes.includes('ETC')
  ) {
    const index = recipientTypes.indexOf('ETC');
    recipientTypes.splice(index, 1);
  }*/

  return recipientTypes;
};

export default validateRecipient;
