import React from 'react';

import { Button, List } from 'semantic-ui-react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {

  let depts = data.postgres.allAgencies.edges.map(e => e.node)
  return (
    <Layout>
      <h1>Checkbook</h1>
      <List>
      {depts.map(d => (
        <List.Item>{d.deptName}</List.Item>
      ))}
      </List>
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
  }
}
`
