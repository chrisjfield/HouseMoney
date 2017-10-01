import {
  grey400,
  grey600,
  grey700,
  grey900,
  blue900,
  green800,
  red800,
  blueGrey900,
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    primary2Color: blue900,
    textColor: grey400,
    borderColor: grey700,
    disabledColor: grey700,
    backgroundColor: grey900,
    pickerHeaderColor: blue900,
    pickerBackgroundColor: blue900,
    canvasColor: grey900,
    alternateTextColor: grey400,
    accent1Color: grey600
  },
  balance: {
    positiveColor: green800,
    negativeColor: red800,
    neutralColor: grey400
  },
  toolbar: {
    color: grey900,
    backgroundColor: blue900,
    iconColor: grey400
  },
  snackbar: {
    color: grey900,
    backgroundColor: blue900,
    textAlign: "center"
  },
  avatar: {
    size: "30dp",
    backgroundColor: blue900,
    color: grey400
  },
  ripple: {
    color: blueGrey900,
  },
});
