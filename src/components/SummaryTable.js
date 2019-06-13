import React from "react";
import { Table } from "semantic-ui-react";

import Helpers from "../helpers";

const SummaryTable = ({ tableData }) => {

  console.log(tableData)
  
  // WIP: how do we dynamically make a semantic ui structured table where vendors can have rowSpan > 1 ???
  // see https://react.semantic-ui.com/collections/table/#types-structured
  // let uniqVendors = Object.keys(tableData);
  // let totalRows = 0;
  // let rowSpans = [];

  // for (let u of uniqVendors) {
  //   totalRows += (Object.keys(tableData[u])).length;
  //   rowSpans.push((Object.keys(tableData[u])).length)
  // }
  
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
        {Object.keys(tableData).map((t, i) => (
          <>
            {Object.keys(tableData[t]).map((c, j) => (
              <Table.Row>
                {j === 0 ? <Table.Cell rowSpan={Object.keys(tableData[t]).length} content={t} /> : null}
                <Table.Cell content={tableData[t][c].reduce((a, p) => { return a + p.amount }, 0)} />
                <Table.Cell content={c.split('-')[0]} />
                <Table.Cell content={c.split('-')[1]} />
                <Table.Cell content={c.split('-')[2]} />
                <Table.Cell content={c.split('-')[3]} />

              </Table.Row>
            ))
            }  
          </>
        ))}
        {/* {Array(totalRows).fill().map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell rowSpan={rowSpans[i]}>{Object.keys(tableData)[i]}</Table.Cell>
            <Table.Cell rowSpan='1'>${i}</Table.Cell>
            <Table.Cell rowSpan='1'>fund</Table.Cell>
            <Table.Cell rowSpan='1'>cc</Table.Cell>
            <Table.Cell rowSpan='1'>exp cat</Table.Cell>
            <Table.Cell rowSpan='1'>exp</Table.Cell>
          </Table.Row>
        ))} */}
      </Table.Body>
    </Table>
  );
}

export default SummaryTable;