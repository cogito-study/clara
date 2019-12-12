import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SuggestionHooksParams } from '.';
import { CollabRouteParams } from '../../../utils/collab-route';
import { useActiveSuggestionsQuery } from '../graphql/active-suggestions-query.generated';
import { SuggestionData } from '../suggestion-data';

export const useActiveSuggestions = ({ setter }: SuggestionHooksParams) => {
  const { noteID } = useParams<CollabRouteParams>();
  const { data, loading } = useActiveSuggestionsQuery({
    variables: { noteID },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      setter(data.activeSuggestions.map((suggestion) => new SuggestionData(suggestion)));
    }
  }, [data, setter]);

  return { isLoading: loading };
};
