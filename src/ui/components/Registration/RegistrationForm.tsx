import { Form, Formik } from 'formik';
import { Box, Button, CheckBox, Text, TextInput } from 'grommet';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';

import { FormField } from '../FormField';
import { Spinner } from '../Spinner';

export interface RegistrationFormProps {
  onRegistration: (password: string) => void;
}

// tslint:disable:cyclomatic-complexity

export const RegistrationForm: FunctionComponent<RegistrationFormProps> = ({ onRegistration }) => {
  return (
    <Formik
      initialValues={{ password: '', passwordConfirm: '', legalAccepted: false }}
      onSubmit={({ password }) => onRegistration(password)}
      validationSchema={Yup.object({
        password: Yup.string().required('Jelszó megadása kötelező'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'A két jelszó nem egyezik meg')
          .required('Jelszó megerősítése kötelező'),
        legalAccepted: Yup.boolean().oneOf([true]),
      })}
    >
      {(props) => {
        const { values, touched, errors, isSubmitting, isValidating, isValid, handleChange, handleBlur } = props;

        console.log('Form isValid?', isValid);

        return (
          <Form>
            <Box align="center">
              <Box margin={{ horizontal: 'large', vertical: 'small' }}>
                <Text size="16px" weight="bold" margin="0px 0px 0px 3px" color="nightBlue">
                  Jelszó
                </Text>
                <FormField
                  flex
                  htmlFor="password"
                  margin="none"
                  error={errors.password && touched.password ? errors.password : undefined}
                >
                  <TextInput
                    plain
                    id="password"
                    type="password"
                    placeholder="*******"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormField>
              </Box>

              <Box margin={{ horizontal: 'large', vertical: 'small' }}>
                <Text size="16px" weight="bold" margin="0px 0px 0px 3px" color="nightBlue">
                  Jelszó megerősítése
                </Text>
                <FormField
                  flex
                  htmlFor="passwordConfirm"
                  margin="none"
                  error={errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : undefined}
                >
                  <TextInput
                    plain
                    id="passwordConfirm"
                    type="password"
                    placeholder="*******"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormField>
              </Box>

              <Box align="center" margin={{ top: 'medium' }}>
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
                <Button primary type="submit" disabled={!isValid || isValidating} label="Regisztráció" margin="small" />
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
