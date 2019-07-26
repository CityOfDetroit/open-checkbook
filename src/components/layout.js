import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Grid  } from 'semantic-ui-react'

import SiteHeader from './SiteHeader'

import 'semantic-ui-less/semantic.less'

const Layout = ({ children, data, pageTitle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={`${pageTitle}: ${data.site.siteMetadata.title}`}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i,900&display=swap" rel="stylesheet"></link>
          </Helmet>

        <SiteHeader siteTitle={data.site.siteMetadata.title} />

          <Grid padded stackable centered>
            {children}
          </Grid>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
