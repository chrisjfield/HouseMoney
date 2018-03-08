import * as React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { IBalanceProps, IBalanceState, IBalanceObject, IBalanceOccupant } from './interfaces';
import appStyles from '../../styles';
import styles from './styles';
import { customTheme } from '../../themes';
import * as math from 'mathjs';
import APIHelper from '../../helpers/apiHelper';

class Balance extends React.Component<IBalanceProps, IBalanceState> {
    constructor(props: IBalanceProps) {
        super(props);

        this.state = {
            balance: [],
            balanceReturned: false,
        };
    }

    componentWillMount() {
        this.getUserData();
    }

    getUserData = () => {
        const request = APIHelper.apiCall('GET', 'TransactionSummaries', this.props.loggedInOccupant.token);

        return request.then((json: IBalanceObject[]) =>
          this.setState({ balance: json, balanceReturned: true }),
        );
    }

    createBalance = (balance: IBalanceObject) => {
        const debt = math.round(balance.TOTAL, 2);
        const debtor: IBalanceOccupant = { email: balance.OTHERS, displayName: '' };
        let colorToSet;

        if (debt < 0) {
            colorToSet = customTheme.negativeColor;
        } else if (debt > 0) {
            colorToSet = customTheme.positiveColor;
        } else {
            colorToSet = customTheme.neutralColor;
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
              primaryText={debtor.displayName + ': £' + Number(math.abs(debt)).toFixed(2)}
            />
        );
        return balanceItem;
    }

    createBalanceList = () => { // TODO: Refactor into stateless component! 
        const me = this.props.loggedInOccupant.occupantId;
        const balanceList = this.state.balance
              .filter(
              balanceItem => balanceItem.USER === me && balanceItem.OTHERS !== me,
              )
              .map(this.createBalance);
        return balanceList;
    }

    render() {
        return (
          <form name="balanceForm" style={appStyles.container}>
            <div>
              <h2>My Balance</h2>
                <Paper style={styles.balanceSheet}>
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
    return { loggedInOccupant: store.navReducer.loggedInOccupant };
};

export default connect(mapStateToProps)(Balance);
