import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { getParamsFromQueryString } from './common/getParamsFromQueryString';

const InputRow = styled.div`
  display: flex;
`;

const Input = styled.input`
  direction: RTL;
  margin-right: 5px;
  margin-left: 5px;
`;

export const FilterTutorsOrTraineesByActiveYears = ({
  location,
  history,
  type
}) => {
  const params = getParamsFromQueryString(location.search);

  const [startYear, setStartYear] = useState(params.startYear);
  const [endYear, setEndYear] = useState(params.endYear);
  const [isGetAll, setIsGetAll] = useState(params.isGetAll);

  const hebrewType = type === 'tutors' ? 'חונכים' : 'חניכים';

  useEffect(() => {
    const params = getParamsFromQueryString(location.search);

    setStartYear(params.startYear);
    setEndYear(params.endYear);
    setIsGetAll(params.isGetAll);
  }, [location.search]);

  useEffect(() => {
    const query = { startYear, endYear, isGetAll };

    history.push({
      pathname: `/filters/active-years/${type}`,
      search: queryString.stringify(query)
    });
  }, [startYear, endYear, isGetAll, history, type, location.search]);

  return (
    <div>
      <InputRow>
        בחר {hebrewType}  לפי שנות פעילות משנה:
        <Input
          type="number"
          value={startYear}
          onChange={event =>
            setStartYear(parseInt(event.target.value).toString())
          }
        />
        לשנה:
        <Input
          type="number"
          value={endYear}
          onChange={event =>
            setEndYear(parseInt(event.target.value).toString())
          }
        />
      </InputRow>
      <InputRow>
        <input
          type="checkbox"
          checked={isGetAll}
          onChange={() => setIsGetAll(!isGetAll)}
        />
        <div style={{ marginRight: '5px' }}>
          בחר {hebrewType} מכל השנים במקום
        </div>
      </InputRow>
    </div>
  );
};