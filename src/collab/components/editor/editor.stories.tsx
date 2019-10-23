import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { EditorHeader, EditorHeaderProps } from './editor-header';

export default {
  title: collabComponents('Editor'),
};

const editorHeaderPropsInEditMode: EditorHeaderProps = {
  mode: 'edit',
  subject: 'Vascular surgery',
};

const editorHeaderPropsInStudyMode: EditorHeaderProps = {
  mode: 'study',
  subject: 'Vascular surgery',
};

export const editorHeaderInEditMode = () => <EditorHeader {...editorHeaderPropsInEditMode} />;
export const editorHeaderWhenInStudyMode = () => <EditorHeader {...editorHeaderPropsInStudyMode} />;
