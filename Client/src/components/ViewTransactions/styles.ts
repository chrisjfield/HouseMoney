import { theme, customTheme } from '../../themes';
const baseStyles: any = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
    },
    gridHeader: {
        backgroundColor: customTheme.backgroundColor,
        color: theme.palette.primary1Color,
    },
    gridDetail: {
        backgroundColor: customTheme.backgroundColor,
        color: theme.palette.textColor,
    },
    owesMeWidth: {
        width: '80px',
    },
    valueWidth: {
        width: '60px',
    },
    dateWidth: {
        width: '100px',
    },
    referenceWidth: {
        width: '100px',
    },
};

const styles: any = Object.assign(baseStyles, {
    owesMeHeader: { ...baseStyles.owesMeWidth, ...baseStyles.gridHeader },
    valueHeader: { ...baseStyles.valueWidth, ...baseStyles.gridHeader },
    dateHeader: { ...baseStyles.dateWidth, ...baseStyles.gridHeader },
    referenceHeader: {
        ...baseStyles.referenceWidth,
        ...baseStyles.gridHeader,
    },
    owesMeDetail: { ...baseStyles.owesMeWidth, ...baseStyles.gridDetail },
    valueDetail: { ...baseStyles.valueWidth, ...baseStyles.gridDetail },
    dateDetail: { ...baseStyles.dateWidth, ...baseStyles.gridDetail },
    referenceDetail: {
        ...baseStyles.referenceWidth,
        ...baseStyles.gridDetail,
    },
});

export default styles;
