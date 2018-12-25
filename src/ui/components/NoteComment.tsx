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
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  &:hover {
    box-shadow: inset 0px 0px 0px 1.5px #4787d3;
  } /*  */
`;

export const NoteComment: FunctionComponent<Props> = ({ author, date, paragraph, upvoteCounts, isUpvoted, onVote }) => {
  return (
    <Box width="320px" background="white" direction="column" round="small" overflow="hidden" elevation="medium">
      <Box fill pad="medium">
        <Box fill background="white" direction="row" align="center" justify="between" margin={{ bottom: 'medium' }}>
          <Box direction="column">
            <Heading level="3" margin="none">
              {author}
            </Heading>
            <Text color="gray" size="small" margin="none">
              {date}
            </Text>
          </Box>
          <Box direction="row">
            <Text
              margin="xsmall"
              size="18px"
              weight={isUpvoted ? 'bold' : 'normal'}
              color={'primary'}
              alignSelf="center"
            >
              {upvoteCounts}
            </Text>
            <Image src={upvote} width="24px" margin={{ bottom: '4px' }} />
          </Box>
        </Box>
        <Text size="16px">{paragraph}</Text>
      </Box>
      <Box background="backgroundBlue" height="2px" />
      <HoveredBox
        fill
        direction="column"
        align="center"
        justify="center"
        background={isUpvoted ? 'primary' : 'white'}
        width="50px"
        overflow="hidden"
        pad="none"
      >
        <Button
          fill
          plain
          reverse
          icon={<Image src={isUpvoted ? upvoted : upvote} width="21px" margin={{ bottom: '4px' }} />}
          margin="10px"
          label={
            <Text
              margin="none"
              size="16px"
              weight={isUpvoted ? 'bold' : 'normal'}
              color={isUpvoted ? 'white' : 'primary'}
              alignSelf="center"
            >
              {isUpvoted ? 'UPVOTED' : 'UPVOTE'}
            </Text>
          }
          color={`${isUpvoted}` ? 'primary' : 'primary'}
          onClick={() => onVote(isUpvoted)}
        />
      </HoveredBox>
    </Box>
  );
};
