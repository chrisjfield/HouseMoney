import {
  darkBlack,
  fullBlack,
  grey400,
  grey500,
  grey700,
  blue900
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    textColor: grey400,
    alternateTextColor: grey500,
    borderColor: darkBlack,
    pickerHeaderColor: blue900,
    shadowColor: fullBlack,
    borderColor: grey500,
    disabledTextColor: grey500
  }
});
