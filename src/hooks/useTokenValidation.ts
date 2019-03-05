import * as H from 'history';
import { useEffect } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { CHECK_TOKEN_MUTATION } from '../graphql/mutations/CheckTokenMutation';
import { CheckTokenMutation, CheckTokenMutationVariables } from '../graphql/mutations/__generated__/CheckTokenMutation';
import { routeBuilder } from '../route/routeBuilder';

export const useTokenValidation = (token: string, history: H.History) => {
  const checkToken = useMutation<CheckTokenMutation, CheckTokenMutationVariables>(CHECK_TOKEN_MUTATION);

  const validateToken = async () => {
    const { data } = await checkToken({ variables: { token } });

    if (!data.checkTokenValid) {
      history.push(routeBuilder.linkExpired());
    }
  };

  useEffect(() => validateToken, [validateToken, token]);
};
