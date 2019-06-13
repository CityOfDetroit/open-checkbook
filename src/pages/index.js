import React from 'react'
import { List, Grid, Header, Statistic } from 'semantic-ui-react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Search } from '../components/Search'

const IndexPage = ({ data }) => {
  let depts = data.postgres.allAgencies.edges.map(e => e.node)
  let funds = data.postgres.allFundsList
  let vendors = data.postgres.allVendorsList

  let searchRowStyle = {
    backgroundColor: '#F2F2F2',
    padding: '3em 0em'
  }

  let mainRowStyle = {
    backgroundColor: '#004445',
    color: 'white',
  }
  return (
    <Layout>
      <Grid.Row style={searchRowStyle}>
        <Grid.Column width={8}>
          <Search agencies={depts} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row style={mainRowStyle} centered>
        <Grid.Column width={12}>
          <div style={{border: `1px solid white`, padding: `2em`}}>
            <Header
              as="h3"
              content="Total vendor spending"
              style={{ color: 'white' }}
            />
            <Statistic>
              <Statistic.Value style={{color: 'white', fontWeight: '900', letterSpacing: '2px'}}>{vendors.reduce((a, v) => a + v.totalAmount, 0).toLocaleString()}</Statistic.Value>
              <Statistic.Label style={{color: 'white', marginTop: '10px'}}>dollars spent</Statistic.Label>
            </Statistic>
            <Header as="h4" style={{ color: 'white' }}>
              <span style={{fontSize: '2em', fontWeight: 900}}>{`${data.postgres.allAccountsPayables.totalCount}`} </span>
              <span>transactions</span>
            </Header>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={mainRowStyle}>
        <Grid.Column width={6}>
          <div style={{border: `1px solid white`, padding: `2em`}}>
            <Header
              as="h3"
              content="Top funds"
              style={{ color: 'white' }}
            />
            <List>
              {funds.filter(f => f.totalAmount !== null)
                .sort((a, b) => { return parseFloat(a.totalAmount) < parseFloat(b.totalAmount) })
                .slice(0, 10)
                .map((f, i) => (
                <List.Item key={i}>
                  <List.Header as='h2' style={{color: `white`, fontWeight: 900}}>
                    <span style={{color: `white`, fontSize: `0.75em`, fontWeight: 300, marginRight: `5px`}}>{`${i+1}.`}</span>
                    <span  style={{fontSize: `0.9em`}}>{f.fundName}</span>
                  </List.Header>
                  <List.Content style={{marginLeft: `1.25em`}}>
                    {`$${f.totalAmount.toLocaleString()}`}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <div style={{border: `1px solid white`, padding: `2em`}}>
            <Header
              as="h3"
              content="Top vendors"
              style={{ color: 'white' }}
            />
            <List>
              {vendors.filter(v => v.totalAmount !== null)
                .sort((a, b) => { return parseFloat(a.totalAmount) < parseFloat(b.totalAmount) })
                .slice(0, 10)
                .map((v, i) => (
                <List.Item key={i}>
                  <List.Header as='h2' style={{color: `white`, fontWeight: 900}}>
                    <span style={{color: `white`, fontSize: `0.75em`, fontWeight: 300, marginRight: `5px`}}>{`${i+1}.`}</span>
                    <span style={{fontSize: `0.9em`}}>{v.vendorName}</span>
                  </List.Header>
                  <List.Content style={{marginLeft: `1.25em`, fontSize: `1.25em`}}>
                    {`$${v.totalAmount.toLocaleString()}`}
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
          }
        }
      }
      allFundsList {
        fundName
        totalAmount
      }
      allVendorsList {
        vendorName
        totalAmount
      }
      allAccountsPayables {
        totalCount
      }    
    }
  }
`
