type CollabRouteOption =
  | { path: 'note-study'; noteID?: string }
  | { path: 'note-edit'; noteID?: string };

const noteRouteParam = ':noteID';
export type CollabRouteParams = { noteID?: string };

export const collabRoute = (option: CollabRouteOption): string => {
  const { noteID } = option;
  switch (option.path) {
    case 'note-study':
      return `/notes/${noteID ? noteID : noteRouteParam}/study`;
    case 'note-edit':
      return `/notes/${noteID ? noteID : noteRouteParam}/edit`;
  }
};
