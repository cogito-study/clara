import Quill from 'quill';
import { imageHandler } from './image/utils';
import { TextMarking } from './text-marking';

Quill.register('modules/text-marking', TextMarking);
Quill.import('modules/text-marking');

const options = {
  theme: 'snow',
  debug: 'warn',
  scrollingContainer: document.documentElement,
  modules: {
    toolbar: {
      container: '#toolbar',
      handlers: {
        image: imageHandler,
      },
    },
    'text-marking': true,
  },
};

export const createEditModeQuill = () => {
  const editor = new Quill('.collab-quill-editor', options);
  editor.root.setAttribute('spellcheck', 'false');
  return editor;
};
