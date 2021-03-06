import React from 'react';
import { graphql, Link } from 'gatsby';
import { Header, Grid, Breadcrumb, Table } from 'semantic-ui-react';
import _ from 'lodash';

import Layout from "../components/layout";
import Helpers from '../helpers';

const ChartDetail = ({ location, data }) => {
  let payments = [];
  const crumbs = [];


  
  // if you navigate to this page from the drilldown chart, we start with filter params
  if (location.state) {
    const params = location.state.details;

    // filter payments
    const filterBy = { 
      'agencyCode': params.agency,
      'costcenterDesc': params.cc,
      'objectDescShorthand': params.expense,
      'vendorName': params.vendor
    };
    payments = _.filter(data.postgres.allAccountsPayablesList, filterBy);

    // set detailed breadcrumbs to reflect filters
    crumbs.push(
      {key: 'Home', content: <Link to="/">Home</Link>},
      {key: 'Agency', content: 'Agency', link: false},
      {key: `${params.agency}`, content: `${payments[0].agencyDesc}`, link: true},
      {key: 'CC', content: 'Cost Center', link: false},
      {key: `${params.cc}`, content: `${params.cc}`, link: false},
      {key: 'Expense', content: 'Expense Category', link: false},
      {key: `${params.expense}`, content: `${params.expense}`, link: false},
      {key: 'Vendor', content: 'Payee', link: false},
      {key: `${params.vendor}`, content: `${params.vendor}`, link: true, active: true}
    );

  // if you navigate here directly we just show you everything
  } else {
    payments = data.postgres.allAccountsPayablesList;

    crumbs.push(
      {key: 'Home', content: <Link to="/">Home</Link>},
      {key: 'Table', content: <Link to="/table/">All Payments</Link>, active: true},
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
              {payments.length > 100000 ? 
                `Showing 100 of ${payments.length.toLocaleString()} payments` 
                : `Showing ${payments.length.toLocaleString()} payments`}
            </Header.Subheader>
          </Header>
          
          <Table stackable striped>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Agency</Table.HeaderCell>
                <Table.HeaderCell>Payee</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Payment Amount</Table.HeaderCell>
                <Table.HeaderCell>Check Date</Table.HeaderCell>
                <Table.HeaderCell>Fiscal Year</Table.HeaderCell>
                <Table.HeaderCell>Fund</Table.HeaderCell>
                <Table.HeaderCell>Cost Center</Table.HeaderCell>
                <Table.HeaderCell>Expense Category</Table.HeaderCell>
                <Table.HeaderCell>Expense</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.sampleSize(payments, 100).sort((a, b) => { return a.checkDate < b.checkDate}).map((f, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    {f.agencyDesc} <Link to={`/agency/${f.agencyByAgencyCodeMasked.deptSlug}`}>>></Link>
                  </Table.Cell>                  
                  <Table.Cell>
                    {f.vendorByVendorNumber.showInStats ?
                      <>{f.vendorName} <Link to={`/vendor/${f.vendorNumber}`}>>></Link></> :
                      f.vendorName}
                  </Table.Cell>
                  <Table.Cell textAlign='right'>{Helpers.stringToMoney(f.invoicePaymentDistAmount)}</Table.Cell>
                  <Table.Cell>{f.checkDate.slice(0,10)}</Table.Cell>
                  <Table.Cell>{f.fiscalYear}</Table.Cell>
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
      allAccountsPayablesList(orderBy: CHECK_DATE_DESC) {
        checkDate
        vendorName
        vendorNumber
        vendorByVendorNumber {
          showInStats
        }
        agencyByAgencyCodeMasked {
          deptSlug
        }
        invoicePaymentDistAmount
        fundDesc
        agencyCode
        agencyDesc
        costcenterDesc
        objectDesc
        objectDescShorthand
        fiscalYear
      }
    }
  }
`;
