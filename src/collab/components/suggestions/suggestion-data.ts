import Delta from 'quill-delta';
import { SuggestionFragment } from './graphql/suggestion-fragment.generated';

export class SuggestionData {
  author: string;
  id: string;
  delta: Delta;
  createdAt: Date;

  constructor({ id, delta, createdAt, author: { fullName } }: SuggestionFragment) {
    this.id = id;
    this.delta = new Delta(JSON.parse(delta));
    this.author = fullName;
    this.createdAt = new Date(createdAt);
  }

  inverseDelta(base: Delta): Delta {
    return this.delta.invert(base);
  }
}
