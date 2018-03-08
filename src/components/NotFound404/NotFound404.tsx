import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { INotFound404Props } from './interfaces';

const NotFound404: React.StatelessComponent<INotFound404Props> = (props) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <br />
        <h2>It's dangerous to go alone! Take this.</h2>
        <FlatButton
          label="Link"
          onClick={() => props.history.push('/')}
        />
      </div>
    );
};

export default NotFound404;
