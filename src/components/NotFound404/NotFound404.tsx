import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import * as React from 'react';
import { myHouseUrl } from '../../appConfig';
import { INotFound404Props } from './notFound404Interfaces';

const NotFound404: React.StatelessComponent<INotFound404Props> = (props) => {
    return (
      <Paper style={{ textAlign: 'center', paddingBottom: '2em' }}>
        <br />
        <h2>It's dangerous to go alone! Take this.</h2>

        <Button variant="outlined" href={myHouseUrl}>
          Link
        </Button>
      </Paper>
    );
};

export default NotFound404;
