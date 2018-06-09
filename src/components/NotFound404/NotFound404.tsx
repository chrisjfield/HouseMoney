import Button from '@material-ui/core/Button/Button';
import * as React from 'react';
import { myHouseUrl } from '../../appConfig';
import { INotFound404Props } from './notFound404Interfaces';

const NotFound404: React.StatelessComponent<INotFound404Props> = (props) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <br />
        <h2>It's dangerous to go alone! Take this.</h2>

        <Button variant="outlined" href={myHouseUrl}>
          Link
        </Button>
      </div>
    );
};

export default NotFound404;
