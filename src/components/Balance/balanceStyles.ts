import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';

const balanceStyles = (theme: Theme) => createStyles({
    container: {
        textAlign: 'center',
        paddingTop: '20px',
    },
    balanceItemPositive: {
        backgroundColor: theme.palette.error.light,
    },
    balanceItemNeutral: {
        backgroundColor: theme.palette.secondary.main,
    },
    balanceItemNegative: {
        backgroundColor: theme.palette.error.main,
    },
});

export default balanceStyles;
export interface IBalanceStyles extends WithStyles<typeof balanceStyles> { }
