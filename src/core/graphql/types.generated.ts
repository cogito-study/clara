export type Maybe<T> = T | undefined;
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
  readonly noteCategory: NoteCategoryEnum;
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

export type Department = {
  readonly __typename?: 'Department';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly description: Scalars['String'];
  readonly leader: User;
  readonly subjects: Maybe<ReadonlyArray<Subject>>;
  readonly institute: Institute;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type DepartmentSubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type DepartmentPermission = {
  readonly __typename?: 'DepartmentPermission';
  readonly id: Scalars['ID'];
  readonly type: DepartmentPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<Department>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type DepartmentPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum DepartmentPermissionTypeEnum {
  UpdateDepartment = 'UPDATE_DEPARTMENT',
  ReadDepartment = 'READ_DEPARTMENT',
  DeleteDepartment = 'DELETE_DEPARTMENT',
  CreateSubject = 'CREATE_SUBJECT',
}

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
  readonly departments: Maybe<ReadonlyArray<Department>>;
  readonly users: Maybe<ReadonlyArray<User>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type InstituteDepartmentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type InstituteUsersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type InstitutePermission = {
  readonly __typename?: 'InstitutePermission';
  readonly id: Scalars['ID'];
  readonly type: InstitutePermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<Institute>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type InstitutePermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum InstitutePermissionTypeEnum {
  UpdateInstitute = 'UPDATE_INSTITUTE',
  DeleteInstitute = 'DELETE_INSTITUTE',
  CreateDepartment = 'CREATE_DEPARTMENT',
}

export type InstituteWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type Language = {
  readonly __typename?: 'Language';
  readonly id: Scalars['ID'];
  readonly code: Scalars['String'];
  readonly name: Scalars['String'];
};

export type LanguageWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
  readonly code: Maybe<Scalars['String']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly uploadImage: Scalars['String'];
  readonly createDepartment: Department;
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
  readonly createSubject: Subject;
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
  readonly updateUser: User;
  readonly deleteUser: User;
  readonly createPost: Post;
  readonly updatePost: Post;
  readonly deletePost: Post;
  readonly likePost: Post;
  readonly dislikePost: Post;
  readonly createPostComment: PostComment;
  readonly updatePostComment: PostComment;
  readonly deletePostComment: PostComment;
  readonly login: AuthenticationPayload;
  readonly forgotPassword: Scalars['String'];
  readonly activateUser: AuthenticationPayload;
  readonly resetPassword: AuthenticationPayload;
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

export type MutationApproveSuggestionArgs = {
  where: WhereUniqueInput;
};

export type MutationRejectSuggestionArgs = {
  where: WhereUniqueInput;
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
  readonly __typename?: 'Note';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly contentHTML: Scalars['String'];
  readonly title: Scalars['String'];
  readonly number: Scalars['Int'];
  readonly description: Maybe<Scalars['String']>;
  readonly noteCategory: NoteCategoryEnum;
  readonly commentThreads: Maybe<ReadonlyArray<NoteCommentThread>>;
  readonly authors: Maybe<ReadonlyArray<User>>;
  readonly likers: Maybe<ReadonlyArray<User>>;
  readonly highlights: Maybe<ReadonlyArray<NoteHighlight>>;
  readonly subject: Subject;
  /** Number of likes on the note */
  readonly likesCount: Scalars['Int'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteAuthorsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteHighlightsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum NoteCategoryEnum {
  Note = 'NOTE',
  CaseStudy = 'CASE_STUDY',
}

export type NoteComment = {
  readonly __typename?: 'NoteComment';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly author: User;
  readonly likers: Maybe<ReadonlyArray<User>>;
  readonly thread: Maybe<NoteCommentThread>;
  readonly threadReply: Maybe<NoteCommentThread>;
  /** Number of likes on the note comment */
  readonly likesCount: Scalars['Int'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteCommentPermission = {
  readonly __typename?: 'NoteCommentPermission';
  readonly id: Scalars['ID'];
  readonly type: NoteCommentPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<NoteComment>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum NoteCommentPermissionTypeEnum {
  UpdateNoteComment = 'UPDATE_NOTE_COMMENT',
  DeleteNoteComment = 'DELETE_NOTE_COMMENT',
}

export type NoteCommentThread = {
  readonly __typename?: 'NoteCommentThread';
  readonly id: Scalars['ID'];
  readonly position: Scalars['String'];
  readonly comment: NoteComment;
  readonly replies: Maybe<ReadonlyArray<NoteComment>>;
  readonly note: Note;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadRepliesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type NoteCommentThreadPermission = {
  readonly __typename?: 'NoteCommentThreadPermission';
  readonly id: Scalars['ID'];
  readonly type: NoteCommentThreadPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<NoteCommentThread>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteCommentThreadPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum NoteCommentThreadPermissionTypeEnum {
  DeleteNoteCommentThread = 'DELETE_NOTE_COMMENT_THREAD',
}

export type NoteCommentThreadWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type NoteCommentWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
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

export type NoteHighlightPermission = {
  readonly __typename?: 'NoteHighlightPermission';
  readonly id: Scalars['ID'];
  readonly type: NoteHighlightPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<NoteHighlight>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NoteHighlightPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum NoteHighlightPermissionTypeEnum {
  UpdateNoteHighlight = 'UPDATE_NOTE_HIGHLIGHT',
  DeleteNoteHighlight = 'DELETE_NOTE_HIGHLIGHT',
}

export type NoteHighlightWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type NotePermission = {
  readonly __typename?: 'NotePermission';
  readonly id: Scalars['ID'];
  readonly type: NotePermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<Note>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type NotePermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum NotePermissionTypeEnum {
  ReadNote = 'READ_NOTE',
  UpdateNote = 'UPDATE_NOTE',
  DeleteNote = 'DELETE_NOTE',
  CreateSuggestion = 'CREATE_SUGGESTION',
}

export type NoteWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
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

export type PasswordToken = {
  readonly __typename?: 'PasswordToken';
  readonly id: Scalars['ID'];
  readonly token: Scalars['String'];
  readonly user: User;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type Permission = {
  readonly __typename?: 'Permission';
  readonly id: Scalars['ID'];
  readonly departmentPermission: Maybe<DepartmentPermission>;
  readonly institutePermission: Maybe<InstitutePermission>;
  readonly notePermission: Maybe<NotePermission>;
  readonly noteCommentPermission: Maybe<NoteCommentPermission>;
  readonly noteCommentThreadPermission: Maybe<NoteCommentThreadPermission>;
  readonly noteHighlightPermission: Maybe<NoteHighlightPermission>;
  readonly subjectPermission: Maybe<SubjectPermission>;
  readonly subjectInformationPermission: Maybe<SubjectInformationPermission>;
  readonly suggestionPermission: Maybe<SuggestionPermission>;
  readonly userPermission: Maybe<UserPermission>;
};

export type Post = {
  readonly __typename?: 'Post';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly author: User;
  readonly likers: Maybe<ReadonlyArray<User>>;
  readonly subject: Subject;
  readonly comments: Maybe<ReadonlyArray<PostComment>>;
  /** Number of likes on the post */
  readonly likesCount: Scalars['Int'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostCommentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostComment = {
  readonly __typename?: 'PostComment';
  readonly id: Scalars['ID'];
  readonly content: Scalars['String'];
  readonly author: User;
  readonly post: Post;
  readonly likers: Maybe<ReadonlyArray<User>>;
  /** Number of likes on the postComment */
  readonly likesCount: Scalars['Int'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostCommentLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostCommentPermission = {
  readonly __typename?: 'PostCommentPermission';
  readonly id: Scalars['ID'];
  readonly type: PostCommentPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<PostComment>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostCommentPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum PostCommentPermissionTypeEnum {
  UpdatePostcomment = 'UPDATE_POSTCOMMENT',
  DeletePostcomment = 'DELETE_POSTCOMMENT',
  ReadPostcomment = 'READ_POSTCOMMENT',
}

export type PostCommentWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type PostPermission = {
  readonly __typename?: 'PostPermission';
  readonly id: Scalars['ID'];
  readonly type: PostPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<Post>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type PostPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum PostPermissionTypeEnum {
  CreatePostcomment = 'CREATE_POSTCOMMENT',
  UpdatePost = 'UPDATE_POST',
  DeletePost = 'DELETE_POST',
  ReadPost = 'READ_POST',
}

export type Query = {
  readonly __typename?: 'Query';
  readonly department: Maybe<Department>;
  readonly institute: Maybe<Institute>;
  readonly institutes: Maybe<ReadonlyArray<Institute>>;
  readonly language: Maybe<Language>;
  readonly languages: Maybe<ReadonlyArray<Language>>;
  readonly note: Maybe<Note>;
  readonly noteComment: Maybe<NoteComment>;
  readonly noteCommentThread: Maybe<NoteCommentThread>;
  readonly noteHighlight: Maybe<NoteHighlight>;
  readonly subject: Maybe<Subject>;
  readonly subjectInformation: Maybe<SubjectInformation>;
  readonly suggestion: Maybe<Suggestion>;
  readonly activeSuggestions: ReadonlyArray<Suggestion>;
  readonly user: Maybe<User>;
  readonly users: Maybe<ReadonlyArray<User>>;
  readonly me: User;
  readonly posts: ReadonlyArray<Post>;
  readonly postComment: Maybe<PostComment>;
};

export type QueryDepartmentArgs = {
  where: DepartmentWhereUniqueInput;
};

export type QueryInstituteArgs = {
  where: InstituteWhereUniqueInput;
};

export type QueryInstitutesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueryLanguageArgs = {
  where: LanguageWhereUniqueInput;
};

export type QueryLanguagesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
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
  where: Maybe<QueryFindManyUserWhereInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueryPostCommentArgs = {
  where: PostCommentWhereUniqueInput;
};

export type QueryFindManyUserWhereInput = {
  readonly email: Maybe<StringFilter>;
  readonly firstName: Maybe<StringFilter>;
  readonly lastName: Maybe<StringFilter>;
  readonly phoneNumber: Maybe<NullableStringFilter>;
  readonly identifier: Maybe<StringFilter>;
  readonly isActive: Maybe<BooleanFilter>;
  readonly role: Maybe<QueryFindManyUserWhereInput>;
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
  readonly teachers: Maybe<ReadonlyArray<User>>;
  readonly students: Maybe<ReadonlyArray<User>>;
  readonly informations: Maybe<ReadonlyArray<SubjectInformation>>;
  readonly notes: Maybe<ReadonlyArray<Note>>;
  readonly posts: Maybe<ReadonlyArray<Post>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectTeachersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectStudentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectInformationsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectNotesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectPostsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SubjectInformation = {
  readonly __typename?: 'SubjectInformation';
  readonly id: Scalars['ID'];
  readonly title: Scalars['String'];
  readonly subtitle: Maybe<Scalars['String']>;
  readonly content: Scalars['String'];
  readonly subject: Subject;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectInformationPermission = {
  readonly __typename?: 'SubjectInformationPermission';
  readonly id: Scalars['ID'];
  readonly type: SubjectInformationPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<SubjectInformation>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectInformationPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum SubjectInformationPermissionTypeEnum {
  ReadSubjectInformation = 'READ_SUBJECT_INFORMATION',
  UpdateSubjectInformation = 'UPDATE_SUBJECT_INFORMATION',
  DeleteSubjectInformation = 'DELETE_SUBJECT_INFORMATION',
}

export type SubjectInformationWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};

export type SubjectPermission = {
  readonly __typename?: 'SubjectPermission';
  readonly id: Scalars['ID'];
  readonly type: SubjectPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<Subject>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SubjectPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum SubjectPermissionTypeEnum {
  CreatePost = 'CREATE_POST',
  CreateSubjectInformation = 'CREATE_SUBJECT_INFORMATION',
  UpdateSubject = 'UPDATE_SUBJECT',
  DeleteSubject = 'DELETE_SUBJECT',
  ReadSubject = 'READ_SUBJECT',
  CreateNote = 'CREATE_NOTE',
}

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
  readonly likers: Maybe<ReadonlyArray<User>>;
  readonly note: Note;
  readonly author: User;
  readonly approvedBy: Maybe<User>;
  /** Number of likes on the suggestion */
  readonly likesCount: Scalars['Int'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SuggestionLikersArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type SuggestionPermission = {
  readonly __typename?: 'SuggestionPermission';
  readonly id: Scalars['ID'];
  readonly type: SuggestionPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<Suggestion>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type SuggestionPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum SuggestionPermissionTypeEnum {
  UpdateSuggestion = 'UPDATE_SUGGESTION',
  ReadSuggestion = 'READ_SUGGESTION',
  DeleteSuggestion = 'DELETE_SUGGESTION',
  ApproveSuggestion = 'APPROVE_SUGGESTION',
  RejectSuggestion = 'REJECT_SUGGESTION',
}

export type SuggestionsInput = {
  readonly noteID: Maybe<Scalars['ID']>;
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
  readonly noteCategory: Maybe<NoteCategoryEnum>;
};

/** Input of update post comment */
export type UpdatePostCommentInput = {
  readonly content: Maybe<Scalars['String']>;
};

/** Input of update post */
export type UpdatePostInput = {
  readonly content: Maybe<Scalars['String']>;
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
  readonly email: Maybe<Scalars['String']>;
  readonly password: Maybe<Scalars['String']>;
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
  readonly role: UserRole;
  readonly notes: Maybe<ReadonlyArray<Note>>;
  readonly noteHighlights: Maybe<ReadonlyArray<NoteHighlight>>;
  readonly suggestions: Maybe<ReadonlyArray<Suggestion>>;
  readonly approvedSuggestions: Maybe<ReadonlyArray<Suggestion>>;
  readonly teachedSubjects: Maybe<ReadonlyArray<Subject>>;
  readonly studiedSubjects: Maybe<ReadonlyArray<Subject>>;
  readonly likedNotes: Maybe<ReadonlyArray<Note>>;
  readonly noteComments: Maybe<ReadonlyArray<NoteComment>>;
  readonly likedPostComments: Maybe<ReadonlyArray<PostComment>>;
  readonly passwordToken: Maybe<PasswordToken>;
  readonly departments: Maybe<ReadonlyArray<Department>>;
  readonly institutes: Maybe<ReadonlyArray<Institute>>;
  readonly preferredLanguage: Maybe<Language>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type UserNotesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserNoteHighlightsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserSuggestionsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserApprovedSuggestionsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserTeachedSubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserStudiedSubjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserLikedNotesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserNoteCommentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserLikedPostCommentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserDepartmentsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserInstitutesArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Input of login */
export type UserLoginInput = {
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
};

export type UserPermission = {
  readonly __typename?: 'UserPermission';
  readonly id: Scalars['ID'];
  readonly type: UserPermissionTypeEnum;
  readonly objects: Maybe<ReadonlyArray<User>>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export type UserPermissionObjectsArgs = {
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum UserPermissionTypeEnum {
  UpdateUser = 'UPDATE_USER',
  DeleteUser = 'DELETE_USER',
}

export type UserRole = {
  readonly __typename?: 'UserRole';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly type: UserRoleTypeEnum;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly deletedAt: Maybe<Scalars['DateTime']>;
};

export enum UserRoleTypeEnum {
  User = 'USER',
  Admin = 'ADMIN',
  Professor = 'PROFESSOR',
}

export type UserWhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
  readonly email: Maybe<Scalars['String']>;
};

/** Unique input */
export type WhereUniqueInput = {
  readonly id: Maybe<Scalars['ID']>;
};
