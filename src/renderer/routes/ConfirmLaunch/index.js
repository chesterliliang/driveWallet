import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import FlatButton from 'material-ui/FlatButton';

import styles from './index.scss';

class ConfirmLaunch extends React.Component {
  handleConfirm = () => {
    this.props.dispatch(routerRedux.replace('/connecting'));
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.bottom}>
          <div className={styles.hintArea}>
            <h3
              dangerouslySetInnerHTML={{
                __html: localizedStrings.confirmLaunchText,
              }}
            />
            <h4>{localizedStrings.confirmLaunchHint}</h4>
          </div>

          <FlatButton
            style={{ position: 'absolute', bottom: 30, right: 30 }}
            label={localizedStrings.confirmLaunchBtn}
            labelStyle={{ fontSize: 20 }}
            primary
            onClick={this.handleConfirm}
          />
        </div>

        <div className={styles.upper}>
          <div className={styles.card} />
        </div>
      </div>
    );
  }
}

ConfirmLaunch.propTypes = {};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ConfirmLaunch);
