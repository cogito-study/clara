import { Form, Formik } from 'formik';
import { Box, Button, FormField, Heading, Image, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Spinner } from '..';
import profile from '../../../assets/images/Profile.svg';

export interface ResetFormProps {
  onReset: (password: string, resetForm: () => void) => void;
}

/* eslint-disable complexity */

export const ResetPasswordCard: FunctionComponent<ResetFormProps> = ({ onReset }) => (
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
    </Box>
    <Box margin={{ top: 'medium' }} pad={{ horizontal: 'medium' }} fill align="center">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ password: '', passwordConfirm: '' }}
        onSubmit={({ password }, { resetForm }) => {
          onReset(password, resetForm);
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(7, 'A jelszónak legalább 7 karakter hosszúnak kell lennie.')
            .required('Jelszó megadása kötelező'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'A két jelszó nem egyezik meg')
            .required('Jelszó megerősítése kötelező'),
        })}
      >
        {(props) => {
          const { values, touched, errors, isSubmitting, isValidating, handleChange, handleBlur } = props;
          return (
            <Box fill>
              <Form>
                <Box align="center">
                  <Box fill="horizontal" margin="none">
                    <FormField
                      label="Új Jelszó"
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

                  <Box fill="horizontal" margin="none">
                    <FormField
                      label="Jelszó megerősítése"
                      onBlur={handleBlur}
                      error={errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : undefined}
                    >
                      <TextInput
                        name="passwordConfirm"
                        type="password"
                        placeholder="*******"
                        value={values.passwordConfirm}
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
