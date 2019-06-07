import React from "react";
import { graphql } from "gatsby";
import { Header } from 'semantic-ui-react';

import Layout from '../components/layout';

export default ({ data }) => {
  const a = data.postgres.agency[0];

  const sum = parseFloat(a.totalAmount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(sum);

  return (
    <Layout>
      <Header as='h2'>
        {a.deptName}
      </Header>
      <p>
        {a.accountsPayablesByAgencyCodeList.length.toLocaleString()} payments made in FY 2017-2018.
      </p>
      <p>
        {formatted} paid.
      </p>
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
        }
      }
    }
  }`;