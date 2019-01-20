import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { List } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Tappable from 'react-tappable';
import Clipboard from 'react-copy-to-clipboard';
import FlatButton from 'material-ui/FlatButton';
import HistoryIcon from 'material-ui/svg-icons/action/assignment';
import classnames from 'classnames';
import Big from 'big.js';
import localForage from 'localForage';

import { CryptoIcons, TokenChip } from 'components';
import constants from 'shared/constants';

import styles from './index.scss';

class Overview extends React.Component {
  componentDidMount() {
    localForage.getItem('settings').then(res => {
      let FiatType = 'USD';
      if (res) {
        const { fiatType } = res;
        FiatType = fiatType;
      }
      this.props.dispatch({
        type: 'wallet/getFiatBalances',
        payload: {
          coins: [
            'BTC',
           /* 'ETH',
            'USDT',
            'XRP',
            'LTC',
            'ETC',
            'NEO',
            'EOS',
            'CYB',*/
          ],
          fiatType: FiatType,
        },
      });
    });
  }

  handleShowQRCode = (value, coinType) => {
    if (value) {
      const modalPlayload = {
        modalType: 'QRCode',
        modalProps: { value, coinType },
      };
      this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
    } else {
      window.showError(localizedStrings.coinAddressError);
    }
  };

  showAddressInfo = (coinType, addressOri) => {
    if (!addressOri) {
      window.showError(localizedStrings.coinAddressError);
      return false;
    }
    const modalPlayload = {
      modalType: 'coinInfo',
      modalProps: { addressOri, coinType },
    };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  };

  handleShowHistory = (address, coinType) => {
    const { shell } = require('electron');
    switch (coinType) {
      /*case 'USDT':
        shell.openExternal(
          `${constants.externalSites.USDT}/address/${address}`,
          null
        );
        break;
      case 'XRP':
        shell.openExternal(
          `${constants.externalSites.XRP}/graph/${address}`,
          null
        );
        break;*/
      case 'BTC':
        shell.openExternal(
          `${constants.externalSites.BTC}/address/${address}`,
          null
        );
        break;
      /* case 'ETH':
        shell.openExternal(
          `${constants.externalSites.ETH}/address/${address}`,
          null
        );
        break;
     case 'ETC':
        shell.openExternal(
          `${constants.externalSites.ETC}/addr/${address}`,
          null
        );
        break;
      case 'LTC':
        shell.openExternal(
          `${constants.externalSites.LTC}/addr/${address}`,
          null
        );
        break;
      case 'NEO':
        shell.openExternal(
          `${constants.externalSites.NEO}/address/${address}`,
          null
        );
        break;
      case 'CYB':
        shell.openExternal(
          `${constants.externalSites.CYB}/account/${address}/overview`,
          null
        );
        break;
      case 'EOS':
        shell.openExternal(
          `${constants.externalSites.EOS}/account/${address}`,
          null
        );
      default:
        break;*/
    }
  };
  handleregister = (coinType, addressOri) => {
    // if (!addressOri) {
    //   window.showError(localizedStrings.coinAddressError);
    //   return;
    // }
    const modalPlayload = { modalType: 'register', modalProps: { coinType } };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  };

  renderQRIcon = (address, coinType) => {
    return (
      <Tappable
        component="div"
        className={styles.qrWrapper}
        stopPropagation
        preventDefault
        onTap={this.handleShowQRCode.bind(this, address, coinType)}
      >
        <IconButton
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          tooltip={localizedStrings.showQRCode}
          tooltipStyles={{ fontSize: 13 }}
        >
          <div className={styles.qrIcon} />
        </IconButton>
      </Tappable>
    );
  };

  renderHistoryIcon = (address, coinType) => {
    return (
      <Tappable
        component="div"
        className={styles.historyWrapper}
        stopPropagation
        preventDefault
        onTap={this.handleShowHistory.bind(this, address, coinType)}
      >
        <IconButton
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          tooltip={localizedStrings.viewHistory}
          tooltipStyles={{ fontSize: 13 }}
        >
          <HistoryIcon
            color="rgba(255, 255, 255, 0.5)"
            hoverColor="rgba(255, 255, 255, 0.8)"
            viewBox="0 0 30 30"
          />
        </IconButton>
      </Tappable>
    );
  };

  renderAddressField = (title, value, coinType, addressOri) => {
    const showAddressEle = (
      <div
        className={styles.showAddressDiv}
        onClick={() => this.showAddressInfo(coinType, addressOri)}
      >
        <img
          className={styles.showAddress}
          alt="show address"
          src={require('assets/showAddress.png')}
        />
      </div>
    );
    
    const usernameCoinEle = this.renderQRIcon(addressOri, coinType);
    const addressValidELe = ['CYB', 'EOS'].includes(coinType)
      ? usernameCoinEle
      : showAddressEle;
    const addressValid = !(addressOri === 'NaN');
    return (
      <div className={styles.fieldDiv}>
        <h4>{title}</h4>
        <div className={styles.textDiv}>
          {['CYB', 'EOS'].includes(coinType) ? (
            <Clipboard
              onCopy={() => {
                if (!addressValid) {
                  return false;
                }
                window.showToast(localizedStrings.copiedToClipboard);
              }}
              text={!addressValid ? ' ' : value}
            >
              <span className={styles.text}>
                {addressValid ? value : localizedStrings.unavailable}
              </span>
            </Clipboard>
          ) : (
            <span
              className={styles.text}
              onClick={() => this.showAddressInfo(coinType, addressOri)}
            >
              {addressValid ? value : localizedStrings.unavailable}
            </span>
          )}
          {addressValid ? addressValidELe : <div />}
          <div>
            <hr />
          </div>
        </div>
      </div>
    );
  };

  renderBalanceField = (title, value, addressOri, coinType) => {
    const { fiatType, fiatBalances } = this.props;
    const addressValid = !(addressOri === 'NaN' || !addressOri);
    const balanceValid = !(value === 'NaN');
    return (
      <div className={styles.fieldDiv}>
        <h4>{title}</h4>
        <div className={styles.textDiv}>
          <h5 className={styles.text}>
            {balanceValid ? value : localizedStrings.unavailable}
          </h5>
          {addressValid ? (
            this.renderHistoryIcon(addressOri, coinType)
          ) : (
            <div />
          )}
          <div>
            <hr />
          </div>
        </div>
        
      </div>
    );
  };
/**
 * 
 <div className={styles.fiatParent}>
          <div className={classnames(styles.priceDiv, styles[coinType])}>
            {balanceValid && fiatBalances && fiatBalances[coinType]
              ? `≈ ${balanceValid &&
                  fiatBalances &&
                  fiatBalances[coinType] &&
                  new Big(fiatBalances[coinType])
                    .times(value)
                    .toFixed(2)} ${fiatType}`
              : localizedStrings.unavailable}
          </div>
        </div>
 */
  renderToken = (
    { type, balance, picture, decimal },
    index,
    fiatType,
    fiat
  ) => {
    return (
      <TokenChip
        key={index}
        icon={picture}
        amount={balance}
        unit={type}
        fiatType={fiatType}
        fiat={fiat}
      />
    );
  };

  renderTokens = tokens => {
    const { fiatType, fiatBalances } = this.props;
    let totalAssets = 0;
    fiatBalances &&
      tokens.forEach(item => {
        if (item.balance && item.balance !== 'NaN' && fiatBalances[item.type]) {
          totalAssets = new Big(fiatBalances[item.type])
            .times(item.balance)
            .plus(totalAssets);
        }
      });
    totalAssets = totalAssets.toFixed(2);
    return (
      <div className={styles.fieldDiv}>
        <h4 style={{ top: 25 }}>{'ERC20'}</h4>
        <div className={styles.tokens}>
          {tokens.map((item, index) => {
            if (item.balance && fiatBalances && fiatBalances[item.type]) {
              return this.renderToken(
                item,
                index,
                fiatType,
                new Big(fiatBalances[item.type]).times(item.balance).toFixed(2)
              );
            }
            return this.renderToken(item, index, fiatType, false);
          })}
        </div>
        <div className={styles.textDiv} style={{ height: 0 }}>
          <div>
            <hr />
          </div>
        </div>
        <div className={classnames(styles.fiatParent, styles.fiatParentERC20)}>
          <div className={classnames(styles.priceDiv, styles.ERC20)}>
            {`≈ ${totalAssets} ${fiatType}`}
          </div>
        </div>
      </div>
    );
  };
  renderneoTokens = tokens => {
    const { fiatType, fiatBalances } = this.props;
    let totalAssets = 0;
    fiatBalances &&
      tokens.forEach(item => {
        if (item.balance && item.balance !== 'NaN' && fiatBalances[item.type]) {
          totalAssets = new Big(fiatBalances[item.type])
            .times(item.balance)
            .plus(totalAssets);
        }
      });
    totalAssets = totalAssets.toFixed(2);
    return (
      <div className={styles.fieldDiv}>
        <h4 style={{ top: 25 }}>{'NEOs'}</h4>
        <div className={styles.tokens}>{tokens.map(this.renderToken)}</div>
        <div className={styles.textDiv} style={{ height: 0 }}>
          <div>
            <hr />
          </div>
        </div>
        <div className={classnames(styles.priceDiv, styles.NEOTokens)}>
          {`≈ ${totalAssets} ${fiatType}`}
        </div>
      </div>
    );
  };

  renderUnregistered = (index, coinType, { address, unregistered }) => {
    /*return (
      <div key={index} className={styles.item}>
        <Avatar
          className={styles.icon}
          size={32}
          src={CryptoIcons[coinType.toLowerCase()]}
        />

        <h4 className={styles.name}>{coinType}</h4>
        <div className={styles.fieldDiv}>
          <div className={styles.textDiv}>
            <FlatButton
              className={styles.button}
              label={localizedStrings.register}
              onClick={this.handleregister.bind(this, coinType)}
            />
            <div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );*/
  };
  renderUnregistereds = (sortedCoinTypes, unregistereds, addresses) => {
    /*return sortedCoinTypes.map((type, index) => {
      const address = addresses[type];
      return this.renderUnregistered(index, type, {
        address,
        unregistered: unregistereds[type],
      });
    });*/
  };

  renderCurrency = (
    index,
    coinType,
    { address, balance, erc20tokens, neotokens, addressOri }
  ) => {
    let balanceStr = balance
      ? balance.toString()
      : balance === 0
        ? balance.toString()
        : 'NaN';
    // 判断一下有没有减号
    if (balanceStr.indexOf('-') >= 0) {
      balanceStr = '0' + String(Number(balanceStr) + 1).substr(1);
    }
    // if (!balance && balance !== 0) {
    //   balanceStr = localizedStrings.XRPNotActive;
    // }
    const ethBalanceValid = balanceStr !== 'NaN';
    //const parts = balanceStr.split('.');
    // if (!(parts.length > 1 && parts[1].length > 4)) {
    //   balanceStr = Number(balanceStr).toFixed(5);
    // }

    return (
      <div key={index} className={styles.item}>
        <Avatar
          className={styles.icon}
          size={32}
          src={CryptoIcons[coinType.toLowerCase()]}
        />

        <h4 className={styles.name}>{coinType}</h4>

        {this.renderAddressField(
          localizedStrings.address,
          address,
          coinType,
          addressOri
        )}
        {this.renderBalanceField(
          localizedStrings.balance,
          balanceStr,
          addressOri,
          coinType
        )}
      </div>
    );
  };

  renderCurrencies = (
    sortedCoinTypes,
    balances,
    addresses
  ) => {
    const { eosAddress } = this.props;
    return sortedCoinTypes.map((type, index) => {
      let addressOri = addresses[type];
      if (type === 'USDT') {
        addressOri = addresses['BTC'];
      }
     if (type === 'EOS' && (!addressOri || addressOri === 'NaN')) {
        addressOri = eosAddress;
      }
      let address = addressOri;
      if (
        !['EOS', 'CYB'].includes(type) &&
        addressOri &&
        addressOri !== 'NaN'
      ) {
        if (address.startsWith('0x')) {
          address = addressOri.replace(/^(.{6})(.*)(.{4})$/, (a, b, c, d) => {
            return `${b}${c.replace(/./g, '*')}${d}`;
          });
        } else {
          address = addressOri.replace(/^(.{4})(.*)(.{4})$/, (a, b, c, d) => {
            return `${b}${c.replace(/./g, '*')}${d}`;
          });
        }
      }
     
      
      return this.renderCurrency(index, type, {
        address,
        balance: balances[type],
        addressOri,
      });
    });
  };

  render() {
    const {
      balances,
      addresses,
      unregistereds,
      COSVersion,
      fiatType,
      fiatBalances,
    } = this.props;
    const coinTypes = Object.keys(balances);
    const unregCoinTypes = Object.keys(unregistereds).filter(
      type => unregistereds[type]
    );
    console.log('overview render!');
   
    const newSupportCoins = ['BTC'/*, 'ETH', 'USDT', 'XRP', 'LTC', 'ETC', 'NEO'*/];
    const sortedCoinTypes = newSupportCoins.filter(item => {
      if (item === 'USDT') return COSVersion['3'] >= 25;
      if (item === 'XRP') return COSVersion['3'] >= 26;
      if (newSupportCoins.includes(item)) {
        return addresses[item] || addresses[item] === 'NaN';
      } else {
        return true;
      }
    });
  /*  if (unregCoinTypes.indexOf('CYB') < 0) {
      const ltcIndex = sortedCoinTypes.findIndex(item => item === 'LTC');
     // sortedCoinTypes.splice(ltcIndex + 1, 0, 'CYB');
    }
    if (unregCoinTypes.indexOf('EOS') < 0) {
      //sortedCoinTypes.splice(2, 0, 'EOS');
    }*/
    sortedCoinTypes.concat(
      coinTypes.filter(type => {
        return (
          type !== 'BTC' 
        );
      })
    );
    let totalAssets = 0;
    coinTypes.forEach(item => {
      if (
        balances[item] &&
        balances[item] !== 'NaN' &&
        fiatBalances &&
        fiatBalances[item]
      ) {
        if (sortedCoinTypes.includes(item)) {
          totalAssets = new Big(fiatBalances[item])
            .times(balances[item])
            .plus(totalAssets);
        } else {
          if (balances[item]['balance']) {
            totalAssets = new Big(fiatBalances[item])
              .times(balances[item]['balance'])
              .plus(totalAssets);
          }
        }
      }
    });
    totalAssets = totalAssets.toFixed(2);
    console.log('overview render will return!');
    return (
      <div className={styles.container}>
        <div className={styles.list} style={{ paddingBottom: 3 }}>
          <List className="scrollable" style={{ padding: 0 }}>
            {this.renderCurrencies(
              sortedCoinTypes,
              balances,
              addresses
            )}
            <div style={{ width: '100%', height: 62 }} />
            
          </List>
        </div>
      </div>
    );
  }
}
/*
<div className={styles.totalPrice}>
              <span>{localizedStrings.totalAssets}</span>
              <span>
                ≈ {totalAssets} {fiatType}
              </span>
            </div>
            <div className={styles.verticalLine} />
*/
Overview.propTypes = {
  addresses: PropTypes.object,
  balances: PropTypes.object,
  unregistereds: PropTypes.object,
};

function mapStateToProps({
  device: { addresses, eosAddress, COSVersion },
  wallet: { balances, unregistereds, fiatBalances },
  app: {
    settings: { fiatType },
  },
}) {
  return {
    addresses,
    eosAddress,
    balances: { BTC: '', ETH: '', ...balances },
    unregistereds,
    COSVersion,
    fiatType,
    fiatBalances,
  };
}

export default connect(mapStateToProps)(Overview);
