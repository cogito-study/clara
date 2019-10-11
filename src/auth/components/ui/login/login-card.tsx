import { Form, Formik } from 'formik';
import { Box, Button, FormField, Heading, Text, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Link } from '../../../../core/components/link';
import { Spinner } from '../../../../core/components/spinner';
import { useAuthRoute } from '../../../hooks/use-auth-route';

interface LoginCardProps {
  onLogin: (email: string, password: string, resetForm: () => void) => void;
}

/* eslint-disable complexity */
export const LoginCard: FunctionComponent<LoginCardProps> = ({ onLogin }) => {
  const forgotPassword = useAuthRoute({ path: 'forgot-password' });

  return (
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
      <Heading level="2" margin={{ bottom: 'medium', top: 'none' }} color="primary">
        Tanulj velünk!
      </Heading>
      <Box margin={{ top: 'small' }} fill align="center">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }, { resetForm }) => {
            onLogin(email, password, resetForm);
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Az e-mail cím formátuma nem megfelelő'),
            password: Yup.string().required('Jelszó megadása kötelező'),
          })}
        >
          {({ values, touched, errors, isSubmitting, isValidating, handleChange, handleBlur }) => {
            return (
              <Box fill>
                <Form>
                  <Box align="center">
                    <Box fill="horizontal" margin="none">
                      <FormField
                        label="Email"
                        onBlur={handleBlur}
                        error={errors.email && touched.email ? errors.email : undefined}
                      >
                        <TextInput
                          name="email"
                          type="email"
                          placeholder="hallgato@egyetem.hu"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </FormField>
                    </Box>

                    <Box fill="horizontal" margin="none">
                      <FormField
                        label="Jelszó"
                        onBlur={handleBlur}
                        error={errors.password && touched.password ? errors.password : undefined}
                      >
                        <TextInput
                          name="password"
                          type="password"
                          placeholder="*******"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </FormField>
                    </Box>

                    {isSubmitting ? (
                      <Spinner primary />
                    ) : (
                      <Button
                        primary
                        type="submit"
                        disabled={isValidating}
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
          <Link to={forgotPassword}>Elfelejtetted a jelszavad?</Link>
        </Text>
      </Box>
    </Box>
  );
};
