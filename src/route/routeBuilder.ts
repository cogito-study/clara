export const routeBuilder = {
  root: () => '/',
  register: (userID?: string) => `/register/${userID ? userID : ':userID'}`,
  subject: (subjectCode?: string) => `/sote/${subjectCode ? subjectCode : ':subjectCode'}`,
  subjectInfo: (subjectCode?: string) => `/sote/${subjectCode ? subjectCode : ':subjectCode'}/info`,
  subjectNoteList: (subjectCode?: string) => `/sote/${subjectCode ? subjectCode : ':subjectCode'}/notes`,
  subjectNote: (subjectCode?: string, noteID?: string) =>
    `/sote/${subjectCode ? subjectCode : ':subjectCode'}/notes/${noteID ? noteID : ':noteID'}`,
  components: () => '/components',
};
