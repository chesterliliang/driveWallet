import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FlatButton from 'material-ui/FlatButton';

import { KeyCard } from 'components';

import styles from './index.scss';

const Status = {
  ing: 0,
  success: 1,
  error: 2,
};

class Initialize extends React.Component {
  state = {
    initStatus: Status.ing,
  };

  componentDidMount() {
    if (this.props.deviceNum > 0) {
      setTimeout(() => {
        this.handleInitialize();
      }, 2000);
    }
  }

  handleInitialize = () => {
    const { threshold } = this.props;

    this.setState({ initStatus: Status.ing });

    this.props.dispatch({
      type: 'device/initialize',
      payload: { threshold },
      onComplete: this.handleInitCallback,
    });
  };

  handleInitCallback = error => {
    if (error) {
      this.setState({ initStatus: Status.error });
    } else {
      this.props.dispatch({ type: 'device/getAddresses' });

      setTimeout(() => {
        this.setState({ initStatus: Status.success });
      }, 1000);
    }
  };

  handleNext = () => {
    this.props.dispatch(routerRedux.replace('/wallet'));
  };

  renderCard = index => {
    return (
      <KeyCard
        key={index}
        index={index}
        connecting
        delay={index * 200}
        hideIndex
      />
    );
  };

  renderMessage = status => {
    switch (status) {
      case Status.error: {
        return (
          <div className={styles.hintArea}>
            <h3>{localizedStrings.initError}</h3>
            <h4>{localizedStrings.retryHint}</h4>
          </div>
        );
      }

      case Status.success: {
        return (
          <div className={styles.hintArea}>
            <h3>{localizedStrings.initSuccess}</h3>
            <h4>{localizedStrings.initSuccessHint}</h4>
          </div>
        );
      }

      default: {
        return (
          <div className={styles.hintArea}>
            <h3
              dangerouslySetInnerHTML={{ __html: localizedStrings.initing }}
            />
            <h4>{localizedStrings.initingHint}</h4>
          </div>
        );
      }
    }
  };

  renderButton = status => {
    switch (status) {
      case Status.error: {
        return (
          <FlatButton
            style={{ position: 'absolute', bottom: 30, right: 30 }}
            label={localizedStrings.checkAndRetry}
            labelStyle={{ fontSize: 20 }}
            secondary
            onClick={() => setTimeout(this.handleInitialize, 300)}
          />
        );
      }

      case Status.success: {
        const { addresses } = this.props;

        if (Object.keys(addresses).length > 0) {
          return (
            <FlatButton
              style={{ position: 'absolute', bottom: 30, right: 30 }}
              label={localizedStrings.enter}
              labelStyle={{ fontSize: 20 }}
              primary
              onClick={this.handleNext}
            />
          );
        }

        return null;
      }

      default:
        return null;
    }
  };

  render() {
    const { deviceNum } = this.props;
    const { initStatus } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.bottom}>
          {this.renderMessage(initStatus)}
          {this.renderButton(initStatus)}
        </div>

        <div className={styles.upper}>
          {Array.from(Array(deviceNum)).map((__, index) =>
            this.renderCard(index)
          )}
        </div>
      </div>
    );
  }
}

Initialize.propTypes = {
  deviceNum: PropTypes.number,
  threshold: PropTypes.number,
};

function mapStateToProps(
  { device: { num: deviceNum, addresses } },
  {
    location: {
      query: { m },
    },
  }
) {
  return {
    deviceNum,
    addresses,
    threshold: parseInt(m, 10),
  };
}

export default connect(mapStateToProps)(Initialize);
