import Promise from 'bluebird';
import React from 'react';
import PropTypes from 'prop-types';
import validator from 'wallet-address-validator';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import ScanIcon from 'material-ui/svg-icons/image/crop-free';
import FolderIcon from 'material-ui/svg-icons/image/photo';
import Dropzone from 'react-dropzone';
import jsQR from 'jsqr';

import { withContentRect } from 'react-measure';
import { Field, reduxForm, formValueSelector, change, reset } from 'redux-form';
import { connect } from 'dva';
import { ChainValidation as cybexValidation } from 'cybexjs';
import Big from 'big.js';

import * as constants from 'shared/constants';
import { toBTC, toETH } from 'shared/utils';
import { CryptoIcons } from 'components';

import styles from './index.scss';

function validateRecipient(recipient) {
  if (!recipient || !recipient.trim()) {
    return [];
  }

  const types = ['BTC', 'LTC', 'NEO', 'GAS', 'ETH', 'ETC'];
  const recipientTypes = types.filter(type => validator.validate(recipient, type, 'both'));

  if (!cybexValidation.is_account_name_error(recipient)) {
    recipientTypes.push('CYB');
  }

  return recipientTypes;
}

class Send extends React.Component {
  state = {
    unitFieldFocused: false,
    unitFieldWidth: 920,
    feeLevel: 5,
    balanceNotEnough: false,
  }

  componentDidMount() {
    document.querySelector('input[name*=recipient]').focus();
  }

  componentWillReceiveProps(nextProps) {
    const { recipient, selectedCoin, amount, fee, valid, fullBalance, displayAdvanced, balances } = nextProps;

    if (selectedCoin !== 'BTC' && selectedCoin !== 'LTC'&& selectedCoin !== 'NEO '&& selectedCoin !== 'GAS'&& selectedCoin !== 'CYB' && selectedCoin !== 'EOS') {
      if (fee) {
        this.setState({ estimatedFee: fee, balanceNotEnough: false });
      } else {
        this.setState({ estimatedFee: null, balanceNotEnough: false });
      }
    }

    if (selectedCoin !== this.props.selectedCoin) {
      this.props.dispatch(reset('createTransaction'));
      this.getEstimatedFee(nextProps);
      this.props.dispatch(change('createTransaction', 'recipient', recipient));
      this.props.dispatch(change('createTransaction', 'fee', fee));
    }

    if ((amount !== this.props.amount) && (this.props.amount !== undefined) && (this.props.selectedCoin === selectedCoin)) {
      if (!parseFloat(fee) || (!!parseFloat(fee) && !displayAdvanced) || (fullBalance && !this.props.fullBalance)) {
        this.getEstimatedFee(nextProps);
      }

      this.props.dispatch(change('createTransaction', 'amount', `${amount}`));
    }

    if ((!!fee && new RegExp(/(^\d+)\.?(\d*$)/).test(fee)) || !fee) {
      this.props.dispatch(change('createTransaction', 'fee', `${fee}`));
    } else {
      this.props.dispatch(change('createTransaction', 'fee', this.props.fee));
    }

    try {
      if (selectedCoin) {
        const selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
        const currentAmount = amount ? new Big(amount) : new Big(0);
        const currentFee = new Big(fee);
        const currentbalance = new Big( balances.find(({ type }) => type === selectedCoin).amount);
        if (selectedType != 'ERC20') {
          if (currentAmount.plus(currentFee).gt(currentbalance) ) {
            this.setState({ estimatedFee: fee, balanceNotEnough: true });
          } else {
            this.setState({ estimatedFee: fee, balanceNotEnough: false });
          }
        } else {
          const ethBalance = new Big(balances.find(({ type }) => type === 'ETH').amount);
          if (ethBalance.lt(currentFee) || currentbalance.lt(currentAmount)) {
            this.setState({ estimatedFee: fee, balanceNotEnough: true });
          } else {
            this.setState({ estimatedFee: fee, balanceNotEnough: false });
          }
        }
      }
    } catch (error) {
      console.log(`error: ${error}`)
    }

    if (fullBalance && !this.props.fullBalance) {
      this.getEstimatedFee(nextProps);
    }
  }

  getEstimatedFee = async (props) => {
    const { feeLevel: selector } = this.state;
    const {
      selectedCoin,
      recipient: to,
      amount: value,
      addresses,
      deviceList: [{ TestNet: testNet }],
      fullBalance,
    } = props;
    console.log('getEstimatedFee, this.props:', props);

    const address = addresses[selectedCoin] || addresses.ETH;
    console.log('getEstimatedFee, address:', address);
    const data = { address, to, value, selector, testNet };
    console.log('getEstimatedFee, data:', data);
    const etc = true;

    switch (selectedCoin) {
      case 'BTC': {
        data.value = fullBalance ? -1 : data.value;
        await this.getEstimatedBTCFee(data);
        break;
      }

      case 'LTC': {
        data.value = fullBalance ? -1 : data.value;
        await this.getEstimatedLTCFee(data);
        break;
      }

      case 'ETC': {
        await this.getEstimatedETHFee(selectedCoin, data, etc);
        break;
      }

      case 'NEO': {
        await this.getEstimatedNEOFee();
        break;
      }

      case 'GAS': {
        await this.getEstimatedNEOFee();
        break;
      }

      case 'CYB': {
        await this.getEstimatedCYBFee(data);
        break;
      }

      default: {
        await this.getEstimatedETHFee(selectedCoin, data, false);
        break;
      }
    }
  }

  getEstimatedBTCFee = async (data) => {
    try {
      const { fee } = await clientCore.btc.prepareTx(data);
      console.log('wallet send clientCore.btc.prepareTx , fee = ',fee)
      this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
    } catch (error) {
      console.log(JSON.stringify(error), 'error')
      if (error.data) {
        const { fee } = error.data;
        if (fee) {
          this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
        }
      }
    }
  }

  getEstimatedLTCFee = async (data) => {
    try {
      const { fee } = await clientCore.ltc.prepareTx(data);
      console.log('wallet send clientCore.ltc.prepareTx , fee = ',fee)
      this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
    } catch (error) {
      console.log(JSON.stringify(error), 'error')
      if (error.data) {
        const { fee } = error.data;
        if (fee) {
          this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
        }
      }
    }
  }

  getEstimatedNEOFee = async () => {
    this.props.dispatch(change('createTransaction', 'fee', 0));
  }

  getEstimatedCYBFee = async (data) => {
    try {
      const { fee, balanceNotEnough } = await clientCore.cyb.getFee(data);
      console.log('[getEstimatedCYBFee]', fee, balanceNotEnough)
      this.props.dispatch(change('createTransaction', 'fee', fee));
    } catch (error) {
      console.log(JSON.stringify(error), 'error')
    }
  }

  getEstimatedETHFee = async (selectedCoin, { testNet, selector, address }, etc) => {
    if (selector === 0) {
      return;
    }

    try {
      const gas = await clientCore.eth.getGasLimit({ erc20: selectedCoin === 'ETH' ? '' : selectedCoin });
      const gasPrice = await clientCore.eth.getGasPrice(testNet, etc);
      const nonce = await clientCore.eth.getNonce({ address, testNet, etc });
      console.log('nonce:', nonce)
      this.props.dispatch(change('createTransaction', 'gas', gas));
      this.props.dispatch(change('createTransaction', 'gasPrice', gasPrice));
      this.props.dispatch(change('createTransaction', 'nonce', nonce));
    } catch (error) {
      await Promise.delay(2000);
      await this.getEstimatedETHFee(selectedCoin, { testNet, selector, address }, etc);
    }
  }

  handleCreateTransaction = async ({ recipient, amount, memo }) => {
    const { selectedCoin, addresses, fee, deviceList: [{ TestNet: testNet }] } = this.props;
    const address = addresses[selectedCoin] || addresses.ETH;

    switch (selectedCoin) {
      case 'BTC': {
        const { feeLevel: selector } = this.state;
        
        this.props.dispatch({
          type: 'send/createBTCTransaction',
          payload: { address, to: recipient, value: amount, fee, memo, selector, testNet },
        });
        break;
      }
      case 'LTC': {
        const { feeLevel: selector } = this.state;

        this.props.dispatch({
          type: 'send/createLTCTransaction',
          payload: { address, to: recipient, value: amount, fee, memo, selector, testNet },
        });
        break;
      }
      case 'NEO': {
        this.props.dispatch({
          type: 'send/createNEOTransaction',
          payload: { address, to: recipient, value: amount, testNet, GAS: false },
        });
        break;
      }
      case 'GAS': {
        this.props.dispatch({
          type: 'send/createNEOTransaction',
          payload: { address, to: recipient, value: amount, testNet, GAS: true },
        });
        break;
      }
      case 'ETC': {
        const erc20 = null;
        const { gas, gasPrice, nonce } = this.props;

        this.props.dispatch({
          type: 'send/createETHTransaction',
          payload: { address, to: recipient, value: amount, memo, testNet, etc: true, erc20, gas, gasprice: gasPrice, nonce },
        });
        break;
      }
      case 'CYB': {
        this.props.dispatch({
          type: 'send/createCYBTransaction',
          payload: { from: address, to: recipient, value: amount, testNet, GAS: false },
        });
        break;
      }

      default: {
        const erc20 = selectedCoin === 'ETH' ? null : selectedCoin;
        const { gas, gasPrice, nonce } = this.props;

        this.props.dispatch({
          type: 'send/createETHTransaction',
          payload: { address, to: recipient, value: amount, memo, testNet, etc: false, erc20, gas, gasprice: gasPrice, nonce },
        });
      }
    }
  }

  handleCoinTypeChange = (event, type) => {
    this.props.dispatch({ type: 'send/setSelectedCoin', payload: { coinType: type } });
    
    this.setState({ unitFieldFocused: false, feeLevel: 5, estimatedFee: null, balanceNotEnough: false });

    const { recipient } = this.props;
    this.props.dispatch(change('createTransaction', 'recipient', ''));
    setTimeout(() => {
      this.props.dispatch(change('createTransaction', 'recipient', recipient));
    }, 0);
  }

  handleClearFields = () => {
    this.props.dispatch(reset('createTransaction'));
  }

  handleQRScan = () => {
    const onResult = (result) => {
      this.handleQRResult(result);
    };

    const modalPlayload = { modalType: 'QRScan', modalProps: { onResult } };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  }

  handleSelectQRCode = (files) => {
    if (!files || files.length < 1) {
      return;
    }

    document.querySelector('input[name*=recipient]').focus();

    const file = files.slice(-1).pop();
    const fileReader = new window.FileReader();
    fileReader.onload = (event) => {
      const result = event.target.result;

      const img = new window.Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        const { width, height } = img;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const decoded = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);

        if (decoded) {
          this.handleQRResult(decoded);
        }
      };
      img.src = result;
    };

    fileReader.readAsDataURL(file);
  }

  handleQRResult = (result) => {
    const parts = result.match(/(\b[^:?$]+\b)/g);
    const type = parts.length > 1 ? parts[0] : null;
    const address = !type ? parts[0] : parts[1];

    let recipient = address;
    if (type === 'iban') {
      recipient = clientCore.eth.getWeb3().eth.Iban.toAddress(address);
    }

    this.props.dispatch(change('createTransaction', 'recipient', recipient));
  }

  renderMenuItem = ({ type, amount }, index) => {
    const { selectedCoin } = this.props;
    let amountStr = amount ? amount.toString() : '0';
    // 判断一下有没有减号
    if (amountStr.indexOf('-') >= 0) {
      amountStr = '0' + String(Number(amountStr) + 1).substr(1);
    } else if (amountStr === 'NaN') {
      amountStr = localizedStrings.unavailable;
    }

    const item = (
      <div className={styles.currencyField}>
        <Avatar
          size={22}
          style={{ width: 22, height: 22, margin: '-1px 0px 1px 0px' }}
          src={CryptoIcons[type.toLowerCase()]}
        />
        <b>{type}</b>
        <span>{amountStr}</span>
      </div>
    );

    return (
      <MenuItem
        key={index}
        innerDivStyle={{ color: selectedCoin === type ? 'white' : 'rgba(255,255,255,0.6)', fontSize: 15 }}
        value={type}
        primaryText={item}
      />
    );
  }

  renderTextField = ({ input, label, meta: { touched, error }, refactorInput, errorText, ...custom }) => {
    return (
      <TextField
        style={{ fontSize: 17 }}
        floatingLabelStyle={{ fontSize: 16, top: 34 }}
        floatingLabelText={label}
        fullWidth
        errorText={errorText || (touched && error)}
        {...(!refactorInput ? input : refactorInput(input))}
        {...custom}
      />
    );
  }

  renderToggle = ({ input: { onChange, value, ...inputProps }, defaultToggled, meta, ...props }) => {
    return (
      <Toggle
        {...({ ...inputProps, ...props, onToggle: onChange, toggled: !!value })}
      />
    );
  }

  renderEstimatedInfo = () => {
    const { selectedCoin } = this.props;
    const { estimatedFee, feeLevel } = this.state;

    switch (selectedCoin) {
      case 'BTC': {
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              !!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} BTC，${feeLevel * 10} ${localizedStrings.minute}`
            }
          </div>
        );
      }
      case 'LTC': {
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              !!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} LTC，${feeLevel * 2} ${localizedStrings.minute}`
            }
          </div>
        );
      }
      case 'NEO': {
        console.log('renderEstimatedInfo NEO')
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              // `${localizedStrings.estimate}: 0 NEO`
            }
          </div>
        );
      }
      case 'GAS': {
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              // `${localizedStrings.estimate}: 0 NEO`
            }
          </div>
        );
      }
      case 'CYB': {
        console.log('renderEstimatedInfo CYB')
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              !!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} CYB`
            }
          </div>
        );
      }
      case 'ETC':{
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              !!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} ETC`
            }
          </div>
        );        
      }

      default: {
        return (
          <div style={{ display: 'table', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            {
              !!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} ETH`
            }
          </div>
        );
      }
    }
  }

  renderUnitField = () => {
    const { unitFieldFocused, anchorEl, unitFieldWidth } = this.state;
    const { balances, selectedCoin, recipient } = this.props;

    let recipientType = selectedCoin;
    const recipientTypes = validateRecipient(recipient);

    if (recipientTypes.indexOf('ETH') > -1) {
      const erc20Types =
        balances
          .filter(({ type }) => ['BTC', 'LTC', 'NEO', 'GAS', 'ETH', 'ETC', 'CYB'].indexOf(type) < 0)
          .map(({ type }) => type);
      recipientTypes.push(...erc20Types);
    }

    if (recipientTypes.length > 0 && recipientTypes.indexOf(recipientType) < 0) {
      recipientType = recipientTypes[0];
      
      this.props.dispatch({ type: 'send/setSelectedCoin', payload: { coinType: recipientType } });
      this.setState({ unitFieldFocused: false, feeLevel: 5, estimatedFee: null });
    }

    const balance = balances.find(({ type }) => type === recipientType);

    const ItemToMeasure = withContentRect('bounds')(({ measureRef }) => {
      let amountStr = '';
      if (balance.amount) {
        amountStr = balance.amount.toString();
        // 判断一下有没有减号，避免科学计数法
        if (amountStr.indexOf('-') >= 0) {
          amountStr = `0${String(Number(amountStr) + 1).substr(1)}`;
        } else if (amountStr === 'NaN') {
          amountStr = localizedStrings.unavailable;
        }
      } else {
        amountStr = '0';
      }

      return (
        <div ref={measureRef} className={styles.relativeField} style={{ marginBottom: 10 }}>
          <div className={styles.currencyField} style={{ position: 'absolute', left: 0, top: 40 }}>
            <Avatar
              size={22}
              style={{ width: 22, height: 22, margin: '-1px 0px 1px 0px' }}
              src={CryptoIcons[balance.type.toLowerCase()]}
            />
            <b>{balance.type}</b>
            <span>{amountStr}</span>
          </div>

          <TextField
            name='unitField'
            floatingLabelText={localizedStrings.coinType}
            floatingLabelFixed
            fullWidth
            floatingLabelStyle={{ fontSize: 16, top: 34 }}
            style={{ fontSize: 17 }}
            underlineStyle={{ borderColor: unitFieldFocused ? '#ee602b' : '#686868' }}
            onFocus={() => this.setState({
              unitFieldFocused: true,
              anchorEl: this.lastFieldParent,
              unitFieldWidth: document.querySelector('input[name*=unitField]').offsetWidth || 920,
            })}
            onBlur={() => this.setState({ unitFieldFocused: false })}
          />
        </div>
      );
    });

    return (
      <div
        className={styles.relativeField}
        ref={(ref) => { this.lastFieldParent = ref; }}>
        <ItemToMeasure />
        <Popover
          open={unitFieldFocused}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          style={{ marginTop: 70, marginRight: 0, background: '#202020' }}
          onRequestClose={() => this.setState({ unitFieldFocused: false })}
        >
          <Menu
            autoWidth={false}
            maxHeight={230}
            width={unitFieldWidth}
            value={recipientType}
            onChange={this.handleCoinTypeChange}
          >
            {balances && balances.filter(({ type }) =>  !recipientTypes.length || recipientTypes.indexOf(type) > -1).map(this.renderMenuItem)}
          </Menu>
        </Popover>
      </div>
    );
  }


  render() {
    const { handleSubmit, valid, inProgress, recipient, fullBalance, displayAdvanced, selectedCoin, fee, balances } = this.props;
    const { feeLevel, balanceNotEnough } = this.state;

    const balance = balances.find(({ type }) => type === selectedCoin).amount;
    const unavailable = !balance || isNaN(balance);
    const selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
    const transferOption = constants.transferOptions[selectedType];

    return (
      <div className={styles.container}>
        <div className={styles.relativeField} style={{ marginBottom: 10 }}>
          <Field
            component={this.renderTextField}
            name="recipient"
            label={localizedStrings.recipientAddress}
            hintText={localizedStrings.recipientHint}
            floatingLabelFixed
          />

          <div
            className={styles.icons}
          >
            <IconButton
              style={{ float: 'right', transform: 'scale(0.85)' }}
              onTouchTap={this.handleQRScan}
            >
              <ScanIcon color="rgba(255, 255, 255, 0.5)" hoverColor="rgba(255, 255, 255, 0.8)" />
            </IconButton>

            <IconButton
              style={{ float: 'right', transform: 'scale(0.85)', marginRight: -15 }}
            >
              <Dropzone
                onDrop={this.handleSelectQRCode}
                accept="image/*"
              >
                <FolderIcon color="rgba(255, 255, 255, 0.5)" hoverColor="rgba(255, 255, 255, 0.8)" />
              </Dropzone>
            </IconButton>

          </div>
        </div>

        {this.renderUnitField()}

        <Field
          style={{ fontSize: 17, width: '50%', marginBottom: 10 }}
          component={this.renderTextField}
          name="amount"
          label={localizedStrings.sendAmount}
          floatingLabelFixed
          errorText={balanceNotEnough ? localizedStrings.exceedBalanceHint : null}
          disabled={fullBalance || unavailable}
        />

        <div className={styles.toggleDiv}>
          <Field
            name="fullBalance"
            component={this.renderToggle}
            label={localizedStrings.fullBalance}
            labelPosition="right"
            disabled={unavailable}
          />
        </div>

        <Field
          style={{ fontSize: 17, width: '50%', marginBottom: 10 }}
          component={this.renderTextField}
          name="fee"
          label={localizedStrings.fee}
          floatingLabelFixed
          disabled={!transferOption.feeEditable || !displayAdvanced || unavailable}
        />

        <div
          className={styles.toggleDiv}
          style={{ display: transferOption.advanced ? 'flex' : 'none' }}>
          <Field
            name="displayAdvanced"
            component={this.renderToggle}
            label={localizedStrings.advanced}
            labelPosition="right"
            disabled={unavailable}
          />
        </div>

        {
          displayAdvanced && transferOption.feeType === constants.feeTypes.multiply &&
          <div
            className={styles.collapse}
            style={{ width: '60%', transform: 'scale(0.8)', transformOrigin: 'left', marginRight: '40%' }}
          >
            <Field
              component={this.renderTextField}
              name="gas"
              label="Gas"
              floatingLabelFixed
              style={{ fontSize: 17, flex: 1 }}
            />
            <Field
              component={this.renderTextField}
              name="gasPrice"
              label="Gas Price"
              floatingLabelFixed
              style={{ fontSize: 17, flex: 1 }}
            />
          </div>
        }

        {
          displayAdvanced &&
          transferOption.feeType === constants.feeTypes.multiply &&
          transferOption.nonce &&
          <div
            className={styles.collapse}
            style={{ width: '30%', transform: 'scale(0.8)', transformOrigin: 'left' }}
          >
            <Field
              component={this.renderTextField}
              name="nonce"
              label="Nonce"
              floatingLabelFixed
            />
          </div>
        }

        <div className={styles.buttonDiv}>
          <FlatButton
            style={{ float: 'right' }}
            label={localizedStrings.confirmSend}
            labelStyle={{ fontSize: 18 }}
            primary
            disabled={!(valid && recipient) || balanceNotEnough || inProgress}
            onTouchTap={handleSubmit(this.handleCreateTransaction)}
          />
          <FlatButton
            style={{ float: 'right' }}
            label={localizedStrings.clear}
            labelStyle={{ fontSize: 18 }}
            disabled={inProgress || !fee}
            onTouchTap={this.handleClearFields}
          />
        </div>
      </div>
    );
  }
}

Send.propTypes = {
  recipient: PropTypes.string,
  amount: PropTypes.string,
  addresses: PropTypes.object,
  balances: PropTypes.array,
  deviceList: PropTypes.array,
  selectedCoin: PropTypes.string,
};

function validate({ recipient, amount, gas, gasPrice, fee, nonce }, { balances, selectedCoin, displayAdvanced }) {
  const errors = {};

  if (!recipient) {
    errors.recipient = localizedStrings.recipientRequired;
  } else {
    const legal = validateRecipient(recipient).length > 0;
    console.log('validate = ', legal);

    if (!legal) {
      errors.recipient = localizedStrings.recipientInvalid;
    }
  }

  const selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
  const transferOption = constants.transferOptions[selectedType];

  if (!amount || !/^([1-9][0-9]*)(\.[0-9]*)?$|^(0\.[0-9]*)$/.test(amount)) {
    errors.amount = localizedStrings.amountInvalid;
  } else {
    const parts = (amount + '').split('.');
    if (parts.length === 2 && parts[1].length > transferOption.precision) {
      errors.amount = localizedStrings.amountInvalid;
    }

    if (selectedCoin === 'NEO' && parts.length === 2) { // neo只能整数交易
      errors.amount = localizedStrings.amountInvalid_fractionalamount;
    }

    const balance = balances.find(({ type }) => type === selectedCoin).amount;
    try {
      const tmpFee = selectedType === 'ERC20' ? 0 : fee;
      if (new Big(amount).plus(tmpFee).minus(balance).gt(0)) {
        errors.amount = localizedStrings.balanceNotEnough;
      }
    } catch (error) {
      errors.amount = localizedStrings.balanceNotEnough;
    }

    if (selectedCoin !== 'BTC' && selectedCoin !== 'ETH' && selectedCoin !== 'ETC' && selectedCoin !== 'LTC' && selectedCoin !== 'NEO' && selectedCoin !== 'GAS' && selectedCoin !== 'CYB') { // erc20
      const ethBalance = balances.find(({ type }) => type === 'ETH').amount;
      if (!parseFloat(ethBalance)) {
        errors.amount = localizedStrings.ethNotEnough;
      }
    }
  }

  let amountInvalid = false;
  try {
    const tmp = new Big(amount)
  } catch (error) {
    errors.amount = localizedStrings.amountInvalid;
    amountInvalid = true
  }
  const zeroForbiddenTypes = ['BTC', 'LTC', 'NEO', 'CYB', 'GAS'];
  if (zeroForbiddenTypes.indexOf(selectedCoin) < 0 && !amountInvalid && parseFloat(amount) === 0) {
    errors.amount = null;
  }

  if (displayAdvanced && transferOption.feeType === constants.feeTypes.multiply) {
    if (!gas || !/^[1-9]\d*$/.test(gas)) {
      errors.gas = localizedStrings.gasInvalid;
    }

    if (!gasPrice || !/^[1-9]\d*$/.test(gasPrice)) {
      errors.gasPrice = localizedStrings.gasPriceInvalid;
    }
  }

  if (displayAdvanced && transferOption.nonce) {
    if (!/^([1-9]\d*|[0]{1,1})$/.test('' + nonce)) {
      errors.nonce = localizedStrings.nonceInvalid;
    }
  }

  if (!!fee && !(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(fee) || /^[1-9]\d*$/.test(fee))) {
    if ((fee === 0 || fee === '0') && (selectedCoin === 'NEO' || selectedCoin === 'GAS')) {
      errors.fee = null;
    } else {
      errors.fee = localizedStrings.feeInvalid;
    }
  } else {
    if (parseFloat(fee) >= 0) {
      const parts = (fee + '').split('.');
      if (parts.length === 2 && parts[1].length > transferOption.precision) {
        errors.fee = localizedStrings.feeInvalid;
      }
    } else {
      errors.fee = localizedStrings.feeInvalid;
    }
  }

  console.log('validate.errors = ', errors)
  return errors;
}

const SendForm = reduxForm({
  form: 'createTransaction',
  initialValues: { amount: '0', fee: '0', gas: '0', gasPrice: '0' },
  validate,
})(Send);

const selector = formValueSelector('createTransaction');

function mapStateToProps(state) {
  const { recipient, amount, fee, gas, gasPrice, fullBalance, displayAdvanced, nonce } = selector(state, 'recipient', 'amount', 'fee', 'gas', 'gasPrice', 'fullBalance', 'displayAdvanced', 'nonce');
  const {
    device: { addresses, list: deviceList },
    wallet: { balances: balanceMap },
    send: { selectedCoin, inProgress },
  } = state;
  const coinTypes = Object.keys(balanceMap);

  // TODO:: 在支持EOS后，这里要加上EOS
  const types = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'];
  const sortedCoinTypes = types.concat(coinTypes.filter(type => types.indexOf(type) < 0));
  const balances =
    sortedCoinTypes
      .map(type => ({ type, amount: balanceMap[type] }))
      .filter(({ type, amount }) => {
        return parseFloat(amount) > 0 ||
          (types.indexOf(type) > -1 && type !== 'GAS') ||
          type === selectedCoin;
      });

  const selectedType = ['BTC', 'ETH', 'LTC', 'ETC', 'NEO', 'GAS', 'CYB'].indexOf(selectedCoin) > -1 ? selectedCoin : 'ERC20';
  const transferOption = constants.transferOptions[selectedType];

  let newAmount = amount;
  const balance = balances.find(({ type }) => type === selectedCoin).amount;
  if (fullBalance) {
    if (types.indexOf(selectedCoin) > -1) {
      try {
        if (!!fee && !(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(fee) || /^[1-9]\d*$/.test(fee))) {
          if (fee === '0' && (selectedCoin === 'NEO' || selectedCoin === 'GAS')) {
            console.log('NEO fee allow 0');
          } else {
            throw localizedStrings.feeInvalid;
          }
        } else {
          if (parseFloat(fee) >= 0) {
            const parts = (fee + '').split('.');
            if (parts.length === 2 && parts[1].length > transferOption.precision) {
              throw localizedStrings.feeInvalid;
            }
          } else {
            throw localizedStrings.feeInvalid;
          }
        }
        
        newAmount = fee > balance ? '0' : new Big(balance).minus(fee).toFixed(transferOption.precision);
      } catch (error) {
        console.error(error);
      }
    } else {
      newAmount = balance;
    }
  }

  let newFee = fee;

  switch (transferOption.feeType) {
    case constants.feeTypes.multiply: {
      try {
        newFee = toETH(new Big(gas).times(gasPrice));
        newFee = isNaN(newFee) ? toETH(0) : newFee;
      } catch (error) {
        if (fee == undefined) {
          newFee = toETH(0);
        } else {
          newFee = fee;
        }
      }
      break;
    }

    case constants.feeTypes.fixed: {
      newFee = constants.transferOptions[selectedCoin].fee;
      break;
    }

    default: {
      if (newFee || newFee === 0 || newFee === '0') {
        if (!displayAdvanced) {
          newFee = new Big(newFee).toFixed(transferOption.precision);
        }
      }
      break;
    }
  }

  console.log('newfee', newFee)

  return {
    recipient,
    amount: newAmount,
    addresses,
    deviceList,
    selectedCoin,
    inProgress,
    balances,
    fee: newFee,
    gas,
    gasPrice,
    nonce,
    fullBalance,
    displayAdvanced,
  };
}

export default connect(mapStateToProps)(SendForm);