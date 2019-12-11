import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { SuggestionPlaceholder } from '../suggestions/suggestion.placeholder';

export default {
  title: collabComponents('Suggestion'),
};

export const placeholder = () => <SuggestionPlaceholder />;
