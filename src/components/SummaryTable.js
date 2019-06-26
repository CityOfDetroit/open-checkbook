import React from "react";
import _ from 'lodash';
import { Link } from 'gatsby';
import { Table } from "semantic-ui-react";
import Helpers from "../helpers";

const VendorHeader = ({ vendor, grouped, link, number }) => (
  <div>
    {vendor} {link ? <Link to={`/vendor/${number}`}>>></Link> : null}
    <p style={{ fontWeight: 500 }}>
      {grouped[vendor].length} payments for {Helpers.floatToMoney(grouped[vendor].reduce((a, p) => { return a + parseFloat(p.invoicePaymentDistAmount) }, 0))}
    </p>
  </div>
);

const SummaryTable = ({ tableData, payments, show }) => {
  let byVendor = _(payments)
    .groupBy('vendorName')
    .value();

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Payee</Table.HeaderCell>
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
              <Table.Row key={i + j} style={{backgroundColor: i % 2 === 0 ? 'white' : '#F9FAFB' }}>
                {j === 0 ? 
                  <Table.Cell 
                    rowSpan={Object.keys(tableData[t]).length} 
                    content={<VendorHeader vendor={t} grouped={byVendor} link={show[t]} number={tableData[t][Object.keys(tableData[t])[0]][0].vendorNumber} />} 
                    style={{ fontWeight: 600 }} 
                    verticalAlign='top' /> 
                  : null}
                <Table.Cell  verticalAlign='top' textAlign='right' content={Helpers.floatToMoney(tableData[t][c].reduce((a, p) => { return a + p.amount }, 0))} />
                <Table.Cell  verticalAlign='top' content={c.split(',')[0]} />
                <Table.Cell  verticalAlign='top' content={c.split(',')[1]} />
                <Table.Cell  verticalAlign='top' content={c.split(',')[2]} />
                <Table.Cell  verticalAlign='top' content={c.split(',')[3]} />
              </Table.Row>
            ))}
          </>
        ))}
      </Table.Body>
    </Table>
)};

export default SummaryTable;