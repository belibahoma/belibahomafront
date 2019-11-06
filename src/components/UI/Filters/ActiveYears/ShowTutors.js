import React, { useState, useEffect } from 'react';
import { getParamsFromQueryString } from './common/getParamsFromQueryString';
import { getTutorsByActiveYears } from '../Api/tutors';

export const ShowTutors = ({ location }) => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    let isAbleToExecute = true;

    const executeFetchTutors = async () => {
      const { startYear, endYear, isGetAll } = getParamsFromQueryString(
        location.search
      );
      const tutors = await getTutorsByActiveYears(startYear, endYear, isGetAll);
      isAbleToExecute && setTutors(tutors);
    };

    executeFetchTutors();

    return () => {
      isAbleToExecute = false;
    };
  }, [location.search]);

  return <div>{JSON.stringify(tutors)}</div>;
};