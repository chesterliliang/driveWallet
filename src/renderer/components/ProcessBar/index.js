import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import LinearProgress from 'material-ui/LinearProgress';

import styles from './index.scss';

const mapStateToProps = ({ app }) => ({
  app,
  progressObj: app.progressObj,
});

class ProcessBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    progressObj: PropTypes.object,
  };

  render() {
    let percent = 0.0;
    let totalM = 0.0;
    if (this.props.progressObj) {
      const { total } = this.props.progressObj;
      percent = this.props.progressObj.percent;
      totalM = total / (1024 * 1024);
    }
    return (
      <div className={styles.updateInfoContainer}>
        <div
          className={percent === 100 ? styles.whiteFontNoM : styles.whiteFont}
        >
          {this.props.progressObj
            ? `${localizedStrings.newSize} ${totalM.toFixed(2)}M，${
                percent === 100
                  ? localizedStrings.downloadSuccessful
                  : localizedStrings.downloading
              }`
            : localizedStrings.willDownload}
        </div>
        <div className={styles.progressInfo}>
          <LinearProgress
            mode="determinate"
            color={percent === 100 ? '#ec5526' : 'rgba(236, 85, 38, 0.70)'}
            value={percent}
            style={{ height: '14px', width: '80%' }}
          />
          <span
            className={percent === 100 ? styles.processPer : styles.greenFont}
          >{`${percent.toFixed(2)}%`}</span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProcessBar);
