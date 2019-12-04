import React from 'react';
import { Link } from 'gatsby';
import { Header, Grid, List, Breadcrumb, Table } from 'semantic-ui-react';

import Layout from '../components/layout';
import FAQ from '../components/faq';
import Footer from '../components/Footer';

let faqs = [
  {
    question: 'How often is the data updated?',
    answer: 'The data is updated monthly.',
  },
  {
    question: "When is the City of Detroit's fiscal year?",
    answer: "The fiscal year begins July 1 and ends June 30."
  },
  {
    question: "What is the General Fund?",
    answer: "The General Fund is the primary fund used by the City of Detroit. The activities being paid for through the General Fund constitute the core administrative and operational tasks of the City."
  },
  {
    question: "Which types of payments are excluded or masked in the open checkbook?",
    answer: "Some payments in the open checkbook that are made to individuals are masked to protect privacy. For instance, a payment for jury duty is made to an individual, but we redact their name and use the generic term 'Juror' in this tool."
  },
  {
    question: "Where can I access the data displayed in the open checkbook?",
    answer: "You can access the underlying data on Detroit's open data portal at: https://data.detroitmi.gov/datasets/open-checkbook-payments"
  },
  {
    question: "Where can I get detailed information on the City's budget and finances?",
    answer: "Access detailed budget and finance information on the City of Detroit website Financial Report page."
  },
  {
    question: "How can I become a City of Detroit vendor?",
    answer: "Start by visiting https://detroitmi.gov/how-do-i/do-business-city."
  }
];

const AboutPage = () => {
  const crumbs = [
    {key: 'Home', content: <Link to="/">Home</Link>},
    {key: 'Table', content: <Link to="/about/">About</Link>, active: true},
  ];

  return (
    <Layout pageTitle='About'>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb icon='right angle' sections={crumbs} />
          <Header as="h1">ABOUT</Header>
          <section style={{ marginBottom: '1em' }}>
            <p>
              In this site, you can access City of Detroit payment information. We are providing this data to advocate transparency, financial integrity and accountability. 
            </p>
            <p>  
              Open Checkbook allows users to view the amount and category of City payments on a variety of dimensions. Users can navigate City payment data using various charts and graphs to see how dollars from various funding sources are being spent. 
            </p>
            <p>
              Open Checkbook allows users to view payment data by Fund, Department, Cost Center, Expense Category, and Expense. Because of the large number of individual values in certain cases, we have grouped the information for ease of reference. Grouped information can be expanded to view the underlying detail. Encumbrances are not included in this Open Payments Data tool.
            </p>
            <p>
              You may find it helpful to browse through the Open Data Finance Glossary for terminologies used in this data tool. For more information about the City of Detroit, please visit <a href='https://www.detroitmi.gov'>City of Detroit</a> and check out our <a href='https://detroitmi.gov/departments/office-chief-financial-officer/financial-reports'>Financial Reports page</a> which includes links to various City of Detroit financial reports, including the Comprehensive Annual Financial Report, Single Audit, Four-Year Financial Plan (annual budget), and Monthly Financial Reports. 
            </p>
            <p>
              These transactions have not been audited. Legal and other sensitive data have been aggregated. This data cannot be compared with other financial and accounting reports released by the City.
            </p>
            <p>
              Thank you for visiting the City’s Open Checkbook website.
            </p>
          </section>
          <section style={{ marginBottom: '1em' }}>
            <Header as="h2">Frequently Asked Questions</Header>
            <FAQ data={faqs} />
          </section>
          <section style={{ marginBottom: '1em' }}>
            <Header as="h2">Glossary of terms</Header>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Agency</Table.Cell>
                  <Table.Cell><emphasis>See Department</emphasis>. Agency is sometimes used interchangeably with Department, though the City of Detroit's principal entities are designated by the City Charter as Departments. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Appropriation</Table.Cell>
                  <Table.Cell>An appropriation represents the funding approved by Detroit City Council for a government operation.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cost Center</Table.Cell>
                  <Table.Cell>The cost center represents a division or activity within a City appropriation. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Department</Table.Cell>
                  <Table.Cell>Departments are the principal entities which execute the functions of the City government. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Expense</Table.Cell>
                  <Table.Cell>The expense column provides the specific type of expense incurred, such as those for office supplies, printing, or the repair of City vehicles. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Expense Category</Table.Cell>
                  <Table.Cell>The expense category column provides the broader category of the expense incurred, such as Operating Supplies or Professional and Contractual Services. This is used to classify expenses for the City's Comprehensive Annual Financial Report (CAFR).</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Fund</Table.Cell>
                  <Table.Cell>The fund is used to record resources whose use has been limited by law, governing agencies, grant authority, donors, individuals, or organizations. The fund is an independent accounting entity established pursuant to the rules and regulations of the Governmental Accounting Standards Board (GASB). It consists of four numeric characters.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Pass Through Payment</Table.Cell>
                  <Table.Cell>Pass through payments occur when the City of Detroit collects revenues on behalf of another entity, such as the Detroit Public Schools Community District, and transfers those collected funds directly to the recipient. These funds are not part of the City's budget. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Payee</Table.Cell>
                  <Table.Cell>The person or company to which the City pays money. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Payment</Table.Cell>
                  <Table.Cell>The transfer of funds from the City of Detroit to an individual or company by either check or Automated Clearing House (ACH) transfer. </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Vendor</Table.Cell>
                  <Table.Cell>A person or company providing goods or services to the City. </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </section>
          <section style={{ marginBottom: '1em' }}>
            <Header as='h2'>Disclaimer</Header>
            <p>
              The information contained in this website is for general information purposes only. The information is provided by the City of Detroit and while the intent is to keep the information up to date and correct, the City makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the information contained on this website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. For audited financial statements, please view the City of Detroit Comprehensive Annual Financial Report (CAFR) section located within the <a href='https://detroitmi.gov/departments/office-chief-financial-officer/financial-reports'>City of Detroit Financial Reports page</a>. 
            </p>
            <p>
              In no event will the City of Detroit be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. 
            </p>
            <p>  
              Through this website you may be able to link to other websites which are not under the control of the City of Detroit. The City of Detroit has no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. 
            </p>
            <p>  
              Every effort is made to keep the website accessible. However, the City of Detroit assumes no responsibility, and will not be liable, for the website being temporarily unavailable due to technical issues beyond its control.
            </p>
          </section>
          <section style={{ marginBottom: '1em' }}>
            <Header as="h2">Share Feedback</Header>
            <p>Do you have thoughts or comments about this tool? Please <a href='https://app.smartsheet.com/b/form/e1861595456b4d1c8a2d174d901a08ec'>share them with us here.</a></p>
          </section>
        </Grid.Column>
      </Grid.Row>
      <Footer/>
    </Layout>
  );
}

export default AboutPage;
