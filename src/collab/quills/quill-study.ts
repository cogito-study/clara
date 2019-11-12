import Quill from 'quill';

export const createStudyModeEditor = () => new Quill('.study-mode-editor', { readOnly: true });
