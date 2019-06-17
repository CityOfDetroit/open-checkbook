import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';

import Layout from '../components/layout';
import Helpers from '../helpers';
import { Grid } from 'semantic-ui-react';

drilldown(Highcharts);

const Drilldown = ({ data }) => {
  let agencies = data.postgres.allAgenciesList

  let series = []

  series.push({
    name: 'Departments',
    colorByPoint: false,
    color: "#004445",
    data: agencies.map(a => {
      return {
        name: a.deptNameAbbreviation,
        y: a.accountsPayablesByAgencyCodeMaskedList.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
        drilldown: a.deptNameShorthand
      }
    })
  })

  let drilldown = {
    drillUpButton: {
      position: {y: -40}
    },
    series: []
  }

  // iterate through AGENCIES
  agencies.forEach(a => {
    // group by Cost Center
    let costCenterGrouping = _.groupBy(a.accountsPayablesByAgencyCodeMaskedList, 'costcenterDesc')

    drilldown.series.push({
      id: a.deptNameShorthand,
      name: "Cost Centers",
      colorByPoint: false,
      color: "#279989",
      data: Object.keys(costCenterGrouping).map(c => {
        let costCenterPayments = costCenterGrouping[c]
        return {
          name: c,
          y: costCenterPayments.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
          drilldown: `${a.deptNumber}_${c}`
        }
      })
    })
    
    // iterate through COST CENTERS
    Object.keys(costCenterGrouping).forEach(c => {
      // push to the drilldown series
      let expenseObjectGrouping = _.groupBy(costCenterGrouping[c], 'objectDescShorthand')

      drilldown.series.push({
        id: `${a.deptNumber}_${c}`,
        name: "Expense Objects",
        colorByPoint: false,
        color: "#9fd5b3",
        data: Object.keys(expenseObjectGrouping).map(e => {
          let expenseObjectPayments = expenseObjectGrouping[e]
          return {
            name: e,
            y: expenseObjectPayments.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
            drilldown: `${a.deptNumber}_${c}_${e}`
          }
        })
      })

      // iterate through EXPENSE OBJECTS
      Object.keys(expenseObjectGrouping).forEach(e => {
        let vendorGrouping = _.groupBy(expenseObjectGrouping[e], 'vendorName')

        drilldown.series.push({
          id: `${a.deptNumber}_${c}_${e}`,
          name: "Vendors",
          colorByPoint: false,
          color: "#feb70d",
          data: Object.keys(vendorGrouping).map(v => {
            let paymentsToVendor = vendorGrouping[v]
            return {
              name: v,
              y: paymentsToVendor.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0)
            }
          })
        })
      })
    })
  })

  let chartOptions = {
    chart: {

      type: "bar",
      height: 900,
    },
    style: {
        fontFamily: ["Montserrat", "sans-serif"]
    },
    title: {
      text: ""
    },
    xAxis: {
        type: "category"
    },
    yAxis: {
        title: {
            text: "Total Payments"
        }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                formatter: function() { return Helpers.stringToMoney(this.y) }
            }
        }
    },
    tooltip: {
      headerFormat: `<span style="font-size:14px">{series.name}</span><br>`,
      pointFormat: function () { return `<span style="color:{point.color}">{point.name}</span>: ${this.y}` }
    },
    series: series,
    drilldown: drilldown
  }

  return (
    <Layout>
      <Grid.Row>
        <Grid.Column width={16}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </Grid.Column>
      </Grid.Row>
    </Layout>
  );
}

export const query = graphql`
{
  postgres {
    allAgenciesList{
      dept
      deptNumber
      parent
      deptName
      deptNameShorthand
      deptNameAbbreviation
      deptSlug
      totalAmount
      accountsPayablesByAgencyCodeMaskedList(first: 20) {
        vendorName
        invoicePaymentDistAmount
        fundCode
        fundDesc
        agencyCode
        agencyDesc
        costcenterCode
        costcenterDesc
        objectCode
        objectDesc
        objectDescShorthand
        vendorNumber
      }
    }
  }
}
`;

export default Drilldown;