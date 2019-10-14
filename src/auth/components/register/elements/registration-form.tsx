import { Form, Formik } from 'formik';
import { Anchor, Box, Button, CheckBox, FormField, Paragraph, TextInput } from 'grommet';
import React, { FC } from 'react';
import * as Yup from 'yup';
import { Spinner } from '../../../../core/components/spinner';
import { config } from '../../../../core/environment/config';

export interface RegistrationFormProps {
  isLoading: boolean;
  onRegistration: (password: string, resetForm: () => void) => void;
}

/* eslint-disable complexity */
export const RegistrationForm: FC<RegistrationFormProps> = ({ onRegistration, isLoading }) => {
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ password: '', passwordConfirm: '', legalAccepted: false }}
      onSubmit={({ password }, { resetForm }) => onRegistration(password, resetForm)}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(7, 'A jelszónak legalább 7 karakter hosszúnak kell lennie.')
          .required('Jelszó megadása kötelező'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password')], 'A két jelszó nem egyezik meg')
          .required('Jelszó megerősítése kötelező'),
        legalAccepted: Yup.boolean().oneOf([true]),
      })}
    >
      {({ values, touched, errors, isSubmitting, isValidating, handleChange, handleBlur }) => {
        return (
          <Box fill>
            <Form>
              <Box align="center">
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

                <Box fill="horizontal" margin="none">
                  <FormField
                    label="Jelszó megerősítése"
                    htmlFor="passwordConfirm"
                    error={
                      errors.passwordConfirm && touched.passwordConfirm
                        ? errors.passwordConfirm
                        : undefined
                    }
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

                <Box direction="row" align="center" margin="small">
                  <CheckBox
                    id="legalAccepted"
                    checked={values.legalAccepted}
                    onChange={handleChange}
                  />
                  <Paragraph textAlign="center" size="small">
                    Elfogadom az{' '}
                    <Anchor
                      alignSelf="center"
                      color="primary"
                      label="ÁSZF"
                      href={config.termsURL}
                      target="_blank"
                    />
                    -et
                  </Paragraph>
                </Box>

                {isSubmitting || isLoading ? (
                  <Spinner primary />
                ) : (
                  <Button
                    primary
                    type="submit"
                    disabled={isValidating}
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
