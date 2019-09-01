import React from 'react';
import styled from 'styled-components';
import { TutorsOrTraineesFieldsSelection } from './TutorsOrTraineesFieldsSelection';
import { ShowTrainees } from './ShowTrainees';
import { ShowTutors } from './ShowTutors';
import { TutorsFields } from './const/TutorsFields';
import { TraineesFields } from './const/TraineesFields';

const Container = styled.div`
  direction: RTL;
  padding: 20px 100px;
`;

const Seperator = styled.div`
  height: 1px;
  background-color: grey;
`;

export const GeneralFiltersPage = ({ history, location, type }) => (
  <Container>
    <TutorsOrTraineesFieldsSelection
      location={location}
      history={history}
      options={type === 'tutors' ? TutorsFields : TraineesFields}
      type={type}
    />
    <Seperator />
    {type === 'tutors' ? (
      <ShowTutors location={location} />
    ) : (
      <ShowTrainees location={location} />
    )}
  </Container>
);
