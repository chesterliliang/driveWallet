import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import BaseModal from '../__base';
import styles from './index.scss';


class changepin extends BaseModal {

    componentDidMount() {
    }
    handleSubmit = () => {
        this.props.dispatch({ type: 'device/setloopstop', payload: { insetting: false } });
        this.props.dispatch({ type: 'app/popModal' });
    }
    render() {
        const actions = [
            <FlatButton
                label={localizedStrings.closeModal}
                onClick={this.handleDismiss}
            />,
            <FlatButton
            label="OK "
            onClick={this.handleSubmit}
        />,
        ];

        const { isOpen } = this.props;
        return (
            <Dialog
                bodyClassName={styles.container}
                bodyStyle={{ paddingBottom: 0 }}
                contentStyle={{ width: 348 }}
                actionsContainerStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 10,
                }}
                modal
                open={isOpen}
                actions={actions}
            >
                <div>
                    <TextField
                        id="outlined-password-input"
                        floatingLabelText="Original PIN CODE"
                        floatingLabelFixed
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-password-input"
                        floatingLabelText="New PIN CODE"
                        floatingLabelFixed
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-password-input"
                        floatingLabelText="REPEAT"
                        floatingLabelFixed
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
            </Dialog>
        );
    }
}

changepin.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

changepin.defaultProps = {
    isOpen: false,
};
const mapStateToProps = () => ({
});
//export default connect(mapStateToProps)(Modal);
export default changepin;