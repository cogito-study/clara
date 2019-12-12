import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SuggestionHooksParams } from '.';
import { useErrorToastEffect } from '../../../../core/hooks';
import { CollabRouteParams } from '../../../utils/collab-route';
import { useSuggestionUpdateSubscription } from '../graphql/suggestion-update-subscription.generated';
import { SuggestionData } from '../suggestion-data';

export const useSuggestionUpdate = ({ setter }: SuggestionHooksParams) => {
  const { noteID } = useParams<CollabRouteParams>();

  const { data, error } = useSuggestionUpdateSubscription({ variables: { noteID } });
  useEffect(() => {
    if (data) {
      setter((prev) => {
        const { updatedSuggestion } = data;

        if (prev.find((s) => s.id === updatedSuggestion.id) !== undefined) {
          return [
            new SuggestionData(updatedSuggestion),
            ...prev.filter((s) => s.id !== updatedSuggestion.id),
          ];
        }

        return prev;
      });
    }
  }, [data, setter]);
  useErrorToastEffect(error);
};
