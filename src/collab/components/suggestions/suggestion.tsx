import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CollabRouteParams } from '../../utils/collab-route';
import { QuillEditor } from '../editor/quill-editor';
import { useActiveSuggestionsQuery } from './graphql/active-suggestions-query.generated';
import { useApproveSuggestionMutation } from './graphql/suggestion-approve-mutation.generated';
import { useSuggestionApproveSubscription } from './graphql/suggestion-approve-subscription.generated';
import { useSuggestionCreateSubscription } from './graphql/suggestion-create-subscription.generated';
import { useRejectSuggestionMutation } from './graphql/suggestion-reject-mutation.generated';
import { useSuggestionRejectSubscription } from './graphql/suggestion-reject-subscription.generated';
import { useSuggestionUpdateSubscription } from './graphql/suggestion-update-subscription.generated';
import { SuggestionsContainer } from './suggestion-container';
import { SuggestionData } from './suggestion-data';

interface SuggestionProps {
  quillEditor?: QuillEditor;
}

export const Suggestion: FC<SuggestionProps> = ({ quillEditor }) => {
  const { noteID } = useParams<CollabRouteParams>();

  const [suggestions, setSuggestions] = useState<SuggestionData[]>([]);

  const { data: activeSuggestionsData } = useActiveSuggestionsQuery({
    variables: { noteID },
  });
  const [approveSuggestionMutation] = useApproveSuggestionMutation();
  const [rejectSuggestionMutation] = useRejectSuggestionMutation();

  // --- Query ---
  useEffect(() => {
    console.log('QueryResult', activeSuggestionsData);
    if (activeSuggestionsData) {
      setSuggestions(
        activeSuggestionsData.activeSuggestions.map((suggestion) => new SuggestionData(suggestion)),
      );
    }
  }, [activeSuggestionsData]);

  // --- Create Suggestion ---
  const { data: suggestionCreateData } = useSuggestionCreateSubscription({
    variables: { noteID },
  });
  useEffect(() => {
    if (suggestionCreateData) {
      setSuggestions((prev) => {
        console.log('CREATED_SUGGESTION', suggestionCreateData.createdSuggestion, prev);
        return [new SuggestionData(suggestionCreateData.createdSuggestion), ...prev];
      });
    }
  }, [suggestionCreateData]);

  // --- Approve Suggestion ---
  const { data: suggestionApproveData } = useSuggestionApproveSubscription({
    variables: { noteID },
  });
  useEffect(() => {
    if (suggestionApproveData) {
      console.log('APPROVED_SUGGESTION', suggestionApproveData.approvedSuggestion);

      setSuggestions((prev) =>
        prev.filter((s) => s.id !== suggestionApproveData.approvedSuggestion.id),
      );
    }
  }, [suggestionApproveData]);

  // --- Update Suggestion ---
  const { data: suggestionUpdateData } = useSuggestionUpdateSubscription({ variables: { noteID } });
  useEffect(() => {
    if (suggestionUpdateData) {
      console.log('UPDATED_SUGGESTION', suggestionUpdateData.updatedSuggestion);

      setSuggestions((prev) => {
        const { updatedSuggestion } = suggestionUpdateData;

        if (prev.find((s) => s.id === updatedSuggestion.id) !== undefined) {
          return [
            new SuggestionData(updatedSuggestion),
            ...prev.filter((s) => s.id !== updatedSuggestion.id),
          ];
        }

        return prev;
      });
    }
  }, [suggestionUpdateData]);

  // --- Reject Suggestion ---
  const { data: suggestionRejectData } = useSuggestionRejectSubscription({ variables: { noteID } });
  useEffect(() => {
    if (suggestionRejectData) {
      console.log('REJECTED_SUGGESTION', suggestionRejectData.rejectedSuggestion);
      setSuggestions((prev) =>
        prev.filter((s) => s.id !== suggestionRejectData.rejectedSuggestion.id),
      );
    }
  }, [suggestionRejectData]);

  // --- Event Handling ---
  const handleAcceptSuggestion = (id: string) => {
    approveSuggestionMutation({ variables: { suggestionID: id } });
  };

  const handleCancelSuggestion = (id: string) => {
    rejectSuggestionMutation({ variables: { suggestionID: id } });
  };

  const handleSuggestionHovered = (id: string) => {
    console.log(`Suggestion hovered with ID = ${id}`);
    if (quillEditor) {
      const suggestion = suggestions.find((s) => s.id === id);
      if (suggestion) {
        quillEditor.applyOtherSuggestion(suggestion);
      }
    }
  };

  const handleSuggestionBlurred = (id: string) => {
    console.log(`Suggestion blurred with ID = ${id}`);
    if (quillEditor) {
      quillEditor.discardOtherSuggestion();
    }
  };

  return (
    <SuggestionsContainer
      suggestions={suggestions}
      onSuggestionAccepted={handleAcceptSuggestion}
      onSuggestionCancelled={handleCancelSuggestion}
      onSuggestionHovered={handleSuggestionHovered}
      onSuggestionBlurred={handleSuggestionBlurred}
    />
  );
};
