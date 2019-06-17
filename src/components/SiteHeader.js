import React from "react"
import { Link } from "gatsby"
import { Image, Header, Grid } from "semantic-ui-react"
import _ from "lodash"

import logo from "../images/cod-logo.jpg"

const SiteHeader = ({ siteTitle }) => (
  <Grid.Row>
    <Grid.Column width={12}>  
    <header style={{ borderBottom: `5px solid #feb70d`}}>
      <div style={{ margin: `0 auto`, padding: `1rem 1rem`, display: `flex`, justifyContent: `space-between`, alignItems: `center`, alignContent: `middle`, flexWrap: `wrap`, maxWidth: `76.5%` }}>
        <div style={{ display: `flex`, alignItems: `center` }}>
          <div style={{ width: `70px` }}>
            <a href="https://detroitmi.gov/" target='_blank' rel='noopener noreferrer'>
              <Image src={logo} style={{ padding: 0, margin: 0, width: `100%`, height: `auto` }} alt="city of detroit logo" />
            </a>
          </div>
          <Link to="/" style={{ color: `black`, textDecoration: `none`, textAlign: `right` }}>
            <Header as='h2' style={{ fontWeight: 900}}>{_.toUpper(siteTitle)}</Header>
          </Link>
        </div>
        <Link to="/" style={{ color: `#004445`, textDecoration: `none`, marginLeft: `auto`, marginRight: `3em`, borderBottom: `1px dotted #18252a` }}>
          HOME
        </Link>
        <Link to="/about" style={{ color: `#004445`, textDecoration: `none`, borderBottom: `1px dotted #18252a`  }}>
          ABOUT
        </Link>
      </div>
    </header>
    </Grid.Column>
  </Grid.Row>
)

export default SiteHeader