import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { Loading } from '../Loading';
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
        return (
            <form name="houseSummaryForm" style={appStyles.container}>
                <h2> Summary </h2>
                <div id="houseSummaryGrid" style={houseSummaryStyles.gridContainer}>
                    {this.props.loading <= 0 ?
                        this.props.transactionSummaryArray.length > 0 && this.props.householdOccupantsArray.length > 0 ? (
                            <HouseSummaryGrid {...this.props} />
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

export default connect(mapStateToProps)(HouseSummary);
