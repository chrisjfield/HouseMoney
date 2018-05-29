import Table, { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import * as mathJs from 'mathjs';
import * as React from 'react';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IHouseSummaryProps, IHouseSummaryRow, ITransactionSummary } from './houseSummaryInterfaces';
import houseSummaryStyles from './houseSummaryStyles';

export const HouseSummaryGrid: React.StatelessComponent<IHouseSummaryProps> = (props: IHouseSummaryProps) => {
    const dataGrid = (
    <Table
      selectable={false}
      style={houseSummaryStyles.grid}
      bodyStyle={{ overflow: 'visible' }}
    >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>{createColumns(props.householdOccupantsArray)}</TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>{createRows(props)}</TableBody>
    </Table>
  );

    return dataGrid;
};

function createColumns(householdOccupantsArray: IOccupant[]): JSX.Element[] {
    const columnData = ['', ...householdOccupantsArray];
    const columnArray: JSX.Element[] = columnData.map((householdOccupant: IOccupant) => 
      <HouseSummaryColumn {...householdOccupant} />);
    return columnArray;
}

function createRows(props: IHouseSummaryProps): JSX.Element[] {
    const houseSummaryProps: IHouseSummaryRow = {
        transactionSummaryArray: props.transactionSummaryArray,
        householdOccupant: null,
    };
    const rowArray: JSX.Element[] = props.householdOccupantsArray.map((householdOccupant) => {
        houseSummaryProps.householdOccupant = householdOccupant;
        return <HouseSummaryRow {...houseSummaryProps}/>;
    }); 
    return rowArray;
}

const HouseSummaryColumn: React.StatelessComponent<IOccupant> = (householdOccupant) => {
    const column = (
        <TableHeaderColumn
          key={'Column' + householdOccupant.displayName}
          style={houseSummaryStyles.gridHeader}
        >
          {householdOccupant.displayName ? householdOccupant.displayName + ' owes' : null}
        </TableHeaderColumn>
    );

    return column;
};

const HouseSummaryRow: React.StatelessComponent<IHouseSummaryRow> = (props) => {
    const transactionSummaryArrayData = props.transactionSummaryArray.filter(
      (gridElement: ITransactionSummary) => gridElement.creditorOccupantId === props.householdOccupant.occupantId,
    );
    const houseSummaryRowData: JSX.Element[] = transactionSummaryArrayData.map((transactionSummary: ITransactionSummary) =>
        <HouseSummaryRowData {...transactionSummary} />);
    const row = (
      <TableRow key={'Row' + props.householdOccupant.occupantId}>
        <TableRowColumn key={'RowColumn' + props.householdOccupant.occupantId} style={houseSummaryStyles.gridHeader}>
          {props.householdOccupant.displayName}
        </TableRowColumn>
        {houseSummaryRowData}
      </TableRow>
    );

    return row;
};

const HouseSummaryRowData: React.StatelessComponent<ITransactionSummary> = (transactionSummary) => {
    const rowData = (
      <TableRowColumn
        key={'Data' + transactionSummary.creditorOccupantId}
        style={houseSummaryStyles.gridDetail}
      >
        {Number(mathJs.round(transactionSummary.gross, 2)).toFixed(2)}
      </TableRowColumn>
    );
    return rowData;
};
