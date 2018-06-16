import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { myHouseUrl } from '../../appConfig';

const NotFound404: React.StatelessComponent = () => {
    return (
      <Paper style={{ textAlign: 'center', paddingBottom: '2em' }}>
        <br />
        <Typography>It's dangerous to go alone! Take this.</Typography>

        <Button variant="outlined" href={myHouseUrl}>
          Link
        </Button>
      </Paper>
    );
};

export default NotFound404;
