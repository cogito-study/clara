import { FormField, Text, TextArea } from 'grommet';
import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';

export interface NoteCommentContentProps {
  paragraph?: string;
  onNewCommentChange?: (value: string) => void;
}

export const NoteCommentContent: FunctionComponent<NoteCommentContentProps> = ({ paragraph, onNewCommentChange }) => (
  <Fragment>
    {paragraph && <Text size="small">{paragraph}</Text>}
    {onNewCommentChange && (
      <FormField htmlFor="text-area">
        <TextArea
          id="text-area"
          placeholder="Itt adhatod meg a kommented.."
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onNewCommentChange(event.target.value)}
        />
      </FormField>
    )}
  </Fragment>
);
