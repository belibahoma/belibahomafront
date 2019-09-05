import queryString from 'query-string';

export const getParamsFromQueryString = search => {
    const query = queryString.parse(search);
    const numberStartYear = parseInt(query.startYear);
    const numberEndYear = parseInt(query.endYear);
  
    return {
      startYear: numberStartYear ? numberStartYear.toString() : '',
      endYear: numberEndYear ? numberEndYear.toString() : '',
      isGetAll: query.isGetAll ? JSON.parse(query.isGetAll) : false
    };
  };