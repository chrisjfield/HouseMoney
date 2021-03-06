import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IStore } from '../../interfaces/storeInterface';
import Loading from '../Loading';
import { NoTransactionsFound } from './NoTransactionsFound';
import { ViewTransactionsActions } from './viewTransactionsActions';
import { ViewTransactionsGrid } from './ViewTransactionsGrid';
// tslint:disable-next-line:max-line-length
import { IViewTransactionsProps, IViewTransactionsRequest, IViewTransactionsState, IViewTransactionsStore } from './viewTransactionsInterfaces';
import viewTransactionsStyles from './viewTransactionsStyles';

class ViewTransactions extends React.Component<IViewTransactionsProps, IViewTransactionsState> {
    constructor(props: IViewTransactionsProps) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    requestTransactionHistory() {
        const me = this.props.loggedInOccupant;
        const getTransactionHistoryRequest: IViewTransactionsRequest = {
            token: me.token,
            userId: me.userId,
            occupantId: me.occupantId,
            pageSize: this.props.pageSize,
            pageNumber: this.state.pageNumber,
        };
        this.props.dispatch(ViewTransactionsActions.getTransactionHistory(getTransactionHistoryRequest));
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
                    <ViewTransactionsGrid
                        key="TransactionsGrid"
                        transactionHistoryArray={this.props.transactionHistoryArray}
                        classes={this.props.classes}
                    />
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

    render() {
        const { classes } = this.props;
        return (
            <form name="viewTransactionsForm" className={classes.container}>
                <Typography variant="headline">My Transactions</Typography>
                <div id="viewTransactionsTableContainer" >
                    <div className="row">
                        <div className="col-lg-4 col-lg-push-4 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
                            <div id="viewTransactionsGrid" className="grid" />
                            {this.determineRender()}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    const props: IViewTransactionsStore = {
        loggedInOccupant: store.occupantsReducer.loggedInOccupant,
        loading: store.loadingReducer.loading,
        transactionHistoryArray: store.viewTransactionsReducer.transactionHistoryArray,
        pageSize: 10,
    };
    return props;
};

export default compose(withStyles(viewTransactionsStyles), connect(mapStateToProps))(ViewTransactions);
