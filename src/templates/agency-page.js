import React from "react";
import { graphql } from "gatsby";
import { Header } from "semantic-ui-react";

export default ({ data }) => {
  const a = data.postgres.agency[0];

  return (
    <Layout>
      <SEO title={a.deptName} />

      <Header as='h2'>
        {a.deptName}
      </Header>
    </Layout>
  );
}

export const query = graphql`
  query($name: String!) {
    site {
      pathPrefix
    }
    postgres {
      agency: 
    }
  }