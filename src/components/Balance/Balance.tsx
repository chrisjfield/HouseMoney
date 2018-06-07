import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { Loading } from '../Loading';
import BalanceList from './BalanceList';
import { BalanceActions } from './balanceActions';
import { IBalanceProps, IBalanceStore } from './balanceInterfaces';
import styles from './balanceStyles';

class Balance extends React.Component<IBalanceProps> {
    componentDidMount() {
        this.props.dispatch(
            BalanceActions.getBalance(this.props.loggedInOccupant),
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

// const mapDispatchToProps = (dispatch: redux.Dispatch<redux.Action>) =>
//   redux.bindActionCreators(getBalance, dispatch);

export default connect(mapStateToProps)(Balance);
