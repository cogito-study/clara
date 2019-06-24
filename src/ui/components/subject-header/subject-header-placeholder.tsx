import { Box, ResponsiveContext } from 'grommet';
import React, { useContext } from 'react';
import { theme } from '../../theme';
import { CirclePlaceholder } from '../placeholder/circle-placeholder';
import { HeadingPlaceholder } from '../placeholder/heading-placeholder';
import { LinePlaceholder } from '../placeholder/line-placeholder';

export const SubjectHeaderPlaceholder = () => {
  const screenSize = useContext(ResponsiveContext);
  return (
    <Box flex width="xlarge" height="50px" pad="xsmall" justify="between" align="center" direction="row">
      <Box basis="1/3" justify="start" align="center" direction="row">
        <CirclePlaceholder size={30} />
      </Box>
      <Box basis="1/3" align="center">
        <HeadingPlaceholder
          level={4}
          width="90%"
          align="center"
          startColor={theme.global.colors.primary}
          endColor={theme.global.colors.primary_light_1}
        />
      </Box>
      <Box basis="1/3" direction="row" justify="end" align="center" pad="none" gap="xsmall">
        {screenSize !== 'small' && (
          <Box align="center" margin="small">
            <LinePlaceholder
              width={110}
              align="center"
              startColor={theme.global.colors.primary}
              endColor={theme.global.colors.primary_light_1}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
