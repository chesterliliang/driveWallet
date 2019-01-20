import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import styles from './index.scss';

const tabIcons = {
  images: {
    0: require('assets/icon_tab_accounts.png'),
    1: require('assets/icon_tab_send.png'),
  },
  text: {
    'zh-Hans': {
      0: '账户',
      1: '发送',
    },
    en: {
      0: 'ACCOUNTS',
      1: 'SEND',
    },
  },
};

class Wallet extends React.Component {
  changeRoute = pathname => {
    this.props.dispatch(routerRedux.replace(pathname));
  };

  handleSettingButtonClick = () => {
    const modalPlayload = { modalType: 'Settings', modalProps: {} };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  };

  renderSubItem = (index, isCurrent) => {
    const { language } = this.props;
    const icon = tabIcons.images[index];
    const labelText = tabIcons.text[language][index];
    return (
      <div className={styles.subItem} style={{ opacity: isCurrent ? 1 : 0.5 }}>
        <div
          className={styles.icon}
          style={{
            backgroundImage: `url(${icon})`,
            width: '25px',
            height: '25px',
            marginTop: '10px',
          }}
        />
        <span className={styles.text}>{labelText}</span>
      </div>
    );
  };

  renderSubPageTab = (index, onClick, isCurrent) => {
    return (
      <div
        key={index}
        className={styles.tab}
        style={{ backgroundColor: isCurrent ? '#171717' : 'transparent' }}
      >
        <FlatButton
          backgroundColor={isCurrent ? '#171717' : '#282828'}
          children={this.renderSubItem(index, isCurrent)}
          style={{
            width: 200,
            height: 68,
            borderRadius: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
          disabled={isCurrent}
          onClick={onClick}
        />
      </div>
    );
  };

  renderTabs = subPageIndex => {
    return (
      <div className={styles.tabs}>
        <div className={styles.logo} />
        {this.renderSubPageTab(
          0,
          this.changeRoute.bind(this, '/wallet/overview'),
          subPageIndex === 0
        )}
        {this.renderSubPageTab(
          1,
          this.changeRoute.bind(this, '/wallet/send'),
          subPageIndex === 1
        )}
      </div>
    );
  };

  renderSettingButton = () => {
    return (
      <IconButton
        tooltipPosition="bottom-center"
        tooltip={localizedStrings.settings}
        style={{
          position: 'absolute',
          top: 25,
          right: 15,
          transform: 'scale(0.85)',
        }}
        onTouchTap={this.handleSettingButtonClick}
      >
        <SettingIcon
          color="rgba(255, 255, 255, 0.5)"
          hoverColor="rgba(255, 255, 255, 0.8)"
        />
      </IconButton>
    );
  };

  renderRefreshButton = () => {
    return (
      <IconButton
        tooltipPosition="bottom-center"
        tooltip={localizedStrings.refresh}
        style={{ position: 'absolute', top: 25, right: 65 }}
        onTouchTap={() => {
          this.props.dispatch({ type: 'wallet/getBalances' });
        }}
      >
        <RefreshIcon
          color="rgba(255, 255, 255, 0.5)"
          hoverColor="rgba(255, 255, 255, 0.8)"
        />
      </IconButton>
    );
  };

  render() {
    const { subPageIndex, accessible } = this.props;
    const style = accessible
      ? {}
      : { pointerEvents: 'none', filter: 'grayscale(95%)' };

    return (
      <div className={styles.container} style={style}>
        {this.renderTabs(subPageIndex)}
        {this.renderSettingButton()}
        {this.renderRefreshButton()}
        {this.props.children}
      </div>
    );
  }
}

Wallet.propTypes = {
  subPageIndex: PropTypes.number,
  accessible: PropTypes.bool,
};

function mapStateToProps({
  wallet: { subPageIndex },
  send: { inProgress },
  app: {
    settings: { language },
  },
}) {
  return {
    subPageIndex,
    accessible: !inProgress,
    language,
  };
}

export default connect(mapStateToProps)(Wallet);
