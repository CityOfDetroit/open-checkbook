import React from "react";
import { graphql} from "gatsby";
import { Header, Grid, List, Segment } from 'semantic-ui-react';
import _ from 'lodash';

import Layout from '../components/layout';
import SummaryTable from '../components/SummaryTable';
import ExpenseCategoryChart from '../components/ExpenseCategoryChart';
import Helpers from '../helpers';

export default ({ data }) => {
  const a = data.postgres.agency[0];
  const agencyPayments = a.accountsPayablesByAgencyCodeList;

  // top n vendors
  const vendorStats = _(agencyPayments)
    .groupBy('vendorName')
    .map((vendor, key) => ({
        name: key,
        numPayments: vendor.length,
        sumPayments: vendor.reduce((a, v) => a + parseFloat(v.invoicePaymentDistAmount), 0)
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value();

  // top n cost centers
  const ccStats = _(agencyPayments)
    .groupBy('costcenterDesc')
    .map((cc, key) => ({
      name: key,
      numPayments: cc.length,
      sumPayments: cc.reduce((a, c) => a + parseFloat(c.invoicePaymentDistAmount), 0)
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value();

  // Highcharts treemap data structure
  const expenseChartData = _(agencyPayments)
    .groupBy('objectDescShorthand')
    .map((obj, key) => ({
      name: key,
      value: obj.reduce((a, o) => a + parseFloat(o.invoicePaymentDistAmount), 0)
    }))
    .value();

  // group my multiple categories so we can make a "structured table" keyed on vendors and unique combos of expense categories
  const simplified = _(agencyPayments)
    .map((a) => ({
      vendorName: a.vendorName,
      amount: parseFloat(a.invoicePaymentDistAmount),
      categories: a.fundDesc + ',' + a.costcenterDesc + ',' + a.objectDescShorthand + ',' + a.objectDesc
    }))
    .value();

  const structuredTableData = Helpers.nest(simplified, ['vendorName', 'categories']);

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
            Summary of all Payments
            <Header.Subheader>
              {agencyPayments.length.toLocaleString()} payments made to {vendorStats.length.toLocaleString()} vendors
            </Header.Subheader>
          </Header>
          <SummaryTable tableData={structuredTableData} />
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