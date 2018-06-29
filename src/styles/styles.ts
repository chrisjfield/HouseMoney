import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';

const formStyles = (theme: Theme) => createStyles({
    container: {
        textAlign: 'center',
        paddingTop: '20px',
    },
});

export default formStyles;
export interface IFormStyles extends WithStyles<typeof formStyles> { }
