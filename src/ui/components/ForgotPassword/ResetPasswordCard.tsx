import { Box, Heading, Image, Text, FormField, TextInput, Form, Button } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import profile from '../../../assets/images/Profile.svg';
import { Spinner } from '..';

interface RegistrationCardProps extends RegistrationFormProps {
  name: string;
  email: string;
}

export interface RegistrationFormProps {
  onRegistration: (password: string, resetForm: () => void) => void;
}

export const ResetPasswordCard: FunctionComponent<RegistrationCardProps> = ({ name, email, onRegistration }) => (
  <Box
    width="large"
    background="white"
    elevation="large"
    align="center"
    justify="center"
    round="medium"
    pad={{ horizontal: 'medium', top: 'large', bottom: 'medium' }}
    margin="small"
    gap="none"
  >
    <Heading level="2" margin={{ bottom: 'medium', top: 'none' }} textAlign="center" color="primary">
      Jelszó visszaállítása
    </Heading>
    <Box direction="row" align="center">
      <Box align="center">
        <Image src={profile} width="70px" />
      </Box>
      <Box direction="column" justify="center" pad={{ left: 'medium', vertical: 'small' }}>
        <Heading textAlign="start" level="4" margin="none" color="primary_dark_2">
          {name}
        </Heading>
        <Text textAlign="start" margin="none" size="small" color="primary">
          {email}
        </Text>
      </Box>
    </Box>
    <Box margin={{ top: 'medium' }} pad={{ horizontal: 'medium' }} fill align="center">
      <Formik
        initialValues={{ password: '', passwordConfirm: '', legalAccepted: false }}
        onSubmit={({ password }, { resetForm }) => onRegistration(password, resetForm)}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(7, 'A jelszónak legalább 7 karakter hosszúnak kell lennie.')
            .required('Jelszó megadása kötelező'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'A két jelszó nem egyezik meg')
            .required('Jelszó megerősítése kötelező'),
          legalAccepted: Yup.boolean().oneOf([true]),
        })}
      >
        {(props) => {
          const { values, touched, errors, isSubmitting, isValidating, isValid, handleChange, handleBlur } = props;
          // tslint:disable:cyclomatic-complexity
          return (
            <Box fill>
              <Form>
                <Box align="center">
                  <Box fill="horizontal" margin="none">
                    <FormField
                      label="Új Jelszó"
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

                  <Box fill="horizontal" margin="none">
                    <FormField
                      label="Jelszó megerősítése"
                      htmlFor="passwordConfirm"
                      error={errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : undefined}
                    >
                      <TextInput
                        id="passwordConfirm"
                        type="password"
                        placeholder="*******"
                        value={values.passwordConfirm}
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
                      label="Jelszó visszaállítása"
                      margin="small"
                    />
                  )}
                </Box>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  </Box>
);
