import queryString from 'query-string';

export const getFieldParamFromQueryString = search => {
    const params = queryString.parse(search);
    const validFields = params.fields || [];
    return Array.isArray(validFields) ? validFields : [validFields];
} 