import React, { FunctionComponent } from 'react';
import { Box, Button, Heading, Paragraph, Image, Text } from 'grommet';
import upvote from '../../assets/images/Upvote.svg';
import styled from 'styled-components';

export interface NoteCommentProps {
  author: string;
  date: string;
  paragraph: string;
  upvoteCounts: number;
  onUpvote: () => void;
}

const HoveredBox = styled(Box)`
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const NoteComment: FunctionComponent<NoteCommentProps> = ({
  author,
  date,
  paragraph,
  upvoteCounts,
  onUpvote,
}) => {
  return (
    <Box width="medium" direction="row" round="small" overflow="hidden" elevation="medium">
      <Box background="primary" width="12px" />
      <Box fill>
        <Box fill background="light" direction="row" align="center" justify="between" pad="none">
          <Box direction="column">
            <Heading level="3" margin={{ top: 'none', bottom: 'none', horizontal: 'medium' }}>
              {author}
            </Heading>
            <Heading color="lightGray" level="4" margin={{ horizontal: 'medium', vertical: 'none' }}>
              {date}
            </Heading>
          </Box>
          <HoveredBox direction="row" overflow="hidden">
            <Box>
              <Button
                plain
                reverse
                margin="medium"
                label={<Text alignSelf="end">{upvoteCounts}</Text>}
                icon={<Image src={upvote} width="30px" />}
                onClick={onUpvote}
              />
            </Box>
          </HoveredBox>
        </Box>
        <Paragraph margin="0px 20px 20px 20px">{paragraph}</Paragraph>
      </Box>
    </Box>
  );
};
