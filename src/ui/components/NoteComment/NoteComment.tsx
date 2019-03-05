import { Box } from 'grommet';
import React, { Fragment, FunctionComponent } from 'react';
import { NoteCommentContent, NoteCommentContentProps } from './NoteCommentContent';
import { NoteCommentFooter, NoteCommentFooterProps } from './NoteCommentFooter';
import { NoteCommentHeader, NoteCommentHeaderProps } from './NoteCommentHeader';
import { NoteCommentPlaceholder } from './NoteCommentPlaceholder';

export type NoteCommentProps = NoteCommentHeaderProps &
  NoteCommentContentProps &
  NoteCommentFooterProps & { isLoading?: boolean };

export const NoteComment: FunctionComponent<NoteCommentProps> = ({
  authorName,
  date,
  paragraph,
  onNewCommentChange,
  isLoading,
  ...rest
}) => {
  return (
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
      {isLoading ? (
        <NoteCommentPlaceholder />
      ) : (
        <Fragment>
          <NoteCommentHeader authorName={authorName} date={date} />
          <NoteCommentContent paragraph={paragraph} onNewCommentChange={onNewCommentChange} />
          <NoteCommentFooter {...rest} />
        </Fragment>
      )}
    </Box>
  );
};
