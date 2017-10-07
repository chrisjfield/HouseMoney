import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';

class NotFound404 extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <br />
        <h2>It's dangerous to go alone! Take this.</h2>
        <FlatButton
          label='Link'
          onClick={() => this.props.history.push('/')}
        />
      </div>
    );
  }
}

export default NotFound404;
