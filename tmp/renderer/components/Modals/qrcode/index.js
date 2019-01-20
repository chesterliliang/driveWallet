import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import QRCode from 'qrcode.react';

import BaseModal from '../__base';

import styles from './index.scss';

class Modal extends BaseModal {
  render() {
    const { isOpen, value } = this.props;

    const actions = [
      <FlatButton
        label={localizedStrings.closeModal}
        onTouchTap={this.handleDismiss}
      />,
    ];

    return (
      <Dialog
        bodyClassName={styles.container}
        bodyStyle={{ paddingBottom: 0 }}
        contentStyle={{ width: 348 }}
        actionsContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}
        modal
        open={isOpen}
        actions={actions}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, width: 300, background: 'white' }}>
          <QRCode
            value={value}
            size={280}
            level="H"
          />
        </div>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;
