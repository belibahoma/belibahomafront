import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Option } from './common/Option';
import { getFieldParamFromQueryString } from './common/getFieldParamFromQueryString';

export const TutorsOrTraineesFieldsSelection = ({
  location,
  history,
  options,
  type
}) => {
  const [fields, setFields] = useState(
    getFieldParamFromQueryString(location.search)
  );

  const onSelect = value => {
    if (fields.includes(value)) {
      setFields(fields.filter(field => field !== value));
    } else {
      setFields(fields.concat(value));
    }
  };

  useEffect(() => {
    const query = { fields };

    history.push({
      pathname: `/filters/general/${type}`,
      search: queryString.stringify(query)
    });
  }, [history, fields, type]);

  return (
    <div style={{ direction: 'RTL' }}>
      בחר עמודות להצגה:
      {options.map((option, index) => (
        <Option
          key={index}
          value={option.value}
          isSelected={fields.includes(option.value)}
          description={option.description}
          onChange={onSelect}
        />
      ))}
    </div>
  );
};