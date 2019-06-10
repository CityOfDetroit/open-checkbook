import React from 'react';
import { Link } from 'gatsby';
import { Dropdown } from 'semantic-ui-react';

export const Search = ({ agencies }) => {
  let dropdownOptions = agencies.map(a => {
    return {
      key: a.deptNameShorthand,
      value: a.deptNameShorthand,
      text: a.deptName,
      as: Link,
      to: `/agency/${a.deptSlug}`
    };
  });

  return (<Dropdown placeholder='Search for a department or vendor name' fluid search selection options={dropdownOptions} />);
};