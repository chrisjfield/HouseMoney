import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';

const viewTransactionsStyles = (theme: Theme) => createStyles({
    container: {
        textAlign: 'center',
        marginTop: '20px',
    },
    owesMeWidth: {
        maxWidth: '80em',
        minWidth: '5em',
    },
    valueWidth: {
        maxWidth: '60em',
        minWidth: '5em',
    },
    dateWidth: {
        maxWidth: '100em',
        minWidth: '14em',
    },
    referenceWidth: {
        maxWidth: '100em',
        minWidth: '5em',
    },
});

export default viewTransactionsStyles;
export interface IViewTransactionsStyles extends WithStyles<typeof viewTransactionsStyles> { }
