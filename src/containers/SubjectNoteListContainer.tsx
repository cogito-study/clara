import gql from 'graphql-tag';
import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import Tilt from 'react-tilt';
import styled from 'styled-components';

import { routePath } from '../constants';
import { dateService } from '../services/dateService';
import { SubjectRouteParams } from '../types/RouteParams';
import { NoteCard } from '../ui/components';
import { Link } from '../ui/components/Link';

const SUBJECT_NOTE_LIST_QUERY = gql`
  query SubjectInfo($subjectCode: String!) {
    subject(subjectCode: $subjectCode) {
      notes {
        id
        seriesNumber
        title
        description
        modifiedAt
        createdAt
      }
    }
  }
`;

const HoveredNoteCard = styled(NoteCard)`
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${(props) => props.theme.global.elevation.light.xlarge};
  }
`;

export const SubjectNoteListContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { data } = useQuery(SUBJECT_NOTE_LIST_QUERY, { variables: { subjectCode } });

  const renderNoteList = () => {
    const renderDateLabel = (createdAt: string, modifiedAt?: string): string =>
      modifiedAt
        ? `Frissítve ${dateService.yearMonthDay(modifiedAt)}`
        : `Létrehozva ${dateService.yearMonthDay(createdAt)}`;

    return data.subject.notes
      .sort((lhs, rhs) => lhs.id - rhs.id)
      .map((note) => (
        <Tilt key={note.id} className="Tilt" options={{ max: 15, scale: 1.04, speed: 1250 }}>
          <Link to={routePath.subjectNote(subjectCode, note.id)}>
            <HoveredNoteCard
              noteNumber={note.seriesNumber}
              title={note.title}
              abstract={note.description}
              dateLabel={renderDateLabel(note.createdAt, note.modifiedAt)}
              margin="small"
            />
          </Link>
        </Tilt>
      ));
  };

  return (
    <Box justify="center" align="center" background="light" margin={{ top: 'medium' }} pad="none">
      <Box direction="row" width="xlarge" align="center" justify="between" pad="none">
        <Box wrap fill={true} direction="row" justify="center">
          {data.subject.notes && renderNoteList()}
          <Box width="280px" height="0px" margin="small" />
          <Box width="280px" height="0px" margin="small" />
        </Box>
      </Box>
    </Box>
  );
};
