
const baseStyles: { [name: string]: React.CSSProperties } = {
    container: {
        textAlign: 'center',
        marginTop: '20em',
    },
    owesMeWidth: {
        width: '80em',
    },
    valueWidth: {
        width: '60em',
    },
    dateWidth: {
        width: '100em',
    },
    referenceWidth: {
        width: '100em',
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
