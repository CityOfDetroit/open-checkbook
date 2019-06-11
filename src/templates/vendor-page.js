import React from "react";
import { graphql} from "gatsby";
import { Header, Grid, List, Container, Table, TableHeader } from 'semantic-ui-react';
import Helpers from '../helpers'

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
          <Table>
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