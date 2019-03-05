export const routeBuilder = {
  root: () => '/',
  register: () => `/register`,
  login: () => '/login',
  forgetPassword: () => '/forget-password',
  emailSent: () => '/email-sent',
  resetPassword: () => '/reset',
  linkExpired: () => '/link-expired',
  resetDone: () => '/reset-done',
  subject: (subjectCode?: string) => `/sote/${subjectCode ? subjectCode : ':subjectCode'}`,
  subjectInfo: (subjectCode?: string) => `/sote/${subjectCode ? subjectCode : ':subjectCode'}/info`,
  subjectNoteList: (subjectCode?: string) => `/sote/${subjectCode ? subjectCode : ':subjectCode'}/notes`,
  subjectNote: (subjectCode?: string, noteID?: string) =>
    `/sote/${subjectCode ? subjectCode : ':subjectCode'}/notes/${noteID ? noteID : ':noteID'}`,
  components: () => '/components',
};
