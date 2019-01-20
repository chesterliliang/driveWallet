import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './index.scss';

class EllipsisText extends React.Component {
  render() {
    const { text, className, halfLength, ...otherProps } = this.props;

    const text1 = text.length > halfLength * 2 ? `${text.substr(0, halfLength)}…` : text.substr(0, halfLength);
    const text2 = text.length > halfLength * 2 ? text.substr(-halfLength) : text.substr(halfLength);

    return (
      <div className={!className ? styles.container : classnames(styles.container, className)} {...otherProps} >
        <span>{text1}</span>
        <span>{text2}</span>
      </div>
    );
  }
}

EllipsisText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  halfLength: PropTypes.number,
};

EllipsisText.defaultProps = {
  halfLength: 11,
};

export default EllipsisText;
