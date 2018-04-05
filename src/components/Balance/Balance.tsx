import * as React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { IBalanceProps, IBalanceStore } from './balanceInterfaces';
import appStyles from '../../styles';
import styles from './balanceStyles';
import { IStore } from '../../interfaces/storeInterface';
import BalanceList from './BalanceList';
import { getBalance } from './balanceActions';
import { Loading } from '../Loading';

class Balance extends React.Component<IBalanceProps> {
    componentDidMount() {
        this.props.dispatch(
            getBalance(this.props.loggedInOccupant.token, this.props.loggedInOccupant.userId, this.props.loggedInOccupant.occupantId),
        );
    }

    render() {
        return (
            <form name="balanceForm" style={appStyles.container}>
                <div>
                    <h2>My Balance</h2>
                    <Paper style={styles.balanceSheet}>
                        {this.props.loading === 0 ? <BalanceList {...this.props} /> : <Loading />}
                    </Paper>
                </div>
            </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: IStore) => {
    const props: IBalanceStore =
        {
            loggedInOccupant: store.occupantsReducer.loggedInOccupant,
            isLoggedIn: store.occupantsReducer.isLoggedIn,
            loading: store.loadingReducer.loading,
            balanceArray: store.balanceReducer.balanceArray,
        };
    return props;
};

export default connect(mapStateToProps)(Balance);
