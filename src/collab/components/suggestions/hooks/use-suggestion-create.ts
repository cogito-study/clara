import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SuggestionHooksParams } from '.';
import { useErrorToastEffect } from '../../../../core/hooks';
import { CollabRouteParams } from '../../../utils/collab-route';
import { useSuggestionCreateSubscription } from '../graphql/suggestion-create-subscription.generated';
import { SuggestionData } from '../suggestion-data';

export const useSuggestionCreate = ({ setter }: SuggestionHooksParams) => {
  const { noteID } = useParams<CollabRouteParams>();

  const { data, error } = useSuggestionCreateSubscription({ variables: { noteID } });
  useEffect(() => {
    if (data) {
      setter((prev) => {
        return [new SuggestionData(data.createdSuggestion), ...prev];
      });
    }
  }, [data, setter]);
  useErrorToastEffect(error);
};
