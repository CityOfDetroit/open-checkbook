import React from 'react';
import { graphql, Link } from 'gatsby';
import { Header, Grid, Breadcrumb, Table } from 'semantic-ui-react';
import _ from 'lodash';

import Layout from "../components/layout";
import Helpers from '../helpers';

const ChartDetail = ({ location, data }) => {
  const allPayments = data.postgres.allAccountsPayablesList;
  const filteredPayments = [];
  const crumbs = [];
  
  // if you navigate to this page from the drilldown chart, we start with filter params
  if (location.state !== null) {
    const params = location.state.details;

    crumbs.push(
      {key: 'Home', content: <Link to="/">Home</Link>},
      {key: 'Chart', content: <Link to="/drilldown/">Chart</Link>},
      {key: 'Agency', content: 'Agency', link: false},
      {key: `${params.agency}`, content: `${params.agency}`, link: true},
      {key: 'CC', content: 'Cost Center', link: false},
      {key: `${params.cc}`, content: `${params.cc}`, link: false},
      {key: 'Expense', content: 'Expense Category', link: false},
      {key: `${params.expense}`, content: `${params.expense}`, link: false},
      {key: 'Vendor', content: 'Vendor', link: false},
      {key: `${params.vendor}`, content: `${params.vendor}`, link: true, active: true}
    );

    const filterBy = { 
      'agencyCode': params.agency,
      'costcenterDesc': params.cc,
      'objectDescShorthand': params.expense,
      'vendorName': params.vendor
    };
    filteredPayments.push(_.filter(allPayments, filterBy));

  // if you navigate here directly we just show you everything
  } else {
    crumbs.push(
      {key: 'Home', content: <Link to="/">Home</Link>},
      {key: 'Table', content: <Link to="/table/">All Payments Table</Link>, active: true},
    );
  }
  
  return (
    <Layout>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb icon='right angle' sections={crumbs} />
          <Header as='h1'>
            Payments Table
            <Header.Subheader>
              {allPayments.length.toLocaleString()} total payments
              <br />
              {filteredPayments[0].length > 0 ? `${filteredPayments[0].length.toLocaleString()} payments match this filter` : ``}
            </Header.Subheader>
          </Header>
          
          <Table stackable striped>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Agency</Table.HeaderCell>
                <Table.HeaderCell>Vendor</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Payment Amount</Table.HeaderCell>
                <Table.HeaderCell>Check Date</Table.HeaderCell>
                <Table.HeaderCell>Fund</Table.HeaderCell>
                <Table.HeaderCell>Cost Center</Table.HeaderCell>
                <Table.HeaderCell>Expense Category</Table.HeaderCell>
                <Table.HeaderCell>Expense</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredPayments[0].map((f, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{f.agencyDesc}</Table.Cell>
                  <Table.Cell>{f.vendorName}</Table.Cell>
                  <Table.Cell textAlign='right'>{Helpers.stringToMoney(f.invoicePaymentDistAmount)}</Table.Cell>
                  <Table.Cell>{f.checkDate.slice(0,10)}</Table.Cell>
                  <Table.Cell>{f.fundDesc}</Table.Cell>
                  <Table.Cell>{f.costcenterDesc}</Table.Cell>
                  <Table.Cell>{f.objectDescShorthand}</Table.Cell>
                  <Table.Cell>{f.objectDesc}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Layout>
  );
}

export default ChartDetail;

export const query = graphql`
  {
    postgres {
      allAccountsPayablesList {
        checkNumber
        checkDate
        vendorName
        vendorNumber
        paymentNum
        accountingDate
        invoicePaymentDistAmount
        invoiceNumber
        invoiceAmount
        invoiceDate
        fundCode
        fundDesc
        agencyCode
        agencyDesc
        costcenterCode
        costcenterDesc
        objectCode
        objectDesc
        objectDescShorthand
        fiscalYear
        vendorMasked
        agencyCodeMasked
      }
    }
  }
`;
