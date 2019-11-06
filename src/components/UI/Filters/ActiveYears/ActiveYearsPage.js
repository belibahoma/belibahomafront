import React from 'react';
import styled from 'styled-components';
import { FilterTutorsOrTraineesByActiveYears } from './FilterTutorsOrTraineesByActiveYears';
import { ShowTrainees } from './ShowTrainees';
import { ShowTutors } from './ShowTutors';

const Container = styled.div`
  direction: RTL;
  padding: 20px 100px;
`;

const Seperator = styled.div`
  height: 1px;
  background-color: grey;
`;

export const ActiveYearsPage = ({ history, location, type }) => (
  <Container>
    <FilterTutorsOrTraineesByActiveYears
      history={history}
      location={location}
      type={type}
    />
    <Seperator />
    {type === 'tutors' ? <ShowTutors location={location} /> : <ShowTrainees location={location} />}
  </Container>
);