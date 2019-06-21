import React from 'react';
import { graphql, navigate } from 'gatsby';
import _ from 'lodash';
import { Grid, Segment } from 'semantic-ui-react';

import Layout from '../components/layout';
import Helpers from '../helpers';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';

if (typeof Highcharts === 'object') {
  drilldown(Highcharts);
}

const Drilldown = ({ data }) => {
  let agencies = data.postgres.allAgenciesList;
  
  // Omit legacy agencies, Default Cost Center, and Non Departmental
  let sortedAgencies = _(agencies)
    .filter(function(o) { return o.accountsPayablesByAgencyCodeMaskedList.length > 0 })
    .filter(function(p) { return p.deptName !== 'Default Cost Center' })
    .filter(function(q) { return q.deptName !== 'Non Departmental' })
    .sortBy('totalAmount')
    .reverse()
    .value();

  // top level chart data
  let series = [];
  series.push({
    name: 'Agencies',
    colorByPoint: false,
    color: "#004445",
    dataLabels: {
      enabled: true,
      formatter: function () { 
        return Helpers.stringToMoney(this.y); 
      }
    },
    data: sortedAgencies.map(a => {
      return {
        name: a.deptNameShorthand,
        y: a.accountsPayablesByAgencyCodeMaskedList.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
        drilldown: a.deptNameShorthand
      }
    })
  });

  // drilldown chart data levels
  let drilldown = {
    drillUpButton: {
      position: {y: -40}
    },
    series: []
  }

  // iterate through AGENCIES, group by COST CENTER
  sortedAgencies.forEach(a => {
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
    
    // iterate through COST CENTERS, group by EXPENSE CATEGORIES
    Object.keys(costCenterGrouping).forEach(c => {
      let expenseObjectGrouping = _.groupBy(costCenterGrouping[c], 'objectDescShorthand')

      drilldown.series.push({
        id: `${a.deptNumber}_${c}`,
        name: "Expense Categories",
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

      // iterate through EXPENSE OBJECTS, group by VENDOR
      Object.keys(expenseObjectGrouping).forEach(e => {
        let vendorGrouping = _.groupBy(expenseObjectGrouping[e], 'vendorName')

        drilldown.series.push({
          id: `${a.deptNumber}_${c}_${e}`,
          name: "Vendors",
          colorByPoint: false,
          color: "#feb70d",
          data: Object.keys(vendorGrouping).map(v => {
            let paymentsToVendor = vendorGrouping[v];
            
            // TODO only define drilldown where vendor showInStats is true
            return {
              name: v,
              y: paymentsToVendor.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0), 
              drilldown: `${a.deptNumber}_${c}_${e}_vendor`
            }
          })
        })
      })
    })
  })

  let chartOptions = {
    chart: {
      type: "bar",
      height: 1200,
      events: {
        drilldown: function(e) { 
          if (e.point.drilldown.slice(-6) === 'vendor') {
            let split = e.point.drilldown.split("_");
            let details = {
              agency: split[0],
              cc: split[1],
              expense: split[2],
              vendor: e.point.name 
            };

            navigate("/table/", {
              state: {details}
            });
          }
        },
      }
    },
    style: {
      fontFamily: ["Montserrat", "sans-serif"]
    },
    title: {
      text: "PROTOTYPE"
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
        // pointWidth: 25,
        // pointPadding: 2, // between bars
        // groupPadding: 2, // between series
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function() { 
            return Helpers.stringToMoney(this.y);
          }
        }
      }
    },
    tooltip: {
      enabled: false,
      // headerFormat: `<span style="font-size:14px">{series.name}</span><br>`,
      // pointFormat: function () { return `<span style="color:{point.color}">{point.name}</span>: ${this.y}` }
    },
    series: series,
    drilldown: drilldown
  }

  return (
    <Layout>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment basic>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />
          </Segment>
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
      accountsPayablesByAgencyCodeMaskedList {
        vendorName
        invoicePaymentDistAmount
        agencyCode
        agencyDesc
        costcenterCode
        costcenterDesc
        objectCode
        objectDesc
        objectDescShorthand
        vendorNumber
        vendorByVendorNumber{
          showInStats
        }
      }
    }
  }
}
`;

export default Drilldown;