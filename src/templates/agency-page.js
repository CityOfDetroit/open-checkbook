import React from 'react'
import { graphql, Link } from 'gatsby'
import { Header, Grid, List, Segment, Breadcrumb } from 'semantic-ui-react'
import _ from 'lodash'

import Layout from '../components/layout'
import SummaryTable from '../components/SummaryTable'
import Helpers from '../helpers'
import Footer from '../components/Footer'
import Term from '../components/Term'

export default ({ data }) => {
  const a = data.postgres.agency[0]
  const agencyPayments = a.accountsPayablesByAgencyCodeMaskedList.filter(
    p =>
      p.agencyDesc !== 'Pass Through Payments' ||
      p.objectDescShorthand === 'Pass Through'
  )

  const payroll = a.payroll
  const totalPayroll = payroll.length > 0 ? payroll.map(p => p.grossAmount).reduce((a, b) => parseFloat(a) + parseFloat(b)) : 0
  console.log(payroll)
  console.log(totalPayroll)

  let totalSpending = parseFloat(a.totalAmount) + parseFloat(totalPayroll)

  // set up breadcrumbs
  const crumbs = [
    { key: 'Home', content: <Link to="/">Home</Link> },
    { key: 'Agency', content: 'Agency', link: false },
    {
      key: `${a.deptName}`,
      content: <Link to={`/agency/${a.deptSlug}`}>{a.deptNameShorthand}</Link>,
      active: true,
    },
  ]

  // top n vendors
  const vendorStats = _(agencyPayments)
    .groupBy('vendorName')
    .map((vendor, key) => ({
      name: key,
      number: vendor[0].vendorNumber,
      numPayments: vendor.length,
      sumPayments: vendor.reduce(
        (a, v) => a + parseFloat(v.invoicePaymentDistAmount),
        0
      ),
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value()

  // top n cost centers
  const ccStats = _(agencyPayments)
    .groupBy('costcenterDesc')
    .map((cc, key) => ({
      name: key,
      numPayments: cc.length,
      sumPayments: cc.reduce(
        (a, c) => a + parseFloat(c.invoicePaymentDistAmount),
        0
      ),
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value()

  // top n expense categories
  const expStats = _(agencyPayments)
    .groupBy('objectDescShorthand')
    .map((exp, key) => ({
      name: key,
      numPayments: exp.length,
      sumPayments: exp.reduce(
        (a, e) => a + parseFloat(e.invoicePaymentDistAmount),
        0
      ),
    }))
    .orderBy(['sumPayments', 'name'], ['desc', 'asc'])
    .value()

  // // Highcharts treemap data structure
  // const expenseChartData = _(agencyPayments)
  //   .groupBy('objectDescShorthand')
  //   .map((obj, key) => ({
  //     name: key,
  //     value: obj.reduce((a, o) => a + parseFloat(o.invoicePaymentDistAmount), 0)
  //   }))
  //   .value();

  // group by multiple categories so we can make a "structured table" keyed on vendors and unique combos of expense categories
  const simplified = _(agencyPayments)
    .map(a => ({
      vendorName: a.vendorName,
      vendorNumber: a.vendorNumber,
      amount: parseFloat(a.invoicePaymentDistAmount),
      categories:
        a.fundDesc +
        ',' +
        a.costcenterDesc +
        ',' +
        a.objectDescShorthand +
        ',' +
        a.objectDesc,
    }))
    .value()

  const structuredTableData = Helpers.nest(simplified, [
    'vendorName',
    'categories',
  ])

  const bottomHeader = {
    verticalAlign: 'bottom',
    margin: 0,
    display: 'table-cell',
    height: '50px',
  }

  // get the show/hide status for each vendor
  let vendorShowStats = _(agencyPayments)
    .groupBy('vendorName')
    .value()

  let show = {}
  Object.keys(vendorShowStats).forEach(v => {
    let anyTrue = vendorShowStats[v].map(
      vss => vss.vendorByVendorNumber.showInStats
    )
    show[v] = !anyTrue.some(a => a === false)
  })

  return (
    <Layout pageTitle={a.deptName}>
      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Breadcrumb icon="right angle" sections={crumbs} />
            <Header as="h1">
              <div style={{display: 'flex', alignContent: 'center'}}>
              {a.deptName}
              {a.deptName === 'Non Departmental' ? <Term term='non-departmental' size='regular' /> : null}
              </div>
              <Header.Subheader>
                {Helpers.stringToMoney(totalSpending)} total payments in fiscal
                year 2018-2019
              </Header.Subheader>
              <Header.Subheader>
                {Helpers.stringToMoney(a.totalAmount)} vendor payments
              </Header.Subheader>
              <Header.Subheader>
                {Helpers.stringToMoney(totalPayroll)} salary payments
              </Header.Subheader>
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Header as="h2">Salary and wages: {Helpers.stringToMoney(totalPayroll)}</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      {/* <Grid.Row columns={2}>
        <Grid.Column width={6}>
          <Segment basic>
            <Header as='h3' content="Highest paid positions" />
          </Segment>
          
        </Grid.Column>
        <Grid.Column width={6}>
        <Segment basic>
            <Header as='h3' content="Positions by size" />
          </Segment>
        </Grid.Column>
      </Grid.Row> */}

      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Header as="h2">Vendor spending: {Helpers.stringToMoney(a.totalAmount)}</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={3}>
        <Grid.Column width={4}>
          <Segment basic>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Header
                as="h3"
                content="Top Payees"
                style={{ padding: 0, margin: 0 }}
              />
              <Term term="payee" />
            </div>
            <List divided ordered relaxed>
              {vendorStats.slice(0, 5).map((v, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>
                      {v.name}{' '}
                      {show[v.name] ? (
                        <Link to={`/vendor/${v.number}`}>>></Link>
                      ) : null}
                    </List.Header>
                    <List.Description>
                      {Helpers.floatToMoney(v.sumPayments)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width={4}>
          <Segment basic>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Header
                as="h3"
                content="Top Cost Centers"
                style={{ padding: 0, margin: 0 }}
              />
              <Term term="cost-center" />
            </div>
            <List divided ordered relaxed>
              {ccStats.slice(0, 5).map((c, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{c.name}</List.Header>
                    <List.Description>
                      {Helpers.floatToMoney(c.sumPayments)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width={4}>
          <Segment basic>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Header
                as="h3"
                content="Total Payments by Expense Category"
                style={{ padding: 0, margin: 0 }}
              />
              <Term term="expense-category" />
            </div>
            {/* <ExpenseCategoryChart data={expenseChartData} /> */}
            <List divided relaxed>
              {expStats.map((e, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{e.name}</List.Header>
                    <List.Description>
                      {Helpers.floatToMoney(e.sumPayments)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic>
            <Header as="h3" floated="left" textAlign="left">
              Vendor Payments
              <Header.Subheader>
                {agencyPayments.length.toLocaleString()} payments made to{' '}
                {vendorStats.length.toLocaleString()} payees
              </Header.Subheader>
            </Header>
            <SummaryTable
              tableData={structuredTableData}
              payments={agencyPayments}
              show={show}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    site {
      pathPrefix
    }
    postgres {
      agency: allAgenciesList(condition: { deptName: $name }) {
        deptName
        deptNameShorthand
        deptSlug
        totalAmount
        accountsPayablesByAgencyCodeMaskedList(orderBy: VENDOR_NAME_ASC) {
          vendorName
          vendorNumber
          vendorByVendorNumber {
            showInStats
          }
          invoicePaymentDistAmount
          checkDate
          fundDesc
          agencyDesc
          costcenterDesc
          objectDesc
          objectDescShorthand
        }
        payroll: payrollsByDeptCodeList {
          jobCode
          job
          dept
          deptCode
          noOfEmp
          grossAmount
        }
      }
    }
  }
`
