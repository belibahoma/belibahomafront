import config from 'react-global-configuration';
import axios from 'axios';

const userToken = localStorage.getItem('beliba-homa-auth-token');

export const getTutorsByActiveYears = async (startYear, endYear, isGetAll) => {
  const { data: tutors } = await axios.get(
    `${config.get('serverAddress')}/api/tutors`,
    {
      headers: { 'x-auth-token': userToken }
    }
  );

  if (isGetAll) {
    return tutors;
  }

  if (startYear && endYear) {
    return tutors.filter(trainee =>
      trainee.activeYears.find(
        year => year >= Number(startYear) && year <= Number(endYear)
      )
    );
  }

  if (startYear) {
    return tutors.filter(trainee =>
      trainee.activeYears.find(year => year >= Number(startYear))
    );
  }

  if (endYear) {
    return tutors.filter(trainee =>
      trainee.activeYears.find(year => year <= Number(endYear))
    );
  }
  return [];
};

export const getTutorsByFields = async fields => {
  const { data: tutors } = await axios.get(
    `${config.get('serverAddress')}/api/tutors`,
    {
      headers: { 'x-auth-token': userToken }
    }
  );

  return tutors.map(tutor =>
    fields.reduce((FilteredTutor, field) => {
      return { [field]: tutor[field], ...FilteredTutor };
    }, {})
  );
};
