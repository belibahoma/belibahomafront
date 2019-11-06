import config from 'react-global-configuration';
import axios from 'axios';

const userToken = localStorage.getItem('beliba-homa-auth-token');

export const getTraineesByActiveYears = async (startYear, endYear, isGetAll) => {
  const { data: trainees } = await axios.get(
    `${config.get('serverAddress')}/api/trainees`,
    {
      headers: { 'x-auth-token': userToken }
    }
  );

  if (isGetAll) {
    return trainees;
  }

  if (startYear && endYear) {
    return trainees.filter(trainee =>
      trainee.activeYears.find(
        year => year >= Number(startYear) && year <= Number(endYear)
      )
    );
  }

  if (startYear) {
    return trainees.filter(trainee =>
      trainee.activeYears.find(year => year >= Number(startYear))
    );
  }

  if (endYear) {
    return trainees.filter(trainee =>
      trainee.activeYears.find(year => year <= Number(endYear))
    );
  }

  return [];
};

export const getTraineesByFields = async fields => {
  const { data: trainees } = await axios.get(
    `${config.get('serverAddress')}/api/trainees`,
    {
      headers: { 'x-auth-token': userToken }
    }
  );

  return trainees.map(trainee =>
    fields.reduce((FilteredTrainee, field) => {
      return { [field]: trainee[field], ...FilteredTrainee };
    }, {})
  );
};