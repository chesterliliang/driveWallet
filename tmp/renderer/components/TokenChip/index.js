import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/internal/Tooltip';

const styles = {
  chip: {
    height: 26,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 13,
    margin: 5,
    backgroundColor: '#383838',
    boxShadow: 'rgba(0, 0, 0, 0.3) 1px 1px 2px',
  },
  avatar: {
    width: 28,
    height: 28,
    margin: '-1px 0px -1px 0px',
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
  strong: {
    position: 'initial',
    display: 'inline',
    color: '#7F98A3',
    fontSize: 14,
  },
};

class TokenChip extends React.Component {
  state ={
    showDetails: false,
  }

  handleShowDetails = (event) => {
    this.setState({ showDetails: true });
  }

  handleHideDetails = (event) => {
    this.setState({ showDetails: false });
  }

  render() {
    const { amount, unit, icon } = this.props;
    const { showDetails } = this.state;

    const tooltipElement = (
      <Tooltip
        label={`${amount} ${unit}`}
        show={showDetails}
        style={{ boxSizing: 'border-box' }}
        verticalPosition="bottom"
        horizontalPosition="left"
      />
    );

    return (
      <div
        style={{ position: 'relative' }}
        onBlur={this.handleHideDetails}
        onFocus={this.handleShowDetails}
        onMouseLeave={this.handleHideDetails}
        onMouseEnter={this.handleShowDetails}
      >
        <Chip style={styles.chip}>
          <Avatar size={16} style={styles.avatar} src={icon} />
          <span style={styles.text}>
            <strong style={styles.strong}>{Number(amount).toFixed(3)}</strong>
            &nbsp;{unit}
          </span>
        </Chip>

        {tooltipElement}
      </div>
    );
  }
}

TokenChip.propTypes = {
  icon: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
};

export default TokenChip;
