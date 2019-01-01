import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';

import { NoteCommentHeader, NoteCommentHeaderProps } from './NoteCommentHeader';
import { NoteCommentContent, NoteCommentContentProps } from './NoteCommentContent';
import { NoteCommentFooter, NoteCommentFooterProps } from './NoteCommentFooter';

export type NoteCommentProps = NoteCommentHeaderProps & NoteCommentContentProps & NoteCommentFooterProps;

export const NoteComment: FunctionComponent<NoteCommentProps> = ({
  author,
  date,
  paragraph,
  onNewCommentChange,
  ...rest
}) => {
  return (
    <Box
      width="300px"
      background="white"
      direction="column"
      round="20px"
      overflow="hidden"
      elevation="medium"
      pad="medium"
      gap="small"
    >
      <NoteCommentHeader author={author} date={date} />
      <NoteCommentContent paragraph={paragraph} onNewCommentChange={onNewCommentChange} />
      <NoteCommentFooter {...rest} />
    </Box>
  );
};
