import { Box, BoxProps, Heading, Paragraph, ResponsiveContext, Stack } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';

interface Props {
  noteNumber: number;
  title: string;
  abstract: string;
  dateLabel?: string;
}

/* eslint-disable complexity */

const NoteCard: FunctionComponent<BoxProps & Props> = ({
  noteNumber,
  title,
  abstract,
  dateLabel,
  children,
  ...rest
}) => {
  const screenSize = useContext(ResponsiveContext);

  return (
    <Box>
      {screenSize === 'small' ? (
        <Box
          width="100%"
          align="start"
          height="110px"
          justify="between"
          background="white"
          round="small"
          pad="14px"
          margin="none"
          gap="medium"
          elevation="medium"
          {...rest}
        >
          {children}

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
                <Heading
                  level="4"
                  color="dark"
                  margin="small"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
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
      ) : (
        <Box
          align="center"
          width="280px"
          height="270px"
          justify="between"
          background="white"
          round="medium"
          pad="medium"
          gap="small"
          elevation="large"
          {...rest}
        >
          {children}

          <Box fill direction="column" align="start" justify="start" gap="xsmall">
            <Box fill="horizontal">
              <Stack anchor="top-right" margin={{ top: '12px', horizontal: 'none' }} guidingChild="last">
                <Heading margin="none" color="primary" level="1" style={{ opacity: 0.2, fontSize: '80px' }}>
                  {noteNumber < 10 ? '0' + noteNumber : noteNumber}
                </Heading>
                <Heading
                  level="4"
                  color="dark"
                  margin="none"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </Heading>
              </Stack>
            </Box>
            <Paragraph
              margin="none"
              size="small"
              color="grey"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {abstract}
            </Paragraph>
          </Box>
          {dateLabel && (
            <Paragraph margin="none" size="small" color="lightGrey">
              {dateLabel}
            </Paragraph>
          )}
        </Box>
      )}
    </Box>
  );
};

export { NoteCard };
