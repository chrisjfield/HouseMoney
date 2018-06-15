import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { Loading } from '../Loading';
import { BalanceActions } from './balanceActions';
import { IBalanceProps, IBalanceStore } from './balanceInterfaces';
import BalanceList from './BalanceList';
// import styles from './balanceStyles';

class Balance extends React.Component<IBalanceProps> {
    componentDidMount() {
        this.props.dispatch(
            BalanceActions.getBalance(this.props.loggedInOccupant), // TODO: How should this actually make the API Call tho?
        );
    }

    render() {
        return (
            <form name="balanceForm" style={appStyles.container}>
                <Typography variant="headline">My Balance</Typography>
                <Paper
                // style={styles.balanceSheet}
                >
                    {this.props.loading === 0 ? <BalanceList {...this.props} /> : <Loading />}
                </Paper>
            </form>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const props: IBalanceStore =
        {
            loggedInOccupant: store.occupantsReducer.loggedInOccupant,
            loading: store.loadingReducer.loading,
            balanceArray: store.balanceReducer.balanceArray,
        };
    return props;
};

export default connect(mapStateToProps)(Balance);
