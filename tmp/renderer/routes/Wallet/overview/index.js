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

import { CryptoIcons, TokenChip } from 'components';
import * as constants from 'shared/constants';

import styles from './index.scss';

class Overview extends React.Component {
  handleShowQRCode = (value) => {
    const modalPlayload = { modalType: 'QRCode', modalProps: { value } };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  }
  handleShowHistory = (address, coinType) => {
    const { shell } = require('electron');
    switch (coinType) {
      case 'BTC':
        shell.openExternal(`${constants.externalSites.BTC}/address/${address}`, null);
        break;
      case 'ETH':
        shell.openExternal(`${constants.externalSites.ETH}/address/${address}`, null);
        break;
      case 'ETC':
        shell.openExternal(`${constants.externalSites.ETC}/addr/${address}`, null);
        break;
      case 'LTC':
        shell.openExternal(`${constants.externalSites.LTC}/addr/${address}`, null);
        break;
      case 'NEO':
        shell.openExternal(`${constants.externalSites.NEO}/address/${address}`, null);
        break;
      case 'CYB':
        shell.openExternal(`${constants.externalSites.CYB}/account/${address}/overview`, null);
        break;
      
    
      default:
        break;
    }
  }
  handleregister = (coinType) => {
    console.log('handleregister coinType,', coinType)
    const modalPlayload = { modalType: 'register', modalProps: { coinType } };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
    console.log('handleregister')
  }

  renderQRIcon = (address) => {
    return (
      <Tappable
        component="div"
        className={styles.qrWrapper}
        stopPropagation
        preventDefault
        onTap={this.handleShowQRCode.bind(this, address)}
      >
        <IconButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} tooltip={localizedStrings.showQRCode} tooltipStyles={{fontSize:13}}>
          <div className={styles.qrIcon} />
        </IconButton>
      </Tappable>
    );
  }

  renderHistoryIcon = (address, coinType) => {
    return (
      <Tappable
        component="div"
        className={styles.historyWrapper}
        stopPropagation
        preventDefault
        onTap={this.handleShowHistory.bind(this, address, coinType)}
      >
        <IconButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} tooltip={localizedStrings.viewHistory} tooltipStyles={{fontSize:13}} >
          <HistoryIcon color="rgba(255, 255, 255, 0.5)" hoverColor="rgba(255, 255, 255, 0.8)" viewBox="0 0 30 30" />
        </IconButton>
      </Tappable>
    );
  }

  renderAddressField = (title, value) => {
    const addressValid = !(value === 'NaN');
    return (
      <div className={styles.fieldDiv}>
        <h4>{title}</h4>
        <div className={styles.textDiv}>
          {addressValid ? <Clipboard
            onCopy={() => window.showToast(localizedStrings.copiedToClipboard)}
            text={value}
          >
            <span className={styles.text}>{ addressValid ? value : localizedStrings.unavailable}</span>
          </Clipboard> : <span className={styles.text}>{ addressValid ? value : localizedStrings.unavailable}</span>}
          { addressValid ? this.renderQRIcon(value) : <div />}
          <div>
            <hr />
          </div>
        </div>
      </div>
    );
  }

  renderBalanceField = (title, value, address, coinType) => {
    const addressValid = !(address === 'NaN');
    const balanceValid = !(value === 'NaN');
    return (
      <div className={styles.fieldDiv}>
        <h4>{title}</h4>
        <div className={styles.textDiv} >
          <h5 className={styles.text}>{balanceValid ? value : localizedStrings.unavailable}</h5>
          { addressValid ? this.renderHistoryIcon(address, coinType) : <div /> }
          <div>
            <hr />
          </div>
        </div>
      </div>
    );
  }

  renderToken = ({ type, balance }, index) => {
    return (
      <TokenChip key={index} icon={CryptoIcons[type.toLowerCase()]} amount={balance} unit={type} />
    );
  }

  renderTokens = (tokens) => {
    return (
      <div className={styles.fieldDiv}>
        <h4 style={{ top: 25 }}>{'ERC20'}</h4>
        <div className={styles.tokens}>
          { tokens.map(this.renderToken) }
        </div>
        <div className={styles.textDiv} style={{ height: 0 }}>
          <div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
  renderneoTokens = (tokens) => {
    return (
      <div className={styles.fieldDiv}>
        <h4 style={{ top: 25 }}>{'NEOs'}</h4>
        <div className={styles.tokens}>
          { tokens.map(this.renderToken) }
        </div>
        <div className={styles.textDiv} style={{ height: 0 }}>
          <div>
            <hr />
          </div>
        </div>
      </div>
    );
  }

  renderUnregistered = (index, coinType, { address, unregistered }) => {
    return (
      <div key={index} className={styles.item}>
        <Avatar
          className={styles.icon}
          size={32}
          src={CryptoIcons[coinType.toLowerCase()]}
        />

        <h4 className={styles.name}>{coinType}</h4>
        <div className={styles.fieldDiv}>
          <div className={styles.textDiv} >
          <FlatButton
          className={styles.button}
          label={localizedStrings.register}
          onTouchTap={this.handleregister.bind(this, coinType)}
        />
            <div>
              <hr />
            </div>
          </div>
        </div>

      </div>
    );
  }
  renderUnregistereds = (sortedCoinTypes, unregistereds, addresses) => {
    return sortedCoinTypes.map((type, index) => {
      const address = addresses[type];
      return this.renderUnregistered(index, type, { address, unregistered: unregistereds[type] });
    });
  }


  renderCurrency = (index, coinType, { address, balance, erc20tokens, neotokens }) => {
    let balanceStr = balance ? balance.toString() : (balance === 0 ? balance.toString() : 'NaN');
    // 判断一下有没有减号
    if (balanceStr.indexOf('-') >= 0) {
     balanceStr = '0' + String(Number(balanceStr) + 1).substr(1);
    }
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

        { this.renderAddressField(localizedStrings.address, address, coinType) }
        { this.renderBalanceField(localizedStrings.balance, balanceStr, address, coinType)}
        { erc20tokens && erc20tokens.length > 0 && this.renderTokens(erc20tokens) }
        { neotokens && neotokens.length > 0 && this.renderneoTokens(neotokens) }
      </div>
    );
  }

  renderCurrencies = (sortedCoinTypes, erc20Types, neoTypes, balances, addresses) => {
    return sortedCoinTypes.map((type, index) => {
      const address = addresses[type];

      if (type === 'ETH') {
        const erc20tokens = erc20Types.map(erc20Type => ({ type: erc20Type, balance: balances[erc20Type] })).filter(({ balance }) => parseFloat(balance) > 0);
        return this.renderCurrency(index, type, { address, balance: balances[type], erc20tokens });
      }
      if (type === 'NEO') {
        const neotokens = neoTypes.map(neoType => ({ type: neoType, balance: balances[neoType] })).filter(({ balance }) => parseFloat(balance) > 0);
        return this.renderCurrency(index, type, { address, balance: balances[type], neotokens });
      }

      return this.renderCurrency(index, type, { address, balance: balances[type] });
    });
  }

  render() {
    const { balances, addresses, unregistereds } = this.props;
    const coinTypes = Object.keys(balances);
    const unregCoinTypes = Object.keys(unregistereds).filter(type => unregistereds[type])
    const erc20Types = coinTypes.filter(type => !addresses[type]);
    const neoTypes = coinTypes.filter(type => {return type === 'GAS'});
    const sortedCoinTypes = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO'];
    if (unregCoinTypes.indexOf('CYB') < 0) {
      sortedCoinTypes.push('CYB');
    }
    sortedCoinTypes.concat(coinTypes.filter((type) => {
      return type !== 'BTC' && type !== 'ETH' && type !== 'ETC' && type !== 'LTC' && type !== 'NEO' && type !== 'CYB'
       && erc20Types.indexOf(type) < 0 && neoTypes.indexOf(type) < 0;
    }));

    return (
      <div className={styles.container}>
        <div className={styles.list} style={{ paddingBottom: 3 }}>
          <List
            className="scrollable"
            style={{ padding: 0 }}
          >
            {
              this.renderCurrencies(sortedCoinTypes, erc20Types, neoTypes, balances, addresses)
            }
            {
              this.renderUnregistereds(unregCoinTypes, unregistereds, addresses)
            }
            <div style={{ width: '100%', height: 62 }} />
          </List>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  addresses: PropTypes.object,
  balances: PropTypes.object,
  unregistereds: PropTypes.object
};

function mapStateToProps({ device: { addresses }, wallet: { balances, unregistereds } }) {
  return {
    addresses,
    balances: { BTC: '', ETH: '', ...balances },
    unregistereds,
  };
}

export default connect(mapStateToProps)(Overview);
