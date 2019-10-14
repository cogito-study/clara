type CollabRouteOption = { path: 'notes'; noteID?: string };

const noteRouteParam = ':noteID';
export type CollabRouteParams = { noteID?: string };

export const useCollabRoute = (option: CollabRouteOption): string => {
  switch (option.path) {
    case 'notes':
      const { noteID } = option;
      return `/notes/${noteID ? noteID : noteRouteParam}`;
  }
};
