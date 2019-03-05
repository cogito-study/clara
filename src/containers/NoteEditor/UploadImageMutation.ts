import gql from 'graphql-tag';

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImageMutation($fileName: String!, $fileType: String!) {
    uploadImage(fileName: $fileName, fileType: $fileType) {
      url
    }
  }
`;
