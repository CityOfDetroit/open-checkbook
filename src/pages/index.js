import React from 'react'
import { List, Grid, Header, Statistic } from 'semantic-ui-react'
import { graphql, Link } from 'gatsby'
import _ from 'lodash';

import Layout from '../components/layout'
import { Search } from '../components/Search'
import Helpers from '../helpers';

const IndexPage = ({ data }) => {
  let depts = data.postgres.allAgenciesList;
  let vendors = data.postgres.allVendorsList;

  let topDepts = _(depts)
    .groupBy('deptName') // dedupes dwsd
    .map((objs, key) => ({
      'dept': key,
      // 'slug': objs[key].deptSlug,
      'total': objs.reduce((a, p) => a + parseFloat(p.totalAmount), 0)
    }))
    .filter(function(o) { return o.total > 0 })
    .sortBy(['total'])
    .reverse()
    .slice(0, 10)
    .value();

  let topVendors = _(vendors)
    .map((v) => ({
      'vendor': v.vendorName,
      'slug': v.vendorNumber,
      'total': v.totalAmount
    }))
    .sortBy(['total'])
    .reverse()
    .slice(0, 10)
    .value();

  let searchRowStyle = {
    padding: '3em 0em'
  }

  let totalRowStyle = {
    paddingTop: '2rem'
  }

  return (
    <Layout>
      <Grid.Row style={searchRowStyle}>
        <Grid.Column width={8}>
          <Search agencies={depts} vendors={vendors} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row style={totalRowStyle} centered>
        <Grid.Column width={12}>
          <div style={{padding: `2em`}}>
            <h2>
              Total Vendor Spending, Fiscal Year 2017-2018
            </h2>
            <Statistic>
              <Statistic.Value style={{fontWeight: '900', letterSpacing: '2px'}}>${vendors.reduce((a, v) => a + v.totalAmount, 0).toLocaleString()}</Statistic.Value>
            </Statistic>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6}>
          <div style={{padding: `2em`}}>
            <Header
              as="h2"
              content="Top Agencies"
            />
            <List ordered size='big'>
              {topDepts.map((f, i) => (
                <List.Item key={i}>
                  <List.Content style={{ marginLeft: '.5em' }}>
                    <List.Header>
                      {f.dept} <Link to={`/agency/#`}>>></Link>
                    </List.Header>
                    <List.Description>
                      {Helpers.stringToMoney(f.total)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        </Grid.Column>

        <Grid.Column width={6}>
          <div style={{padding: `2em`}}>
            <Header
              as="h2"
              content="Top Vendors"
            />
            <List ordered size='big'>
              {topVendors.map((v, i) => (
                <List.Item key={i}>
                  <List.Content style={{ marginLeft: '.5em' }}>
                    <List.Header>
                      {v.vendor}
                    </List.Header>
                    <List.Description>
                      {Helpers.stringToMoney(v.total)} <Link to={`/vendor/${v.slug}`}>>></Link>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        </Grid.Column>
      </Grid.Row>

    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    postgres {
      allAgenciesList {
        dept
        deptNumber
        parent
        deptName
        deptNameShorthand
        deptNameAbbreviation
        deptSlug
        totalAmount
      }
      allVendorsList(condition: {showInStats: true}) {
        vendorName
        vendorNumber
        totalAmount
      }
      allAccountsPayables {
        totalCount
      }    
    }
  }
`
