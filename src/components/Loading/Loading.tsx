import * as React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import styles from '../../styles';

const Loading: React.StatelessComponent = () => {
    return (
        <div>
            <CircularProgress size={80} thickness={5} style={styles.loading}/>
        </div>
    );
};

export { Loading };
