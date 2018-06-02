import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { Theme, createMuiTheme } from '@material-ui/core/styles';

const appTheme: Theme = createMuiTheme({
    palette: {
        primary: {
            light: blue[700],
            main: blue[800],
            dark: blue[900],
            contrastText: grey[400],
        },
        secondary: {
            light: grey[600],
            main: grey[700],
            dark: grey[800],
            contrastText: grey[400],
        },
        error: {
            light: red[700],
            main: red[800],
            dark: red[900],
            contrastText: red[400],
        },
        text: {
            primary: blue[800],
            secondary: grey[400],
            disabled: grey[400],
            hint: grey[400],
        },
        background: {
            default: grey[900],
            paper: grey[800],
        },
    },
});

export default appTheme;
