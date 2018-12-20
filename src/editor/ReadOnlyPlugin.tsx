import { Editor } from 'slate';

export default function ReadOnlyPlugin() {
  return {
    onKeyDown(event: KeyboardEvent, editor: Editor, next: VoidFunction) {
      event.preventDefault();
      return editor;
    },
  };
}
