import React from 'react'
import { List, Grid, Header } from 'semantic-ui-react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Search } from '../components/Search'

const IndexPage = ({ data }) => {
  let depts = data.postgres.allAgencies.edges.map(e => e.node)
  let funds = data.postgres.allFundsList

  let searchRowStyle = {
    backgroundColor: '#F2F2F2',
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
          <Header
            as="h3"
            content="Total vendor spending"
            style={{ color: 'white' }}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={mainRowStyle}>
        <Grid.Column width={6}>
          <Header
            as="h3"
            content="Top funds"
            style={{ color: 'white' }}
          />
          <List>
            {funds.filter(f => f.totalAmount !== null).sort((a, b) => { return parseFloat(a.totalAmount) - parseFloat(b.totalAmount) }).map(f => (
              <List.Item>{f.fundName} {f.totalAmount}</List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header
            as="h3"
            content="Top vendors"
            style={{ color: 'white' }}
          />
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
          }
        }
      }
      allFundsList {
        fundName
        totalAmount
      }
    }
  }
`
