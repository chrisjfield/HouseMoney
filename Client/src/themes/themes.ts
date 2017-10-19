import {
  grey400,
  grey600,
  grey900,
  blue900,
  blueGrey900,
  red800,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme: __MaterialUI.Styles.MuiTheme = getMuiTheme({
    palette: {
        primary1Color: blue900,
        primary2Color: blue900,
        textColor: grey400,
        borderColor: grey600,
        disabledColor: grey600,
        pickerHeaderColor: blue900,
        canvasColor: grey900,
        accent1Color: grey600,
        accent2Color: blue900,
        alternateTextColor: grey400,
        shadowColor: blueGrey900,
    },
    toolbar: {
        color: grey900,
        backgroundColor: blue900,
        iconColor: grey400,
    },
    avatar: {
        backgroundColor: blue900,
        color: grey400,
    },
    snackbar: {
        backgroundColor: red800,
    },
    tableRow: {
        hoverColor: blueGrey900,
        selectedColor: blueGrey900,
        stripeColor: blueGrey900,
    },
    ripple: {
        color: blueGrey900,
    },
});

export default theme;
