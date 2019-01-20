import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Modals } from 'components';
import localForage from 'localforage';
import equal from 'deep-equal';

import 'react-toastify/dist/ReactToastify.min.css';

import styles from './app.css';
import muiTheme from '../theme';
import ProgressBar from '../components/ProcessBar';

const ipc = require('electron').ipcRenderer;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'data/clientCoreInvoke',
      payload: {
        category: 'driver',
        fn: 'getAppVersion',
        args: [0],
        handleType: 'getAppVersion',
      },
    });
  }

  componentDidMount() {
    ipc.send('checkupdate', true);
    ipc.on('startUpdate', (event, message) => {
      if (message) {
        this.props.dispatch({
          type: 'app/progressSettings',
          payload: { startUpdate: true },
        });
      }
    });
    ipc.on('downloadProgress', (event, progressObj) => {
      console.log('downloadProgress', progressObj);
      this.props.dispatch({
        type: 'app/saveProgrssInfo',
        payload: progressObj,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { progressFull } = nextProps;
    if (nextProps && !equal(nextProps.settings, this.props.settings)) {
      localizedStrings.setLanguage(nextProps.settings.language);
      ipc.send(
        'localizedStrings',
        window.localizedStrings,
        nextProps.settings.language
      );
      localForage.setItem('settings', nextProps.settings);

      this.props.dispatch(routerRedux.replace(nextProps.location.pathname));
    }
    if (progressFull && progressFull !== 'init') {
      setTimeout(() => {
        toast.dismiss(this.processToastId);
        this.props.dispatch({
          type: 'app/progressSettings',
          payload: { toastNum: 0, startUpdate: false },
        });
        this.props.dispatch({
          type: 'app/setState',
          payload: { progressFull: 'init' },
        });
        this.props.dispatch({
          type: 'app/saveProgrssInfo',
          payload: {
            percent: 0,
          },
        });
      }, 4000);
    }
  }

  renderModal = ({ modalType, modalOpen, modalProps }, index) => {
    const Modal = modalType && Modals[modalType];

    return (
      <Modal
        key={index}
        isOpen={modalOpen}
        dispatch={this.props.dispatch}
        {...modalProps}
      />
    );
  };

  renderToast = () => {
    const { toastNum, startUpdate, progressObj } = this.props;
    // console.log('toastNum', toastNum);
    // console.log('startUpdate', startUpdate);
    // console.log('progressObj', progressObj);
    // console.log('🚀🚀🚀🚀', startUpdate && toastNum !== 1 && progressObj && progressObj.percent !== 0);
    if (
      startUpdate &&
      toastNum !== 1 &&
      progressObj &&
      progressObj.percent !== 0
    ) {
      this.processToastId = toast(
        <ProgressBar className={styles.progressBar} />,
        {
          // type: 'info',
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          bodyClassName: styles.progressBody,
          className: styles.progress,
        }
      );
      this.props.dispatch({
        type: 'app/progressSettings',
        payload: { toastNum: 1 },
      });
    }
  };

  render() {
    const { children, modals, locked, outloading, insetting } = this.props;
    const lastModal = modals && modals.slice(-1).pop();
    console.log(
      'locked,outloading,insetting',
      locked,
      outloading,
      insetting,
      !(locked && (outloading || insetting))
    );
    const style = !(locked && (outloading || insetting))
      ? {}
      : { pointerEvents: 'none', filter: 'grayscale(95%)' };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.main}>
          {!(lastModal && lastModal.modalHover) && (
            <div className={styles.container} style={style}>
              {children}
            </div>
          )}

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover={false}
          />

          {modals && modals.map(this.renderModal)}
          {this.renderToast()}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

function mapStateToProps({
  app: {
    modals,
    locked,
    settings,
    outloading,
    progressObj,
    toastNum,
    startUpdate,
    progressFull,
  },
  device: { insetting },
}) {
  // eslint-disable-line max-len
  return {
    modals,
    locked,
    settings,
    outloading,
    insetting,
    progressObj,
    toastNum,
    startUpdate,
    progressFull,
  };
}

export default connect(mapStateToProps)(App);
