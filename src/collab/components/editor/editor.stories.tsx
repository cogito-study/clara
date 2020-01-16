import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { StudyHeader, StudyHeaderProps } from '../study/study-header';
import { EditorHeader, EditorHeaderProps } from './editor-header';

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
