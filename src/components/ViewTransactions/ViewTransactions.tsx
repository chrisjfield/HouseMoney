import Button from '@material-ui/core/Button/Button';
import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../interfaces/storeInterface';
import { Loading } from '../Loading';
import { NoTransactionsFound } from './NoTransactionsFound';
import { ViewTransactionsGrid } from './ViewTransactionsGrid';
// import { getTransactionHistory } from './viewTransactionsActions';
import { IViewTransactionsProps, IViewTransactionsState } from './viewTransactionsInterfaces';

class ViewTransactions extends React.Component<IViewTransactionsProps, IViewTransactionsState> {
    constructor(props: IViewTransactionsProps) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    requestTransactionHistory() {
        // const me = this.props.loggedInOccupant;
        // this.props.dispatch(getTransactionHistory(me.token, me.userId, me.occupantId, this.props.pageSize, this.state.pageNumber));
    }

    componentDidMount() {
        this.requestTransactionHistory();
    }

    prevPage = () => {
        this.setState({ pageNumber: this.state.pageNumber > 1 ? this.state.pageNumber - 1 : 1 }, () =>
            this.requestTransactionHistory(),
        );
    }

    nextPage = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 }, () =>
            this.requestTransactionHistory(),
        );
    }

    determineRender = () => {
        let result: JSX.Element;
        if (this.props.loading > 0) {
            result = <Loading />;
        } else if (this.props.transactionHistoryArray.length > 0) {
            result = (
                <div>
                    <ViewTransactionsGrid transactionHistoryArray={this.props.transactionHistoryArray} />
                    <Button
                        key="Previous_Button"
                        onClick={this.prevPage}
                        disabled={this.state.pageNumber <= 1}
                    >
                    Previous
                    </Button>
                    <Button
                        key="Next_Button"
                        onClick={this.nextPage}
                        disabled={this.props.transactionHistoryArray.length !== this.props.pageSize}
                    >
                    Next
                    </Button>
                </ div>
            );
        } else {
            result = <NoTransactionsFound />;
        }
        return result;
    }

    // TODO: replace style={styles.container} on divs
    render() {
        return (
            <div >
                <h2>My Transactions</h2>
                <div id="viewTransactionsTableContainer" >
                    <div className="row">
                        <div className="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
                            <div id="viewTransactionsGrid" className="grid" />
                            {this.determineRender()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const props: IViewTransactionsProps = {
        dispatch: store.dispatch,
        history: store.history,
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        loading: store.loadingReducer.loading,
        transactionHistoryArray: store.viewTransactionsReducer.transactionHistoryArray,
        pageSize: 10,
    };
    return props;
};

export default connect(mapStateToProps)(ViewTransactions);
