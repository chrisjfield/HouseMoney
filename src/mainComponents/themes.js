import {
  darkBlack,
  fullBlack,
  grey400,
  grey500,
  blue900
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    accent1Color: darkBlack,
    textColor: grey400,
    alternateTextColor: grey500,
    borderColor: darkBlack,
    pickerHeaderColor: darkBlack,
    shadowColor: fullBlack
  }
});
