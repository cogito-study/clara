import { Editor as CoreEditor } from 'slate';

export default function HideCursorWhenCollapsed() {
  return {
    onCommand(command: any, editor: CoreEditor, next: () => void) {
      return next();
    },
  };
}
