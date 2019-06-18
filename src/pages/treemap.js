import React from 'react';
import { graphql, navigate } from 'gatsby';
import { Container, Header } from 'semantic-ui-react';

import SiteHeader from '../components/SiteHeader';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import treemap from 'highcharts/modules/treemap';

if (typeof Highcharts === 'object') {
  treemap(Highcharts);
}

const TreemapPage = ({ data }) => {
  // make expected treemap data format
  const chartData = [];
  for (let d in data.postgres.allAgenciesList) {
    let dataPoint = {
      name: data.postgres.allAgenciesList[d].deptNameShorthand,
      value: parseFloat(data.postgres.allAgenciesList[d].totalAmount),
      slug: `/agency/${data.postgres.allAgenciesList[d].deptSlug}`
    };

    chartData.push(dataPoint);
  }

  // define Highcharts options
  const options = {
    chart: {
      height: 800,
      style: {
        fontFamily: 'inherit'
      },
      animation: false
    },
    series: [{
      type: 'treemap',
      data: chartData,
      layoutAlgorithm: 'squarified',
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 4
      }],
      colorByPoint: true,
      colors: ['#9fd5b3', '#004445', '#33566b', '#2e3761', '#cb4d4f', '#94456c', '#6d3679', '#5f355a', '#FEB70A', '#da7527', '#b6683a'],
      allowPointSelect: true,
      point: {
        events: {
          select: function () {
            navigate(this.slug);
          }
        }
      },
      animation: {
        duration: 0
      }
    }],
    title: {
      text: null
    },
    credits: {
      enabled: false
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

export default TreemapPage;

export const query = graphql`
  {
    postgres {
      allAgenciesList {
        deptNameShorthand
        deptSlug
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