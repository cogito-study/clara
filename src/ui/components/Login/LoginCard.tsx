import { Form, Formik } from 'formik';
import { Box, Button, FormField, Heading, Text, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';

import { routeBuilder } from '../../../route/routeBuilder';
import { Link } from '../Link';
import { Spinner } from '../Spinner';

interface LoginCardProps {
  onLogin: (email: string, password: string, resetForm: () => void) => void;
}

// tslint:disable:cyclomatic-complexity
export const LoginCard: FunctionComponent<LoginCardProps> = ({ onLogin }) => (
  <Box
    width="large"
    background="white"
    elevation="large"
    align="center"
    justify="center"
    round="medium"
    pad={{ horizontal: 'large', vertical: 'large' }}
    margin="small"
    gap="none"
  >
    <Heading level="2" margin={{ bottom: 'small', top: 'none' }} color="primary">
      Bejelentkezés
    </Heading>
    <Box margin={{ top: 'small' }} fill align="center">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={({ email, password }, { resetForm }) => onLogin(email, password, resetForm)}
        validationSchema={Yup.object({
          email: Yup.string().email('Az e-mail cím formátuma nem megfelelő'),
          password: Yup.string().required('Jelszó megadása kötelező'),
        })}
      >
        {({ values, touched, errors, isSubmitting, isValidating, isValid, handleChange, handleBlur }) => {
          return (
            <Box fill>
              <Form>
                <Box align="center">
                  <Box fill="horizontal" margin="none">
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

                  <Box fill="horizontal" margin="none">
                    <FormField
                      label="Jelszó"
                      htmlFor="password"
                      error={errors.password && touched.password ? errors.password : undefined}
                    >
                      <TextInput
                        id="password"
                        type="password"
                        placeholder="*******"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormField>
                  </Box>

                  {isSubmitting ? (
                    <Spinner primary />
                  ) : (
                    <Button
                      primary
                      type="submit"
                      disabled={!isValid || isValidating}
                      label="Bejelentkezés"
                      margin="small"
                    />
                  )}
                </Box>
              </Form>
            </Box>
          );
        }}
      </Formik>
      <Text size="small" margin="xsmall">
        <Link to={routeBuilder.forgetPassword()}>Elfelejtetted a jelszavad?</Link>
      </Text>
    </Box>
  </Box>
);
