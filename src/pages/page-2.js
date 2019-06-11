import React from 'react';
import { graphql } from 'gatsby';
import { Container, Header } from 'semantic-ui-react';
import _ from 'lodash';

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
      value: parseFloat(data.postgres.allAgenciesList[d].totalAmount)
    };

    chartData.push(dataPoint);
  }

  // merge & sum all dwsd into single agency (do in source data in future)
  const dedupedChartData = _.chain(chartData)
    .groupBy('name')
    .map(function(objects, dept) {
      return {
        name: dept,
        value: _.sumBy(objects, 'value')
      };
    })
    .value();

  // define Highcharts options
  const options = {
    series: [{
      type: 'treemap',
      data: dedupedChartData,
      layoutAlgorithm: 'squarified',
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 3
      }],
      colorByPoint: true,
      allowPointSelect: true,
      // see https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-point-events-select/
      point: {
        events: {
          select: function () {
            var text = this.name + ' was last selected',
                chart = this.series.chart;
            if (!chart.lbl) {
              chart.lbl = chart.renderer.label(text, 100, 70)
                .attr({
                  padding: 10,
                  r: 5,
                  fill: Highcharts.getOptions().colors[1],
                  zIndex: 5
                })
                .css({
                  color: '#FFFFFF'
                })
                .add();
            } else {
              chart.lbl.attr({
                text: text
              });
            }
          }
        }
      }
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
