import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ChainValidation } from 'cybexjs';
import SVGInline from 'react-svg-inline';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'dva';
import BaseModal from '../__base';
import styles from './index.scss';

const lans = [
  { type: 'zh-Hans', value: '简体中文' },
  { type: 'en', value: 'English' },
];

class registerModal extends BaseModal {
  state = {};
  componentWillMount() {
    this.handleupdateCaptcha();
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
    if (!(valid && accountname && captcha) || inProgress) {
      return;
    }
    const payload = {
      coinType,
      accountName: accountname,
      captchaid: captchaimg.id,
      captcha,
      address: addresses[this.props.coinType],
    };
    console.log('[payload] = ', payload);
    this.props.dispatch({
      type: 'wallet/Register',
      payload,
      onComplete: this.handleupdateCaptcha,
    });
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

  renderField = () => {
    const name = 'accountname';
    return (
      <div className={styles.textfield}>
        <Field
          component={this.renderTextField}
          name={name}
          label={localizedStrings.registerAccount}
          floatingLabelFixed
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

  render() {
    const {
      isOpen,
      accountname,
      captcha,
      inProgress,
      valid,
      coinType,
    } = this.props;

    const actions = [];
    const titleContent = (
      <div className={styles.titleContent}>
        <h3>{coinType + localizedStrings.register}</h3>
      </div>
    );

    return (
      <Dialog
        title={titleContent}
        actions={actions}
        bodyClassName={styles.container}
        modal
        open={isOpen}
      >
        {this.renderField()}
        {this.renderFieldcaptcha()}
        <div style={{ marginTop: 30 }}>
          <FlatButton
            style={{ float: 'left' }}
            primary
            label={localizedStrings.registerSubmit}
            disabled={!(valid && accountname && captcha) || inProgress}
            onTouchTap={this.handleSubmit}
          />
          <FlatButton
            style={{ float: 'right' }}
            label={localizedStrings.closeModal}
            onTouchTap={this.handleDismiss}
          />
        </div>
      </Dialog>
    );
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
function validate({ accountname }) {
  const errors = {};
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
    wallet: { captchaimg },
    device: { addresses },
    send: { inProgress },
  } = state;
  return {
    accountname,
    captcha,
    captchaimg,
    addresses,
    inProgress,
  };
}

export default connect(mapStateToProps)(Register);
