import { Box, Button, Heading, Image, Text } from 'grommet';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import upvote from '../../assets/images/Upvote.svg';
import trash from '../../assets/images/Trash.svg';
import upvoted from '../../assets/images/Upvoted.svg';

export interface Props {
  author: string;
  date: string;
  paragraph: string;
  upvoteCounts: number;
  isUpvoted: boolean;
  onVote: (isUpvoted: boolean) => void;
  onDelete?: () => void;
}

/*
TODO: Make individual button components
*/

const UpvoteHoveredBox = styled(Box)`
  transition: all 0.2s ease-in-out;
  max-height: 500px;
  border-radius: 20px;
  box-shadow: inset 0px 0px 0px 1px #4787d3;
  &:hover {
    box-shadow: inset 0px 0px 0px 2px #4787d3;
  } /*  */
`;

const DeleteHoveredBox = styled(Box)`
  transition: all 0.2s ease-in-out;
  max-height: 500px;
  border-radius: 20px;
  box-shadow: inset 0px 0px 0px 1px #ff2b5e;
  &:hover {
    box-shadow: inset 0px 0px 0px 2px #ff2b5e;
  } /*  */
`;

export const NoteComment: FunctionComponent<Props> = ({ author, date, paragraph, upvoteCounts, isUpvoted, onVote }) => {
  return (
    <Box width="320px" background="white" direction="column" round="20px" overflow="hidden" elevation="medium">
      <Box fill pad={{ bottom: 'small', horizontal: 'medium', top: 'medium' }}>
        <Box fill background="white" direction="row" align="center" justify="between" margin={{ bottom: 'small' }}>
          <Box direction="column">
            <Heading level="3" margin="none">
              {author}
            </Heading>
            <Text color="gray" size="xsmall" margin="none">
              {date}
            </Text>
          </Box>
        </Box>
        <Text size="14px">{paragraph}</Text>
      </Box>
      <Box justify="end" direction="row" pad={{ horizontal: 'small', vertical: 'small' }}>
        <DeleteHoveredBox
          direction="column"
          align="center"
          margin={{ horizontal: '5px' }}
          justify="center"
          background="white"
          overflow="hidden"
          pad={{ horizontal: '10px', vertical: '0px' }}
        >
          <Button
            plain
            reverse
            alignSelf="center"
            icon={
              <Image
                src={trash}
                width="16px"
                margin={{ left: '-10px' /*because of the empty label..*/, bottom: '2px' }}
              />
            }
            margin={{ horizontal: '2px', vertical: '6px' }}
            label={<Text size="15px" alignSelf="center" />} // if you delete the label, it makes a 12px wide padding around the icon...
          />
        </DeleteHoveredBox>
        <UpvoteHoveredBox
          direction="column"
          align="center"
          justify="center"
          background={isUpvoted ? 'primary' : 'white'}
          overflow="hidden"
          margin={{ horizontal: '5px' }}
          pad={{ horizontal: '10px', vertical: '0px' }}
        >
          <Button
            plain
            reverse
            icon={<Image src={isUpvoted ? upvoted : upvote} width="16px" margin={{ bottom: '2px' }} />}
            margin={{ horizontal: '2px', vertical: '6px' }}
            label={
              <Text
                margin={{ right: '-8px' }}
                size="15px"
                weight={isUpvoted ? 'bold' : 'normal'}
                color={isUpvoted ? 'white' : 'primary'}
                alignSelf="center"
              >
                {upvoteCounts}{' '}
              </Text>
            }
            onClick={() => onVote(isUpvoted)}
          />
        </UpvoteHoveredBox>
      </Box>
    </Box>
  );
};
