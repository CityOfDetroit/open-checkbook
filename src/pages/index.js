import React from 'react'
import { List, Grid, Header, Statistic } from 'semantic-ui-react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Search } from '../components/Search'
import Helpers from '../helpers';

const IndexPage = ({ data }) => {
  let depts = data.postgres.allAgencies.edges.map(e => e.node)
  let funds = data.postgres.allFundsList
  let vendors = data.postgres.allVendorsList

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
              content="Top Funds"
            />
            <List ordered size='big'>
              {funds.filter(f => f.totalAmount !== null)
                .sort((a, b) => { return parseFloat(a.totalAmount) < parseFloat(b.totalAmount) })
                .slice(0, 10)
                .map((f, i) => (
                <List.Item key={i}>
                  <List.Content style={{ marginLeft: '.5em' }}>
                    <List.Header>
                      {f.fundName}
                    </List.Header>
                    <List.Description>
                      {Helpers.stringToMoney(f.totalAmount)}
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
              {vendors.filter(v => v.totalAmount !== null)
                .sort((a, b) => { return parseFloat(a.totalAmount) < parseFloat(b.totalAmount) })
                .slice(0, 10)
                .map((v, i) => (
                <List.Item key={i}>
                  <List.Content style={{ marginLeft: '.5em' }}>
                    <List.Header>
                      {v.vendorName}
                    </List.Header>
                    <List.Description>
                      {Helpers.stringToMoney(v.totalAmount)}
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
      allAgencies {
        edges {
          node {
            dept
            deptNumber
            parent
            deptName
            deptNameShorthand
            deptNameAbbreviation
            deptSlug
            totalAmount
          }
        }
      }
      allFundsList {
        fundName
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
