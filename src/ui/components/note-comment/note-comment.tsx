import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { NoteCommentContent, NoteCommentContentProps } from './note-comment-content';
import { NoteCommentFooter, NoteCommentFooterProps } from './note-comment-footer';
import { NoteCommentHeader, NoteCommentHeaderProps } from './note-comment-header';

export type NoteCommentProps = NoteCommentHeaderProps & NoteCommentContentProps & NoteCommentFooterProps;

export const NoteComment: FunctionComponent<NoteCommentProps> = ({
  authorName,
  date,
  paragraph,
  onNewCommentChange,
  ...rest
}) => (
  <Box
    width="280px"
    background="white"
    direction="column"
    round="20px"
    overflow="hidden"
    elevation="medium"
    pad="medium"
    gap="small"
  >
    <NoteCommentHeader authorName={authorName} date={date} />
    <NoteCommentContent paragraph={paragraph} onNewCommentChange={onNewCommentChange} />
    <NoteCommentFooter {...rest} />
  </Box>
);
