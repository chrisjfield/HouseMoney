import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';

// TODO: Figure out how to combine two styles and remove container from this and reference formStyles!
const addTransactionStyles = (theme: Theme) => createStyles({
    container: {
        textAlign: 'center',
        paddingTop: '20px',
    },
    checkbox: {
        display: 'inline-flex',
    },
    checkboxIcon: {
        paddingTop: '2px',
    },
    checkAll: {
        display: 'inline-flex',
        textAlign: 'left',
    },
    occupantChip: {
        display: 'inline-flex',
        width: 'inherit',
        overflow: 'hidden',
    },
    checkBoxListSheet: {
        width: '256px',
        textAlign: 'center',
        display: 'inline-block',
    },
});

export default addTransactionStyles;

export interface IAddTransactionStyles extends WithStyles<typeof addTransactionStyles> { }
