import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { withContentRect } from 'react-measure';
import RefreshIcon from 'material-ui/svg-icons/action/autorenew';
import { connect } from 'dva';
import { List, ListItem } from 'material-ui/List';
import _ from 'lodash';

import BaseModal from '../__base';
import styles from './index.scss';

const ipc = require('electron').ipcRenderer;

let appUpdateInfo = null;
let cosUpdateInfo = null;

const lans = [
  { type: 'zh-Hans', value: '简体中文' },
  { type: 'en', value: 'English' },
];

const Fiat_Type = [
  {
    type: 'USD',
    value: 'USD',
  },
  {
    type: 'CNY',
    value: 'CNY',
  },
];

const ETH_DERIVE_PATH = [
  {
    type: 'fourLevel',
    value: "m/44'/60'/0'/0/",
    pathArr: [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000],
  },
  {
    type: 'fiveLevel',
    value: "m/44'/60'/0'/0/0",
    pathArr: [0, 0x8000002c, 0x8000003c, 0x80000000, 0x00000000, 0x00000000],
  },
];

class Modal extends BaseModal {
  state = {
    lanFieldFocused: false,
    ethPathFieldFocused: false,
    fiatTypeFieldFocused: false,
    lanFieldWidth: 900,
    ethPathFieldWidth: 900,
    fiatTypeFieldWidth: 900,
    anchorEl: null,
    ethAnchorEl: null,
    fiatTypeAnchorEl: null,
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'data/clientCoreInvoke',
      payload: { category: 'driver', fn: 'getAppVersion', args: [0] },
    });
    const { remote } = require('electron'); // eslint-disable-line global-require
    window.clientCore.cos.checkCOSUpdate(2000);
    appUpdateInfo = remote.getGlobal('appUpdateInfo');
    cosUpdateInfo = remote.getGlobal('cosUpdateInfo');
  }

  handleLanChange = (event, type) => {
    this.setState({ lanFieldFocused: false });
    this.props.dispatch({
      type: 'app/setSettings',
      payload: { language: type },
    });
  };

  handleETHDerivePathChange = (event, value) => {
    this.setState({ ethPathFieldFocused: false });
    window.showToast(localizedStrings.ETHDerivePathChange, null, 2000, true);
    this.props.dispatch({
      type: 'app/setSettings',
      payload: {
        ethDerivePath: value,
      },
    });
    setTimeout(() => window.location.reload(true), 3000);
  };

  handleFiatTypeChange = (event, value) => {
    const { balances } = this.props;
    this.setState({ fiatTypeFieldFocused: false });
    this.props.dispatch({
      type: 'app/setSettings',
      payload: {
        fiatType: value,
      },
    });
    this.props.dispatch({
      type: 'wallet/getFiatBalances',
      payload: { coins: Object.keys(balances), fiatType: value },
    });
  };

  handleRefresh = () => {
    window.clientCore.childProcessSpeed();
    window.location.reload(true);
  };

  handleChangePin = () => {
    this.props.dispatch({ type: 'device/changepin' });
  };
  handleformat = () => {
    this.props.dispatch({ type: 'device/format' });
  };

  renderMenuItem = ({ type, value }, index, renderType) => {
    const {
      settings: { language, ethDerivePath, fiatType },
    } = this.props;
    switch (renderType) {
      case 'lan': {
        return (
          <MenuItem
            key={index}
            innerDivStyle={{
              color: language === type ? 'white' : 'rgba(255,255,255,0.6)',
              fontSize: 15,
            }}
            value={type}
            primaryText={value}
          />
        );
      }
      case 'fiat': {
        return (
          <MenuItem
            key={index}
            innerDivStyle={{
              color: fiatType === type ? 'white' : 'rgba(255,255,255,0.6)',
              fontSize: 15,
            }}
            value={type}
            primaryText={value}
          />
        );
      }
      default: {
        return (
          <MenuItem
            key={index}
            innerDivStyle={{
              color: ethDerivePath === type ? 'white' : 'rgba(255,255,255,0.6)',
              fontSize: 15,
            }}
            value={type}
            primaryText={value}
          />
        );
      }
    }
  };

  renderFiatType = () => {
    const {
      fiatTypeFieldFocused,
      fiatTypeAnchorEl,
      fiatTypeFieldWidth,
    } = this.state;
    const {
      settings: { fiatType },
    } = this.props;
    const ItemToMeasure = withContentRect('bounds')(
      ({ measureRef, contentRect }) => {
        return (
          <div ref={measureRef} className={styles.relativeField}>
            <TextField
              floatingLabelText={localizedStrings.FiatType}
              floatingLabelFixed
              value={Fiat_Type.find(({ type }) => type === fiatType).value}
              fullWidth
              floatingLabelStyle={{ fontSize: 16, top: 34 }}
              style={{ fontSize: 17 }}
              underlineStyle={{
                borderColor: fiatTypeFieldFocused ? '#ee602b' : '#686868',
              }}
              onFocus={() =>
                this.setState({
                  fiatTypeFieldFocused: true,
                  fiatTypeAnchorEl: this.pathParent,
                  fiatTypeFieldWidth: contentRect.bounds.width,
                })
              }
              onBlur={() => this.setState({ fiatTypeFieldFocused: false })}
            />
          </div>
        );
      }
    );

    return (
      <div
        ref={ref => {
          this.pathParent = ref;
        }}
      >
        <ItemToMeasure />
        <Popover
          open={fiatTypeFieldFocused}
          anchorEl={fiatTypeAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{
            marginTop: 0,
            marginRight: 0,
            marginLeft: '18px',
            background: '#202020',
          }}
          onRequestClose={() => this.setState({ fiatTypeFieldFocused: false })}
        >
          <Menu
            autoWidth={false}
            maxHeight={130}
            width={fiatTypeFieldWidth}
            value={fiatType}
            onChange={this.handleFiatTypeChange}
          >
            {Fiat_Type &&
              Fiat_Type.map((item, index) =>
                this.renderMenuItem(item, index, 'fiat')
              )}
          </Menu>
        </Popover>
      </div>
    );
  };

  renderETHDerivePath = () => {
    const { ethPathFieldFocused, ethAnchorEl, ethPathFieldWidth } = this.state;
    const {
      settings: { ethDerivePath },
    } = this.props;
    const ItemToMeasure = withContentRect('bounds')(
      ({ measureRef, contentRect }) => {
        return (
          <div ref={measureRef} className={styles.relativeField}>
            <TextField
              floatingLabelText={localizedStrings.ETHDerivePath}
              floatingLabelFixed
              value={
                ETH_DERIVE_PATH.find(({ type }) => type === ethDerivePath).value
              }
              fullWidth
              floatingLabelStyle={{ fontSize: 16, top: 34 }}
              style={{ fontSize: 17 }}
              underlineStyle={{
                borderColor: ethPathFieldFocused ? '#ee602b' : '#686868',
              }}
              onFocus={() =>
                this.setState({
                  ethPathFieldFocused: true,
                  ethAnchorEl: this.pathParent,
                  ethPathFieldWidth: contentRect.bounds.width,
                })
              }
              onBlur={() => this.setState({ ethPathFieldFocused: false })}
            />
            <div className={styles.ETHDerivePathMention}>
              {ethDerivePath === 'fourLevel'
                ? localizedStrings.ETHDerivePathDefaultMention
                : localizedStrings.ETHDerivePathMention}
            </div>
          </div>
        );
      }
    );

    return (
      <div
        ref={ref => {
          this.pathParent = ref;
        }}
      >
        <ItemToMeasure />
        <Popover
          open={ethPathFieldFocused}
          anchorEl={ethAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{
            marginTop: 70,
            marginRight: 0,
            marginLeft: '18px',
            background: '#202020',
          }}
          onRequestClose={() => this.setState({ ethPathFieldFocused: false })}
        >
          <Menu
            autoWidth={false}
            maxHeight={130}
            width={ethPathFieldWidth}
            value={ethDerivePath}
            onChange={this.handleETHDerivePathChange}
          >
            {ETH_DERIVE_PATH &&
              ETH_DERIVE_PATH.map((item, index) =>
                this.renderMenuItem(item, index, 'path')
              )}
          </Menu>
        </Popover>
      </div>
    );
  };

  renderLanField = () => {
    const { lanFieldFocused, anchorEl, lanFieldWidth } = this.state;
    const {
      settings: { language },
    } = this.props;

    const ItemToMeasure = withContentRect('bounds')(
      ({ measureRef, contentRect }) => {
        return (
          <div ref={measureRef} className={styles.relativeField}>
            <TextField
              floatingLabelText={localizedStrings.language}
              floatingLabelFixed
              value={lans.find(({ type }) => type === language).value}
              fullWidth
              floatingLabelStyle={{ fontSize: 16, top: 34 }}
              style={{ fontSize: 17 }}
              underlineStyle={{
                borderColor: lanFieldFocused ? '#ee602b' : '#686868',
              }}
              onFocus={() =>
                this.setState({
                  lanFieldFocused: true,
                  anchorEl: this.fieldParent,
                  lanFieldWidth: contentRect.bounds.width,
                })
              }
              onBlur={() => this.setState({ lanFieldFocused: false })}
            />
          </div>
        );
      }
    );

    return (
      <div
        ref={ref => {
          this.fieldParent = ref;
        }}
      >
        <ItemToMeasure />
        <Popover
          open={lanFieldFocused}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{
            marginTop: 70,
            marginRight: 0,
            marginLeft: '18px',
            background: '#202020',
          }}
          onRequestClose={() => this.setState({ lanFieldFocused: false })}
        >
          <Menu
            autoWidth={false}
            maxHeight={130}
            width={lanFieldWidth}
            value={language}
            onChange={this.handleLanChange}
          >
            {lans &&
              lans.map((item, index) =>
                this.renderMenuItem(item, index, 'lan')
              )}
          </Menu>
        </Popover>
      </div>
    );
  };

  renderVerField = () => {
    let versionstring = `${localizedStrings.setttingSW} ${
      this.props.ElectronVer
    }`; // + '    MW Ver.' + this.props.MidWareVer.toString().replace(/,/g, '.');
    if (this.props.deviceNum > 0 && this.props.COSVersion) {
      versionstring = `${versionstring}    ${
        localizedStrings.setttingFW
      } ${this.props.COSVersion.toString().replace(/,/g, '.')}`;
    }
    return <div className={styles.version}>{versionstring}</div>;
  };

  handleUpdate = () => {
    const { progressFull, progressObj } = this.props;
    if (progressFull || !progressObj) {
      ipc.send('optionalUpdate', true);
    } else {
      ipc.send('optionalUpdate', false);
    }
  };

  showHomePage = () => {
    const { shell } = require('electron');
    shell.openExternal('https://wooko.ng');
  };

  render() {
    const { isOpen, locked, COSVersion, deviceNum, settings } = this.props;
    let versionstring = `${localizedStrings.setttingSW} ${
      this.props.ElectronVer
    }`;
    let versionMentionstring = '';
    if (deviceNum > 0 && COSVersion) {
      versionstring = `${versionstring}    ${
        localizedStrings.setttingFW
      } ${COSVersion.toString().replace(/,/g, '.')}`;
    }

    if (
      appUpdateInfo &&
      !appUpdateInfo.newVersion &&
      (cosUpdateInfo && !cosUpdateInfo.newVersion)
    ) {
      versionMentionstring = `( ${localizedStrings.alreadyUpdateMention} )`;
    } else {
      versionMentionstring = `( ${localizedStrings.updateMention}${
        appUpdateInfo && appUpdateInfo.newVersion
          ? ` ${localizedStrings.updateSpanSW}: ${appUpdateInfo.version}`
          : ''
      }${
        cosUpdateInfo && cosUpdateInfo.newVersion
          ? ` ${localizedStrings.updateSpanFW}: ${cosUpdateInfo.version}`
          : ''
      } )`;
    }
    const style = !locked
      ? {}
      : { pointerEvents: 'none', filter: 'grayscale(95%)' };
    const actions = [
      <div
        onClick={this.showHomePage}
        style={{
          marginLeft: 33,
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        https://wooko.ng
      </div>,
      <FlatButton
        label={localizedStrings.closeModal}
        onClick={this.handleDismiss}
      />,
    ];

    const titleContent = (
      <div className={styles.titleContent}>
        <h3>{localizedStrings.settings}</h3>
        <div>
          <FlatButton
            label={localizedStrings.reload}
            icon={<RefreshIcon />}
            onClick={this.handleRefresh}
          />
        </div>
      </div>
    );

    return (
      <Dialog
        title={titleContent}
        actions={actions}
        actionsContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 10,
        }}
        bodyClassName={styles.container}
        style={style}
        modal
        open={isOpen}
        autoScrollBodyContent
        bodyStyle={{ borderColor: 'transparent', minHeight: 250 }}
      >
        <List style={{ paddingTop: 0 }}>
          <ListItem
            primaryText={localizedStrings.modifyPINOption}
            secondaryText={localizedStrings.modifyPINOptionHint}
            style={{ paddingLeft: 18, paddingRight: 0 }}
            innerDivStyle={{
              transform: 'scale(1.0)',
              transformOrigin: 'left',
              padding: '30px 0',
            }}
            onClick={this.handleChangePin}
          />
          <ListItem
            primaryText={localizedStrings.format}
            secondaryText={localizedStrings.formatHint}
            style={{ paddingLeft: 18, paddingRight: 0 }}
            innerDivStyle={{
              transform: 'scale(1.0)',
              transformOrigin: 'left',
              padding: '30px 0',
            }}
            onClick={this.handleformat}
          />
          <ListItem
            primaryText={localizedStrings.checkUpdate}
            secondaryText={
              <div>
                {versionstring}
                <span style={{ marginLeft: 10, color: 'rgb(228,80,39)' }}>
                  {versionMentionstring}
                </span>
              </div>
            }
            style={{ paddingLeft: 18, paddingRight: 0 }}
            innerDivStyle={{
              transform: 'scale(1.0)',
              transformOrigin: 'left',
              padding: '30px 0',
            }}
            onClick={_.throttle(this.handleUpdate, 3000, {
              trailing: false,
            })}
          />
        </List>
        {this.renderFiatType()}
        {this.renderETHDerivePath()}
        {this.renderLanField()}
      </Dialog>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};

function mapStateToProps({
  app: { settings, locked, progressFull, progressObj },
  device: { num: deviceNum, COSVersion, ElectronVer, MidWareVer },
  wallet: { balances },
}) {
  return {
    settings,
    deviceNum,
    COSVersion,
    ElectronVer,
    MidWareVer,
    locked,
    progressObj,
    progressFull,
    balances,
  };
}

export default connect(mapStateToProps)(Modal);
