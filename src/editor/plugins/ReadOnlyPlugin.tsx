import { Editor as CoreEditor } from 'slate';
import { Plugin } from 'slate-react';

export const ReadOnlyPlugin = (): Plugin => ({
  onKeyDown(event: Event, editor: CoreEditor, next: VoidFunction) {
    event.preventDefault();
    return editor;
  },
});
