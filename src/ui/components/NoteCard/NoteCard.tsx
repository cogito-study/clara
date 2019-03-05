import { Box, Heading, Paragraph, ResponsiveContext, Stack } from 'grommet';
import React, { CSSProperties, Fragment, FunctionComponent, useContext } from 'react';

import { NoteCardPlaceholder } from './NoteCardPlaceholder';
import { ResponsiveNoteCard } from './ResponsiveNoteCard';

interface MobileNoteCardProps {
  noteNumber: number;
  title: string;
  dateLabel?: string;
  isLoading?: boolean;
}

interface NoteCardProps extends MobileNoteCardProps {
  abstract: string;
}

const truncateLineStyle = (numberOfLines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: numberOfLines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const NoteCardWrapper: ResponsiveNoteCard<MobileNoteCardProps, NoteCardProps> = {
  Mobile: ({ isLoading, ...rest }) => (
    <Box
      width="100%"
      align="start"
      height="110px"
      justify="between"
      background="white"
      round="small"
      pad="14px"
      margin="small"
      gap="medium"
      elevation="medium"
    >
      {isLoading ? <NoteCardPlaceholder.Mobile /> : <NoteCard.Mobile {...rest} />}
    </Box>
  ),

  Desktop: ({ isLoading, ...rest }) => (
    <Box
      align="center"
      background="white"
      elevation="large"
      gap="small"
      height="270px"
      justify="between"
      margin="small"
      pad="medium"
      round="medium"
      width="280px"
    >
      {isLoading ? <NoteCardPlaceholder.Desktop /> : <NoteCard.Desktop {...rest} />}
    </Box>
  ),
};

const NoteCard: ResponsiveNoteCard<MobileNoteCardProps, NoteCardProps> = {
  Mobile: ({ title, dateLabel, noteNumber }) => (
    <Fragment>
      <Box fill direction="column" margin="none" align="start" gap="xsmall">
        <Box fill="horizontal" margin="none">
          <Stack anchor="right" guidingChild="last">
            <Heading
              margin={{ top: '20px', bottom: '0px' }}
              color="primary"
              level="1"
              style={{ opacity: 0.2, fontSize: '80px' }}
            >
              {noteNumber < 10 ? '0' + noteNumber : noteNumber}
            </Heading>
            <Heading level="4" color="dark" margin="small" style={truncateLineStyle(2)}>
              {title}
            </Heading>
          </Stack>
        </Box>
      </Box>
      {dateLabel && (
        <Paragraph margin="xsmall" textAlign="start" size="small" color="lightGrey">
          {dateLabel}
        </Paragraph>
      )}
    </Fragment>
  ),

  Desktop: ({ title, dateLabel, noteNumber, abstract }) => (
    <Fragment>
      <Box fill direction="column" align="start" justify="start" gap="xsmall">
        <Box fill="horizontal">
          <Stack anchor="top-right" margin={{ top: '12px', horizontal: 'none' }} guidingChild="last">
            <Heading margin="none" color="primary" level="1" style={{ opacity: 0.2, fontSize: '80px' }}>
              {noteNumber < 10 ? '0' + noteNumber : noteNumber}
            </Heading>
            <Heading level="4" color="dark" margin="none" style={truncateLineStyle(3)}>
              {title}
            </Heading>
          </Stack>
        </Box>
        <Paragraph margin="none" size="small" color="grey" style={truncateLineStyle(4)}>
          {abstract}
        </Paragraph>
      </Box>
      {dateLabel && (
        <Paragraph margin="none" size="small" color="lightGrey">
          {dateLabel}
        </Paragraph>
      )}
    </Fragment>
  ),
};

const NoteCardContainer: FunctionComponent<NoteCardProps> = ({ abstract, isLoading, ...rest }) => {
  const screenSize = useContext(ResponsiveContext);

  return (
    <Fragment>
      {screenSize === 'small' ? (
        <NoteCardWrapper.Mobile isLoading={isLoading} {...rest} />
      ) : (
        <NoteCardWrapper.Desktop isLoading={isLoading} abstract={abstract} {...rest} />
      )}
    </Fragment>
  );
};

export { NoteCardContainer as NoteCard };
