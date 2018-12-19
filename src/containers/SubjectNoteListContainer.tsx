import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { NoteCard } from '../ui/components';

const SUBJECT_NOTE_LIST_QUERY = gql`
  query SubjectInfo($subjectCode: String!) {
    subject(subjectCode: $subjectCode) {
      notes {
        seriesNumber
        title
        description
        modifiedAt
      }
    }
  }
`;

export const SubjectNoteListContainer: FunctionComponent<RouteComponentProps<{ subjectCode: string }>> = ({
  match,
}) => {
  const { subjectCode } = match.params;
  const { data, errors } = useQuery(SUBJECT_NOTE_LIST_QUERY, { variables: { subjectCode } });

  const renderError = () => <div>Error</div>; // TODO: proper error handling

  const renderNoteList = () =>
    data.subject.notes.map((note, index) => (
      <NoteCard
        key={index}
        noteNumber={note.seriesNumber}
        title={note.title}
        abstract={note.description}
        date={note.modifiedAt}
        margin="small"
      />
    ));

  return (
    <Box fill background="light" justify="center" align="center">
      <Box
        flex
        wrap
        direction="row"
        width="xlarge"
        background="light"
        fill="vertical"
        align="start"
        justify="start"
        gap="small"
        pad="medium"
      >
        {errors && renderError()}
        {data.subject.notes && renderNoteList()}
      </Box>
    </Box>
  );
};
