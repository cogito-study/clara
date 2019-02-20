import { Form, Formik } from 'formik';
import { Box, Button, FormField, Heading, Paragraph, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';

interface ForgotPasswordCardProps {
  onForgotPassword: (email: string, resetForm: () => void) => void;
}

export const ForgotPasswordCard: FunctionComponent<ForgotPasswordCardProps> = ({ onForgotPassword }) => (
  <Box
    background="white"
    animation={{ type: 'fadeIn', duration: 500 }}
    elevation="large"
    align="center"
    pad={{ vertical: 'medium' }}
    justify="center"
    round="medium"
  >
    <Heading level="2" margin="medium" color="primary" textAlign="center">
      Jelszó visszaállítása
    </Heading>
    <Paragraph textAlign="center" size="medium" margin={{ horizontal: 'medium', vertical: 'small' }}>
      E-mailben el fogunk küldeni egy hivatkozást, amellyel alaphelyzetbe állíthatod a jelszavad.
    </Paragraph>

    <Box fill="horizontal" pad="small" align="center">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={({ email }, { resetForm }) => onForgotPassword(email, resetForm)}
        validationSchema={Yup.object({
          email: Yup.string().email('Az e-mail cím formátuma nem megfelelő'),
        })}
      >
        {({ values, touched, errors, isSubmitting, isValidating, isValid, handleChange, handleBlur }) => {
          return (
            <Box fill align="center">
              <Form>
                <Box align="center">
                  <Box fill="horizontal" margin="small">
                    <FormField
                      label="Email"
                      htmlFor="email"
                      error={errors.email && touched.email ? errors.email : undefined}
                    >
                      <TextInput
                        id="email"
                        type="email"
                        placeholder="hallgato@egyetem.hu"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </Box>
                  <Button
                    primary
                    type="submit"
                    disabled={!isValid || isValidating || isSubmitting}
                    label="E-mail küldése"
                    margin="small"
                  />
                </Box>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  </Box>
);
