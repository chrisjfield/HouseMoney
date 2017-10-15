import * as React from 'react';
import { connect } from 'react-redux';

class Households extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div> Households </div>
        )
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(Households);