import { Dispatch, SetStateAction } from 'react';
import { SuggestionData } from '../suggestion-data';

export type SuggestionHooksParams = { setter: Dispatch<SetStateAction<SuggestionData[]>> };

export * from './use-active-suggestions';
export * from './use-suggestion-approve';
export * from './use-suggestion-create';
export * from './use-suggestion-reject';
export * from './use-suggestion-update';
