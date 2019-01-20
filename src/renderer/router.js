import React from 'react';
import { connect } from 'dva';
import { Router, Route } from 'dva/router';

import App from './routes/app';

function RouterConfig({ history, app: { _store: store } }) {
  const onEnter = (nextState, replace, cb) => {
    const {
      device: { list, addresses },
      routing: {
        locationBeforeTransitions: { pathname },
      },
    } = store.getState();

    if (pathname === '/') {
      replace('/connecting');
    } else if (
      pathname !== '/connecting' &&
      (list.length < 1 || Object.keys(addresses).length < 1)
    ) {
      replace('/connecting');
    }

    cb();
  };

  const ConfirmLaunchPage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/ConfirmLaunch').default);
    });
  };

  const ConnectingPage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/Connecting').default);
    });
  };

  const SelectThresholdPage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/SelectThreshold').default);
    });
  };

  const InitializePage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/Initialize').default);
    });
  };

  const SingleModePage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/SingleMode').default);
    });
  };

  const ImportMemoPage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/ImportMemo').default);
    });
  };

  const WalletPage = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/Wallet').default);
    });
  };

  const WalletOverview = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/Wallet/overview').default);
    });
  };

  const WalletSend = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/Wallet/send').default);
    });
  };
  const WalletProfile = (nextState, cb) => {
    require.ensure([], require => {
      cb(null, require('./routes/Wallet/profile').default);
    });
  };

  const empty = connect()(() => {
    return <div />;
  });

  return (
    <Router history={history}>
      <Route path="/" component={App} onEnter={onEnter}>
        <Route path="/confirm-launch" getComponent={ConfirmLaunchPage} />
        <Route path="/connecting" getComponent={ConnectingPage} />
        <Route path="/select-m" getComponent={SelectThresholdPage} />
        <Route path="/initialize" getComponent={InitializePage} />
        <Route path="/single" getComponent={SingleModePage} />
        <Route path="/importm" getComponent={ImportMemoPage} />

        <Route path="/wallet" getComponent={WalletPage}>
          <Route path="overview" getComponent={WalletOverview} />
          <Route path="send" getComponent={WalletSend} />
          <Route path="profile" getComponent={WalletProfile} />
        </Route>

        <Route path="*" component={empty} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
