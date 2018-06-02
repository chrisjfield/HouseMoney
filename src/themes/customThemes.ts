import green from '@material-ui/core/colors/green';
import appTheme from './themes';

const customTheme: any = {
    backgroundColor: appTheme.palette.background.default,
    positiveColor: green[800],
    negativeColor: appTheme.palette.error.main,
    neutralColor: appTheme.palette.grey[400],
};

export default customTheme;
