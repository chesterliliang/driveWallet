import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'dva';

import BaseModal from '../__base';

import styles from './index.scss';

class addMemoModal extends BaseModal {
  handleSubmit = () => {
    const { memo, tag, coinType } = this.props;
    if (coinType === 'XRP') {
      this.props.dispatch({
        type: 'wallet/setTag',
        payload: tag,
      });
    } else {
      this.props.dispatch({
        type: 'wallet/setMemo',
        payload: memo,
      });
    }
    this.handleDismiss();
  };

  memoEle = ({
    input,
    meta: { touched, error },
    refactorInput,
    errorText,
    ...custom
  }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 768,
        }}
      >
        <TextField
          fullWidth
          autoFocus
          errorText={errorText || (touched && error)}
          {...(!refactorInput ? input : refactorInput(input))}
          {...custom}
        />
      </div>
    );
  };

  renderMemo = () => {
    const { coinType } = this.props;
    const name = coinType === 'XRP' ? 'tag' : 'memo';
    return <Field component={this.memoEle} name={name} floatingLabelFixed />;
  };

  render() {
    const { isOpen, valid, coinType } = this.props;
    const actions = [
      <FlatButton
        label={localizedStrings.closeMemoModal}
        onClick={this.handleDismiss}
      />,
      <FlatButton
        style={{ float: 'left' }}
        primary
        label={localizedStrings.memoSubmit}
        disabled={!valid}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        bodyClassName={styles.container}
        bodyStyle={{ paddingBottom: 0 }}
        contentStyle={{ width: 768 }}
        title={coinType === 'XRP' ? 'Tag' : 'Memo'}
        actionsContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 10,
        }}
        modal
        open={isOpen}
        actions={actions}
      >
        {this.renderMemo()}
      </Dialog>
    );
  }
}

addMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

addMemoModal.defaultProps = {
  isOpen: false,
};

const validate = (values, { coinType }) => {
  const { memo, tag } = values;
  const errors = {};
  if (coinType === 'XRP') {
    if (!/^([0-9])*$/.test(tag) || tag > 4294967295) {
      errors['tag'] = localizedStrings.tagUnvalid;
    }
  } else {
    if (memo && memo.length > 140) {
      errors['memo'] = localizedStrings.memoLenError;
    }
    if (memo && memo.length <= 140) {
      const result = memo
        .split('')
        .every(item => item.charCodeAt() >= 0x20 && item.charCodeAt() <= 0x7e);
      if (!result) {
        errors['memo'] = localizedStrings.memoInputError;
      }
    }
    if (!memo) {
      errors['memo'] = null;
    }
  }
  return errors;
};

const addMemo = reduxForm({
  form: 'addMemoModal',
  validate,
})(addMemoModal);

const selector = formValueSelector('addMemoModal');

function mapStateToProps(state) {
  const memo = selector(state, 'memo');
  const tag = selector(state, 'tag');
  const {
    wallet: {
      disableCancel,
      SNUsedStatus,
      memo: memoOri,
      initMemo,
      tag: tagOri,
    },
    device: { addresses, confirmOK },
    send: { inProgress },
  } = state;
  return {
    memo,
    addresses,
    inProgress,
    disableCancel,
    SNUsedStatus,
    confirmOK,
    memoOri,
    initMemo,
    tag,
    initialValues: {
      memo: initMemo
        ? '   Signed by      WOOKONG Solo  https://wooko.ng'
        : memoOri,
      tag: tagOri,
    },
  };
}

export default connect(mapStateToProps)(addMemo);
