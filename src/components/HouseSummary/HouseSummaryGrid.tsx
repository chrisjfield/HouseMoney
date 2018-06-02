import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as mathJs from 'mathjs';
import * as React from 'react';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IHouseSummaryProps, IHouseSummaryRow, ITransactionSummary } from './houseSummaryInterfaces';
import houseSummaryStyles from './houseSummaryStyles';

export const HouseSummaryGrid: React.StatelessComponent<IHouseSummaryProps> = (props: IHouseSummaryProps) => {
    const dataGrid = (
    <Table
      style={houseSummaryStyles.grid}
      // TODO: figure out if this is important! bodyStyle={{ overflow: 'visible' }}
    >
      <TableHead>
        <TableRow>{createColumns(props.householdOccupantsArray)}</TableRow>
      </TableHead>
      <TableBody>{createRows(props)}</TableBody>
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
        <TableCell
          key={'Column' + householdOccupant.displayName}
          style={houseSummaryStyles.gridHeader}
          // TODO: How to tooltip={'The name of the person who owes the amount shown in this column'}
        >
          {householdOccupant.displayName ? householdOccupant.displayName + ' owes' : null}
        </TableCell>
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
        <TableCell key={'RowColumn' + props.householdOccupant.occupantId} style={houseSummaryStyles.gridHeader}>
          {props.householdOccupant.displayName}
        </TableCell>
        {houseSummaryRowData}
      </TableRow>
    );

    return row;
};

const HouseSummaryRowData: React.StatelessComponent<ITransactionSummary> = (transactionSummary) => {
    const rowData = (
      <TableCell
        key={'Data' + transactionSummary.creditorOccupantId}
        style={houseSummaryStyles.gridDetail}
      >
        {Number(mathJs.round(transactionSummary.gross, 2)).toFixed(2)}
      </TableCell>
    );
    return rowData;
};
