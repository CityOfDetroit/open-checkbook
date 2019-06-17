import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import treemap from 'highcharts/modules/treemap';
treemap(Highcharts);

const ExpenseCategoryChart = ({ data }) => {
  // define Highcharts options
  const options = {
    chart: {
    //   height: '100%',
      style: {
        fontFamily: 'inherit'
      },
      animation: false
    },
    series: [{
      type: 'treemap',
      data: data,
      layoutAlgorithm: 'sliceAndDice',
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 4
      }],
      colorByPoint: true,
      colors: ['#9fd5b3', '#004445', '#33566b', '#2e3761', '#cb4d4f', '#94456c', '#6d3679', '#5f355a', '#FEB70A', '#da7527', '#b6683a'],
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
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
  );
};

export default ExpenseCategoryChart;
