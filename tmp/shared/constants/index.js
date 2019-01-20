import * as production from './production';
import strings from './localization';

strings.setLanguage('en');

const constants = {
  production,
}[process.env.NODE_ENV || 'testing'];

const feeTypes = {
  normal: 0,
  multiply: 1,
  fixed: 2,
};

const transferOptions = {
  BTC: {
    feeType: feeTypes.normal,
    feeEditable: true,
    advanced: true,
    precision: 8,
  },
  ETH: {
    feeType: feeTypes.multiply,
    feeFactors: ['Gas', 'Gas Price'],
    feeEditable: false,
    advanced: true,
    nonce: true,
    precision: 18,
  },
  ETC: {
    feeType: feeTypes.multiply,
    feeFactors: ['Gas', 'Gas Price'],
    feeEditable: false,
    advanced: true,
    nonce: true,
    precision: 18,
  },
  LTC: {
    feeType: feeTypes.normal,
    feeEditable: true,
    advanced: true,
    precision: 8,
  },
  NEO: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0,
    advanced: false,
    precision: 0,
  },
  CYB: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0.01,
    advanced: false,
    precision: 5,
  },
  GAS: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0,
    advanced: false,
    precision: 8,
  },
  ERC20: {
    feeType: feeTypes.multiply,
    feeFactors: ['Gas', 'Gas Price'],
    feeEditable: false,
    advanced: true,
    nonce: true,
    precision: 18,
  },
};

export default { ...constants, strings, feeTypes, transferOptions };
