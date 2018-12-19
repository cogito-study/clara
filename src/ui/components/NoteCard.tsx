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
  <Box width="medium" pad="none" round="small" elevation="small" {...rest}>
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
    <Box background="light" round={{ corner: 'bottom', size: 'small' }} pad="small" gap="medium">
      <Heading level="3" margin="none">
        {title}
      </Heading>
      <Paragraph margin="none">{abstract}</Paragraph>
      {date && (
        <Paragraph margin="none" size="small" color="lightGrey">
          {`Frissítve: ${format(date, dateFormat.short, { locale: hu })}`}
        </Paragraph>
      )}
    </Box>
  </Box>
);

export { NoteCard };
