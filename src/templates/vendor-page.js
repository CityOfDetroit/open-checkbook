import React from "react";
import _ from 'lodash';
import { graphql, Link } from "gatsby";
import { Header, Grid, Table, Segment, List } from 'semantic-ui-react';

import Helpers from '../helpers';
import Layout from '../components/layout';
import AgencyGroupedTable from '../components/AgencyGroupedTable';

export default ({ data }) => {
  const v = data.postgres.vendor[0];
  const vendorPayments = v.payments;
  const byDept = _.groupBy(v.payments, 'agencyDesc');
  const byCostCenter = _.groupBy(v.payments, 'costcenterDesc');
  const byObject = _.groupBy(v.payments, 'objectDescShorthand');

  const simpler = _(vendorPayments)
    .map((v) => ({
      agencyName: v.agencyByAgencyCodeMasked.deptName,
      agencySlug: v.agencyByAgencyCodeMasked.deptSlug,
      amount: parseFloat(v.invoicePaymentDistAmount),
      categories: v.fundDesc + ',' + v.costcenterDesc + ',' + v.objectDescShorthand + ',' + v.objectDesc
    }))
    .value();

  const structuredTableDataByAgency = Helpers.nest(simpler, ['agencyName', 'categories']);

  return (
    <Layout>
      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Header as='h2'>
              {v.vendorName}
              <Header.Subheader>
                {v.payments[0].vendorType !== null ? `${v.payments[0].vendorType} based in ${v.vendorAddress}` : `${v.vendorAddress}`}
              </Header.Subheader>
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={3}>
        <Grid.Column width={4}>
          <Segment basic>
            <Header as='h3'>
              Payments by Agency
            </Header>
            <List divided relaxed>
              {Object.keys(byDept).map((d, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{d === null ? `Non-departmental` : d} <Link to={`/agency/${byDept[d][0].agencyByAgencyCodeMasked.deptSlug}`}>>></Link></List.Header>
                    <List.Description>{byDept[d].length.toLocaleString()} payments for {Helpers.floatToMoney(byDept[d].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width={4}>
          <Segment basic>
            <Header as='h3'>
              Top Cost Centers
            </Header>
            <List ordered divided relaxed>
              {Object.keys(byCostCenter).slice(0,5).map((d, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{d}</List.Header>
                    <List.Description>{byCostCenter[d].length.toLocaleString()} payments for {Helpers.floatToMoney(byCostCenter[d].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}</List.Description>
                  </List.Content>                  
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width={4}>
          <Segment basic>
            <Header as='h3'>
              Payments by Expense Category
            </Header>
            <List divided relaxed>
              {Object.keys(byObject).map((d, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{d}</List.Header>
                    <List.Description>{byObject[d].length.toLocaleString()} payments for {Helpers.floatToMoney(byObject[d].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}</List.Description>
                  </List.Content>                  
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Header as='h3'>
              All Payments
              <Header.Subheader>
                {v.payments.length} payments totaling {Helpers.floatToMoney(v.payments.reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}
              </Header.Subheader>
            </Header>
            <AgencyGroupedTable tableData={structuredTableDataByAgency} payments={vendorPayments} />
            <Table striped stackable>
              <Table.Header>
                <Table.HeaderCell>Agency</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Payment Amount</Table.HeaderCell>
                <Table.HeaderCell>Check Date</Table.HeaderCell>
                <Table.HeaderCell>Fund</Table.HeaderCell>
                <Table.HeaderCell>Cost Center</Table.HeaderCell>
                <Table.HeaderCell>Expense Category</Table.HeaderCell>
                <Table.HeaderCell>Expense</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {v.payments.map((p, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{p.agencyDesc}</Table.Cell>
                    <Table.Cell textAlign='right'>{Helpers.stringToMoney(p.invoicePaymentDistAmount)}</Table.Cell>
                    <Table.Cell>{p.checkDate.slice(0,10)}</Table.Cell>
                    <Table.Cell>{p.fundDesc}</Table.Cell>
                    <Table.Cell>{p.costcenterDesc}</Table.Cell>
                    <Table.Cell>{p.objectDescShorthand}</Table.Cell>
                    <Table.Cell>{p.objectDesc}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Layout>
  );
};

export const query = graphql`
  query($number: String!) {
    site {
      pathPrefix
    }
    postgres {
      vendor: allVendorsList(condition: {vendorNumber: $number}) {
        vendorName
        vendorAddress
        payments: accountsPayablesByVendorNumberList(first: 10) {
          checkNumber
          checkDate
          checkAmount
          statusCode
          vendorName
          invoicePaymentDistAmount
          fundDesc
          agencyDesc
          agencyByAgencyCodeMasked {
            deptName
            deptSlug
            totalAmount
          }
          appropDesc
          costcenterDesc
          objectDesc
          objectDescShorthand
          vendorType
          partyType
        }
      }
    }
  }`;