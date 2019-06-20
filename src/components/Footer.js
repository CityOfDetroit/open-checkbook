import React from 'react'
import { Grid } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Grid.Row style={{background: '#f2f2f2', marginTop: '5em', height: '50px'}}>
      <span style={{width: '50px', marginTop: '-55px'}}>
        <img style={{maxWidth: '100%'}} src='https://detroitmi.gov/themes/custom/detroitmi/logo.png'/>
      </span>
    </Grid.Row>
  )
}

export default Footer