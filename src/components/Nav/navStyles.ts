import { createStyles, Theme } from '@material-ui/core/styles';

const navStyles = (theme: Theme) => createStyles({
    occupantChipItem: {
        display: 'inline-flex',
        width: '120px',
        overflow: 'hidden',
    },
    navItem: {
        textDecoration: 'none',
    },
});

export default navStyles;
