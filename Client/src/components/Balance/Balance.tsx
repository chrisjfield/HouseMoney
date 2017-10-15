import * as React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';
import { IBalanceProps, IBalanceState, IBalanceObject } from './interfaces';

class Balance extends React.Component<IBalanceProps, IBalanceState> {
    constructor(props: IBalanceProps) {
        super(props);
    // this.styles = {
    //   container: {
    //     textAlign: 'center',
    //     marginTop: '20px'
    //   },
    //   balanceSheet: {
    //     width: '350px',
    //     textAlign: 'center',
    //     display: 'inline-block'
    //   },
    //   balance: {
    //     positiveColor: green800,
    //     negativeColor: red800,
    //     neutralColor: grey400,
    //   },
    // };

        this.state = {
            balance: [],
            balanceReturned: false,
        };
    }

    componentWillMount() {
        this.getUserData();
    }

    getUserData = () => {
        const request = APIHelper.apiCall('GET', 'TransactionSummaries');

        return request.then((json: JSON) =>
          this.setState({ balance: json, balanceReturned: true })
        );
    }

    createBalance = (balance: IBalanceObject) => {
        const debt = math.round(balance.TOTAL, 2);
        const debtor = { email: balance.OTHERS };
        let colorToSet;

        if (debt < 0) {
            colorToSet = this.styles.balance.negativeColor;
        } else if (debt > 0) {
            colorToSet = this.styles.balance.positiveColor;
        } else {
            colorToSet = this.styles.balance.neutralColor;
        }

        const balanceItem = (
            <ListItem
                key={'Debt_' + debtor.displayName}
                style={{
                    color: colorToSet,
                    cursor: 'auto',
                    width: 'auto',
                    overflow: 'hidden',
                }}
                leftAvatar={
                    <Avatar
                      key={'Avatar_' + debtor.displayName}
                      style={{ backgroundColor: colorToSet }}
                    >
                      {debtor.displayName.charAt(0).toUpperCase()}
                    </Avatar>
              }
              primaryText={debtor.displayName + ': £' + math.abs(debt).toFixed(2)}
            />
        );
        return balanceItem;
    }

    createBalanceList = () => {
        const me = this.props.loggedInUser.userId;
        const balanceList = this.state.balance
              .filter(
              balanceItem => balanceItem.USER === me && balanceItem.OTHERS !== me,
              )
              .map(this.createBalance);
        return balanceList;
    }

    render() {
        return (
          <form name="balanceForm" style={this.styles.container}>
            <div>
              <h2>My Balance</h2>
                <Paper style={this.styles.balanceSheet}>
                  {this.state.balanceReturned ? (
                    <List>{this.createBalanceList()}</List>
                  ) : (
                      <CircularProgress />
                    )}
                </Paper>
            </div>
          </form>
        );
    }
}

// Retrieve data from store as props
const mapStateToProps = (store: any) => {
    return { loggedInUser: store.navReducer.loggedInUser };
};

export default connect(mapStateToProps)(Balance);
