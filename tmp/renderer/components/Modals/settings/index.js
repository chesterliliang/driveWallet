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
import BaseModal from '../__base';
import styles from './index.scss';
import { List, ListItem } from 'material-ui/List';

const lans = [
  { type: 'zh-Hans', value: '简体中文' },
  { type: 'en', value: 'English' },
];

class Modal extends BaseModal {
  state = {
    lanFieldFocused: false,
    lanFieldWidth: 900,
    anchorEl: null,
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'data/clientCoreInvoke',
      payload: { category: 'driver', fn: 'getAppVersion', args: [0] },
    });
  }

  handleLanChange = (event, type) => {
    this.setState({ lanFieldFocused: false });
    this.props.dispatch({
      type: 'app/setSettings',
      payload: { language: type },
    });
  };

  handleRefresh = () => {
    window.location.reload(true);
  };

  handleChangePin = () => {
    this.props.dispatch({ type: 'device/changepin' });
  };
  handleformat = () => {
    this.props.dispatch({ type: 'device/format' });
  };

  renderMenuItem = ({ type, value }, index) => {
    const {
      settings: { language },
    } = this.props;

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
            {lans && lans.map(this.renderMenuItem)}
          </Menu>
        </Popover>
      </div>
    );
  };

  renderVerField = () => {
    let versionstring = 'App Ver.' + this.props.ElectronVer; // + '    MW Ver.' + this.props.MidWareVer.toString().replace(/,/g, '.');
    if (this.props.deviceNum > 0 && this.props.COSVersion)
      versionstring =
        versionstring +
        '    FW Ver.' +
        this.props.COSVersion.toString().replace(/,/g, '.');
    return <div className={styles.version}>{versionstring}</div>;
  };

  render() {
    const { isOpen, locked } = this.props;
    const style = !locked
      ? {}
      : { pointerEvents: 'none', filter: 'grayscale(95%)' };
    const actions = [
      <FlatButton
        label={localizedStrings.closeModal}
        onTouchTap={this.handleDismiss}
      />,
    ];

    const titleContent = (
      <div className={styles.titleContent}>
        <h3>{localizedStrings.settings}</h3>
        <div>
          <FlatButton
            label={localizedStrings.reload}
            icon={<RefreshIcon />}
            onTouchTap={this.handleRefresh}
          />
        </div>
      </div>
    );

    return (
      <Dialog
        title={titleContent}
        actions={actions}
        bodyClassName={styles.container}
        style={style}
        modal
        open={isOpen}
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
            onTouchTap={this.handleChangePin}
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
            onTouchTap={this.handleformat}
          />
        </List>

        {this.renderLanField()}
        {this.renderVerField()}
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
  app: { settings, locked },
  device: { num: deviceNum, COSVersion, ElectronVer, MidWareVer },
}) {
  return {
    settings,
    deviceNum,
    COSVersion,
    ElectronVer,
    MidWareVer,
    locked,
  };
}

export default connect(mapStateToProps)(Modal);
