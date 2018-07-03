import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IStore } from '../../interfaces/storeInterface';
import formStyles from '../../styles/styles';
import Loading from '../Loading';
import { BalanceActions } from './balanceActions';
import { IBalanceProps, IBalanceStore } from './balanceInterfaces';
import BalanceList from './BalanceList';

class Balance extends React.Component<IBalanceProps> {
    componentDidMount() {
        this.props.dispatch(BalanceActions.getBalance(this.props.loggedInOccupant));
    }

    render() {
        const { classes } = this.props;
        return (
            <form name="balanceForm" className={classes.container}>
                <Typography variant="headline">My Balance</Typography>
                <Paper>
                    {this.props.loading === 0 && this.props.balanceArray
                        && this.props.balanceArray.length > 0 ? <BalanceList {...this.props} />
                        : this.props.balanceArray.length === 0
                            ? <Typography variant="subheading">Invite others to your household to view balances</Typography>
                            : <Loading />}
                </Paper>
            </form>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const props: IBalanceStore = {
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        loading: store.loadingReducer.loading,
        balanceArray: store.balanceReducer.balanceArray,
    };
    return props;
};

export default compose(withStyles(formStyles), connect(mapStateToProps))(Balance);
