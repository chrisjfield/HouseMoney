import Button from '@material-ui/core/Button/Button';
import React from 'react';
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
        <div> Testing HMR </div>
      </div>
    );
};

export default NotFound404;
