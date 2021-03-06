import React from "react";
import _ from 'lodash';
import { graphql, Link } from "gatsby";
import { Header, Grid, Segment, List, Breadcrumb, Message } from 'semantic-ui-react';

import Helpers from '../helpers';
import Layout from '../components/layout';
import AgencyGroupedTable from '../components/AgencyGroupedTable';
import Footer from '../components/Footer';

export default ({ data }) => {
  const v = data.postgres.vendor[0];
  const vendorPayments = v.payments;
  
  const byCostCenter = _(v.payments)
    .groupBy('costcenterDesc')
    .value();

  const costCenterTotals = Object.keys(byCostCenter)
    .map((c, i) => ({
      name: c,
      numPayments: byCostCenter[c].length,
      sumPayments: byCostCenter[c].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0)
    }));

  const topCostCenters = _(costCenterTotals)
    .orderBy('sumPayments', 'desc')
    .value();

  const byObject = _.groupBy(v.payments, 'objectDescShorthand');

  // set up breadcrumbs
  const crumbs = [
    {key: 'Home', content: <Link to="/">Home</Link>},
    {key: 'Vendor', content: 'Payee', link: false},
    {key: `${v.vendorName}`, content: <Link to={`/vendor/${v.vendorNumber}`}>{v.vendorName}</Link>, active: true}
  ];

  // grouped table data
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
    <Layout pageTitle={v.vendorName}>
      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Breadcrumb icon='angle right' sections={crumbs} />
            <Header as='h2'>
              {v.vendorName}
              <Header.Subheader>
                {v.payments[0].vendorType !== null ? `${v.payments[0].vendorType} based in ${v.vendorAddress}` : `${v.vendorAddress}`}
              </Header.Subheader>
            </Header>
          </Segment>
          {v.passThroughPayee ? <Message content='The City of Detroit collects revenue on this entity’s behalf and sends the revenue to this entity via these pass through payments.' /> : ``}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column width={6}>
          <Segment basic>
            <Header as='h3'>
              Top Cost Centers
            </Header>
            <List ordered divided relaxed>
              {topCostCenters.slice(0,5).map((d, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{d.name}</List.Header>
                    <List.Description>{d.numPayments.toLocaleString()} payments for {Helpers.floatToMoney(d.sumPayments)}</List.Description>
                  </List.Content>                  
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment basic>
            <Header as='h3'>
              Total Payments by Expense Category
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
              Summary of All Payments
              <Header.Subheader>
                {v.payments.length.toLocaleString()} payments totaling {Helpers.floatToMoney(v.payments.reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0))}
              </Header.Subheader>
            </Header>
            <AgencyGroupedTable tableData={structuredTableDataByAgency} payments={vendorPayments} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Footer/>
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
        vendorNumber
        passThroughPayee
        payments: accountsPayablesByVendorNumberList(orderBy: AGENCY_DESC_ASC) {
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