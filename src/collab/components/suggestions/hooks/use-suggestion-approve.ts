import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SuggestionHooksParams } from '.';
import { useErrorToastEffect } from '../../../../core/hooks';
import { CollabRouteParams } from '../../../utils/collab-route';
import { useSuggestionApproveSubscription } from '../graphql/suggestion-approve-subscription.generated';

export const useSuggestionApprove = ({ setter }: SuggestionHooksParams) => {
  const { noteID } = useParams<CollabRouteParams>();

  const { data, error } = useSuggestionApproveSubscription({ variables: { noteID } });
  useEffect(() => {
    if (data) {
      setter((prev) => prev.filter((s) => s.id !== data.approvedSuggestion.id));
    }
  }, [data, setter]);
  useErrorToastEffect(error);
};
