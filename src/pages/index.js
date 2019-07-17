import React from 'react'
import {
  List,
  Grid,
  Header,
  Segment,
  Label,
  Container,
  Image,
} from 'semantic-ui-react'
import { graphql, Link } from 'gatsby'
import _ from 'lodash'

import Layout from '../components/layout'
import { Search } from '../components/Search'
import Helpers from '../helpers'
import Footer from '../components/Footer'

const IndexPage = ({ data }) => {
  let depts = data.postgres.allAgenciesList
  let vendors = data.postgres.allVendorsList

  // use this for top level total payments stat (can't reduce vendor total amount because of show in stats filter!)
  let deptsNotNull = _.filter(depts, function(d) {
    return d.totalAmount > 0
  })

  let topDepts = _(depts)
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
    .slice(0, 10)
    .value()

  let topVendors = _(vendors)
    .map(v => ({
      vendor: v.vendorName,
      slug: v.vendorNumber,
      total: v.totalAmount,
      pass: v.passThroughPayee,
    }))
    .sortBy(['total'])
    .reverse()
    .slice(0, 10)
    .value()

  let headerContainerStyle = {
    backgroundImage: `url('https://i.imgur.com/fcxclqB.jpg')`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    backgroundPosition: 'center',
    width: '100vw',
  }

  return (
    <Layout>
      <Grid.Row>
        <Grid.Column width={12} style={headerContainerStyle}>
          <Segment
            basic
            inverted
            style={{ background: 'rgba(0,0,0,0.6)', margin: `.5em` }}
            size={`huge`}
            textAlign="justify"
            padded
          >
            <p>
              <i>Message from David P. Massaron, CFO, City of Detroit:</i>
            </p>
            <p>
              One of the key functions of the Office of the CFO (OCFO) is to
              plan, direct, monitor, organize and control the City’s financial
              resources in an efficient and effective manner. The OCFO is
              responsible for ensuring that City resources are properly managed.
              We also have a role in promoting trust in government by being
              transparent of how the City is spending tax payer dollars. Open
              Checkbook provides residents, business owners, and other
              stakeholders the access and ability to see [vendor payments in the
              city of Detroit].
            </p>

            <p>
              <b>Welcome, Detroit, to your Open Checkbook.</b>
            </p>
          </Segment>
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
                Total Payments in Fiscal Year 2017-2018
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
                          PASS THROUGH PAYEE
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
