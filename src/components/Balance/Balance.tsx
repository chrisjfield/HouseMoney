import Paper from '@material-ui/core/Paper/Paper';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { Loading } from '../Loading';
import BalanceList from './BalanceList';
import { getBalance } from './balanceActions';
import { IBalanceProps } from './balanceInterfaces';
// import styles from './balanceStyles';

class Balance extends React.Component<IBalanceProps> {
    componentDidMount() {
        this.props.dispatch(
            getBalance(this.props.loggedInOccupant), // TODO: How should this actually make the API Call tho?
        );
    }

    render() {
        return (
            <form name="balanceForm" style={appStyles.container}>
                <div>
                    <h2>My Balance</h2>
                    <Paper
                    // style={styles.balanceSheet}
                    >
                        {this.props.loading === 0 ? <BalanceList {...this.props} /> : <Loading />}
                    </Paper>
                </div>
            </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: IStore) => {
    const props: IBalanceProps =
        {
            dispatch: store.dispatch,
            history: store.history,
            loggedInOccupant: store.occupantsReducer.loggedInOccupant,
            loading: store.loadingReducer.loading,
            balanceArray: store.balanceReducer.balanceArray,
        };
    return props;
};

export default connect(mapStateToProps)(Balance);
