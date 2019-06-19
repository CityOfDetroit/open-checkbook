import React from "react";
import _ from 'lodash';
import { Link } from 'gatsby';
import { Table } from "semantic-ui-react";
import Helpers from "../helpers";

const AgencyHeader = ({ agency, grouped, link, number }) => (
  <div>
    {agency} {link ? <Link to={`/agency/${number}`}>>></Link> : null}
    <p style={{ fontWeight: 500 }}>
      {grouped[agency].length || grouped['undefined'].length} payments for {Helpers.floatToMoney(grouped[agency].reduce((a, p) => { return a + parseFloat(p.invoicePaymentDistAmount) }, 0))}
    </p>
  </div>
);

const AgencyGroupedTable = ({ tableData, payments }) => {
  console.log(payments);
  let byAgency = _(payments)
    .groupBy('fundDesc')
    .value();
    
  console.log(byAgency);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Agency</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Total Payments</Table.HeaderCell>
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
                    content={t} 
                    style={{ fontWeight: 600 }} 
                    verticalAlign='top' /> 
                  : null}
                <Table.Cell textAlign='right' content={Helpers.floatToMoney(tableData[t][c].reduce((a, p) => { return a + p.amount }, 0))} />
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

export default AgencyGroupedTable;