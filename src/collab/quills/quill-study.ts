import Quill from 'quill';

export const createStudyModeQuill = () => new Quill('.study-mode-editor', { readOnly: true });
