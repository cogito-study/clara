import { isKeyHotkey } from 'is-hotkey';

const undoHotkey = isKeyHotkey('mod+z');
const redoHotkey = isKeyHotkey('mod+shift+z');

const undo = (editor) => {
  editor.undo();
};

const redo = (editor) => {
  editor.redo();
};

export function History() {
  return {
    onKeyDown(event: KeyboardEvent, editor, next: Function) {
      if (undoHotkey(event)) {
        event.preventDefault();
        return undo(editor);
      }
      if (redoHotkey(event)) {
        event.preventDefault();
        return redo(editor);
      }
      return next();
    },
  };
}

export { undo, redo };
