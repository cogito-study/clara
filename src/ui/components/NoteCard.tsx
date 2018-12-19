import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Heading, Paragraph } from 'grommet';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

import { dateFormat } from '../../constants';
interface Props {
  noteNumber: number;
  title: string;
  abstract: string;
  date?: Date;
}

const NoteCard: FunctionComponent<BoxProps & Props> = ({ noteNumber, title, abstract, date, ...rest }) => (
  <Box width="320px" height="320px" pad="none" round="small" elevation="small" {...rest}>
    <Box
      height="xxsmall"
      background="primary"
      overflow="hidden"
      justify="center"
      align="end"
      round={{ corner: 'top', size: 'small' }}
      pad={{ horizontal: 'small' }}
    >
      <Heading level="3">{noteNumber}</Heading>
    </Box>
    <Box fill justify="between" background="white" round={{ corner: 'bottom', size: 'small' }} pad="medium" gap="small">
      <Heading level="3" margin="none" color="dark">
        {title}
      </Heading>
      <Paragraph margin="none" color="grey">
        {abstract.substring(0, 100)}
      </Paragraph>
      {date && (
        <Paragraph margin="none" size="small" color="lightGrey">
          {`Frissítve: ${format(date, dateFormat.short, { locale: hu })}`}
        </Paragraph>
      )}
    </Box>
  </Box>
);

export { NoteCard };
