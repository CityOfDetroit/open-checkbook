import React from 'react';
import { List } from 'semantic-ui-react';

const TopList = ({ n, data, titleKey, subtitleKey }) => {
  return (
    <List divided ordered>
      {data.slice(0,n).map((d, i) => {
        <List.Item key={i}>
          <List.Content>
            <List.Header>{d[titleKey]}</List.Header>
            <List.Description>{d[subtitleKey]}</List.Description>
          </List.Content>
        </List.Item>
      })}
    </List>
  );
};

export default TopList;
