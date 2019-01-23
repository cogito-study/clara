import { Text, TextArea } from 'grommet';
import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';
import { colors } from '../../theme/global';

export interface NoteCommentContentProps {
  paragraph?: string;
  onNewCommentChange?: (value: string) => void;
}

export const NoteCommentContent: FunctionComponent<NoteCommentContentProps> = ({ paragraph, onNewCommentChange }) => (
  <Fragment>
    {paragraph && <Text size="small">{paragraph}</Text>}
    {onNewCommentChange && (
      <TextArea
        style={{ background: colors.gray_light_4, border: '1px solid #72A6E4', minHeight: '100px' }}
        id="text-area"
        resize="vertical"
        placeholder="Itt adhatod meg a kommented.."
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onNewCommentChange(event.target.value)}
      />
    )}
  </Fragment>
);
