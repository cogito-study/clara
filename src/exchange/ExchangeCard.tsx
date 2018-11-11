import React, { FunctionComponent } from 'react';
import { Box, Text } from 'grommet';

interface Props {
  currency: string;
  rate: string;
  baseCurrency: string;
}

export const ExchangeCard: FunctionComponent<Props> = (props: Props) => {
  const { currency, rate, baseCurrency } = props;
  const updated = new Date().toDateString().toUpperCase();

  return (
    <Box
      background="light"
      gap="medium"
      pad="medium"
      elevation="small"
      direction="row-responsive"
      round="small"
      animation="fadeIn"
      responsive
    >
      <Box align="center" justify="center">
        <Text size="xxlarge" weight={700} color="primary">
          {currency}
        </Text>
      </Box>
      <Box pad="small" gap="xsmall" align="center">
        <Text size="large" weight="bold" color="grey">
          {rate.slice(0, 5)} {baseCurrency}
        </Text>
        <Text size="xsmall" color="lightGrey">
          {updated}
        </Text>
      </Box>
    </Box>
  );
};
