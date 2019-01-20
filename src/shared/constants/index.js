// removeIf(production)
import * as development from './development';
import * as staging from './staging';
import * as testing from './testing';
// endRemoveIf(production)
import * as production from './production';
import strings from './localization';

strings.setLanguage('en');

const constants = {
  // removeIf(production)
  development,
  staging,
  testing,
  // endRemoveIf(production)
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
    memo: false,
    tag: false,
  },
  USDT: {
    feeType: feeTypes.normal,
    feeEditable: true,
    advanced: true,
    precision: 8,
    memo: false,
    tag: false,
  },
  XRP: {
    feeType: feeTypes.normal,
    feeEditable: false,
    fee: 0.00001,
    advanced: false,
    precision: 6,
    memo: false,
    tag: true,
  },
  ETH: {
    feeType: feeTypes.multiply,
    feeFactors: ['Gas', 'Gas Price'],
    feeEditable: false,
    advanced: true,
    nonce: true,
    precision: 18,
    memo: false,
    tag: false,
  },
  ETC: {
    feeType: feeTypes.multiply,
    feeFactors: ['Gas', 'Gas Price'],
    feeEditable: false,
    advanced: true,
    nonce: true,
    precision: 18,
    memo: false,
    tag: false,
  },
  LTC: {
    feeType: feeTypes.normal,
    feeEditable: true,
    advanced: true,
    precision: 8,
    memo: false,
    tag: false,
  },
  NEO: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0,
    advanced: false,
    precision: 0,
    memo: false,
    tag: false,
  },
  CYB: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0.01,
    advanced: false,
    precision: 5,
    memo: false,
    tag: false,
  },
  GAS: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0,
    advanced: false,
    precision: 8,
    memo: false,
    tag: false,
  },
  ERC20: {
    feeType: feeTypes.multiply,
    feeFactors: ['Gas', 'Gas Price'],
    feeEditable: false,
    advanced: true,
    nonce: true,
    precision: 18,
    memo: false,
    tag: false,
  },
  EOS: {
    feeType: feeTypes.fixed,
    feeEditable: false,
    fee: 0,
    advanced: false,
    precision: 4,
    memo: true,
    tag: false,
  },
};

export default { ...constants, strings, feeTypes, transferOptions };
