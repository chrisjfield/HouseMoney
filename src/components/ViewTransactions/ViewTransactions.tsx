import * as React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { IViewTransactionsProps, IViewTransactionsState, IViewTransactionsStore } from './viewTransactionsInterfaces';
import { IStore } from '../../interfaces/storeInterface';
import { getTransactionHistory } from './viewTransactionsActions';
import styles from './viewTransactionsStyles';
import { ViewTransactionsGrid } from './ViewTransactionsGrid';
import { NoTransactionsFound } from './NoTransactionsFound';

class ViewTransactions extends React.Component<IViewTransactionsProps, IViewTransactionsState> {
    constructor(props: IViewTransactionsProps) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    requestTransactionHistory() {
        const me = this.props.loggedInOccupant;
        this.props.dispatch(getTransactionHistory(me.token, me.userId, me.occupantId, this.state.pageNumber, this.props.pageSize));
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
        if (!this.props.loading) {
            result = <CircularProgress />;
        } else if (this.props.transactionHistoryArray.length > 0) {
            result = (
                <div>
                    <ViewTransactionsGrid transactionHistoryArray={this.props.transactionHistoryArray} />
                    <FlatButton
                        key="Previous"
                        label="Previous"
                        onClick={this.prevPage}
                        disabled={this.state.pageNumber <= 1}
                    />
                    <FlatButton
                        key="Next"
                        label="Next"
                        onClick={this.nextPage}
                        disabled={this.props.transactionHistoryArray.length !== this.props.pageSize}
                    />
                </ div>
            );
        } else {
            result = <NoTransactionsFound />;
        }
        return result;
    }

    render() {
        return (
            <div style={styles.container}>
                <h2>My Transactions</h2>
                <div id="viewTransactionsTableContainer" style={styles.container}>
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

// Retrieve data from store as props
const mapStateToProps = (store: IStore) => {
    const props: IViewTransactionsStore = {
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        isLoggedIn: store.occupantsReducer.isLoggedIn,
        loading: store.loadingReducer.loading,
        transactionHistoryArray: store.viewTransactionsReducer.transactionHistoryArray,
        pageSize: 10,
    };
    return props;
};

export default connect(mapStateToProps)(ViewTransactions);
