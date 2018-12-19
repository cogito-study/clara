import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NoteCard } from '../ui/components';
import { SubjectRouteParams } from '../types/RouteParams';

const SUBJECT_NOTE_LIST_QUERY = gql`
  query SubjectInfo($subjectCode: String!) {
    subject(subjectCode: $subjectCode) {
      notes {
        id
        seriesNumber
        title
        description
        modifiedAt
      }
    }
  }
`;

export const SubjectNoteListContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { data, errors } = useQuery(SUBJECT_NOTE_LIST_QUERY, { variables: { subjectCode } });

  const renderError = () => <div>Error</div>; // TODO: proper error handling

  const renderNoteList = () =>
    data.subject.notes.map((note) => (
      <NoteCard
        key={note.id}
        id={note.id}
        noteNumber={note.seriesNumber}
        subjectCode={subjectCode}
        title={note.title}
        abstract={note.description}
        date={note.modifiedAt}
        margin="small"
      />
    ));

  return (
    <Box justify="center" align="center" background="light">
      <Box flex wrap direction="row" width="xlarge" align="center" justify="center" pad="small">
        {errors && renderError()}
        {data.subject.notes && renderNoteList()}
      </Box>
    </Box>
  );
};
