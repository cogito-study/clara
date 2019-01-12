import { Editor as CoreEditor } from 'slate';

export const ReadOnlyPlugin = () => ({
  onCommand(command: any, editor: CoreEditor, next: VoidFunction) {
    return next();
  },
});
