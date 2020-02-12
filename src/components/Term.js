import React from 'react';
import { Icon, Popup } from 'semantic-ui-react'

const dictionary = {
  "agency": "Agencies are the principal entities which execute the functions of the City government.",
  "cost-center": "The cost center represents a division or activity within a City appropriation.",
  "payee": "The person or company to which the City pays money.",
  'non-departmental': "The Non-Departmental budgets provides funds for activities which are not the responsibility of any one single agency, or for activities which cannot be credited to any specific department.",
  "expense-category": "The expense category column provides the broader category of the expense incurred, such as Operating Supplies or Professional and Contractual Services. This is used to classify expenses for the City's Comprehensive Annual Financial Report (CAFR)."
}

const Term = ({ term, size='large' }) => {
  let style={
    margin: 0,
    marginLeft: 10,
    padding: 0,
    color: '#aaa',
  }
  return (
    <Popup content={dictionary[term]} trigger={<Icon name='info circle' size={size} style={style} />} />
  )
}

export default Term;



