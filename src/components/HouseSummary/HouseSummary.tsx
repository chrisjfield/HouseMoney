import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IStore } from '../../interfaces/storeInterface';
import formStyles from '../../styles/styles';
import Loading from '../Loading';
import { OccupantsActions } from '../Occupants/occupantsActions';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { NoTransactionsFound } from '../ViewTransactions/NoTransactionsFound';
import { HouseSummaryActions } from './houseSummaryActions';
import { HouseSummaryGrid } from './HouseSummaryGrid';
import { IHouseSummaryProps, IHouseSummaryStore } from './houseSummaryInterfaces';
import houseSummaryStyles from './houseSummaryStyles';

class HouseSummary extends React.Component<IHouseSummaryProps> {
    componentDidMount() {
        this.requestTransactionSummaryData();
    }

    requestTransactionSummaryData() {
        const occupantDetails: IOccupantDetails = this.props.loggedInOccupant;
        this.props.dispatch(OccupantsActions.getHouseholdOccupants(occupantDetails));
        this.props.dispatch(HouseSummaryActions.getTransactionSummary(occupantDetails));
    }

    render() {
        const { classes } = this.props;
        return (
            <form name="houseSummaryForm" className={classes.container}>
                <Typography variant="headline"> Summary </Typography>
                <div id="houseSummaryGrid" style={houseSummaryStyles.gridContainer}>
                    {this.props.loading <= 0 ?
                        this.props.transactionSummaryArray.length > 0 && this.props.householdOccupantsArray.length > 0 ? (
                            <HouseSummaryGrid key={'HouseSummaryGridTable'} {...this.props} />
                        ) : <div> <NoTransactionsFound /> </div> : (
                            <Loading />
                        )}
                </div>
            </form>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const props: IHouseSummaryStore = {
        loading: store.loadingReducer.loading,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        transactionSummaryArray: store.houseSummaryReducer.transactionSummaryArray,
        householdOccupantsArray: store.occupantsReducer.householdOccupantsArray,
    };
    return props;
};

export default compose(withStyles(formStyles), connect(mapStateToProps))(HouseSummary);
