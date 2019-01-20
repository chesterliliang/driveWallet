import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FlatButton from 'material-ui/FlatButton';

import styles from './index.scss';

class SelectThreshold extends React.Component {
  state = {
    threshold: Math.max(this.props.deviceNum - 2, 2),
  }

  handleConfirm = () => {
    this.props.dispatch(routerRedux.replace(`/initialize?m=${this.state.threshold}`));
  }

  handleChangeThreshold = (delta, enabled) => {
    if (!enabled) {
      return;
    }

    this.setState(({ threshold }) => ({ threshold: threshold + delta }));
  }

  renderThreshold = (index) => {
    const { threshold } = this.state;

    return (
      <li key={index} style={{ transform: `translate(${-100 * (threshold - 1)}%)` }}><a>{index + 1}</a></li>
    );
  }

  render() {
    const { deviceNum } = this.props;
    const { threshold } = this.state;
    const leftArrowEnabled = threshold > Math.max(Math.ceil(deviceNum / 2), 2);
    const rightArrowEnabled = threshold < deviceNum;
    const leftArrowBg = leftArrowEnabled ? require('assets/btn_triangle_normal.png') : require('assets/btn_triangle_disabled.png');
    const rightArrowBg = rightArrowEnabled ? require('assets/btn_triangle_normal.png') : require('assets/btn_triangle_disabled.png');

    return (
      <div className={styles.container}>
        <div className={styles.bottom}>
          <div className={styles.hintArea}>
            <h3>{localizedStrings.selectThreshold}</h3>
            <h4 dangerouslySetInnerHTML={{ __html: localizedStrings.minThresholdHint }}></h4>
          </div>

          <div className={styles.buttonDiv}>
            <FlatButton
              style={{ float: 'right' }}
              label={localizedStrings.next}
              labelStyle={{ fontSize: 20 }}
              primary
              onTouchTap={this.handleConfirm}
            />
          </div>
        </div>

        <div className={styles.upper}>
          <div className={styles.card}>
            <div
              className={styles.leftArrow}
              style={{ backgroundImage: `url(${leftArrowBg})` }}
              onClick={this.handleChangeThreshold.bind(this, -1, leftArrowEnabled)}
            />
            <ul>
              { Array.from(Array(deviceNum)).map((__, index) => this.renderThreshold(index)) }
            </ul>
            <div
              className={styles.rightArrow}
              style={{ backgroundImage: `url(${rightArrowBg})` }}
              onClick={this.handleChangeThreshold.bind(this, 1, rightArrowEnabled)}
            />
          </div>
        </div>
      </div>
    );
  }
}

SelectThreshold.propTypes = {
  deviceNum: PropTypes.number,
};

function mapStateToProps({ device: { num: deviceNum } }) {
  return {
    deviceNum,
  };
}

export default connect(mapStateToProps)(SelectThreshold);
