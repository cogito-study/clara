import React, { FunctionComponent } from 'react';
import { Box, BoxProps, FormField, FormFieldProps } from 'grommet';

const FormFieldWrapper: FunctionComponent<FormFieldProps & BoxProps> = (props) => (
  <Box
    direction="row"
    animation="pulse"
    align="center"
    pad="small"
    width="medium"
    round="small"
    border={{
      side: 'all',
      size: 'small',
      color: 'primary',
    }}
  >
    <FormField {...props}>{props.children}</FormField>
  </Box>
);

export { FormFieldWrapper as FormField };
