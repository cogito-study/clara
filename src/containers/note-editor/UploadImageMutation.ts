import gql from 'graphql-tag';

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImageMutation($file: String!, $extension: String!) {
    uploadImage(file: $file, extension: $extension)
  }
`;
