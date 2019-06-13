import React from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Layout from '../components/layout'
import FAQ from '../components/faq'

let dataFaq = [
  {
    question: 'What payments are displayed in this tool?',
    answer: 'All payments to vendors. This does not include expenses such as salaries.',
  },
  {
    question: "Wait, we don't even have any answer for this question?",
  },
]

const AboutPage = () => {
  return (
    <Layout>
      <Grid.Row textAlign="left">
        <Grid.Column width={16}>
          <Header as="h1">About</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign="left">
        <Grid.Column width={16}>
          <p>
            This site provides information about food safety inspections in the
            City of Detroit.
          </p>
          <p>
            The data includes restaurants and other food service establishments,
            like school cafeterias and stadium concessions, that are inspected
            by the .
          </p>
          <p>
            Grocery stores, liquor stores, and other packaged food
            establishments are inspected by the and are not included here.
          </p>
          <p>
            If a restaurant, bar, or other food service establishment that
            prepares or serves food and beverages in Detroit is not found in
            this data, for follow up. Please include the name and address of the
            establishment, and the date and time of your visit in your message.
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as="h2">Frequently Asked Questions</Header>
          <Header as="h4">About the data</Header>

          <FAQ data={dataFaq} />
          <Header as="h4">About the City's finances</Header>

          <FAQ data={dataFaq} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as="h2">Glossary of terms</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as="h2">Share Feedback</Header>
          <p>
            This site is built by the{' '}
            <a href={null} target="_blank" rel="noopener noreferrer">
              {null}
            </a>
            team at the City of Detroit in partnership with the Detroit Health
            Department using{' '}
            <a href={null} target="_blank" rel="noopener noreferrer">
              {null}
            </a>
            . Our code is on
            <a href={null} target="_blank" rel="noopener noreferrer"></a>.
          </p>
          <p>
            Have an idea or question? Use{' '}
            <a href={null} target="_blank" rel="noopener noreferrer">
              {null}
            </a>
            to get in touch with our project team or email{' '}
            <a href={null} target="_blank" rel="noopener noreferrer"></a>.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Layout>
  )
}

export default AboutPage
