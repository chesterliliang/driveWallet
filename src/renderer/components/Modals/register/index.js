import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ChainValidation } from 'cybexjs';
import SVGInline from 'react-svg-inline';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'dva';
import { clipboard } from 'electron';
import { toast } from 'react-toastify';

import BaseModal from '../__base';
import styles from './index.scss';

class registerModal extends BaseModal {
  state = {};
  componentWillMount() {
    const { coinType } = this.props;
    switch (coinType) {
      case 'CYB':
        this.handleupdateCaptcha();
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    const { SNUsedStatus, coinType } = this.props;
    if (SNUsedStatus && coinType === 'EOS') {
      this.props.dispatch({
        type: 'wallet/keyConfirmAddress',
        payload: { coinType: 'EOS' },
      });
      this.eosStatusToastId = window.showToast(
        localizedStrings.confirmCopyAddressOnKey,
        null,
        false,
        false
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.confirmOK !== this.props.confirmOK &&
      nextProps.confirmOK !== 'init'
    ) {
      const { statusToastId } = this.props;
      toast.dismiss(statusToastId);
      if (nextProps.confirmOK) {
        toast.dismiss(this.eosStatusToastId);
      }
    }
  }

  componentWillUnmount() {
    const { statusToastId } = this.props;
    toast.dismiss(statusToastId);
    toast.dismiss(this.eosStatusToastId);
    this.props.dispatch({
      type: 'device/setKeyConfirmAddressStatus',
      payload: 'init',
    });
  }

  handleSubmit = () => {
    const {
      accountname,
      captcha,
      inProgress,
      valid,
      coinType,
      captchaimg,
      addresses,
    } = this.props;
    // this.statusToastId = window.showToast(
    //   localizedStrings.confirmRegAddressOnKey,
    //   null,
    //   false,
    //   false,
    // );
    switch (coinType) {
      case 'CYB': {
        if (!(valid && accountname && captcha) || inProgress) {
          return;
        }
        const payload = {
          coinType,
          accountName: accountname,
          captchaid: captchaimg.id,
          captcha,
          address: addresses[coinType],
        };
        console.log('[payload] = ', payload);
        this.props.dispatch({ type: 'wallet/Register', payload });
        break;
      }
      case 'EOS': {
        if (!(valid && accountname) || inProgress) {
          return;
        }
        const payload = {
          coinType,
          app_id: 2,
          accountName: accountname,
          address: addresses[this.props.coinType],
          validation: {
            SN: addresses.EOSSN,
            SN_sig: addresses.EOSCODE,
            public_key: addresses.EOSKEYHEX,
            public_key_sig: addresses.EOSKEYSIG,
          },
        };
        console.log('[payload] = ', payload);
        this.props.dispatch({ type: 'wallet/Register', payload });
        break;
      }
      default:
        break;
    }
    // this.handleDismiss();
  };

  handleupdateCaptcha = () => {
    this.props.dispatch({
      type: 'data/clientCoreInvoke',
      payload: { category: 'cyb', fn: 'getCaptcha', args: [0] },
    });
  };

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    refactorInput,
    errorText,
    ...custom
  }) => {
    return (
      <TextField
        style={{ fontSize: 17 }}
        floatingLabelStyle={{ fontSize: 17, top: 24 }}
        floatingLabelText={label}
        fullWidth
        errorText={errorText || (touched && error)}
        {...(!refactorInput ? input : refactorInput(input))}
        {...custom}
      />
    );
  };
  renderCaptchaField = ({
    input,
    label,
    meta: { touched, error },
    refactorInput,
    errorText,
    ...custom
  }) => {
    return (
      <TextField
        style={{ fontSize: 17 }}
        floatingLabelStyle={{ fontSize: 17, top: 44 }}
        floatingLabelText={label}
        fullWidth
        errorText={errorText || (touched && error)}
        {...(!refactorInput ? input : refactorInput(input))}
        {...custom}
      />
    );
  };

  renderField = defaultValue => {
    const name = 'accountname';
    return [
      <div className={(styles.textfield, styles.relativefield)}>
        <span className={styles.registerPublicKey}>
          {localizedStrings.registerPublicKey}
        </span>
        <TextField
          disabled
          defaultValue={defaultValue}
          style={{ fontSize: 15 }}
          inputStyle={{ color: 'white' }}
          floatingLabelStyle={{ fontSize: 17, top: 24, color: 'red' }}
          fullWidth
        />
      </div>,
      <div className={(styles.textfield, styles.relativefield)}>
        <Field
          component={this.renderTextField}
          name={name}
          label={localizedStrings.registerAccount}
          floatingLabelFixed
        />
      </div>,
    ];
  };

  renderEOSDisableField = ({ disabled, defaultValue }) => {
    const { confirmOK } = this.props;
    const opacity = confirmOK && confirmOK !== 'init' ? 1 : 0.6;
    const userSelect = confirmOK && confirmOK !== 'init' ? '' : 'none';
    return (
      <div className={`${styles.textfield} ${styles.relativefield}`}>
        <TextField
          disabled={disabled}
          defaultValue={defaultValue}
          style={{ fontSize: 15 }}
          inputStyle={{ color: 'white', opacity, userSelect }}
          fullWidth
        />
      </div>
    );
  };

  renderFieldcaptcha = () => {
    const name = 'captcha';
    return (
      <div className={styles.captchafield}>
        <Field
          component={this.renderCaptchaField}
          name={name}
          label={localizedStrings.registerCaptcha}
          floatingLabelFixed
        />
        <div style={{ marginBottom: 4 }}>
          {this.props.captchaimg &&
          this.props.captchaimg.id &&
          this.props.captchaimg.id.length ? (
            <SVGInline
              svg={this.props.captchaimg.data}
              onClick={this.handleupdateCaptcha}
            />
          ) : (
            <label
              className={styles.captchaLabel}
              htmlFor=""
              onClick={this.handleupdateCaptcha}
            >
              {localizedStrings.registerLoading}
            </label>
          )}
        </div>
      </div>
    );
  };

  handleCopy = () => {
    const { confirmOK, addresses, coinType } = this.props;
    if (!confirmOK || confirmOK === 'init') {
      return false;
    }
    clipboard.writeText(addresses[coinType]);
    window.showToast(localizedStrings.copiedToClipboard);
    return true;
  };

  handleClose = () => {
    const { statusToastId } = this.props;
    toast.dismiss(statusToastId);
    toast.dismiss(this.eosStatusToastId);
    this.handleDismiss();
  };

  render() {
    const {
      isOpen,
      accountname,
      captcha,
      inProgress,
      valid,
      coinType,
      disableCancel,
      SNUsedStatus,
      addresses,
      confirmOK,
    } = this.props;
    const cybSubmitStatus = !(valid && accountname && captcha) || inProgress;
    const eosSubmitStattus = !(valid && accountname) || inProgress;
    const coinAddress =
      addresses[coinType] === 'NaN'
        ? addresses['CYBORIGIN']
        : addresses[coinType];
    const actions = [
      <FlatButton
        style={{ float: 'right' }}
        label={localizedStrings.closeModal}
        disabled={disableCancel}
        onClick={this.handleClose}
      />,
    ];
    if (SNUsedStatus) {
      actions.pop();
      actions.push(
        <FlatButton
          style={{ float: 'right' }}
          label={localizedStrings.closeModal}
          disabled={!confirmOK || confirmOK === 'init'}
          onClick={this.handleClose}
        />
      );
      actions.push(
        <FlatButton
          label={localizedStrings.copyPbkey}
          disabled={!confirmOK || confirmOK === 'init'}
          onClick={this.handleCopy}
        />
      );
    } else {
      actions.unshift(
        <FlatButton
          style={{ float: 'left' }}
          primary
          label={localizedStrings.registerSubmit}
          disabled={eosSubmitStattus}
          onClick={this.handleSubmit}
        />
      );
    }
    const titleContent = (
      <div className={styles.titleContent}>
        <h3>{coinType + localizedStrings.register}</h3>
      </div>
    );

    switch (coinType) {
      case 'CYB':
        return (
          <Dialog
            title={titleContent}
            bodyClassName={styles.container}
            modal
            open={isOpen}
          >
            {this.renderField(coinAddress)}
            {this.renderFieldcaptcha()}
            <div style={{ marginTop: 30 }}>
              <FlatButton
                style={{ float: 'left' }}
                primary
                label={localizedStrings.registerSubmit}
                disabled={cybSubmitStatus}
                onClick={this.handleSubmit}
              />
              <FlatButton
                style={{ float: 'right' }}
                label={localizedStrings.closeModal}
                disabled={disableCancel}
                onClick={this.handleClose}
              />
            </div>
          </Dialog>
        );
      // break;
      case 'EOS':
        return (
          <Dialog
            title={titleContent}
            bodyClassName={styles.container}
            actionsContainerStyle={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
            actions={actions}
            modal
            open={isOpen}
          >
            {!SNUsedStatus
              ? this.renderField(coinAddress)
              : this.renderEOSDisableField({
                  defaultValue: coinAddress,
                  disabled: true,
                })}
          </Dialog>
        );
      // break;
      default:
        break;
    }
  }
}

registerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  coinType: PropTypes.string.isRequired,
};
function matchAccountNameError(errstr) {
  if (errstr.indexOf('Account name should start with a letter') >= 0) {
    return localizedStrings.registerAccountErrStartWithLetter;
  }
  if (errstr.indexOf('Each account segment should start with a letter') >= 0) {
    return localizedStrings.registerAccountErrLetter;
  }
  if (errstr.indexOf('Account name should be longer') >= 0) {
    return localizedStrings.registerAccountErrLonger;
  }
  if (errstr.indexOf('Account name should be shorter') >= 0) {
    return localizedStrings.registerAccountErrShorter;
  }
  if (errstr.indexOf('Account name should have only letters') >= 0) {
    return localizedStrings.registerAccountErrOnlyldd;
  }
}
function validate({ accountname }, { coinType }) {
  const errors = {};
  switch (coinType) {
    case 'CYB':
      if (ChainValidation.is_account_name_error(accountname)) {
        errors['accountname'] = matchAccountNameError(
          ChainValidation.is_account_name_error(accountname)
        );
        console.log('is_account_name_error = ', errors['accountname']);
      } else if (!ChainValidation.is_cheap_name(accountname)) {
        errors['accountname'] = localizedStrings.registerNotCheapNmae;
        // '包含至少一个横杠、数字或者不含元音字母'

        console.log('is_cheap_name = ', errors['accountname']);
      }
      break;
    case 'EOS':
      if (accountname && !/^[1-5a-z]{12}$/.test(accountname)) {
        errors['accountname'] = localizedStrings.registerAccountErrEOSld;
      }
      break;
    default:
      break;
  }

  return errors;
}

registerModal.defaultProps = {
  coinType: '',
  isOpen: false,
};

const Register = reduxForm({
  form: 'preparingregister',
  validate,
})(registerModal);

const selector = formValueSelector('preparingregister');

function mapStateToProps(state) {
  const { accountname, captcha } = selector(state, 'accountname', 'captcha');
  const {
    wallet: { captchaimg, disableCancel, SNUsedStatus, statusToastId },
    device: { addresses, confirmOK },
    send: { inProgress },
  } = state;
  return {
    accountname,
    captcha,
    captchaimg,
    addresses,
    inProgress,
    disableCancel,
    SNUsedStatus,
    confirmOK,
    statusToastId,
  };
}

export default connect(mapStateToProps)(Register);
