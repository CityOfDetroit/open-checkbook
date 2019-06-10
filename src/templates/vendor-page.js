import React from "react";
import { graphql} from "gatsby";
import { Header, Grid, List, Container } from 'semantic-ui-react';

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