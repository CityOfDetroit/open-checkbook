/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage }}) => {
  const res = await graphql(`
    {
      postgres {
        agencies: allAgenciesList {
          deptNumber
          deptName
          deptNameShorthand
          deptNameAbbreviation
          deptSlug
        }
      }  
    } 
  `);

  // Make a page for each agency or department
  res.data.postgres.agencies.forEach(a => {
    createPage({
      path: `/agency/${a.deptSlug}`,
      component: path.resolve('./src/templates/agency-page.js'),
      context: {
        name: a.deptName,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '../../theme.config$': path.join(__dirname, 'src/semantic/theme.config'),
      },
    },
  });
};