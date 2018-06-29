
import { createStyles, Theme } from '@material-ui/core/styles';

const messageSnackbarStyles = (theme: Theme) => createStyles({
    success: {
        backgroundColor: theme.palette.error.light,
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.secondary.dark,
    },
    warning: {
        backgroundColor: theme.palette.primary.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    close: {
        alignItems: 'center',
    },
});

export default messageSnackbarStyles;
