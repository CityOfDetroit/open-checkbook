import React from "react";
import _ from 'lodash';
import { Table } from "semantic-ui-react";
import Helpers from "../helpers";

const VendorHeader = ({ vendor }) => (
  <div>
  </div>
)

const SummaryTable = ({ tableData, payments }) => {

  let byVendor = _(payments)
    .groupBy('vendorName')
    .value()

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
              <Table.Row style={{backgroundColor: i % 2 === 0 ? 'white' : '#F9FAFB' }}>
                {j === 0 ? 
                  <Table.Cell rowSpan={Object.keys(tableData[t]).length} content={<div>{t}<p>{byVendor[t].length} payments for {Helpers.floatToMoney(byVendor[t].reduce((a, p) => { return a + parseFloat(p.invoicePaymentDistAmount) }, 0))}</p></div>} style={{ fontWeight: 600 }} verticalAlign='top' /> 
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
)};

export default SummaryTable;