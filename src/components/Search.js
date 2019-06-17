import React from 'react';
import { Link } from 'gatsby';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

export const Search = ({ agencies, vendors }) => {
  
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
        label: { color: 'red', circular: true, empty: true }
      }
    })
    .value();

  let dropdownOptions = [...dropdownAgencies, ...dropdownVendors];

  return (
    <Dropdown 
      fluid 
      search 
      selection
      labeled
      placeholder='Search for a department or vendor name' 
      options={dropdownOptions}
      style = {{ padding: `1.5em 1em`, border: `2px solid #004445`, fontSize: `1.5em`}}
    />
  );
};