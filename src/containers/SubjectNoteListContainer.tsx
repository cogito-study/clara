import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NoteCard } from '../ui/components';
import { SubjectRouteParams } from '../types/RouteParams';
import { Link } from '../ui/components/Link';
import { routePath } from '../constants';
import { dateService } from '../services/dateService';

import styled from 'styled-components';

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
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
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

    return data.subject.notes.map((note) => (
      <Link to={routePath.subjectNote(subjectCode, note.id)}>
        <HoveredNoteCard
          key={note.id}
          noteNumber={note.seriesNumber}
          subjectCode={subjectCode}
          title={note.title}
          abstract={note.description}
          dateLabel={renderDateLabel(note.createdAt, note.modifiedAt)}
          margin="medium"
        />
      </Link>
    ));
  };

  return (
    <Box justify="center" align="center" background="light" pad="none">
      <Box direction="row" width="xlarge" align="center" justify="between" pad="small">
        <Box wrap fill={true} direction="row-responsive" justify="center">
          {data.subject.notes && renderNoteList()}
        </Box>
      </Box>
    </Box>
  );
};
