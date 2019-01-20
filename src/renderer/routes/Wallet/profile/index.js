import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import { withContentRect } from 'react-measure';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { routerRedux } from 'dva/router';
import { reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import IconButton from '@material-ui/core/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import styles from './index.scss';
import { parseConfigFileTextToJson } from 'typescript';
import SVGInline from 'react-svg-inline';
import { fpsvg } from './fpsvg.js'

var part2 = document.querySelector("#part2");
var index = 0;
let appUpdateInfo = null;
let cosUpdateInfo = null;

const lans = [
    { type: 'zh-Hans', value: '简体中文' },
    { type: 'en', value: 'English' },
  ];

class profile extends React.Component {
    state = {
        lanFieldFocused: false,
        lanFieldWidth: 900,
        anchorEl: null,
      };

    componentDidMount() {
        this.props.dispatch({
            type: 'device/setloopstop',
            payload: { insetting: true },
        });
    }
    handleLanChange = (event, type) => {
        this.setState({ lanFieldFocused: false });
        this.props.dispatch({
          type: 'app/setSettings',
          payload: { language: type },
        });
      };
    handlefingermanager = () =>{
        console.log('handlefingermanager');
        const modalPlayload = {
            modalType: 'verifypin',
            modalProps: {}
          };
          this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
    };
    handlechangepin = () =>{
        console.log('handlechangepin');
        const modalPlayload = {
            modalType: 'changepin',
            modalProps: {}
          };
          this.props.dispatch({ type: 'app/pushModal', payload: modalPlayload });
    };

    onItemClick = index => {
        switch (index) {
            case 0: {
                this.handlechangepin();
                // this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'changePIN', args: [0] } });
                break;
            }
            case 1: {
                this.props.dispatch({ type: 'device/format' });
                // this.props.dispatch({ type: 'data/clientCoreInvoke', payload: { category: 'driver', fn: 'format', args: [0] } });
                break;
            }
            case 4:{
                this.handlefingermanager();
            }

            default:
        }
    };

    next = () => {
        console.log('next: ' + index);
        index += 1;

        if (index > 16) {
            return;
        }

        var group = document.querySelector("#group" + index);
        group.classList.remove(styles.animateout);
        group.classList.add(styles.animateini);

        if (index === 8) {
            setTimeout(function () { part2.style.stroke = '#999'; }, 1000);
        } else if (index > 16) {
            index = 16;
        } else if (index === 9) {
            var path = document.querySelector("#Path-104");
            path.classList.remove(styles.animateout);
            path.classList.add(styles.animateini);
            path.style.animationDuration = '1s';
        }
    }

    prev = () => {
        console.log('prev: ' + index);
        var group = document.querySelector("#group" + index);
        group.classList.remove('animate-in');
        group.classList.add('animate-out');


        index -= 1;

        if (index < 8) {
            part2.style.stroke = 'transparent';
        } else if (index < 0) {
            index = 0;
        } else if (index === 9) {
            var path = document.querySelector("#Path-104");
            // path.classList.remove(styles.animate-out);
            // path.classList.add(styles.animate-in);
            path.style.animationDuration = '1s';
        }
    }

    done = () => {
        while (index < 16) {
            index += 1;
            var group = document.querySelector("#group" + index);
            group.classList.remove('animate-out');
            group.classList.add('animate-in');

            if (index === 9) {
                var path = document.querySelector("#Path-104");
                path.classList.remove('animate-out');
                path.classList.add('animate-in');
                path.style.animationDuration = '1s';
            }
        }
    }

    reset = () => {
        while (index > 0) {
            var group = document.querySelector("#group" + index);
            group.classList.remove('animate-in');
            // group.classList.add('animate-out');

            if (index === 9) {
                var path = document.querySelector("#Path-104");
                path.classList.remove('animate-in');
                // path.classList.add('animate-out');
                // path.style.animationDuration='1s';
            }

            index -= 1;
        }
    }
    renderMenuItem = ({ type, value }, index, renderType) => {
        const {
          settings: { language},
        } = this.props;
        switch (renderType) {
          case 'lan': {
            return (
              <MenuItem
                key={index}
                innerDivStyle={{
                  color: language === type ? 'white' : 'rgba(255,255,255,0.6)',
                  fontSize: 15,
                }}
                value={type}
                primaryText={value}
              />
            );
          }
          default: {
            return (
              <a> switch case</a>
            );
          }
        }
      };

  renderLanField = () => {
    const { lanFieldFocused, anchorEl, lanFieldWidth } = this.state;
    const {
      settings: { language },
    } = this.props;

    const ItemToMeasure = withContentRect('bounds')(
      ({ measureRef, contentRect }) => {
        return (
          <div ref={measureRef} className={styles.relativeField}>
            <TextField
              floatingLabelText={localizedStrings.language}
              floatingLabelFixed
              value={lans.find(({ type }) => type === language).value}
              floatingLabelStyle={{ fontSize: 16, top: 34 }}
              style={{ fontSize: 17 }}
              underlineStyle={{
                borderColor: lanFieldFocused ? '#ee602b' : '#686868',
              }}
              onFocus={() =>
                this.setState({
                  lanFieldFocused: true,
                  anchorEl: this.fieldParent,
                  lanFieldWidth: contentRect.bounds.width,
                })
              }
              onBlur={() => this.setState({ lanFieldFocused: false })}
            />
          </div>
        );
      }
    );

    return (
      <div
        ref={ref => {
          this.fieldParent = ref;
        }}
      >
        <ItemToMeasure />
        <Popover
          open={lanFieldFocused}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{
            marginTop: 5,
            marginRight: 0,
            marginLeft: '80px',
            background: '#202020',
          }}
          onRequestClose={() => this.setState({ lanFieldFocused: false })}
        >
          <Menu
            autoWidth={false}
            maxHeight={130}
            width={lanFieldWidth}
            value={language}
            onChange={this.handleLanChange}
          >
            {lans &&
              lans.map((item, index) =>
                this.renderMenuItem(item, index, 'lan')
              )}
          </Menu>
        </Popover>
      </div>
    );
  };
    //<div className = {styles.fp}>
    //<SVGInline svg={fpsvg} />
    //</div>
    //<div className={styles.title} onClick={() => this.next()}>
    //next
    //</div>
    render() {
        console.log('profile render!');

        const { isOpen, locked, COSVersion, deviceNum, settings } = this.props;
        let versionstring = `${localizedStrings.setttingSW} ${
            this.props.ElectronVer
            }`;
        let versionMentionstring = '';
        if (deviceNum > 0 && COSVersion) {
            versionstring = `${versionstring}    ${
                localizedStrings.setttingFW
                } ${COSVersion.toString().replace(/,/g, '.')}`;
        }
        if (
            appUpdateInfo &&
            !appUpdateInfo.newVersion &&
            (cosUpdateInfo && !cosUpdateInfo.newVersion)
        ) {
            versionMentionstring = `( ${localizedStrings.alreadyUpdateMention} )`;
        } else {
            versionMentionstring = `( ${localizedStrings.updateMention}${
                appUpdateInfo && appUpdateInfo.newVersion
                    ? ` ${localizedStrings.updateSpanSW}: ${appUpdateInfo.version}`
                    : ''
                }${
                cosUpdateInfo && cosUpdateInfo.newVersion
                    ? ` ${localizedStrings.updateSpanFW}: ${cosUpdateInfo.version}`
                    : ''
                } )`;
        }



        return (
            <div className={styles.container}>
                <List style={{ paddingTop: 5 }}>
                    <ListItem
                        primaryText={localizedStrings.modifyPINOption}
                        secondaryText={localizedStrings.modifyPINOptionHint}
                        style={{ paddingLeft: 80, paddingRight: 80, }}
                        innerDivStyle={{
                            transform: 'scale(1.3)',
                            transformOrigin: 'left',
                            padding: '20px 0',
                            fontSize: '10',
                        }}
                        onClick={this.onItemClick.bind(this, 0)}
                    />
                </List>
                <List style={{ paddingTop: 5 }}>
                    <ListItem
                        primaryText={localizedStrings.FingerprintOption}
                        secondaryText={localizedStrings.FingerprintOptionHint}
                        style={{ paddingLeft: 80, paddingRight: 80 }}
                        innerDivStyle={{
                            transform: 'scale(1.3)',
                            transformOrigin: 'left',
                            padding: '20px 0',
                        }}
                        onClick={this.onItemClick.bind(this, 4)}
                    />
                </List>
                <List style={{ paddingTop: 5 }}>
                    <ListItem
                        primaryText={localizedStrings.DiskOption}
                        secondaryText={localizedStrings.DiskOptionHint}
                        style={{ paddingLeft: 80, paddingRight: 80 }}
                        innerDivStyle={{
                            transform: 'scale(1.3)',
                            transformOrigin: 'left',
                            padding: '20px 0',
                        }}
                        onClick={this.onItemClick.bind(this, 5)}
                    />
                </List>
                <List style={{ paddingTop: 5 }}>
                    <ListItem
                        primaryText={localizedStrings.format}
                        secondaryText={localizedStrings.formatHint}
                        style={{ paddingLeft: 80, paddingRight: 80 }}
                        innerDivStyle={{
                            transform: 'scale(1.3)',
                            transformOrigin: 'left',
                            padding: '20px 0',
                        }}
                        onClick={this.onItemClick.bind(this, 1)}
                    />
                </List>
                <List style={{ paddingTop: 5 }}>
                    <ListItem
                        primaryText={localizedStrings.checkUpdate}
                        secondaryText={
                            <div>
                                {versionstring}
                                <span style={{ marginLeft: 10, color: 'rgb(228,80,39)' }}>
                                    {versionMentionstring}
                                </span>
                            </div>
                        }
                        style={{ paddingLeft: 80, paddingRight: 80 }}
                        innerDivStyle={{
                            transform: 'scale(1.3)',
                            transformOrigin: 'left',
                            padding: '20px 0',
                        }}
                        onClick={this.onItemClick.bind(this, 2)}
                    />
                </List>
                {this.renderLanField()}
            </div>
        );
    }
}

profile.propTypes = {

};

profile.defaultProps = {

};

function mapStateToProps({
    app: { settings, locked, progressFull, progressObj },
    device: { num: deviceNum, COSVersion, ElectronVer, MidWareVer },
}) {

    return {
        settings,
        deviceNum,
        COSVersion,
        ElectronVer,
        MidWareVer,
        locked,
        progressObj,
        progressFull,
    };
}

export default connect(mapStateToProps)(profile);