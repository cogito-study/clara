import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';

import { NoteComment, NoteCommentProps } from './NoteComment';

export interface NoteCommentBoxProps extends NoteCommentProps {
  marginTop: number;
}

export const NoteCommentBox: FunctionComponent<NoteCommentBoxProps> = ({ marginTop, ...rest }) => {
  return (
    <Box justify="center" align="center" pad="none" margin={{ top: `${marginTop}px` }}>
      <NoteComment {...rest} />
    </Box>
  );
};
