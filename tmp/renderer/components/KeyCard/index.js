import React from 'react';
import PropTypes from 'prop-types';
import Granim from 'granim';

import EllipsisText from '../EllipsisText';

import styles from './index.scss';

class KeyCard extends React.Component {
  componentDidMount() {
    this.mounted = true;

    if (this.props.connecting) {
      setTimeout(() => {
        this.applyAnim();
      }, this.props.delay);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.mounted && !this.props.connecting && nextProps && nextProps.connecting) {
      setTimeout(() => {
        this.applyAnim();
      }, this.props.delay);
    } else if (this.props.connecting && (!nextProps || !nextProps.connecting)) {
      this.clearAnim();
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    this.clearAnim();
  }

  applyAnim = () => {
    this.fgAnim = new Granim({
      element: `#${styles.card}_${this.props.index}_inner canvas`,
      name: 'key-connecting-inner',
      direction: 'diagonal', // 'diagonal', 'top-bottom', 'radial'
      opacity: [0.5, 1],
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
            ['#191919', '#783923'],
            ['#191919', '#542818'],
            ['#191919', '#30170E'],
          ],
          transitionSpeed: 300,
        },
      },
    });

    this.bgAnim = new Granim({
      element: `#${styles.card}_${this.props.index} canvas`,
      name: 'key-connecting',
      direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
      opacity: [0.1, 0.8],
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
            ['#ED8864', '#ee602b'],
            ['#BD6C4F', '#ED8864'],
            ['#8C513B', '#8C3819'],
          ],
          transitionSpeed: 600,
        },
      },
    });
  }

  clearAnim = () => {
    if (this.bgAnim) {
      this.bgAnim.pause();

      setTimeout(() => {
        if (this.bgAnim) {
          this.bgAnim.destroy();
          this.bgAnim = null;
        }
      }, 100);
    }

    if (this.fgAnim) {
      this.fgAnim.pause();

      setTimeout(() => {
        if (this.fgAnim) {
          this.fgAnim.destroy();
          this.fgAnim = null;
        }
      }, 100);
    }
  }

  renderLogo = ({ connecting, connected, safe }) => {
    const style = {};

    if (connecting) {
      style.color = 'rgba(238,96,43,0.3)';
    } else if (connected) {
      style.color = safe ? '#ee602b' : '#ff0000';
    }

    return (<div className={styles.logo} style={style} />);
  }

  renderSN = (sn, safe) => {
    const color = safe ? '#FF7645' : '#ff0000';

    return (
      <strong style={{ color }}>
        {'SN:'}&nbsp;
        <EllipsisText text={sn} halfLength={8} />
      </strong>
    );
  }

  render() {
    const { connecting, connected, safe, sn, hideIndex } = this.props;

    const outerStyle = { boxSizing: 'border-box', overflow: 'hidden' };
    if (connecting) {
      outerStyle.padding = 1;
    } else if (connected) {
      outerStyle.border = `1pt solid ${safe ? '#783923' : '#FF0000'}`;
    } else {
      outerStyle.border = '1pt solid rgba(255,255,255,0.2)';
    }

    return (
      <div style={{ position: 'relative' }}>
        <div
          id={`${styles.card}_${this.props.index}`}
          className={styles.card}
          style={outerStyle}
        >
          <canvas />

          <div
            id={`${styles.card}_${this.props.index}_inner`}
            className={styles.card}
            style={{ margin: 0, width: '100%', height: '100%', borderRadius: '5pt', overflow: 'hidden' }}
          >
            <canvas />
          </div>

          {!hideIndex && this.renderLogo(this.props)}
        </div>

        {/* {connected && sn && this.renderSN(sn, safe)} */}
      </div>
    );
  }
}

KeyCard.propTypes = {
  index: PropTypes.number,
  connecting: PropTypes.bool,
  connected: PropTypes.bool,
  safe: PropTypes.bool, // 错误状态为false
  sn: PropTypes.string,
  delay: PropTypes.number,
  hideIndex: PropTypes.bool,
};

KeyCard.defaultProps = {
  connecting: false,
  connected: false,
  safe: true,
  delay: 0,
  hideIndex: false,
};

export default KeyCard;
