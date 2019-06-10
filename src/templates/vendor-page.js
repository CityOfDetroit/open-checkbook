import React from "react";
import { graphql} from "gatsby";
import { Header, Grid, Segment, List, Container } from 'semantic-ui-react';

import Layout from '../components/layout';

export default ({ data }) => {
  const v = data.postgres.vendor[0];

  return (
    <Layout>
      <Grid.Row>
        <Header as='h2'>
          {v.vendorName}
        </Header>
      </Grid.Row>

      {/* <Grid.Row>
        <Segment.Group compact size='big'>
          <Segment>
            <strong>{a.accountsPayablesByAgencyCode.totalCount.toLocaleString()}</strong> payments made to vendors in FY17-18
          </Segment>
          <Segment>
            <strong>{formatted}</strong> total spent on goods & services
          </Segment>
        </Segment.Group>
      </Grid.Row> */}

      <Grid.Row>
        <Container>
          <Header as='h3'>
            All payments
          </Header>
          <List divided relaxed>
            {v.payments.map((p, i) => (
              <List.Item key={i}>
                ${p.invoicePaymentDistAmount} to {p.vendorName} on {p.checkDate} for {p.objectDesc}
              </List.Item>
            ))}
          </List>
        </Container>
      </Grid.Row>

      {/* <Grid.Row>
        <Container>
          <Header as='h3'>
            Most recent payments
          </Header>
          <List divided relaxed>
            {data.postgres.mostRecentPayments[0].accountsPayablesByAgencyCodeList.map((r, j) => (
              <List.Item key={j}>
                ${r.invoicePaymentDistAmount} to {r.vendorName} on {r.checkDate} for {r.objectDesc}
              </List.Item>
            ))}
          </List>
        </Container>
      </Grid.Row> */}

      {/* <Grid.Row>
        <Header as='h3'>
          ALL PAYMENTS TABLE TBD
        </Header>
      </Grid.Row> */}

    </Layout>
  );
};

export const query = graphql`
  query($id: Int!) {
    site {
      pathPrefix
    }
    postgres {
      vendor: allVendorsList(condition: {vendorId: $id}) {
        vendorType
        vendorName
        payments: accountsPayablesByVendorIdList {
          paymentHistDistId
          paymentMethod
          checkNumber
          checkDate
          checkAmount
          checkRunName
          statusCode
          vendorType
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
          vendorId
        }
      }
    }
  }`;