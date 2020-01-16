import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SuggestionHooksParams } from '.';
import { SuggestionProps } from '..';
import { useErrorToastEffect } from '../../../../core/hooks';
import { CollabRouteParams } from '../../../utils/collab-route';
import { useSuggestionRejectSubscription } from '../graphql/suggestion-reject-subscription.generated';

type SuggestionRejectParams = SuggestionHooksParams & SuggestionProps;

export const useSuggestionReject = ({ setter, quillEditor }: SuggestionRejectParams) => {
  const { noteID } = useParams<CollabRouteParams>();

  const { data, error } = useSuggestionRejectSubscription({ variables: { noteID } });
  useEffect(() => {
    if (data) {
      setter((prev) => prev.filter((s) => s.id !== data.rejectedSuggestion.id));
      quillEditor && quillEditor.discardOtherSuggestion();
    }
  }, [quillEditor, data, setter]);
  useErrorToastEffect(error);
};
