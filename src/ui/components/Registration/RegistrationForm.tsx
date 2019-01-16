import { Form, Formik } from 'formik';
import { Box, Button, CheckBox, FormField, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';

import { Spinner } from '../Spinner';

export interface RegistrationFormProps {
  onRegistration: (password: string, resetForm: () => void) => void;
}

// tslint:disable:cyclomatic-complexity

export const RegistrationForm: FunctionComponent<RegistrationFormProps> = ({ onRegistration }) => {
  return (
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

        return (
          <Box fill>
            <Form>
              <Box align="center">
                <Box fill="horizontal" margin="small">
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

                <Box fill="horizontal" margin="small">
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

                <Box align="center" margin="small">
                  <CheckBox
                    id="legalAccepted"
                    checked={values.legalAccepted}
                    onChange={handleChange}
                    label="Elfogadok mindent"
                  />
                </Box>

                {isSubmitting ? (
                  <Spinner primary />
                ) : (
                  <Button
                    primary
                    type="submit"
                    disabled={!isValid || isValidating}
                    label="Regisztráció"
                    margin="small"
                  />
                )}
              </Box>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};
