import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const usePasswordValidation = () => {
  const { t } = useTranslation('auth');

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, t('password.minCharacter'))
      .required(t('password.required')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], t('password.confirm.different'))
      .required(t('password.confirm.required')),
  });

  return { validationSchema };
};

export const useEmailValidation = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  return { validationSchema };
};
