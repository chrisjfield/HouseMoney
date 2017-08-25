import { grey400, grey700, blue900, grey900 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    textColor: grey400,
    borderColor: grey700,
    disabledColor: grey700,
    backgroundColor: grey900
  }
});
