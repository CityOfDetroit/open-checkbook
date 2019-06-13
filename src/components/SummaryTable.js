import React from "react";
import { Table } from "semantic-ui-react";

import Helpers from "../helpers";

const SummaryTable = ({ tableData }) => (
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
              {j === 0 ? 
                <Table.Cell rowSpan={Object.keys(tableData[t]).length} content={t} style={{ fontWeight: 600 }} /> 
                : null}
              <Table.Cell content={Helpers.floatToMoney(tableData[t][c].reduce((a, p) => { return a + p.amount }, 0))} />
              <Table.Cell content={c.split(',')[0]} />
              <Table.Cell content={c.split(',')[1]} />
              <Table.Cell content={c.split(',')[2]} />
              <Table.Cell content={c.split(',')[3]} />
            </Table.Row>
          ))}
        </>
      ))}
    </Table.Body>
  </Table>
);

export default SummaryTable;