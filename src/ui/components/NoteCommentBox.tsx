import React, { FunctionComponent } from 'react';
import { Box, Button, Heading, Paragraph, Image, Text } from 'grommet';
import upvote from '../../assets/images/Upvote.svg';
import styled from 'styled-components';

interface Props {
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

export const NoteCommentBox: FunctionComponent<Props> = ({ author, date, paragraph, upvoteCounts, onUpvote }) => {
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
<<<<<<< HEAD
        <Box
          height="42px"
          background="light"
          align="end"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          border={{ color: 'lightGray', side: 'top', size: 'xsmall' }}
        >
          <Button
            plain
            reverse
            label={upvoteCounts}
            icon={<Like size="medium" color="lightGrey" />}
            onClick={onUpvote}
          />
        </Box>
=======
        <Paragraph margin="0px 20px 20px 20px">{paragraph}</Paragraph>
>>>>>>> Updated comment component
      </Box>
    </Box>
  );
};
