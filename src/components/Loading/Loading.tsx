import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import * as React from 'react';

const Loading: React.StatelessComponent = () => {
    return (
        <div>
            <CircularProgress size={40} thickness={2} style={{
                marginLeft: 'calc(50% - 40px)',
                paddingTop: '5%',
            }} />
        </div>
    );
};

export default Loading;
