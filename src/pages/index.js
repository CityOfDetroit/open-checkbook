import React from 'react'
import {
  List,
  Grid,
  Header,
  Segment,
  Label,
  Container,
  Image,
  Responsive,
} from 'semantic-ui-react'
import { graphql, Link } from 'gatsby'
import _ from 'lodash'

import Layout from '../components/layout'
import { Search } from '../components/Search'
import Helpers from '../helpers'
import Footer from '../components/Footer'

const OrangeLink = ({ url, text }) => {
  return <a href={url} style={{color: '#feb70d'}}>{text}</a>
}

const IndexPage = ({ data }) => {
  let depts = data.postgres.allAgenciesList
  let vendors = data.postgres.allVendorsList

  // use this for top level total payments stat (can't reduce vendor total amount because of show in stats filter!)
  let deptsNotNull = _.filter(depts, function(d) {
    return d.totalAmount > 0 && d.totalAmount !== null
  })

  let topDepts = _(deptsNotNull)
    .groupBy('deptName') // dedupes dwsd
    .map((objs, key) => ({
      dept: key,
      slug: objs[0].deptSlug,
      total: objs.reduce((a, p) => a + parseFloat(p.totalAmount), 0),
    }))
    .filter(function(o) {
      return o.total > 0
    })
    .sortBy(['total'])
    .reverse()
    .slice(0,10)
    .value()
    
  let topVendors = _(vendors)
    .map(v => ({
      vendor: v.vendorName,
      slug: v.vendorNumber,
      total: v.totalAmount,
      pass: v.passThroughPayee,
    }))
    .filter(l => l.total !== null)
    .sortBy(['total'])
    .reverse()
    .slice(0, 10)
    .value()

  let headerContainerStyle = {
    backgroundImage: `url('https://detroitmi.gov/sites/detroitmi.localhost/files/2019-07/gaberich.png')`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    backgroundPosition: 'center',
    width: '100vw',
  }

  return (
    <Layout pageTitle='Homepage'>
      <Grid.Row style={headerContainerStyle}>
        <Grid.Column width={12}>
          <Responsive as={Segment} minWidth={800} basic inverted style={{ background: 'rgba(24, 37, 42, 0.85)', margin: `.5em` }} size={`regular`} textAlign='justify' padded>
            <p>
              Under Mayor Mike Duggan and the Detroit City Council’s leadership,
              the City of Detroit has strategically invested in improving the
              quality of life for Detroiters. Through the efficient and
              effective use of public resources, Detroit has reduced crime and
              fires, improved our roads, provided vibrant parks, increased
              access to affordable housing, removed blight, brought new jobs to
              Detroit, and expanded job training to fill those jobs. To ensure
              we have the public’s trust as we guide these investments, the City
              of Detroit has launched Detroit’s Open Checkbook. In accordance
              with the <OrangeLink url={`https://detroitmi.gov/document/executive-order-2015-2-city-detroit-open-data-initiative-and-creation-detroit-go-data-government`} text={` Mayor's Executive Order 2015-2 `} />
              , the Open Checkbook will give Detroiters the ability to see city
              payments to vendors that make government work for residents every
              day.
            </p>

            <p>
              <b>Welcome, Detroit, to your Open Checkbook.</b>
            </p>
          </Responsive>
          <Responsive as={Segment} maxWidth={800} basic inverted style={{ background: 'rgba(24, 37, 42, 0.85)', margin: `.1em` }} size={`regular`} textAlign='justify'>
            <p>
              Under Mayor Mike Duggan and the Detroit City Council’s leadership,
              the City of Detroit has strategically invested in improving the
              quality of life for Detroiters. Through the efficient and
              effective use of public resources, Detroit has reduced crime and
              fires, improved our roads, provided vibrant parks, increased
              access to affordable housing, removed blight, brought new jobs to
              Detroit, and expanded job training to fill those jobs. To ensure
              we have the public’s trust as we guide these investments, the City
              of Detroit has launched Detroit’s Open Checkbook. In accordance
              with the <OrangeLink url={`https://detroitmi.gov/document/executive-order-2015-2-city-detroit-open-data-initiative-and-creation-detroit-go-data-government`} text={` Mayor's Executive Order 2015-2 `} />
              , the Open Checkbook will give Detroiters the ability to see city
              payments to vendors that make government work for residents every
              day.
            </p>

            <p>
              <b>Welcome, Detroit, to your Open Checkbook.</b>
            </p>
          </Responsive>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic size="huge">
            <Search agencies={depts} vendors={vendors} />
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={12}>
          <Segment basic size="huge">
            <Header as="h1">
              {Helpers.floatToMoney(
                deptsNotNull.reduce((a, v) => a + parseFloat(v.totalAmount), 0)
              )}
              <Header.Subheader>
                Total Payments in Fiscal Year 2018-2019
              </Header.Subheader>
            </Header>
            <div style={{ marginTop: `25px` }}>
              <Link to={`/drilldown/`} prefetch={false}>
                <button
                  className="all-spending-btn"
                  style={{
                    border: `none`,
                    cursor: `pointer`,
                    background: `#feb70d`,
                    padding: `1em`,
                    color: `#18252a`,
                    textDecoration: `none`,
                    textTransform: `uppercase`,
                    fontWeight: 900,
                    fontSize: `14px`,
                    fontFamily: 'Montserrat'
                  }}
                >
                  View All Payments
                </button>
              </Link>
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6}>
          <Segment basic>
            <Header as="h2" content="Top Agencies" />
            <List ordered relaxed divided size="big">
              {topDepts.map((d, i) => (
                <List.Item key={i}>
                  <List.Content style={{ marginLeft: '.5em' }}>
                    <List.Header>
                      <Link to={`/agency/${d.slug}`}>{d.dept} >></Link>
                    </List.Header>
                    <List.Description>
                      {Helpers.floatToMoney(d.total)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment basic>
            <Header as="h2" content="Top Payees" />
            <List ordered relaxed divided size="big">
              {topVendors.map((v, i) => (
                <List.Item key={i}>
                  <List.Content style={{ marginLeft: '.5em' }}>
                    <List.Header>
                      <Link to={`/vendor/${v.slug}`}>{v.vendor} >></Link>
                      {v.pass === true ? (
                        <Label
                          size="tiny"
                          style={{ marginLeft: '1em', borderRadius: 0 }}
                        >
                          PASS THROUGH PAYMENTS
                        </Label>
                      ) : (
                        ``
                      )}
                    </List.Header>
                    <List.Description>
                      {Helpers.stringToMoney(v.total)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Footer />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    postgres {
      allAgenciesList {
        deptName
        deptSlug
        totalAmount
      }
      allVendorsList(condition: { showInStats: true }) {
        vendorName
        vendorNumber
        totalAmount
        passThroughPayee
      }
    }
  }
`
