import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { EditorHeader, EditorHeaderProps } from './editor-header';

export default {
  title: collabComponents('Editor'),
};

const editorHeaderPropsInEditMode: EditorHeaderProps = {
  mode: 'edit',
  subject: 'Vascular surgery',
  handleEditorModeChange: () => {},
};

const editorHeaderPropsInStudyMode: EditorHeaderProps = {
  mode: 'study',
  subject: 'Vascular surgery',
  handleEditorModeChange: () => {},
};

export const editorHeaderInEditMode = () => <EditorHeader {...editorHeaderPropsInEditMode} />;
export const editorHeaderWhenInStudyMode = () => <EditorHeader {...editorHeaderPropsInStudyMode} />;
