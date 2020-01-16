import { Location } from 'history';

type SubjectRouteOption =
  | { path: 'subjects'; subjectCode?: string }
  | { path: 'subjects-info'; subjectCode?: string }
  | { path: 'subjects-feed'; subjectCode?: string }
  | { path: 'subjects-notes'; subjectCode?: string };

export const subjectRouteParam = ':subjectCode';
export type SubjectRouteParams = { subjectCode?: string };

export const subjectRoute = ({ path, subjectCode }: SubjectRouteOption): string => {
  const param = subjectCode ? subjectCode : subjectRouteParam;

  switch (path) {
    case 'subjects':
      return `/subjects/${param}`;
    case 'subjects-notes':
      return `/subjects/${param}/notes`;
    case 'subjects-feed':
      return `/subjects/${param}/feed`;
    case 'subjects-info':
      return `/subjects/${param}/info`;
  }
};

export const isSubjectsPath = (location: Location) => location.pathname.includes('subjects');
