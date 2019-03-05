import { Box, Heading, Paragraph, ResponsiveContext, Stack } from 'grommet';
import React, { CSSProperties, Fragment, FunctionComponent, useContext } from 'react';
import { ResponsiveNoteCard } from './ResponsiveNoteCard';

interface MobileNoteCardProps {
  noteNumber: number;
  title: string;
  dateLabel?: string;
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

const NoteCard: ResponsiveNoteCard<MobileNoteCardProps, NoteCardProps> = {
  Mobile: ({ title, dateLabel, noteNumber }) => (
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
    </Box>
  ),

  Desktop: ({ title, dateLabel, noteNumber, abstract }) => (
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
    </Box>
  ),
};

const NoteCardWrapper: FunctionComponent<NoteCardProps> = ({ abstract, ...rest }) => {
  const screenSize = useContext(ResponsiveContext);

  return (
    <Fragment>
      {screenSize === 'small' ? <NoteCard.Mobile {...rest} /> : <NoteCard.Desktop abstract={abstract} {...rest} />}
    </Fragment>
  );
};

export { NoteCardWrapper as NoteCard };
