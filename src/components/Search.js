import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

export const Search = ({ agencies, vendors }) => {

  let [input, setInput] = useState('')
  
  let exclude = ['Inactive GL Entities'];
  let dropdownAgencies = _(agencies)
    .uniqBy('deptName') // dedupes dwsd
    .filter(a => !_.includes(exclude, a.parent)) // cleans out Arts, Civic Center, etc
    .sortBy('deptName')
    .map(a => { // structures as Semantic's dropdown format
      return { 
        key: a.deptNumber,
        value: a.deptNameShorthand,
        text: `${a.deptName}`,
        as: Link,
        to: `/agency/${a.deptSlug}`,
        label: { color: 'yellow', circular: true, empty: true }
      }
    })
    .value();

  let dropdownVendors = _(vendors)
    .sortBy('vendorName')
    .map(v => {
      return {
        key: v.vendorNumber,
        value: v.vendorName,
        text: v.vendorName,
        as: Link,
        to: `/vendor/${v.vendorNumber}`,
        label: { color: 'purple', circular: true, empty: true }
      }
    })
    .value();

  let dropdownOptions = []
  // check here for input length and add vendors add needed
  if(input.length > 1) {
    dropdownOptions = [...dropdownVendors, ...dropdownAgencies]
  }
  else {
    dropdownOptions = [...dropdownAgencies];
  }

  return (
    <Dropdown 
      fluid 
      search 
      selection
      labeled
      placeholder='Search for agencies and vendors' 
      options={dropdownOptions}
      onSearchChange={(e) => setInput(e.target.value)}
      value={input}
      style={{ border: '3px solid #004445' }}
    />
  );
};