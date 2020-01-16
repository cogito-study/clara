import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authRoute } from '../utils/auth-route';
import {
  useValidateTokenMutation,
  ValidateTokenMutationVariables,
} from './graphql/validate-token-mutation.generated';

export const useTokenValidation = ({ token, type }: Partial<ValidateTokenMutationVariables>) => {
  const history = useHistory();
  const [validateToken, { loading }] = useValidateTokenMutation();

  useEffect(() => {
    const validate = async () => {
      if (token && type) {
        const { data } = await validateToken({ variables: { token, type } });
        if (!data?.validateToken) {
          history.push(authRoute({ path: 'link-expired' }));
        }
      } else {
        history.push(authRoute({ path: 'link-expired' }));
      }
    };

    validate();
  }, [validateToken, history, token, type]);

  return { isTokenValidationLoading: loading };
};
