import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import { MoreMenu } from '../elements/more-menu';

export type SubjectInfoCardProps = {
  title: string;
  description: string;
  code?: string;
  department?: string;
  isEditable?: boolean;
  isDeletable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const SubjectInfoCard: FC<SubjectInfoCardProps> = ({
  title,
  description,
  code,
  department,
  isEditable,
  isDeletable,
  ...rest
}) => {
  const shouldShowMoreMenu = isDeletable || isEditable;

  return (
    <Box>
      <Heading
        fontSize={['md', 'lg']}
        fontWeight="bold"
        color="blue.700"
        lineHeight="normal"
        mt={[5, 6, 6, 8]}
        mb={0}
      >
        {title}
      </Heading>
      {code && department ? (
        <Flex mt={2} direction="row" justify="space-between">
          <Text fontSize="sm" color="grey.700" lineHeight="normal" maxW="70%">
            {department}
          </Text>
          <Text fontSize="sm" color="grey.700" lineHeight="normal">
            {code}
          </Text>
        </Flex>
      ) : null}
      <Flex
        mt={3}
        borderWidth={1}
        borderColor="grey.100"
        bg="#fff"
        direction="column"
        align="flex-end"
      >
        {shouldShowMoreMenu ? (
          <MoreMenu
            isEditable={isEditable}
            isDeletable={code && department ? false : isDeletable}
            {...rest}
          />
        ) : null}
        <Text
          fontSize="sm"
          m={[5, 6, 8]}
          mt={shouldShowMoreMenu ? [0, 0, 0] : [5, 6, 8]}
          color="grey.900"
          lineHeight="tall"
        >
          {description}
        </Text>
      </Flex>
    </Box>
  );
};
