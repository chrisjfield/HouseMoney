import {
  grey400,
  grey600,
  grey700,
  grey900,
  blue900,
  blueGrey900,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const appTheme: __MaterialUI.Styles.MuiTheme = getMuiTheme({
    palette: {
        primary1Color: blue900,
        primary2Color: blue900,
        textColor: grey400,
        borderColor: grey700,
        disabledColor: grey700,
        pickerHeaderColor: blue900,
        canvasColor: grey900,
        alternateTextColor: grey400,
        accent1Color: grey600,
    },
    toolbar: {
        color: grey900,
        backgroundColor: blue900,
        iconColor: grey400,
    },
    snackbar: {
        backgroundColor: blue900,
    },
    avatar: {
        backgroundColor: blue900,
        color: grey400,
    },
    ripple: {
        color: blueGrey900,
    },
});

export default appTheme;
