import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import Clipboard from 'react-copy-to-clipboard';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import Tappable from 'react-tappable';
import classnames from 'classnames';

import Theme from 'theme';

import styles from './index.scss';

const { textColor, disabledTextColor } = Theme.flatButton;

class CopyToClipboard extends React.Component {
  state = {
    copied: false,
    timeoutId: null,
  };

  componentWillUnmount() {
    const { timeoutId } = this.state;

    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }

  onCopy = () => {
    const { onCopy, cooldown } = this.props;

    this.setState({
      copied: true,
      timeoutId: setTimeout(() => {
        this.setState({ copied: false, timeoutId: null });
      }, cooldown),
    });

    onCopy();
  }

  render() {
    const { data, size, className } = this.props;
    const { copied } = this.state;

    return (
      <Clipboard onCopy={this.onCopy} text={data}>
        <Tappable
          component="div"
          className={!className ? styles.wrapper : classnames(styles.wrapper, className)}
          stopPropagation
          preventDefault
        >
          <IconButton
            disableTouchRipple
            style={{ width: size, height: size, padding: 1 }}
            iconStyle={{ width: size, height: size }}
          >
            <CopyIcon viewBox={`0 0 ${size * 2} ${size * 2}`} color={copied ? disabledTextColor : textColor} />
          </IconButton>
        </Tappable>
      </Clipboard>
    );
  }
}

CopyToClipboard.propTypes = {
  data: PropTypes.string.isRequired,

  onCopy: PropTypes.func,
  size: PropTypes.number, // in px
  cooldown: PropTypes.number, // in ms
};

CopyToClipboard.defaultProps = {
  className: '',
  onCopy: () => {},
  size: 14,
  cooldown: 1000,
};

export default CopyToClipboard;
