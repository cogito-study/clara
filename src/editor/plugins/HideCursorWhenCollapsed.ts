import { Editor as CoreEditor } from 'slate';

export default function HideCursorWhenCollapsed() {
  return {
    onCommand(command: any, editor: CoreEditor, next: () => void) {
      const { type, args } = command;
      console.log(type, args);
      return next();
    },
  };
}
