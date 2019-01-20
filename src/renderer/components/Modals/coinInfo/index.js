import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Clipboard from 'react-copy-to-clipboard';
import { connect } from 'dva';
import { toast } from 'react-toastify';
import { clipboard } from 'electron';
import QRCode from 'qrcode.react';
import downloadQRIcon from 'assets/download.png';

import BaseModal from '../__base';
import styles from './index.scss';

const ETHDerivePath = {
  fourLevel: [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000],
  fiveLevel: [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000, 0x00000000],
};

const mapStateToProps = ({ device, app }) => ({
  device,
  settings: app.settings,
  confirmOK: device.confirmOK,
});

class coinInfo extends BaseModal {
  componentDidMount() {
    const {
      coinType,
      settings: { ethDerivePath },
    } = this.props;
    if (coinType === 'ETH') {
      this.props.dispatch({
        type: 'wallet/keyConfirmAddress',
        payload: { coinType, derivePath: ETHDerivePath[ethDerivePath] },
      });
    } else {
      this.props.dispatch({
        type: 'wallet/keyConfirmAddress',
        payload: { coinType },
      });
    }
    this.statusToastId = window.showToast(
      localizedStrings.confirmAddressOnKey,
      null,
      false,
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.confirmOK !== this.props.confirmOK &&
      nextProps.confirmOK &&
      nextProps.confirmOK !== 'init'
    ) {
      toast.dismiss(this.statusToastId);
    }
  }

  componentWillUnmount() {
    toast.dismiss(this.statusToastId);
    this.props.dispatch({
      type: 'device/setKeyConfirmAddressStatus',
      payload: false,
    });
    window.dismissLoading();
    this.props.dispatch({ type: 'app/setState', payload: { locked: false } });
  }

  handleCopy = () => {
    const { confirmOK, addressOri } = this.props;
    if (!confirmOK || confirmOK === 'init') {
      return false;
    }
    clipboard.writeText(addressOri);
    window.showToast(localizedStrings.copiedToClipboard);
    return true;
  };

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
    const { isOpen, coinType, addressOri, confirmOK } = this.props;
    const actions = [
      <FlatButton
        label={localizedStrings.copyAddress}
        disabled={!confirmOK || confirmOK === 'init'}
        onClick={this.handleCopy}
      />,
    ];
    if (confirmOK && confirmOK !== 'init') {
      actions.unshift(
        <FlatButton
          label={localizedStrings.closeModal}
          onClick={this.handleDismiss}
        />
      );
    }

    return (
      <Dialog
        title={`${coinType} ${localizedStrings.checkAddressInfo}`}
        actionsContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 10,
          flexDirection:
            confirmOK && confirmOK !== 'init' ? 'row' : 'row-reverse',
        }}
        contentStyle={{ width: 417 }}
        modal
        open={isOpen}
        actions={actions}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 320,
            width: '100%',
          }}
        >
          {confirmOK && confirmOK !== 'init' ? (
            <div className={styles.QRCodeBorder}>
              <div className={styles.shadowDiv} />
              <div className={styles.hackDiv} />
              <div className={styles.QRDiv}>
                <a className={styles.downloadQRIcon} ref={this.download}>
                  <img src={downloadQRIcon} />
                </a>
              </div>
              <div className={styles.addressQRcode}>
                <QRCode value={addressOri} size={200} level="H" />
              </div>
            </div>
          ) : (
            <img
              className={styles.QRCode}
              alt={localizedStrings.waitConfirm}
              src=""
            />
          )}
          {confirmOK && confirmOK !== 'init' ? (
            <Clipboard onCopy={() => this.handleCopy()} text={addressOri}>
              <span className={styles.addressInfo}>{addressOri}</span>
            </Clipboard>
          ) : (
            <span className={`${styles.addressInfo} ${styles.disableCopy}`}>
              {addressOri}
            </span>
          )}
        </div>
      </Dialog>
    );
  }
}

coinInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  coinType: PropTypes.string.isRequired,
};

coinInfo.defaultProps = {
  isOpen: false,
};

export default connect(mapStateToProps)(coinInfo);
