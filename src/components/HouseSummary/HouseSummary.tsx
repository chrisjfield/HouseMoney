import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { IStore } from '../../interfaces/storeInterface';
import appStyles from '../../styles';
import { Loading } from '../Loading';
import { getHouseholdOccupants } from '../Occupants/occupantsActions';
import { NoTransactionsFound } from '../ViewTransactions/NoTransactionsFound';
import { HouseSummaryGrid } from './HouseSummaryGrid';
import { HouseSummaryActions, getTransactionSummary } from './houseSummaryActions';
import { IHouseSummaryProps, IHouseSummaryStore } from './houseSummaryInterfaces';
import houseSummaryStyles from './houseSummaryStyles';

class HouseSummary extends React.Component<IHouseSummaryProps> {
    componentDidMount() {
        this.requestTransactionSummaryData();
    }

    requestTransactionSummaryData() {
        const me = this.props.loggedInOccupant;
        this.props.dispatch(getHouseholdOccupants(me.token, me.userId, me.occupantId));
        this.props.dispatch(getTransactionSummary(me.token, me.userId, me.occupantId));
    }

    render() {
        return (
          <div style={appStyles.container}>
            <h2>House Money Summary</h2>
            <div id="houseSummaryTableContainer" style={houseSummaryStyles.gridContainer}>
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
    const props: IHouseSummaryStore = {
        loading: store.loadingReducer.loading,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        isLoggedIn: store.occupantsReducer.isLoggedIn, // TODO: Remove isLoggedIn from components that don't need it!
        transactionSummaryArray: store.houseSummaryReducer.transactionSummaryArray,
        householdOccupantsArray: store.occupantsReducer.householdOccupantsArray,
    };
    return props;
};

const mapDispatchToProps = (dispatch: redux.Dispatch<redux.Action>) =>
  redux.bindActionCreators(HouseSummaryActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HouseSummary);
