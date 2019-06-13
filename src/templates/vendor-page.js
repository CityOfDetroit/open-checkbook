import React from "react";
import _ from 'lodash';
import { graphql} from "gatsby";
import { Header, Grid, Container, Table } from 'semantic-ui-react';
import Helpers from '../helpers'

import Layout from '../components/layout';

export default ({ data }) => {
  const v = data.postgres.vendor[0];

  const byDept = _.groupBy(v.payments, 'agencyDesc')

  return (
    <Layout>
      <Grid.Row>
        <Container>

        <Header as='h2' content={v.vendorName} subheader={`1611 Hubbard, Detroit, MI`}/>
        </Container>
      </Grid.Row>

      <Grid.Row>
        <Container>

        <Header as='h3' content={`Summary of payments`}/>
        <List>

        {Object.keys(byDept).map(d => (
          <List.Item header={d} content={byDept[d].reduce((a,p) => { return a + parseFloat(p.invoicePaymentDistAmount)}, 0)} />
          ))}
          </List>
        </Container>

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
        payments: accountsPayablesByVendorIdList(orderBy: CHECK_DATE_ASC) {
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