import { Theme } from '@material-ui/core/styles/createMuiTheme';
import appTheme from '../../themes';

const errorMessageStyles = (theme: Theme) => {
    return {
        snackbar: {
            backgroundColor: appTheme.palette.error.main,
        },
    };
};

export default errorMessageStyles;
