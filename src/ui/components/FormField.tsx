import { Box, BoxProps, FormField, FormFieldProps } from 'grommet';
import React, { FunctionComponent } from 'react';

const FormFieldWrapper: FunctionComponent<FormFieldProps & BoxProps> = (props) => (
  <Box
    direction="row"
    width="medium"
    round="14px"
    pad="5px"
    align="center"
    border={{
      side: 'all',
      size: '1px',
      color: 'primary',
    }}
  >
    <FormField {...props}>{props.children}</FormField>
  </Box>
);

export { FormFieldWrapper as FormField };
