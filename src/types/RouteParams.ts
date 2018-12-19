export interface AuthRouteParams {
  userID: string;
}

export interface SubjectRouteParams {
  subjectCode: string;
}

export interface NoteRouteParams extends SubjectRouteParams {
  noteID: string;
}
