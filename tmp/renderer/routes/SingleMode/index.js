import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';

import styles from './index.scss';

class SingleMode extends React.Component {
  componentDidMount() {
    console.log('[singlemode][componentDidMount]')
    this.props.dispatch({ type: 'device/setloopstop', payload: { insetting: true } });
  }

  onItemClick = (index) => {
    switch (index) {
      case 0: {
        this.props.dispatch({ type: 'device/changepin'});
        // this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'changePIN', args: [0] } });
        break;
      }
      case 1: {
        this.props.dispatch({ type: 'device/format' });
        // this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'format', args: [0] } });
        break;
      }

      default:
    }
  }

  changeRoute = (pathname) => {
    this.props.dispatch(routerRedux.replace(pathname));
  }

  handleSettingButtonClick = () => {
    const modalPlayload = { modalType: 'Settings', modalProps: { } };
    this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
  }

  renderSubPageTab = (current, index, label, onClick) => {
    const isCurrent = current === index;

    const labelStyle = { paddingLeft: 15, paddingRight: 15, fontSize: '14px' };
    if (isCurrent) {
      labelStyle.color = 'white';
    }

    return (
      <div key={index} className={styles.tab} style={{ backgroundColor: isCurrent ? '#171717' : 'transparent' }}>
        <FlatButton
          backgroundColor={isCurrent ? '#171717' : '#282828'}
          style={{ width: 200, height: 68, borderRadius: 0 }}
          label={label}
          labelStyle={labelStyle}
          disabled={isCurrent}
          onClick={onClick}
        />
      </div>
    );
  }

  renderTabs = (subPageIndex) => {
    return (
      <div className={styles.tabs}>
        {this.renderSubPageTab(subPageIndex, 0, localizedStrings.keymanageMode, this.changeRoute.bind(this, '/single'))}
      </div>
    );
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

  render() {
    const { subPageIndex } = this.props;

    return (
      <div className={styles.container}>
        {this.renderTabs(subPageIndex)}
        {this.renderSettingButton()}

        <List style={{ paddingTop: 70 }}>
          <ListItem
            primaryText={localizedStrings.modifyPINOption}
            secondaryText={localizedStrings.modifyPINOptionHint}
            style={{ paddingLeft: 80, paddingRight: 80 }}
            innerDivStyle={{ transform: 'scale(1.3)', transformOrigin: 'left', padding: '30px 0' }}
            onTouchTap={this.onItemClick.bind(this, 0)}
          />
        </List>
        <List style={{ paddingTop: 70 }}>
          <ListItem
            primaryText={localizedStrings.format}
            secondaryText={localizedStrings.formatHint}
            style={{ paddingLeft: 80, paddingRight: 80 }}
            innerDivStyle={{ transform: 'scale(1.3)', transformOrigin: 'left', padding: '30px 0' }}
            onTouchTap={this.onItemClick.bind(this, 1)}
          />
        </List>
      </div>
    );
  }
}

SingleMode.propTypes = {
  subPageIndex: PropTypes.number,
};

SingleMode.defaultProps = {
  subPageIndex: 0,
};

function mapStateToProps({ wallet: { subPageIndex } }) {
  return {
    subPageIndex,
  };
}

export default connect(mapStateToProps)(SingleMode);
