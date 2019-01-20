import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FlatButton from 'material-ui/FlatButton';
import equal from 'deep-equal';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import { KeyCard } from 'components';

import styles from './index.scss';

const ErrorCode = {
  noError: 0,
  notAllConnected: 1,
  notSameGroup: 2,
  notSameStatus: 3,
  notReadyStatus:4,
};

class Connecting extends React.Component {
  state = {
    COSPath: null,
  }

  componentDidMount() {
    console.log('componentDidMount');
    if (this.props.deviceNum > 0) {
      this.props.dispatch({ type: 'device/tryConnect', payload: { delay: 1000 } });
    }
  }

  componentWillReceiveProps(nextProps) {
    //if (nextProps && nextProps.LcdState != this.props.LcdState) {
    //  this.setState({LcdState:nextProps.LcdState});
    //}
    if (nextProps && nextProps.deviceNum !== this.props.deviceNum && nextProps.deviceNum > 0) {
      this.props.dispatch({ type: 'device/tryConnect', payload: { delay: 1000 } });
    }

    if (nextProps && nextProps.COSVersion && !this.props.COSVersion) {
      this.handleCheckDownloadedCOS(nextProps.COSVersion);
    }

    if (nextProps &&
      !equal(this.props.deviceList, nextProps.deviceList) &&
      nextProps.deviceList.length === nextProps.deviceNum &&
      (nextProps.deviceNum > 0 && nextProps.deviceList.length > 0)) {

      const { code, data } = this.checkDevices(nextProps.deviceNum, nextProps.deviceList);
      if (code !== ErrorCode.noError || !data.initialized) {
        return;
      }

      if (this.state.COSPath) {
        this.handleUpdateCOS(this.state.COSPath);
      } else {
        this.props.dispatch({ type: 'device/getAddresses' });
      }
    }
    else {
      console.log('else')
    }
    if (nextProps && nextProps.addresses && nextProps.addresses !== this.props.addresses) {
      this.props.dispatch(routerRedux.replace('/wallet'));
    }
  }

  handleCheckDownloadedCOS = async (version) => {
    const path = await clientCore.cos.checkDownloaded(version);
    if (path) {
      this.setState({ COSPath: path });
    }
  }

  handleUpdateCOS = async (COSPath) => {
    this.props.dispatch({
      type: 'data/clientCoreInvoke',
      payload: { category: 'cos', fn: 'burn', args: [COSPath] },
      onComplete: (err, data) => {
        const resultCode = data.result || parseInt(data, 10);

        if (err || resultCode === 0x80000008) { // 若更新cos被取消，则跳过进入后续流程
          console.log('resultCode = ', resultCode)
          this.setState({ COSPath: null });
          this.props.dispatch({ type: 'device/getAddresses' });
        }
        else {
          window.showToast(localizedStrings.updateCosStopTips);
          this.props.dispatch({ type: 'device/tryConnect', payload: { delay: 1000 } });
        }
      },
    });
  }

  handleNext = (initialized) => {
    const { deviceNum, deviceList } = this.props;
    if (deviceNum < 2 || deviceList.length < 2) { //个人版钱包
      if (initialized) {
        this.props.dispatch(routerRedux.replace('/wallet'));
      } else {
        this.props.dispatch(routerRedux.replace('/initialize'));
      }
      return;
    }

    if (initialized) {
      this.props.dispatch(routerRedux.replace('/wallet'));
    } else {
      this.props.dispatch(routerRedux.replace('/select-m'));
    }
  }

  handleSettingButtonClick = () => {
    console.log('[Connecting][handleSettingButtonClick]')
    const modalPlayload = { modalType: 'Settings', modalProps: {} };
    this.props.dispatch({ type: 'device/setloopstop', payload: { insetting: true } });
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  }

  handleimportmne = () => {
    this.props.dispatch(routerRedux.replace('/importm'));
  }

  handleRefresh = () => {
    this.props.dispatch({ type: 'device/clearAllDevices' });
    this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'getDevNum', args: [] } });
  }

  checkDevices = (deviceNum, deviceList) => {
    if (this.props.LcdState && this.props.LcdState !=1 && this.props.LcdState != 0x400) {
      return { code: ErrorCode.notReadyStatus };
    }
    const connectedDevices = deviceList.filter(info => info && !!info.SN);
    if (!deviceNum || connectedDevices.length < deviceNum) {
      return { code: ErrorCode.notAllConnected };
    }

    const groupKeys =
      deviceList
        .map(({ groupKey }) => groupKey)
        .reduce((tmp, groupKey) => (tmp.indexOf(groupKey) > -1 ? tmp : [...tmp, groupKey]), []);

    const groupMembers = groupKeys.reduce((tmp, groupKey) => {
      return {
        ...tmp,
        [groupKey]: deviceList.filter(({ groupKey: tmpKey }) => tmpKey === groupKey),
      };
    }, {});

    const groupMemberNums = groupKeys.map(groupKey => groupMembers[groupKey].length);
    const maxMemberNum = Math.max(...groupMemberNums);
    const groupKey = groupKeys[groupMemberNums.indexOf(maxMemberNum)];

    const isSameGroup = groupKeys.length === 1;
    if (!isSameGroup) {
      return { code: ErrorCode.notSameGroup, data: { groupKey } };
    }

    // 检查所有星钥的状态是否一
    const initializedCount = deviceList.filter(({ SesStatus: initializing }) => !initializing).length;
    if (initializedCount > 0 && initializedCount !== deviceList.length) {
      return { code: ErrorCode.notSameStatus }; // 有星钥未完成初始化
    }

    return { code: ErrorCode.noError, data: { initialized: initializedCount > 0 } };
  }

  renderCard = (index, deviceList, error) => {
    const checkedDevices = deviceList.filter(info => !!info);
    const connecting = index === checkedDevices.length;
    const connected = index < checkedDevices.length && !!deviceList[index].SN;

    let safe = true;
    if (error) {
      const { code, data } = error;

      switch (code) {
        case ErrorCode.notSameGroup: {
          const { groupKey } = data;
          safe = deviceList[index].groupKey === groupKey;
          break;
        }

        case ErrorCode.notSameStatus: {
          safe = !deviceList[index].SesStatus;
          break;
        }

        default:
      }
    }

    return (
      <KeyCard
        key={index}
        index={index}
        connected={connected}
        connecting={connecting}
        safe={safe}
        sn={connected ? deviceList[index].SN : ''}
      />
    );
  }

  renderMessage = (code, data) => {
    switch (code) {
      case ErrorCode.notSameGroup: {
        return (
          <div className={styles.hintArea}>
            <h3>{localizedStrings.connectError}</h3>
            <h4>{localizedStrings.connectHintNotSameGroup}</h4>
          </div>
        );
      }

      case ErrorCode.notSameStatus: {
        return (
          <div className={styles.hintArea}>
            <h3>{localizedStrings.connectError}</h3>
            <h4>{localizedStrings.connectHintNotInited}</h4>
          </div>
        );
      }

      case ErrorCode.notReadyStatus: {
        return (
          <div className={styles.hintArea}>
            <h3>{localizedStrings.connecting}</h3>
            <h4>{localizedStrings.connectingHintNotReady}</h4>
          </div>
        );
      }

      case ErrorCode.noError: {
        const { deviceNum, deviceList } = this.props;
        if (deviceNum < 1 || deviceList.length < 1) {
          return (
            <div className={styles.hintArea} style={{ justifyContent: 'center' }} >
              <h4 style={{ color: '#white', fontSize: '20px' }}>{localizedStrings.connectSuccess}</h4>
            </div>
          );
        }

        if (deviceNum > 1 || deviceList.length > 1) {
          return (
            <div className={styles.hintArea} style={{ justifyContent: 'center' }} >
              <h4 style={{ color: '#white', fontSize: '20px' }}>{localizedStrings.connectHintTooMuchDev}</h4>
            </div>
          );
        }

        if (data.initialized) {
          const { addresses } = this.props;

          if (Object.keys(addresses).length > 0) {
            return (
              <div className={styles.hintArea} style={{ justifyContent: 'center' }} >
                <h4 style={{ color: '#white', fontSize: '20px' }}>{localizedStrings.connectSuccess}</h4>
              </div>
            );
          }

          if (this.state.COSPath) {
            return (
              <div className={styles.hintArea}>
                <h3>{localizedStrings.updatingCOS}</h3>
                <h4>{localizedStrings.updatingCOSHint}</h4>
              </div>
            );
          }

          return (
            <div className={styles.hintArea}>
              <h3>{localizedStrings.fetchingAddresses}</h3>
            </div>
            //<h4>{localizedStrings.fetchingHint}</h4>
          );
        }

        return (
          <div className={styles.hintArea}>
            <h3>{localizedStrings.readyToInit}</h3>
            <h4 dangerouslySetInnerHTML={{ __html: localizedStrings.readyHint }}></h4>
          </div>
        );
      }

      default:
        return (
          <div className={styles.hintArea} >
            <h3>{localizedStrings.connecting}</h3>
            <h4>{localizedStrings.connectingHint}</h4>
          </div>
        );
    }
  }

  renderSettingButton = () => {
    return (
      <IconButton
        tooltipPosition="bottom-center"
        tooltip={localizedStrings.settings}
        style={{ position: 'absolute', top: 25, right: 15, transform: 'scale(0.85)' }}
        onTouchTap={this.handleSettingButtonClick}
      >
        <SettingIcon color="rgba(255, 255, 255, 0.5)" hoverColor="rgba(255, 255, 255, 0.8)" />
      </IconButton>
    );
  }

  renderButton = (code, data) => {
    switch (code) {
      case ErrorCode.notSameGroup:
      case ErrorCode.notSameStatus: {
        return (
          <FlatButton
            style={{ position: 'absolute', bottom: 30, right: 30 }}
            label={localizedStrings.retry}
            labelStyle={{ fontSize: 20 }}
            secondary
            onTouchTap={this.handleRefresh}
          />
        );
      }

      case ErrorCode.noError: {
        const { deviceNum, deviceList } = this.props;

        if (data.initialized && deviceNum > 0 && deviceList.length > 0) {
          return null
          // const { addresses } = this.props;

          // if (Object.keys(addresses).length < 1) {
          //   return null;
          // }
        }

        //ChangePin暂时只用来测试功能，请随意修改
        return (
          <div>
            <FlatButton
              style={{ position: 'absolute', bottom: 30, right: 30 }}
              label={localizedStrings.createNewWallet}
              labelStyle={{ fontSize: 20 }}
              primary
              onTouchTap={this.handleNext.bind(this, data.initialized)}
            />
            <FlatButton
              style={{ position: 'absolute', bottom: 30, left: 30 }}
              label={localizedStrings.importmemo}
              labelStyle={{ fontSize: 20 }}
              primary
              onTouchTap={this.handleimportmne}
            />
          </div>
        );
      }

      default:
        return null;
    }
  }

  render() {
    const { deviceNum, deviceList } = this.props;
    const { code, data } = this.checkDevices(deviceNum, deviceList);

    let upper = null;
    if (deviceNum < 1) {
      upper = (
        <div className={styles.hintArea} style={{ justifyContent: 'center', background: 'transparent' }} >
          <h4 style={{ color: 'white', fontSize: '28px', marginBottom: 20 }}>{localizedStrings.noKeys}</h4>
          <FlatButton
            label={localizedStrings.retry}
            labelStyle={{ fontSize: 20 }}
            secondary
            onTouchTap={this.handleRefresh}
            backgroundColor={'rgba(255,255,255,0.05)'}
          />
        </div>
      );
    } else if (deviceNum > 7) {
      upper = (
        <div className={styles.hintArea} style={{ justifyContent: 'center', background: 'transparent' }} >
          <h4 style={{ color: 'white', fontSize: '28px', marginBottom: 20 }}>{localizedStrings.tooManyKeys}</h4>
          <FlatButton
            label={localizedStrings.retry}
            labelStyle={{ fontSize: 20 }}
            secondary
            onTouchTap={this.handleRefresh}
            backgroundColor={'rgba(255,255,255,0.05)'}
          />
        </div>
      );
    } else {
      upper =
        Array
          .from(Array(deviceNum))
          .map((__, index) => this.renderCard(index, deviceList, code && { code, data }));
    }

    return (
      <div className={styles.container}>
        {this.renderSettingButton()}
        <div className={styles.bottom}>
          {this.renderMessage(code, data)}
          {this.renderButton(code, data)}
        </div>

        <div className={styles.upper}>
          {upper}
        </div>
      </div>
    );
  }
}

Connecting.propTypes = {
  deviceNum: PropTypes.number,
  deviceList: PropTypes.array,
};

function splitDevicesByGroup(list) {
  return list.map((device) => {
    const { Hash: hash, N: n, M: m } = device;

    return {
      groupKey: `${hash}_${n}_${m}`,
      ...device,
    };
  });
}

function mapStateToProps({ device: { num: deviceNum, list, addresses, COSVersion, LcdState } }) {
  let lcdState = ((LcdState & 0x80000000) ? 0 : LcdState)
  return {
    deviceNum,
    deviceList: splitDevicesByGroup(list),
    addresses,
    COSVersion,
    LcdState: lcdState,
  };
}

export default connect(mapStateToProps)(Connecting);
