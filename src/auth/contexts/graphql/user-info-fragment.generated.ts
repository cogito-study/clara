import * as Types from '../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type UserInfoFragment = { readonly __typename?: 'User' } & Pick<
  Types.User,
  'id' | 'fullName' | 'email' | 'profilePictureURL' | 'phoneNumber' | 'identifier'
> & {
    readonly studiedSubjects: ReadonlyArray<
      { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id'>
    >;
  };

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    fullName
    email
    profilePictureURL
    phoneNumber
    identifier
    studiedSubjects {
      id
    }
  }
`;
