import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authRoute } from '../utils/auth-route';
import {
  useValidateTokenMutation,
  ValidateTokenMutationVariables,
} from './graphql/validate-token-mutation.generated';

export const useTokenValidation = (variables: ValidateTokenMutationVariables) => {
  const history = useHistory();
  const [validateToken, { loading }] = useValidateTokenMutation({ variables });

  useEffect(() => {
    const validate = async () => {
      const { data } = await validateToken();
      if (!data?.validateToken) {
        history.push(authRoute({ path: 'link-expired' }));
      }
    };

    validate();
  }, [validateToken, history]);

  return { isTokenValidationLoading: loading };
};
