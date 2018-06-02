import { customTheme, theme } from '../../themes';

const styles: React.CSSProperties = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
        className: 'containerfluid',
    },
    gridContainer: {
        overflow: 'auto',
    },
    grid: {
        tableLayout: 'fixed',
    },
    gridHeader: {
        backgroundColor: customTheme.backgroundColor,
        color: theme.palette.primary.main,
        width: '80px',
        textAlign: 'right',
    },
    gridDetail: {
        backgroundColor: customTheme.backgroundColor,
        color: theme.palette.text.primary,
        width: '80px',
        textAlign: 'right',
    },
};

export default styles;
