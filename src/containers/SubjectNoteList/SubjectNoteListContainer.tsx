import { Box, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import Tilt from 'react-tilt';
import styled from 'styled-components';
import { routeBuilder } from '../../route/routeBuilder';
import { dateService } from '../../services/dateService';
import { SubjectRouteParams } from '../../types/RouteParams';
import { NoteCard } from '../../ui/components';
import { Link } from '../../ui/components/Link';
import { NoteCardPlaceholder } from '../../ui/components/NoteCard/NoteCardPlaceholder';
import { SUBJECT_NOTE_LIST_QUERY } from './SubjectNoteListQuery';
import {
  SubjectNoteListQuery,
  SubjectNoteListQueryVariables,
  SubjectNoteListQuery_subject,
} from './__generated__/SubjectNoteListQuery';

// const lofasz = styled.div`
//   background-color: red;
// `;

// console.log(lofasz);

const HoveredNoteCard = styled(NoteCard)`
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: ${(props) => props.theme.global.elevation.light.xlarge};
  }
`;

/* eslint-disable complexity */
export const SubjectNoteListContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;
  const { data, loading } = useQuery<SubjectNoteListQuery, SubjectNoteListQueryVariables>(SUBJECT_NOTE_LIST_QUERY, {
    variables: { subjectCode },
  });
  const screenSize = useContext(ResponsiveContext);

  const renderNoteList = ({ notes }: SubjectNoteListQuery_subject) => {
    if (!notes) {
      return undefined;
    }
    // TODO: move the logic to the backend
    notes.sort((lhs, rhs) => lhs.number - rhs.number);

    const renderDateLabel = (createdAt: string, updatedAt?: string): string =>
      updatedAt
        ? `Frissítve ${dateService.yearMonthDay(updatedAt)}`
        : `Létrehozva ${dateService.yearMonthDay(createdAt)}`;

    return notes.map((note) => (
      <Tilt key={note.id} className="Tilt" options={{ max: 15, scale: 1.04, speed: 1250 }}>
        <Link to={routeBuilder.subjectNote(subjectCode, note.id)}>
          <HoveredNoteCard
            noteNumber={note.number}
            title={note.title}
            abstract={note.description ? note.description : ''}
            dateLabel={renderDateLabel(note.createdAt, note.updatedAt)}
          />
        </Link>
      </Tilt>
    ));
  };

  const renderNoteCardPlaceholder = () =>
    Array.from({ length: 12 }).map((_, index) =>
      screenSize === 'small' ? (
        <Box width="100%">
          <NoteCardPlaceholder.Mobile key={index} />
        </Box>
      ) : (
        <NoteCardPlaceholder.Desktop key={index} />
      ),
    );

  return (
    <Box
      justify="center"
      width="xxlarge"
      align="center"
      background="light"
      margin={{ top: 'medium' }}
      pad={{ horizontal: 'large' }}
    >
      {screenSize === 'small' ? (
        // TODO: align items to center without margin
        <Box direction="column" gap="xsmall" margin={{ right: 'medium' }}>
          {loading && renderNoteCardPlaceholder()}
          {data && data.subject && renderNoteList(data.subject)}
        </Box>
      ) : (
        // TODO: use grid instead
        <Box direction="row" width="xlarge" align="center" justify="between" pad="none">
          <Box wrap fill={true} direction="row" justify="center">
            {loading && renderNoteCardPlaceholder()}
            {data && data.subject && renderNoteList(data.subject)}
            <Box width="280px" height="0px" margin="small" />
            <Box width="280px" height="0px" margin="small" />
            <Box width="280px" height="0px" margin="small" />
          </Box>
        </Box>
      )}
    </Box>
  );
};
