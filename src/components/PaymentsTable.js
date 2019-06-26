import React from "react";
import { Table } from "semantic-ui-react";

import Helpers from "../helpers";

const PaymentsTable = ({ tableData }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Payee</Table.HeaderCell>
        <Table.HeaderCell>Payment Amount</Table.HeaderCell>
        <Table.HeaderCell>Check Date</Table.HeaderCell>
        <Table.HeaderCell>Fund</Table.HeaderCell>
        <Table.HeaderCell>Cost Center</Table.HeaderCell>
        <Table.HeaderCell>Expense Category</Table.HeaderCell>
        <Table.HeaderCell>Expense</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {tableData.map((t, i) => (
        <Table.Row key={i}>
          <Table.Cell>{t.vendorName}</Table.Cell>
          <Table.Cell>{Helpers.stringToMoney(t.invoicePaymentDistAmount)}</Table.Cell>
          <Table.Cell>{t.checkDate}</Table.Cell>
          <Table.Cell>{t.fundDesc}</Table.Cell>
          <Table.Cell>{t.costcenterDesc}</Table.Cell>
          <Table.Cell>{t.objectDescShorthand}</Table.Cell>
          <Table.Cell>{t.objectDesc}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default PaymentsTable;