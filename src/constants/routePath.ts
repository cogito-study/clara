const baseURL = '/sote/erseb';

export const routePath = {
  root: '/',
  register: '/register',
  registerWithParams: '/register/:userID',
  subject: baseURL,
  subjectInfo: `${baseURL}/info`,
  subjectNotes: `${baseURL}/notes`,
  subjectNotesWithParams: `${baseURL}/notes/:noteID`,
};
