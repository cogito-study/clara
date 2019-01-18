import { Form, Formik } from 'formik';
import { Box, Button, FormField, Heading, Paragraph, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';

interface ForgetPasswordCardProps {
  onForgetPassword: (email: string, resetForm: () => void) => void;
}

export const ForgetPasswordCard: FunctionComponent<ForgetPasswordCardProps> = ({ onForgetPassword }) => (
  <Box background="white" elevation="xlarge" align="center" justify="center" round="medium">
    <Heading level="2" margin="medium" color="primary" textAlign="center">
      Jelszó visszaállítása
    </Heading>
    <Paragraph textAlign="center" size="medium" margin="medium">
      Küldünk egy e-mail, melynek segítségével visszaállíthatod a jelszavad
    </Paragraph>

    <Box fill="horizontal" pad="medium" align="center">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={({ email }, { resetForm }) => onForgetPassword(email, resetForm)}
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
                        placeholder="student@university.com"
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
