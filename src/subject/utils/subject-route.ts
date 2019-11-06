type SubjectRouteOption = { path: 'subjects'; subjectCode?: string };

export const subjectRouteParam = ':subjectCode';
export type SubjectRouteParams = { subjectCode?: string };

export const subjectRoute = ({ path, subjectCode }: SubjectRouteOption): string => {
  switch (path) {
    case 'subjects':
      return `/subjects/${subjectCode ? subjectCode : subjectRouteParam}`;
  }
};
