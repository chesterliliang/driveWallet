import Promise from 'bluebird';
import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import ScanIcon from 'material-ui/svg-icons/image/crop-free';
import FolderIcon from 'material-ui/svg-icons/image/photo';
import Dropzone from 'react-dropzone';
import jsQR from 'jsqr';

import { withContentRect } from 'react-measure';
import { Field, reduxForm, formValueSelector, change, reset } from 'redux-form';
import { connect } from 'dva';
import Big from 'big.js';

import { validateRecipient } from './actions';
import constants from 'shared/constants';
import { toBTC, toETH } from 'shared/utils';
import { CryptoIcons } from 'components';
import noExit from 'assets/noExit.png';
import mentionPng from 'assets/mention.png';

import styles from './index.scss';

class Send extends React.Component {
  state = {
    unitFieldFocused: false,
    unitFieldWidth: 920,
    feeLevel: 5,
    balanceNotEnough: false,
  };

  componentDidMount() {
    document.querySelector('input[name*=recipient]').focus();
  }

  componentWillReceiveProps(nextProps) {
    const {
      recipient,
      selectedCoin,
      amount,
      fee,
      valid,
      fullBalance,
      displayAdvanced,
      balances,
    } = nextProps;

    if (
      selectedCoin !== 'BTC' /*&&
      selectedCoin !== 'USDT' &&
      selectedCoin !== 'LTC' &&
      selectedCoin !== 'NEO ' &&
      selectedCoin !== 'GAS' &&
      selectedCoin !== 'CYB' &&
      selectedCoin !== 'EOS'*/
    ) {
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

    if (
      amount !== this.props.amount &&
      this.props.amount !== undefined &&
      this.props.selectedCoin === selectedCoin
    ) {
      if (
        !parseFloat(fee) ||
        (!!parseFloat(fee) && !displayAdvanced) ||
        (fullBalance && !this.props.fullBalance)
      ) {
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
        const selectedType =
          [
            'BTC',
            /*'ETH',
            'LTC',
            'ETC',
            'NEO',
            'GAS',
            'CYB',
            'EOS',
            'USDT',
            'XRP',*/
          ].indexOf(selectedCoin) > -1
            ? selectedCoin
            : 'ERC20';
        const currentAmount = amount ? new Big(amount) : new Big(0);
        const currentFee = new Big(fee);
        const currentbalance = new Big(
          balances.find(({ type }) => type === selectedCoin).amount
        );
        if (selectedType !== 'ERC20') {
          if (selectedType === 'USDT') {
            if (currentAmount.gt(currentbalance)) {
              this.setState({ estimatedFee: fee, balanceNotEnough: true });
            } else {
              this.setState({ estimatedFee: fee, balanceNotEnough: false });
            }
          } else if (selectedType === 'XRP') {
            // if (currentAmount.plus(currentFee).gt(currentbalance)) {
            if (
              currentAmount
                .plus(currentFee)
                .plus(20)
                .gt(currentbalance)
            ) {
              this.setState({
                estimatedFee: fee,
                balanceNotEnough: true,
                XRPBalanceNotEnough: true,
              });
            } else {
              this.setState({
                estimatedFee: fee,
                balanceNotEnough: false,
                XRPBalanceNotEnough: false,
              });
            }
          } else {
            if (currentAmount.plus(currentFee).gt(currentbalance)) {
              this.setState({ estimatedFee: fee, balanceNotEnough: true });
            } else {
              this.setState({ estimatedFee: fee, balanceNotEnough: false });
            }
          }
        } else {
          const ethBalance = new Big(
            balances.find(({ type }) => type === 'ETH').amount
          );
          if (ethBalance.lt(currentFee) || currentbalance.lt(currentAmount)) {
            this.setState({ estimatedFee: fee, balanceNotEnough: true });
          } else {
            this.setState({ estimatedFee: fee, balanceNotEnough: false });
          }
        }
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }

    if (fullBalance && !this.props.fullBalance) {
      this.getEstimatedFee(nextProps);
    }
  }

  getEstimatedFee = async props => {
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

    let address = addresses[selectedCoin] || addresses.ETH;
    if (selectedCoin === 'USDT') {
      address = addresses['BTC'];
    }
    console.log(', address:', address);
    const data = { address, to, value, selector, testNet };
    console.log('getEstimatedFee, data:', data);
    const etc = true;
    console.log('selected ', selectedCoin);
    switch (selectedCoin) {
      /*case 'XRP': {
        await this.getEstimatedXRPFee();
        break;
      }

      case 'USDT': {
        data.value = fullBalance ? -1 : data.value;
        await this.getEstimatedUSDTFee(
          Object.assign({}, data, { from: data.address })
        );
        break;
      }*/

      case 'BTC': {
        console.log('in case getEstimatedBTCFee');
        data.value = fullBalance ? -1 : data.value;
        await this.getEstimatedBTCFee(data);
        break;
      }

 /*     case 'LTC': {
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

      case 'EOS': {
        await this.getEstimatedEOSFee();
        break;
      }
*/
      default: {
       // await this.getEstimatedETHFee(selectedCoin, data, false);
        break;
      }
    }
  };

  getEstimatedBTCFee = async data => {
    try {
      const { fee } = await clientCore.btc.prepareTx(data);
      console.log('wallet send clientCore.btc.prepareTx , fee = ', fee);
      this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
      if (error.data) {
        const { fee } = error.data;
        if (fee) {
          this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
        }
      }
    }
  };
/*
  getEstimatedUSDTFee = async data => {
    try {
      const { fee } = await clientCore.usdt.prepareUSDTTx(data);
      console.log('wallet send clientCore.usdt.prepareUSDTTx , fee = ', fee);
      this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
      if (error.data) {
        const { fee } = error.data;
        if (fee) {
          this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
        }
      }
    }
  };

  getEstimatedLTCFee = async data => {
    try {
      const { fee } = await clientCore.ltc.prepareTx(data);
      console.log('wallet send clientCore.ltc.prepareTx , fee = ', fee);
      this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
      if (error.data) {
        const { fee } = error.data;
        if (fee) {
          this.props.dispatch(change('createTransaction', 'fee', toBTC(fee)));
        }
      }
    }
  };

  getEstimatedNEOFee = async () => {
    this.props.dispatch(change('createTransaction', 'fee', 0));
  };

  getEstimatedEOSFee = async () => {
    this.setState({ estimatedFee: 0, balanceNotEnough: false });
  };

  getEstimatedXRPFee = async () => {
    try {
      const fee = await clientCore.xrp.getEstimateFee();
      console.log('[getEstimatedXRPFee]', fee);
      this.props.dispatch(change('createTransaction', 'fee', fee));
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
    }
  };

  getEstimatedCYBFee = async data => {
    try {
      const { fee, balanceNotEnough } = await clientCore.cyb.getFee(data);
      console.log('[getEstimatedCYBFee]', fee, balanceNotEnough);
      this.props.dispatch(change('createTransaction', 'fee', fee));
    } catch (error) {
      console.log(JSON.stringify(error), 'error');
    }
  };

  getEstimatedETHFee = async (
    selectedCoin,
    { testNet, selector, address },
    etc
  ) => {
    if (selector === 0) {
      return;
    }

    try {
      const gas = await clientCore.eth.getGasLimit({
        erc20: selectedCoin === 'ETH' ? '' : selectedCoin,
      });
      const gasPrice = await clientCore.eth.getGasPrice(testNet, etc);
      const nonce = await clientCore.eth.getNonce({ address, testNet, etc });
      this.props.dispatch(change('createTransaction', 'gas', gas));
      this.props.dispatch(change('createTransaction', 'gasPrice', gasPrice));
      this.props.dispatch(change('createTransaction', 'nonce', nonce));
    } catch (error) {
      await Promise.delay(2000);
      await this.getEstimatedETHFee(
        selectedCoin,
        { testNet, selector, address },
        etc
      );
    }
  };
*/
  handleCreateTransaction = async ({ recipient, amount }) => {
    const {
      selectedCoin,
      addresses,
      fee,
      memo,
      tag,
      deviceList: [{ TestNet: testNet }],
      balanceMap,
    } = this.props;
    let address = addresses[selectedCoin] || addresses.ETH;
    if (selectedCoin === 'USDT') {
      address = addresses['BTC'];
    }
    const decimalOri = balanceMap[selectedCoin]['decimal'];
    const erc20Address = balanceMap[selectedCoin]['erc20Address'];
    switch (selectedCoin) {
    /*  case 'XRP': {
        this.props.dispatch({
          type: 'send/createXRPTransaction',
          payload: {
            from: address,
            to: recipient,
            value: amount,
            fee,
            tag: Number(tag), // tag must be a Number
          },
        });
        break;
      }

      case 'USDT': {
        const { feeLevel: selector } = this.state;
        this.props.dispatch({
          type: 'send/createUSTDTransaction',
          payload: {
            from: address,
            to: recipient,
            value: amount,
            fee,
            memo: '',
            selector,
            testNet,
          },
        });
        break;
      }*/

      case 'BTC': {
        const { feeLevel: selector } = this.state;

        this.props.dispatch({
          type: 'send/createBTCTransaction',
          payload: {
            address,
            to: recipient,
            value: amount,
            fee,
            memo: '',
            selector,
            testNet,
          },
        });
        break;
      }
      case 'LTC': {
        const { feeLevel: selector } = this.state;

        this.props.dispatch({
          type: 'send/createLTCTransaction',
          payload: {
            address,
            to: recipient,
            value: amount,
            fee,
            memo: '',
            selector,
            testNet,
          },
        });
        break;
      }
     /* case 'NEO': {
        this.props.dispatch({
          type: 'send/createNEOTransaction',
          payload: {
            address,
            to: recipient,
            value: amount,
            testNet,
            GAS: false,
          },
        });
        break;
      }
      case 'GAS': {
        this.props.dispatch({
          type: 'send/createNEOTransaction',
          payload: {
            address,
            to: recipient,
            value: amount,
            testNet,
            GAS: true,
          },
        });
        break;
      }
      case 'ETC': {
        const erc20 = null;
        const { gas, gasPrice, nonce } = this.props;

        this.props.dispatch({
          type: 'send/createETHTransaction',
          payload: {
            address,
            to: recipient,
            value: amount,
            memo: '',
            testNet,
            etc: true,
            erc20,
            gas,
            gasprice: gasPrice,
            nonce,
          },
        });
        break;
      }
      case 'CYB': {
        this.props.dispatch({
          type: 'send/createCYBTransaction',
          payload: {
            from: address,
            to: recipient,
            value: amount,
            testNet,
            GAS: false,
          },
        });
        break;
      }
      case 'EOS': {
        this.props.dispatch({
          type: 'send/createEOSTransaction',
          payload: {
            from: address,
            to: recipient,
            SN: addresses['EOSSN'],
            SN_sig: addresses['EOSCODE'],
            public_key_hex: addresses['EOSKEYHEX'],
            public_key_sig: addresses['EOSKEYSIG'],
            app_id: 2,
            value: amount,
            memo,
            testNet,
            GAS: false,
          },
        });
        break;
      }*/

      default: {
       /* const erc20 = selectedCoin === 'ETH' ? null : selectedCoin;
        const { gas, gasPrice, nonce } = this.props;

        this.props.dispatch({
          type: 'send/createETHTransaction',
          payload: {
            address,
            to: recipient,
            value: amount,
            memo,
            testNet,
            etc: false,
            erc20,
            gas,
            gasprice: gasPrice,
            nonce,
            decimalOri,
            erc20Address,
          },
        });*/
      }
    }
  };

  handleCoinTypeChange = (event, type) => {
    this.props.dispatch({
      type: 'send/setSelectedCoin',
      payload: { coinType: type },
    });

    this.setState({
      unitFieldFocused: false,
      feeLevel: 5,
      estimatedFee: null,
      balanceNotEnough: false,
      XRPBalanceNotEnough: false,
    });

    const { recipient } = this.props;
    this.props.dispatch(change('createTransaction', 'recipient', ''));
    setTimeout(() => {
      this.props.dispatch(change('createTransaction', 'recipient', recipient));
    }, 0);
  };

  handleClearFields = () => {
    this.props.dispatch(reset('createTransaction'));
    this.props.dispatch({
      type: 'wallet/setMemo',
      payload: null,
      initMemo: true,
    });
    this.props.dispatch({
      type: 'wallet/setTag',
      payload: null,
    });
  };

  handleQRScan = () => {
    const onResult = result => {
      this.handleQRResult(result);
    };

    const modalPlayload = { modalType: 'QRScan', modalProps: { onResult } };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  };

  handleSelectQRCode = files => {
    if (!files || files.length < 1) {
      return;
    }

    document.querySelector('input[name*=recipient]').focus();

    const file = files.slice(-1).pop();
    const fileReader = new window.FileReader();
    fileReader.onload = event => {
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
        const decoded = jsQR.decodeQRFromImage(
          imageData.data,
          imageData.width,
          imageData.height
        );

        if (decoded) {
          this.handleQRResult(decoded);
        }
      };
      img.src = result;
    };

    fileReader.readAsDataURL(file);
  };

  handleQRResult = result => {
    const parts = result.match(/(\b[^:?$]+\b)/g);
    const type = parts.length > 1 ? parts[0] : null;
    const address = !type ? parts[0] : parts[1];

    let recipient = address;
    if (type === 'iban') {
      //recipient = clientCore.eth.getWeb3().eth.Iban.toAddress(address);
    }

    this.props.dispatch(change('createTransaction', 'recipient', recipient));
  };

  renderMenuItem = ({ type, amount, picture }, index) => {
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
          src={CryptoIcons[type.toLowerCase()] || picture}
        />
        <b>{type}</b>
        <span>{amountStr}</span>
      </div>
    );

    return (
      <MenuItem
        key={index}
        innerDivStyle={{
          color: selectedCoin === type ? 'white' : 'rgba(255,255,255,0.6)',
          fontSize: 15,
        }}
        value={type}
        primaryText={item}
      />
    );
  };

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    refactorInput,
    errorText,
    ...custom
  }) => {
    const { selectedCoin, amount } = this.props;
    const { name } = input;
    const width = name === 'recipient' ? '100%' : '50%';
    const mention =
      name === 'amount'
        ? localizedStrings.usdtAmountMention
        : localizedStrings.usdtFeeMention;
    return (
      <div style={{ width, position: 'relative' }}>
        <TextField
          className={styles.feeField}
          style={{ fontSize: 17 }}
          floatingLabelStyle={{ fontSize: 16, top: 34 }}
          floatingLabelText={label}
          fullWidth
          errorText={
            errorText || ((custom.needTouch ? touched : true) && error)
          }
          {...(!refactorInput ? input : refactorInput(input))}
          {...custom}
        />
        {selectedCoin === 'USDT' &&
          (name === 'fee' || name === 'amount') && [
            <div className={styles[`hackDiv${name}`]} />,
            <div className={styles[`mentionDiv${name}`]}>
              <span>{name === 'amount' ? '+' : ''}</span>
              <span>{name === 'amount' ? '0.00000546 BTC' : 'BTC'}</span>
              <IconButton tooltip={mention} tooltipPosition="bottom-start">
                <img className={styles.mentionPng} src={mentionPng} />
              </IconButton>
            </div>,
          ]}
      </div>
    );
  };

  renderToggle = ({
    input: { onChange, value, ...inputProps },
    defaultToggled,
    meta,
    ...props
  }) => {
    return (
      <Toggle
        {...{ ...inputProps, ...props, onToggle: onChange, toggled: !!value }}
      />
    );
  };

  handleAddMemo = () => {
    const modalPlayload = {
      modalType: 'addMemo',
      modalProps: { coinType: this.props.selectedCoin },
    };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  };

  renderAddMemo = ({ tag }) => {
    const returnMemoEle = [
      <IconButton onClick={() => this.handleAddMemo()}>
        <ContentEdit />
      </IconButton>,
      <span>MEMO</span>,
    ];
    if (tag) {
      returnMemoEle[1] = <span>Tag</span>;
      return <div className={styles.addMemoIcon}>{returnMemoEle}</div>;
    }
    const { memo, initMemo } = this.props;
    if (!memo && initMemo) {
      this.props.dispatch({
        type: 'wallet/setMemo',
        payload: '   Signed by      WOOKONG Solo  https://wooko.ng',
      });
    }
    return <div className={styles.addMemoIcon}>{returnMemoEle}</div>;
  };

  renderEstimatedInfo = () => {
    const { selectedCoin } = this.props;
    const { estimatedFee, feeLevel } = this.state;

    switch (selectedCoin) {
      case 'BTC': {
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {!!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} BTC，${feeLevel *
                10} ${localizedStrings.minute}`}
          </div>
        );
      }
    /*  case 'LTC': {
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {!!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} LTC，${feeLevel *
                2} ${localizedStrings.minute}`}
          </div>
        );
      }
      case 'NEO': {
        console.log('renderEstimatedInfo NEO');
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {
              // `${localizedStrings.estimate}: 0 NEO`
            }
          </div>
        );
      }
      case 'GAS': {
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {
              // `${localizedStrings.estimate}: 0 NEO`
            }
          </div>
        );
      }
      case 'CYB': {
        console.log('renderEstimatedInfo CYB');
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {!!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} CYB`}
          </div>
        );
      }
      case 'EOS': {
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {
              // `${localizedStrings.estimate}: 0 EOS`
            }
          </div>
        );
      }
      case 'ETC': {
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {!!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} ETC`}
          </div>
        );
      }*/

      default: {
        return (
          <div
            style={{
              display: 'table',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {!!estimatedFee &&
              `${localizedStrings.estimate}: ${estimatedFee} ETH`}
          </div>
        );
      }
    }
  };

  renderUnitField = () => {
    const {
      settings: { ethDerivePath },
    } = this.props;
    const { unitFieldFocused, anchorEl, unitFieldWidth } = this.state;
    const {
      balances,
      selectedCoin,
      recipient,
      addresses,
      balanceMap,
    } = this.props;
    let showNotActiveMention = false;
    let recipientType = selectedCoin;
    const recipientTypes = validateRecipient(recipient, ethDerivePath);
    if (recipientTypes.indexOf('ETH') > -1) {
      const erc20Types = balances
        .filter(
          ({ type }) =>
            [
              'BTC',
            /*  'ETH',
              'EOS',
              'USDT',
              'XRP',
              'LTC',
              'CYB',
              'ETC',
              'NEO',
              'GAS',*/
            ].indexOf(type) < 0
        )
        .map(({ type }) => type);
      recipientTypes.push(...erc20Types);
    }

    if (
      recipientTypes.length > 0 &&
      recipientTypes.indexOf(recipientType) < 0
    ) {
      recipientType = recipientTypes[0];

      this.props.dispatch({
        type: 'send/setSelectedCoin',
        payload: { coinType: recipientType },
      });
      this.setState({
        unitFieldFocused: false,
        feeLevel: 5,
        estimatedFee: null,
      });
    }
    const balance = balances.find(({ type }) => type === recipientType);
    if (!balance.amount && selectedCoin === 'XRP') {
      showNotActiveMention = true;
    } else if (balance && balance.amount && balance.amount !== 'NaN') {
      showNotActiveMention =
        selectedCoin === 'XRP' &&
        new Big(balance.amount).gte(0) &&
        new Big(balance.amount).lt(20);
    }
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
      let imgSrc = CryptoIcons[balance.type.toLowerCase()];
      if (!imgSrc) {
        if (balanceMap[balance.type.toUpperCase()]) {
          imgSrc = balanceMap[balance.type.toUpperCase()]['picture'];
        } else {
          imgSrc = noExit;
        }
      }

      return (
        <div
          ref={measureRef}
          className={styles.relativeField}
          style={{ marginBottom: 10 }}
        >
          <div
            className={styles.currencyField}
            style={{ position: 'absolute', left: 0, top: 40, width: '100%' }}
          >
            <Avatar
              size={22}
              style={{ width: 22, height: 22, margin: '-1px 0px 1px 0px' }}
              src={imgSrc}
            />
            <b>{balance.type}</b>
            <span>{amountStr}</span>
            <div
              className={
                showNotActiveMention ? styles.miniBalanceError : styles.hiden
              }
            >
              <span className={styles.accountNotActivedSpan}>
                {localizedStrings.XRPNotActive}
              </span>
              <IconButton
                className={styles.accountNotActivedMention}
                tooltip={localizedStrings.accountNotActived}
                tooltipPosition="bottom-left"
                tooltipStyles={{
                  color: 'white',
                  fontSize: 14,
                  width: 100,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                <img className={styles.mentionPng} src={mentionPng} />
              </IconButton>
            </div>
          </div>

          <TextField
            name="unitField"
            floatingLabelText={localizedStrings.coinType}
            floatingLabelFixed
            fullWidth
            floatingLabelStyle={{ fontSize: 16, top: 34 }}
            style={{ fontSize: 17 }}
            underlineStyle={{
              borderColor: unitFieldFocused ? '#ee602b' : '#686868',
            }}
            onFocus={() =>
              this.setState({
                unitFieldFocused: true,
                anchorEl: this.lastFieldParent,
                unitFieldWidth:
                  document.querySelector('input[name*=unitField]')
                    .offsetWidth || 920,
              })
            }
            onBlur={() => this.setState({ unitFieldFocused: false })}
          />
        </div>
      );
    });
    return (
      <div
        className={styles.relativeField}
        ref={ref => {
          this.lastFieldParent = ref;
        }}
      >
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
            {balances &&
              balances
                .filter(
                  ({ type }) =>
                    !recipientTypes.length || recipientTypes.indexOf(type) > -1
                )
                .map((item, index) => {
                  const menuObj = { ...item, picture: '' };
                  if (balanceMap[item.type]) {
                    menuObj.picture = balanceMap[item.type]['picture'];
                  } else {
                    menuObj.picture = noExit;
                  }
                  return this.renderMenuItem(menuObj, index);
                })}
          </Menu>
        </Popover>
      </div>
    );
  };

  render() {
    const {
      handleSubmit,
      valid,
      inProgress,
      recipient,
      fullBalance,
      displayAdvanced,
      selectedCoin,
      memo,
      balances,
      amount,
      fee,
    } = this.props;
    const { balanceNotEnough, XRPBalanceNotEnough } = this.state;
    const balance = balances.find(({ type }) => type === selectedCoin).amount;
    const unavailable = !balance || isNaN(balance);
    const selectedType =
      [
        'XRP',
        /*'USDT',
        'BTC',
        'ETH',
        'LTC',
        'ETC',
        'NEO',
        'GAS',
        'CYB',
        'EOS',*/
      ].indexOf(selectedCoin) > -1
        ? selectedCoin
        : 'ERC20';
    const transferOption = constants.transferOptions[selectedType];
    let balanceNotEnoughERROR =
      selectedCoin === 'USDT'
        ? localizedStrings.btcBalanceNotEnough
        : localizedStrings.exceedBalanceHint;
    let feeNeedTouch = false;
    let xrpUnavailable = false;
    try {
      feeNeedTouch = fee && new Big(fee).eq(0);
      xrpUnavailable =
        selectedCoin === 'XRP' && new Big(fee).plus(20).gt(balance);
      if (
        selectedCoin === 'USDT' &&
        (!balance ||
          balance === '0' ||
          (amount && balance && new Big(amount).minus(balance).gt(0)))
      ) {
        balanceNotEnoughERROR = localizedStrings.usdtBalanceNotEnough;
      }
    } catch (e) {
      console.log('err: ', e);
      feeNeedTouch = false;
    }
    if (selectedCoin === 'XRP') {
      balanceNotEnoughERROR = localizedStrings.xrpBalanceNotEnough;
    }
    if (!recipient) {
      balanceNotEnoughERROR = null;
    }
    return (
      <div className={styles.container}>
        <div className={styles.relativeField} style={{ marginBottom: 10 }}>
          <Field
            component={this.renderTextField}
            name="recipient"
            needTouch
            label={localizedStrings.recipientAddress}
            hintText={localizedStrings.recipientHint}
            floatingLabelFixed
          />

          <div className={styles.icons}>
            <IconButton
              style={{ float: 'right', transform: 'scale(0.85)' }}
              onClick={this.handleQRScan}
            >
              <ScanIcon
                color="rgba(255, 255, 255, 0.5)"
                hoverColor="rgba(255, 255, 255, 0.8)"
              />
            </IconButton>

            <IconButton
              style={{
                float: 'right',
                transform: 'scale(0.85)',
                marginRight: -15,
              }}
            >
              <Dropzone
                onDrop={this.handleSelectQRCode}
                accept="image/*"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <div {...getRootProps()} style={{ outline: 'none' }}>
                      <input {...getInputProps()} />
                      <FolderIcon
                        color="rgba(255, 255, 255, 0.5)"
                        hoverColor="rgba(255, 255, 255, 0.8)"
                      />
                    </div>
                  );
                }}
              </Dropzone>
            </IconButton>
          </div>
        </div>

        {this.renderUnitField()}

        <Field
          style={{ fontSize: 17, width: '100%', marginBottom: 10 }}
          component={this.renderTextField}
          name="amount"
          needTouch
          label={localizedStrings.sendAmount}
          floatingLabelFixed
          errorText={balanceNotEnough ? balanceNotEnoughERROR : null}
          disabled={fullBalance || unavailable}
        />

        <div className={styles.toggleDiv}>
          <Field
            name="fullBalance"
            component={this.renderToggle}
            label={localizedStrings.fullBalance}
            labelPosition="right"
            disabled={unavailable || xrpUnavailable}
          />
        </div>

        <Field
          style={{ fontSize: 17, width: '100%', marginBottom: 10 }}
          component={this.renderTextField}
          needTouch={feeNeedTouch || (false || valid)}
          name="fee"
          label={localizedStrings.fee}
          floatingLabelFixed
          disabled={
            !transferOption.feeEditable || !displayAdvanced || unavailable
          }
        />

        <div
          className={styles.toggleDiv}
          style={{ display: transferOption.advanced ? 'flex' : 'none' }}
        >
          <Field
            name="displayAdvanced"
            component={this.renderToggle}
            label={localizedStrings.advanced}
            labelPosition="right"
            disabled={unavailable}
          />
        </div>
        {['NEO', 'EOS', 'CYB', 'XRP'].includes(selectedType) ? (
          ''
        ) : (
          <div style={{ width: '50%' }} />
        )}
        <div
          className={styles.addMemo}
          style={{
            display:
              transferOption.memo || transferOption.tag ? 'flex' : 'none',
          }}
        >
          <Field
            name="displayAdvanced"
            component={this.renderAddMemo}
            label={localizedStrings.advanced}
            labelPosition="right"
            disabled={unavailable}
            memo={memo}
            tag={transferOption.tag}
          />
        </div>

        {displayAdvanced &&
          transferOption.feeType === constants.feeTypes.multiply && (
            <div
              className={styles.collapse}
              style={{
                width: '60%',
                transform: 'scale(0.8)',
                transformOrigin: 'left',
                marginRight: '40%',
              }}
            >
              <Field
                component={this.renderTextField}
                needTouch
                name="gas"
                label="Gas"
                floatingLabelFixed
                style={{ fontSize: 17, flex: 1 }}
              />
              <Field
                component={this.renderTextField}
                needTouch
                name="gasPrice"
                label="Gas Price"
                floatingLabelFixed
                style={{ fontSize: 17, flex: 1 }}
              />
            </div>
          )}

        {displayAdvanced &&
          transferOption.feeType === constants.feeTypes.multiply &&
          transferOption.nonce && (
            <div
              className={styles.collapse}
              style={{
                width: '30%',
                transform: 'scale(0.8)',
                transformOrigin: 'left',
              }}
            >
              <Field
                component={this.renderTextField}
                needTouch={false}
                name="nonce"
                label="Nonce"
                floatingLabelFixed
              />
            </div>
          )}

        <div className={styles.buttonDiv}>
          <FlatButton
            style={{ float: 'right' }}
            label={localizedStrings.confirmSend}
            labelStyle={{ fontSize: 18 }}
            primary
            disabled={!(valid && recipient) || balanceNotEnough || inProgress}
            onClick={handleSubmit(this.handleCreateTransaction)}
          />
          <FlatButton
            style={{ float: 'right' }}
            label={localizedStrings.clear}
            labelStyle={{ fontSize: 18 }}
            disabled={inProgress}
            onClick={this.handleClearFields}
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

function validate(
  { recipient, amount, gas, gasPrice, fee, nonce },
  { balances, selectedCoin, displayAdvanced }
) {
  const errors = {};
  const balance = balances.find(({ type }) => type === selectedCoin).amount;

  if (!recipient) {
    errors.recipient = localizedStrings.recipientRequired;
  } else {
    const legal = validateRecipient(recipient).length > 0;
    if (!legal) {
      errors.recipient = localizedStrings.recipientInvalid;
    }
  }

  const selectedType =
    [
      'XRP',
     /* 'USDT',
      'BTC',
      'ETH',
      'LTC',
      'ETC',
      'NEO',
      'GAS',
      'CYB',
      'EOS',*/
    ].indexOf(selectedCoin) > -1
      ? selectedCoin
      : 'ERC20';
  const transferOption = constants.transferOptions[selectedType];

  if (
    !Number(amount) ||
    !amount ||
    !/^([1-9][0-9]*)(\.[0-9]*)?$|^(0\.[0-9]*)$/.test(amount)
  ) {
    errors.amount = localizedStrings.amountInvalid;
  } else {
    const parts = (amount + '').split('.');
    if (parts.length === 2 && parts[1].length > transferOption.precision) {
      errors.amount = localizedStrings.amountInvalid;
    }

    if (selectedCoin === 'NEO' && parts.length === 2) {
      // neo只能整数交易
      errors.amount = localizedStrings.amountInvalid_fractionalamount;
    }

    // const balance = balances.find(({ type }) => type === selectedCoin).amount;
    const balanceNotEnoughError =
      selectedCoin === 'USDT'
        ? localizedStrings.btcBalanceNotEnough
        : localizedStrings.balanceNotEnough;
    try {
      const tmpFee = selectedType === 'ERC20' ? 0 : fee;
      if (
        new Big(amount)
          .plus(tmpFee)
          .minus(balance)
          .gt(0) &&
        selectedCoin !== 'USDT'
      ) {
        errors.amount = balanceNotEnoughError;
      }
      if (
        selectedCoin === 'USDT' &&
        (amount && balance && new Big(amount).minus(balance).gt(0))
      ) {
        errors.amount = balanceNotEnoughError;
        if (
          !balance ||
          balance === '0' ||
          (amount && balance && new Big(amount).minus(balance).gt(0))
        ) {
          errors.amount = localizedStrings.usdtBalanceNotEnough;
        }
      }
    } catch (error) {
      errors.amount = balanceNotEnoughError;
    }

    if (
      selectedCoin !== 'XRP' &&
      selectedCoin !== 'USDT' &&
      selectedCoin !== 'BTC' &&
      selectedCoin !== 'ETH' &&
      selectedCoin !== 'ETC' &&
      selectedCoin !== 'LTC' &&
      selectedCoin !== 'NEO' &&
      selectedCoin !== 'GAS' &&
      selectedCoin !== 'CYB' &&
      selectedCoin !== 'EOS'
    ) {
      // erc20
      const ethBalance = balances.find(({ type }) => type === 'ETH').amount;
      if (!parseFloat(ethBalance)) {
        errors.amount = localizedStrings.ethNotEnough;
      }
    }
  }

  let amountInvalid = false;
  try {
    const tmp = new Big(amount);
  } catch (error) {
    errors.amount = localizedStrings.amountInvalid;
    amountInvalid = true;
  }
  const zeroForbiddenTypes = [
    'USDT',
    'XRP',
    'BTC',
    'LTC',
    'NEO',
    'CYB',
    'GAS',
    'EOS',
  ];
  if (
    zeroForbiddenTypes.indexOf(selectedCoin) < 0 &&
    !amountInvalid &&
    parseFloat(amount) === 0 &&
    amount[0] !== '.'
  ) {
    errors.amount = null;
  }

  if (
    displayAdvanced &&
    transferOption.feeType === constants.feeTypes.multiply
  ) {
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

  if (
    !!fee &&
    !(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(fee) || /^[1-9]\d*$/.test(fee))
  ) {
    if (
      (fee === 0 || fee === '0') &&
      (selectedCoin === 'NEO' ||
        selectedCoin === 'GAS' ||
        selectedCoin === 'EOS')
    ) {
      errors.fee = null;
    } else {
      errors.fee = localizedStrings.feeInvalid;
    }
  } else {
    try {
      if (parseFloat(fee) >= 0) {
        if (selectedCoin === 'USDT') {
          const btcBalance = balances.find(({ type }) => type === 'BTC').amount;
          if (fee && balance && new Big(fee).minus(btcBalance).gt(0)) {
            errors.fee = localizedStrings.usdtFeeInvalid;
          }
        } else {
          if (fee && balance && new Big(fee).minus(balance).gt(0)) {
            errors.fee = localizedStrings.otherFeeInvalid;
          }
        }
        const parts = (fee + '').split('.');
        if (parts.length === 2 && parts[1].length > transferOption.precision) {
          errors.fee = localizedStrings.feeInvalid;
        }
      } else {
        errors.fee = localizedStrings.feeInvalid;
      }
    } catch (e) {
      console.log('error: ', e);
    }
  }

  console.log('validate.errors = ', errors);
  return errors;
}

const SendForm = reduxForm({
  form: 'createTransaction',
  initialValues: { amount: '0', fee: '0', gas: '0', gasPrice: '0' },
  validate,
})(Send);

const selector = formValueSelector('createTransaction');

function mapStateToProps(state) {
  const {
    recipient,
    amount,
    fee,
    gas,
    gasPrice,
    fullBalance,
    displayAdvanced,
    nonce,
  } = selector(
    state,
    'recipient',
    'amount',
    'fee',
    'gas',
    'gasPrice',
    'fullBalance',
    'displayAdvanced',
    'nonce'
  );
  const {
    device: { addresses, list: deviceList, eosAddress, COSVersion },
    wallet: { balances: balanceMap, memo, initMemo, tag },
    send: { selectedCoin, inProgress },
    app: { settings },
  } = state;
  const coinTypes = Object.keys(balanceMap);
  // TODO:: 在支持EOS后，这里要加上EOS
  const types = [
    'BTC',
    /*'ETH',
    'EOS',
    'USDT',
    'XRP',
    'LTC',
    'CYB',
    'ETC',
    'NEO',
    'GAS',*/
  ];
  const newSupportCoins = types.concat(
    coinTypes.filter(type => types.indexOf(type) < 0)
  );
  const sortedCoinTypes = newSupportCoins.filter(item => {
    if (item === 'USDT') return COSVersion['3'] >= 25;
    if (item === 'XRP') return COSVersion['3'] >= 26;
    if (types.includes(item)) {
      return addresses[item] || addresses[item] === 'NaN';
    } else {
      return true;
    }
  });
  const balances = sortedCoinTypes
    .map(
      type =>
        types.includes(type)
          ? { type, amount: balanceMap[type] }
          : { type, amount: balanceMap[type].balance }
    )
    .filter(({ type, amount }) => {
      return (
        parseFloat(amount) > 0 ||
        (types.indexOf(type) > -1 && type !== 'GAS') ||
        type === selectedCoin
      );
    });

  const selectedType =
    [
      'XRP',
      'USDT',
      'BTC',
      'ETH',
      'LTC',
      'ETC',
      'NEO',
      'GAS',
      'CYB',
      'EOS',
    ].indexOf(selectedCoin) > -1
      ? selectedCoin
      : 'ERC20';
  const transferOption = constants.transferOptions[selectedType];

  let newAmount = amount;
  const balance = balances.find(({ type }) => type === selectedCoin).amount;
  if (fullBalance) {
    if (types.indexOf(selectedCoin) > -1) {
      try {
        if (
          !!fee &&
          !(
            /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(fee) || /^[1-9]\d*$/.test(fee)
          )
        ) {
          if (
            fee === '0' &&
            (selectedCoin === 'NEO' ||
              selectedCoin === 'GAS' ||
              selectedCoin === 'EOS')
          ) {
            console.log('NEO fee allow 0');
          } else {
            throw localizedStrings.feeInvalid;
          }
        } else {
          if (parseFloat(fee) >= 0) {
            const parts = (fee + '').split('.');
            if (
              parts.length === 2 &&
              parts[1].length > transferOption.precision
            ) {
              throw localizedStrings.feeInvalid;
            }
          } else {
            throw localizedStrings.feeInvalid;
          }
        }
        newAmount =
          fee > balance
            ? '0'
            : new Big(balance).minus(fee).toFixed(transferOption.precision);
        if (selectedCoin === 'USDT') {
          newAmount =
            fee > balance
              ? '0'
              : new Big(balance).toFixed(transferOption.precision);
        } else if (selectedCoin === 'XRP') {
          newAmount = new Big(fee).plus(20).gte(balance)
            ? '0'
            : new Big(balance)
                .minus(fee)
                .minus(20)
                .toFixed(transferOption.precision);
        }
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

  return {
    recipient,
    amount: newAmount,
    addresses,
    eosAddress,
    deviceList,
    selectedCoin,
    inProgress,
    balances,
    fee: newFee,
    gas,
    memo,
    initMemo,
    tag,
    gasPrice,
    nonce,
    fullBalance,
    displayAdvanced,
    balanceMap,
    settings,
  };
}

export default connect(mapStateToProps)(SendForm);
