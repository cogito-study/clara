import { Flex, Icon, Spinner } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Head } from '../../../core/components';
import { TokenType } from '../../../core/graphql/types.generated';
import { useErrorToast, useRouteQueryParams } from '../../../core/hooks';
import { useTokenValidation } from '../../hooks';
import { authRoute } from '../../utils/auth-route';
import { Feedback } from '../feedback/feedback';
import { useActivateRegistrationMutation } from './graphql/activate-registration-mutation.generated';
import { PickStudies } from './pick-studies';
import { PickSubjects } from './pick-subjects';

export const ActivateRegistration = () => {
  const history = useHistory();
  const { t } = useTranslation(['auth', 'core']);
  const [selectedMajorID, setSelectedMajorID] = useState<string | undefined>(undefined);
  const { token } = useRouteQueryParams<{ token?: string }>();
  const errorToast = useErrorToast();

  const { isTokenValidationLoading } = useTokenValidation({ token, type: TokenType.Activation });
  const [activateRegistration, { data, loading }] = useActivateRegistrationMutation();

  const handleSave = async (subjectIDs: string[]) => {
    if (selectedMajorID && subjectIDs && token) {
      try {
        await activateRegistration({
          variables: {
            token,
            major: { id: selectedMajorID },
            subjects: subjectIDs.map((id) => ({ id })),
          },
        });
      } catch (error) {
        errorToast(error);
      }
    }
  };

  return (
    <>
      <Head title={t('activation.title')} />
      {isTokenValidationLoading ? (
        <Flex align="center" justify="center">
          <Spinner size="xl" color="blue.800" thickness="3px" />
        </Flex>
      ) : data?.activateRegistration ? (
        <Feedback
          title={t('activation.feedback.title')}
          icon={<Icon as={FiCheckCircle} color="blue.600" size="96px" />}
          description={t('activation.feedback.description')}
          buttonLabel={t('button.login')}
          onButtonClick={() => history.push(authRoute({ path: 'login' }))}
        />
      ) : (
        token &&
        (selectedMajorID ? (
          <PickSubjects
            token={token}
            majorID={selectedMajorID}
            isSubmitting={loading}
            onSave={handleSave}
            onBack={() => setSelectedMajorID(undefined)}
          />
        ) : (
          <PickStudies token={token} onFormSubmit={(majorID) => setSelectedMajorID(majorID)} />
        ))
      )}
    </>
  );
};
