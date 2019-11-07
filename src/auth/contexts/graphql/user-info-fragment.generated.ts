import * as Types from '../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type UserInfoFragment = { readonly __typename?: 'User' } & Pick<
  Types.User,
  'firstName' | 'lastName' | 'email' | 'profilePictureURL' | 'phoneNumber' | 'identifier'
> & {
    readonly studiedSubjects: Types.Maybe<
      ReadonlyArray<{ readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id'>>
    >;
  };

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    firstName
    lastName
    email
    profilePictureURL
    phoneNumber
    identifier
    studiedSubjects {
      id
    }
  }
`;
