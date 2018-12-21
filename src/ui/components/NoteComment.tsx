import React, { FunctionComponent } from 'react';
import { Box, Button, Heading, Paragraph, Text } from 'grommet';
import { CaretUp, CaretDown } from 'grommet-icons';
// import upvote from '../../assets/images/Upvote.svg';
import styled from 'styled-components';

export interface Props {
  author: string;
  date: string;
  paragraph: string;
  upvoteCounts: number;
  isUpvoted: boolean;
  onVote: (isUpvoted: boolean) => void;
}

const HoveredBox = styled(Box)`
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const NoteComment: FunctionComponent<Props> = ({ author, date, paragraph, upvoteCounts, isUpvoted, onVote }) => {
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
                label={
                  <Text color={`${isUpvoted}` ? 'primary' : 'lightGray'} alignSelf="end">
                    {upvoteCounts}
                  </Text>
                }
                icon={isUpvoted ? <CaretDown width="30px" /> : <CaretUp width="30px" />}
                onClick={() => onVote(isUpvoted)}
              />
            </Box>
          </HoveredBox>
        </Box>
        <Paragraph margin="0px 20px 20px 20px">{paragraph}</Paragraph>
      </Box>
    </Box>
  );
};
