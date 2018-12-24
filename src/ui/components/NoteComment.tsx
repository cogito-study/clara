import { Box, Button, Heading, Image, Text } from 'grommet';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import upvote from '../../assets/images/Upvote.svg';
import upvoted from '../../assets/images/Upvoted.svg';

export interface Props {
  author: string;
  date: string;
  paragraph: string;
  upvoteCounts: number;
  isUpvoted: boolean;
  onVote: (isUpvoted: boolean) => void;
}

const HoveredBox = styled(Box)`
  transition: all 0.2s ease-in-out;
  max-height: 500px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  &:hover {
    box-shadow: inset 0px 0px 0px 1.5px #4787d3;
  }
`;

export const NoteComment: FunctionComponent<Props> = ({ author, date, paragraph, upvoteCounts, isUpvoted, onVote }) => {
  return (
    <Box width="medium" background="white" direction="row" round="small" overflow="hidden" elevation="medium">
      <Box fill pad="medium">
        <Box fill background="white" direction="row" align="center" justify="between" margin={{ bottom: 'medium' }}>
          <Box direction="column">
            <Heading level="3" margin="none">
              {author}
            </Heading>
            <Text color="gray" size="12px" margin="none">
              {date}
            </Text>
          </Box>
        </Box>
        <Text size="16px">{paragraph}</Text>
      </Box>
      <Box background="backgroundBlue" width="2px" />
      <HoveredBox
        direction="column"
        align="center"
        justify="center"
        background={isUpvoted ? 'primary' : 'white'}
        width="50px"
        overflow="hidden"
        pad="none"
      >
        <Button
          plain
          reverse
          icon={<Image src={isUpvoted ? upvoted : upvote} width="21px" />}
          margin="none"
          color={`${isUpvoted}` ? 'primary' : 'primary'}
          onClick={() => onVote(isUpvoted)}
        />
        <Text
          margin="none"
          color={isUpvoted ? 'white' : 'primary'}
          weight={isUpvoted ? 'bold' : 'normal'}
          alignSelf="center"
        >
          {upvoteCounts}
        </Text>
      </HoveredBox>
    </Box>
  );
};
