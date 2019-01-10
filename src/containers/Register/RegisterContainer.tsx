import { Box, Image, ResponsiveContext } from 'grommet';
import React, { FunctionComponent, useContext } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import cogitoLandscape from '../../assets/images/cogitoLandscape.svg';
import cogitoPortrait from '../../assets/images/cogitoPortrait.svg';

import { authService } from '../../services/authService';
import { AuthRouteParams } from '../../types/RouteParams';
import { RegistrationCard } from '../../ui/components';
import { ActivateUserMutation, ActivateUserMutationVariables } from './__generated__/ActivateUserMutation';
import { UserInfoQuery, UserInfoQueryVariables } from './__generated__/UserInfoQuery';
import { ACTIVATE_USER } from './ActivateUserMutation';
import { USER_INFO_QUERY } from './UserInfoQuery';

export const RegisterContainer: FunctionComponent<RouteComponentProps<AuthRouteParams>> = ({ history, match }) => {
  const screenSize = useContext(ResponsiveContext);

  const { userID } = match.params;
  const { data } = useQuery<UserInfoQuery, UserInfoQueryVariables>(USER_INFO_QUERY, { variables: { userID } });
  const registerPassword = useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ACTIVATE_USER);

  const onRegistration = async (password: string) => {
    const mutation = await registerPassword({ variables: { userID, password } });
    authService.authSuccess(mutation.data.activate.token, history);
  };

  return (
    <Box fill justify="center" pad="medium" margin={{ bottom: 'large' }} align="center">
      <Box align="center" justify="center" direction="row-responsive">
        {screenSize === 'small' ? (
          <Box align="center" pad={{ vertical: 'large' }}>
            <Image src={cogitoLandscape} width="280px" />
          </Box>
        ) : (
          <Box justify="center" pad={{ left: 'small', right: 'xlarge' }}>
            <Image src={cogitoPortrait} width="200px" />
          </Box>
        )}
        <Box width="480px" align="center">
          {data.user && (
            <RegistrationCard
              name={`${data.user.lastName} ${data.user.firstName}`}
              email={data.user.email}
              onRegistration={onRegistration}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
