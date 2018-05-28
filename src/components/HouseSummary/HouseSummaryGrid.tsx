import * as React from 'react';
import { IHouseSummaryProps, ITransactionSummary, IHouseSummaryRow } from './houseSummaryInterfaces';
import Table, { TableHeaderColumn, TableRowColumn, TableRow, TableHeader, TableBody } from 'material-ui/Table';
import houseSummaryStyles from './houseSummaryStyles';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export const HouseSummaryColumn: React.StatelessComponent<IOccupant> = (householdOccupant: IOccupant) => {
    const column = (
        <TableHeaderColumn
          key={'Column' + householdOccupant.email}
          style={houseSummaryStyles.gridHeader}
        >
          {householdOccupant.email ? householdOccupant.email + ' owes' : null}
        </TableHeaderColumn>
    );

    return column;
};

export const HouseSummaryRowData: React.StatelessComponent<ITransactionSummary> = (transactionSummary: ITransactionSummary) => {
    const row = (
      <TableRowColumn
        key={'Data' + transactionSummary.creditorOccupantId}
        style={houseSummaryStyles.gridDetail}
      >
        {Number(math.round(transactionSummary.gross, 2)).toFixed(2)}
      </TableRowColumn>
    );
    return row;
};

export const HouseSummaryRow: React.StatelessComponent<IHouseSummaryRow> = (props: IHouseSummaryRow) => {
    const transactionSummaryArrayData = props.transactionSummaryArray.filter(
      (gridElement: ITransactionSummary) => gridElement.creditorOccupantId === props.householdOccupant.occupantId,
    );
    const houseSummaryRowData: JSX.Element[] = transactionSummaryArrayData.map((transactionSummary: ITransactionSummary) =>
     <HouseSummaryRowData {...transactionSummary} />);
    return (
      <TableRow key={'Row' + props.householdOccupant.occupantId}>
        <TableRowColumn key={'RowColumn' + props.householdOccupant.occupantId} style={houseSummaryStyles.gridHeader}>
          {props.householdOccupant.email}
        </TableRowColumn>
        {houseSummaryRowData}
      </TableRow>
    );
};

export function createColumns(householdOccupantsArray: IOccupant[]) {
    const columnData = ['', ...householdOccupantsArray];
    return columnData.map((householdOccupant: IOccupant) => <HouseSummaryColumn {...householdOccupant} />);
}

export function createRows(props: IHouseSummaryProps) {
    const houseSummaryProps: IHouseSummaryRow = {
        transactionSummaryArray: props.transactionSummaryArray,
        householdOccupant: null,
    };
    props.householdOccupantsArray.map((householdOccupant: IOccupant) => {
        houseSummaryProps.householdOccupant = householdOccupant;
        <HouseSummaryRow {...houseSummaryProps}/>;
    }); 
}

export const HouseSummaryGrid: React.StatelessComponent<IHouseSummaryProps> = (props: IHouseSummaryProps) => {
    const dataGrid = (
      <Table
        selectable={false}
        style={houseSummaryStyles.grid}
        bodyStyle={{ overflow: 'visible' }}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>{() => createColumns(props.householdOccupantsArray)}</TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>{() => createRows(props)}</TableBody>
      </Table>
    );

    return dataGrid;
};
