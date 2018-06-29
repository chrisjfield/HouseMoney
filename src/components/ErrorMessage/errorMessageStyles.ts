import { createStyles, Theme } from '@material-ui/core/styles';

const errorMessageStyles = (theme: Theme) => createStyles({
    errorMessagePrompt: {
        backgroundColor: theme.palette.error.main,
    },
});

export default errorMessageStyles;
