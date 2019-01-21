import { Editor as CoreEditor } from 'slate';

export const ReadOnlyPlugin = () => ({
  onBeforeInput(event: Event, editor: CoreEditor) {
    event.preventDefault();
    return editor;
  },
  onKeyDown(event: Event, editor: CoreEditor, next: VoidFunction) {
    event.preventDefault();
    return editor;
  },
  onPaste(event: Event, editor: CoreEditor) {
    event.preventDefault();
    return editor;
  },
  onDrop(event: Event, editor: CoreEditor) {
    event.preventDefault();
    return editor;
  },
});
