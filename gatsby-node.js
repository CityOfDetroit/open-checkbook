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
        vendors: allVendorsList(condition: {showInStats: true}) {
          vendorName
          vendorNumber
        }
      }  
    } 
  `);

  // Make a page for each agency or department
  res.data.postgres.agencies.filter(a => a.deptName !== 'Pass Through Payments').forEach(a => {
    createPage({
      path: `/agency/${a.deptSlug}`,
      component: path.resolve('./src/templates/agency-page.js'),
      context: {
        name: a.deptName,
      },
    });
  });

  // Make a page for each vendor
  res.data.postgres.vendors.slice(0,10).forEach(v => {
    createPage({
      path: `/vendor/${v.vendorNumber}`,
      component: path.resolve('./src/templates/vendor-page.js'),
      context: {
        number: v.vendorNumber,
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