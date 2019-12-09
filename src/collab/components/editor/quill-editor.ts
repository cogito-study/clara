import Quill, { BoundsStatic } from 'quill';
import Delta from 'quill-delta';
import { MutableRefObject } from 'react';
import { EventDispatcher, Handler } from '../../utils/event-dispatcher';
import { SuggestionData } from './../suggestions/suggestion-data';

export type EditorState =
  | 'original'
  | 'mySuggestionApplied'
  | 'otherSuggestionAppliedWithoutMySuggestion'
  | 'otherSuggestionAppliedWithMySuggestion';

export interface StateChangedEventProps {
  oldState: EditorState;
  newState: EditorState;
}

export interface CursorPositionChangedEventProps {
  position: BoundsStatic;
}

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
      createdAt: new Date(),
      author: { id: '', fullName: '' },
    });
    this.original = original;

    quill.on('text-change', (delta, _, source) => {
      if (source === 'user') {
        this.typeSuggestion(delta);
      }
    });

    quill.on('editor-change', (eventName: string, range: { index: number; length: number }) => {
      if (eventName === 'selection-change' && range) {
        this.cursorPositionChangedDispatcher.dispatch({
          position: {
            ...quill.getBounds(range.index),
          },
        });
      }
    });
  }

  private stateChangedDispatcher = new EventDispatcher<StateChangedEventProps>();
  public onStateChanged(handler: Handler<StateChangedEventProps>) {
    this.stateChangedDispatcher.register(handler);
  }

  private cursorPositionChangedDispatcher = new EventDispatcher<CursorPositionChangedEventProps>();
  public onCursorPositionChanged(handler: Handler<CursorPositionChangedEventProps>) {
    this.cursorPositionChangedDispatcher.register(handler);
  }

  private changeState(newState: EditorState) {
    const oldState = this.editorState;
    this.editorState = newState;
    this.stateChangedDispatcher.dispatch({ oldState, newState });
  }

  hasMySuggestion() {
    return (
      this.editorState === 'mySuggestionApplied' ||
      this.editorState === 'otherSuggestionAppliedWithMySuggestion'
    );
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
        this.changeState('mySuggestionApplied');

        break;
      case 'otherSuggestionAppliedWithoutMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.quill.updateContents(suggestion);
        this.changeState('original');

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
        this.changeState('otherSuggestionAppliedWithoutMySuggestion');

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
        this.changeState('otherSuggestionAppliedWithMySuggestion');

        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
    let idx = 0;
    otherSuggestion.delta.ops.forEach((op) => {
      if (op['insert']) {
        if (typeof op['insert'] === 'string') {
          this.quill.getModule('text-marking').mark('addedBySomeone', {
            index: idx,
            length: op['insert'].length,
          });
          idx += op['insert'].length;
        } else {
          idx += 1;
        }
      } else if (op['retain']) {
        idx += op['retain'];
      }
    });
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
        this.changeState('mySuggestionApplied');

        break;
      case 'otherSuggestionAppliedWithoutMySuggestion':
        this.quill.updateContents(this.otherSuggestion.inverseDelta(this.original.current));
        this.changeState('original');

        break;
      default:
        console.error('Invalid state:', this.editorState);
        break;
    }
  }

  typeSuggestion(delta: Delta) {
    switch (this.editorState) {
      case 'original':
        this.changeState('mySuggestionApplied');

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
        this.changeState('original');

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
