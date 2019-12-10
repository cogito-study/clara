import { Icon } from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiClock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from './feedback';

export const LinkExpired = () => {
  const history = useHistory();
  const { t } = useTranslation('auth');

  return (
    <Feedback
      title={t('linkExpired.feedback.title')}
      icon={<Icon as={FiClock} color="blue.600" size="96px" />}
      description={t('linkExpired.feedback.description')}
      buttonLabel={t('button.login')}
      onButtonClick={() => history.push(authRoute({ path: 'login' }))}
    />
  );
};
