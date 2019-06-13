import React from 'react';
import { Link } from 'gatsby';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

export const Search = ({ agencies }) => {
  let dropdownOptions = agencies.map(a => {
    return {
      key: a.deptNumber,
      value: a.deptNameShorthand,
      text: a.deptName,
      as: Link,
      to: `/agency/${a.deptSlug}`
    };
  });

  return (
    <Dropdown 
      fluid 
      search 
      selection
      placeholder='Search for a department or vendor name' 
      options={_.sortBy(dropdownOptions, 'text')} 
      style = {{padding: `1.5em 1em`, border: `2px solid #004445`}}
    />
  );
};