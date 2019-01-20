import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const lightTheme = getMuiTheme(lightBaseTheme);

darkBaseTheme.palette.primary1Color = '#ee602b';
darkBaseTheme.palette.accent1Color = '#FF0000';
const muiTheme = getMuiTheme(darkBaseTheme);

muiTheme.inkBar.backgroundColor = 'transparent';
// muiTheme.paper.backgroundColor = 'rgb(18, 18, 18)';
muiTheme.raisedButton.primaryTextColor = 'white';
muiTheme.snackbar.backgroundColor = 'rgba(255, 30, 30, 0.9)';
muiTheme.snackbar.textColor = 'rgba(255, 255, 255, 0.75)';
muiTheme.stepper.textColor = '#eee';
muiTheme.stepper.disabledTextColor = '#777';
muiTheme.tabs = lightTheme.tabs;
muiTheme.tabs.backgroundColor = 'transparent';
muiTheme.tabs.selectedTextColor = 'white';
muiTheme.tabs.textColor = 'rgba(255, 255, 255, 0.5)';
// muiTheme.textField.floatingLabelColor = 'rgba(255, 255, 255, 0.5)';
// muiTheme.textField.hintColor = 'rgba(255, 255, 255, 0.5)';
// muiTheme.textField.disabledTextColor = muiTheme.textField.textColor;
muiTheme.textField.errorColor = '#ff0000';
muiTheme.toolbar = lightTheme.toolbar;
muiTheme.toolbar.backgroundColor = 'transparent';
muiTheme.zIndex.layer = 4000;
muiTheme.zIndex.popover = 4100;

muiTheme.dialog.titleFontSize = 15;
muiTheme.paper.backgroundColor = '#282828';

muiTheme.radioButton.borderColor = '#BFBFBF';
muiTheme.radioButton.labelColor = '#BFBFBF';

muiTheme.flatButton.textColor = 'rgba(255, 255, 255, 1)';

muiTheme.menuItem.selectedTextColor = '#ee602b';

muiTheme.table.backgroundColor = 'transparent';
muiTheme.tableHeaderColumn.textColor = '#989898';
muiTheme.tableRow.stripeColor = '#282828';
muiTheme.tableRow.borderColor = 'rgba(255, 255, 255, 0.1)';

muiTheme.toggle.thumbOffColor = 'white';

export default muiTheme;
