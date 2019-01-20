import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  handleDismiss = () => {
    this.props.dispatch({ type: 'device/setloopstop', payload: { insetting: false } });
    this.props.dispatch({ type: 'app/popModal' });
  };

  render() {
    return null;
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Modal;
