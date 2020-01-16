import Delta from 'quill-delta';
import { SuggestionPermissionType } from '../../../core/graphql/types.generated';
import { SuggestionFragment } from './graphql/suggestion-fragment.generated';

export class SuggestionData {
  id: string;
  delta: Delta;
  author: string;
  createdAt: Date;
  permissions: SuggestionPermissionType[];

  constructor({ id, delta, createdAt, permissions, author: { fullName } }: SuggestionFragment) {
    this.id = id;
    this.delta = new Delta(JSON.parse(delta));
    this.author = fullName;
    this.createdAt = createdAt;
    this.permissions = [...permissions];
  }

  inverseDelta(base: Delta): Delta {
    return this.delta.invert(base);
  }
}
