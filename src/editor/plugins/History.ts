import { isKeyHotkey } from 'is-hotkey';
import { Editor as CoreEditor } from 'slate';
import { Plugin } from 'slate-react';

/* eslint-disable */

const undoHotkey = isKeyHotkey('mod+z');
const redoHotkey = isKeyHotkey('mod+shift+z');

export const undo = (editor: CoreEditor) => editor.undo();

export const redo = (editor: CoreEditor) => editor.redo();

export const History = (): Plugin => ({
  onKeyDown(event: Event, editor: CoreEditor, next: () => any) {
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
});
