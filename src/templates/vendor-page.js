import React from "react";
import _ from 'lodash';
import { graphql} from "gatsby";
import { Header, Grid, Container, Table, Segment, List } from 'semantic-ui-react';
import Helpers from '../helpers'

import Layout from '../components/layout';

export default ({ data }) => {
  const v = data.postgres.vendor[0];

  const byDept = _.groupBy(v.payments, 'agencyDesc')
  const byObject = _.groupBy(v.payments, 'objectDesc')

  return (
    <Layout>
      <Grid.Row centered='false'>
        <Grid.Column>

        <Container>
        <Header as='h2' content={v.vendorName} subheader={`1611 Hubbard, Detroit, MI`}/>
        </Container>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>

        <Grid.Column>
          <Segment padded>
            <Header as='h3'>
              Payments by department
            </Header>
            <List divided ordered style={{maxHeight: '30vh', overflowY: 'scroll'}}>
            {Object.keys(byDept).map(d => (
              <List.Item>
                <List.Header>{d}</List.Header>
                <List.Content>{Helpers.floatToMoney(byDept[d].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}</List.Content>
                <List.Description>{byDept[d].length} payments</List.Description>
              </List.Item>
              ))}
              </List>
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment padded>
            <Header as='h3'>
              Spending by Expense Category
            </Header>
            <List divided ordered style={{maxHeight: '30vh', overflowY: 'scroll'}}>
            {Object.keys(byObject).map(d => (
              <List.Item>
                <List.Header>{d}</List.Header>
                <List.Content>{Helpers.floatToMoney(byObject[d].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}</List.Content>
                <List.Description>{byObject[d].length} payments</List.Description>
              </List.Item>
              ))}
              </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Container>
          <Header as='h3'>
            All payments
          </Header>
          <Table sortable>
            <Table.Header>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Dep't</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
            </Table.Header>
            {v.payments.map((p, i) => (
              <Table.Row>
                <Table.Cell>{Helpers.stringToMoney(p.invoicePaymentDistAmount)}</Table.Cell>
                <Table.Cell>{p.checkDate}</Table.Cell>
                <Table.Cell>{p.agencyDesc}</Table.Cell>
                <Table.Cell>{p.objectDesc}</Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </Container>
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
        payments: accountsPayablesByVendorNumberList(orderBy: CHECK_DATE_ASC) {
          paymentHistDistId
          paymentMethod
          checkNumber
          checkDate
          checkAmount
          checkRunName
          statusCode
          vendorName
          paymentNum
          periodName
          accountingDate
          invoicePaymentAmount
          invoicePaymentDistAmount
          invoiceDistAmount
          invoiceSource
          invoiceNumber
          invoiceAmount
          invoiceDate
          fundCode
          fundDesc
          agencyCode
          agencyDesc
          appropCode
          appropDesc
          costcenterCode
          costcenterDesc
          objectCode
          objectDesc
          objectDescShorthand
          poNumber
          vendorNumber
        }
      }
    }
  }`;