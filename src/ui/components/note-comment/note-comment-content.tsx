import { Text, TextArea, Box } from 'grommet';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { colors } from '../../theme/global';

export interface NoteCommentContentProps {
  paragraph?: string;
  onNewCommentChange?: (value: string) => void;
}

export const NoteCommentContent: FunctionComponent<NoteCommentContentProps> = ({ paragraph, onNewCommentChange }) => {
  return (
    <Box margin={{ vertical: 'small' }}>
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
    </Box>
  );
};
