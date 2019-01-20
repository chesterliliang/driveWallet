import { init } from '@sentry/electron';

const initSentry = () => {
  init({
    dsn: 'https://669e2de5b3ac488398cb41592cba7cce@sentry.nbltrust.com/9',
  });
};

export default initSentry;
