type SubjectRouteOption =
  | { path: 'subjects'; subjectCode?: string }
  | { path: 'subject-notes'; subjectCode?: string }
  | { path: 'subject-info'; subjectCode?: string };

export const subjectRouteParam = ':subjectCode';
export type SubjectRouteParams = { subjectCode?: string };

export const useSubjectRoute = ({ path, subjectCode }: SubjectRouteOption): string => {
  const code = subjectCode ? subjectCode : subjectRouteParam;

  switch (path) {
    case 'subjects':
      return `/subjects/${code}`;
    case 'subject-info':
      return `/subjects/${code}/info`;
    case 'subject-notes':
      return `/subjects/${code}/notes`;
  }
};
