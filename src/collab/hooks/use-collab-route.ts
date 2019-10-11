import { subjectRouteParam, SubjectRouteParams } from '../../subject/hooks/use-subject-route';

type CollabRouteOption = { path: 'note'; subjectCode?: string; noteID?: string };

const noteRouteParam = ':noteID';
export type CollabRouteParams = { noteID?: string } & SubjectRouteParams;

export const useCollabRoute = (option: CollabRouteOption): string => {
  switch (option.path) {
    case 'note':
      const { subjectCode, noteID } = option;
      return `/subjects/${subjectCode ? subjectCode : subjectRouteParam}/notes/${
        noteID ? noteID : noteRouteParam
      }`;
  }
};
