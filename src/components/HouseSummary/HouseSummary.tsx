import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { Loading } from '../Loading';
// import { getHouseholdOccupants } from '../Occupants/occupantsActions';
import { NoTransactionsFound } from '../ViewTransactions/NoTransactionsFound';
import { HouseSummaryGrid } from './HouseSummaryGrid';
import { IHouseSummaryProps } from './houseSummaryInterfaces';

class HouseSummary extends React.Component<IHouseSummaryProps> {
    componentDidMount() {
        this.requestTransactionSummaryData();
    }

    requestTransactionSummaryData() {
        // const me = this.props.loggedInOccupant;
        // this.props.dispatch(getHouseholdOccupants(me.token, me.userId, me.occupantId));
        // this.props.dispatch(getTransactionSummary(me.token, me.userId, me.occupantId));
    }

    // TODO: replace style={houseSummaryStyles.gridContainer}
    render() {
        return (
          <div style={appStyles.container}>
            <h2>House Money Summary</h2>
            <div id="houseSummaryTableContainer" >
              <div className="row">
                <div className="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
                  <div id="houseSummaryGrid" className="grid" />
                  {this.props.loading <= 0 ?
                      this.props.transactionSummaryArray.length > 0 && this.props.householdOccupantsArray.length > 0 ? (
                    <HouseSummaryGrid {...this.props}/>
                  ) : <div> <NoTransactionsFound /> </div> : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const props: IHouseSummaryProps = {
        dispatch: store.dispatch,
        history: store.history,
        loading: store.loadingReducer.loading,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        transactionSummaryArray: store.houseSummaryReducer.transactionSummaryArray,
        householdOccupantsArray: store.occupantsReducer.householdOccupantsArray,
    };
    return props;
};

export default connect(mapStateToProps)(HouseSummary);
