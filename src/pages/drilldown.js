import React from 'react';
import { graphql, navigate, Link } from 'gatsby';
import _ from 'lodash';
import { Grid, Segment, Header, Responsive, Message } from 'semantic-ui-react';

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
    .filter(function(p) { return p.deptName !== 'Pass Through Payments' })
    .filter(function(q) { return q.deptName !== 'Non Departmental' })
    .sortBy('totalAmount')
    .reverse()
    .value();

  // top level chart data
  let series = [];
  series.push({
    name: 'Agency',
    colorByPoint: false,
    color: "#004445",
    dataLabels: {
      enabled: true,
      formatter: function() { 
        return Helpers.formatMoney(this.y);
      }
    },
    data: sortedAgencies.map(a => {
      return {
        name: a.deptNameShorthand,
        y: a.accountsPayablesByAgencyCodeMaskedList.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
        drilldown: a.deptNameShorthand
      }
    }).sort((a,b) => { return a.y < b.y })
  });

  // drilldown chart data levels
  let drilldown = {
    drillUpButton: {
      position: {y: -40},
      theme: {
        fill: "transparent",
        states: {
          hover: {
            fill: "#9fd5b3"
          }
        },
        stroke: "transparent",
        strokeWidth: 0,
        style: {"color": "#18252a", "cursor": "pointer", "fontSize": "18px", "text-decoration": "none", "font-family": "Montserrat, sans-serif"}
      }
    },
    activeAxisLabelStyle: {"color": "#18252a", "cursor": "pointer", "fontSize": "12px", "text-decoration": "none", "font-family": "Montserrat, sans-serif"},
    activeDataLabelStyle: {"color": "white", "cursor": "pointer", "fontSize": "12px", "text-decoration": "none", "font-family": "Montserrat, sans-serif", "font-weight":"400"},
    series: [],
  }

  // iterate through AGENCIES, group by COST CENTER
  sortedAgencies.forEach(a => {
    let costCenterGrouping = _.groupBy(a.accountsPayablesByAgencyCodeMaskedList, 'costcenterDesc')

    drilldown.series.push({
      id: a.deptNameShorthand,
      name: "Cost Center",
      colorByPoint: false,
      color: "#279989",
      data: Object.keys(costCenterGrouping).map(c => {
        let costCenterPayments = costCenterGrouping[c]
        return {
          name: c,
          y: costCenterPayments.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
          drilldown: `${a.deptNumber}_${c}`
        }
      }).sort((a, b) => { return a.y < b.y })
    })
    
    // iterate through COST CENTERS, group by EXPENSE CATEGORIES
    Object.keys(costCenterGrouping).forEach(c => {
      let expenseObjectGrouping = _.groupBy(costCenterGrouping[c], 'objectDescShorthand')

      drilldown.series.push({
        id: `${a.deptNumber}_${c}`,
        name: "Expense Category",
        colorByPoint: false,
        color: "#9fd5b3",
        data: Object.keys(expenseObjectGrouping).map(e => {
          let expenseObjectPayments = expenseObjectGrouping[e]
          return {
            name: e,
            y: expenseObjectPayments.reduce((a, p) => a + parseFloat(p.invoicePaymentDistAmount), 0),
            drilldown: `${a.deptNumber}_${c}_${e}`
          }
        }).sort((a, b) => { return a.y < b.y })
      })

      // iterate through EXPENSE OBJECTS, group by VENDOR
      Object.keys(expenseObjectGrouping).forEach(e => {
        let vendorGrouping = _.groupBy(expenseObjectGrouping[e], 'vendorName')

        drilldown.series.push({
          id: `${a.deptNumber}_${c}_${e}`,
          name: "Payee",
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
          }).sort((a, b) => { return a.y < b.y })
        })
      })
    })
  })

  let defaultTitle = 'Total Payments by Agency';
  let drilldownTitle = 'Total Payments by ';

  let chartOptions = {
    chart: {
      type: "bar",
      height: 1200,
      events: {
        drilldown: function(e) { 
          // change title if it's not the lowest level
          if (e.point.drilldown.slice(-6) !== 'vendor') {
            this.setTitle({ text: drilldownTitle + e.seriesOptions.name });
          }
          
          // if it's the lowest level, navigate to filtered table view
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
        drillup: function(e) {
          this.setTitle({ text: drilldownTitle + e.seriesOptions.name });
        }
      }
    },
    style: {
      fontFamily: ["Montserrat", "sans-serif"]
    },
    title: {
      text: defaultTitle,
      style: {"font-family":"Montserrat"}
    },
    xAxis: {
      type: "category",
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0
    },
    yAxis: {
      title: {
          text: "Total Payments",
          style: {"font-family":"Montserrat"}
      },
      labels: {
        style: {"color": "#18252a", "fontSize": "12px"},
      }, 
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineColor: 'transparent',
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      scrollbar: {
        enabled: true
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
          style: {"font-weight":"400", "text-decoration":"none"},
          formatter: function() { 
            return Helpers.formatMoney(this.y);
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
        <Grid.Column width={12}>
          <Responsive maxWidth={768} as={Message} content={`This chart is best viewed on a desktop computer.`} />
          <Segment basic>
            <Header as='h1'>
              Chart
              <Header.Subheader>
                Click on a bar to filter payments by their categories. This visualization excludes <Link to="/agency/non-departmental">Non Departmental</Link> payments.
              </Header.Subheader>
            </Header>
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
      deptNumber
      deptName
      deptNameShorthand
      totalAmount
      accountsPayablesByAgencyCodeMaskedList {
        vendorName
        invoicePaymentDistAmount
        agencyCode
        costcenterDesc
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