export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Input of activation user */
export type ActivateUserInput = {
  readonly token: Scalars['String'];
  readonly password: Scalars['String'];
};

export type ActivationToken = {
  readonly __typename?: 'ActivationToken';
  readonly id: Scalars['ID'];
  readonly token: Scalars['String'];
  readonly user: User;
  readonly createdAt: Scalars['DateTime'];
};

export type ActivationTokenWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly token: Maybe<StringFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<ActivationTokenWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<ActivationTokenWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<ActivationTokenWhereInput>>;
  readonly user: Maybe<UserWhereInput>;
};

export type AuthenticationPayload = {
  readonly __typename?: 'AuthenticationPayload';
  readonly token: Scalars['String'];
  readonly user: User;
};

export type BooleanFilter = {
  readonly equals: Maybe<Scalars['Boolean']>;
  readonly not: Maybe<Scalars['Boolean']>;
};

export type ConnectRelation = {
  readonly id: Scalars['ID'];
};

/** Input of create department */
export type CreateDepartmentInput = {
  readonly name: Scalars['String'];
  readonly description: Scalars['String'];
  readonly institute: ConnectRelation;
  readonly leader: ConnectRelation;
};

/** Input of create institute */
export type CreateInstituteInput = {
  readonly name: Scalars['String'];
};

/** Input of create note comment */
export type CreateNoteCommentInput = {
  readonly name: Scalars['String'];
  readonly content: Scalars['String'];
  readonly author: ConnectRelation;
};

/** Input of create note comment */
export type CreateNoteCommentThreadInput = {
  readonly name: Scalars['String'];
  readonly position: Scalars['String'];
  readonly comment: ConnectRelation;
  readonly note: ConnectRelation;
};

/** Input of create note highlight */
export type CreateNoteHighlightInput = {
  readonly position: Scalars['String'];
  readonly user: ConnectRelation;
  readonly note: ConnectRelation;
};

/** Input of create note */
export type CreateNoteInput = {
  readonly title: Scalars['String'];
  readonly content: Scalars['String'];
  readonly contentHTML: Scalars['String'];
  readonly number: Scalars['Int'];
  readonly description: Maybe<Scalars['String']>;
  readonly noteCategory: NoteCategory;
  readonly subject: ConnectRelation;
};

/** Input of create post comment */
export type CreatePostCommentInput = {
  readonly name: Scalars['String'];
  readonly content: Scalars['String'];
  readonly post: ConnectRelation;
};

/** Input of create post */
export type CreatePostInput = {
  readonly content: Scalars['String'];
  readonly subject: ConnectRelation;
};

/** Input of create subject information */
export type CreateSubjectInformationInput = {
  readonly title: Scalars['String'];
  readonly subtitle: Maybe<Scalars['String']>;
  readonly content: Scalars['String'];
  readonly subject: ConnectRelation;
};

/** Input of create subject */
export type CreateSubjectInput = {
  readonly code: Scalars['String'];
  readonly name: Scalars['String'];
  readonly description: Scalars['String'];
  readonly department: ConnectRelation;
  readonly language: ConnectRelation;
};

/** Input of create suggestion */
export type CreateSuggestionInput = {
  readonly delta: Scalars['String'];
  readonly note: ConnectRelation;
};

/** Input of create user */
export type CreateUserInput = {
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly identifier: Scalars['String'];
  readonly email: Scalars['String'];
  readonly role: Scalars['String'];
};

export type DateTimeFilter = {
  readonly equals: Maybe<Scalars['DateTime']>;
  readonly not: Maybe<Scalars['DateTime']>;
  readonly in: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly notIn: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly lt: Maybe<Scalars['DateTime']>;
  readonly lte: Maybe<Scalars['DateTime']>;
  readonly gt: Maybe<Scalars['DateTime']>;
  readonly gte: Maybe<Scalars['DateTime']>;
};

export type Department = {
  readonly __typename?: 'Department';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly description: Scalars['String'];
  readonly leader: User;
  readonly subjects: ReadonlyArray<Subject>;
  readonly institute: Institute;
  readonly permissions: ReadonlyArray<DepartmentPermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type DepartmentSubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type DepartmentFilter = {
  readonly every: Maybe<DepartmentWhereInput>;
  readonly some: Maybe<DepartmentWhereInput>;
  readonly none: Maybe<DepartmentWhereInput>;
};

export type DepartmentPermission = {
  readonly __typename?: 'DepartmentPermission';
  readonly id: Scalars['ID'];
  readonly type: DepartmentPermissionType;
  readonly object: Department;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type DepartmentPermissionFilter = {
  readonly every: Maybe<DepartmentPermissionWhereInput>;
  readonly some: Maybe<DepartmentPermissionWhereInput>;
  readonly none: Maybe<DepartmentPermissionWhereInput>;
};

export enum DepartmentPermissionType {
  UpdateDepartment = 'UPDATE_DEPARTMENT',
  ReadDepartment = 'READ_DEPARTMENT',
  DeleteDepartment = 'DELETE_DEPARTMENT',
  CreateSubject = 'CREATE_SUBJECT',
}

export type DepartmentPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<DepartmentPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<DepartmentPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<DepartmentPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<DepartmentPermissionWhereInput>>;
  readonly object: Maybe<DepartmentWhereInput>;
};

export type DepartmentWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly name: Maybe<StringFilter>;
  readonly description: Maybe<StringFilter>;
  readonly subjects: Maybe<SubjectFilter>;
  readonly permissions: Maybe<DepartmentPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<DepartmentWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<DepartmentWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<DepartmentWhereInput>>;
  readonly leader: Maybe<UserWhereInput>;
  readonly institute: Maybe<InstituteWhereInput>;
};

export type DepartmentWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

/** Input of forgot password */
export type ForgotPasswordInput = {
  readonly email: Maybe<Scalars['String']>;
};

/** Input of image upload */
export type ImageUploadInput = {
  readonly file: Scalars['String'];
  readonly extension: Scalars['String'];
};

export type Institute = {
  readonly __typename?: 'Institute';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly departments: ReadonlyArray<Department>;
  readonly users: ReadonlyArray<User>;
  readonly permissions: ReadonlyArray<InstitutePermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type InstituteDepartmentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type InstituteUsersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type InstituteFilter = {
  readonly every: Maybe<InstituteWhereInput>;
  readonly some: Maybe<InstituteWhereInput>;
  readonly none: Maybe<InstituteWhereInput>;
};

export type InstitutePermission = {
  readonly __typename?: 'InstitutePermission';
  readonly id: Scalars['ID'];
  readonly type: InstitutePermissionType;
  readonly object: Institute;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type InstitutePermissionFilter = {
  readonly every: Maybe<InstitutePermissionWhereInput>;
  readonly some: Maybe<InstitutePermissionWhereInput>;
  readonly none: Maybe<InstitutePermissionWhereInput>;
};

export enum InstitutePermissionType {
  UpdateInstitute = 'UPDATE_INSTITUTE',
  DeleteInstitute = 'DELETE_INSTITUTE',
  CreateDepartment = 'CREATE_DEPARTMENT',
}

export type InstitutePermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<InstitutePermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<InstitutePermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<InstitutePermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<InstitutePermissionWhereInput>>;
  readonly object: Maybe<InstituteWhereInput>;
};

export type InstituteWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly name: Maybe<StringFilter>;
  readonly departments: Maybe<DepartmentFilter>;
  readonly users: Maybe<UserFilter>;
  readonly permissions: Maybe<InstitutePermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<InstituteWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<InstituteWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<InstituteWhereInput>>;
};

export type InstituteWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type IntFilter = {
  readonly equals: Maybe<Scalars['Int']>;
  readonly not: Maybe<Scalars['Int']>;
  readonly in: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly notIn: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly lt: Maybe<Scalars['Int']>;
  readonly lte: Maybe<Scalars['Int']>;
  readonly gt: Maybe<Scalars['Int']>;
  readonly gte: Maybe<Scalars['Int']>;
};

export type Language = {
  readonly __typename?: 'Language';
  readonly id: Scalars['ID'];
  readonly code: Scalars['String'];
  readonly name: Scalars['String'];
};

export type LanguageWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly code: Maybe<StringFilter>;
  readonly name: Maybe<StringFilter>;
  readonly users: Maybe<UserFilter>;
  readonly subjects: Maybe<SubjectFilter>;
  readonly AND: Maybe<ReadonlyArray<LanguageWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<LanguageWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<LanguageWhereInput>>;
};

export type LanguageWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
  readonly code: Maybe<Scalars['String']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly uploadImage: Scalars['String'];
  readonly createDepartment: Department;
  readonly createSubject: Subject;
  readonly createUser: User;
  readonly updateUser: User;
  readonly sendActivationEmails: ReadonlyArray<User>;
  readonly login: AuthenticationPayload;
  readonly forgotPassword: Scalars['String'];
  readonly activateUser: AuthenticationPayload;
  readonly resetPassword: AuthenticationPayload;
  readonly updateDepartment: Department;
  readonly deleteDepartment: Department;
  readonly createInstitute: Institute;
  readonly updateInstitute: Institute;
  readonly deleteInstitute: Institute;
  readonly createNote: Note;
  readonly updateNote: Note;
  readonly deleteNote: Note;
  readonly createNoteComment: NoteComment;
  readonly updateNoteComment: NoteComment;
  readonly deleteNoteComment: NoteComment;
  readonly createNoteCommentThread: NoteCommentThread;
  readonly deleteNoteCommentThread: NoteCommentThread;
  readonly createNoteHighlight: NoteHighlight;
  readonly updateNoteHighlight: NoteHighlight;
  readonly deleteNoteHighlight: NoteHighlight;
  readonly createPost: Post;
  readonly updatePost: Post;
  readonly deletePost: Post;
  readonly likePost: Post;
  readonly dislikePost: Post;
  readonly createPostComment: PostComment;
  readonly updatePostComment: PostComment;
  readonly deletePostComment: PostComment;
  readonly updateSubject: Subject;
  readonly deleteSubject: Subject;
  readonly createSubjectInformation: SubjectInformation;
  readonly updateSubjectInformation: SubjectInformation;
  readonly deleteSubjectInformation: SubjectInformation;
  readonly createSuggestion: Suggestion;
  readonly updateSuggestion: Suggestion;
  readonly approveSuggestion: Suggestion;
  readonly rejectSuggestion: Suggestion;
  readonly deleteSuggestion: Suggestion;
  readonly updateProfile: User;
  readonly deleteUser: User;
};

export type MutationUploadImageArgs = {
  data: ImageUploadInput;
};

export type MutationCreateDepartmentArgs = {
  data: CreateDepartmentInput;
};

export type MutationCreateSubjectArgs = {
  data: CreateSubjectInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  where: WhereUniqueInput;
  data: UpdateUserInput;
};

export type MutationSendActivationEmailsArgs = {
  data: SendActivationEmailsInput;
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

export type MutationCreatePostArgs = {
  data: CreatePostInput;
};

export type MutationUpdatePostArgs = {
  where: WhereUniqueInput;
  data: UpdatePostInput;
};

export type MutationDeletePostArgs = {
  where: WhereUniqueInput;
};

export type MutationLikePostArgs = {
  where: WhereUniqueInput;
};

export type MutationDislikePostArgs = {
  where: WhereUniqueInput;
};

export type MutationCreatePostCommentArgs = {
  data: CreatePostCommentInput;
};

export type MutationUpdatePostCommentArgs = {
  where: WhereUniqueInput;
  data: UpdatePostCommentInput;
};

export type MutationDeletePostCommentArgs = {
  where: WhereUniqueInput;
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

export type MutationApproveSuggestionArgs = {
  where: WhereUniqueInput;
};

export type MutationRejectSuggestionArgs = {
  where: WhereUniqueInput;
};

export type MutationDeleteSuggestionArgs = {
  where: WhereUniqueInput;
};

export type MutationUpdateProfileArgs = {
  where: WhereUniqueInput;
  data: UpdateProfileInput;
};

export type MutationDeleteUserArgs = {
  where: WhereUniqueInput;
};

export type Note = {
  readonly __typename?: 'Note';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly contentHTML: Scalars['String'];
  readonly title: Scalars['String'];
  readonly number: Scalars['Int'];
  readonly description: Maybe<Scalars['String']>;
  readonly noteCategory: NoteCategory;
  readonly commentThreads: ReadonlyArray<NoteCommentThread>;
  readonly authors: ReadonlyArray<User>;
  readonly likers: ReadonlyArray<User>;
  readonly highlights: ReadonlyArray<NoteHighlight>;
  readonly subject: Subject;
  /** Number of likes on the note */
  readonly likesCount: Scalars['Int'];
  readonly permissions: ReadonlyArray<NotePermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteAuthorsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteHighlightsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum NoteCategory {
  Note = 'NOTE',
  CaseStudy = 'CASE_STUDY',
}

export type NoteComment = {
  readonly __typename?: 'NoteComment';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly author: User;
  readonly likers: ReadonlyArray<User>;
  readonly thread: Maybe<NoteCommentThread>;
  readonly threadReply: Maybe<NoteCommentThread>;
  /** Number of likes on the note comment */
  readonly likesCount: Scalars['Int'];
  readonly permissions: ReadonlyArray<NoteCommentPermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteCommentFilter = {
  readonly every: Maybe<NoteCommentWhereInput>;
  readonly some: Maybe<NoteCommentWhereInput>;
  readonly none: Maybe<NoteCommentWhereInput>;
};

export type NoteCommentPermission = {
  readonly __typename?: 'NoteCommentPermission';
  readonly id: Scalars['ID'];
  readonly type: NoteCommentPermissionType;
  readonly object: NoteComment;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentPermissionFilter = {
  readonly every: Maybe<NoteCommentPermissionWhereInput>;
  readonly some: Maybe<NoteCommentPermissionWhereInput>;
  readonly none: Maybe<NoteCommentPermissionWhereInput>;
};

export enum NoteCommentPermissionType {
  UpdateNoteComment = 'UPDATE_NOTE_COMMENT',
  DeleteNoteComment = 'DELETE_NOTE_COMMENT',
}

export type NoteCommentPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<NoteCommentPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteCommentPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteCommentPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteCommentPermissionWhereInput>>;
  readonly object: Maybe<NoteCommentWhereInput>;
};

export type NoteCommentThread = {
  readonly __typename?: 'NoteCommentThread';
  readonly id: Scalars['ID'];
  readonly position: Scalars['String'];
  readonly comment: NoteComment;
  readonly replies: ReadonlyArray<NoteComment>;
  readonly note: Note;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadRepliesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteCommentThreadFilter = {
  readonly every: Maybe<NoteCommentThreadWhereInput>;
  readonly some: Maybe<NoteCommentThreadWhereInput>;
  readonly none: Maybe<NoteCommentThreadWhereInput>;
};

export type NoteCommentThreadPermission = {
  readonly __typename?: 'NoteCommentThreadPermission';
  readonly id: Scalars['ID'];
  readonly type: NoteCommentThreadPermissionType;
  readonly object: NoteCommentThread;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadPermissionFilter = {
  readonly every: Maybe<NoteCommentThreadPermissionWhereInput>;
  readonly some: Maybe<NoteCommentThreadPermissionWhereInput>;
  readonly none: Maybe<NoteCommentThreadPermissionWhereInput>;
};

export enum NoteCommentThreadPermissionType {
  DeleteNoteCommentThread = 'DELETE_NOTE_COMMENT_THREAD',
}

export type NoteCommentThreadPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<NoteCommentThreadPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteCommentThreadPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteCommentThreadPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteCommentThreadPermissionWhereInput>>;
  readonly object: Maybe<NoteCommentThreadWhereInput>;
};

export type NoteCommentThreadWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly position: Maybe<StringFilter>;
  readonly replies: Maybe<NoteCommentFilter>;
  readonly permissions: Maybe<NoteCommentThreadPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteCommentThreadWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteCommentThreadWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteCommentThreadWhereInput>>;
  readonly comment: Maybe<NoteCommentWhereInput>;
  readonly note: Maybe<NoteWhereInput>;
};

export type NoteCommentThreadWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type NoteCommentWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly content: Maybe<StringFilter>;
  readonly likers: Maybe<UserFilter>;
  readonly permissions: Maybe<NoteCommentPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteCommentWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteCommentWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteCommentWhereInput>>;
  readonly author: Maybe<UserWhereInput>;
  readonly thread: Maybe<NoteCommentThreadWhereInput>;
  readonly threadReply: Maybe<NoteCommentThreadWhereInput>;
};

export type NoteCommentWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type NoteFilter = {
  readonly every: Maybe<NoteWhereInput>;
  readonly some: Maybe<NoteWhereInput>;
  readonly none: Maybe<NoteWhereInput>;
};

export type NoteHighlight = {
  readonly __typename?: 'NoteHighlight';
  readonly id: Scalars['ID'];
  readonly position: Scalars['String'];
  readonly user: User;
  readonly note: Note;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteHighlightFilter = {
  readonly every: Maybe<NoteHighlightWhereInput>;
  readonly some: Maybe<NoteHighlightWhereInput>;
  readonly none: Maybe<NoteHighlightWhereInput>;
};

export type NoteHighlightPermission = {
  readonly __typename?: 'NoteHighlightPermission';
  readonly id: Scalars['ID'];
  readonly type: NoteHighlightPermissionType;
  readonly object: NoteHighlight;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteHighlightPermissionFilter = {
  readonly every: Maybe<NoteHighlightPermissionWhereInput>;
  readonly some: Maybe<NoteHighlightPermissionWhereInput>;
  readonly none: Maybe<NoteHighlightPermissionWhereInput>;
};

export enum NoteHighlightPermissionType {
  UpdateNoteHighlight = 'UPDATE_NOTE_HIGHLIGHT',
  DeleteNoteHighlight = 'DELETE_NOTE_HIGHLIGHT',
}

export type NoteHighlightPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<NoteHighlightPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteHighlightPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteHighlightPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteHighlightPermissionWhereInput>>;
  readonly object: Maybe<NoteHighlightWhereInput>;
};

export type NoteHighlightWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly position: Maybe<StringFilter>;
  readonly permissions: Maybe<NoteHighlightPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteHighlightWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteHighlightWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteHighlightWhereInput>>;
  readonly user: Maybe<UserWhereInput>;
  readonly note: Maybe<NoteWhereInput>;
};

export type NoteHighlightWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type NotePermission = {
  readonly __typename?: 'NotePermission';
  readonly id: Scalars['ID'];
  readonly type: NotePermissionType;
  readonly object: Note;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NotePermissionFilter = {
  readonly every: Maybe<NotePermissionWhereInput>;
  readonly some: Maybe<NotePermissionWhereInput>;
  readonly none: Maybe<NotePermissionWhereInput>;
};

export enum NotePermissionType {
  ReadNote = 'READ_NOTE',
  UpdateNote = 'UPDATE_NOTE',
  DeleteNote = 'DELETE_NOTE',
  CreateSuggestion = 'CREATE_SUGGESTION',
}

export type NotePermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<NotePermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NotePermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NotePermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NotePermissionWhereInput>>;
  readonly object: Maybe<NoteWhereInput>;
};

export type NoteWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly content: Maybe<StringFilter>;
  readonly contentHTML: Maybe<StringFilter>;
  readonly title: Maybe<StringFilter>;
  readonly number: Maybe<IntFilter>;
  readonly description: Maybe<NullableStringFilter>;
  readonly noteCategory: Maybe<NoteCategory>;
  readonly suggestions: Maybe<SuggestionFilter>;
  readonly commentThreads: Maybe<NoteCommentThreadFilter>;
  readonly authors: Maybe<UserFilter>;
  readonly likers: Maybe<UserFilter>;
  readonly highlights: Maybe<NoteHighlightFilter>;
  readonly permissions: Maybe<NotePermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<NoteWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<NoteWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<NoteWhereInput>>;
  readonly subject: Maybe<SubjectWhereInput>;
};

export type NoteWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type NullableDateTimeFilter = {
  readonly equals: Maybe<Scalars['DateTime']>;
  readonly not: Maybe<Scalars['DateTime']>;
  readonly in: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly notIn: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly lt: Maybe<Scalars['DateTime']>;
  readonly lte: Maybe<Scalars['DateTime']>;
  readonly gt: Maybe<Scalars['DateTime']>;
  readonly gte: Maybe<Scalars['DateTime']>;
};

export type NullableStringFilter = {
  readonly equals: Maybe<Scalars['String']>;
  readonly not: Maybe<Scalars['String']>;
  readonly in: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly notIn: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly lt: Maybe<Scalars['String']>;
  readonly lte: Maybe<Scalars['String']>;
  readonly gt: Maybe<Scalars['String']>;
  readonly gte: Maybe<Scalars['String']>;
  readonly contains: Maybe<Scalars['String']>;
  readonly startsWith: Maybe<Scalars['String']>;
  readonly endsWith: Maybe<Scalars['String']>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc',
}

export type PasswordToken = {
  readonly __typename?: 'PasswordToken';
  readonly id: Scalars['ID'];
  readonly token: Scalars['String'];
  readonly user: User;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PasswordTokenWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly token: Maybe<StringFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<PasswordTokenWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<PasswordTokenWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<PasswordTokenWhereInput>>;
  readonly user: Maybe<UserWhereInput>;
};

export type Post = {
  readonly __typename?: 'Post';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly author: User;
  readonly likers: ReadonlyArray<User>;
  readonly subject: Subject;
  readonly comments: ReadonlyArray<PostComment>;
  /** Number of likes on the post */
  readonly likesCount: Scalars['Int'];
  readonly permissions: ReadonlyArray<PostPermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostCommentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostComment = {
  readonly __typename?: 'PostComment';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly author: User;
  readonly post: Post;
  readonly likers: ReadonlyArray<User>;
  /** Number of likes on the postComment */
  readonly likesCount: Scalars['Int'];
  readonly permissions: ReadonlyArray<PostCommentPermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostCommentLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostCommentFilter = {
  readonly every: Maybe<PostCommentWhereInput>;
  readonly some: Maybe<PostCommentWhereInput>;
  readonly none: Maybe<PostCommentWhereInput>;
};

export type PostCommentPermission = {
  readonly __typename?: 'PostCommentPermission';
  readonly id: Scalars['ID'];
  readonly type: PostCommentPermissionType;
  readonly object: PostComment;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostCommentPermissionFilter = {
  readonly every: Maybe<PostCommentPermissionWhereInput>;
  readonly some: Maybe<PostCommentPermissionWhereInput>;
  readonly none: Maybe<PostCommentPermissionWhereInput>;
};

export enum PostCommentPermissionType {
  UpdatePostcomment = 'UPDATE_POSTCOMMENT',
  DeletePostcomment = 'DELETE_POSTCOMMENT',
  ReadPostcomment = 'READ_POSTCOMMENT',
}

export type PostCommentPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<PostCommentPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<PostCommentPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<PostCommentPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<PostCommentPermissionWhereInput>>;
  readonly object: Maybe<PostCommentWhereInput>;
};

export type PostCommentWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly content: Maybe<StringFilter>;
  readonly likers: Maybe<UserFilter>;
  readonly permissions: Maybe<PostCommentPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<PostCommentWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<PostCommentWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<PostCommentWhereInput>>;
  readonly author: Maybe<UserWhereInput>;
  readonly post: Maybe<PostWhereInput>;
};

export type PostCommentWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type PostFilter = {
  readonly every: Maybe<PostWhereInput>;
  readonly some: Maybe<PostWhereInput>;
  readonly none: Maybe<PostWhereInput>;
};

export type PostPermission = {
  readonly __typename?: 'PostPermission';
  readonly id: Scalars['ID'];
  readonly type: PostPermissionType;
  readonly object: Post;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostPermissionFilter = {
  readonly every: Maybe<PostPermissionWhereInput>;
  readonly some: Maybe<PostPermissionWhereInput>;
  readonly none: Maybe<PostPermissionWhereInput>;
};

export enum PostPermissionType {
  CreatePostcomment = 'CREATE_POSTCOMMENT',
  UpdatePost = 'UPDATE_POST',
  DeletePost = 'DELETE_POST',
  ReadPost = 'READ_POST',
}

export type PostPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<PostPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<PostPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<PostPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<PostPermissionWhereInput>>;
  readonly object: Maybe<PostWhereInput>;
};

export type PostWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly content: Maybe<StringFilter>;
  readonly likers: Maybe<UserFilter>;
  readonly comments: Maybe<PostCommentFilter>;
  readonly permissions: Maybe<PostPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<PostWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<PostWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<PostWhereInput>>;
  readonly author: Maybe<UserWhereInput>;
  readonly subject: Maybe<SubjectWhereInput>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly departments: ReadonlyArray<Department>;
  readonly subjects: ReadonlyArray<Subject>;
  readonly institutes: ReadonlyArray<Institute>;
  readonly department: Maybe<Department>;
  readonly institute: Maybe<Institute>;
  readonly language: Maybe<Language>;
  readonly languages: ReadonlyArray<Language>;
  readonly note: Maybe<Note>;
  readonly noteComment: Maybe<NoteComment>;
  readonly noteCommentThread: Maybe<NoteCommentThread>;
  readonly noteHighlight: Maybe<NoteHighlight>;
  readonly posts: ReadonlyArray<Post>;
  readonly postComment: Maybe<PostComment>;
  readonly subject: Maybe<Subject>;
  readonly subjectInformation: Maybe<SubjectInformation>;
  readonly suggestion: Maybe<Suggestion>;
  readonly activeSuggestions: ReadonlyArray<Suggestion>;
  readonly user: Maybe<User>;
  readonly users: ReadonlyArray<User>;
  readonly me: User;
  readonly userInfo: Maybe<User>;
};

export type QueryDepartmentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QuerySubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueryInstitutesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueryDepartmentArgs = {
  where: DepartmentWhereUniqueInput;
};

export type QueryInstituteArgs = {
  where: InstituteWhereUniqueInput;
};

export type QueryLanguageArgs = {
  where: LanguageWhereUniqueInput;
};

export type QueryLanguagesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueryNoteArgs = {
  where: NoteWhereUniqueInput;
};

export type QueryNoteCommentArgs = {
  where: NoteCommentWhereUniqueInput;
};

export type QueryNoteCommentThreadArgs = {
  where: NoteCommentThreadWhereUniqueInput;
};

export type QueryNoteHighlightArgs = {
  where: NoteHighlightWhereUniqueInput;
};

export type QueryPostCommentArgs = {
  where: PostCommentWhereUniqueInput;
};

export type QuerySubjectArgs = {
  where: SubjectWhereUniqueInput;
};

export type QuerySubjectInformationArgs = {
  where: SubjectInformationWhereUniqueInput;
};

export type QuerySuggestionArgs = {
  where: SuggestionWhereUniqueInput;
};

export type QueryActiveSuggestionsArgs = {
  where: SuggestionsInput;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  where: Maybe<QueryUsersWhereInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueryUserInfoArgs = {
  token: Maybe<Scalars['String']>;
};

export type QueryUsersWhereInput = {
  readonly email: Maybe<StringFilter>;
  readonly firstName: Maybe<StringFilter>;
  readonly lastName: Maybe<StringFilter>;
  readonly phoneNumber: Maybe<NullableStringFilter>;
  readonly identifier: Maybe<StringFilter>;
  readonly isActive: Maybe<BooleanFilter>;
  readonly role: Maybe<UserRoleWhereInput>;
};

/** Input of reset password */
export type ResetPasswordInput = {
  readonly token: Scalars['String'];
  readonly password: Scalars['String'];
};

export type ResetPasswordToken = {
  readonly __typename?: 'ResetPasswordToken';
  readonly token: Scalars['String'];
  readonly email: Scalars['ID'];
  readonly createdAt: Scalars['DateTime'];
};

export type ResetPasswordTokenWhereInput = {
  readonly email: Maybe<StringFilter>;
  readonly token: Maybe<StringFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly users: Maybe<UserFilter>;
  readonly AND: Maybe<ReadonlyArray<ResetPasswordTokenWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<ResetPasswordTokenWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<ResetPasswordTokenWhereInput>>;
};

/** Input of activation emails */
export type SendActivationEmailsInput = {
  readonly ids: ReadonlyArray<Scalars['String']>;
};

export type StringFilter = {
  readonly equals: Maybe<Scalars['String']>;
  readonly not: Maybe<Scalars['String']>;
  readonly in: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly notIn: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly lt: Maybe<Scalars['String']>;
  readonly lte: Maybe<Scalars['String']>;
  readonly gt: Maybe<Scalars['String']>;
  readonly gte: Maybe<Scalars['String']>;
  readonly contains: Maybe<Scalars['String']>;
  readonly startsWith: Maybe<Scalars['String']>;
  readonly endsWith: Maybe<Scalars['String']>;
};

export type Subject = {
  readonly __typename?: 'Subject';
  readonly id: Scalars['ID'];
  readonly code: Scalars['String'];
  readonly name: Scalars['String'];
  readonly description: Scalars['String'];
  readonly department: Department;
  readonly teachers: ReadonlyArray<User>;
  readonly students: ReadonlyArray<User>;
  readonly informations: ReadonlyArray<SubjectInformation>;
  readonly notes: ReadonlyArray<Note>;
  readonly posts: ReadonlyArray<Post>;
  readonly language: Language;
  readonly permissions: ReadonlyArray<SubjectPermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectTeachersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectStudentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectInformationsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectNotesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectPostsArgs = {
  orderBy: Maybe<SubjectPostsOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectFilter = {
  readonly every: Maybe<SubjectWhereInput>;
  readonly some: Maybe<SubjectWhereInput>;
  readonly none: Maybe<SubjectWhereInput>;
};

export type SubjectInformation = {
  readonly __typename?: 'SubjectInformation';
  readonly id: Scalars['ID'];
  readonly title: Scalars['String'];
  readonly subtitle: Maybe<Scalars['String']>;
  readonly content: Scalars['String'];
  readonly subject: Subject;
  readonly permissions: ReadonlyArray<SubjectInformationPermissionType>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectInformationFilter = {
  readonly every: Maybe<SubjectInformationWhereInput>;
  readonly some: Maybe<SubjectInformationWhereInput>;
  readonly none: Maybe<SubjectInformationWhereInput>;
};

export type SubjectInformationPermission = {
  readonly __typename?: 'SubjectInformationPermission';
  readonly id: Scalars['ID'];
  readonly type: SubjectInformationPermissionType;
  readonly object: SubjectInformation;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectInformationPermissionFilter = {
  readonly every: Maybe<SubjectInformationPermissionWhereInput>;
  readonly some: Maybe<SubjectInformationPermissionWhereInput>;
  readonly none: Maybe<SubjectInformationPermissionWhereInput>;
};

export enum SubjectInformationPermissionType {
  ReadSubjectInformation = 'READ_SUBJECT_INFORMATION',
  UpdateSubjectInformation = 'UPDATE_SUBJECT_INFORMATION',
  DeleteSubjectInformation = 'DELETE_SUBJECT_INFORMATION',
}

export type SubjectInformationPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<SubjectInformationPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<SubjectInformationPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<SubjectInformationPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<SubjectInformationPermissionWhereInput>>;
  readonly object: Maybe<SubjectInformationWhereInput>;
};

export type SubjectInformationWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly title: Maybe<StringFilter>;
  readonly subtitle: Maybe<NullableStringFilter>;
  readonly content: Maybe<StringFilter>;
  readonly permissions: Maybe<SubjectInformationPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<SubjectInformationWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<SubjectInformationWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<SubjectInformationWhereInput>>;
  readonly subject: Maybe<SubjectWhereInput>;
};

export type SubjectInformationWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type SubjectPermission = {
  readonly __typename?: 'SubjectPermission';
  readonly id: Scalars['ID'];
  readonly type: SubjectPermissionType;
  readonly object: Subject;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectPermissionFilter = {
  readonly every: Maybe<SubjectPermissionWhereInput>;
  readonly some: Maybe<SubjectPermissionWhereInput>;
  readonly none: Maybe<SubjectPermissionWhereInput>;
};

export enum SubjectPermissionType {
  CreatePost = 'CREATE_POST',
  CreateSubjectInformation = 'CREATE_SUBJECT_INFORMATION',
  UpdateSubject = 'UPDATE_SUBJECT',
  DeleteSubject = 'DELETE_SUBJECT',
  ReadSubject = 'READ_SUBJECT',
  CreateNote = 'CREATE_NOTE',
}

export type SubjectPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<SubjectPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<SubjectPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<SubjectPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<SubjectPermissionWhereInput>>;
  readonly object: Maybe<SubjectWhereInput>;
};

export type SubjectPostsOrderByInput = {
  readonly createdAt: Maybe<OrderByArg>;
};

export type SubjectWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly code: Maybe<StringFilter>;
  readonly name: Maybe<StringFilter>;
  readonly description: Maybe<StringFilter>;
  readonly teachers: Maybe<UserFilter>;
  readonly students: Maybe<UserFilter>;
  readonly informations: Maybe<SubjectInformationFilter>;
  readonly notes: Maybe<NoteFilter>;
  readonly posts: Maybe<PostFilter>;
  readonly permissions: Maybe<SubjectPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<SubjectWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<SubjectWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<SubjectWhereInput>>;
  readonly department: Maybe<DepartmentWhereInput>;
  readonly language: Maybe<LanguageWhereInput>;
};

export type SubjectWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
  readonly code: Maybe<Scalars['String']>;
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly createdSuggestion: Suggestion;
  readonly updatedSuggestion: Suggestion;
  readonly approvedSuggestion: Suggestion;
  readonly rejectedSuggestion: Suggestion;
};

export type SubscriptionCreatedSuggestionArgs = {
  where: WhereUniqueInput;
};

export type SubscriptionUpdatedSuggestionArgs = {
  where: WhereUniqueInput;
};

export type SubscriptionApprovedSuggestionArgs = {
  where: WhereUniqueInput;
};

export type SubscriptionRejectedSuggestionArgs = {
  where: WhereUniqueInput;
};

export type Suggestion = {
  readonly __typename?: 'Suggestion';
  readonly id: Scalars['ID'];
  readonly createdAt: Scalars['DateTime'];
  readonly approvedAt: Maybe<Scalars['DateTime']>;
  readonly rejectedAt: Maybe<Scalars['DateTime']>;
  readonly delta: Scalars['String'];
  readonly likers: ReadonlyArray<User>;
  readonly note: Note;
  readonly author: User;
  readonly approvedBy: Maybe<User>;
  readonly permissions: ReadonlyArray<SuggestionPermissionType>;
  /** Number of likes on the suggestion */
  readonly likesCount: Scalars['Int'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SuggestionLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SuggestionFilter = {
  readonly every: Maybe<SuggestionWhereInput>;
  readonly some: Maybe<SuggestionWhereInput>;
  readonly none: Maybe<SuggestionWhereInput>;
};

export type SuggestionPermission = {
  readonly __typename?: 'SuggestionPermission';
  readonly id: Scalars['ID'];
  readonly type: SuggestionPermissionType;
  readonly object: Suggestion;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SuggestionPermissionFilter = {
  readonly every: Maybe<SuggestionPermissionWhereInput>;
  readonly some: Maybe<SuggestionPermissionWhereInput>;
  readonly none: Maybe<SuggestionPermissionWhereInput>;
};

export enum SuggestionPermissionType {
  UpdateSuggestion = 'UPDATE_SUGGESTION',
  ReadSuggestion = 'READ_SUGGESTION',
  DeleteSuggestion = 'DELETE_SUGGESTION',
  ApproveSuggestion = 'APPROVE_SUGGESTION',
  RejectSuggestion = 'REJECT_SUGGESTION',
}

export type SuggestionPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<SuggestionPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<SuggestionPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<SuggestionPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<SuggestionPermissionWhereInput>>;
  readonly object: Maybe<SuggestionWhereInput>;
};

export type SuggestionsInput = {
  readonly noteID: Maybe<Scalars['ID']>;
};

export type SuggestionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly delta: Maybe<StringFilter>;
  readonly approvedAt: Maybe<NullableDateTimeFilter>;
  readonly rejectedAt: Maybe<NullableDateTimeFilter>;
  readonly likers: Maybe<UserFilter>;
  readonly permissions: Maybe<SuggestionPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<SuggestionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<SuggestionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<SuggestionWhereInput>>;
  readonly approvedBy: Maybe<UserWhereInput>;
  readonly note: Maybe<NoteWhereInput>;
  readonly author: Maybe<UserWhereInput>;
};

export type SuggestionWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

/** Input of update department */
export type UpdateDepartmentInput = {
  readonly name: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
  readonly leader: Maybe<ConnectRelation>;
};

/** Input of update institute */
export type UpdateInstituteInput = {
  readonly name: Maybe<Scalars['String']>;
};

/** Input of update note comment */
export type UpdateNoteCommentInput = {
  readonly content: Maybe<Scalars['String']>;
};

/** Input of update note highlight */
export type UpdateNoteHighlightInput = {
  readonly position: Maybe<Scalars['String']>;
};

/** Input of update note */
export type UpdateNoteInput = {
  readonly title: Maybe<Scalars['String']>;
  readonly content: Maybe<Scalars['String']>;
  readonly contentHTML: Maybe<Scalars['String']>;
  readonly number: Maybe<Scalars['Int']>;
  readonly description: Maybe<Scalars['String']>;
  readonly noteCategory: Maybe<NoteCategory>;
};

/** Input of update post comment */
export type UpdatePostCommentInput = {
  readonly content: Maybe<Scalars['String']>;
};

/** Input of update post */
export type UpdatePostInput = {
  readonly content: Maybe<Scalars['String']>;
};

/** Input of update user's profile */
export type UpdateProfileInput = {
  readonly email: Maybe<Scalars['String']>;
  readonly oldPassword: Maybe<Scalars['String']>;
  readonly newPassword: Maybe<Scalars['String']>;
};

/** Input of update subject information */
export type UpdateSubjectInformationInput = {
  readonly title: Maybe<Scalars['String']>;
  readonly subtitle: Maybe<Scalars['String']>;
  readonly content: Maybe<Scalars['String']>;
};

/** Input of update subject */
export type UpdateSubjectInput = {
  readonly code: Maybe<Scalars['String']>;
  readonly name: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
};

/** Input of update suggestion */
export type UpdateSuggestionInput = {
  readonly delta: Maybe<Scalars['String']>;
};

/** Input of update user */
export type UpdateUserInput = {
  readonly firstName: Maybe<Scalars['String']>;
  readonly lastName: Maybe<Scalars['String']>;
  readonly identifier: Maybe<Scalars['String']>;
  readonly email: Maybe<Scalars['String']>;
  readonly position: Maybe<Scalars['String']>;
  readonly studiedSubjects: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type User = {
  readonly __typename?: 'User';
  readonly id: Scalars['ID'];
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
  readonly profilePictureURL: Maybe<Scalars['String']>;
  readonly phoneNumber: Maybe<Scalars['String']>;
  readonly identifier: Scalars['String'];
  readonly position: Maybe<Scalars['String']>;
  readonly fullName: Scalars['String'];
  readonly permissions: ReadonlyArray<UserPermissionType>;
  readonly role: UserRole;
  readonly notes: ReadonlyArray<Note>;
  readonly noteHighlights: ReadonlyArray<NoteHighlight>;
  readonly suggestions: ReadonlyArray<Suggestion>;
  readonly approvedSuggestions: ReadonlyArray<Suggestion>;
  readonly teachedSubjects: ReadonlyArray<Subject>;
  readonly studiedSubjects: ReadonlyArray<Subject>;
  readonly likedNotes: ReadonlyArray<Note>;
  readonly noteComments: ReadonlyArray<NoteComment>;
  readonly likedPostComments: ReadonlyArray<PostComment>;
  readonly departments: ReadonlyArray<Department>;
  readonly institutes: ReadonlyArray<Institute>;
  readonly preferredLanguage: Maybe<Language>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type UserNotesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserNoteHighlightsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserSuggestionsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserApprovedSuggestionsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserTeachedSubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserStudiedSubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserLikedNotesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserNoteCommentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserLikedPostCommentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserDepartmentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserInstitutesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserFilter = {
  readonly every: Maybe<UserWhereInput>;
  readonly some: Maybe<UserWhereInput>;
  readonly none: Maybe<UserWhereInput>;
};

/** Input of login */
export type UserLoginInput = {
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
};

export type UserPermission = {
  readonly __typename?: 'UserPermission';
  readonly id: Scalars['ID'];
  readonly type: UserPermissionType;
  readonly object: User;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type UserPermissionFilter = {
  readonly every: Maybe<UserPermissionWhereInput>;
  readonly some: Maybe<UserPermissionWhereInput>;
  readonly none: Maybe<UserPermissionWhereInput>;
};

export enum UserPermissionType {
  UpdateUser = 'UPDATE_USER',
  DeleteUser = 'DELETE_USER',
}

export type UserPermissionWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly type: Maybe<UserPermissionType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<UserPermissionWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<UserPermissionWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<UserPermissionWhereInput>>;
  readonly object: Maybe<UserWhereInput>;
};

export type UserRole = {
  readonly __typename?: 'UserRole';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly type: UserRoleType;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export enum UserRoleType {
  User = 'USER',
  Admin = 'ADMIN',
  Professor = 'PROFESSOR',
}

export type UserRoleWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly name: Maybe<StringFilter>;
  readonly type: Maybe<UserRoleType>;
  readonly users: Maybe<UserFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<UserRoleWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<UserRoleWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<UserRoleWhereInput>>;
};

export type UserWhereInput = {
  readonly id: Maybe<StringFilter>;
  readonly email: Maybe<StringFilter>;
  readonly password: Maybe<StringFilter>;
  readonly profilePictureURL: Maybe<NullableStringFilter>;
  readonly firstName: Maybe<StringFilter>;
  readonly lastName: Maybe<StringFilter>;
  readonly phoneNumber: Maybe<NullableStringFilter>;
  readonly identifier: Maybe<StringFilter>;
  readonly position: Maybe<NullableStringFilter>;
  readonly isActive: Maybe<BooleanFilter>;
  readonly notes: Maybe<NoteFilter>;
  readonly noteHighlights: Maybe<NoteHighlightFilter>;
  readonly suggestions: Maybe<SuggestionFilter>;
  readonly approvedSuggestions: Maybe<SuggestionFilter>;
  readonly teachedSubjects: Maybe<SubjectFilter>;
  readonly studiedSubjects: Maybe<SubjectFilter>;
  readonly likedNotes: Maybe<NoteFilter>;
  readonly noteComments: Maybe<NoteCommentFilter>;
  readonly postComments: Maybe<PostCommentFilter>;
  readonly likedNoteComments: Maybe<NoteCommentFilter>;
  readonly likedPostComments: Maybe<PostCommentFilter>;
  readonly likedPosts: Maybe<PostFilter>;
  readonly posts: Maybe<PostFilter>;
  readonly likedSuggestions: Maybe<SuggestionFilter>;
  readonly departments: Maybe<DepartmentFilter>;
  readonly institutes: Maybe<InstituteFilter>;
  readonly userPermissions: Maybe<UserPermissionFilter>;
  readonly createdAt: Maybe<DateTimeFilter>;
  readonly updatedAt: Maybe<DateTimeFilter>;
  readonly deletedAt: Maybe<NullableDateTimeFilter>;
  readonly AND: Maybe<ReadonlyArray<UserWhereInput>>;
  readonly OR: Maybe<ReadonlyArray<UserWhereInput>>;
  readonly NOT: Maybe<ReadonlyArray<UserWhereInput>>;
  readonly activationToken: Maybe<ActivationTokenWhereInput>;
  readonly ResetPasswordToken: Maybe<ResetPasswordTokenWhereInput>;
  readonly role: Maybe<UserRoleWhereInput>;
  readonly passwordToken: Maybe<PasswordTokenWhereInput>;
  readonly preferredLanguage: Maybe<LanguageWhereInput>;
  readonly departmentPermission: Maybe<DepartmentPermissionWhereInput>;
  readonly institutePermission: Maybe<InstitutePermissionWhereInput>;
  readonly noteCommentPermission: Maybe<NoteCommentPermissionWhereInput>;
  readonly noteCommentThreadPermission: Maybe<NoteCommentThreadPermissionWhereInput>;
  readonly noteHighlightPermission: Maybe<NoteHighlightPermissionWhereInput>;
  readonly notePermission: Maybe<NotePermissionWhereInput>;
  readonly postCommentPermission: Maybe<PostCommentPermissionWhereInput>;
  readonly postPermission: Maybe<PostPermissionWhereInput>;
  readonly subjectPermission: Maybe<SubjectPermissionWhereInput>;
  readonly subjectInformationPermission: Maybe<SubjectInformationPermissionWhereInput>;
  readonly suggestionPermission: Maybe<SuggestionPermissionWhereInput>;
  readonly userPermission: Maybe<UserPermissionWhereInput>;
};

export type UserWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
  readonly email: Maybe<Scalars['String']>;
};

/** Unique input */
export type WhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};
