/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadImageMutation
// ====================================================

export interface UploadImageMutation_uploadImage {
  __typename: "FileUploadPayload";
  url: string;
}

export interface UploadImageMutation {
  uploadImage: UploadImageMutation_uploadImage;
}

export interface UploadImageMutationVariables {
  fileName: string;
  fileType: string;
}
