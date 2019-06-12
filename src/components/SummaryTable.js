import React from "react";
import { Table } from "semantic-ui-react";

import Helpers from "../helpers";

const SummaryTable = ({ tableData }) => {
  
  // WIP: how do we dynamically make a semantic ui structured table where vendors can have rowSpan > 1 ???
  // see https://react.semantic-ui.com/collections/table/#types-structured
  let uniqVendors = Object.keys(tableData);
  let totalRows = 0;
  let rowSpans = [];

  for (let u of uniqVendors) {
    totalRows += (Object.keys(tableData[u])).length;
    rowSpans.push((Object.keys(tableData[u])).length)
  }
  
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Vendor</Table.HeaderCell>
          <Table.HeaderCell>Total Payments</Table.HeaderCell>
          <Table.HeaderCell>Fund</Table.HeaderCell>
          <Table.HeaderCell>Cost Center</Table.HeaderCell>
          <Table.HeaderCell>Expense Category</Table.HeaderCell>
          <Table.HeaderCell>Expense</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array(totalRows).fill().map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell rowSpan={rowSpans[i]}>{Object.keys(tableData)[i]}</Table.Cell>
            <Table.Cell rowSpan='1'>${i}</Table.Cell>
            <Table.Cell rowSpan='1'>fund</Table.Cell>
            <Table.Cell rowSpan='1'>cc</Table.Cell>
            <Table.Cell rowSpan='1'>exp cat</Table.Cell>
            <Table.Cell rowSpan='1'>exp</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default SummaryTable;