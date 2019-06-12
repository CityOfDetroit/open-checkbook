import React from "react";
import { graphql} from "gatsby";
import { Header, Grid, List, Segment } from 'semantic-ui-react';
import _ from 'lodash';

import Layout from '../components/layout';
import PaymentsTable from '../components/PaymentsTable';
import ExpenseCategoryChart from '../components/ExpenseCategoryChart';

import Helpers from '../helpers';

export default ({ data }) => {
  const a = data.postgres.agency[0];

  const vendorStats = _(a.accountsPayablesByAgencyCodeList)
    .groupBy('vendorName')
    .map((vendor, key) => ({
        name: key,
        numPayments: vendor.length,
        sumPayments: vendor.reduce((a, v) => a + parseFloat(v.invoicePaymentDistAmount), 0)
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value();

  const ccStats = _(a.accountsPayablesByAgencyCodeList)
    .groupBy('costcenterDesc')
    .map((cc, key) => ({
      name: key,
      numPayments: cc.length,
      sumPayments: cc.reduce((a, c) => a + parseFloat(c.invoicePaymentDistAmount), 0)
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value();

  const expenseChartData = _(a.accountsPayablesByAgencyCodeList)
    .groupBy('objectDescShorthand')
    .map((obj, key) => ({
      name: key,
      value: obj.reduce((a, o) => a + parseFloat(o.invoicePaymentDistAmount), 0)
    }))
    .value();

  return (
    <Layout>
      <Grid.Row>
        <Header as='h2' floated='left' textAlign='left'>
          {a.deptName}
          <Header.Subheader>Spent {Helpers.stringToMoney(a.totalAmount)} in FY17-18</Header.Subheader>
        </Header>
      </Grid.Row>

      <Grid.Row columns={2} stretched>
        <Grid.Column>
          <Segment padded>
            <Header as='h3'>
              Top Vendors
            </Header>
            <List divided ordered>
              {vendorStats.slice(0,5).map((v, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header as='a'>{v.name}</List.Header>
                    <List.Description>{Helpers.floatToMoney(v.sumPayments)}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>

          <Segment padded>
            <Header as='h3'>
              Top Cost Centers
            </Header>
            <List divided ordered>
              {ccStats.slice(0,5).map((c, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{c.name}</List.Header>
                    <List.Description>{Helpers.floatToMoney(c.sumPayments)}</List.Description>
                  </List.Content>
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
            <ExpenseCategoryChart data={expenseChartData} />
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Segment basic style={{ width: '100%' }}>
          <Header as='h3' floated='left' textAlign='left'>
            All Payments
            <Header.Subheader>
              {a.accountsPayablesByAgencyCodeList.length.toLocaleString()} payments made to {vendorStats.length.toLocaleString()} vendors
            </Header.Subheader>
          </Header>
          <PaymentsTable tableData={a.accountsPayablesByAgencyCodeList} />
        </Segment>
      </Grid.Row>
    </Layout>
  );
};

export const query = graphql`
  query($name: String!) {
    site {
      pathPrefix
    }
    postgres {
      agency: allAgenciesList(condition: {deptName: $name}) {
        deptName
        totalAmount
        accountsPayablesByAgencyCodeList {
          vendorName
          invoicePaymentDistAmount
          checkDate
          fundDesc
          costcenterDesc
          objectDesc
          objectDescShorthand
        }
      }
    }
  }`;