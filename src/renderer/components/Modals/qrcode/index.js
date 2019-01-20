import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import QRCode from 'qrcode.react';

import BaseModal from '../__base';
import downloadQRIcon from 'assets/download.png';

import styles from './index.scss';

class Modal extends BaseModal {
  download = downloadRef => {
    const { coinType } = this.props;
    let canvas = document.querySelector('canvas');
    if (!canvas) {
      return requestAnimationFrame(this.download);
    }
    setTimeout(() => {
      /* canvas 可能是空白的或者 qrcode.react 正在绘制 */
      canvas = document.querySelector('canvas');
      downloadRef.href = canvas.toDataURL();
      downloadRef.download = `${coinType}.png`;
    }, 1000);
  };

  render() {
    const { isOpen, value } = this.props;

    const actions = [
      <FlatButton
        label={localizedStrings.closeModal}
        onClick={this.handleDismiss}
      />,
    ];

    return (
      <Dialog
        bodyClassName={styles.container}
        bodyStyle={{ paddingBottom: 0 }}
        contentStyle={{ width: 348 }}
        actionsContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 10,
        }}
        modal
        open={isOpen}
        actions={actions}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            width: 300,
            background: 'white',
          }}
        >
          <div className={styles.QRCodeBorder}>
            <div className={styles.shadowDiv} />
            <div className={styles.hackDiv} />
            <div className={styles.QRDiv}>
              <a className={styles.downloadQRIcon} ref={this.download}>
                <img src={downloadQRIcon} />
              </a>
            </div>
            <div className={styles.addressQRcode}>
              <QRCode value={value} size={280} level="H" />
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  coinType: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;
