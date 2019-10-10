export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime */
  DateTime: any;
};

/** Input of activation user */
export type ActivateUserInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type ActivationToken = {
  __typename?: 'ActivationToken';
  id: Scalars['ID'];
  token: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
};

export type AuthenticationPayload = {
  __typename?: 'AuthenticationPayload';
  token: Scalars['String'];
  user: User;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type ConnectRelation = {
  id: Scalars['ID'];
};

/** Input of create department */
export type CreateDepartmentInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  institute: ConnectRelation;
  leader: ConnectRelation;
};

/** Input of create institute */
export type CreateInstituteInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

/** Input of create note comment */
export type CreateNoteCommentInput = {
  name: Scalars['String'];
  content: Scalars['String'];
  author: ConnectRelation;
};

/** Input of create note comment */
export type CreateNoteCommentThreadInput = {
  name: Scalars['String'];
  position: Scalars['String'];
  comment: ConnectRelation;
  note: ConnectRelation;
};

/** Input of create note highlight */
export type CreateNoteHighlightInput = {
  position: Scalars['String'];
  user: ConnectRelation;
  note: ConnectRelation;
};

/** Input of create note */
export type CreateNoteInput = {
  name: Scalars['String'];
  content: Scalars['String'];
  contentHTML: Scalars['String'];
  title: Scalars['String'];
  number: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  noteCategory: NoteCategoryEnum;
  subject: ConnectRelation;
};

/** Input of create subject information */
export type CreateSubjectInformationInput = {
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  subject: ConnectRelation;
};

/** Input of create subject */
export type CreateSubjectInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  department: ConnectRelation;
  language: ConnectRelation;
};

/** Input of create suggestion */
export type CreateSuggestionInput = {
  delta: Scalars['String'];
  author: ConnectRelation;
  note: ConnectRelation;
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  leader: User;
  subjects?: Maybe<Array<Subject>>;
  institute: Institute;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type DepartmentSubjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DepartmentPermission = {
  __typename?: 'DepartmentPermission';
  id: Scalars['ID'];
  type: DepartmentPermissionTypeEnum;
  objects?: Maybe<Array<Department>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type DepartmentPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum DepartmentPermissionTypeEnum {
  UpdateDepartment = 'UPDATE_DEPARTMENT',
  DeleteDepartment = 'DELETE_DEPARTMENT',
  CreateSubject = 'CREATE_SUBJECT',
}

export type DepartmentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

/** Input of forgot password */
export type ForgotPasswordInput = {
  email?: Maybe<Scalars['String']>;
};

/** Input of image upload */
export type ImageUploadInput = {
  file: Scalars['String'];
  extension: Scalars['String'];
};

export type Institute = {
  __typename?: 'Institute';
  id: Scalars['ID'];
  name: Scalars['String'];
  departments?: Maybe<Array<Department>>;
  users?: Maybe<Array<User>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type InstituteDepartmentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type InstituteUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type InstitutePermission = {
  __typename?: 'InstitutePermission';
  id: Scalars['ID'];
  type: InstitutePermissionTypeEnum;
  objects?: Maybe<Array<Institute>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type InstitutePermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum InstitutePermissionTypeEnum {
  UpdateInstitute = 'UPDATE_INSTITUTE',
  DeleteInstitute = 'DELETE_INSTITUTE',
  CreateDepartment = 'CREATE_DEPARTMENT',
}

export type InstituteWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type LanguageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  uploadImage: Scalars['String'];
  createDepartment: Department;
  updateDepartment: Department;
  deleteDepartment: Department;
  createInstitute: Institute;
  updateInstitute: Institute;
  deleteInstitute: Institute;
  createNote: Note;
  updateNote: Note;
  deleteNote: Note;
  createNoteComment: NoteComment;
  updateNoteComment: NoteComment;
  deleteNoteComment: NoteComment;
  createNoteCommentThread: NoteCommentThread;
  deleteNoteCommentThread: NoteCommentThread;
  createNoteHighlight: NoteHighlight;
  updateNoteHighlight: NoteHighlight;
  deleteNoteHighlight: NoteHighlight;
  createSubject: Subject;
  updateSubject: Subject;
  deleteSubject: Subject;
  createSubjectInformation: SubjectInformation;
  updateSubjectInformation: SubjectInformation;
  deleteSubjectInformation: SubjectInformation;
  createSuggestion: Suggestion;
  updateSuggestion: Suggestion;
  deleteSuggestion: Suggestion;
  updateUser: User;
  deleteUser: User;
  login: AuthenticationPayload;
  forgotPassword: Scalars['String'];
  activateUser: AuthenticationPayload;
  resetPassword: AuthenticationPayload;
};

export type MutationUploadImageArgs = {
  data: ImageUploadInput;
};

export type MutationCreateDepartmentArgs = {
  data: CreateDepartmentInput;
};

export type MutationUpdateDepartmentArgs = {
  where: WhereUniqueInput;
  data: UpdateDepartmentInput;
};

export type MutationDeleteDepartmentArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateInstituteArgs = {
  data: CreateInstituteInput;
};

export type MutationUpdateInstituteArgs = {
  where: WhereUniqueInput;
  data: UpdateInstituteInput;
};

export type MutationDeleteInstituteArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateNoteArgs = {
  data: CreateNoteInput;
};

export type MutationUpdateNoteArgs = {
  where: WhereUniqueInput;
  data: UpdateNoteInput;
};

export type MutationDeleteNoteArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateNoteCommentArgs = {
  data: CreateNoteCommentInput;
};

export type MutationUpdateNoteCommentArgs = {
  where: WhereUniqueInput;
  data: UpdateNoteCommentInput;
};

export type MutationDeleteNoteCommentArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateNoteCommentThreadArgs = {
  data: CreateNoteCommentThreadInput;
};

export type MutationDeleteNoteCommentThreadArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateNoteHighlightArgs = {
  data: CreateNoteHighlightInput;
};

export type MutationUpdateNoteHighlightArgs = {
  where: WhereUniqueInput;
  data: UpdateNoteHighlightInput;
};

export type MutationDeleteNoteHighlightArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateSubjectArgs = {
  data: CreateSubjectInput;
};

export type MutationUpdateSubjectArgs = {
  where: WhereUniqueInput;
  data: UpdateSubjectInput;
};

export type MutationDeleteSubjectArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateSubjectInformationArgs = {
  data: CreateSubjectInformationInput;
};

export type MutationUpdateSubjectInformationArgs = {
  where: WhereUniqueInput;
  data: UpdateSubjectInformationInput;
};

export type MutationDeleteSubjectInformationArgs = {
  where: WhereUniqueInput;
};

export type MutationCreateSuggestionArgs = {
  data: CreateSuggestionInput;
};

export type MutationUpdateSuggestionArgs = {
  where: WhereUniqueInput;
  data: UpdateSuggestionInput;
};

export type MutationDeleteSuggestionArgs = {
  where: WhereUniqueInput;
};

export type MutationUpdateUserArgs = {
  where: WhereUniqueInput;
  data: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  where: WhereUniqueInput;
};

export type MutationLoginArgs = {
  data: UserLoginInput;
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};

export type MutationActivateUserArgs = {
  data: ActivateUserInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  content: Scalars['String'];
  contentHTML: Scalars['String'];
  title: Scalars['String'];
  number: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  noteCategory: NoteCategoryEnum;
  suggestions?: Maybe<Array<Suggestion>>;
  commentThreads?: Maybe<Array<NoteCommentThread>>;
  authors?: Maybe<Array<User>>;
  likers?: Maybe<Array<User>>;
  highlights?: Maybe<Array<NoteHighlight>>;
  subject: Subject;
  /** Number of likes on the note */
  likesCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteSuggestionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NoteCommentThreadsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NoteAuthorsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NoteLikersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NoteHighlightsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum NoteCategoryEnum {
  Note = 'NOTE',
  CaseStudy = 'CASE_STUDY',
}

export type NoteComment = {
  __typename?: 'NoteComment';
  id: Scalars['ID'];
  content: Scalars['String'];
  author: User;
  likers?: Maybe<Array<User>>;
  thread?: Maybe<NoteCommentThread>;
  threadReply?: Maybe<NoteCommentThread>;
  /** Number of likes on the note comment */
  likesCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteCommentLikersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NoteCommentPermission = {
  __typename?: 'NoteCommentPermission';
  id: Scalars['ID'];
  type: NoteCommentPermissionTypeEnum;
  objects?: Maybe<Array<NoteComment>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteCommentPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum NoteCommentPermissionTypeEnum {
  UpdateNoteComment = 'UPDATE_NOTE_COMMENT',
  DeleteNoteComment = 'DELETE_NOTE_COMMENT',
}

export type NoteCommentThread = {
  __typename?: 'NoteCommentThread';
  id: Scalars['ID'];
  position: Scalars['String'];
  comment: NoteComment;
  replies?: Maybe<Array<NoteComment>>;
  note: Note;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadRepliesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NoteCommentThreadPermission = {
  __typename?: 'NoteCommentThreadPermission';
  id: Scalars['ID'];
  type: NoteCommentThreadPermissionTypeEnum;
  objects?: Maybe<Array<NoteCommentThread>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum NoteCommentThreadPermissionTypeEnum {
  DeleteNoteCommentThread = 'DELETE_NOTE_COMMENT_THREAD',
}

export type NoteCommentThreadWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type NoteCommentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type NoteHighlight = {
  __typename?: 'NoteHighlight';
  id: Scalars['ID'];
  position: Scalars['String'];
  user: User;
  note: Note;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteHighlightPermission = {
  __typename?: 'NoteHighlightPermission';
  id: Scalars['ID'];
  type: NoteHighlightPermissionTypeEnum;
  objects?: Maybe<Array<NoteHighlight>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteHighlightPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum NoteHighlightPermissionTypeEnum {
  UpdateNoteHighlight = 'UPDATE_NOTE_HIGHLIGHT',
  DeleteNoteHighlight = 'DELETE_NOTE_HIGHLIGHT',
}

export type NoteHighlightWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type NotePermission = {
  __typename?: 'NotePermission';
  id: Scalars['ID'];
  type: NotePermissionTypeEnum;
  objects?: Maybe<Array<Note>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type NotePermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum NotePermissionTypeEnum {
  UpdateNote = 'UPDATE_NOTE',
  DeleteNote = 'DELETE_NOTE',
  CreateSuggestion = 'CREATE_SUGGESTION',
}

export type NoteWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type PasswordToken = {
  __typename?: 'PasswordToken';
  id: Scalars['ID'];
  token: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type PasswordTokenWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  token?: Maybe<Scalars['String']>;
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['ID'];
  departmentPermission?: Maybe<DepartmentPermission>;
  institutePermission?: Maybe<InstitutePermission>;
  notePermission?: Maybe<NotePermission>;
  noteCommentPermission?: Maybe<NoteCommentPermission>;
  noteCommentThreadPermission?: Maybe<NoteCommentThreadPermission>;
  noteHighlightPermission?: Maybe<NoteHighlightPermission>;
  subjectPermission?: Maybe<SubjectPermission>;
  subjectInformationPermission?: Maybe<SubjectInformationPermission>;
  suggestionPermission?: Maybe<SuggestionPermission>;
  userPermission?: Maybe<UserPermission>;
};

export type Query = {
  __typename?: 'Query';
  department?: Maybe<Department>;
  departments?: Maybe<Array<Department>>;
  departmentPermissions?: Maybe<Array<DepartmentPermission>>;
  institute?: Maybe<Institute>;
  institutes?: Maybe<Array<Institute>>;
  institutePermissions?: Maybe<Array<InstitutePermission>>;
  language?: Maybe<Language>;
  languages?: Maybe<Array<Language>>;
  note?: Maybe<Note>;
  notes?: Maybe<Array<Note>>;
  notePermissions?: Maybe<Array<NotePermission>>;
  noteComment?: Maybe<NoteComment>;
  noteComments?: Maybe<Array<NoteComment>>;
  noteCommentPermissions?: Maybe<Array<NoteCommentPermission>>;
  noteCommentThread?: Maybe<NoteCommentThread>;
  noteCommentThreads?: Maybe<Array<NoteCommentThread>>;
  noteCommentThreadPermissions?: Maybe<Array<NoteCommentThreadPermission>>;
  noteHighlight?: Maybe<NoteHighlight>;
  noteHighlights?: Maybe<Array<NoteHighlight>>;
  noteHighlightPermissions?: Maybe<Array<NoteHighlightPermission>>;
  resetPassword?: Maybe<PasswordToken>;
  resetPasswords?: Maybe<Array<PasswordToken>>;
  subject?: Maybe<Subject>;
  subjects?: Maybe<Array<Subject>>;
  subjectPermissions?: Maybe<Array<SubjectPermission>>;
  subjectInformation?: Maybe<SubjectInformation>;
  subjectInformations?: Maybe<Array<SubjectInformation>>;
  subjectInformationPermissions?: Maybe<Array<SubjectInformationPermission>>;
  suggestion?: Maybe<Suggestion>;
  suggestions?: Maybe<Array<Suggestion>>;
  suggestionPermissions?: Maybe<Array<SuggestionPermission>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  me: User;
  userPermissions?: Maybe<Array<UserPermission>>;
};

export type QueryDepartmentArgs = {
  where: DepartmentWhereUniqueInput;
};

export type QueryDepartmentsArgs = {
  where?: Maybe<QueryFindManyDepartmentWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryDepartmentPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryInstituteArgs = {
  where: InstituteWhereUniqueInput;
};

export type QueryInstitutesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryInstitutePermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryLanguageArgs = {
  where: LanguageWhereUniqueInput;
};

export type QueryLanguagesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteArgs = {
  where: NoteWhereUniqueInput;
};

export type QueryNotesArgs = {
  where?: Maybe<QueryFindManyNoteWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNotePermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteCommentArgs = {
  where: NoteCommentWhereUniqueInput;
};

export type QueryNoteCommentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteCommentPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteCommentThreadArgs = {
  where: NoteCommentThreadWhereUniqueInput;
};

export type QueryNoteCommentThreadsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteCommentThreadPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteHighlightArgs = {
  where: NoteHighlightWhereUniqueInput;
};

export type QueryNoteHighlightsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNoteHighlightPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryResetPasswordArgs = {
  where: PasswordTokenWhereUniqueInput;
};

export type QueryResetPasswordsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuerySubjectArgs = {
  where: SubjectWhereUniqueInput;
};

export type QuerySubjectsArgs = {
  where?: Maybe<QueryFindManySubjectWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuerySubjectPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuerySubjectInformationArgs = {
  where: SubjectInformationWhereUniqueInput;
};

export type QuerySubjectInformationsArgs = {
  where?: Maybe<QueryFindManySubjectInformationWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuerySubjectInformationPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuerySuggestionArgs = {
  where: SuggestionWhereUniqueInput;
};

export type QuerySuggestionsArgs = {
  where?: Maybe<QueryFindManySuggestionWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuerySuggestionPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  where?: Maybe<QueryFindManyUserWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryUserPermissionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryFindManyDepartmentWhereInput = {
  name?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type QueryFindManyNoteFilter = {
  every?: Maybe<QueryFindManyNoteWhereInput>;
  some?: Maybe<QueryFindManyNoteWhereInput>;
  none?: Maybe<QueryFindManyNoteWhereInput>;
};

export type QueryFindManyNoteWhereInput = {
  title?: Maybe<StringFilter>;
  number?: Maybe<IntFilter>;
  description?: Maybe<NullableStringFilter>;
  likers?: Maybe<QueryFindManyNoteFilter>;
  subject?: Maybe<QueryFindManyNoteWhereInput>;
};

export type QueryFindManySubjectInformationWhereInput = {
  title?: Maybe<StringFilter>;
  subtitle?: Maybe<NullableStringFilter>;
};

export type QueryFindManySubjectWhereInput = {
  id?: Maybe<StringFilter>;
  code?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  description?: Maybe<StringFilter>;
};

export type QueryFindManySuggestionFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type QueryFindManySuggestionWhereInput = {
  approvedAt?: Maybe<QueryFindManySuggestionFilter>;
};

export type QueryFindManyUserWhereInput = {
  email?: Maybe<StringFilter>;
  firstName?: Maybe<StringFilter>;
  lastName?: Maybe<StringFilter>;
  phoneNumber?: Maybe<NullableStringFilter>;
  identifier?: Maybe<StringFilter>;
  isActive?: Maybe<BooleanFilter>;
  role?: Maybe<QueryFindManyUserWhereInput>;
};

/** Input of reset password */
export type ResetPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordToken = {
  __typename?: 'ResetPasswordToken';
  token: Scalars['String'];
  email: Scalars['ID'];
  createdAt: Scalars['DateTime'];
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  department: Department;
  teachers?: Maybe<Array<User>>;
  students?: Maybe<Array<User>>;
  informations?: Maybe<Array<SubjectInformation>>;
  notes?: Maybe<Array<Note>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SubjectTeachersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SubjectStudentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SubjectInformationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SubjectNotesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SubjectInformation = {
  __typename?: 'SubjectInformation';
  id: Scalars['ID'];
  title: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  subject: Subject;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SubjectInformationPermission = {
  __typename?: 'SubjectInformationPermission';
  id: Scalars['ID'];
  type: SubjectInformationPermissionTypeEnum;
  objects?: Maybe<Array<SubjectInformation>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SubjectInformationPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum SubjectInformationPermissionTypeEnum {
  UpdateSubjectInformation = 'UPDATE_SUBJECT_INFORMATION',
  DeleteSubjectInformation = 'DELETE_SUBJECT_INFORMATION',
}

export type SubjectInformationWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

export type SubjectPermission = {
  __typename?: 'SubjectPermission';
  id: Scalars['ID'];
  type: SubjectPermissionTypeEnum;
  objects?: Maybe<Array<Subject>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SubjectPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum SubjectPermissionTypeEnum {
  UpdateSubject = 'UPDATE_SUBJECT',
  DeleteSubject = 'DELETE_SUBJECT',
  CreateNote = 'CREATE_NOTE',
}

export type SubjectWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  id: Scalars['ID'];
  approvedAt?: Maybe<Scalars['DateTime']>;
  delta: Scalars['String'];
  likers?: Maybe<Array<User>>;
  note: Note;
  author: User;
  approvedBy?: Maybe<User>;
  /** Number of likes on the suggestion */
  likesCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SuggestionLikersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SuggestionPermission = {
  __typename?: 'SuggestionPermission';
  id: Scalars['ID'];
  type: SuggestionPermissionTypeEnum;
  objects?: Maybe<Array<Suggestion>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SuggestionPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum SuggestionPermissionTypeEnum {
  UpdateSuggestion = 'UPDATE_SUGGESTION',
  DeleteSuggestion = 'DELETE_SUGGESTION',
  ApproveSuggestion = 'APPROVE_SUGGESTION',
  RejectSuggestion = 'REJECT_SUGGESTION',
}

export type SuggestionWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};

/** Input of update department */
export type UpdateDepartmentInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  leader?: Maybe<ConnectRelation>;
};

/** Input of update institute */
export type UpdateInstituteInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

/** Input of update note comment */
export type UpdateNoteCommentInput = {
  content?: Maybe<Scalars['String']>;
};

/** Input of update note highlight */
export type UpdateNoteHighlightInput = {
  position?: Maybe<Scalars['String']>;
};

/** Input of update note */
export type UpdateNoteInput = {
  name?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentHTML?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  noteCategory?: Maybe<NoteCategoryEnum>;
};

/** Input of update subject information */
export type UpdateSubjectInformationInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

/** Input of update subject */
export type UpdateSubjectInput = {
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

/** Input of update suggestion */
export type UpdateSuggestionInput = {
  delta?: Maybe<Scalars['String']>;
};

/** Input of update user */
export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  profilePictureURL?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  identifier: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  noteHighlights?: Maybe<Array<NoteHighlight>>;
  suggestions?: Maybe<Array<Suggestion>>;
  approvedSuggestions?: Maybe<Array<Suggestion>>;
  teachedSubjects?: Maybe<Array<Subject>>;
  studiedSubjects?: Maybe<Array<Subject>>;
  likedNotes?: Maybe<Array<Note>>;
  comments?: Maybe<Array<NoteComment>>;
  likedComments?: Maybe<Array<NoteComment>>;
  passwordToken?: Maybe<PasswordToken>;
  departments?: Maybe<Array<Department>>;
  institutes?: Maybe<Array<Institute>>;
  preferredLanguage?: Maybe<Language>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserNotesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserNoteHighlightsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserSuggestionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserApprovedSuggestionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserTeachedSubjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserStudiedSubjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserLikedNotesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserCommentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserLikedCommentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserDepartmentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserInstitutesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Input of login */
export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserPermission = {
  __typename?: 'UserPermission';
  id: Scalars['ID'];
  type: UserPermissionTypeEnum;
  objects?: Maybe<Array<User>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserPermissionObjectsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum UserPermissionTypeEnum {
  UpdateUser = 'UPDATE_USER',
  DeleteUser = 'DELETE_USER',
}

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
};

/** Unique input */
export type WhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
};
