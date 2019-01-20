import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import QrReader from 'react-qr-reader';

import BaseModal from '../__base';

import styles from './index.scss';

class Modal extends BaseModal {
  handleScan = (data) => {
    if (data) {
      this.props.onResult(data);
      this.handleDismiss();
    }
  }

  handleError = (err) => {
    window.showError(localizedStrings.readQRError);
    console.error(err);
  }

  render() {
    const { isOpen } = this.props;

    const actions = [
      <FlatButton
        label={localizedStrings.closeModal}
        onTouchTap={this.handleDismiss}
      />,
    ];

    return (
      <Dialog
        title={localizedStrings.qrScanTitle}
        titleStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        bodyClassName={styles.container}
        bodyStyle={{ paddingBottom: 0 }}
        contentStyle={{ width: 408 }}
        actionsContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}
        modal
        open={isOpen}
        actions={actions}
      >
        <div>
          <QrReader
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: 360 }}
          />
        </div>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onResult: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  onResult: () => {},
};

export default Modal;
