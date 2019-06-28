import * as H from 'history';
import { useEffect, useCallback } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { CHECK_TOKEN_MUTATION } from '../graphql/mutations/check-token-mutation';
import { CheckTokenMutation, CheckTokenMutationVariables } from '../graphql/mutations/__generated__/CheckTokenMutation';
import { routeBuilder } from '../route/route-builder';

export const useTokenValidation = (token: string, history: H.History) => {
  const checkToken = useMutation<CheckTokenMutation, CheckTokenMutationVariables>(CHECK_TOKEN_MUTATION);

  const validateToken = useCallback(async () => {
    const { data } = await checkToken({ variables: { token } });

    if (!data.checkTokenValid) {
      history.push(routeBuilder.linkExpired());
    }
  }, [checkToken, token, history]);

  useEffect(() => {
    validateToken;
  }, [validateToken, token]);
};
