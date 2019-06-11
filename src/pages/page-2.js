import React from 'react';
import { graphql } from 'gatsby';
import { Container, Header } from 'semantic-ui-react';

import SiteHeader from '../components/SiteHeader';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import treemap from 'highcharts/modules/treemap';
treemap(Highcharts);

const SecondPage = ({ data }) => {
  
  // make expected treemap data format
  const chartData = [];
  for (let d in data.postgres.allAgenciesList) {
    let dataPoint = {
      name: data.postgres.allAgenciesList[d].deptNameShorthand,
      value: parseFloat(data.postgres.allAgenciesList[d].totalAmount),
      colorValue: parseInt(d, 10) + 1
    };

    chartData.push(dataPoint);
  }

  // define Highcharts options
  const options = {
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: chartData,
      colorByPoint: true,
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 3
      }]
    }],
    title: {
      text: 'Vendor Spending by Agency'
    }
  };
  
  return (
    <>
      <SiteHeader siteTitle={data.site.siteMetadata.title} />
      <Header as='h2' textAlign='center'>Highcharts Sandbox</Header>
      <Container>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    </>
  );
};

export default SecondPage;

export const query = graphql`
  {
    postgres {
      allAgenciesList {
        deptName
        deptNameShorthand
        totalAmount
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
