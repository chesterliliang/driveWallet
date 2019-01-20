import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ToastContainer } from 'react-toastify';
import { Modals } from 'components';
import localForage from 'localforage';
import equal from 'deep-equal';

import 'react-toastify/dist/ReactToastify.min.css';

import styles from './app.css';
import muiTheme from '../theme';

injectTapEventPlugin();

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps && !equal(nextProps.settings, this.props.settings)) {
      localizedStrings.setLanguage(nextProps.settings.language);
      const ipc = require('electron').ipcRenderer;
      ipc.send('localizedStrings', window.localizedStrings, nextProps.settings.language);
      localForage.setItem('settings', nextProps.settings);

      this.props.dispatch(routerRedux.replace(nextProps.location.pathname))
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
  }

  render() {
    const { children, modals, locked, outloading, insetting } = this.props;
    const lastModal = modals && modals.slice(-1).pop();
    console.log('locked,outloading,insetting',locked,outloading,insetting,!(locked && (outloading || insetting)))
    const style = !(locked && (outloading || insetting)) ? {} : { pointerEvents: 'none', filter: 'grayscale(95%)' };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.main}>
          {
            !(lastModal && lastModal.modalHover) &&
            <div className={styles.container} style={style}>
              {children}
            </div>
          }

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover={false}
          />

          {modals && modals.map(this.renderModal)}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

function mapStateToProps({ app: { modals, locked, settings, outloading }, device: { insetting }}) {
  return {
    modals,
    locked,
    settings,
    outloading,
    insetting,
  };
}

export default connect(mapStateToProps)(App);
