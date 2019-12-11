import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { EditorHeader, EditorHeaderProps } from './editor-header';
import { EditorPlaceholder } from './editor.placeholder';
import { StudyHeader, StudyHeaderProps } from './study-header';

export default {
  title: collabComponents('Editor'),
};

const editorHeaderProps: EditorHeaderProps = {
  subject: { name: 'Vascular surgery', code: 'asd' },
  hasMySuggestion: false,
};

const studyHeaderProps: StudyHeaderProps = {
  subject: { name: 'Vascular surgery', code: 'asd' },
};

export const editorHeader = () => <EditorHeader {...editorHeaderProps} />;
export const studyHeader = () => <StudyHeader {...studyHeaderProps} />;
export const editorPlaceholder = () => <EditorPlaceholder />;
