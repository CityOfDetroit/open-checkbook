import React from "react";
import { graphql} from "gatsby";
import { Header, Grid, Segment, List, Container } from 'semantic-ui-react';

import Layout from '../components/layout';
import PaymentsTable from '../components/PaymentsTable';
import Helpers from '../helpers';

export default ({ data }) => {
  const a = data.postgres.agency[0];

  return (
    <Layout>
      <Grid.Row>
        <Header as='h2'>
          {a.deptName}
        </Header>
      </Grid.Row>

      <Grid.Row>
        <Segment.Group compact size='big'>
          <Segment>
            <strong>{a.accountsPayablesByAgencyCodeList.length.toLocaleString()}</strong> payments made to vendors in FY17-18
          </Segment>
          <Segment>
            <strong>{Helpers.stringToMoney(a.totalAmount)}</strong> total spent on goods & services
          </Segment>
        </Segment.Group>
      </Grid.Row>

      <Grid.Row>
        <Container>
          <Header as='h3'>
            Biggest payments
          </Header>
          <List divided relaxed>
            {data.postgres.biggestPayments[0].accountsPayablesByAgencyCodeList.map((b, i) => (
              <List.Item key={i}>
                {Helpers.stringToMoney(b.invoicePaymentDistAmount)} to {b.vendorName} on {b.checkDate} for {b.objectDesc}
              </List.Item>
            ))}
          </List>
        </Container>
      </Grid.Row>

      <Grid.Row>
        <Container>
          <Header as='h3'>
            Most recent payments
          </Header>
          <List divided relaxed>
            {data.postgres.mostRecentPayments[0].accountsPayablesByAgencyCodeList.map((r, j) => (
              <List.Item key={j}>
                {Helpers.stringToMoney(r.invoicePaymentDistAmount)} to {r.vendorName} on {r.checkDate} for {r.objectDesc}
              </List.Item>
            ))}
          </List>
        </Container>
      </Grid.Row>

      <Grid.Row>
        <Header as='h3'>
          ALL PAYMENTS
        </Header>
        <PaymentsTable tableData={a.accountsPayablesByAgencyCodeList} />
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
      biggestPayments: allAgenciesList(condition: {deptName: $name}) {
        accountsPayablesByAgencyCodeList(first: 5, orderBy: INVOICE_PAYMENT_DIST_AMOUNT_DESC) {
          vendorName
          invoicePaymentDistAmount
          checkDate
          objectDesc
          objectDescShorthand
        }
      }
      mostRecentPayments: allAgenciesList(condition: {deptName: $name}) {
        accountsPayablesByAgencyCodeList(first: 5, orderBy: CHECK_DATE_DESC) {
          vendorName
          invoicePaymentDistAmount
          checkDate
          objectDesc
          objectDescShorthand
        }
      }
    }
  }`;