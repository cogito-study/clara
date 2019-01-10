import gql from 'graphql-tag';
import { Box, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
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
    subject(code: $subjectCode) {
      notes {
        id
        number
        title
        description
        updatedAt
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
  const size = useContext(ResponsiveContext);

  const renderNoteList = () => {
    const renderDateLabel = (createdAt: string, updatedAt?: string): string =>
      updatedAt
        ? `Frissítve ${dateService.yearMonthDay(updatedAt)}`
        : `Létrehozva ${dateService.yearMonthDay(createdAt)}`;

    return data.subject.notes
      .sort((lhs, rhs) => lhs.id - rhs.id)
      .map((note) => (
        <Tilt key={note.id} className="Tilt" options={{ max: 15, scale: 1.04, speed: 1250 }}>
          <Link to={routePath.subjectNote(subjectCode, note.id)}>
            <HoveredNoteCard
              noteNumber={note.number}
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
    <Box
      justify="center"
      width="xxlarge"
      align="center"
      background="light"
      margin={{ top: 'medium' }}
      pad={{ horizontal: 'large' }}
    >
      {size === 'small' ? (
        // TODO: align items to center without margin
        <Box direction="column" gap="xsmall" margin={{ right: 'medium' }}>
          {data.subject.notes && renderNoteList()}
        </Box>
      ) : (
        //TODO: use grid instead
        <Box direction="row" width="xlarge" align="center" justify="between" pad="none">
          <Box wrap fill={true} direction="row" justify="center">
            {data.subject.notes && renderNoteList()}
            <Box width="280px" height="0px" margin="small" />
            <Box width="280px" height="0px" margin="small" />
            <Box width="280px" height="0px" margin="small" />
          </Box>
        </Box>
      )}
    </Box>
  );
};
