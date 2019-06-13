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
        vendors: allVendorsList(condition: {vendorId: 13243}) {
          vendorName
          vendorType
          vendorId
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

  // Make a page for each vendor
  res.data.postgres.vendors.forEach(v => {
    createPage({
      path: `/vendor/${v.vendorId}`,
      component: path.resolve('./src/templates/vendor-page.js'),
      context: {
        id: v.vendorId,
        name: v.vendorName
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