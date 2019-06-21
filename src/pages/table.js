import React from 'react';
import { graphql, Link } from 'gatsby';
import { Header, Grid, Breadcrumb } from 'semantic-ui-react';
import _ from 'lodash';

import Layout from "../components/layout";

const Table = ({ location, data }) => {
  const allPayments = data.postgres.allAccountsPayablesList;
  const filteredPayments = [];
  const crumbs = [];
  
  // if you navigate to this page from the drilldown chart, we start with filter params
  if (location.state !== null) {
    const params = location.state.details;

    // set up breadcrumbs
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

    // filter allPayments by drilldown chart params
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
              {filteredPayments.length > 0 ? `${filteredPayments.length.toLocaleString()} payment match this filter` : ``}
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Layout>
  );
}

export default Table;

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
