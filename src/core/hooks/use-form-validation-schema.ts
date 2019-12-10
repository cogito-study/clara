import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useFormValidationSchema = () => {
  const { t } = useTranslation('core');

  const legalCheckboxSchema = Yup.object({
    legal: Yup.boolean().oneOf([true], t('form.terms.validation.required')),
  });

  const passwordConfirmSchema = Yup.object({
    password: Yup.string()
      .min(8, t('form.password.validation.minCharacter'))
      .required(t('form.password.validation.required')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], t('form.password.confirm.validation.different'))
      .required(t('form.password.validation.required')),
  });

  const emailSchema = Yup.object({
    email: Yup.string()
      .email(t('form.email.validation.format'))
      .required(t('form.email.validation.required')),
  });

  return { passwordConfirmSchema, emailSchema, legalCheckboxSchema };
};

export const mergeValidationSchemas = (schemas: Yup.ObjectSchema[]): Yup.ObjectSchema => {
  const [first, ...rest] = [...schemas];

  return rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);
};
