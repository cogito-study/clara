import Quill from 'quill';
import Delta from 'quill-delta';
import { MutableRefObject } from 'react';
import { SuggestionData } from './../suggestions/suggestion-data';

type EditorState =
  | 'original'
  | 'mySuggestionApplied'
  | 'otherSuggestionAppliedWithoutMySuggestion'
  | 'otherSuggestionAppliedWithMySuggestion';

export class QuillEditor {
  quill: Quill;
  editorState: EditorState;
  mySuggestion: Delta;
  otherSuggestion: SuggestionData;
  original: MutableRefObject<Delta>;

  constructor(quill: Quill, original: MutableRefObject<Delta>) {
    this.quill = quill;
    this.quill.setContents(original.current);
    this.editorState = 'original';
    // TODO find another solution
    this.mySuggestion = new Delta();
    this.otherSuggestion = new SuggestionData({
      id: '',
      delta: '{"ops":[]}',
      createdAt: '',
      author: { id: '', fullName: '' },
    });
    this.original = original;

    quill.on('text-change', (delta, _, source) => {
      if (source === 'user') {
        this.typeSuggestion(delta);
      }
    });
  }

  approveSuggestion(suggestion: Delta) {
    switch (this.editorState) {
      case 'original':
        this.quill.updateContents(suggestion);
        break;
      case 'otherSuggestionAppliedWithMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.quill.updateContents(suggestion);
        this.mySuggestion = suggestion.transform(this.mySuggestion);
        this.quill.updateContents(this.mySuggestion);
        this.editorState = 'mySuggestionApplied';
        break;
      case 'otherSuggestionAppliedWithoutMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.quill.updateContents(suggestion);
        this.editorState = 'original';
        break;
      case 'mySuggestionApplied':
        const currentSelection = this.quill.getSelection();
        const inverseMySuggestion = this.mySuggestion.invert(this.original.current);
        this.quill.updateContents(inverseMySuggestion);
        this.mySuggestion = suggestion.transform(this.mySuggestion);
        this.quill.updateContents(suggestion);
        this.quill.updateContents(this.mySuggestion);
        currentSelection && this.quill.setSelection(currentSelection);
        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
  }

  applyOtherSuggestion(otherSuggestion: SuggestionData) {
    switch (this.editorState) {
      case 'original':
        this.quill.updateContents(otherSuggestion.delta);
        this.otherSuggestion = otherSuggestion;
        this.editorState = 'otherSuggestionAppliedWithoutMySuggestion';
        break;
      case 'otherSuggestionAppliedWithMySuggestion':
      case 'otherSuggestionAppliedWithoutMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.quill.updateContents(otherSuggestion.delta);
        this.otherSuggestion = otherSuggestion;
        break;
      case 'mySuggestionApplied':
        const inverseMySuggestion = this.mySuggestion.invert(this.original.current);
        this.quill.updateContents(inverseMySuggestion);
        this.quill.updateContents(otherSuggestion.delta);
        this.otherSuggestion = otherSuggestion;
        this.editorState = 'otherSuggestionAppliedWithMySuggestion';
        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
  }

  discardOtherSuggestion() {
    switch (this.editorState) {
      case 'original':
      case 'mySuggestionApplied':
        console.error('Cannot discard other Suggestion, it is not present.');
        break;
      case 'otherSuggestionAppliedWithMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.quill.updateContents(this.mySuggestion);
        this.editorState = 'mySuggestionApplied';
        break;
      case 'otherSuggestionAppliedWithoutMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.editorState = 'original';
        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
  }

  typeSuggestion(delta: Delta) {
    switch (this.editorState) {
      case 'original':
        this.editorState = 'mySuggestionApplied';
        this.mySuggestion = new Delta(delta);
        break;
      case 'mySuggestionApplied':
        this.mySuggestion = this.mySuggestion.compose(delta);
        break;
      case 'otherSuggestionAppliedWithMySuggestion':
      case 'otherSuggestionAppliedWithoutMySuggestion':
        console.error('Cannot apply mySuggestion, because an other Suggestion is hovered.');
        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
  }

  publishSuggestion() {
    switch (this.editorState) {
      case 'original':
        console.error('Cannot apply suggestion it is not present.');
        break;
      case 'mySuggestionApplied':
        this.quill.updateContents(this.mySuggestion.invert(this.original.current));
        this.editorState = 'original';
        break;
      case 'otherSuggestionAppliedWithMySuggestion':
      case 'otherSuggestionAppliedWithoutMySuggestion':
        console.error('Cannot publish mySuggestion, because an other Suggestion is hovered.');
        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
  }
}
