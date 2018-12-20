import { Editor } from 'slate';

export default function HideCursorWhenCollapsed() {
  return {
    onCommand(command: any, editor: Editor, next: () => void) {
      const { type, args } = command;
      console.log(type, args);
      return next();
    },
  };
}
